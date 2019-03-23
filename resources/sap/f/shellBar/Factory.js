/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/m/Label","sap/m/Image","sap/tnt/InfoLabel","./ContentButton","sap/m/MenuButton","sap/m/ButtonType","sap/m/OverflowToolbar","sap/m/OverflowToolbarButton","./ControlSpacer","sap/m/ToolbarSpacer","sap/m/ToolbarDesign","sap/m/OverflowToolbarLayoutData","sap/m/OverflowToolbarPriority"],function(o,t,e,n,r,s,i,a,l,p,u,h,c,C){"use strict";var f=function(o){this._oContext=o;this._oControls={};this._sCPImage="CoPilot_white.svg"};f.prototype.getOverflowToolbar=function(){if(!this._oControls.oOverflowToolbar){this._oControls.oOverflowToolbar=new a({design:h.Transparent,style:"Clear"}).addStyleClass("sapFShellBarOTB");this._oControls.oOverflowToolbar._getOverflowButton().addStyleClass("sapFShellBarOverflowButton")}return this._oControls.oOverflowToolbar};f.prototype.getControlSpacer=function(){if(!this._oControls.oControlSpacer){this._oControls.oControlSpacer=(new p).setLayoutData(new c({priority:C.NeverOverflow}))}return this._oControls.oControlSpacer};f.prototype.getToolbarSpacer=function(){if(!this._oControls.oToolbarSpacer){this._oControls.oToolbarSpacer=new u}return this._oControls.oToolbarSpacer};f.prototype.getSecondTitle=function(){if(!this._oControls.oSecondTitle){this._oControls.oSecondTitle=(new t).addStyleClass("sapFShellBarSecondTitle").setLayoutData(new c({priority:C.NeverOverflow}))}return this._oControls.oSecondTitle};f.prototype.getAvatarButton=function(){if(!this._oControls.oAvatarButton){this._oControls.oAvatarButton=new r({icon:"none",type:i.Transparent,iconDensityAware:false,press:function(){this._oContext.fireEvent("avatarPressed",{avatar:this._oControls.oAvatarButton.getAvatar()})}.bind(this)}).addStyleClass("sapFShellBarProfile").setLayoutData(new c({priority:C.NeverOverflow}))}return this._oControls.oAvatarButton};f.prototype.getHomeIcon=function(){if(!this._oControls.oHomeIcon){this._oControls.oHomeIcon=new e({densityAware:false,press:function(){this._oContext.fireEvent("homeIconPressed",{icon:this._oControls.oHomeIcon})}.bind(this)}).addStyleClass("sapFShellBarHomeIcon").setLayoutData(new c({priority:C.NeverOverflow}))}return this._oControls.oHomeIcon};f.prototype.getMegaMenu=function(){if(!this._oControls.oMegaMenu){this._oControls.oMegaMenu=new s({type:i.Transparent,iconDensityAware:false}).addStyleClass("sapFSHMegaMenu").setLayoutData(new c({priority:C.NeverOverflow}))}return this._oControls.oMegaMenu};f.prototype.getCopilot=function(){if(!this._oControls.oCopilot){this._oControls.oCopilot=new e({src:this._getCopilotImagePath(),press:function(){this._oContext.fireEvent("copilotPressed",{image:this._oControls.oCopilot})}.bind(this)}).addStyleClass("CPImage").setLayoutData(new c({priority:C.NeverOverflow}))}return this._oControls.oCopilot};f.prototype.getSearch=function(){if(!this._oControls.oSearch){this._oControls.oSearch=new l({text:"Search",icon:"sap-icon://search",type:i.Transparent,press:function(){this._oContext.fireEvent("searchButtonPressed",{button:this._oControls.oSearch})}.bind(this)}).setLayoutData(new c({priority:C.Low}))}return this._oControls.oSearch};f.prototype.getNavButton=function(){if(!this._oControls.oNavButton){this._oControls.oNavButton=new l({icon:"sap-icon://nav-back",type:i.Transparent,press:function(){this._oContext.fireEvent("navButtonPressed",{button:this._oControls.oNavButton})}.bind(this)}).setLayoutData(new c({priority:C.NeverOverflow}))}return this._oControls.oNavButton};f.prototype.getMenuButton=function(){if(!this._oControls.oMenuButton){this._oControls.oMenuButton=new l({icon:"sap-icon://menu2",type:i.Transparent}).setLayoutData(new c({priority:C.NeverOverflow}))}return this._oControls.oMenuButton};f.prototype.getNotifications=function(){if(!this._oControls.oNotifications){this._oControls.oNotifications=new l({text:"Notifications",icon:"sap-icon://bell",type:i.Transparent,press:function(){this._oContext.fireEvent("notificationsPressed",{button:this._oControls.oNotifications})}.bind(this)}).setLayoutData(new c({priority:C.Low}))}return this._oControls.oNotifications};f.prototype.getProductSwitcher=function(){if(!this._oControls.oProductSwitcher){this._oControls.oProductSwitcher=new l({text:"My products",icon:"sap-icon://grid",type:i.Transparent,press:function(){this._oContext.fireEvent("productSwitcherPressed",{button:this._oControls.oProductSwitcher})}.bind(this)}).setLayoutData(new c({priority:C.High})).addStyleClass("sapFShellBarGridButton")}return this._oControls.oProductSwitcher};f.prototype.destroy=function(){Object.keys(this._oControls).forEach(function(o){var t=this._oControls[o];if(t){t.destroy()}}.bind(this))};f.prototype._getCopilotImagePath=function(){return sap.ui.require.toUrl("sap/f/shellBar/"+this._sCPImage)};f.prototype.setCPImage=function(o){this._sCPImage=o;if(this._oControls.oCopilot){this._oControls.oCopilot.setSrc(this._getCopilotImagePath())}};return f});