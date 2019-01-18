/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/message/MessageProcessor","./BindingMode","./Context","./Filter","sap/base/util/deepEqual","sap/ui/thirdparty/jquery"],function(t,e,i,r,n,s){"use strict";var o=t.extend("sap.ui.model.Model",{constructor:function(){t.apply(this,arguments);this.oData={};this.bDestroyed=false;this.aBindings=[];this.mContexts={};this.iSizeLimit=100;this.sDefaultBindingMode=e.TwoWay;this.mSupportedBindingModes={OneWay:true,TwoWay:true,OneTime:true};this.mUnsupportedFilterOperators={};this.bLegacySyntax=false;this.sUpdateTimer=null},metadata:{abstract:true,publicMethods:["bindProperty","bindList","bindTree","bindContext","createBindingContext","destroyBindingContext","getProperty","getDefaultBindingMode","setDefaultBindingMode","isBindingModeSupported","attachParseError","detachParseError","attachRequestCompleted","detachRequestCompleted","attachRequestFailed","detachRequestFailed","attachRequestSent","detachRequestSent","attachPropertyChange","detachPropertyChange","setSizeLimit","refresh","isList","getObject"]}});o.M_EVENTS={ParseError:"parseError",RequestFailed:"requestFailed",RequestSent:"requestSent",RequestCompleted:"requestCompleted",PropertyChange:"propertyChange"};o.prototype.attachRequestFailed=function(t,e,i){this.attachEvent("requestFailed",t,e,i);return this};o.prototype.detachRequestFailed=function(t,e){this.detachEvent("requestFailed",t,e);return this};o.prototype.fireRequestFailed=function(t){this.fireEvent("requestFailed",t);return this};o.prototype.attachParseError=function(t,e,i){this.attachEvent("parseError",t,e,i);return this};o.prototype.detachParseError=function(t,e){this.detachEvent("parseError",t,e);return this};o.prototype.fireParseError=function(t){this.fireEvent("parseError",t);return this};o.prototype.attachRequestSent=function(t,e,i){this.attachEvent("requestSent",t,e,i);return this};o.prototype.detachRequestSent=function(t,e){this.detachEvent("requestSent",t,e);return this};o.prototype.fireRequestSent=function(t){this.fireEvent("requestSent",t);return this};o.prototype.attachRequestCompleted=function(t,e,i){this.attachEvent("requestCompleted",t,e,i);return this};o.prototype.detachRequestCompleted=function(t,e){this.detachEvent("requestCompleted",t,e);return this};o.prototype.fireRequestCompleted=function(t){this.fireEvent("requestCompleted",t);return this};o.prototype.attachMessageChange=function(t,e,i){this.attachEvent("messageChange",t,e,i);return this};o.prototype.detachMessageChange=function(t,e){this.detachEvent("messageChange",t,e);return this};o.prototype.firePropertyChange=function(t){this.fireEvent("propertyChange",t);return this};o.prototype.attachPropertyChange=function(t,e,i){this.attachEvent("propertyChange",t,e,i);return this};o.prototype.detachPropertyChange=function(t,e){this.detachEvent("propertyChange",t,e);return this};o.prototype.getObject=function(t,e,i){return this.getProperty(t,e,i)};o.prototype.getContext=function(t){if(!t.startsWith("/")){throw new Error("Path "+t+" must start with a / ")}var e=this.mContexts[t];if(!e){e=new i(this,t);this.mContexts[t]=e}return e};o.prototype.resolve=function(t,e){var i=typeof t=="string"&&!t.startsWith("/"),r=t,n;if(i){if(e){n=e.getPath();r=n+(n.endsWith("/")?"":"/")+t}else{r=this.isLegacySyntax()?"/"+t:undefined}}if(!t&&e){r=e.getPath()}if(r&&r!=="/"&&r.endsWith("/")){r=r.substr(0,r.length-1)}return r};o.prototype.addBinding=function(t){this.aBindings.push(t)};o.prototype.removeBinding=function(t){var e=this.aBindings.indexOf(t);if(e!==-1){this.aBindings.splice(e,1)}};o.prototype.getDefaultBindingMode=function(){return this.sDefaultBindingMode};o.prototype.setDefaultBindingMode=function(t){if(this.isBindingModeSupported(t)){this.sDefaultBindingMode=t;return this}throw new Error("Binding mode "+t+" is not supported by this model.",this)};o.prototype.isBindingModeSupported=function(t){return t in this.mSupportedBindingModes};o.prototype.setLegacySyntax=function(t){this.bLegacySyntax=t};o.prototype.isLegacySyntax=function(){return this.bLegacySyntax};o.prototype.setSizeLimit=function(t){this.iSizeLimit=t};o.prototype.getInterface=function(){return this};o.prototype.refresh=function(t){this.checkUpdate(t);if(t){var e=[];for(var i in this.mMessages){e=e.concat(this.mMessages[i])}this.fireMessageChange({oldMessages:e})}};o.prototype.checkUpdate=function(t,e){if(e){if(!this.sUpdateTimer){this.sUpdateTimer=setTimeout(function(){this.checkUpdate(t)}.bind(this),0)}return}if(this.sUpdateTimer){clearTimeout(this.sUpdateTimer);this.sUpdateTimer=null}var i=this.aBindings.slice(0);s.each(i,function(e,i){i.checkUpdate(t)})};o.prototype.setMessages=function(t){t=t||{};if(!n(this.mMessages,t)){this.mMessages=t;this.checkMessages()}};o.prototype.getMessagesByPath=function(t){if(this.mMessages){return this.mMessages[t]||[]}return null};o.prototype.checkMessages=function(){s.each(this.aBindings,function(t,e){if(e.checkDataState){e.checkDataState()}})};o.prototype.destroy=function(){t.prototype.destroy.apply(this,arguments);this.oData={};this.aBindings=[];this.mContexts={};if(this.sUpdateTimer){clearTimeout(this.sUpdateTimer)}this.bDestroyed=true};o.prototype.getMetaModel=function(){return undefined};o.prototype.getOriginalProperty=function(t,e){return this.getProperty(t,e)};o.prototype.isLaundering=function(t,e){return false};o.prototype.checkFilterOperation=function(t){a(t,function(t){if(this.mUnsupportedFilterOperators[t.sOperator]){throw new Error("Filter instances contain an unsupported FilterOperator: "+t.sOperator)}}.bind(this))};function a(t,e){t=t||[];if(t instanceof r){t=[t]}for(var i=0;i<t.length;i++){var n=t[i];e(n);a(n.oCondition,e);a(n.aFilters,e)}}return o});