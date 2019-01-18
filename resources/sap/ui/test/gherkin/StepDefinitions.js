/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/thirdparty/jquery"],function(e,t){"use strict";var i=e.extend("sap.ui.test.gherkin.StepDefinitions",{constructor:function(){e.apply(this,arguments);this._aDefinitions=[];this.init()},init:function(){},closeApplication:function(){},register:function(e,i){if(t.type(e)!=="regexp"){throw new Error("StepDefinitions.register: parameter 'rRegex' must be a valid RegExp object")}if(t.type(i)!=="function"){throw new Error("StepDefinitions.register: parameter 'fnFunc' must be a valid Function")}this._aDefinitions.forEach(function(t){if(t.rRegex.source===e.source){throw new Error("StepDefinitions.register: Duplicate step definition '"+e+"'")}});this._aDefinitions.push({rRegex:e,generateTestStep:function(n){var r=n.text.match(e);if(!r){return{isMatch:false}}var s=r.slice(1);if(n.data){s.push(t.extend(true,[],n.data))}return{isMatch:true,text:n.text,regex:e,parameters:s,func:i}}})},_generateTestStep:function(e){var t=[];this._aDefinitions.forEach(function(i){var n=i.generateTestStep(e);if(n.isMatch){t.push(n)}});if(t.length===1){return t[0]}else if(t.length>1){var i=t.map(function(e){return"'"+e.regex+"'"}).join(", ").replace(/,([^,]*)$/," and$1");throw new Error("Ambiguous step definition error: "+t.length+" step definitions "+i+" match the feature file step '"+e.text+"'")}return{isMatch:false,text:"(NOT FOUND) "+e.text}}});return i});