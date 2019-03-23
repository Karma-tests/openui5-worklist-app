/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/CalendarType","sap/ui/core/Locale","sap/ui/core/LocaleData","sap/ui/core/date/UniversalDate","sap/base/util/deepEqual","sap/base/strings/formatMessage","sap/base/Log","sap/ui/thirdparty/jquery"],function(e,t,a,r,n,i,s,o){"use strict";var l=function(){throw new Error};var u={};l.oDateInfo={oDefaultFormatOptions:{style:"medium",relativeScale:"day",relativeStyle:"wide"},aFallbackFormatOptions:[{style:"short"},{style:"medium"},{pattern:"yyyy-MM-dd"},{pattern:"yyyyMMdd",strictParsing:true}],bShortFallbackFormatOptions:true,bPatternFallbackWithoutDelimiter:true,getPattern:function(e,t,a){return e.getDatePattern(t,a)},oRequiredParts:{text:true,year:true,weekYear:true,month:true,day:true},aRelativeScales:["year","month","week","day"],aRelativeParseScales:["year","quarter","month","week","day","hour","minute","second"],aIntervalCompareFields:["FullYear","Quarter","Month","Week","Date"]};l.oDateTimeInfo={oDefaultFormatOptions:{style:"medium",relativeScale:"auto",relativeStyle:"wide"},aFallbackFormatOptions:[{style:"short"},{style:"medium"},{pattern:"yyyy-MM-dd'T'HH:mm:ss"},{pattern:"yyyyMMdd HHmmss"}],getPattern:function(e,t,a){var r=t.indexOf("/");if(r>0){return e.getCombinedDateTimePattern(t.substr(0,r),t.substr(r+1),a)}else{return e.getCombinedDateTimePattern(t,t,a)}},oRequiredParts:{text:true,year:true,weekYear:true,month:true,day:true,hour0_23:true,hour1_24:true,hour0_11:true,hour1_12:true},aRelativeScales:["year","month","week","day","hour","minute","second"],aRelativeParseScales:["year","quarter","month","week","day","hour","minute","second"],aIntervalCompareFields:["FullYear","Quarter","Month","Week","Date","DayPeriod","Hours","Minutes","Seconds"]};l.oTimeInfo={oDefaultFormatOptions:{style:"medium",relativeScale:"auto",relativeStyle:"wide"},aFallbackFormatOptions:[{style:"short"},{style:"medium"},{pattern:"HH:mm:ss"},{pattern:"HHmmss"}],getPattern:function(e,t,a){return e.getTimePattern(t,a)},oRequiredParts:{text:true,hour0_23:true,hour1_24:true,hour0_11:true,hour1_12:true},aRelativeScales:["hour","minute","second"],aRelativeParseScales:["year","quarter","month","week","day","hour","minute","second"],aIntervalCompareFields:["DayPeriod","Hours","Minutes","Seconds"]};l.getInstance=function(e,t){return this.getDateInstance(e,t)};l.getDateInstance=function(e,t){return this.createInstance(e,t,this.oDateInfo)};l.getDateTimeInstance=function(e,t){return this.createInstance(e,t,this.oDateTimeInfo)};l.getTimeInstance=function(e,t){return this.createInstance(e,t,this.oTimeInfo)};function f(e){var t=e.oLocaleData.getIntervalPattern("",e.oFormatOptions.calendarType);t=t.replace(/[^\{\}01 ]/,"-");return t.replace(/\{(0|1)\}/g,e.oFormatOptions.pattern)}l.createInstance=function(e,r,n){var i=Object.create(this.prototype);if(e instanceof t){r=e;e=undefined}if(!r){r=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()}i.oLocale=r;i.oLocaleData=a.getInstance(r);i.oFormatOptions=o.extend(false,{},n.oDefaultFormatOptions,e);if(!i.oFormatOptions.calendarType){i.oFormatOptions.calendarType=sap.ui.getCore().getConfiguration().getCalendarType()}if(!i.oFormatOptions.pattern){if(i.oFormatOptions.format){i.oFormatOptions.pattern=i.oLocaleData.getCustomDateTimePattern(i.oFormatOptions.format,i.oFormatOptions.calendarType)}else{i.oFormatOptions.pattern=n.getPattern(i.oLocaleData,i.oFormatOptions.style,i.oFormatOptions.calendarType)}}if(i.oFormatOptions.interval){if(i.oFormatOptions.format){i.intervalPatterns=i.oLocaleData.getCustomIntervalPattern(i.oFormatOptions.format,null,i.oFormatOptions.calendarType);if(typeof i.intervalPatterns==="string"){i.intervalPatterns=[i.intervalPatterns]}i.intervalPatterns.push(i.oLocaleData.getCustomDateTimePattern(i.oFormatOptions.format,i.oFormatOptions.calendarType))}else{i.intervalPatterns=[i.oLocaleData.getCombinedIntervalPattern(i.oFormatOptions.pattern,i.oFormatOptions.calendarType),i.oFormatOptions.pattern]}var s=f(i);i.intervalPatterns.push(s)}if(!i.oFormatOptions.fallback){if(!n.oFallbackFormats){n.oFallbackFormats={}}var u=r.toString(),d=i.oFormatOptions.calendarType,h=u+"-"+d,c,g;if(i.oFormatOptions.pattern&&n.bPatternFallbackWithoutDelimiter){h=h+"-"+i.oFormatOptions.pattern}if(i.oFormatOptions.interval){h=h+"-"+"interval"}var v=n.oFallbackFormats[h]?Object.assign({},n.oFallbackFormats[h]):undefined;if(!v){g=n.aFallbackFormatOptions;if(n.bShortFallbackFormatOptions){c=n.getPattern(i.oLocaleData,"short");g=g.concat(l._createFallbackOptionsWithoutDelimiter(c))}if(i.oFormatOptions.pattern&&n.bPatternFallbackWithoutDelimiter){g=l._createFallbackOptionsWithoutDelimiter(i.oFormatOptions.pattern).concat(g)}v=l._createFallbackFormat(g,d,r,n,i.oFormatOptions.interval)}i.aFallbackFormats=v}i.oRequiredParts=n.oRequiredParts;i.aRelativeScales=n.aRelativeScales;i.aRelativeParseScales=n.aRelativeParseScales;i.aIntervalCompareFields=n.aIntervalCompareFields;i.init();return i};l.prototype.init=function(){var e=this.oFormatOptions.calendarType;this.aMonthsAbbrev=this.oLocaleData.getMonths("abbreviated",e);this.aMonthsWide=this.oLocaleData.getMonths("wide",e);this.aMonthsNarrow=this.oLocaleData.getMonths("narrow",e);this.aMonthsAbbrevSt=this.oLocaleData.getMonthsStandAlone("abbreviated",e);this.aMonthsWideSt=this.oLocaleData.getMonthsStandAlone("wide",e);this.aMonthsNarrowSt=this.oLocaleData.getMonthsStandAlone("narrow",e);this.aDaysAbbrev=this.oLocaleData.getDays("abbreviated",e);this.aDaysWide=this.oLocaleData.getDays("wide",e);this.aDaysNarrow=this.oLocaleData.getDays("narrow",e);this.aDaysShort=this.oLocaleData.getDays("short",e);this.aDaysAbbrevSt=this.oLocaleData.getDaysStandAlone("abbreviated",e);this.aDaysWideSt=this.oLocaleData.getDaysStandAlone("wide",e);this.aDaysNarrowSt=this.oLocaleData.getDaysStandAlone("narrow",e);this.aDaysShortSt=this.oLocaleData.getDaysStandAlone("short",e);this.aQuartersAbbrev=this.oLocaleData.getQuarters("abbreviated",e);this.aQuartersWide=this.oLocaleData.getQuarters("wide",e);this.aQuartersNarrow=this.oLocaleData.getQuarters("narrow",e);this.aQuartersAbbrevSt=this.oLocaleData.getQuartersStandAlone("abbreviated",e);this.aQuartersWideSt=this.oLocaleData.getQuartersStandAlone("wide",e);this.aQuartersNarrowSt=this.oLocaleData.getQuartersStandAlone("narrow",e);this.aErasNarrow=this.oLocaleData.getEras("narrow",e);this.aErasAbbrev=this.oLocaleData.getEras("abbreviated",e);this.aErasWide=this.oLocaleData.getEras("wide",e);this.aDayPeriods=this.oLocaleData.getDayPeriods("abbreviated",e);this.aFormatArray=this.parseCldrDatePattern(this.oFormatOptions.pattern);this.sAllowedCharacters=this.getAllowedCharacters(this.aFormatArray)};l._createFallbackFormat=function(e,t,a,r,n){return e.map(function(e){var i=Object.assign({},e);if(n){i.interval=true}i.calendarType=t;i.fallback=true;var s=l.createInstance(i,a,r);s.bIsFallback=true;return s})};l._createFallbackOptionsWithoutDelimiter=function(e){var t=/[^dMyGU]/g,a={regex:/d+/g,replace:"dd"},r={regex:/M+/g,replace:"MM"},n={regex:/[yU]+/g,replace:["yyyy","yy"]};e=e.replace(t,"");e=e.replace(a.regex,a.replace);e=e.replace(r.regex,r.replace);return n.replace.map(function(t){return{pattern:e.replace(n.regex,t),strictParsing:true}})};var d={isNumber:function(e){return e>=48&&e<=57},findNumbers:function(e,t){var a=0;while(a<t&&this.isNumber(e.charCodeAt(a))){a++}if(typeof e!=="string"){e=e.toString()}return e.substr(0,a)},findEntry:function(e,t){var a=-1,r=0;for(var n=0;n<t.length;n++){if(t[n]&&t[n].length>r&&e.indexOf(t[n])===0){a=n;r=t[n].length}}return{index:a,value:a===-1?null:t[a]}},parseTZ:function(e,t){var a=0;var r=e.charAt(0)=="+"?-1:1;var n;a++;n=this.findNumbers(e.substr(a),2);var i=parseInt(n);a+=2;if(t){a++}n=this.findNumbers(e.substr(a),2);a+=2;var s=parseInt(n);return{length:a,tzDiff:(s+60*i)*r}},checkValid:function(e,t,a){if(e in a.oRequiredParts&&t){return false}}};l.prototype.oSymbols={"":{name:"text",format:function(e,t,a,r){return e.value},parse:function(e,t,a,r){var n;var i=true;var s=0;var o=0;for(;o<t.value.length;o++){n=t.value.charAt(o);if(n!==" "){if(e.charAt(s)!==n){i=false}s++}else{while(e.charAt(s)===" "){s++}}if(!i){break}}if(i){return{length:s}}else{var l=false;if(r.index<r.formatArray.length-1){l=r.formatArray[r.index+1].type in a.oRequiredParts}return{valid:d.checkValid(t.type,l,a)}}}},G:{name:"era",format:function(e,t,a,r){var n=a?t.getUTCEra():t.getEra();if(e.digits<=3){return r.aErasAbbrev[n]}else if(e.digits===4){return r.aErasWide[n]}else{return r.aErasNarrow[n]}},parse:function(e,t,a,r){var n=[a.aErasWide,a.aErasAbbrev,a.aErasNarrow];for(var i=0;i<n.length;i++){var s=n[i];var o=d.findEntry(e,s);if(o.index!==-1){return{era:o.index,length:o.value.length}}}return{era:a.aErasWide.length-1,valid:d.checkValid(t.type,true,a)}}},y:{name:"year",format:function(t,a,r,n){var i=r?a.getUTCFullYear():a.getFullYear();var s=String(i);var o=n.oFormatOptions.calendarType;if(t.digits==2&&s.length>2){s=s.substr(s.length-2)}if(o!=e.Japanese&&t.digits==1&&i<100){s=s.padStart(4,"0")}return s.padStart(t.digits,"0")},parse:function(t,a,n,i){var s=n.oFormatOptions.calendarType;var o;if(a.digits==1){o=d.findNumbers(t,4)}else if(a.digits==2){o=d.findNumbers(t,2)}else{o=d.findNumbers(t,a.digits)}var l=parseInt(o);if(s!=e.Japanese&&o.length<=2){var u=r.getInstance(new Date,s),f=u.getFullYear(),h=Math.floor(f/100),c=h*100+l-f;if(c<-70){l+=(h+1)*100}else if(c<30){l+=h*100}else{l+=(h-1)*100}}return{length:o.length,valid:d.checkValid(a.type,o==="",n),year:l}}},Y:{name:"weekYear",format:function(t,a,r,n){var i=r?a.getUTCWeek():a.getWeek();var s=i.year;var o=String(s);var l=n.oFormatOptions.calendarType;if(t.digits==2&&o.length>2){o=o.substr(o.length-2)}if(l!=e.Japanese&&t.digits==1&&s<100){o=o.padStart(4,"0")}return o.padStart(t.digits,"0")},parse:function(t,a,n,i){var s=n.oFormatOptions.calendarType;var o;if(a.digits==1){o=d.findNumbers(t,4)}else if(a.digits==2){o=d.findNumbers(t,2)}else{o=d.findNumbers(t,a.digits)}var l=parseInt(o);var u;if(s!=e.Japanese&&o.length<=2){var f=r.getInstance(new Date,s),h=f.getFullYear(),c=Math.floor(h/100),g=c*100+u-h;if(g<-70){u+=(c+1)*100}else if(g<30){u+=c*100}else{u+=(c-1)*100}}return{length:o.length,valid:d.checkValid(a.type,o==="",n),year:l,weekYear:u}}},M:{name:"month",format:function(e,t,a,r){var n=a?t.getUTCMonth():t.getMonth();if(e.digits==3){return r.aMonthsAbbrev[n]}else if(e.digits==4){return r.aMonthsWide[n]}else if(e.digits>4){return r.aMonthsNarrow[n]}else{return String(n+1).padStart(e.digits,"0")}},parse:function(e,t,a,r){var n=[a.aMonthsWide,a.aMonthsWideSt,a.aMonthsAbbrev,a.aMonthsAbbrevSt,a.aMonthsNarrow,a.aMonthsNarrowSt];var i;var s;var o;if(t.digits<3){o=d.findNumbers(e,Math.max(t.digits,2));i=d.checkValid(t.type,o==="",a);s=parseInt(o)-1;if(r.strict&&(s>11||s<0)){i=false}}else{for(var l=0;l<n.length;l++){var u=n[l];var f=d.findEntry(e,u);if(f.index!==-1){return{month:f.index,length:f.value.length}}}i=d.checkValid(t.type,true,a)}return{month:s,length:o?o.length:0,valid:i}}},L:{name:"monthStandalone",format:function(e,t,a,r){var n=a?t.getUTCMonth():t.getMonth();if(e.digits==3){return r.aMonthsAbbrevSt[n]}else if(e.digits==4){return r.aMonthsWideSt[n]}else if(e.digits>4){return r.aMonthsNarrowSt[n]}else{return String(n+1).padStart(e.digits,"0")}},parse:function(e,t,a,r){var n=[a.aMonthsWide,a.aMonthsWideSt,a.aMonthsAbbrev,a.aMonthsAbbrevSt,a.aMonthsNarrow,a.aMonthsNarrowSt];var i;var s;var o;if(t.digits<3){o=d.findNumbers(e,Math.max(t.digits,2));i=d.checkValid(t.type,o==="",a);s=parseInt(o)-1;if(r.strict&&(s>11||s<0)){i=false}}else{for(var l=0;l<n.length;l++){var u=n[l];var f=d.findEntry(e,u);if(f.index!==-1){return{month:f.index,length:f.value.length}}}i=d.checkValid(t.type,true,a)}return{month:s,length:o?o.length:0,valid:i}}},w:{name:"weekInYear",format:function(e,t,a,r){var n=a?t.getUTCWeek():t.getWeek();var i=n.week;var s=String(i+1);if(e.digits<3){s=s.padStart(e.digits,"0")}else{s=r.oLocaleData.getCalendarWeek(e.digits===3?"narrow":"wide",s.padStart(2,"0"))}return s},parse:function(e,t,a,r){var n;var i;var s;var o=0;if(t.digits<3){i=d.findNumbers(e,2);o=i.length;s=parseInt(i)-1;n=d.checkValid(t.type,!i,a)}else{i=a.oLocaleData.getCalendarWeek(t.digits===3?"narrow":"wide");i=i.replace("{0}","[0-9]+");var l=new RegExp(i),u=l.exec(e);if(u){o=u[0].length;s=parseInt(u[0])-1}else{n=d.checkValid(t.type,true,a)}}return{length:o,valid:n,week:s}}},W:{name:"weekInMonth",format:function(e,t,a,r){return""},parse:function(){return{}}},D:{name:"dayInYear",format:function(e,t,a,r){},parse:function(){return{}}},d:{name:"day",format:function(e,t,a,r){var n=a?t.getUTCDate():t.getDate();return String(n).padStart(e.digits,"0")},parse:function(e,t,a,r){var n=d.findNumbers(e,Math.max(t.digits,2));var i=d.checkValid(t.type,n==="",a);var s=parseInt(n);if(r.strict&&(s>31||s<1)){i=false}return{day:s,length:n.length,valid:i}}},Q:{name:"quarter",format:function(e,t,a,r){var n=a?t.getUTCQuarter():t.getQuarter();if(e.digits==3){return r.aQuartersAbbrev[n]}else if(e.digits==4){return r.aQuartersWide[n]}else if(e.digits>4){return r.aQuartersNarrow[n]}else{return String(n+1).padStart(e.digits,"0")}},parse:function(e,t,a,r){var n;var i;var s;var o=[a.aQuartersWide,a.aQuartersWideSt,a.aQuartersAbbrev,a.aQuartersAbbrevSt,a.aQuartersNarrow,a.aQuartersNarrowSt];if(t.digits<3){s=d.findNumbers(e,Math.max(t.digits,2));n=d.checkValid(t.type,s==="",a);i=parseInt(s)-1;if(r.strict&&i>3){n=false}}else{for(var l=0;l<o.length;l++){var u=o[l];var f=d.findEntry(e,u);if(f.index!==-1){return{quarter:f.index,length:f.value.length}}}n=d.checkValid(t.type,true,a)}return{length:s?s.length:0,quarter:i,valid:n}}},q:{name:"quarterStandalone",format:function(e,t,a,r){var n=a?t.getUTCQuarter():t.getQuarter();if(e.digits==3){return r.aQuartersAbbrevSt[n]}else if(e.digits==4){return r.aQuartersWideSt[n]}else if(e.digits>4){return r.aQuartersNarrowSt[n]}else{return String(n+1).padStart(e.digits,"0")}},parse:function(e,t,a,r){var n;var i;var s;var o=[a.aQuartersWide,a.aQuartersWideSt,a.aQuartersAbbrev,a.aQuartersAbbrevSt,a.aQuartersNarrow,a.aQuartersNarrowSt];if(t.digits<3){s=d.findNumbers(e,Math.max(t.digits,2));n=d.checkValid(t.type,s==="",a);i=parseInt(s)-1;if(r.strict&&i>3){n=false}}else{for(var l=0;l<o.length;l++){var u=o[l];var f=d.findEntry(e,u);if(f.index!==-1){return{quarter:f.index,length:f.value.length}}}n=d.checkValid(t.type,true,a)}return{length:s?s.length:0,quarter:i,valid:n}}},F:{name:"dayOfWeekInMonth",format:function(e,t,a,r){return""},parse:function(){return{}}},E:{name:"dayNameInWeek",format:function(e,t,a,r){var n=a?t.getUTCDay():t.getDay();if(e.digits<4){return r.aDaysAbbrev[n]}else if(e.digits==4){return r.aDaysWide[n]}else if(e.digits==5){return r.aDaysNarrow[n]}else{return r.aDaysShort[n]}},parse:function(e,t,a,r){var n=[a.aDaysWide,a.aDaysWideSt,a.aDaysAbbrev,a.aDaysAbbrevSt,a.aDaysShort,a.aDaysShortSt,a.aDaysNarrow,a.aDaysNarrowSt];for(var i=0;i<n.length;i++){var s=n[i];var o=d.findEntry(e,s);if(o.index!==-1){return{dayOfWeek:o.index,length:o.value.length}}}}},c:{name:"dayNameInWeekStandalone",format:function(e,t,a,r){var n=a?t.getUTCDay():t.getDay();if(e.digits<4){return r.aDaysAbbrevSt[n]}else if(e.digits==4){return r.aDaysWideSt[n]}else if(e.digits==5){return r.aDaysNarrowSt[n]}else{return r.aDaysShortSt[n]}},parse:function(e,t,a,r){var n=[a.aDaysWide,a.aDaysWideSt,a.aDaysAbbrev,a.aDaysAbbrevSt,a.aDaysShort,a.aDaysShortSt,a.aDaysNarrow,a.aDaysNarrowSt];for(var i=0;i<n.length;i++){var s=n[i];var o=d.findEntry(e,s);if(o.index!==-1){return{day:o.index,length:o.value.length}}}}},u:{name:"dayNumberOfWeek",format:function(e,t,a,r){var n=a?t.getUTCDay():t.getDay();return r._adaptDayOfWeek(n)},parse:function(e,t,a,r){var n=d.findNumbers(e,t.digits);return{dayNumberOfWeek:parseInt(n),length:n.length}}},a:{name:"amPmMarker",format:function(e,t,a,r){var n=a?t.getUTCDayPeriod():t.getDayPeriod();return r.aDayPeriods[n]},parse:function(e,t,a,r){var n;var i;var s=a.aDayPeriods[0],o=a.aDayPeriods[1];var l=/[aApP](?:\.)?[mM](?:\.)?/;var u=e.match(l);var f=u&&u.index===0;if(f){e=u[0].replace(/\./g,"").toLowerCase()+e.substring(u[0].length);s=s.replace(/\./g,"").toLowerCase();o=o.replace(/\./g,"").toLowerCase()}if(e.indexOf(s)===0){n=false;i=f?u[0].length:s.length}else if(e.indexOf(o)===0){n=true;i=f?u[0].length:o.length}return{pm:n,length:i}}},H:{name:"hour0_23",format:function(e,t,a,r){var n=a?t.getUTCHours():t.getHours();return String(n).padStart(e.digits,"0")},parse:function(e,t,a,r){var n;var i=d.findNumbers(e,Math.max(t.digits,2));var s=parseInt(i);n=d.checkValid(t.type,i==="",a);if(r.strict&&s>23){n=false}return{hour:s,length:i.length,valid:n}}},k:{name:"hour1_24",format:function(e,t,a,r){var n=a?t.getUTCHours():t.getHours();var i=n===0?"24":String(n);return i.padStart(e.digits,"0")},parse:function(e,t,a,r){var n;var i=d.findNumbers(e,Math.max(t.digits,2));var s=parseInt(i);n=d.checkValid(t.type,i==="",a);if(s==24){s=0}if(r.strict&&s>23){n=false}return{hour:s,length:i.length,valid:n}}},K:{name:"hour0_11",format:function(e,t,a,r){var n=a?t.getUTCHours():t.getHours();var i=String(n>11?n-12:n);return i.padStart(e.digits,"0")},parse:function(e,t,a,r){var n;var i=d.findNumbers(e,Math.max(t.digits,2));var s=parseInt(i);n=d.checkValid(t.type,i==="",a);if(r.strict&&s>11){n=false}return{hour:s,length:i.length,valid:n}}},h:{name:"hour1_12",format:function(e,t,a,r){var n=a?t.getUTCHours():t.getHours();var i;if(n>12){i=String(n-12)}else if(n==0){i="12"}else{i=String(n)}return i.padStart(e.digits,"0")},parse:function(e,t,a,r){var n=r.dateValue.pm;var i=d.findNumbers(e,Math.max(t.digits,2));var s=parseInt(i);var o=d.checkValid(t.type,i==="",a);if(s==12){s=0;n=n===undefined?true:n}if(r.strict&&s>11){o=false}return{hour:s,length:i.length,pm:n,valid:o}}},m:{name:"minute",format:function(e,t,a,r){var n=a?t.getUTCMinutes():t.getMinutes();return String(n).padStart(e.digits,"0")},parse:function(e,t,a,r){var n;var i=d.findNumbers(e,Math.max(t.digits,2));var s=parseInt(i);n=d.checkValid(t.type,i==="",a);if(r.strict&&s>59){n=false}return{length:i.length,minute:s,valid:n}}},s:{name:"second",format:function(e,t,a,r){var n=a?t.getUTCSeconds():t.getSeconds();return String(n).padStart(e.digits,"0")},parse:function(e,t,a,r){var n;var i=d.findNumbers(e,Math.max(t.digits,2));var s=parseInt(i);n=d.checkValid(t.type,i==="",a);if(r.strict&&s>59){n=false}return{length:i.length,second:s,valid:n}}},S:{name:"fractionalsecond",format:function(e,t,a,r){var n=a?t.getUTCMilliseconds():t.getMilliseconds();var i=String(n);var s=i.padStart(3,"0");s=s.substr(0,e.digits);s=s.padEnd(e.digits,"0");return s},parse:function(e,t,a,r){var n=d.findNumbers(e,t.digits);var i=n.length;n=n.substr(0,3);n=n.padEnd(3,"0");var s=parseInt(n);return{length:i,millisecond:s}}},z:{name:"timezoneGeneral",format:function(e,t,a,r){if(e.digits>3&&t.getTimezoneLong()){return t.getTimezoneLong()}else if(t.getTimezoneShort()){return t.getTimezoneShort()}var n="GMT";var i=Math.abs(t.getTimezoneOffset());var s=t.getTimezoneOffset()>0;var o=Math.floor(i/60);var l=i%60;if(!a&&i!=0){n+=s?"-":"+";n+=String(o).padStart(2,"0");n+=":";n+=String(l).padStart(2,"0")}else{n+="Z"}return n},parse:function(e,t,a,r){var n=0;var i;var s=e.substring(0,3);if(s==="GMT"||s==="UTC"){n=3}else if(e.substring(0,2)==="UT"){n=2}else if(e.charAt(0)=="Z"){n=1;i=0}else{return{error:"cannot be parsed correcly by sap.ui.core.format.DateFormat: The given timezone is not supported!"}}if(e.charAt(0)!="Z"){var o=d.parseTZ(e.substr(n),true);n+=o.length;i=o.tzDiff}return{length:n,tzDiff:i}}},Z:{name:"timezoneRFC822",format:function(e,t,a,r){var n=Math.abs(t.getTimezoneOffset());var i=t.getTimezoneOffset()>0;var s=Math.floor(n/60);var o=n%60;var l="";if(!a&&n!=0){l+=i?"-":"+";l+=String(s).padStart(2,"0");l+=String(o).padStart(2,"0")}return l},parse:function(e,t,a,r){return d.parseTZ(e,false)}},X:{name:"timezoneISO8601",format:function(e,t,a,r){var n=Math.abs(t.getTimezoneOffset());var i=t.getTimezoneOffset()>0;var s=Math.floor(n/60);var o=n%60;var l="";if(!a&&n!=0){l+=i?"-":"+";l+=String(s).padStart(2,"0");l+=":";l+=String(o).padStart(2,"0")}else{l+="Z"}return l},parse:function(e,t,a,r){if(e.charAt(0)=="Z"){return{length:1,tzDiff:0}}else{return d.parseTZ(e,true)}}}};l.prototype._format=function(e,t){if(this.oFormatOptions.relative){var a=this.formatRelative(e,t,this.oFormatOptions.relativeRange);if(a){return a}}var n=this.oFormatOptions.calendarType;var i=r.getInstance(e,n);var s=[],o,l,u;for(var f=0;f<this.aFormatArray.length;f++){o=this.aFormatArray[f];u=o.symbol||"";s.push(this.oSymbols[u].format(o,i,t,this))}l=s.join("");if(sap.ui.getCore().getConfiguration().getOriginInfo()){l=new String(l);l.originInfo={source:"Common Locale Data Repository",locale:this.oLocale.toString(),style:this.oFormatOptions.style,pattern:this.oFormatOptions.pattern}}return l};l.prototype.format=function(e,t){if(t===undefined){t=this.oFormatOptions.UTC}if(Array.isArray(e)){if(!this.oFormatOptions.interval){s.error("Non-interval DateFormat can't format more than one date instance.");return""}if(e.length!==2){s.error("Interval DateFormat can only format with 2 date instances but "+e.length+" is given.");return""}if(this.oFormatOptions.singleIntervalValue){if(e[0]===null){s.error("First date instance which is passed to the interval DateFormat shouldn't be null.");return""}if(e[1]===null){return this._format(e[0],t)}}var a=e.every(function(e){return e&&!isNaN(e.getTime())});if(!a){s.error("At least one date instance which is passed to the interval DateFormat isn't valid.");return""}return this._formatInterval(e,t)}else{if(!e||isNaN(e.getTime())){s.error("The given date instance isn't valid.");return""}if(this.oFormatOptions.interval){s.error("Interval DateFormat expects an array with two dates for the first argument but only one date is given.");return""}return this._format(e,t)}};l.prototype._formatInterval=function(e,t){var a=this.oFormatOptions.calendarType;var n=r.getInstance(e[0],a);var i=r.getInstance(e[1],a);var s;var o;var l;var u=[];var f;var d=[];var h=this._getGreatestDiffField([n,i],t);if(!h){return this._format(e[0],t)}if(this.oFormatOptions.format){f=this.oLocaleData.getCustomIntervalPattern(this.oFormatOptions.format,h,a)}else{f=this.oLocaleData.getCombinedIntervalPattern(this.oFormatOptions.pattern,a)}d=this.parseCldrDatePattern(f);s=n;for(var c=0;c<d.length;c++){o=d[c];l=o.symbol||"";if(o.repeat){s=i}u.push(this.oSymbols[l].format(o,s,t,this))}return u.join("")};var h={FullYear:"Year",Quarter:"Quarter",Month:"Month",Week:"Week",Date:"Day",DayPeriod:"DayPeriod",Hours:"Hour",Minutes:"Minute",Seconds:"Second"};l.prototype._getGreatestDiffField=function(e,t){var a=false,r={};this.aIntervalCompareFields.forEach(function(i){var s="get"+(t?"UTC":""),o=s+i,l=h[i],u=e[0][o].apply(e[0]),f=e[1][o].apply(e[1]);if(!n(u,f)){a=true;r[l]=true}});if(a){return r}return null};l.prototype._parse=function(e,t,a,r){var n=0,i,s,l;var u={valid:true};var f={formatArray:t,dateValue:u,strict:r};for(var d=0;d<t.length;d++){s=e.substr(n);i=t[d];f.index=d;l=this.oSymbols[i.symbol||""].parse(s,i,this,f)||{};u=o.extend(u,l);if(l.valid===false){break}n+=l.length||0}u.index=n;if(u.pm){u.hour+=12}if(u.dayNumberOfWeek===undefined&&u.dayOfWeek!==undefined){u.dayNumberOfWeek=this._adaptDayOfWeek(u.dayOfWeek)}if(u.quarter!==undefined&&u.month===undefined&&u.day===undefined){u.month=3*u.quarter;u.day=1}return u};l.prototype._parseInterval=function(e,t,a,r){var n,i,s;this.intervalPatterns.some(function(t){var o=this.parseCldrDatePattern(t);i=undefined;for(var l=0;l<o.length;l++){if(o[l].repeat){i=l;break}}if(i===undefined){s=this._parse(e,o,a,r);if(s.index===0||s.index<e.length){s.valid=false}if(s.valid===false){return}n=[s,s];return true}else{n=[];s=this._parse(e,o.slice(0,i),a,r);if(s.valid===false){return}n.push(s);var u=s.index;s=this._parse(e.substring(u),o.slice(i),a,r);if(s.index===0||s.index+u<e.length){s.valid=false}if(s.valid===false){return}n.push(s);return true}}.bind(this));return n};var c=function(e,t,a,n){var i,s=typeof e.year==="number"?e.year:1970;if(e.valid){if(a||e.tzDiff!==undefined){i=r.getInstance(new Date(0),t);i.setUTCEra(e.era||r.getCurrentEra(t));i.setUTCFullYear(s);i.setUTCMonth(e.month||0);i.setUTCDate(e.day||1);i.setUTCHours(e.hour||0);i.setUTCMinutes(e.minute||0);i.setUTCSeconds(e.second||0);i.setUTCMilliseconds(e.millisecond||0);if(n&&(e.day||1)!==i.getUTCDate()){e.valid=false;i=undefined}else{if(e.tzDiff){i.setUTCMinutes((e.minute||0)+e.tzDiff)}if(e.week!==undefined&&(e.month===undefined||e.day===undefined)){i.setUTCWeek({year:e.weekYear||e.year,week:e.week});if(e.dayNumberOfWeek!==undefined){i.setUTCDate(i.getUTCDate()+e.dayNumberOfWeek-1)}}}}else{i=r.getInstance(new Date(1970,0,1,0,0,0),t);i.setEra(e.era||r.getCurrentEra(t));i.setFullYear(s);i.setMonth(e.month||0);i.setDate(e.day||1);i.setHours(e.hour||0);i.setMinutes(e.minute||0);i.setSeconds(e.second||0);i.setMilliseconds(e.millisecond||0);if(n&&(e.day||1)!==i.getDate()){e.valid=false;i=undefined}else if(e.week!==undefined&&(e.month===undefined||e.day===undefined)){i.setWeek({year:e.weekYear||e.year,week:e.week});if(e.dayNumberOfWeek!==undefined){i.setDate(i.getDate()+e.dayNumberOfWeek-1)}}}if(e.valid){i=i.getJSDate();return i}}return null};function g(e,t){if(e===t){return e}var a={};Object.keys(e).forEach(function(t){a[t]=e[t]});Object.keys(t).forEach(function(e){if(!a.hasOwnProperty(e)){a[e]=t[e]}});return a}function v(e,t){if(e.getTime()>t.getTime()){return false}return true}l.prototype.parse=function(e,t,a){e=o.trim(e);var r;var n=this.oFormatOptions.calendarType;if(t===undefined){t=this.oFormatOptions.UTC}if(a===undefined){a=this.oFormatOptions.strictParsing}if(!this.oFormatOptions.interval){var i=this.parseRelative(e,t);if(i){return i}r=this._parse(e,this.aFormatArray,t,a);if(r.index===0||r.index<e.length){r.valid=false}i=c(r,n,t,a);if(i){return i}}else{var l=this._parseInterval(e,n,t,a);var u,f;if(l&&l.length==2){var d=g(l[0],l[1]);var h=g(l[1],l[0]);u=c(d,n,t,a);f=c(h,n,t,a);if(u&&f){if(this.oFormatOptions.singleIntervalValue&&u.getTime()===f.getTime()){return[u,null]}var m=v(u,f);if(a&&!m){s.error("StrictParsing: Invalid date range. The given end date is before the start date.");return[null,null]}return[u,f]}}}if(!this.bIsFallback){var p;this.aFallbackFormats.every(function(r){p=r.parse(e,t,a);if(Array.isArray(p)){return!(p[0]&&p[1])}else{return!p}});return p}if(!this.oFormatOptions.interval){return null}else{return[null,null]}};l.prototype.parseCldrDatePattern=function(e){if(u[e]){return u[e]}var t=[],a,r=false,n=null,i="",s="",o={},l=false;for(a=0;a<e.length;a++){var f=e.charAt(a),d,h,c;if(r){if(f=="'"){h=e.charAt(a-1);c=e.charAt(a-2);d=e.charAt(a+1);if(h=="'"&&c!="'"){r=false}else if(d=="'"){a+=1}else{r=false;continue}}if(i=="text"){n.value+=f}else{n={type:"text",value:f};t.push(n);i="text"}}else{if(f=="'"){r=true}else if(this.oSymbols[f]){s=this.oSymbols[f].name;if(i==s){n.digits++}else{n={type:s,symbol:f,digits:1};t.push(n);i=s;if(!l){if(o[s]){n.repeat=true;l=true}else{o[s]=true}}}}else{if(i=="text"){n.value+=f}else{n={type:"text",value:f};t.push(n);i="text"}}}}u[e]=t;return t};l.prototype.parseRelative=function(e,t){var a,r,n,i,s;if(!e){return null}a=this.oLocaleData.getRelativePatterns(this.aRelativeParseScales,this.oFormatOptions.relativeStyle);for(var o=0;o<a.length;o++){r=a[o];n=new RegExp("^\\s*"+r.pattern.replace(/\{0\}/,"(\\d+)")+"\\s*$","i");i=n.exec(e);if(i){if(r.value!==undefined){return l(r.value,r.scale)}else{s=parseInt(i[1]);return l(s*r.sign,r.scale)}}}function l(e,a){var r,n=new Date,i;if(t){r=n.getTime()}else{r=Date.UTC(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds(),n.getMilliseconds())}i=new Date(r);switch(a){case"second":i.setUTCSeconds(i.getUTCSeconds()+e);break;case"minute":i.setUTCMinutes(i.getUTCMinutes()+e);break;case"hour":i.setUTCHours(i.getUTCHours()+e);break;case"day":i.setUTCDate(i.getUTCDate()+e);break;case"week":i.setUTCDate(i.getUTCDate()+e*7);break;case"month":i.setUTCMonth(i.getUTCMonth()+e);break;case"quarter":i.setUTCMonth(i.getUTCMonth()+e*3);break;case"year":i.setUTCFullYear(i.getUTCFullYear()+e);break}if(t){return i}else{return new Date(i.getUTCFullYear(),i.getUTCMonth(),i.getUTCDate(),i.getUTCHours(),i.getUTCMinutes(),i.getUTCSeconds(),i.getUTCMilliseconds())}}};l.prototype.formatRelative=function(e,t,a){var r=new Date,n,s=this.oFormatOptions.relativeScale||"day",o,l,u;u=(e.getTime()-r.getTime())/1e3;if(this.oFormatOptions.relativeScale=="auto"){s=this._getScale(u,this.aRelativeScales)}if(!a){a=this._mRanges[s]}if(s=="year"||s=="month"||s=="day"){r=new Date(Date.UTC(r.getFullYear(),r.getMonth(),r.getDate()));n=new Date(0);if(t){n.setUTCFullYear(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate())}else{n.setUTCFullYear(e.getFullYear(),e.getMonth(),e.getDate())}e=n}o=this._getDifference(s,[r,e]);if(this.oFormatOptions.relativeScale!="auto"&&(o<a[0]||o>a[1])){return null}l=this.oLocaleData.getRelativePattern(s,o,u>0,this.oFormatOptions.relativeStyle);return i(l,[Math.abs(o)])};l.prototype._mRanges={second:[-60,60],minute:[-60,60],hour:[-24,24],day:[-6,6],week:[-4,4],month:[-12,12],year:[-10,10]};l.prototype._mScales={second:1,minute:60,hour:3600,day:86400,week:604800,month:2592e3,quarter:7776e3,year:31536e3};l.prototype._getScale=function(e,t){var a,r;e=Math.abs(e);for(var n=0;n<t.length;n++){r=t[n];if(e>=this._mScales[r]){a=r;break}}if(!a){a=t[t.length-1]}return a};function m(e,t){var a=["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],r;for(var n=t;n<a.length;n++){r="set"+a[t];e[r].apply(e,[0])}}var p={year:function(e,t){return t.getFullYear()-e.getFullYear()},month:function(e,t){return t.getMonth()-e.getMonth()+this.year(e,t)*12},week:function(e,t,a){var r=a._adaptDayOfWeek(e.getDay());var n=a._adaptDayOfWeek(t.getDay());m(e,3);m(t,3);return(t.getTime()-e.getTime()-(n-r)*a._mScales.day*1e3)/(a._mScales.week*1e3)},day:function(e,t,a){m(e,3);m(t,3);return(t.getTime()-e.getTime())/(a._mScales.day*1e3)},hour:function(e,t,a){m(e,4);m(t,4);return(t.getTime()-e.getTime())/(a._mScales.hour*1e3)},minute:function(e,t,a){m(e,5);m(t,5);return(t.getTime()-e.getTime())/(a._mScales.minute*1e3)},second:function(e,t,a){m(e,6);m(t,6);return(t.getTime()-e.getTime())/(a._mScales.second*1e3)}};l.prototype._adaptDayOfWeek=function(e){var t=a.getInstance(sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()).getFirstDayOfWeek();var r=e-(t-1);if(r<=0){r+=7}return r};l.prototype._getDifference=function(e,t){var a=t[0];var r=t[1];return Math.round(p[e](a,r,this))};l.prototype.getAllowedCharacters=function(e){if(this.oFormatOptions.relative){return""}var t="";var a=false;var r=false;var n;for(var i=0;i<e.length;i++){n=e[i];switch(n.type){case"text":if(t.indexOf(n.value)<0){t+=n.value}break;case"day":case"year":case"weekYear":case"dayNumberOfWeek":case"weekInYear":case"hour0_23":case"hour1_24":case"hour0_11":case"hour1_12":case"minute":case"second":case"fractionalsecond":if(!a){t+="0123456789";a=true}break;case"month":case"monthStandalone":if(n.digits<3){if(!a){t+="0123456789";a=true}}else{r=true}break;default:r=true;break}}if(r){t=""}return t};return l},true);