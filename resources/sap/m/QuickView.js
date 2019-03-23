/*
 * ! OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/Device","sap/ui/core/IconPool","./QuickViewBase","./ResponsivePopover","./NavContainer","./Page","./Bar","./Button","./QuickViewRenderer"],function(e,t,o,i,r,n,s,a,p,g){"use strict";var u=e.PlacementType;var h=i.extend("sap.m.QuickView",{metadata:{library:"sap.m",properties:{placement:{type:"sap.m.PlacementType",group:"Misc",defaultValue:u.Right},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"320px"}},aggregations:{},designtime:"sap/m/designtime/QuickView.designtime",events:{afterOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},afterClose:{parameters:{openBy:{type:"sap.ui.core.Control"},origin:{type:"sap.m.Button"}}},beforeOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},beforeClose:{parameters:{openBy:{type:"sap.ui.core.Control"},origin:{type:"sap.m.Button"}}}}}});h.prototype.init=function(){var e={pages:[new s],navigate:this._navigate.bind(this),afterNavigate:this._afterNavigate.bind(this)};this._oNavContainer=new n(e);var t=this;this._oPopover=new r(this.getId()+"-quickView",{placement:this.getPlacement(),content:[this._oNavContainer],contentWidth:this.getWidth(),showHeader:false,showCloseButton:false,afterOpen:function(e){t._afterOpen(e);t.fireAfterOpen({openBy:e.getParameter("openBy")})},afterClose:function(e){t.fireAfterClose({openBy:e.getParameter("openBy"),origin:t.getCloseButton()})},beforeOpen:function(e){t.fireBeforeOpen({openBy:e.getParameter("openBy")})},beforeClose:function(e){t.fireBeforeClose({openBy:e.getParameter("openBy"),origin:t.getCloseButton()});t._bRendered=false}});this._oPopover.addStyleClass("sapMQuickView");var o=this._oPopover.getAggregation("_popup");o.addEventDelegate({onBeforeRendering:this._initializeQuickView,onAfterRendering:this._setLinkWidth,onkeydown:this._onPopupKeyDown},this);var t=this;var i=o._fnAdjustPositionAndArrow;if(i){o._fnAdjustPositionAndArrow=function(){i.apply(o,arguments);t._adjustContainerHeight()}}this._bItemsChanged=true;this._oPopover.addStyleClass("sapMQuickView")};h.prototype._initializeQuickView=function(){this._bRendered=true;if(this._bItemsChanged){this._clearContainerHeight();this._initPages();var e=this.getAggregation("pages");if(!e&&t.system.phone){this._addEmptyPage()}this._bItemsChanged=false}};h.prototype.exit=function(){this._bRendered=false;this._bItemsChanged=true;if(this._oPopover){this._oPopover.destroy();this._oPopover=null}};h.prototype.invalidate=function(){};h.prototype._createPage=function(e){return e._createPage()};h.prototype._onPopupKeyDown=function(e){this._processKeyboard(e)};h.prototype._afterOpen=function(e){if(t.system.phone){this._restoreFocus()}};h.prototype._addEmptyPage=function(){var e=new s({customHeader:(new a).addStyleClass("sapMQuickViewHeader")});var t=this;var i=e.getCustomHeader();i.addContentRight(new p({icon:o.getIconURI("decline"),press:function(){t._oPopover.close()}}));e.addStyleClass("sapMQuickViewPage");this._oNavContainer.addPage(e)};h.prototype._clearContainerHeight=function(){var e=this._oPopover.getAggregation("_popup");var t=e.$().find(".sapMPopoverCont");if(t[0]&&t[0].style.height){t[0].style.height=""}};h.prototype._adjustContainerHeight=function(){if(this.getPages().length<=1){return}var e=this._oPopover.getAggregation("_popup");var t=e.$().find(".sapMPopoverCont");if(t[0]&&!t[0].style.height){t[0].style.height=t.height()+"px"}};h.prototype._setLinkWidth=function(){this._oPopover.$().find(".sapMLnk").css("width","auto")};h.prototype.getCloseButton=function(){if(!t.system.phone){return undefined}var e=this._oNavContainer.getCurrentPage();var o=e.getCustomHeader().getContentRight()[0];return o};h.prototype.setPlacement=function(e){this.setProperty("placement",e,true);this._oPopover.setPlacement(e);return this};h.prototype.setWidth=function(e){if(this._oPopover){this._oPopover.setContentWidth(e);this.setProperty("width",e,true)}return this};h.prototype.openBy=function(e){this._bItemsChanged=true;this._oPopover.openBy(e);return this};h.prototype.getDomRef=function(e){return this._oPopover&&this._oPopover.getAggregation("_popup").getDomRef(e)};["addStyleClass","removeStyleClass","toggleStyleClass","hasStyleClass","getBusyIndicatorDelay","setBusyIndicatorDelay","getVisible","setVisible","getFieldGroupIds","setFieldGroupIds","getBusy","setBusy","setTooltip","getTooltip"].forEach(function(e){h.prototype[e]=function(){if(this._oPopover&&this._oPopover[e]){var t=this._oPopover.getAggregation("_popup")[e].apply(this._oPopover.getAggregation("_popup"),arguments);return t===this._oPopover.getAggregation("_popup")?this:t}}});["setModel","bindAggregation","setAggregation","insertAggregation","addAggregation","removeAggregation","removeAllAggregation","destroyAggregation"].forEach(function(e){h.prototype["_"+e+"Old"]=h.prototype[e];h.prototype[e]=function(){var t,o;if(["removeAggregation","removeAllAggregation","destroyAggregation"].indexOf(e)!==-1){t=[arguments[0],true]}else{t=[arguments[0],arguments[1],true]}o=h.prototype["_"+e+"Old"].apply(this,t);this._bItemsChanged=true;if(this._oPopover){if(arguments[0]!="pages"){this._oPopover[e].apply(this._oPopover,arguments)}if(this._bRendered){this._initializeQuickView()}}if(["removeAggregation","removeAllAggregation"].indexOf(e)!==-1){return o}return this}});return h});