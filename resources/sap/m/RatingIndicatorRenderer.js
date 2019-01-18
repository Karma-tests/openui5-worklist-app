/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/IconPool","sap/ui/Device"],function(e,t){"use strict";var i={},r="px";i.render=function(e,t){var i=this;this.initSharedState(t);this.renderControlContainer(e,t,function(){i.renderAriaLabel(e,t);i.renderSelectedItems(e,t);i.renderUnselectedItems(e,t);i.renderHoverItems(e,t);i.renderSelectorDiv(e,t)})};i.renderControlContainer=function(e,t,i){var r=t.getEnabled(),n=t.getEditable(),s=t.getDisplayOnly();e.write("<div");e.writeControlData(t);e.addStyle("width",this._iWidth+"px");e.addStyle("height",this._iHeight+"px");if(r&&!s){e.writeAttribute("tabindex","0");e.addClass("sapMPointer");if(!n){e.addClass("sapMRIReadOnly")}}else{e.writeAttribute("tabindex","-1");r?e.addClass("sapMRIDisplayOnly"):e.addClass("sapMRIDisabled")}e.writeAttribute("aria-readonly",!n);e.addClass("sapMRI");e.addClass("sapUiRatingIndicator"+t._getIconSizeLabel(this._fIconSize));e.writeStyles();e.writeClasses();this.writeTooltip(e,t);this.writeAccessibility(e,t);e.write(">");i();e.write("</div>")};i.initSharedState=function(e){var i=e._roundValueToVisualMode(e.getValue()),r=e._iPxIconSize,n=e._iPxPaddingSize,s=i*r+(Math.round(i)-1)*n;if(s<0){s=0}this._bUseGradient=t.browser.chrome||t.browser.safari;this._sLabelID=e.getId()+"-ariaLabel";this._iSymbolCount=e.getMaxValue();this._iWidth=this._iSymbolCount*(r+n)-n;this._iHeight=r;this._iSelectedWidth=s;this._fIconSize=r};i.writeTooltip=function(e,t){var i=t.getTooltip_AsString();if(i){e.writeAttributeEscaped("title",i)}};i.writeAccessibility=function(e,t){e.writeAccessibilityState(t,{role:"slider",orientation:"horizontal",valuemin:0,disabled:!t.getEnabled()||t.getDisplayOnly(),labelledby:{value:this._sLabelID,append:true}})};i.renderAriaLabel=function(e,t){e.write("<span id='"+this._sLabelID+"' class='sapUiInvisibleText' aria-hidden='true'>"+t._oResourceBundle.getText("RATING_ARIA_NAME")+"</span>")};i.renderSelectedItems=function(e,t){e.write("<div class='sapMRISel");if(this._bUseGradient){e.write(" sapMRIGrd")}e.write("'");e.writeAttribute("id",t.getId()+"-sel");e.writeAttribute("style","width: "+this._iSelectedWidth+r);e.write(">");for(var i=0;i<this._iSymbolCount;i++){this.renderIcon("SELECTED",e,t)}e.write("</div>")};i.renderUnselectedItems=function(e,t){e.write("<div class='sapMRIUnselWrapper'");e.writeAttribute("id",t.getId()+"-unsel-wrapper");e.writeAttribute("style","width: "+(this._iWidth-this._iSelectedWidth)+r);e.write(">");e.write("<div class='sapMRIUnsel");if(this._bUseGradient&&(t.getEnabled()||!t.getDisplayOnly())){e.write(" sapMRIGrd")}e.write("' id='"+t.getId()+"-unsel'>");for(var i=0;i<this._iSymbolCount;i++){this.renderIcon("UNSELECTED",e,t)}e.write("</div>");e.write("</div>")};i.renderHoverItems=function(e,t){if(t.getEnabled()||!t.getDisplayOnly()){e.write("<div class='sapMRIHov' id='"+t.getId()+"-hov'>");for(var i=0;i<this._iSymbolCount;i++){this.renderIcon("HOVERED",e,t)}e.write("</div>")}};i.renderSelectorDiv=function(e,t){e.write("<div class='sapMRISelector' id='"+t.getId()+"-selector'>");e.write("</div>")};i.renderIcon=function(t,i,n){var s=this.getIconURI(t,n),a=this.getIconTag(s),o=e.isIconURI(s),d=this._fIconSize+r;i.write("<"+a+" ");if(t==="UNSELECTED"&&!n.getEditable()){t="READONLY"}i.write("class='sapUiIcon "+this.getIconClass(t)+"' ");var l="";l+="width:"+d+";";l+="height:"+d+";";l+="line-height:"+d+";";l+="font-size:"+d+";";i.writeAttribute("style",l);if(!o){i.writeAttributeEscaped("src",s)}i.write(">");if(o){i.writeEscaped(e.getIconInfo(s).content)}i.write("</"+a+">")};i.getIconClass=function(e){switch(e){case"SELECTED":return"sapMRIIconSel";case"UNSELECTED":return"sapMRIIconUnsel";case"HOVERED":return"sapMRIIconHov";case"READONLY":return"sapMRIIconReadOnly"}};i.getIconURI=function(t,i){if(sap.ui.getCore().getConfiguration().getTheme()==="sap_hcb"){if(t==="UNSELECTED"&&(i.getEnabled()&&!i.getDisplayOnly())){return e.getIconURI("unfavorite")}return e.getIconURI("favorite")}switch(t){case"SELECTED":return i.getIconSelected()||e.getIconURI("favorite");case"UNSELECTED":if(i.getEditable()&&!i.getDisplayOnly()){return i.getIconUnselected()||e.getIconURI("unfavorite")}else{return i.getIconUnselected()||e.getIconURI("favorite")}break;case"HOVERED":return i.getIconHovered()||e.getIconURI("favorite")}};i.getIconTag=function(t){if(e.isIconURI(t)){return"span"}return"img"};return i},true);