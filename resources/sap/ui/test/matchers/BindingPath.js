/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/matchers/Matcher"],function(t){"use strict";return t.extend("sap.ui.test.matchers.BindingPath",{metadata:{publicMethods:["isMatching"],properties:{path:{type:"string"},modelName:{type:"string"},propertyPath:{type:"string"}}},isMatching:function(t){var r=this.getModelName()||undefined;var n=this.getPropertyPath();var i=this.getPath();if(!i&&!n){this._oLogger.debug("Matcher requires context path or property path but none is defined! No controls will be matched");return false}var a=true;var o=true;var s=t.mObjectBindingInfos&&t.mObjectBindingInfos[r];var h=t.getBindingContext(r);if(i){if(s){var g=e(i,r);a=s.path===g;this._oLogger.debug("Control '"+t+"'"+(a?" has":" does not have ")+" object binding with context path '"+g+"' for model '"+r+"'")}else{a=!!h&&h.getPath()===i;this._oLogger.debug("Control '"+t+"' "+(a?"has":"does not have")+" binding context with path '"+i+"' for model '"+r+"'")}}if(n){var d=e(n,r,h);var p=Object.keys(t.mBindingInfos).filter(function(e){var n=t.mBindingInfos[e];var i=n.parts?n.parts:[n];var a=i.filter(function(t){var e=t.path===d;var n=s||t.model===r;return e&&n});return!!a.length});o=!!p.length;this._oLogger.debug("Control '"+t+"' "+(o?"has":"does not have")+" binding property path '"+n+"' for model '"+r+"'")}return a&&o}});function e(t,e,r){var n="/";var i=t;if(e||r){if(t.charAt(0)===n){i=t.substring(1)}}else if(t.charAt(0)!==n){i=n+t}return i}});