/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/base/Object","sap/ui/core/InvisibleText","sap/ui/core/ListItem","sap/ui/core/ResizeHandler","sap/m/library","sap/m/Bar","sap/m/Button","sap/m/ColumnListItem","sap/m/Dialog","sap/m/DisplayListItem","sap/m/List","sap/m/Popover","sap/m/StandardListItem","sap/m/Table","sap/m/Toolbar","sap/m/ToolbarSpacer","sap/base/security/encodeXML","sap/ui/events/KeyCodes"],function(e,t,o,i,s,n,r,a,u,l,p,h,g,_,f,d,c,I,S){"use strict";var T=n.ListMode;var m=n.PlacementType;var v=n.ListType;var b=t.extend("sap.m.SuggestionsPopover",{constructor:function(e){t.apply(this,arguments);this._oInput=e;this._sTypedInValue="";this._oInput.addEventDelegate({onsapup:function(e){this._onsaparrowkey(e,"up",1)},onsapdown:function(e){this._onsaparrowkey(e,"down",1)},onsappageup:function(e){this._onsaparrowkey(e,"up",5)},onsappagedown:function(e){this._onsaparrowkey(e,"down",5)},onsaphome:function(e){if(this._oList){this._onsaparrowkey(e,"up",this._oList.getItems().length)}},onsapend:function(e){if(this._oList){this._onsaparrowkey(e,"down",this._oList.getItems().length)}},onsapright:this._onsapright},this)},destroy:function(){if(this._oPopover){this._oPopover.destroy();this._oPopover=null}if(this._oList){this._oList.destroy();this._oList=null}if(this._oSuggestionTable){this._oSuggestionTable.destroy();this._oSuggestionTable=null}if(this._oButtonToolbar){this._oButtonToolbar.destroy();this._oButtonToolbar=null}if(this._oShowMoreButton){this._oShowMoreButton.destroy();this._oShowMoreButton=null}this._oProposedItem=null;this._oInputDelegate=null}});b._wordStartsWithValue=function(e,t){var o;while(e){if(typeof t==="string"&&t!==""&&e.toLowerCase().startsWith(t.toLowerCase())){return true}o=e.indexOf(" ");if(o==-1){break}e=e.substring(o+1)}return false};b._DEFAULTFILTER=function(e,t){if(t instanceof i&&b._wordStartsWithValue(t.getAdditionalText(),e)){return true}return b._wordStartsWithValue(t.getText(),e)};b._DEFAULTFILTER_TABULAR=function(e,t){var o=t.getCells(),i=0;for(;i<o.length;i++){if(o[i].getText){if(b._wordStartsWithValue(o[i].getText(),e)){return true}}}return false};b._DEFAULTRESULT_TABULAR=function(e){var t=e.getCells(),o=0;for(;o<t.length;o++){if(t[o].getText){return t[o].getText()}}return""};b.prototype._createSuggestionPopup=function(){var e=this._oInput;var t=e._oRb;if(e._bUseDialog){this._oPopupInput=new sap.m.Input(e.getId()+"-popup-input",{width:"100%",valueLiveUpdate:true,showValueHelp:e.getShowValueHelp(),valueHelpRequest:function(t){e.fireValueHelpRequest({fromSuggestions:true});e._iPopupListSelectedIndex=-1;e._closeSuggestionPopup()},liveChange:function(t){var o=t.getParameter("newValue");e.setDOMValue(e._getInputValue(this._oPopupInput.getValue()));e._triggerSuggest(o);e.fireLiveChange({value:o,newValue:o})}.bind(this)}).addStyleClass("sapMInputSuggInDialog")}this._oPopover=!e._bUseDialog?new g(e.getId()+"-popup",{showArrow:false,showHeader:false,placement:m.Vertical,initialFocus:e,horizontalScrolling:true}).attachAfterClose(function(){e._updateSelectionFromList();if(this._oList instanceof f){this._oList.removeSelections(true)}else{this._oList.destroyItems()}this._deregisterResize()}.bind(this)).attachBeforeOpen(function(){e._sBeforeSuggest=e.getValue();this._resizePopup();this._registerResize()}.bind(this)):new l(e.getId()+"-popup",{beginButton:new a(e.getId()+"-popup-closeButton",{text:t.getText("MSGBOX_CLOSE"),press:function(){e._closeSuggestionPopup()}}),stretch:e._bFullScreen,contentHeight:e._bFullScreen?undefined:"20rem",customHeader:new r(e.getId()+"-popup-header",{contentMiddle:this._oPopupInput.addEventDelegate({onsapenter:function(){if(!(sap.m.MultiInput&&e instanceof sap.m.MultiInput)){if(e.getAutocomplete()){this._finalizeAutocomplete()}e._closeSuggestionPopup()}}},this)}),horizontalScrolling:false,initialFocus:this._oPopupInput}).attachBeforeOpen(function(){this._oPopupInput.setPlaceholder(e.getPlaceholder());this._oPopupInput.setMaxLength(e.getMaxLength())}.bind(this)).attachBeforeClose(function(){e.setDOMValue(e._getInputValue(this._oPopupInput.getValue()));e.onChange();if(e instanceof sap.m.MultiInput&&e._bUseDialog){e._onDialogClose()}}.bind(this)).attachAfterClose(function(){if(this._oList){if(f&&!(this._oList instanceof f)){this._oList.destroyItems()}else{this._oList.removeSelections(true)}}}.bind(this)).attachAfterOpen(function(){var t=e.getValue();this._oPopupInput.setValue(t);e._triggerSuggest(t);e._oSuggPopover._refreshListItems()}.bind(this));this._registerAutocomplete();this._oPopover.addStyleClass("sapMInputSuggestionPopup");this._oPopover.addAriaLabelledBy(o.getStaticId("sap.m","INPUT_AVALIABLE_VALUES"));e.setAggregation("_suggestionPopup",this._oPopover);if(!e._bUseDialog){this._overwritePopover()}if(this._oList){this._oPopover.addContent(this._oList)}if(e.getShowTableSuggestionValueHelp()){this._addShowMoreButton()}};b.prototype._createSuggestionPopupContent=function(e){var t=this._oInput;if(t._bIsBeingDestroyed||this._oList){return}if(!t._hasTabularSuggestions()&&!e){this._oList=new h(t.getId()+"-popup-list",{showNoData:false,mode:T.SingleSelectMaster,rememberSelections:false,itemPress:function(e){this._bSuggestionItemTapped=true;var o=e.getParameter("listItem");t.setSelectionItem(o._oItem,true)}.bind(this)});this._oList.addEventDelegate({onAfterRendering:function(){if(!t.getEnableSuggestionsHighlighting()){return}this._highlightListText(t.getValue())}.bind(this)})}else{if(t._fnFilter===b._DEFAULTFILTER){t._fnFilter=b._DEFAULTFILTER_TABULAR}if(!t._fnRowResultFilter){t._fnRowResultFilter=b._DEFAULTRESULT_TABULAR}this._oList=this._getSuggestionsTable();if(t.getShowTableSuggestionValueHelp()){this._addShowMoreButton(e)}}if(this._oPopover){if(t._bUseDialog){this._oPopover.addAggregation("content",this._oList,true);var o=this._oPopover.$("scrollCont")[0];if(o){var i=sap.ui.getCore().createRenderManager();i.renderControl(this._oList);i.flush(o);i.destroy()}}else{this._oPopover.addContent(this._oList)}}};b.prototype._destroySuggestionPopup=function(){if(this._oPopover){if(this._oList instanceof f){this._oPopover.removeAllContent();this._removeShowMoreButton()}this._oPopover.destroy();this._oPopover=null}if(this._oList instanceof h){this._oList.destroy();this._oList=null}this._getInput().removeEventDelegate(this._oInputDelegate,this)};b.prototype._addShowMoreButton=function(e){if(!this._oPopover||!e&&!this._oInput._hasTabularSuggestions()){return}if(this._oPopover instanceof l){var t=this._getShowMoreButton();this._oPopover.setEndButton(t)}else{var o=this._getButtonToolbar();this._oPopover.setFooter(o)}};b.prototype._removeShowMoreButton=function(){if(!this._oPopover||!this._oInput._hasTabularSuggestions()){return}if(this._oPopover instanceof l){this._oPopover.setEndButton(null)}else{this._oPopover.setFooter(null)}};b.prototype._getShowMoreButton=function(){var e=this._oInput,t=e._oRb;return this._oShowMoreButton||(this._oShowMoreButton=new sap.m.Button({text:t.getText("INPUT_SUGGESTIONS_SHOW_ALL"),press:function(){if(e.getShowTableSuggestionValueHelp()){e.fireValueHelpRequest({fromSuggestions:true});e._iPopupListSelectedIndex=-1;e._closeSuggestionPopup()}}}))};b.prototype._getButtonToolbar=function(){var e=this._getShowMoreButton();return this._oButtonToolbar||(this._oButtonToolbar=new d({content:[new c,e]}))};b.prototype._overwritePopover=function(){var e=this._oInput;this._oPopover.open=function(){this.openBy(e,false,true)};this._oPopover.oPopup.setAnimations(function(e,t,o){o()},function(e,t,o){o()})};b.prototype._resizePopup=function(){var e=this._oInput;if(this._oList&&this._oPopover){if(e.getMaxSuggestionWidth()){this._oPopover.setContentWidth(e.getMaxSuggestionWidth())}else{this._oPopover.setContentWidth(e.$().outerWidth()+"px")}setTimeout(function(){if(this._oPopover&&this._oPopover.isOpen()&&this._oPopover.$().outerWidth()<e.$().outerWidth()){this._oPopover.setContentWidth(e.$().outerWidth()+"px")}}.bind(this),0)}};b.prototype._registerResize=function(){if(!this._oInput._bFullScreen){this._sPopupResizeHandler=s.register(this._oInput,this._resizePopup.bind(this))}};b.prototype._deregisterResize=function(){if(this._sPopupResizeHandler){this._sPopupResizeHandler=s.deregister(this._sPopupResizeHandler)}};b.prototype._refreshListItems=function(){var e=this._oInput;var t=e.getShowSuggestion();var o=e._oRb;e._iPopupListSelectedIndex=-1;if(!t||!e._bShouldRefreshListItems||!e.getDomRef()||!e._bUseDialog&&!e.$().hasClass("sapMInputFocused")){return false}var s,n=e.getSuggestionItems(),r=e.getSuggestionRows(),a=this._sTypedInValue||e.getDOMValue()||"",u=this._oList,l=e.getFilterSuggests(),h=[],g=0,d=this._oPopover,c={ontouchstart:function(e){(e.originalEvent||e)._sapui_cancelAutoClose=true}},I,S;if(this._oList){if(this._oList instanceof f){u.removeSelections(true)}else{u.destroyItems()}}if(a.length<e.getStartSuggestion()){if(!e._bUseDialog){e._iPopupListSelectedIndex=-1;e.cancelPendingSuggest();d.close()}else{if(e._hasTabularSuggestions()&&this._oList){this._oList.addStyleClass("sapMInputSuggestionTableHidden")}}e.$("SuggDescr").text("");e.$("inner").removeAttr("aria-haspopup");e.$("inner").removeAttr("aria-activedescendant");return false}if(e._hasTabularSuggestions()){if(e._bUseDialog&&this._oList){this._oList.removeStyleClass("sapMInputSuggestionTableHidden")}for(S=0;S<r.length;S++){if(!l||e._fnFilter(a,r[S])){r[S].setVisible(true);h.push(r[S])}else{r[S].setVisible(false)}}this._oSuggestionTable.invalidate()}else{var T=n[0]instanceof i?true:false;for(S=0;S<n.length;S++){s=n[S];if(!l||e._fnFilter(a,s)){if(T){I=new p(s.getId()+"-dli");I.setLabel(s.getText());I.setValue(s.getAdditionalText())}else{I=new _(s.getId()+"-sli");I.setTitle(s.getText())}I.setType(s.getEnabled()?v.Active:v.Inactive);I._oItem=s;I.addEventDelegate(c);h.push(I)}}}g=h.length;var m="";if(g>0){if(g==1){m=o.getText("INPUT_SUGGESTIONS_ONE_HIT")}else{m=o.getText("INPUT_SUGGESTIONS_MORE_HITS",g)}e.$("inner").attr("aria-haspopup","true");if(!e._hasTabularSuggestions()){for(S=0;S<g;S++){u.addItem(h[S])}}if(!e._bUseDialog){if(e._sCloseTimer){clearTimeout(e._sCloseTimer);e._sCloseTimer=null}if(!d.isOpen()&&!e._sOpenTimer&&e.getValue().length>=e.getStartSuggestion()){e._sOpenTimer=setTimeout(function(){e._sOpenTimer=null;d.open()},0)}}}else{m=o.getText("INPUT_SUGGESTIONS_NO_HIT");e.$("inner").removeAttr("aria-haspopup");e.$("inner").removeAttr("aria-activedescendant");if(!e._bUseDialog){if(d.isOpen()){e._sCloseTimer=setTimeout(function(){e._iPopupListSelectedIndex=-1;e.cancelPendingSuggest();if(this._sTypedInValue){this._oInput.setDOMValue(this._sTypedInValue)}this._oProposedItem=null;d.close()}.bind(this),0)}}else{if(e._hasTabularSuggestions()&&this._oList){this._oList.addStyleClass("sapMInputSuggestionTableHidden")}}}e.$("SuggDescr").text(m)};b.prototype._onsaparrowkey=function(t,o,s){var n=this._oInput;if(!n.getEnabled()||!n.getEditable()){return}if(o!=="up"&&o!=="down"){return}if(n._isIncrementalType()){t.setMarked()}if(!this._oPopover||!this._oPopover.isOpen()){return}t.preventDefault();t.stopPropagation();var r=false,a=this._oList,l=n.getSuggestionItems(),p=a.getItems(),h=n._iPopupListSelectedIndex,g,_=h;if(o==="up"&&h===0){return}if(o=="down"&&h===p.length-1){return}var f;if(s>1){if(o=="down"&&h+s>=p.length){o="up";s=1;p[h].setSelected(false);f=h;h=p.length-1;r=true}else if(o=="up"&&h-s<0){o="down";s=1;p[h].setSelected(false);f=h;h=0;r=true}}if(h===-1){h=0;if(n._isSuggestionItemSelectable(p[h])){_=h;r=true}else{o="down"}}if(o==="down"){while(h<p.length-1&&(!r||!n._isSuggestionItemSelectable(p[h]))){p[h].setSelected(false);h=h+s;r=true;s=1;if(f===h){break}}}else{while(h>0&&(!r||!p[h].getVisible()||!n._isSuggestionItemSelectable(p[h]))){p[h].setSelected(false);h=h-s;r=true;s=1;if(f===h){break}}}if(!n._isSuggestionItemSelectable(p[h])){if(_>=0){p[_].setSelected(true).updateAccessibilityState();n.$("inner").attr("aria-activedescendant",p[_].getId())}return}else{p[h].setSelected(true).updateAccessibilityState();n.$("inner").attr("aria-activedescendant",p[h].getId())}if(e.system.desktop){this._scrollToItem(h)}if(u&&p[h]instanceof u){g=n._getInputValue(n._fnRowResultFilter(p[h]))}else{var d=l[0]instanceof i?true:false;if(d){g=n._getInputValue(p[h].getLabel())}else{g=n._getInputValue(p[h].getTitle())}}n.setDOMValue(g);n._sSelectedSuggViaKeyboard=g;n._doSelect();n._iPopupListSelectedIndex=h;this._oProposedItem=null};b.prototype._scrollToItem=function(e){var t=this._oPopover,o=this._oList,i,s,n,r,a;if(!(t instanceof g)||!o){return}i=t.getScrollDelegate();if(!i){return}var u=o.getItems()[e],l=u&&u.getDomRef();if(!l){return}s=t.getDomRef("cont").getBoundingClientRect();n=l.getBoundingClientRect();r=s.top-n.top;a=n.bottom-s.bottom;if(r>0){i.scrollTo(i._scrollX,Math.max(i._scrollY-r,0))}else if(a>0){i.scrollTo(i._scrollX,i._scrollY+a)}};b.prototype._getSuggestionsTable=function(){var e=this._oInput;if(e._bIsBeingDestroyed){return}if(!this._oSuggestionTable){this._oSuggestionTable=new f(e.getId()+"-popup-table",{mode:T.SingleSelectMaster,showNoData:false,showSeparators:"All",width:"100%",enableBusyIndicator:false,rememberSelections:false,selectionChange:function(t){this._bSuggestionItemTapped=true;var o=t.getParameter("listItem");e.setSelectionRow(o,true)}.bind(this)});this._oSuggestionTable.addEventDelegate({onAfterRendering:function(){if(!e.getEnableSuggestionsHighlighting()){return}this._highlightTableText(e.getValue())}.bind(this)});if(this._bUseDialog){this._oSuggestionTable.addStyleClass("sapMInputSuggestionTableHidden")}this._oSuggestionTable.updateItems=function(){f.prototype.updateItems.apply(e,arguments);e._refreshItemsDelayed();return e}}e._oSuggestionTable=this._oSuggestionTable;return this._oSuggestionTable};b.prototype._createHighlightedText=function(e){var t=e.innerText,o=(this._sTypedInValue||this._oInput.getValue()).toLowerCase(),i=o.length,s=t.toLowerCase(),n,r="";if(!b._wordStartsWithValue(t,o)){return I(t)}var a=s.indexOf(o);if(a>0){a=s.indexOf(" "+o)+1}if(a>-1){r+=I(t.substring(0,a));n=t.substring(a,a+i);r+='<span class="sapMInputHighlight">'+I(n)+"</span>";r+=I(t.substring(a+i))}else{r=I(t)}return r};b.prototype._highlightListText=function(){if(!this._oInput.getEnableSuggestionsHighlighting()){return}var e,t,o=this._oList.$().find(".sapMDLILabel, .sapMSLITitleOnly, .sapMDLIValue");for(e=0;e<o.length;e++){t=o[e];t.innerHTML=this._createHighlightedText(t)}};b.prototype._highlightTableText=function(){if(!this._oInput.getEnableSuggestionsHighlighting()){return}var e,t,o=this._oSuggestionTable.$().find("tbody .sapMLabel");for(e=0;e<o.length;e++){t=o[e];t.innerHTML=this._createHighlightedText(t)}};b.prototype._registerAutocomplete=function(){var e=this._oInput,t=this._oPopover,o=this._getInput(),i=e._bUseDialog;if(i){t.addEventDelegate({ontap:function(){if(!this._bSuggestionItemTapped&&this._sProposedItemText){o.setValue(this._sProposedItemText);this._sProposedItemText=null}}},this)}else{t.attachAfterOpen(this._handleTypeAhead,this)}t.attachAfterClose(this._finalizeAutocomplete,this);this._oInputDelegate={onkeydown:function(t){this._bDoTypeAhead=e.getAutocomplete()&&t.which!==S.BACKSPACE&&t.which!==S.DELETE},oninput:this._handleTypeAhead};o.addEventDelegate(this._oInputDelegate,this)};b.prototype._handleTypeAhead=function(){var t=this._getInput(),o=t.getValue();this._oProposedItem=null;this._sTypedInValue=o;if(!this._bDoTypeAhead||o===""){return}if(!this._oPopover.isOpen()||o.length<this._oInput.getStartSuggestion()){return}if(document.activeElement!==t.getFocusDomRef()){return}var i=o.toLowerCase(),s=this._oInput._hasTabularSuggestions(),n=s?this._oInput.getSuggestionRows():this._oInput.getSuggestionItems(),r=n.length,a,u,l;for(l=0;l<r;l++){u=s?this._oInput._fnRowResultFilter(n[l]):n[l].getText();if(u.toLowerCase().startsWith(i)){this._oProposedItem=n[l];a=u;break}}this._sProposedItemText=a;if(a){a=this._formatTypedAheadValue(a);t.updateDomValue(a);if(e.system.desktop){t.selectText(o.length,a.length)}else{setTimeout(function(){t.selectText(o.length,a.length)},0)}}};b.prototype._getInput=function(){return this._oInput._bUseDialog?this._oPopupInput:this._oInput};b.prototype._finalizeAutocomplete=function(){if(!this._bSuggestionItemTapped&&this._oProposedItem){if(this._oInput._hasTabularSuggestions()){this._oInput.setSelectionRow(this._oProposedItem,true)}else{this._oInput.setSelectionItem(this._oProposedItem,true)}}if(document.activeElement===this._oInput.getFocusDomRef()){var e=this._oInput.getValue().length;this._oInput.selectText(e,e)}this._oProposedItem=null;this._sProposedItemText=null;this._sTypedInValue="";this._bSuggestionItemTapped=false};b.prototype._formatTypedAheadValue=function(e){return this._sTypedInValue.concat(e.substring(this._sTypedInValue.length,e.length))};b.prototype._onsapright=function(){var e=this._oInput,t=e.getValue();if(!e.getAutocomplete()){return}if(this._sTypedInValue!==t){this._sTypedInValue=t;e.fireLiveChange({value:t,newValue:t})}};return b});