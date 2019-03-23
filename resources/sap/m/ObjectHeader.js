/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/library","sap/ui/Device","sap/m/Text","./ObjectHeaderRenderer","sap/ui/thirdparty/jquery"],function(e,t,i,r,s,n,o,a){"use strict";var l=e.BackgroundDesign;var u=r.TextAlign;var p=e.ImageHelper;var g=e.ObjectMarkerType;var d=r.TitleLevel;var h=r.TextDirection;var c=r.ValueState;var f=e.ObjectHeaderPictureShape;var m=t.extend("sap.m.ObjectHeader",{metadata:{library:"sap.m",designtime:"sap/m/designtime/ObjectHeader.designtime",properties:{title:{type:"string",group:"Misc",defaultValue:null},number:{type:"string",group:"Misc",defaultValue:null},numberUnit:{type:"string",group:"Misc",defaultValue:null},intro:{type:"string",group:"Misc",defaultValue:null},introActive:{type:"boolean",group:"Misc",defaultValue:null},titleActive:{type:"boolean",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconActive:{type:"boolean",group:"Misc",defaultValue:null},iconAlt:{type:"string",group:"Accessibility",defaultValue:null},iconTooltip:{type:"string",group:"Accessibility",defaultValue:null},iconDensityAware:{type:"boolean",group:"Misc",defaultValue:true},imageShape:{type:"sap.m.ObjectHeaderPictureShape",group:"Appearance",defaultValue:f.Square},markFavorite:{type:"boolean",group:"Misc",defaultValue:false,deprecated:true},markFlagged:{type:"boolean",group:"Misc",defaultValue:false,deprecated:true},showMarkers:{type:"boolean",group:"Misc",defaultValue:false,deprecated:true},showTitleSelector:{type:"boolean",group:"Misc",defaultValue:false},numberState:{type:"sap.ui.core.ValueState",group:"Misc",defaultValue:c.None},condensed:{type:"boolean",group:"Appearance",defaultValue:false},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance"},responsive:{type:"boolean",group:"Behavior",defaultValue:false},fullScreenOptimized:{type:"boolean",group:"Appearance",defaultValue:false},titleHref:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},titleTarget:{type:"string",group:"Behavior",defaultValue:null},introHref:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},introTarget:{type:"string",group:"Behavior",defaultValue:null},titleTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:h.Inherit},introTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:h.Inherit},numberTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:h.Inherit},titleSelectorTooltip:{type:"string",group:"Misc",defaultValue:"Options"},titleLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:d.H1}},defaultAggregation:"attributes",aggregations:{attributes:{type:"sap.m.ObjectAttribute",multiple:true,singularName:"attribute"},firstStatus:{type:"sap.m.ObjectStatus",multiple:false,deprecated:true},secondStatus:{type:"sap.m.ObjectStatus",multiple:false,deprecated:true},statuses:{type:"sap.ui.core.Control",multiple:true,singularName:"status"},_objectNumber:{type:"sap.m.ObjectNumber",multiple:false,visibility:"hidden"},additionalNumbers:{type:"sap.m.ObjectNumber",multiple:true,singularName:"additionalNumber"},headerContainer:{type:"sap.m.ObjectHeaderContainer",multiple:false},markers:{type:"sap.m.ObjectMarker",multiple:true,singularName:"marker"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{titlePress:{parameters:{domRef:{type:"object"}}},introPress:{parameters:{domRef:{type:"object"}}},iconPress:{parameters:{domRef:{type:"object"}}},titleSelectorPress:{parameters:{domRef:{type:"object"}}}},dnd:{draggable:false,droppable:true}}});m.prototype.init=function(){var e=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oTitleArrowIcon=i.createControlByURI({id:this.getId()+"-titleArrow",src:i.getIconURI("arrow-down"),decorative:false,visible:false,tooltip:e.getText("OH_SELECT_ARROW_TOOLTIP"),size:"1.375rem",press:function(e){}});this._fNumberWidth=undefined;this._titleText=new n(this.getId()+"-titleText");this._titleText.setMaxLines(3)};m.prototype.insertAttribute=function(e,t){var i=this.insertAggregation("attributes",e,t);this._registerControlListener(e);return i};m.prototype.addAttribute=function(e){var t=this.addAggregation("attributes",e);this._registerControlListener(e);return t};m.prototype.removeAttribute=function(e){var t=this.removeAggregation("attributes",e);this._deregisterControlListener(t);return t};m.prototype.removeAllAttributes=function(){var e=this.removeAllAggregation("attributes");e.forEach(this._deregisterControlListener,this);return e};m.prototype.destroyAttributes=function(){var e=this.getAggregation("attributes");if(e!==null){e.forEach(this._deregisterControlListener,this)}return this.destroyAggregation("attributes")};m.prototype.insertStatus=function(e,t){var i=this.insertAggregation("statuses",e,t);this._registerControlListener(e);return i};m.prototype.addStatus=function(e){var t=this.addAggregation("statuses",e);this._registerControlListener(e);return t};m.prototype.removeStatus=function(e){var t=this.removeAggregation("statuses",e);this._deregisterControlListener(t);return t};m.prototype.removeAllStatuses=function(){var e=this.removeAllAggregation("statuses");e.forEach(this._deregisterControlListener,this);return e};m.prototype.destroyStatuses=function(){var e=this.getAggregation("statuses");if(e!==null){e.forEach(this._deregisterControlListener,this)}return this.destroyAggregation("statuses")};m.prototype._registerControlListener=function(e){if(e){e.attachEvent("_change",this.invalidate,this)}};m.prototype._deregisterControlListener=function(e){if(e){e.detachEvent("_change",this.invalidate,this)}};m.prototype.setCondensed=function(e){this.setProperty("condensed",e);if(this.getCondensed()){this._oTitleArrowIcon.setSize("1rem")}else{this._oTitleArrowIcon.setSize("1.375rem")}return this};m.prototype.setNumber=function(e){this.setProperty("number",e);this._getObjectNumber().setNumber(e);return this};m.prototype.setNumberUnit=function(e){this.setProperty("numberUnit",e);this._getObjectNumber().setUnit(e);return this};m.prototype.setNumberState=function(e){this.setProperty("numberState",e,true);this._getObjectNumber().setState(e);return this};m.prototype.setTitleSelectorTooltip=function(e){this.setProperty("titleSelectorTooltip",e,false);this._oTitleArrowIcon.setTooltip(e);return this};m.prototype.setMarkFavorite=function(e){return this._setOldMarkers(g.Favorite,e)};m.prototype.setMarkFlagged=function(e){return this._setOldMarkers(g.Flagged,e)};m.prototype.setShowMarkers=function(e){var t,i=this.getMarkers(),r;this.setProperty("showMarkers",e,false);for(r=0;r<i.length;r++){t=i[r].getType();if(t===g.Flagged&&this.getMarkFlagged()||t===g.Favorite&&this.getMarkFavorite()){i[r].setVisible(e)}}return this};m.prototype._setOldMarkers=function(e,t){var i=this.getMarkers(),r=false,s,n={Flagged:"-flag",Favorite:"-favorite"};this.setProperty("mark"+e,t,false);if(!this.getShowMarkers()){t=false}for(s=0;s<i.length;s++){if(i[s].getType()===e){r=true;i[s].setVisible(t);break}}if(!r){this.insertAggregation("markers",new sap.m.ObjectMarker({id:this.getId()+n[e],type:e,visible:t}))}return this};m.prototype._getVisibleMarkers=function(){var e=this.getMarkers(),t=[],i;for(i=0;i<e.length;i++){if(e[i].getVisible()){t.push(e[i])}}return t};m.prototype._getObjectNumber=function(){var e=this.getAggregation("_objectNumber");if(!e){e=new sap.m.ObjectNumber(this.getId()+"-number",{emphasized:false});this.setAggregation("_objectNumber",e,true)}return e};m.prototype.getFocusDomRef=function(){if(this.getResponsive()){return this.$("txt")}else{return this.$("title")}};m.prototype.ontap=function(e){var t=e.target.id;if(this.getIntroActive()&&t===this.getId()+"-intro"){if(!this.getIntroHref()){this.fireIntroPress({domRef:window.document.getElementById(t)})}}else if(!this.getResponsive()&&this.getTitleActive()&&(t===this.getId()+"-title"||a(e.target).parent().attr("id")===this.getId()+"-title"||t===this.getId()+"-titleText-inner")){if(!this.getTitleHref()){e.preventDefault();t=this.getId()+"-title";this.fireTitlePress({domRef:window.document.getElementById(t)})}}else if(this.getResponsive()&&this.getTitleActive()&&(t===this.getId()+"-txt"||a(e.target).parent().attr("id")===this.getId()+"-txt")){if(!this.getTitleHref()){e.preventDefault();t=this.getId()+"-txt";this.fireTitlePress({domRef:window.document.getElementById(t)})}}else if(this.getIconActive()&&(t===this.getId()+"-img"||t===this.getId()+"-icon")){this.fireIconPress({domRef:window.document.getElementById(t)})}else if(t===this.getId()+"-titleArrow"){this.fireTitleSelectorPress({domRef:window.document.getElementById(t)})}else if(t.indexOf(this.getId())!==-1){e.setMarked();e.preventDefault()}};m.prototype._handleSpaceOrEnter=function(e){var t=e.target.id;e.setMarked();if(!this.getResponsive()&&this.getTitleActive()&&(t===this.getId()+"-title"||a(e.target).parent().attr("id")===this.getId()+"-title"||t===this.getId()+"-titleText-inner")){if(e.type==="sapspace"){e.preventDefault()}t=this.getId()+"-title";if(!this.getTitleHref()){e.preventDefault();this.fireTitlePress({domRef:t?window.document.getElementById(t):null})}else{if(e.type==="sapspace"){this._linkClick(e,t)}}}else if(this.getResponsive()&&this.getTitleActive()&&(t===this.getId()+"-txt"||a(e.target).parent().attr("id")===this.getId()+"-txt")){if(e.type==="sapspace"){e.preventDefault()}t=this.getId()+"-txt";if(!this.getTitleHref()){e.preventDefault();this.fireTitlePress({domRef:t?window.document.getElementById(t):null})}else{if(e.type==="sapspace"){this._linkClick(e,t)}}}else if(this.getIntroActive()&&t===this.getId()+"-intro"){if(e.type==="sapspace"){e.preventDefault()}if(!this.getIntroHref()){this.fireIntroPress({domRef:t?window.document.getElementById(t):null})}}else if(this.getIconActive()&&a(e.target).is(".sapMOHIcon,.sapMOHRIcon")){if(e.type==="sapspace"){e.preventDefault()}var i=this.getId()+"-icon"?window.document.getElementById(this.getId()+"-icon"):null;if(!i){i=this.getId()+"-img"?window.document.getElementById(this.getId()+"-img"):null}this.fireIconPress({domRef:i})}else if(t===this.getId()+"-titleArrow"){if(e.type==="sapspace"){e.preventDefault()}this.fireTitleSelectorPress({domRef:t?window.document.getElementById(t):null})}};m.prototype.onsapspace=m.prototype._handleSpaceOrEnter;m.prototype.onsapenter=m.prototype._handleSpaceOrEnter;m.prototype._linkClick=function(e,t){e.setMarked();var i=document.createEvent("MouseEvents");i.initEvent("click",false,true);(t?window.document.getElementById(t):null).dispatchEvent(i)};m.prototype._onOrientationChange=function(){var e=this.getId();if(s.system.tablet&&this.getFullScreenOptimized()&&(this._hasAttributes()||this._hasStatus())){this._rerenderStates()}if(s.system.phone){if(s.orientation.portrait){if(this.getTitle().length>50){this._rerenderTitle(50)}if(this.getIcon()){a(document.getElementById(e+"-titlediv")).removeClass("sapMOHRTitleIcon");a(document.getElementById(e+"-titleIcon")).addClass("sapMOHRHideIcon")}}else{if(s.orientation.landscape){if(this.getTitle().length>80){this._rerenderTitle(80)}if(this.getIcon()){a(document.getElementById(e+"-titlediv")).addClass("sapMOHRTitleIcon");a(document.getElementById(e+"-titleIcon")).removeClass("sapMOHRHideIcon")}}}this._adjustNumberDiv()}this._adjustIntroDiv()};m.prototype._rerenderTitle=function(e){var t=sap.ui.getCore().createRenderManager();this.getRenderer()._rerenderTitle(t,this,e);t.destroy()};m.prototype._rerenderStates=function(){var e=sap.ui.getCore().createRenderManager();this.getRenderer()._rerenderResponsiveStates(e,this);e.destroy()};m.prototype.exit=function(){if(!s.system.phone){this._detachMediaContainerWidthChange(this._rerenderOHR,this,s.media.RANGESETS.SAP_STANDARD)}if(s.system.tablet||s.system.phone){s.orientation.detachHandler(this._onOrientationChange,this)}if(this._oImageControl){this._oImageControl.destroy();this._oImageControl=undefined}if(this._oTitleArrowIcon){this._oTitleArrowIcon.destroy();this._oTitleArrowIcon=undefined}if(this._titleText){this._titleText.destroy();this._titleText=undefined}if(this._introText){this._introText.destroy();this._introText=undefined}};m.prototype._getImageControl=function(){var e=this.getId()+"-img";var t="2.5rem";var r=a.extend({src:this.getIcon(),tooltip:this.getIconTooltip(),alt:this.getIconAlt(),useIconTooltip:false,densityAware:this.getIconDensityAware()},i.isIconURI(this.getIcon())?{size:t}:{});this._oImageControl=p.getImageControl(e,this._oImageControl,this,r);return this._oImageControl};m.prototype.onBeforeRendering=function(){if(s.system.tablet||s.system.phone){s.orientation.detachHandler(this._onOrientationChange,this)}if(!s.system.phone){this._detachMediaContainerWidthChange(this._rerenderOHR,this,s.media.RANGESETS.SAP_STANDARD)}if(this._introText){this._introText.destroy();this._introText=undefined}};m.prototype.onAfterRendering=function(){var e=this.getAggregation("_objectNumber");var t=sap.ui.getCore().getConfiguration().getRTL();var i=this.$("titleArrow");i.attr("role","button");if(this.getResponsive()){this._adjustIntroDiv();if(e&&e.getNumber()){if(s.system.desktop&&a("html").hasClass("sapUiMedia-Std-Desktop")&&this.getFullScreenOptimized()&&this._iCountVisAttrStat>=1&&this._iCountVisAttrStat<=3){e.setTextAlign(t?u.Right:u.Left)}else{e.setTextAlign(t?u.Left:u.Right)}}this._adjustNumberDiv();if(s.system.tablet||s.system.phone){s.orientation.attachHandler(this._onOrientationChange,this)}if(!s.system.phone){this._attachMediaContainerWidthChange(this._rerenderOHR,this,s.media.RANGESETS.SAP_STANDARD)}}else{var r=t?u.Left:u.Right;if(e&&e.getNumber()){e.setTextAlign(r)}if(this.getAdditionalNumbers()){this._setTextAlignANum(r)}}};m.prototype._rerenderOHR=function(){this.invalidate()};m.prototype._adjustNumberDiv=function(){var e=this.getId();var t=this.getAggregation("_objectNumber");var i=sap.ui.getCore().getConfiguration().getRTL();if(t&&t.getNumber()){var r=a(document.getElementById(e+"-number"));var s=a(document.getElementById(e+"-titlediv"));if(this._isMediaSize("Phone")){if(r.hasClass("sapMObjectNumberBelowTitle")){t.setTextAlign(i?u.Left:u.Right);r.removeClass("sapMObjectNumberBelowTitle");s.removeClass("sapMOHRTitleDivFull")}var n=r.parent().width()*.4;if(r.outerWidth()>n){t.setTextAlign(i?u.Right:u.Left);r.addClass("sapMObjectNumberBelowTitle");s.addClass("sapMOHRTitleDivFull")}}}};m.prototype._adjustIntroDiv=function(){var e=this.getId();var t=a(document.getElementById(e+"-txt"));var i=a(document.getElementById(e+"-titleArrow"));var r=a(document.getElementById(e+"-intro"));if(r.parent().hasClass("sapMOHRIntroMargin")){r.parent().removeClass("sapMOHRIntroMargin")}if(i.height()!==null&&t.height()<i.height()){r.parent().addClass("sapMOHRIntroMargin")}};m._escapeId=function(e){return e?"#"+e.replace(/(:|\.)/g,"\\$1"):""};m.prototype._hasBottomContent=function(){return this._hasAttributes()||this._hasStatus()||this._hasMarkers()};m.prototype._hasIcon=function(){return!!this.getIcon().trim()};m.prototype._hasAttributes=function(){var e=this.getAttributes();if(e&&e.length>0){for(var t=0;t<e.length;t++){if(!e[t]._isEmpty()){return true}}}return false};m.prototype._hasStatus=function(){var e=this.getFirstStatus()&&!this.getFirstStatus()._isEmpty()||this.getSecondStatus()&&!this.getSecondStatus()._isEmpty();if(!e&&this.getStatuses()&&this.getStatuses().length>0){var t=this.getStatuses();for(var i=0;i<t.length;i++){if(t[i]instanceof sap.m.ObjectStatus&&!t[i]._isEmpty()){e=true;break}else if(t[i]instanceof sap.m.ProgressIndicator){e=true;break}}}return e};m.prototype._hasMarkers=function(){var e=this.getMarkers(),t=this.getShowMarkers()&&(this.getMarkFavorite()||this.getMarkFlagged()),i=e&&e.length;return t||i};m.prototype._getDefaultBackgroundDesign=function(){if(this.getCondensed()){return l.Solid}else{if(this.getResponsive()){return l.Translucent}else{return l.Transparent}}};m.prototype._getBackground=function(){if(this.getBackgroundDesign()===undefined){return this._getDefaultBackgroundDesign()}else{return this.getBackgroundDesign()}};m.prototype._setTextAlignANum=function(e){var t=this.getAdditionalNumbers();for(var i=0;i<t.length;i++){t[i].setTextAlign(e)}};m.prototype._isMediaSize=function(e){return this._getCurrentMediaContainerRange(s.media.RANGESETS.SAP_STANDARD).name===e};return m});