/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/cards/BaseContent","sap/ui/model/json/JSONModel","sap/f/cards/Data","sap/base/Log","sap/suite/ui/commons/Timeline","sap/suite/ui/commons/library","sap/suite/ui/commons/TimelineItem","sap/ui/base/ManagedObject"],function(e,t,i,n,r,o,s,a){"use strict";var m=e.extend("sap.f.cards.TimelineContent",{renderer:{}});m.prototype.exit=function(){if(this._oTimeLineItemTemplate){this._oTimeLineItemTemplate.destroy();this._oTimeLineItemTemplate=null}};m.prototype._getTimeline=function(){var e=this.getAggregation("_content");if(this._bIsBeingDestroyed){return null}if(!e){e=new r({id:this.getId()+"-Timeline",showHeaderBar:false,enableScroll:false});this.setAggregation("_content",e)}return e};m.prototype.setConfiguration=function(t){e.prototype.setConfiguration.apply(this,arguments);if(!t){return}if(t.item){this._setTimelineItem(t.item)}};m.prototype._setTimelineItem=function(e){this._oTimeLineItemTemplate=new s({userNameClickable:false});e.title&&this._bindItemProperty("title",e.title.value);e.description&&this._bindItemProperty("text",e.description.value);e.ownerImage&&this._bindItemProperty("userPicture",e.ownerImage.value);e.dateTime&&this._bindItemProperty("dateTime",e.dateTime.value);e.owner&&this._bindItemProperty("userName",e.owner.value);e.icon&&this._bindItemProperty("icon",e.icon.src);var t=this._getTimeline();t.bindAggregation("content",{path:this.getBindingContext().getPath(),template:this._oTimeLineItemTemplate});return this};m.prototype._bindItemProperty=function(e,t){var i=a.bindingParser(t);if(!t){return}if(i){this._oTimeLineItemTemplate.bindProperty(e,i)}else{this._oTimeLineItemTemplate.setProperty(e,t)}};return m});