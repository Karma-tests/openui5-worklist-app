/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/calendar/CalendarUtils","./Calendar","./calendar/DatesRow","./calendar/MonthPicker","./calendar/YearPicker","sap/ui/unified/calendar/CalendarDate","./library","sap/ui/Device","./CalendarDateIntervalRenderer","sap/base/util/deepEqual","sap/ui/core/Popup","sap/base/Log","sap/ui/thirdparty/jquery"],function(t,e,a,i,r,s,o,n,h,g,p,u,c){"use strict";var l=e.extend("sap.ui.unified.CalendarDateInterval",{metadata:{library:"sap.ui.unified",properties:{startDate:{type:"object",group:"Data"},days:{type:"int",group:"Appearance",defaultValue:7},showDayNamesLine:{type:"boolean",group:"Appearance",defaultValue:true},pickerPopup:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{calendarPicker:{type:"sap.ui.unified.Calendar",multiple:false,visibility:"hidden"}},designtime:"sap/ui/unified/designtime/CalendarDateInterval.designtime"}});l.prototype.init=function(){e.prototype.init.apply(this,arguments);this._iDaysMonthHead=35};l.prototype._initilizeMonthPicker=function(){this.setAggregation("monthPicker",this._createMonthPicker())};l.prototype._initilizeYearPicker=function(){this.setAggregation("yearPicker",this._createYearPicker())};l.prototype.setPickerPopup=function(t){this.setProperty("pickerPopup",t,true);var e=this.getAggregation("header"),a,i;if(t){if(this.getAggregation("monthPicker")){this.getAggregation("monthPicker").destroy()}if(this.getAggregation("yearPicker")){this.getAggregation("yearPicker").destroy()}e.setVisibleButton2(false);e.detachEvent("pressButton2",this._handleButton2,this);this._setHeaderText(this._getFocusedDate(true))}else{if(!this.getAggregation("monthPicker")){this.setAggregation("monthPicker",this._createMonthPicker())}if(!this.getAggregation("yearPicker")){this.setAggregation("yearPicker",this._createYearPicker())}a=this.getAggregation("monthPicker");i=this.getAggregation("yearPicker");a.setColumns(0);a.setMonths(6);i.setColumns(0);i.setYears(6);i._oMinDate.setYear(this._oMinDate.getYear());i._oMaxDate.setYear(this._oMaxDate.getYear());e.setVisibleButton2(true);e.detachEvent("pressButton2",this._handleButton2,this);e.attachEvent("pressButton2",this._handleButton2,this)}return this};l.prototype._createMonthPicker=function(){var t=new i(this.getId()+"--MP");t.attachEvent("select",this._selectMonth,this);t._bNoThemeChange=true;t.setColumns(0);t.setMonths(3);t.attachEvent("pageChange",D,this);return t};l.prototype._createYearPicker=function(){var t=new r(this.getId()+"--YP");t.attachEvent("select",this._selectYear,this);t.setColumns(0);t.setYears(3);t.attachEvent("pageChange",d,this);return t};l.prototype._getCalendarPicker=function(){var t=this.getAggregation("calendarPicker");if(!t){t=new e(this.getId()+"--Cal");t.setPopupMode(true);t.attachEvent("select",this._handleCalendarPickerDateSelect,this);t.attachEvent("cancel",function(t){this._closeCalendarPicker();var e=this.getAggregation("header").getDomRef("B1");if(e){e.focus()}},this);this.setAggregation("calendarPicker",t)}return t};l.prototype._setAriaRole=function(t){var e=this.getAggregation("month")[0];e._setAriaRole(t);e.invalidate();return this};l.prototype._handleButton1=function(t){if(this.getPickerPopup()){this._showCalendarPicker()}else{if(this._iMode!=1){this._showMonthPicker()}else{this._hideMonthPicker()}}};l.prototype._setHeaderText=function(t){var a=e.prototype._setHeaderText.apply(this,arguments);var i,r=a.sAriaLabel,o=this.getAggregation("header");var n=this._getLocaleData();var h=s.fromLocalJSDate(new Date(t.toLocalJSDate().getTime()+(this._getDays()-1)*24*60*60*1e3),this.getPrimaryCalendarType());h.setDate(1);var g=n.getIntervalPattern().replace("{0}","").replace("{1}","");var p=this._oYearFormat.format(h.toUTCJSDate(),true);var u=a.sMonth;if(this.getPickerPopup()){if(n.oLocale.sLanguage.toLowerCase()==="ja"||n.oLocale.sLanguage.toLowerCase()==="zh"){if(p!=a.sYear){u=u.replace(g,g+p+" ");r=r.replace(g,g+p+" ")}i=a.sYear+" "+u;r=a.sYear+" "+r}else{if(p!=a.sYear){u=u.replace(g," "+a.sYear+g);r=r.replace(g," "+a.sYear+g)}i=u+" "+p;r=r+" "+p}o.setTextButton1(i,true);o.setAriaLabelButton1(r)}};l.prototype._showCalendarPicker=function(){var t=this.getStartDate(),e=this._getCalendarPicker(),a=new sap.ui.unified.DateRange,i=new Date(t.getTime());i.setDate(i.getDate()+this._getDays()-1);a.setStartDate(t);a.setEndDate(i);e.displayDate(this._getFocusedDate().toLocalJSDate());e.removeAllSelectedDates();e.addSelectedDate(a);e.setMinDate(this.getMinDate());e.setMaxDate(this.getMaxDate());this._openPickerPopup(e);this._showOverlay()};l.prototype._handleCalendarPickerDateSelect=function(t){var e=this._getCalendarPicker(),a=e.getSelectedDates()[0].getStartDate(),i=new s.fromLocalJSDate(a);this._setStartDate(i);this._setFocusedDate(i);this._closeCalendarPicker()};l.prototype._closeCalendarPicker=function(t){if(this._oPopup&&this._oPopup.isOpen()){this._oPopup.close()}this._hideOverlay();if(!t){this._renderMonth();var e=this.getAggregation("month");for(var a=0;a<e.length;a++){var i=e[a];c(i._oItemNavigation.getItemDomRefs()[i._oItemNavigation.getFocusedIndex()]).attr("tabindex","0")}}};l.prototype._getDaysLarge=function(){return 10};l.prototype._createMonth=function(t){var e=new a(t);return e};l.prototype.setStartDate=function(e){t._checkJSDateObject(e);if(g(this.getStartDate(),e)){return this}var a=e.getFullYear();t._checkYearInValidRange(a);var i=s.fromLocalJSDate(e,this.getPrimaryCalendarType());if(t._isOutside(i,this._oMinDate,this._oMaxDate)){throw new Error("Date must be in valid range (minDate and maxDate); "+this)}var r=this.getMinDate();if(r&&e.getTime()<r.getTime()){u.warning("startDate < minDate -> minDate as startDate set",this);e=new Date(r.getTime())}var o=this.getMaxDate();if(o&&e.getTime()>o.getTime()){u.warning("startDate > maxDate -> maxDate as startDate set",this);e=new Date(o.getTime())}this.setProperty("startDate",e,true);i=s.fromLocalJSDate(e,this.getPrimaryCalendarType());this._oStartDate=i;var n=this.getAggregation("month")[0];n.setStartDate(e);this._updateHeader(i);var h=this._getFocusedDate(true).toLocalJSDate();if(!n.checkDateFocusable(h)){this._setFocusedDate(i);n.displayDate(e)}return this};l.prototype.getStartDate=function(){return this.getProperty("startDate")};l.prototype.setDays=function(t){this.setProperty("days",t,true);t=this._getDays();var e=this.getAggregation("month")[0];e.setDays(t);if(!this.getPickerPopup()){var a=this.getAggregation("monthPicker");var i=Math.ceil(t/3);if(i>12){i=12}a.setMonths(i);var r=this.getAggregation("yearPicker");var s=Math.floor(t/2);if(s>20){s=20}r.setYears(s)}var o=this._getStartDate();this._updateHeader(o);if(this.getDomRef()){if(t>this._getDaysLarge()){this.$().addClass("sapUiCalIntLarge")}else{this.$().removeClass("sapUiCalIntLarge")}if(t>this._iDaysMonthHead){this.$().addClass("sapUiCalIntHead")}else{this.$().removeClass("sapUiCalIntHead")}}return this};l.prototype._getDays=function(){var t=this.getDays();if(n.system.phone&&t>8){return 8}else{return t}};l.prototype.setShowDayNamesLine=function(t){this.setProperty("showDayNamesLine",t,true);var e=this.getAggregation("month")[0];e.setShowDayNamesLine(t);return this};l.prototype._getShowMonthHeader=function(){var t=this._getDays();if(t>this._iDaysMonthHead){return true}else{return false}};l.prototype._getFocusedDate=function(t){if(!this._oFocusedDate||t){this._oFocusedDate=null;e.prototype._getFocusedDate.apply(this,arguments);var a=this.getStartDate();var i=this.getAggregation("month")[0];if(!a){this._setStartDate(this._oFocusedDate,false,true)}else if(!i.checkDateFocusable(this._oFocusedDate.toLocalJSDate())){this._oFocusedDate=s.fromLocalJSDate(a,this.getPrimaryCalendarType())}}return this._oFocusedDate};l.prototype.setMonths=function(t){if(t==1){return this.setProperty("months",t,false)}else{throw new Error("Property months not supported "+this)}};l.prototype.setFirstDayOfWeek=function(t){if(t==-1){return this.setProperty("firstDayOfWeek",t,false)}else{throw new Error("Property firstDayOfWeek not supported "+this)}};l.prototype.focusDate=function(t){var a=this.getAggregation("month")[0];if(!a.checkDateFocusable(t)){this._focusDateExtend(s.fromLocalJSDate(t,this.getPrimaryCalendarType()),true,true)}e.prototype.focusDate.apply(this,arguments);return this};l.prototype._shouldFocusB2OnTabNext=function(t){var e=this.getAggregation("header");return!this.getPickerPopup()&&t.target.id==e.getId()+"-B1"};l.prototype._focusOnShiftTab=function(){var t=this.getAggregation("header");if(this.getPickerPopup()&&t.getDomRef("B1")){t.getDomRef("B1").focus()}else if(!this.getPickerPopup()&&t.getDomRef("B2")){t.getDomRef("B2").focus()}};l.prototype.onsapescape=function(t){if(this.getPickerPopup()){this._closeCalendarPicker();this.fireCancel()}else{if(this._iMode===0){this.fireCancel()}this._closedPickers()}};l.prototype._focusDateExtend=function(e,a,i){if(a){var r=this._getFocusedDate();var o=this._getStartDate();var n=t._daysBetween(r,o);var h=new s(e,this.getPrimaryCalendarType());h.setDate(h.getDate()-n);this._setStartDate(h,false,true);if(!i){return true}}return false};l.prototype._setMinMaxDateExtend=function(t){if(this._oStartDate){if(this._oStartDate.isBefore(this._oMinDate)){u.warning("start date < minDate -> minDate will be start date",this);this._setStartDate(new s(this._oMinDate,this.getPrimaryCalendarType()),true,true)}else{var e=new s(this._oStartDate);e.setDate(e.getDate()+this._getDays()-1);if(e.isAfter(this._oMaxDate)){u.warning("end date > maxDate -> start date will be changed",this);var a=new s(this._oMaxDate);a.setDate(a.getDate()-this._getDays()+1);this._setStartDate(a,true,true)}}}};l.prototype._togglePrevNext=function(a,i){if(this._iMode>1||this._iMode==1&&this.getPickerPopup()){return e.prototype._togglePrevNext.apply(this,arguments)}var r=this._oMaxDate.getYear();var o=this._oMinDate.getYear();var n=this._oMaxDate.getMonth();var h=this._oMinDate.getMonth();var g=this._oMinDate.getDate();var p=this._oMaxDate.getDate();var u=this.getAggregation("header");var c=this._getDays();var l;var D;var d;var _;var f;if(this._iMode==1&&!i){var y=this.getAggregation("monthPicker");var P=y.getMonths();var v=y.getStartMonth();var m=v+P-1;l=a.getYear();if(v==0||l==o&&v<=h){u.setEnabledPrevious(false)}else{u.setEnabledPrevious(true)}if(m>10||l==r&&m>=n){u.setEnabledNext(false)}else{u.setEnabledNext(true)}return}D=this._getStartDate();d=new s(D,this.getPrimaryCalendarType());d.setDate(d.getDate()+c-1);if(t._isOutside(a,D,d)){D=new s(a,this.getPrimaryCalendarType());d=new s(D,this.getPrimaryCalendarType());d.setDate(d.getDate()+c-1)}l=D.getYear();_=D.getMonth();f=D.getDate();if(l<o||l==o&&(!i||_<h||_==h&&f<=g)){u.setEnabledPrevious(false)}else{u.setEnabledPrevious(true)}l=d.getYear();_=d.getMonth();f=d.getDate();if(l>r||l==r&&(!i||_>n||_==n&&f>=p)){u.setEnabledNext(false)}else{u.setEnabledNext(true)}};l.prototype._shiftStartFocusDates=function(t,e,a){t.setDate(t.getDate()+a);e.setDate(e.getDate()+a);this._setFocusedDate(e);this._setStartDate(t,true)};l.prototype._handlePrevious=function(t){var e=new s(this._getFocusedDate(),this.getPrimaryCalendarType()),a,i,r,o;switch(this._iMode){case 0:r=new s(this._getStartDate(),this.getPrimaryCalendarType());o=this._getDays();this._shiftStartFocusDates(r,e,o*-1);break;case 1:if(!this.getPickerPopup()){a=this.getAggregation("monthPicker");if(a.getMonths()<12){a.previousPage();this._togglePrevNext(e)}else{e.setYear(e.getYear()-1);var n=this._focusDateExtend(e,true,false);this._setFocusedDate(e);this._updateHeader(e);this._setDisabledMonths(e.getYear());if(n){this.fireStartDateChange()}}}break;case 2:if(!this.getPickerPopup()){i=this.getAggregation("yearPicker");i.previousPage();this._togglePrevNexYearPicker()}break}};l.prototype._handleNext=function(t){var e=new s(this._getFocusedDate(),this.getPrimaryCalendarType()),a,i,r,o;switch(this._iMode){case 0:r=new s(this._getStartDate(),this.getPrimaryCalendarType());o=this._getDays();this._shiftStartFocusDates(r,e,o);break;case 1:if(!this.getPickerPopup()){a=this.getAggregation("monthPicker");if(a.getMonths()<12){a.nextPage();this._togglePrevNext(e)}else{e.setYear(e.getYear()+1);var n=this._focusDateExtend(e,true,false);this._setFocusedDate(e);this._updateHeader(e);this._setDisabledMonths(e.getYear());if(n){this.fireStartDateChange()}}}break;case 2:if(!this.getPickerPopup()){i=this.getAggregation("yearPicker");i.nextPage();this._togglePrevNexYearPicker()}break}};l.prototype._getDisplayedMonths=function(t){var e=[];var a=t.getMonth();var i=this._getDays();e.push(a);if(i>this._getDaysLarge()){var r=new s(t,this.getPrimaryCalendarType());r.setDate(r.getDate()+i-1);var o=r.getMonth();while(a!=o){a=(a+1)%12;e.push(a)}}return e};l.prototype._getDisplayedSecondaryMonths=function(t,e){var a=this._getDays();var i=new s(this._getStartDate(),e);var r=i.getMonth();var o=new s(i,this.getPrimaryCalendarType());o.setDate(o.getDate()+a-1);o=new s(o,e);var n=o.getMonth();return{start:r,end:n}};l.prototype._openPickerPopup=function(t){if(!this._oPopup){this._oPopup=new p;this._oPopup.setAutoClose(true);this._oPopup.setAutoCloseAreas([this.getDomRef()]);this._oPopup.setDurations(0,0);this._oPopup._oCalendar=this;this._oPopup.attachClosed(function(){this._closeCalendarPicker(true)},this);this._oPopup.onsapescape=function(t){this._oCalendar.onsapescape(t)}}this._oPopup.setContent(t);var e=this.getAggregation("header");var a=p.Dock;this._oPopup.open(0,a.CenterTop,a.CenterTop,e,null,"flipfit",true)};l.prototype._getMaxDateAlignedToMinDate=function(t,e){var a=new s(t,this.getPrimaryCalendarType());if(a.isBefore(e)){a=new s(e);a.setDate(a.getDate()+this._getDays()-1)}return a};l.prototype._getStartDateAlignedToMinAndMaxDate=function(t,e,a){var i=new s(a,this.getPrimaryCalendarType());if(i.isBefore(e)){i=new s(e,this.getPrimaryCalendarType())}else if(i.isAfter(t)){i=t}return i};l.prototype._calculateStartDate=function(t,e,a){var i=new s(t,this.getPrimaryCalendarType());i.setDate(i.getDate()-this._getDays()+1);i=this._getMaxDateAlignedToMinDate(i,e);a=this._getStartDateAlignedToMinAndMaxDate(i,e,a);return a};l.prototype._setStartDate=function(t,e,a){t=this._calculateStartDate(this._oMaxDate,this._oMinDate,t);var i=t.toLocalJSDate();this.setProperty("startDate",i,true);this._oStartDate=t;var r=this.getAggregation("month")[0];r.setStartDate(i);this._updateHeader(t);if(e){var s=this._getFocusedDate().toLocalJSDate();if(!r.checkDateFocusable(s)){this._setFocusedDate(t);r.setDate(i)}else{r.setDate(s)}}if(!a){this.fireStartDateChange()}};l.prototype._getStartDate=function(){if(!this._oStartDate){this._oStartDate=this._getFocusedDate()}return this._oStartDate};function D(t){var e=new s(this._getFocusedDate(),this.getPrimaryCalendarType());this._togglePrevNext(e)}function d(t){this._togglePrevNexYearPicker()}return l});