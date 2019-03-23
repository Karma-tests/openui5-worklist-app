/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/LocaleData","sap/ui/core/delegate/ItemNavigation","sap/ui/unified/calendar/CalendarUtils","sap/ui/core/date/UniversalDate","sap/ui/unified/library","sap/ui/core/format/DateFormat","sap/ui/core/library","sap/ui/core/Locale","./TimesRowRenderer","sap/ui/dom/containsOrEquals","sap/base/util/deepEqual","sap/ui/thirdparty/jquery"],function(e,t,a,i,r,s,n,o,l,g,u,h,c){"use strict";var m=o.CalendarType;var f=e.extend("sap.ui.unified.calendar.TimesRow",{metadata:{library:"sap.ui.unified",properties:{date:{type:"object",group:"Data"},startDate:{type:"object",group:"Data"},items:{type:"int",group:"Appearance",defaultValue:12},intervalMinutes:{type:"int",group:"Appearance",defaultValue:60},intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},singleSelection:{type:"boolean",group:"Behavior",defaultValue:true},showHeader:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{},focus:{parameters:{date:{type:"object"},notVisible:{type:"boolean"}}}}}});f.prototype.init=function(){this._oFormatYyyyMMddHHmm=n.getInstance({pattern:"yyyyMMddHHmm",calendarType:m.Gregorian});this._oFormatLong=n.getDateTimeInstance({style:"long/short"});this._oFormatDate=n.getDateInstance({style:"medium"});this._mouseMoveProxy=c.proxy(this._handleMouseMove,this);this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified")};f.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}if(this._sInvalidateTimes){clearTimeout(this._sInvalidateTimes)}};f.prototype.onAfterRendering=function(){d.call(this)};f.prototype.onsapfocusleave=function(e){if(!e.relatedControlId||!u(this.getDomRef(),sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef())){if(this._bMouseMove){F.call(this,true);S.call(this,this._getDate());this._bMoveChange=false;this._bMousedownChange=false;M.call(this)}if(this._bMousedownChange){this._bMousedownChange=false;M.call(this)}}};f.prototype.invalidate=function(t){if(!this._bDateRangeChanged&&(!t||!(t instanceof sap.ui.unified.DateRange))){e.prototype.invalidate.apply(this,arguments)}else if(this.getDomRef()&&!this._sInvalidateTimes){if(this._bInvalidateSync){w.call(this)}else{this._sInvalidateTimes=setTimeout(w.bind(this),0)}}};f.prototype.removeAllSelectedDates=function(){this._bDateRangeChanged=true;var e=this.removeAllAggregation("selectedDates");return e};f.prototype.destroySelectedDates=function(){this._bDateRangeChanged=true;var e=this.destroyAggregation("selectedDates");return e};f.prototype.removeAllSpecialDates=function(){this._bDateRangeChanged=true;var e=this.removeAllAggregation("specialDates");return e};f.prototype.destroySpecialDates=function(){this._bDateRangeChanged=true;var e=this.destroyAggregation("specialDates");return e};f.prototype.setIntervalMinutes=function(e){if(e>=720){throw new Error("Only intervals < 720 minutes are allowed; "+this)}if(1440%e>0){throw new Error("A day must be divisible by the interval size; "+this)}this.setProperty("intervalMinutes",e,false);this._oFormatTime=undefined;return this};f.prototype.setDate=function(e){C.call(this,e,false);return this};f.prototype._setDate=function(e){var t=i._createLocalDate(e,true);this.setProperty("date",t,true);this._oUTCDate=e};f.prototype._getDate=function(){if(!this._oUTCDate){this._oUTCDate=i._createUniversalUTCDate(new Date,undefined,true)}return this._oUTCDate};f.prototype.setStartDate=function(e){i._checkJSDateObject(e);var t=e.getFullYear();i._checkYearInValidRange(t);var a=i._createUniversalUTCDate(e,undefined,true);this.setProperty("startDate",e,true);this._oUTCStartDate=this._getIntervalStart(a);if(this.getDomRef()){var r=i._createLocalDate(this._getDate(),true);this._bNoRangeCheck=true;this.displayDate(e);this._bNoRangeCheck=false;if(r&&this.checkDateFocusable(r)){this.displayDate(r)}}return this};f.prototype._getStartDate=function(){if(!this._oUTCStartDate){this._oUTCStartDate=i._createUniversalUTCDate(new Date,undefined,true);this._oUTCStartDate=this._getIntervalStart(this._oUTCStartDate)}return this._oUTCStartDate};f.prototype.displayDate=function(e){C.call(this,e,true);return this};f.prototype._getLocale=function(){var e=this.getParent();if(e&&e.getLocale){return e.getLocale()}else if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString()}return this._sLocale};f.prototype._getLocaleData=function(){var e=this.getParent();if(e&&e._getLocaleData){return e._getLocaleData()}else if(!this._oLocaleData){var a=this._getLocale();var i=new l(a);this._oLocaleData=t.getInstance(i)}return this._oLocaleData};f.prototype._getFormatLong=function(){var e=this._getLocale();if(this._oFormatLong.oLocale.toString()!=e){var t=new l(e);this._oFormatLong=n.getInstance({style:"long/short"},t)}return this._oFormatLong};f.prototype._getFormatTime=function(){var e=this._getLocale();if(!this._oFormatTime||this._oFormatTime.oLocale.toString()!=e){var t=new l(e);var a=this.getIntervalMinutes();var i=this._getLocaleData();var r;this._oFormatTimeAmPm=undefined;if(a%60==0){r=i.getPreferredHourSymbol();if(i.getTimePattern("short").search("a")>=0){this._oFormatTimeAmPm=n.getTimeInstance({pattern:"a"},t)}}else{r=i.getTimePattern("short");r=r.replace("HH","H");r=r.replace("hh","h");if(r.search("a")>=0){this._oFormatTimeAmPm=n.getTimeInstance({pattern:"a"},t);r=r.replace("a","").trim()}}this._oFormatTime=n.getTimeInstance({pattern:r},t)}return this._oFormatTime};f.prototype._getFormatDate=function(){var e=this._getLocale();if(this._oFormatDate.oLocale.toString()!=e){var t=new l(e);this._oFormatDate=n.getDateInstance({style:"medium"},t)}return this._oFormatDate};f.prototype.getIntervalSelection=function(){var e=this.getParent();if(e&&e.getIntervalSelection){return e.getIntervalSelection()}else{return this.getProperty("intervalSelection")}};f.prototype.getSingleSelection=function(){var e=this.getParent();if(e&&e.getSingleSelection){return e.getSingleSelection()}else{return this.getProperty("singleSelection")}};f.prototype.getSelectedDates=function(){var e=this.getParent();if(e&&e.getSelectedDates){return e.getSelectedDates()}else{return this.getAggregation("selectedDates",[])}};f.prototype.getSpecialDates=function(){var e=this.getParent();if(e&&e.getSpecialDates){return e.getSpecialDates()}else{return this.getAggregation("specialDates",[])}};f.prototype._getShowHeader=function(){var e=this.getParent();if(e&&e._getShowItemHeader){return e._getShowItemHeader()}else{return this.getProperty("showHeader")}};f.prototype.getIntervalMinutes=function(){var e=this.getParent();if(e&&e.getIntervalMinutes){return e.getIntervalMinutes()}else{return this.getProperty("intervalMinutes")}};f.prototype.getAriaLabelledBy=function(){var e=this.getParent();if(e&&e.getAriaLabelledBy){return e.getAriaLabelledBy()}else{return this.getAssociation("ariaLabelledBy",[])}};f.prototype.getLegend=function(){var e=this.getParent();if(e&&e.getLegend){return e.getLegend()}else{return this.getAssociation("ariaLabelledBy",[])}};f.prototype._checkDateSelected=function(e){if(!(e instanceof r)){throw new Error("Date must be a UniversalDate object "+this)}var t=0;var a=this.getSelectedDates();var s=new r(e.getTime());s=this._getIntervalStart(s);var n=s.getTime();for(var o=0;o<a.length;o++){var l=a[o];var g=l.getStartDate();var u=0;if(g){g=i._createUniversalUTCDate(g,undefined,true);g=this._getIntervalStart(g);u=g.getTime()}var h=l.getEndDate();var c=0;if(h){h=i._createUniversalUTCDate(h,undefined,true);h=this._getIntervalStart(h);c=h.getTime()}if(n==u&&!h){t=1;break}else if(n==u&&h){t=2;if(h&&n==c){t=5}break}else if(h&&n==c){t=3;break}else if(h&&n>u&&n<c){t=4;break}if(this.getSingleSelection()){break}}return t};f.prototype._getDateType=function(e){if(!(e instanceof r)){throw new Error("Date must be a UniversalDate object "+this)}var t;var a=this.getSpecialDates();var s=new r(e.getTime());s=this._getIntervalStart(s);var n=s.getTime();for(var o=0;o<a.length;o++){var l=a[o];var g=l.getStartDate();var u=0;if(g){g=i._createUniversalUTCDate(g,undefined,true);g=this._getIntervalStart(g);u=g.getTime()}var h=l.getEndDate();var c=0;if(h){h=i._createUniversalUTCDate(h,undefined,true);h=this._getIntervalStart(h);h.setUTCMinutes(h.getUTCMinutes()+this.getIntervalMinutes()-1);c=h.getTime()}else if(g.getUTCHours()==0&&g.getUTCMinutes()==0&&g.getUTCSeconds()==0&&g.getUTCMilliseconds()==0){h=new r(g.getTime());h.setUTCDate(h.getUTCDate()+1);c=h.getTime()}if(n==u&&!h||n>=u&&n<=c){t={type:l.getType(),tooltip:l.getTooltip_AsString()};break}}return t};f.prototype._checkTimeEnabled=function(e){if(!(e instanceof r)){throw new Error("Date must be a UniversalDate object "+this)}var t=e.getTime();var a=this.getParent();if(a&&a._oMinDate&&a._oMaxDate){if(t<a._oMinDate.getTime()||t>a._oMaxDate.getTime()){return false}}return true};f.prototype._handleMouseMove=function(e){if(!this.$().is(":visible")){F.call(this,true)}var t=c(e.target);if(t.hasClass("sapUiCalItemText")){t=t.parent()}if(t.hasClass("sapUiCalItem")){var a=this._getDate();var i=new r(this._oFormatYyyyMMddHHmm.parse(t.attr("data-sap-time"),true).getTime());if(i.getTime()!=a.getTime()){this._setDate(i);S.call(this,i,true);this._bMoveChange=true}}};f.prototype.onmouseup=function(e){if(this._bMouseMove){F.call(this,true);var t=this._getDate();var a=this._oItemNavigation.getItemDomRefs();for(var i=0;i<a.length;i++){var s=c(a[i]);if(s.attr("data-sap-time")==this._oFormatYyyyMMddHHmm.format(t.getJSDate(),true)){s.focus();break}}if(this._bMoveChange){var n=c(e.target);if(n.hasClass("sapUiCalItemText")){n=n.parent()}if(n.hasClass("sapUiCalItem")){t=new r(this._oFormatYyyyMMddHHmm.parse(n.attr("data-sap-time"),true).getTime())}S.call(this,t);this._bMoveChange=false;this._bMousedownChange=false;M.call(this)}}if(this._bMousedownChange){this._bMousedownChange=false;M.call(this)}};f.prototype.onsapselect=function(e){var t=S.call(this,this._getDate());if(t){M.call(this)}e.stopPropagation();e.preventDefault()};f.prototype.onsapselectmodifiers=function(e){this.onsapselect(e)};f.prototype.onsappageupmodifiers=function(e){var t=new r(this._getDate().getTime());var a=t.getUTCDate();if(e.metaKey||e.ctrlKey){t.setUTCDate(a-7)}else{t.setUTCDate(a-1)}this.fireFocus({date:i._createLocalDate(t,true),notVisible:true});e.preventDefault()};f.prototype.onsappagedownmodifiers=function(e){var t=new r(this._getDate().getTime());var a=t.getUTCDate();if(e.metaKey||e.ctrlKey){t.setUTCDate(a+7)}else{t.setUTCDate(a+1)}this.fireFocus({date:i._createLocalDate(t,true),notVisible:true});e.preventDefault()};f.prototype.checkDateFocusable=function(e){i._checkJSDateObject(e);if(this._bNoRangeCheck){return false}var t=this._getStartDate();var a=new r(t.getTime());a.setUTCMinutes(a.getUTCMinutes()+this.getItems()*this.getIntervalMinutes());var s=i._createUniversalUTCDate(e,undefined,true);if(s.getTime()>=t.getTime()&&s.getTime()<a.getTime()){return true}else{return false}};f.prototype.applyFocusInfo=function(e){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex());return this};f.prototype._getIntervalStart=function(e){var t=e.getTime();var a=new r(e.getTime());a.setUTCHours(0);a.setUTCMinutes(0);a.setUTCSeconds(0);a.setUTCMilliseconds(0);var i=this.getIntervalMinutes();while(a.getTime()<=t){a.setUTCMinutes(a.getUTCMinutes()+i)}var s=new r(a.getTime());s.setUTCMinutes(s.getUTCMinutes()-i);return s};f.prototype._setAriaRole=function(e){this._ariaRole=e;return this};f.prototype._getAriaRole=function(){return this._ariaRole?this._ariaRole:"gridcell"};function d(){var e=this._getDate();var t=this._oFormatYyyyMMddHHmm.format(e.getJSDate(),true);var i=0;var r=this.$("times").get(0);var s=this.$("times").children(".sapUiCalItem");for(var n=0;n<s.length;n++){var o=c(s[n]);if(o.attr("data-sap-time")===t){i=n;break}}if(!this._oItemNavigation){this._oItemNavigation=new a;this._oItemNavigation.attachEvent(a.Events.AfterFocus,p,this);this._oItemNavigation.attachEvent(a.Events.FocusAgain,v,this);this._oItemNavigation.attachEvent(a.Events.BorderReached,_,this);this.addDelegate(this._oItemNavigation);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"],saphome:["alt"],sapend:["alt"]});this._oItemNavigation.setCycling(false);this._oItemNavigation.setColumns(1,true)}this._oItemNavigation.setRootDomRef(r);this._oItemNavigation.setItemDomRefs(s);this._oItemNavigation.setFocusedIndex(i);this._oItemNavigation.setPageSize(s.length)}function p(e){var t=e.getParameter("index");var a=e.getParameter("event");if(!a){return}var s=this._getDate();var n=new r(s.getTime());var o=this._oItemNavigation.getItemDomRefs();var l=c(o[t]);n=new r(this._oFormatYyyyMMddHHmm.parse(l.attr("data-sap-time"),true).getTime());this._setDate(n);this.fireFocus({date:i._createLocalDate(n,true),notVisible:false});if(a.type=="mousedown"){D.call(this,a,n,t)}}function v(e){var t=e.getParameter("index");var a=e.getParameter("event");if(!a){return}if(a.type=="mousedown"){var i=this._getDate();D.call(this,a,i,t)}}function _(e){var t=e.getParameter("event");var a=this.getItems();var s=this.getIntervalMinutes();var n=this._getDate();var o=new r(n.getTime());if(t.type){switch(t.type){case"sapnext":case"sapnextmodifiers":o.setUTCMinutes(o.getUTCMinutes()+s);break;case"sapprevious":case"sappreviousmodifiers":o.setUTCMinutes(o.getUTCMinutes()-s);break;case"sappagedown":o.setUTCMinutes(o.getUTCMinutes()+s*a);break;case"sappageup":o.setUTCMinutes(o.getUTCMinutes()-s*a);break;default:break}this.fireFocus({date:i._createLocalDate(o,true),notVisible:true})}}function D(e,t,a){if(e.button){return}var i=S.call(this,t);if(i){this._bMousedownChange=true}if(this._bMouseMove){F.call(this,true);this._bMoveChange=false}else if(this.getIntervalSelection()&&this.$().is(":visible")){L.call(this,true)}e.preventDefault();e.setMark("cancelAutoClose")}function C(e,t){i._checkJSDateObject(e);var a=e.getFullYear();i._checkYearInValidRange(a);var r=true;if(!h(this.getDate(),e)){var s=i._createUniversalUTCDate(e,undefined,true);s=this._getIntervalStart(s);r=this.checkDateFocusable(e);if(!this._bNoRangeCheck&&!r){throw new Error("Date must be in visible date range; "+this)}this.setProperty("date",e,true);this._oUTCDate=s}if(this.getDomRef()){if(r){y.call(this,this._oUTCDate,t)}else{T.call(this,t)}}}function y(e,t){var a=this._oFormatYyyyMMddHHmm.format(e.getJSDate(),true);var i=this._oItemNavigation.getItemDomRefs();var r;for(var s=0;s<i.length;s++){r=c(i[s]);if(r.attr("data-sap-time")==a){if(document.activeElement!=i[s]){if(t){this._oItemNavigation.setFocusedIndex(s)}else{this._oItemNavigation.focusItem(s)}}break}}}function T(e){var t=this._getStartDate();var a=this.$("times");if(a.length>0){var i=sap.ui.getCore().createRenderManager();this.getRenderer().renderTimes(i,this,t);i.flush(a[0]);i.destroy()}I.call(this);d.call(this);if(!e){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex())}}function I(){var e=this._getStartDate();if(this._getShowHeader()){var t=this.$("Head");if(t.length>0){var a=this._getLocaleData();var i=sap.ui.getCore().createRenderManager();this.getRenderer().renderHeaderLine(i,this,a,e);i.flush(t[0]);i.destroy()}}}function S(e,t){if(!this._checkTimeEnabled(e)){return false}var a=this.getSelectedDates();var r;var s=this._oItemNavigation.getItemDomRefs();var n;var o;var l=0;var g=this.getParent();var u=this;var h;if(g&&g.getSelectedDates){u=g}if(this.getSingleSelection()){if(a.length>0){r=a[0];h=r.getStartDate();if(h){h=i._createUniversalUTCDate(h,undefined,true);h=this._getIntervalStart(h)}}else{r=new sap.ui.unified.DateRange;u.addAggregation("selectedDates",r,true)}if(this.getIntervalSelection()&&(!r.getEndDate()||t)&&h){var m;if(e.getTime()<h.getTime()){m=h;h=e;if(!t){r.setProperty("startDate",i._createLocalDate(new Date(h.getTime()),true),true);r.setProperty("endDate",i._createLocalDate(new Date(m.getTime()),true),true)}}else if(e.getTime()>=h.getTime()){m=e;if(!t){r.setProperty("endDate",i._createLocalDate(new Date(m.getTime()),true),true)}}U.call(this,h,m)}else{U.call(this,e);r.setProperty("startDate",i._createLocalDate(new Date(e.getTime()),true),true);r.setProperty("endDate",undefined,true)}}else{if(this.getIntervalSelection()){throw new Error("Calender don't support multiple interval selection")}else{var f=this._checkDateSelected(e);if(f>0){for(l=0;l<a.length;l++){h=a[l].getStartDate();if(h){h=i._createUniversalUTCDate(h,undefined,true);h=this._getIntervalStart(h);if(e.getTime()==h.getTime()){u.removeAggregation("selectedDates",l,true);break}}}}else{r=new sap.ui.unified.DateRange({startDate:i._createLocalDate(new Date(e.getTime()),true)});u.addAggregation("selectedDates",r,true)}o=this._oFormatYyyyMMddHHmm.format(e.getJSDate(),true);for(l=0;l<s.length;l++){n=c(s[l]);if(n.attr("data-sap-time")==o){if(f>0){n.removeClass("sapUiCalItemSel");n.attr("aria-selected","false")}else{n.addClass("sapUiCalItemSel");n.attr("aria-selected","true")}}}}}return true}function U(e,t){var a=this._oItemNavigation.getItemDomRefs();var i;var s=0;var n=false;var o=false;if(!t){var l=this._oFormatYyyyMMddHHmm.format(e.getJSDate(),true);for(s=0;s<a.length;s++){i=c(a[s]);n=false;o=false;if(i.attr("data-sap-time")==l){i.addClass("sapUiCalItemSel");i.attr("aria-selected","true");n=true}else if(i.hasClass("sapUiCalItemSel")){i.removeClass("sapUiCalItemSel");i.attr("aria-selected","false")}if(i.hasClass("sapUiCalItemSelStart")){i.removeClass("sapUiCalItemSelStart")}else if(i.hasClass("sapUiCalItemSelBetween")){i.removeClass("sapUiCalItemSelBetween")}else if(i.hasClass("sapUiCalItemSelEnd")){i.removeClass("sapUiCalItemSelEnd")}b.call(this,i,n,o)}}else{var g;for(s=0;s<a.length;s++){i=c(a[s]);n=false;o=false;g=new r(this._oFormatYyyyMMddHHmm.parse(i.attr("data-sap-time"),true).getTime());if(g.getTime()==e.getTime()){i.addClass("sapUiCalItemSelStart");n=true;i.addClass("sapUiCalItemSel");i.attr("aria-selected","true");if(t&&g.getTime()==t.getTime()){i.addClass("sapUiCalItemSelEnd");o=true}i.removeClass("sapUiCalItemSelBetween")}else if(t&&g.getTime()>e.getTime()&&g.getTime()<t.getTime()){i.addClass("sapUiCalItemSel");i.attr("aria-selected","true");i.addClass("sapUiCalItemSelBetween");i.removeClass("sapUiCalItemSelStart");i.removeClass("sapUiCalItemSelEnd")}else if(t&&g.getTime()==t.getTime()){i.addClass("sapUiCalItemSelEnd");o=true;i.addClass("sapUiCalItemSel");i.attr("aria-selected","true");i.removeClass("sapUiCalItemSelStart");i.removeClass("sapUiCalItemSelBetween")}else{if(i.hasClass("sapUiCalItemSel")){i.removeClass("sapUiCalItemSel");i.attr("aria-selected","false")}if(i.hasClass("sapUiCalItemSelStart")){i.removeClass("sapUiCalItemSelStart")}else if(i.hasClass("sapUiCalItemSelBetween")){i.removeClass("sapUiCalItemSelBetween")}else if(i.hasClass("sapUiCalItemSelEnd")){i.removeClass("sapUiCalItemSelEnd")}}b.call(this,i,n,o)}}}function b(e,t,a){if(!this.getIntervalSelection()){return}var i="";var r=[];var s=this.getId();var n=false;i=e.attr("aria-describedby");if(i){r=i.split(" ")}var o=-1;var l=-1;for(var g=0;g<r.length;g++){var u=r[g];if(u==s+"-Start"){o=g}if(u==s+"-End"){l=g}}if(o>=0&&!t){r.splice(o,1);n=true;if(l>o){l--}}if(l>=0&&!a){r.splice(l,1);n=true}if(o<0&&t){r.push(s+"-Start");n=true}if(l<0&&a){r.push(s+"-End");n=true}if(n){i=r.join(" ");e.attr("aria-describedby",i)}}function M(){if(this._bMouseMove){F.call(this,true)}this.fireSelect()}function w(){this._sInvalidateTimes=undefined;T.call(this,this._bNoFocus);this._bDateRangeChanged=undefined;this._bNoFocus=undefined}function L(){c(window.document).bind("mousemove",this._mouseMoveProxy);this._bMouseMove=true}function F(){c(window.document).unbind("mousemove",this._mouseMoveProxy);this._bMouseMove=undefined}return f});