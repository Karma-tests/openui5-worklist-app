/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/qunit/QUnitUtils","sap/ui/test/Opa5","sap/ui/Device","sap/ui/thirdparty/jquery","sap/ui/test/_OpaLogger"],function(e,t,i,n,r,s){"use strict";return e.extend("sap.ui.test.actions.Action",{metadata:{properties:{idSuffix:{type:"string"}},publicMethods:["executeOn"]},executeOn:function(){return true},$:function(e){var t;var i="";if(this.getIdSuffix()){t=e.$(this.getIdSuffix());i=t.length?"":"DOM representation of control '"+e+"' has no element with user-provided ID suffix '"+this.getIdSuffix()+"'"}else{var n=this._getAdapter(e);if(n){t=e.$(n);i=t.length?"":"DOM representation of control '"+e+"' has no element with ID suffix '"+n+"' which is the default adapter for '"+this.getMetadata().getName()+"'"}if(!t||!t.length){t=r(e.getFocusDomRef());if(!t.length){i+="DOM representation of control '"+e+"' has no focus DOM reference"}}}if(t.length){this.oLogger.info("Found a DOM reference for the control '"+e+"'. Executing '"+this.getMetadata().getName()+"' on the DOM element with ID '"+t[0].id+"'");return t}else{this.oLogger.error(i);throw new Error(i)}},getUtils:function(){return i.getUtils()||t},init:function(){this.controlAdapters={};this.oLogger=s.getLogger(this.getMetadata().getName())},_getAdapter:function(e){var t=function(i){var n=this.controlAdapters[i.getName()];if(n){if(r.isFunction(n)){return n(e)}if(typeof n==="string"){return n}}var s=i.getParent();if(s){return t(s)}return null}.bind(this);return t(e.getMetadata())},_tryOrSimulateFocusin:function(e,t){var i=e.is(":focus");var r;var s=e[0];if(i||n.browser.msie&&n.browser.version<12||n.browser.firefox&&n.browser.version>60){r=true}else{e.focus();var o=e.is(":focus");r=!o}if(r){this.oLogger.debug("Control "+t+" could not be focused - maybe you are debugging?");this._createAndDispatchFocusEvent("focusin",s);this._createAndDispatchFocusEvent("focus",s);this._createAndDispatchFocusEvent("activate",s)}},_simulateFocusout:function(e){this._createAndDispatchFocusEvent("focusout",e);this._createAndDispatchFocusEvent("blur",e);this._createAndDispatchFocusEvent("deactivate",e)},_createAndDispatchMouseEvent:function(e,t){var i=0;var r;if(n.browser.phantomJS||n.browser.msie&&n.browser.version<12){r=document.createEvent("MouseEvent");r.initMouseEvent(e,true,true,window,0,0,0,0,0,false,false,false,false,i,t)}else{r=new MouseEvent(e,{bubbles:true,cancelable:true,identifier:1,target:t,radiusX:1,radiusY:1,rotationAngle:0,button:i,type:e})}t.dispatchEvent(r)},_createAndDispatchFocusEvent:function(e,t){var i;if(n.browser.phantomJS){i=document.createEvent("FocusEvent");i.initEvent(e,true,false)}else if(n.browser.msie&&n.browser.version<12){i=document.createEvent("FocusEvent");i.initFocusEvent(e,true,false,window,0,t)}else{i=new FocusEvent(e)}t.dispatchEvent(i);this.oLogger.info("Dispatched focus event: '"+e+"'")}})});