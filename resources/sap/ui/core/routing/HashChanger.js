/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./HashChangerBase","./RouterHashChanger","sap/ui/thirdparty/hasher","sap/base/Log","sap/base/util/ObjectPath"],function(e,t,s,a,n){"use strict";var h=e.extend("sap.ui.core.routing.HashChanger",{constructor:function(){e.apply(this)}});h.prototype.init=function(){if(this._initialized){a.info("this HashChanger instance has already been initialized.");return false}this._initialized=true;s.changed.add(this.fireHashChanged,this);if(!s.isActive()){s.initialized.addOnce(this.fireHashChanged,this);s.init()}else{this.fireHashChanged(s.getHash())}return this._initialized};h.prototype.fireHashChanged=function(e,t){this.fireEvent("hashChanged",{newHash:e,oldHash:t})};h.prototype.createRouterHashChanger=function(){if(!this._oRouterHashChanger){this._oRouterHashChanger=new t({parent:this});this._registerListenerToRelevantEvents();this._oRouterHashChanger.attachEvent("hashSet",this._onHashModified,this);this._oRouterHashChanger.attachEvent("hashReplaced",this._onHashModified,this)}return this._oRouterHashChanger};h.prototype._registerListenerToRelevantEvents=function(){if(!this._mEventListeners){this._mEventListeners={};this.getRelevantEventsInfo().forEach(function(e){var t=e.name,s=this._onHashChangedForRouterHashChanger.bind(this,e);this._mEventListeners[t]=s;this.attachEvent(t,s,this)}.bind(this))}};h.prototype._deregisterListenerFromRelevantEvents=function(){if(this._mEventListeners){var e=Object.keys(this._mEventListeners);e.forEach(function(e){this.detachEvent(e,this._mEventListeners[e],this)}.bind(this));delete this._mEventListeners}};h.prototype._onHashChangedForRouterHashChanger=function(e,t){if(this._oRouterHashChanger){var s=e.paramMapping||{},a=s["newHash"]||"newHash",n=t.getParameter(a)||"",h=this._parseHash(n);this._oRouterHashChanger.fireHashChanged(h.hash,h.subHashMap,!!e.updateHashOnly)}};h.prototype._onHashModified=function(e){var t=e.getId(),s=e.getParameter("hash"),a=e.getParameter("key"),n=e.getParameter("deletePrefix");if(t==="hashSet"){this._setSubHash(a,s,n)}else{this._replaceSubHash(a,s,n)}};h.prototype._setSubHash=function(e,t,s){var a=this._reconstructHash(e,t,s);this.setHash(a)};h.prototype._replaceSubHash=function(e,t,s){var a=this._reconstructHash(e,t,s);this.replaceHash(a)};h.prototype._reconstructHash=function(e,t,s){var a=this.getHash().split("&/"),n=a.shift();if(e===undefined){n=t+""}else{var h=a.some(function(a,n,h){if(a.startsWith(e)){if(t){h[n]=e+"/"+t}else{s.push(e)}return true}});if(!h){a.push(e+"/"+t)}}a=a.filter(function(e){return!s.some(function(t){return e.startsWith(t)})});a.unshift(n);return a.join("&/")};h.prototype._parseHash=function(e){var t=e.split("&/");return{hash:t.shift(),subHashMap:t.reduce(function(e,t){var s=t.indexOf("/");e[t.substring(0,s)]=t.substring(s+1);return e},{})}};h.prototype.setHash=function(t){e.prototype.setHash.apply(this,arguments);s.setHash(t)};h.prototype.replaceHash=function(t){e.prototype.replaceHash.apply(this,arguments);s.replaceHash(t)};h.prototype.getHash=function(){return s.getHash()};h.prototype.getRelevantEventsInfo=function(){return[{name:"hashChanged"}]};h.prototype.destroy=function(){if(this._oRouterHashChanger){this._deregisterListenerFromRelevantEvents();this._oRouterHashChanger.destroy();this._oRouterHashChanger=undefined}delete this._initialized;s.changed.remove(this.fireHashChanged,this);e.prototype.destroy.apply(this,arguments)};h.prototype.deregisterRouterHashChanger=function(){this._deregisterListenerFromRelevantEvents();delete this._oRouterHashChanger};(function(){var e=null;h.getInstance=function(){if(!e){e=new h}return e};function t(t){var s,a,n;for(s in e.mEventRegistry){if(e.mEventRegistry.hasOwnProperty(s)){a=e.mEventRegistry[s];n=t.mEventRegistry[s];if(n){t.mEventRegistry[s]=a.concat(n)}else{t.mEventRegistry[s]=a}}}}h.replaceHashChanger=function(s){if(e&&s){if(e._oRouterHashChanger){e._oRouterHashChanger.detachEvent("hashSet",e._onHashModified,e);e._oRouterHashChanger.detachEvent("hashReplaced",e._onHashModified,e);e._deregisterListenerFromRelevantEvents();s._oRouterHashChanger=e._oRouterHashChanger;s._oRouterHashChanger.parent=s;delete e._oRouterHashChanger;s._oRouterHashChanger.attachEvent("hashSet",s._onHashModified,s);s._oRouterHashChanger.attachEvent("hashReplaced",s._onHashModified,s);s._registerListenerToRelevantEvents()}var a=n.get("sap.ui.core.routing.History.getInstance"),h;if(a){h=a();h._unRegisterHashChanger()}t(s);e.destroy();if(h){h._setHashChanger(s)}}e=s}})();return h});