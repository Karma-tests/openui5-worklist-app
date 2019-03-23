/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./InputBase","./ComboBoxTextField","./ComboBoxBase","./Popover","./List","./library","sap/ui/Device","sap/ui/core/Item","./StandardListItem","./ComboBoxRenderer","sap/ui/dom/containsOrEquals","sap/ui/events/KeyCodes","sap/base/assert","sap/base/security/encodeXML"],function(e,t,i,s,o,n,r,a,l,h,c,p,u,d){"use strict";var f=n.ListType;var g=n.ListMode;var m=n.ListSeparators;var y=i.extend("sap.m.ComboBox",{metadata:{library:"sap.m",designtime:"sap/m/designtime/ComboBox.designtime",properties:{selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""},filterSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false}},events:{change:{parameters:{value:{type:"string"},itemPressed:{type:"boolean"}}},selectionChange:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}}}});function I(e,t){if(!t){return}var i=e.getFocusDomRef(),s=i.selectionStart,o=i.selectionEnd,n=s!==o,r=i.value.substring(0,i.selectionStart),a=this.getSelectedItem();this.setSelection(t);if(t!==a){e.updateDomValue(t.getText());this.fireSelectionChange({selectedItem:t});t=this.getSelectedItem();if(!(typeof r=="string"&&r!=""?t.getText().toLowerCase().startsWith(r.toLowerCase()):false)||!n){s=0}e.selectText(s,i.value.length)}if(this.isOpen()){this.$().removeClass("sapMFocus");this.getList().addStyleClass("sapMListFocus")}else{this.$().addClass("sapMFocus")}this.scrollToItem(t)}y.prototype.scrollToItem=function(e){var t=this.getPicker(),i=t.getDomRef("cont"),s=this.getListItem(e),o=e&&s&&s.getDomRef();if(!t||!i||!o){return}var n=i.scrollTop,r=o.offsetTop,a=i.clientHeight,l=o.offsetHeight;if(n>r){i.scrollTop=r}else if(r+l>n+a){i.scrollTop=Math.ceil(r+l-a)}};function S(e,t){if(document.activeElement===this.getFocusDomRef()){this.selectText(e,t)}}function v(e){var t=this.getSelectedItem(),i=this.getListItem(t),s=t&&i&&i.getDomRef(),o=s&&s.offsetTop,n=s&&s.offsetHeight,r=this.getPicker(),a=r.getDomRef("cont"),l=a.clientHeight;if(t&&o+n>l){if(!e){this.getList().$().css("visibility","hidden")}else{a.scrollTop=o-n/2;this.getList().$().css("visibility","visible")}}}y.prototype._handleAriaActiveDescendant=function(e){var t=this.getFocusDomRef(),i=this.getListItem(e),s="aria-activedescendant";if(t){if(e&&i&&i.getDomRef()&&this.isOpen()){t.setAttribute(s,e.getId())}else{t.removeAttribute(s)}}};y.prototype._getSelectedItemText=function(e){e=e||this.getSelectedItem();if(!e){e=this.getDefaultSelectedItem()}if(e){return e.getText()}return""};y.prototype._setItemVisibility=function(e,t){var i=e&&this.getListItem(e).$(),s="sapMSelectListItemBaseInvisible";if(t){e.bVisible=true;i.length&&i.removeClass(s)}else{e.bVisible=false;i.length&&i.addClass(s)}};y.prototype._highlightList=function(e){var t=[],i=[],s,o;this._oList.getItems().forEach(function(e){o=e.getDomRef();if(o){t.push({ref:o.getElementsByClassName("sapMSLITitleOnly")[0],text:e.getTitle()});s=o.querySelector(".sapMSLIInfo");if(s&&e.getInfo){i.push({ref:s,text:e.getInfo()})}}});this.highLightList(e,t);this.highLightList(e,i)};y.prototype.setSelectedIndex=function(e,t){var i;t=t||this.getItems();e=e>t.length-1?t.length-1:Math.max(0,e);i=t[e];if(i){this.setSelection(i)}};y.prototype.createDropdown=function(){var e=this;var t=new s(this.getDropdownSettings());t.setInitialFocus(this);t.open=function(){return this.openBy(e)};return t};y.prototype.createPickerTextField=function(){var e=new t({width:"100%",showValueStateMessage:false,showButton:false}).addEventDelegate({onsapenter:function(){this.updateDomValue(e.getValue());this.onChange()}},this);return e};y.prototype.revertSelection=function(){var e,t=this.getPickerTextField();this.setSelectedItem(this._oSelectedItemBeforeOpen);this.setValue(this._sValueBeforeOpen);if(this.getSelectedItem()===null){e=this._sValueBeforeOpen}else{e=this._oSelectedItemBeforeOpen.getText()}t&&t.setValue(e)};y.prototype.filterItems=function(e){var t=this.getItems(),s=[],o=[],n=e.properties.indexOf("additionalText")>-1,r=this.fnFilter||i.DEFAULT_TEXT_FILTER;this._oFirstItemTextMatched=null;t.forEach(function(t){var i=r.call(this,e.value,t,"getText");var a=r.call(this,e.value,t,"getAdditionalText");if(i){o.push(t);s.push(t)}else if(a&&n){s.push(t)}});t.forEach(function(e){var t=s.indexOf(e)>-1;var i=o.indexOf(e)>-1;if(!this._oFirstItemTextMatched&&i){this._oFirstItemTextMatched=e}this.getListItem(e).setVisible(t)},this);return s};y.prototype._filterStartsWithItems=function(e,t){var i=e.toLowerCase();var s=this.getItems(),o=s.filter(function(e){return e[t]&&e[t]().toLowerCase().startsWith(i)});return o};y.prototype._getFilters=function(){return this.getFilterSecondaryValues()?["text","additionalText"]:["text"]};y.prototype.init=function(){i.prototype.init.apply(this,arguments);this.bOpenValueStateMessage=true;this._sValueBeforeOpen="";this._sInputValueBeforeOpen="";this._oSelectedItemBeforeOpen=null;this._oFirstItemTextMatched=null;this.bIsFocused=false;if(r.system.phone){this.attachEvent("_change",this.onPropertyChange,this)}};y.prototype.onBeforeRendering=function(){i.prototype.onBeforeRendering.apply(this,arguments);this._fillList();this.synchronizeSelection()};y.prototype._fillList=function(){var e=this.getList(),t,i,s,o;if(!e){return}e.destroyItems();t=this.getVisibleItems();for(o=0,s=t.length;o<s;o++){i=this._mapItemToListItem(t[o]);e.addAggregation("items",i,true)}};y.prototype.exit=function(){i.prototype.exit.apply(this,arguments);this._oSelectedItemBeforeOpen=null;this._oFirstItemTextMatched=null};y.prototype.onBeforeRenderingPicker=function(){var e=this["onBeforeRendering"+this.getPickerType()];e&&e.call(this)};y.prototype.onBeforeRenderingDropdown=function(){var e=this.getPicker(),t=this.$().outerWidth()/parseFloat(n.BaseFontSize)+"rem";if(e){e.setContentMinWidth(t)}};y.prototype.onBeforeRenderingList=function(){if(this.bProcessingLoadItemsEvent){var e=this.getList(),t=this.getFocusDomRef();if(e){e.setBusy(true)}if(t){t.setAttribute("aria-busy","true")}}};y.prototype.onAfterRenderingPicker=function(){var e=this["onAfterRendering"+this.getPickerType()];e&&e.call(this);v.call(this,false)};y.prototype.onAfterRenderingList=function(){if(this.bProcessingLoadItemsEvent&&this.getItems().length===0){return}var e=this.getList(),t=this.getFocusDomRef();this._highlightList(this._sInputValueBeforeOpen);if(e){e.setBusy(false)}if(t){t.removeAttribute("aria-busy")}};y.prototype.oninput=function(e){i.prototype.oninput.apply(this,arguments);if(e.isMarked("invalid")){return}this.loadItems(function(){this.handleInputValidation(e,this.isComposingCharacter())},{name:"input",busyIndicator:false});if(this.bProcessingLoadItemsEvent&&this.getPickerType()==="Dropdown"){this.open()}this.$().addClass("sapMFocus");this.getList().removeStyleClass("sapMListFocus")};y.prototype.handleInputValidation=function(e,t){var i=this.getSelectedItem(),s=e.target.value,o=s==="",n=e.srcControl,r,a=this.getPickerType()==="Dropdown";if(o&&!this.bOpenedByKeyboardOrButton&&!this.isPickerDialog()){r=this.getItems()}else{r=this.filterItems({properties:this._getFilters(),value:s})}var l=!!r.length;var h=r[0];if(!o&&h&&h.getEnabled()){this.handleTypeAhead(n,r,s,t)}if(o||!l||!n._bDoTypeAhead&&this._getSelectedItemText()!==s){this.setSelection(null);if(i!==this.getSelectedItem()){this.fireSelectionChange({selectedItem:this.getSelectedItem()})}}this._sInputValueBeforeOpen=s;if(this.isOpen()){setTimeout(function(){this._highlightList(s)}.bind(this))}if(l){if(o&&!this.bOpenedByKeyboardOrButton){this.close()}else if(a){this.open();this.scrollToItem(this.getSelectedItem())}}else if(this.isOpen()){if(a&&!this.bOpenedByKeyboardOrButton){this.close()}}else{this.clearFilter()}};y.prototype.handleTypeAhead=function(e,t,i,s){var o=this.intersectItems(this._filterStartsWithItems(i,"getText"),t);var n=this.getFilterSecondaryValues();var a=r.system.desktop;var l=this.getSelectedItem();if(e._bDoTypeAhead){var h=this.intersectItems(this._filterStartsWithItems(i,"getAdditionalText"),t);if(n&&!o[0]&&h[0]){!s&&e.updateDomValue(h[0].getAdditionalText());this.setSelection(h[0])}else if(o[0]){!s&&e.updateDomValue(o[0].getText());this.setSelection(o[0])}}else{this.setSelection(o[0])}if(l!==this.getSelectedItem()){this.fireSelectionChange({selectedItem:this.getSelectedItem()})}if(e._bDoTypeAhead){if(a){S.call(e,i.length,e.getValue().length)}else{setTimeout(S.bind(e,i.length,e.getValue().length),0)}}this.$().addClass("sapMFocus");this.getList().removeStyleClass("sapMListFocus")};y.prototype.onSelectionChange=function(e){var t=this._getItemByListItem(e.getParameter("listItem")),i=this.getChangeEventParams(),s=t!==this.getSelectedItem();this.setSelection(t);this.fireSelectionChange({selectedItem:this.getSelectedItem()});if(s){i.itemPressed=true;this.onChange(null,i)}};y.prototype.onItemPress=function(e){var t=e.getParameter("listItem"),i=t.getTitle(),s=this.getChangeEventParams(),o=t!==this.getListItem(this.getSelectedItem());this.updateDomValue(i);if(!o){s.itemPressed=true;this.onChange(null,s)}this.setProperty("value",i,true);if(this.getPickerType()==="Dropdown"){setTimeout(this.selectText.bind(this,this.getValue().length,this.getValue().length),0)}setTimeout(this.close.bind(this))};y.prototype.onBeforeOpen=function(){var t=this["onBeforeOpen"+this.getPickerType()],i=this.getFocusDomRef();if(this.hasLoadItemsEventListeners()&&!this.bProcessingLoadItemsEvent){this.loadItems()}this.addStyleClass(e.ICON_PRESSED_CSS_CLASS);if(i){i.setAttribute("aria-owns",this.getList().getId())}this.addContent();t&&t.call(this)};y.prototype.onBeforeOpenDialog=function(){var e=this.getPickerTextField();this._oSelectedItemBeforeOpen=this.getSelectedItem();this._sValueBeforeOpen=this.getValue();if(this.getSelectedItem()){this.filterItems({properties:this._getFilters(),value:""})}e.setValue(this._sValueBeforeOpen)};y.prototype.onAfterOpen=function(){var e=this.getFocusDomRef(),t=this.getSelectedItem();if(e){e.setAttribute("aria-expanded","true");t&&e.setAttribute("aria-activedescendant",t.getId())}v.call(this,true)};y.prototype.onBeforeClose=function(){i.prototype.onBeforeClose.apply(this,arguments);var t=this.getFocusDomRef();if(t){t.removeAttribute("aria-owns");t.removeAttribute("aria-activedescendant")}this.removeStyleClass(e.ICON_PRESSED_CSS_CLASS)};y.prototype.onAfterClose=function(){var e=this.getFocusDomRef();if(e){e.setAttribute("aria-expanded","false")}this.clearFilter();this._sInputValueBeforeOpen="";if(this.shouldValueStateMessageBeOpened()&&document.activeElement===e){this.openValueStateMessage()}};y.prototype.onItemChange=function(e){var t=this.getAssociation("selectedItem"),i=e.getParameter("newValue"),s=e.getParameter("name");if(t===e.getParameter("id")){switch(s){case"text":if(!this.isBound("value")){this.setValue(i)}break;case"key":if(!this.isBound("selectedKey")){this.setSelectedKey(i)}break}}};y.prototype.onkeydown=function(e){var t=e.srcControl;i.prototype.onkeydown.apply(t,arguments);if(!t.getEnabled()||!t.getEditable()){return}var s=p;t._bDoTypeAhead=e.which!==s.BACKSPACE&&e.which!==s.DELETE};y.prototype.oncut=function(e){var t=e.srcControl;i.prototype.oncut.apply(t,arguments);t._bDoTypeAhead=false};y.prototype.onsapenter=function(e){var t=e.srcControl,s=t.getSelectedItem();if(s&&this.getFilterSecondaryValues()){t.updateDomValue(s.getText())}i.prototype.onsapenter.apply(t,arguments);if(!t.getEnabled()||!t.getEditable()){return}if(t.isOpen()&&!this.isComposingCharacter()){t.close()}};y.prototype.onsapdown=function(e){var t=e.srcControl;if(!t.getEnabled()||!t.getEditable()){return}e.setMarked();e.preventDefault();this.loadItems(function e(){var i=this.getSelectableItems(),s;if(this.$().hasClass("sapMFocus")&&this.isOpen()){s=i[0]}else{s=i[i.indexOf(this.getSelectedItem())+1]}I.call(this,t,s)})};y.prototype.onsapup=function(e){var t=e.srcControl;if(!t.getEnabled()||!t.getEditable()){return}e.setMarked();e.preventDefault();this.loadItems(function e(){var i=this.getSelectableItems();var s=i[i.indexOf(this.getSelectedItem())-1];I.call(this,t,s)})};y.prototype.onsaphome=function(e){var t=e.srcControl;if(!t.getEnabled()||!t.getEditable()){return}e.setMarked();e.preventDefault();this.loadItems(function e(){var i=this.getSelectableItems()[0];I.call(this,t,i)})};y.prototype.onsapend=function(e){var t=e.srcControl;if(!t.getEnabled()||!t.getEditable()){return}e.setMarked();e.preventDefault();this.loadItems(function e(){var i=this.findLastEnabledItem(this.getSelectableItems());I.call(this,t,i)})};y.prototype.onsappagedown=function(e){var t=e.srcControl;if(!t.getEnabled()||!t.getEditable()){return}e.setMarked();e.preventDefault();this.loadItems(function(){var e=this.getSelectableItems(),i=e.indexOf(this.getSelectedItem())+10,s;i=i>e.length-1?e.length-1:Math.max(0,i);s=e[i];I.call(this,t,s)})};y.prototype.onsappageup=function(e){var t=e.srcControl;if(!t.getEnabled()||!t.getEditable()){return}e.setMarked();e.preventDefault();this.loadItems(function(){var e=this.getSelectableItems(),i=e.indexOf(this.getSelectedItem())-10,s;i=i>e.length-1?e.length-1:Math.max(0,i);s=e[i];I.call(this,t,s)})};y.prototype.onsapshow=function(e){var t,s;i.prototype.onsapshow.apply(this,arguments);if(!this.getValue()){t=this.getSelectableItems();s=t[0];if(s){this.setSelection(s);this.updateDomValue(s.getText());this.fireSelectionChange({selectedItem:s});setTimeout(function(){this.selectText(0,s.getText().length)}.bind(this),0)}}};y.prototype.onsaphide=y.prototype.onsapshow;y.prototype.onfocusin=function(e){var t=this.getPickerType()==="Dropdown";if(this._bIsBeingDestroyed){return}if(e.target===this.getOpenArea()){this.bOpenValueStateMessage=false;if(t&&!this.isPlatformTablet()){this.focus()}}else{if(t){setTimeout(function(){if(document.activeElement===this.getFocusDomRef()&&!this.bIsFocused&&!this.bFocusoutDueRendering&&!this.getSelectedText()){this.selectText(0,this.getValue().length)}this.bIsFocused=true}.bind(this),0)}if(!this.isOpen()&&this.bOpenValueStateMessage&&this.shouldValueStateMessageBeOpened()){this.openValueStateMessage()}this.bOpenValueStateMessage=true}if(this.getEnabled()&&(!this.isOpen()||!this.getSelectedItem()||!this.getList().hasStyleClass("sapMListFocus"))){this.$().addClass("sapMFocus")}};y.prototype.onsapfocusleave=function(e){this.bIsFocused=false;var t,s,o,n,r=this.getSelectedItem();if(r&&this.getFilterSecondaryValues()){this.updateDomValue(r.getText())}i.prototype.onsapfocusleave.apply(this,arguments);if(this.isPickerDialog()){return}s=this.getAggregation("picker");if(!e.relatedControlId||!s){return}t=this.isPlatformTablet();o=sap.ui.getCore().byId(e.relatedControlId);n=o&&o.getFocusDomRef();if(c(s.getFocusDomRef(),n)&&!t){this.focus()}};y.prototype.setSelection=function(e){var t=this.getList(),i,s;this.setAssociation("selectedItem",e,true);this.setProperty("selectedItemId",e instanceof a?e.getId():e,true);if(typeof e==="string"){e=sap.ui.getCore().byId(e)}if(t){i=this.getListItem(e);if(i){t.setSelectedItem(i,true)}else{t.removeSelections(true)}}s=e?e.getKey():"";this.setProperty("selectedKey",s,true);this._handleAriaActiveDescendant(e)};y.prototype.isSelectionSynchronized=function(){var e=this.getSelectedItem();return this.getSelectedKey()===(e&&e.getKey())};y.prototype.synchronizeSelection=function(){if(this.isSelectionSynchronized()){return}var e=this.getSelectedKey(),t=this.getItemByKey(""+e);if(t&&e!==""){this.setAssociation("selectedItem",t,true);this.setProperty("selectedItemId",t.getId(),true);if(this._sValue===this.getValue()){this.setValue(t.getText());this._sValue=this.getValue()}}};y.prototype.isFiltered=function(){var e=this.getList();return e&&e.getVisibleItems().length!==e.getItems().length};y.prototype.isItemVisible=function(e){return e&&(e.bVisible===undefined||e.bVisible)};y.prototype.createPicker=function(e){var t=this.getAggregation("picker");if(t){return t}t=this["create"+e]();this.setAggregation("picker",t,true);var i=this.getRenderer().CSS_CLASS_COMBOBOXBASE;t.setHorizontalScrolling(false).addStyleClass(i+"Picker").addStyleClass(i+"Picker-CTX").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this).addContent(this.createList());return t};y.prototype.createList=function(){var e=this.getRenderer();this._oList=new o({width:"100%",mode:g.SingleSelectMaster,rememberSelections:false,busyIndicatorDelay:0,showSeparators:m.None}).addStyleClass(e.CSS_CLASS_COMBOBOXBASE+"List").addStyleClass(e.CSS_CLASS_COMBOBOX+"List").addEventDelegate({ontap:function(e){this.close()},onBeforeRendering:this.onBeforeRenderingList,onAfterRendering:this.onAfterRenderingList},this).attachSelectionChange(this.onSelectionChange,this).attachItemPress(this.onItemPress,this);return this._oList};y.prototype.destroyItems=function(){this.destroyAggregation("items");if(this.getList()){this.getList().destroyItems()}return this};y.prototype._mapItemToListItem=function(e){var t,i,s,o;var n=this.getRenderer();if(!e){return null}o=e.getAdditionalText&&this.getShowSecondaryValues()?e.getAdditionalText():"";i=n.CSS_CLASS_COMBOBOXBASE+"Item";s=this.isItemSelected(e)?i+"Selected":"";t=new l({type:f.Active,info:o,visible:e.getEnabled()}).addStyleClass(i+" "+s);t.setTooltip(e.getTooltip());e.data(n.CSS_CLASS_COMBOBOXBASE+"ListItem",t);t.setTitle(e.getText());this.setSelectable(e,e.getEnabled());return t};y.prototype.setSelectable=function(e,t){if(this.indexOfItem(e)<0){return}e._bSelectable=t;var i=this.getListItem(e);if(i){i.setVisible(t)}};y.prototype.isItemSelected=function(e){return e&&e.getId()===this.getAssociation("selectedItem")};y.prototype.getDefaultSelectedItem=function(){return null};y.prototype.getChangeEventParams=function(){return{itemPressed:false}};y.prototype.clearSelection=function(){this.setSelection(null)};y.prototype.selectText=function(e,t){i.prototype.selectText.apply(this,arguments);this.textSelectionStart=e;this.textSelectionEnd=t;return this};y.prototype.setAssociation=function(e,t,s){var o=this.getList();if(o&&e==="selectedItem"){if(!(t instanceof a)){t=this.findItem("id",t)}o.setSelectedItem(this.getListItem(t),true)}return i.prototype.setAssociation.apply(this,arguments)};y.prototype.removeAllAssociation=function(e,t){var s=this.getList();if(s&&e==="selectedItem"){o.prototype.removeAllAssociation.apply(s,arguments)}return i.prototype.removeAllAssociation.apply(this,arguments)};y.prototype.clone=function(e){var t=i.prototype.clone.apply(this,arguments),s=this.getList();if(!this.isBound("items")&&s){t.setSelectedIndex(this.indexOfItem(this.getSelectedItem()))}return t};y.prototype.open=function(){var e=this.getList();i.prototype.open.call(this);if(this.getSelectedItem()){e.addStyleClass("sapMListFocus");this.$().removeClass("sapMFocus")}return this};y.prototype.close=function(){var e=this.getList();i.prototype.close.call(this);this.$().addClass("sapMFocus");e&&e.removeStyleClass("sapMListFocus");return this};y.prototype.findAggregatedObjects=function(){var e=this.getList();if(e){return o.prototype.findAggregatedObjects.apply(e,arguments)}return[]};y.prototype.setSelectedItem=function(e){if(typeof e==="string"){this.setAssociation("selectedItem",e,true);e=sap.ui.getCore().byId(e)}if(!(e instanceof a)&&e!==null){return this}if(!e){e=this.getDefaultSelectedItem()}this.setSelection(e);this.setValue(this._getSelectedItemText(e));return this};y.prototype.setSelectedItemId=function(e){e=this.validateProperty("selectedItemId",e);if(!e){e=this.getDefaultSelectedItem()}this.setSelection(e);e=this.getSelectedItem();this.setValue(this._getSelectedItemText(e));return this};y.prototype.setSelectedKey=function(e){e=this.validateProperty("selectedKey",e);var t=e==="",i=this.isBound("selectedKey")&&this.isBound("value")&&this.getBindingInfo("selectedKey").skipModelUpdate;if(t){this.setSelection(null);if(!i){this.setValue("")}return this}var s=this.getItemByKey(e);if(s){this.setSelection(s);if(!i){this.setValue(this._getSelectedItemText(s))}return this}this._sValue=this.getValue();return this.setProperty("selectedKey",e)};y.prototype.getSelectedItem=function(){var e=this.getAssociation("selectedItem");return e===null?null:sap.ui.getCore().byId(e)||null};y.prototype.updateItems=function(){var e,t=this.getSelectedItem(),e=i.prototype.updateItems.apply(this,arguments);clearTimeout(this._debounceItemsUpdate);this._debounceItemsUpdate=setTimeout(this["_syncItemsSelection"].bind(this,t),0);return e};y.prototype._syncItemsSelection=function(e){var t,i,s=this.getSelectedKey();if(!e||e===this.getSelectedItem()){return}i=this.getItems();t=i.some(function(e){return s===e.getKey()});this.setSelectedItem(t&&s?this.getItemByKey(s):null)};y.prototype.removeItem=function(e){e=i.prototype.removeItem.apply(this,arguments);var t;if(this.getList()){this.getList().removeItem(e&&this.getListItem(e))}if(this.isBound("items")&&!this.bItemsUpdated){return e}var s=this.getValue();if(this.getItems().length===0){this.clearSelection()}else if(this.isItemSelected(e)){t=this.getDefaultSelectedItem();this.setSelection(t);this.setValue(s)}return e};return y});