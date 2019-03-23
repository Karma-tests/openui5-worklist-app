/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/core/Control","sap/ui/core/ResizeHandler","sap/ui/layout/library","./DynamicSideContentRenderer"],function(t,e,i,s,n){"use strict";var r=s.SideContentPosition;var o=s.SideContentFallDown;var a=s.SideContentVisibility;var h=e.extend("sap.ui.layout.DynamicSideContent",{metadata:{library:"sap.ui.layout",properties:{showSideContent:{type:"boolean",group:"Appearance",defaultValue:true},showMainContent:{type:"boolean",group:"Appearance",defaultValue:true},sideContentVisibility:{type:"sap.ui.layout.SideContentVisibility",group:"Appearance",defaultValue:a.ShowAboveS},sideContentFallDown:{type:"sap.ui.layout.SideContentFallDown",group:"Appearance",defaultValue:o.OnMinimumWidth},equalSplit:{type:"boolean",group:"Appearance",defaultValue:false},containerQuery:{type:"boolean",group:"Behavior",defaultValue:false},sideContentPosition:{type:"sap.ui.layout.SideContentPosition",group:"Appearance",defaultValue:r.End}},defaultAggregation:"mainContent",events:{breakpointChanged:{parameters:{currentBreakpoint:{type:"string"}}}},aggregations:{mainContent:{type:"sap.ui.core.Control",multiple:true},sideContent:{type:"sap.ui.core.Control",multiple:true}},designTime:"sap/ui/layout/designtime/DynamicSideContent.designtime",dnd:{draggable:false,droppable:true}}});var l="S",p="M",d="L",u="XL",C="sapUiHidden",S="sapUiDSCSpan12",_="sapUiDSCMCFixed",c="sapUiDSCSCFixed",f=3,g=4,y=6,b=8,w=9,V=12,M="Invalid Breakpoint. Expected: S, M, L or XL",k="SCGridCell",B="MCGridCell",m=720,z=1024,v=1440;h.prototype.init=function(){this._bSuppressInitialFireBreakPointChange=true};h.prototype.setSideContentVisibility=function(t,e){this.setProperty("sideContentVisibility",t,true);if(!e&&this.$().length){this._setResizeData(this.getCurrentBreakpoint());this._changeGridState()}return this};h.prototype.setShowSideContent=function(t,e){if(t===this.getShowSideContent()){return this}this.setProperty("showSideContent",t,true);this._SCVisible=t;if(!e&&this.$().length){this._setResizeData(this.getCurrentBreakpoint(),this.getEqualSplit());if(this._currentBreakpoint===l){this._MCVisible=true}this._changeGridState()}return this};h.prototype.setShowMainContent=function(t,e){if(t===this.getShowMainContent()){return this}this.setProperty("showMainContent",t,true);this._MCVisible=t;if(!e&&this.$().length){this._setResizeData(this.getCurrentBreakpoint(),this.getEqualSplit());if(this._currentBreakpoint===l){this._SCVisible=true}this._changeGridState()}return this};h.prototype.isSideContentVisible=function(){if(this._currentBreakpoint===l){return this._SCVisible&&this.getProperty("showSideContent")}else{return this.getProperty("showSideContent")}};h.prototype.isMainContentVisible=function(){if(this._currentBreakpoint===l){return this._MCVisible&&this.getProperty("showMainContent")}else{return this.getProperty("showMainContent")}};h.prototype.setEqualSplit=function(t){this._MCVisible=true;this._SCVisible=true;this.setProperty("equalSplit",t,true);if(this._currentBreakpoint){this._setResizeData(this._currentBreakpoint,t);this._changeGridState()}return this};h.prototype.addSideContent=function(t){this.addAggregation("sideContent",t,true);this._rerenderControl(this.getAggregation("sideContent"),this.$(k));return this};h.prototype.addMainContent=function(t){this.addAggregation("mainContent",t,true);this._rerenderControl(this.getAggregation("mainContent"),this.$(B));return this};h.prototype.toggle=function(){if(this._currentBreakpoint===l){if(!this.getProperty("showMainContent")){this.setShowMainContent(true,true);this._MCVisible=false}if(!this.getProperty("showSideContent")){this.setShowSideContent(true,true);this._SCVisible=false}if(this._MCVisible&&!this._SCVisible){this._SCVisible=true;this._MCVisible=false}else if(!this._MCVisible&&this._SCVisible){this._MCVisible=true;this._SCVisible=false}this._changeGridState()}return this};h.prototype.getCurrentBreakpoint=function(){return this._currentBreakpoint};h.prototype.onBeforeRendering=function(){this._detachContainerResizeListener();this._SCVisible=this.getProperty("showSideContent");this._MCVisible=this.getProperty("showMainContent");if(!this.getContainerQuery()){this._iWindowWidth=t(window).width();this._setBreakpointFromWidth(this._iWindowWidth);this._setResizeData(this._currentBreakpoint,this.getEqualSplit())}};h.prototype.onAfterRendering=function(){if(this.getContainerQuery()){this._attachContainerResizeListener();this._adjustToScreenSize()}else{var e=this;t(window).resize(function(){e._adjustToScreenSize()})}this._changeGridState();this._initScrolling()};h.prototype.exit=function(){this._detachContainerResizeListener();if(this._oSCScroller){this._oSCScroller.destroy();this._oSCScroller=null}if(this._oMCScroller){this._oMCScroller.destroy();this._oMCScroller=null}};h.prototype._rerenderControl=function(t,e){if(this.getDomRef()){var i=sap.ui.getCore().createRenderManager();this.getRenderer().renderControls(i,t);i.flush(e[0]);i.destroy()}return this};h.prototype._initScrolling=function(){var t=this.getId(),e=t+"-"+k,i=t+"-"+B;if(!this._oSCScroller&&!this._oMCScroller){var s=sap.ui.requireSync("sap/ui/core/delegate/ScrollEnablement");this._oSCScroller=new s(this,null,{scrollContainerId:e,horizontal:false,vertical:true});this._oMCScroller=new s(this,null,{scrollContainerId:i,horizontal:false,vertical:true})}};h.prototype._attachContainerResizeListener=function(){if(!this._sContainerResizeListener){this._sContainerResizeListener=i.register(this,t.proxy(this._adjustToScreenSize,this))}};h.prototype._detachContainerResizeListener=function(){if(this._sContainerResizeListener){i.deregister(this._sContainerResizeListener);this._sContainerResizeListener=null}};h.prototype._getBreakPointFromWidth=function(t){if(t<=m&&this._currentBreakpoint!==l){return l}else if(t>m&&t<=z&&this._currentBreakpoint!==p){return p}else if(t>z&&t<=v&&this._currentBreakpoint!==d){return d}else if(t>v&&this._currentBreakpoint!==u){return u}return this._currentBreakpoint};h.prototype._setBreakpointFromWidth=function(t){this._currentBreakpoint=this._getBreakPointFromWidth(t);if(this._bSuppressInitialFireBreakPointChange){this._bSuppressInitialFireBreakPointChange=false}else{this.fireBreakpointChanged({currentBreakpoint:this._currentBreakpoint})}};h.prototype._adjustToScreenSize=function(){if(this.getContainerQuery()){this._iWindowWidth=this.$().parent().width()}else{this._iWindowWidth=t(window).width()}if(this._iWindowWidth!==this._iOldWindowWidth){this._iOldWindowWidth=this._iWindowWidth;this._oldBreakPoint=this._currentBreakpoint;this._setBreakpointFromWidth(this._iWindowWidth);if(this._oldBreakPoint!==this._currentBreakpoint||this._currentBreakpoint===p&&this.getSideContentFallDown()===o.OnMinimumWidth){this._setResizeData(this._currentBreakpoint,this.getEqualSplit());this._changeGridState()}}};h.prototype._setResizeData=function(t,e){var i=this.getSideContentVisibility(),s=this.getSideContentFallDown();if(!e){switch(t){case l:this._setSpanSize(V,V);if(this.getProperty("showSideContent")&&this.getProperty("showMainContent")){this._SCVisible=i===a.AlwaysShow}this._bFixedSideContent=false;break;case p:var n=Math.ceil(33.333/100*this._iWindowWidth);if(s===o.BelowL||s===o.BelowXL||n<=320&&s===o.OnMinimumWidth){this._setSpanSize(V,V);this._bFixedSideContent=false}else{this._setSpanSize(g,b);this._bFixedSideContent=true}this._SCVisible=i===a.ShowAboveS||i===a.AlwaysShow;this._MCVisible=true;break;case d:if(s===o.BelowXL){this._setSpanSize(V,V)}else{this._setSpanSize(g,b)}this._SCVisible=i===a.ShowAboveS||i===a.ShowAboveM||i===a.AlwaysShow;this._MCVisible=true;this._bFixedSideContent=false;break;case u:this._setSpanSize(f,w);this._SCVisible=i!==a.NeverShow;this._MCVisible=true;this._bFixedSideContent=false;break;default:throw new Error(M)}}else{switch(t){case l:this._setSpanSize(V,V);this._SCVisible=false;break;default:this._setSpanSize(y,y);this._SCVisible=true;this._MCVisible=true}this._bFixedSideContent=false}return this};h.prototype._shouldSetHeight=function(){var t,e,i,s,n,r,o;t=this._iScSpan+this._iMcSpan===V;e=this._MCVisible&&this._SCVisible;i=!this._MCVisible&&this._SCVisible;s=this._MCVisible&&!this._SCVisible;n=i||s;r=this._fixedSideContent;o=this.getSideContentVisibility()===a.NeverShow;return t&&e||n||r||o};h.prototype._changeGridState=function(){var t=this.$(k),e=this.$(B),i=this.getProperty("showMainContent"),s=this.getProperty("showSideContent");if(this._bFixedSideContent){t.removeClass().addClass(c);e.removeClass().addClass(_)}else{t.removeClass(c);e.removeClass(_)}if(this._SCVisible&&this._MCVisible&&s&&i){if(!this._bFixedSideContent){e.removeClass().addClass("sapUiDSCSpan"+this._iMcSpan);t.removeClass().addClass("sapUiDSCSpan"+this._iScSpan)}if(this._shouldSetHeight()){t.css("height","100%").css("float","left");e.css("height","100%").css("float","left")}else{t.css("height","auto").css("float","none");e.css("height","auto").css("float","none")}}else if(!this._SCVisible&&!this._MCVisible){e.addClass(C);t.addClass(C)}else if(this._MCVisible&&i){e.removeClass().addClass(S);t.addClass(C)}else if(this._SCVisible&&s){t.removeClass().addClass(S);e.addClass(C)}else if(!i&&!s){e.addClass(C);t.addClass(C)}};h.prototype._setSpanSize=function(t,e){this._iScSpan=t;this._iMcSpan=e};return h});