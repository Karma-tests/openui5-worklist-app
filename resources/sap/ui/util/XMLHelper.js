/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device"],function(r){"use strict";var e={};e.parse=function(r){var n;var t;var o=new DOMParser;try{n=o.parseFromString(r,"text/xml")}catch(r){t=e.getParseError();t.reason=r.message;n={};n.parseError=t;return n}t=e.getParseError(n);if(t){if(!n.parseError){n.parseError=t}}return n};e.getParseError=function(n){var t={errorCode:-1,url:"",reason:"unknown error",srcText:"",line:-1,linepos:-1,filepos:-1};if(r.browser.msie&&n&&n.parseError&&n.parseError.errorCode!=0){return n.parseError}if((r.browser.firefox||r.browser.edge)&&n&&n.documentElement&&n.documentElement.tagName=="parsererror"){var o=n.documentElement.firstChild.nodeValue,s=/XML Parsing Error: (.*)\nLocation: (.*)\nLine Number (\d+), Column (\d+):(.*)/;if(s.test(o)){t.reason=RegExp.$1;t.url=RegExp.$2;t.line=parseInt(RegExp.$3);t.linepos=parseInt(RegExp.$4);t.srcText=RegExp.$5}return t}if(r.browser.webkit&&n&&n.documentElement&&n.getElementsByTagName("parsererror").length>0){var o=e.serialize(n),s=/(error|warning) on line (\d+) at column (\d+): ([^<]*)\n/;if(s.test(o)){t.reason=RegExp.$4;t.url="";t.line=parseInt(RegExp.$2);t.linepos=parseInt(RegExp.$3);t.srcText="";t.type=RegExp.$1}return t}if(!n||!n.documentElement){return t}return{errorCode:0}};e.serialize=function(r){var e=new XMLSerializer;return e.serializeToString(r)};return e});