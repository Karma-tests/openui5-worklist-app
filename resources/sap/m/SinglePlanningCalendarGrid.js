/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./SinglePlanningCalendarUtilities","sap/ui/core/Control","sap/ui/core/LocaleData","sap/ui/core/Locale","sap/ui/core/InvisibleText","sap/ui/core/format/DateFormat","sap/ui/core/date/UniversalDate","sap/ui/unified/library","sap/ui/unified/calendar/DatesRow","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/CalendarUtils","sap/ui/events/KeyCodes","./SinglePlanningCalendarGridRenderer"],function(t,e,r,i,a,o,n,s,p,l,u,g,c){"use strict";var d=48,f=25,m=36e5/2,h=60*1e3;var _=e.extend("sap.m.SinglePlanningCalendarGrid",{metadata:{library:"sap.m",properties:{startDate:{type:"object",group:"Data"}},aggregations:{appointments:{type:"sap.m.CalendarAppointment",multiple:true,singularName:"appointment"},_columnHeaders:{type:"sap.ui.unified.calendar.DatesRow",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{appointmentSelect:{parameters:{appointment:{type:"sap.m.CalendarAppointment"}}}}}});_.prototype.init=function(){var t=new Date,e=new p(this.getId()+"-columnHeaders",{showDayNamesLine:false,showWeekNumbers:false,startDate:t}).addStyleClass("sapMSinglePCColumnHeader"),r=(60-t.getSeconds())*1e3;this.setAggregation("_columnHeaders",e);this.setStartDate(t);this._setColumns(7);this._oUnifiedRB=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");this._oFormatAria=o.getDateTimeInstance({pattern:"EEEE dd/MM/YYYY 'at' HH:mm:ss a"});setTimeout(this._updateRowHeaderAndNowMarker.bind(this),r)};_.prototype.onBeforeRendering=function(){var t=this._createAppointmentsMap(this.getAppointments()),e=l.fromLocalJSDate(this.getStartDate()),r=this._getColumns();this._oVisibleAppointments=this._calculateVisibleAppointments(t.appointments,this.getStartDate(),r);this._oAppointmentsToRender=this._calculateAppointmentsLevelsAndWidth(this._oVisibleAppointments);this._aVisibleBlockers=this._calculateVisibleBlockers(t.blockers,e,r);this._oBlockersToRender=this._calculateBlockersLevelsAndWidth(this._aVisibleBlockers)};_.prototype.onkeydown=function(t){var e;if(t.which===g.SPACE||t.which===g.ENTER){e=sap.ui.getCore().byId(t.target.id);if(e&&e.isA("sap.m.CalendarAppointment")){this.fireAppointmentSelect({appointment:e})}t.preventDefault()}};_.prototype.setStartDate=function(t){this.getAggregation("_columnHeaders").setStartDate(t);return this.setProperty("startDate",t)};_.prototype.ontap=function(t){var e=sap.ui.getCore().byId(t.target.parentElement.id);if(e&&e.isA("sap.m.CalendarAppointment")){this.fireAppointmentSelect({appointment:e})}};_.prototype._getVisibleStartHour=function(){return 0};_.prototype._getVisibleEndHour=function(){return 23};_.prototype._isVisibleHour=function(){return true};_.prototype._isOutsideVisibleHours=function(){return false};_.prototype._shouldHideRowHeader=function(t){var e=(new Date).getHours(),r=u._areCurrentMinutesLessThan(15)&&e===t,i=u._areCurrentMinutesMoreThan(45)&&e===t-1;return r||i};_.prototype._formatDayAsString=function(t){var e=""+t.getYear(),r=t.getMonth(),i=t.getDate();if(r<10){e+="0"}e+=r;if(i<10){e+="0"}e+=i;return e};_.prototype._formatTimeAsString=function(t){var e=this._getHoursPattern()+":mm",r=o.getDateTimeInstance({pattern:e},new i(this._getCoreLocaleId()));return r.format(t)};_.prototype._addAMPM=function(t){var e=this._getAMPMFormat();return" "+e.format(t)};_.prototype._calculateTopPosition=function(t){var e=t.getHours()-this._getVisibleStartHour(),r=t.getMinutes(),i=this._getRowHeight();return i*e+i/60*r};_.prototype._calculateBottomPosition=function(t){var e=this._getVisibleEndHour()+1-t.getHours(),r=t.getMinutes(),i=this._getRowHeight();return i*e-i/60*r};_.prototype._updateRowHeaderAndNowMarker=function(){var t=new Date;this._updateNowMarker(t);this._updateRowHeaders(t);setTimeout(this._updateRowHeaderAndNowMarker.bind(this),h)};_.prototype._updateNowMarker=function(t){var e=this.$("nowMarker"),r=this.$("nowMarkerText"),i=this.$("nowMarkerAMPM"),a=this._isOutsideVisibleHours(t.getHours());e.toggleClass("sapMSinglePCNowMarkerHidden",a);e.css("top",this._calculateTopPosition(t)+"px");r.text(this._formatTimeAsString(t));i.text(this._addAMPM(t));r.append(i)};_.prototype._updateRowHeaders=function(t){var e=this.$(),r=t.getHours(),i=r+1;e.find(".sapMSinglePCRowHeader").removeClass("sapMSinglePCRowHeaderHidden");if(this._shouldHideRowHeader(r)){e.find(".sapMSinglePCRowHeader"+r).addClass("sapMSinglePCRowHeaderHidden")}else if(this._shouldHideRowHeader(i)){e.find(".sapMSinglePCRowHeader"+i).addClass("sapMSinglePCRowHeaderHidden")}};_.prototype._createAppointmentsMap=function(t){var e=this;return t.reduce(function(t,r){var i=r.getStartDate(),a=r.getEndDate(),o=r.getFullDay(),n,s,p;if(!i||!a){return t}if(!o){n=l.fromLocalJSDate(i);s=l.fromLocalJSDate(a);while(n.isSameOrBefore(s)){p=e._formatDayAsString(n);if(!t.appointments[p]){t.appointments[p]=[]}t.appointments[p].push(r);n.setDate(n.getDate()+1)}}else{t.blockers.push(r)}return t},{appointments:{},blockers:[]})};_.prototype._calculateVisibleAppointments=function(t,e,r){var i={},a,o,n;for(var s=0;s<r;s++){a=new l(e.getFullYear(),e.getMonth(),e.getDate()+s);o=this._formatDayAsString(a);n=this._isAppointmentFitInVisibleHours(a);if(t[o]){i[o]=t[o].filter(n,this).sort(this._sortAppointmentsByStartHourCallBack)}}return i};_.prototype._isAppointmentFitInVisibleHours=function(t){return function(e){var r=e.getStartDate().getTime(),i=e.getEndDate().getTime(),a=new n(t.getYear(),t.getMonth(),t.getDate(),this._getVisibleStartHour()).getTime(),o=new n(t.getYear(),t.getMonth(),t.getDate(),this._getVisibleEndHour(),59,59).getTime();var s=r<a&&i>o,p=r>=a&&r<o,l=i>a&&i<=o;return s||p||l}};_.prototype._calculateAppointmentsLevelsAndWidth=function(e){var r=this;return Object.keys(e).reduce(function(i,a){var o=0,n=new t.list,s=e[a];s.forEach(function(e){var r=new t.node(e),i=e.getStartDate().getTime();if(n.getSize()===0){n.add(r);return}n.getIterator().forEach(function(t){var e=true,a=t.getData(),n=a.getStartDate().getTime(),s=a.getEndDate().getTime(),p=s-n;if(p<m){s=s+(m-p)}if(i>=n&&i<s){r.level++;o=Math.max(o,r.level)}if(t.next&&t.next.level===r.level){e=false}if(i>=s&&e){this.interrupt()}});n.insertAfterLevel(r.level,r)});i[a]={oAppointmentsList:r._calculateAppointmentsWidth(n),iMaxLevel:o};return i},{})};_.prototype._calculateAppointmentsWidth=function(e){e.getIterator().forEach(function(r){var i=r.getData(),a=r.level,o=r.level,n=i.getStartDate().getTime(),s=i.getEndDate().getTime(),p=s-n;if(p<m){s=s+(m-p)}new t.iterator(e).forEach(function(t){var e=t.getData(),i=t.level,p=e.getStartDate().getTime(),l=e.getEndDate().getTime(),u=l-p;if(u<m){l=l+(m-u)}if(o>=i){return}if(n>=p&&n<l||s>p&&s<l||n<=p&&s>=l){r.width=i-o;this.interrupt();return}if(a<i){a=i;r.width++}})});return e};_.prototype._calculateVisibleBlockers=function(t,e,r){var i=new l(e.getYear(),e.getMonth(),e.getDate()+r),a=this._isBlockerVisible(e,i);return t.filter(a).sort(this._sortAppointmentsByStartHourCallBack)};_.prototype._isBlockerVisible=function(t,e){return function(r){var i=l.fromLocalJSDate(r.getStartDate()),a=l.fromLocalJSDate(r.getEndDate());var o=i.isBefore(t)&&a.isAfter(e),n=i.isSameOrAfter(t)&&i.isBefore(e),s=u._isBetween(a,t,e,true);return o||n||s}};_.prototype._calculateBlockersLevelsAndWidth=function(e){var r=0,i=new t.list;e.forEach(function(e){var a=new t.node(e),o=l.fromLocalJSDate(e.getStartDate()),n=l.fromLocalJSDate(e.getEndDate());a.width=u._daysBetween(n,o);if(i.getSize()===0){i.add(a);return}i.getIterator().forEach(function(t){var e=true,i=t.getData(),n=l.fromLocalJSDate(i.getStartDate()),s=l.fromLocalJSDate(i.getEndDate());if(o.isSameOrAfter(n)&&o.isBefore(s)){a.level++;r=Math.max(r,a.level)}if(t.next&&t.next.level===a.level){e=false}if(o.isSameOrAfter(s)&&e){this.interrupt()}});i.insertAfterLevel(a.level,a)},this);return{oBlockersList:i,iMaxlevel:r}};_.prototype._sortAppointmentsByStartHourCallBack=function(t,e){return t.getStartDate().getTime()-e.getStartDate().getTime()||e.getEndDate().getTime()-t.getEndDate().getTime()};_.prototype._getVisibleAppointments=function(){return this._oVisibleAppointments};_.prototype._getAppointmentsToRender=function(){return this._oAppointmentsToRender};_.prototype._getVisibleBlockers=function(){return this._aVisibleBlockers};_.prototype._getBlockersToRender=function(){return this._oBlockersToRender};_.prototype._setColumns=function(t){this._iColumns=t;this.getAggregation("_columnHeaders").setDays(t)};_.prototype._getColumns=function(){return this._iColumns};_.prototype._getRowHeight=function(){return d};_.prototype._getBlockerRowHeight=function(){return f};_.prototype._getCoreLocaleId=function(){if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString()}return this._sLocale};_.prototype._getCoreLocaleData=function(){var t,e;if(!this._oLocaleData){t=this._getCoreLocaleId();e=new i(t);this._oLocaleData=r.getInstance(e)}return this._oLocaleData};_.prototype._hasAMPM=function(){var t=this._getCoreLocaleData();return t.getTimePattern("short").search("a")>=0};_.prototype._getHoursFormat=function(){var t=this._getCoreLocaleId();if(!this._oHoursFormat||this._oHoursFormat.oLocale.toString()!==t){var e=new i(t),r=this._getHoursPattern();this._oHoursFormat=o.getTimeInstance({pattern:r},e)}return this._oHoursFormat};_.prototype._getHoursPattern=function(){return this._hasAMPM()?"h":"H"};_.prototype._getAMPMFormat=function(){var t=this._getCoreLocaleId(),e=new i(t);if(!this._oAMPMFormat||this._oAMPMFormat.oLocale.toString()!==t){this._oAMPMFormat=o.getTimeInstance({pattern:"a"},e)}return this._oAMPMFormat};_.prototype._getColumnHeaders=function(){return this.getAggregation("_columnHeaders")};_.prototype._getAppointmentStartEndInfo=function(t){var e=this._oUnifiedRB.getText("CALENDAR_START_TIME"),r=this._oUnifiedRB.getText("CALENDAR_END_TIME"),i=this._oFormatAria.format(t.getStartDate()),a=this._oFormatAria.format(t.getEndDate());return e+": "+i+"; "+r+": "+a};_.prototype.enhanceAccessibilityState=function(t,e){if(t.getId()===this._getColumnHeaders().getId()){e.labelledby=a.getStaticId("sap.m","PLANNINGCALENDAR_DAYS")}};return _});