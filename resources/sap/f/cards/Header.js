/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/library","sap/ui/core/Control","sap/m/Text","sap/f/Avatar","sap/ui/Device","sap/f/cards/Data","sap/ui/model/json/JSONModel","sap/f/cards/HeaderRenderer"],function(t,e,i,a,s,r,n,l){"use strict";var p=t.AvatarShape;var o=e.extend("sap.f.cards.Header",{metadata:{interfaces:["sap.f.cards.IHeader"],properties:{title:{type:"string",defaultValue:""},subtitle:{type:"string",defaultValue:""},statusText:{type:"string",defaultValue:""},iconDisplayShape:{type:"sap.f.AvatarShape",defaultValue:p.Circle},iconSrc:{type:"sap.ui.core.URI",defaultValue:""},iconInitials:{type:"string",defaultValue:""}},aggregations:{_title:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_subtitle:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_avatar:{type:"sap.f.Avatar",multiple:false,visibility:"hidden"}},events:{press:{}}}});o.prototype._getTitle=function(){var t=this.getAggregation("_title");if(!t){t=new i({maxLines:3}).addStyleClass("sapFCardTitle");this.setAggregation("_title",t)}return t};o.prototype._getSubtitle=function(){var t=this.getAggregation("_subtitle");if(!t){t=new i({maxLines:2}).addStyleClass("sapFCardSubtitle");this.setAggregation("_subtitle",t)}return t};o.prototype._getAvatar=function(){var t=this.getAggregation("_avatar");if(!t){t=(new a).addStyleClass("sapFCardIcon");this.setAggregation("_avatar",t)}return t};o.prototype.onBeforeRendering=function(){this._getTitle().setText(this.getTitle());this._getSubtitle().setText(this.getSubtitle());this._getAvatar().setDisplayShape(this.getIconDisplayShape());this._getAvatar().setSrc(this.getIconSrc());this._getAvatar().setInitials(this.getIconInitials())};o.prototype._getHeaderAccessibility=function(){var t=this._getTitle()?this._getTitle().getId():"",e=this._getSubtitle()?this._getSubtitle().getId():"",i=this._getAvatar()?this._getAvatar().getId():"";return t+" "+e+" "+i};o.prototype.onAfterRendering=function(){if(s.browser.msie){if(this.getTitle()){this._getTitle().clampText()}if(this.getSubtitle()){this._getSubtitle().clampText()}}};o.prototype.ontap=function(){this.firePress()};o.create=function(t){var e={title:t.title,subtitle:t.subTitle};if(t.icon){e.iconSrc=t.icon.src;e.iconDisplayShape=t.icon.shape;e.iconInitials=t.icon.text}if(t.status){e.statusText=t.status.text}var i=new o(e);return i};o._handleData=function(t,e){var i=new n;var a=e.request;if(e.json&&!a){i.setData(e.json)}if(a){r.fetch(a).then(function(t){i.setData(t);i.refresh();this.fireEvent("_updated")}.bind(this)).catch(function(t){})}t.setModel(i).bindElement({path:e.path||"/"})};return o});