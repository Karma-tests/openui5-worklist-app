/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/IconPool","./Suggest","sap/ui/Device","./SearchFieldRenderer","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/cursorPos"],function(e,t,s,i,o,r,n,u,a){"use strict";var l=sap.ui.getCore().getLibraryResourceBundle("sap.m");n.oSearchFieldToolTips={SEARCH_BUTTON_TOOLTIP:l.getText("SEARCHFIELD_SEARCH_BUTTON_TOOLTIP"),RESET_BUTTON_TOOLTIP:l.getText("SEARCHFIELD_RESET_BUTTON_TOOLTIP"),REFRESH_BUTTON_TOOLTIP:l.getText("SEARCHFIELD_REFRESH_BUTTON_TOOLTIP")};var g=t.extend("sap.m.SearchField",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{value:{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},visible:{type:"boolean",group:"Appearance",defaultValue:true},maxLength:{type:"int",group:"Behavior",defaultValue:0},placeholder:{type:"string",group:"Misc",defaultValue:null},showMagnifier:{type:"boolean",group:"Misc",defaultValue:true,deprecated:true},showRefreshButton:{type:"boolean",group:"Behavior",defaultValue:false},refreshButtonTooltip:{type:"string",group:"Misc",defaultValue:null},showSearchButton:{type:"boolean",group:"Behavior",defaultValue:true},enableSuggestions:{type:"boolean",group:"Behavior",defaultValue:false},selectOnFocus:{type:"boolean",group:"Behavior",defaultValue:true,deprecated:true}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},defaultAggregation:"suggestionItems",designtime:"sap/m/designtime/SearchField.designtime",aggregations:{suggestionItems:{type:"sap.m.SuggestionItem",multiple:true,singularName:"suggestionItem"}},events:{search:{parameters:{query:{type:"string"},suggestionItem:{type:"sap.m.SuggestionItem"},refreshButtonPressed:{type:"boolean"},clearButtonPressed:{type:"boolean"}}},liveChange:{parameters:{newValue:{type:"string"}}},suggest:{parameters:{suggestValue:{type:"string"}}}}}});s.call(g.prototype);i.insertFontFaceStyle();g.prototype.init=function(){this.setProperty("placeholder",l.getText("FACETFILTER_SEARCH"),true)};g.prototype.getFocusDomRef=function(){return this.getInputElement()};g.prototype.getFocusInfo=function(){var e=t.prototype.getFocusInfo.call(this),s=this.getDomRef("I");if(s){a.extend(e,{cursorPos:a(s).cursorPos()})}return e};g.prototype.applyFocusInfo=function(e){t.prototype.applyFocusInfo.call(this,e);if("cursorPos"in e){this.$("I").cursorPos(e.cursorPos)}return this};g.prototype.getWidth=function(){return this.getProperty("width")||"100%"};g.prototype._hasPlaceholder=function(){return"placeholder"in document.createElement("input")}();g.prototype.getInputElement=function(){return this.getDomRef("I")};g.prototype.onBeforeRendering=function(){var e=this.getInputElement();if(e){this.$().find(".sapMSFB").off();this.$().off();a(e).off()}};g.prototype.onAfterRendering=function(){var e=this.getInputElement();this._resetElement=this.getDomRef("reset");a(e).on("input",this.onInput.bind(this)).on("search",this.onSearch.bind(this)).on("focus",this.onFocus.bind(this)).on("blur",this.onBlur.bind(this));if(r.system.desktop||r.system.combi){this.$().on("touchstart mousedown",this.onButtonPress.bind(this));if(r.browser.firefox){this.$().find(".sapMSFB").on("mouseup mouseout",function(e){a(e.target).removeClass("sapMSFBA")})}}else if(window.PointerEvent){a(this._resetElement).on("touchstart",function(){this._active=document.activeElement}.bind(this))}var t=sap.ui.getCore();if(!t.isThemeApplied()){t.attachThemeChanged(this._handleThemeLoad,this)}};g.prototype._handleThemeLoad=function(){if(this._oSuggest){this._oSuggest.setPopoverMinWidth()}var e=sap.ui.getCore();e.detachThemeChanged(this._handleThemeLoad,this)};g.prototype.clear=function(e){var t=e&&e.value||"";if(!this.getInputElement()||this.getValue()===t){return}this.setValue(t);d(this);this.fireLiveChange({newValue:t});this.fireSearch({query:t,refreshButtonPressed:false,clearButtonPressed:!!(e&&e.clearButton)})};g.prototype.exit=function(){if(this._oSuggest){this._oSuggest.destroy(true);this._oSuggest=null}};g.prototype.onButtonPress=function(e){if(e.originalEvent.button===2){return}var t=this.getInputElement();if(document.activeElement===t&&e.target!==t){e.preventDefault()}if(r.browser.firefox){var s=a(e.target);if(s.hasClass("sapMSFB")){s.addClass("sapMSFBA")}}};g.prototype.ontouchend=function(e){if(e.originalEvent.button===2){return}var t=e.target,s=this.getInputElement();if(t.id==this.getId()+"-reset"){h(this);this._bSuggestionSuppressed=true;var i=!this.getValue();this.clear({clearButton:true});var o=document.activeElement;if((r.system.desktop||i||/(INPUT|TEXTAREA)/i.test(o.tagName)||o===this._resetElement&&this._active===s)&&o!==s){s.focus()}}else if(t.id==this.getId()+"-search"){h(this);if(r.system.desktop&&!this.getShowRefreshButton()&&document.activeElement!==s){s.focus()}this.fireSearch({query:this.getValue(),refreshButtonPressed:!!(this.getShowRefreshButton()&&!this.$().hasClass("sapMFocus")),clearButtonPressed:false})}else{this.onmouseup(e)}};g.prototype.onmouseup=function(e){if(this.getEnabled()&&e.target.tagName=="FORM"){this.getInputElement().focus()}if(r.system.phone&&this.getEnabled()&&e.target.tagName=="INPUT"&&document.activeElement===e.target&&!c(this)){this.onFocus(e)}};g.prototype.onSearch=function(e){var t=this.getInputElement().value;this.setValue(t);this.fireSearch({query:t,refreshButtonPressed:false,clearButtonPressed:false});if(!r.system.desktop){this._blur()}};g.prototype._blur=function(){var e=this;window.setTimeout(function(){var t=e.getInputElement();if(t){t.blur()}},13)};g.prototype.onChange=function(e){this.setValue(this.getInputElement().value)};g.prototype.onInput=function(e){var t=this.getInputElement().value;if(t!=this.getValue()){this.setValue(t);this.fireLiveChange({newValue:t});if(this.getEnableSuggestions()){if(this._iSuggestDelay){clearTimeout(this._iSuggestDelay)}this._iSuggestDelay=setTimeout(function(){this.fireSuggest({suggestValue:t});d(this);this._iSuggestDelay=null}.bind(this),400)}}};g.prototype.onkeydown=function(e){var t;if(e.which===u.F5||e.which===u.ENTER){this.$("search").toggleClass("sapMSFBA",true);e.stopPropagation();e.preventDefault()}if(e.which===u.ESCAPE){if(c(this)){h(this);e.setMarked()}else{t=this.getValue();if(t===this._sOriginalValue){this._sOriginalValue=""}this.clear({value:this._sOriginalValue});if(t!==this.getValue()){e.setMarked()}}e.preventDefault()}};g.prototype.onkeyup=function(e){var t;var s;if(e.which===u.F5||e.which===u.ENTER){this.$("search").toggleClass("sapMSFBA",false);if(c(this)){h(this);if((t=this._oSuggest.getSelected())>=0){s=this.getSuggestionItems()[t];this.setValue(s.getSuggestionText())}}this.fireSearch({query:this.getValue(),suggestionItem:s,refreshButtonPressed:this.getShowRefreshButton()&&e.which===u.F5,clearButtonPressed:false})}};g.prototype.onFocus=function(e){if(r.browser.internet_explorer&&!document.hasFocus()){return}this.$().toggleClass("sapMFocus",true);this._sOriginalValue=this.getValue();if(this.getEnableSuggestions()){if(!this._bSuggestionSuppressed){this.fireSuggest({suggestValue:this.getValue()})}else{this._bSuggestionSuppressed=false}}this._setToolTips(e.type)};g.prototype.onBlur=function(e){this.$().toggleClass("sapMFocus",false);if(this._bSuggestionSuppressed){this._bSuggestionSuppressed=false}this._setToolTips(e.type)};g.prototype._setToolTips=function(e){var t=this.$("search"),s=this.$("reset");if(this.getShowRefreshButton()){if(e==="focus"){t.attr("title",n.oSearchFieldToolTips.SEARCH_BUTTON_TOOLTIP)}else if(e==="blur"){var i=this.getRefreshButtonTooltip(),o=i===""?n.oSearchFieldToolTips.REFRESH_BUTTON_TOOLTIP:i;if(o){t.attr("title",o)}}}if(this.getValue()===""){s.attr("title",n.oSearchFieldToolTips.SEARCH_BUTTON_TOOLTIP)}else{s.attr("title",n.oSearchFieldToolTips.RESET_BUTTON_TOOLTIP)}};g.prototype.setValue=function(e){e=e||"";var t=this.getInputElement();if(t){if(t.value!==e){t.value=e}var s=this.$();if(s.hasClass("sapMSFVal")==!e){s.toggleClass("sapMSFVal",!!e)}}this.setProperty("value",e,true);this._setToolTips();return this};g.prototype.onsapshow=function(e){if(this.getEnableSuggestions()){if(c(this)){h(this)}else{this.fireSuggest({suggestValue:this.getValue()})}}};g.prototype.onsaphide=function(e){this.suggest(false)};function p(e,t,s,i){var o;if(c(e)){o=e._oSuggest.setSelected(s,i);if(o>=0){e.setValue(e.getSuggestionItems()[o].getSuggestionText())}t.preventDefault()}}g.prototype.onsapdown=function(e){p(this,e,1,true)};g.prototype.onsapup=function(e){p(this,e,-1,true)};g.prototype.onsaphome=function(e){p(this,e,0,false)};g.prototype.onsapend=function(e){var t=this.getSuggestionItems().length-1;p(this,e,t,false)};g.prototype.onsappagedown=function(e){p(this,e,10,true)};g.prototype.onsappageup=function(e){p(this,e,-10,true)};g.prototype.getPopupAnchorDomRef=function(){return this.getDomRef("F")};function h(e){e._oSuggest&&e._oSuggest.close()}function f(e){if(e.getEnableSuggestions()){if(!e._oSuggest){e._oSuggest=new o(e)}e._oSuggest.open()}}function c(e){return e._oSuggest&&e._oSuggest.isOpen()}g.prototype.suggest=function(e){if(this.getEnableSuggestions()){e=e===undefined||!!e;if(e&&(this.getSuggestionItems().length||r.system.phone)){f(this)}else{h(this)}}return this};function d(e){e._oSuggest&&e._oSuggest.update()}var y="suggestionItems";g.prototype.insertSuggestionItem=function(e,s,i){d(this);return t.prototype.insertAggregation.call(this,y,e,s,true)};g.prototype.addSuggestionItem=function(e,s){d(this);return t.prototype.addAggregation.call(this,y,e,true)};g.prototype.removeSuggestionItem=function(e,s){d(this);return t.prototype.removeAggregation.call(this,y,e,true)};g.prototype.removeAllSuggestionItems=function(e){d(this);return t.prototype.removeAllAggregation.call(this,y,true)};return g});