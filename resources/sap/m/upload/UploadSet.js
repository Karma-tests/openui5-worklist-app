/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/base/Log","sap/base/util/deepEqual","sap/m/library","sap/m/Button","sap/m/Dialog","sap/m/List","sap/m/MessageBox","sap/m/OverflowToolbar","sap/m/StandardListItem","sap/m/Text","sap/m/ToolbarSpacer","sap/ui/unified/FileUploader","sap/m/upload/UploadSetItem","sap/m/upload/Uploader","sap/m/upload/UploadSetRenderer"],function(e,t,o,i,a,r,s,n,l,p,d,h,m,g,u,f){"use strict";var c=e.extend("sap.m.upload.UploadSet",{metadata:{library:"sap.m",properties:{fileTypes:{type:"string[]",defaultValue:null},maxFileNameLength:{type:"int",defaultValue:null},maxFileSize:{type:"float",defaultValue:null},mediaTypes:{type:"string[]",defaultValue:null},instantUpload:{type:"boolean",defaultValue:true},showIcons:{type:"boolean",defaultValue:true},terminationEnabled:{type:"boolean",defaultValue:true},uploadEnabled:{type:"boolean",defaultValue:true},uploadUrl:{type:"string",defaultValue:null}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.upload.UploadSetItem",multiple:true,singularName:"item"},incompleteItems:{type:"sap.m.upload.UploadSetItem",multiple:true,singularName:"incompleteItem"},headerFields:{type:"sap.ui.core.Item",multiple:true,singularName:"headerField"},toolbar:{type:"sap.m.OverflowToolbar",multiple:false},uploader:{type:"sap.m.upload.Uploader",multiple:false}},events:{afterItemAdded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},beforeItemAdded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},beforeItemDeleted:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},beforeItemEdited:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},beforeUploadStarts:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},uploadCompleted:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},beforeUploadTermination:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},uploadTerminated:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileTypeMismatch:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileNameLengthExceeded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileSizeExceeded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},mediaTypeMismatch:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}}}}});var _=i.UploadState;c.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oList=null;this._oEditedItem=null;this._oItemToBeDeleted=null;this._mListItemIdToItemMap={};this._$Body=null;this._$DragDropArea=null;this._oLastEnteredTarget=null};c.prototype.exit=function(){this._unbindDragAndDrop()};c.prototype.onBeforeRendering=function(){this._unbindDragAndDrop()};c.prototype.onAfterRendering=function(){this._bindDragAndDrop()};c.prototype.getToolbar=function(){if(!this._oToolbar){this._oToolbar=this.getAggregation("toolbar");if(!this._oToolbar){this._oToolbar=new l(this.getId()+"-toolbar",{content:[this._oNumberOfAttachmentsTitle,new h,this.getDefaultFileUploader()]});this.addDependent(this._oToolbar)}else{this._oToolbar.addContent(this.getDefaultFileUploader())}}return this._oToolbar};c.prototype.setToolbar=function(e){this.setAggregation("toolbar",e);this.getToolbar();return this};c.prototype.addAggregation=function(t,o,i){e.prototype.addAggregation.call(this,t,o,i);if(o&&(t==="items"||t==="incompleteItems")){this._projectToNewListItem(o);this._refreshInnerListStyle()}};c.prototype.insertAggregation=function(t,o,i,a){e.prototype.insertAggregation.call(this,t,o,i,a);if(o&&(t==="items"||t==="incompleteItems")){this._projectToNewListItem(o,i||0);this._refreshInnerListStyle()}};c.prototype.removeAggregation=function(t,o,i){var a;e.prototype.removeAggregation.call(this,t,o,i);if(o&&(t==="items"||t==="incompleteItems")){a=o._getListItem();var r=this.getList().removeAggregation("items",a,i);if(r){r.destroy()}this._refreshInnerListStyle()}};c.prototype.removeAllAggregation=function(t,o){if(t==="items"){this.getItems().forEach(function(e){this.getList().removeAggregation("items",e._getListItem(),o)}.bind(this))}else if(t==="incompleteItems"){this.getIncompleteItems().forEach(function(e){this.getList().removeAggregation("items",e._getListItem(),o)}.bind(this))}e.prototype.removeAllAggregation.call(this,t,o)};c.prototype.destroyAggregation=function(t,o){if(t==="items"||t==="incompleteItems"){this.removeAllAggregation(t,o)}if(this.getList().getItems().length===0){this.getList().destroyAggregation("items",o)}e.prototype.destroyAggregation.call(this,t,o)};c.prototype.setFileTypes=function(e){if(typeof e==="string"){e=e.split(",")}var t=(e||[]).map(function(e){return e?e.toLowerCase():""});if(!o(this.getFileTypes(),t)){this.setProperty("fileTypes",t,true);this._checkRestrictions()}return this};c.prototype.setMaxFileNameLength=function(e){if(this.getMaxFileNameLength()!==e){this.setProperty("maxFileNameLength",e,true);this._checkRestrictions()}return this};c.prototype.setMaxFileSize=function(e){if(this.getMaxFileSize()!==e){this.setProperty("maxFileSize",e,true);this._checkRestrictions()}return this};c.prototype.setMediaTypes=function(e){if(typeof e==="string"){e=e.split(",")}var t=(e||[]).map(function(e){return e?e.toLowerCase():""});if(!o(this.getMediaTypes(),t)){this.setProperty("mediaTypes",t,true);this._checkRestrictions()}return this};c.prototype.setShowIcons=function(e){if(e!==this.getShowIcons()){this._getAllItems().forEach(function(t){t._getIcon().setVisible(e)});this.setProperty("showIcons",e,false)}return this};c.prototype.setTerminationEnabled=function(e){if(e!==this.getTerminationEnabled()){this._getAllItems().forEach(function(t){t._getTerminateButton().setVisible(e)});this.setProperty("terminationEnabled",e,false)}return this};c.prototype.setUploadEnabled=function(e){if(e!==this.getUploadEnabled()){this.getDefaultFileUploader().setEnabled(e);this.setProperty("uploadEnabled",e,false)}return this};c.prototype.getList=function(){if(!this._oList){this._oList=new s(this.getId()+"-list",{headerToolbar:this.getToolbar()});this._oList.addStyleClass("sapMUCList");this.addDependent(this._oList)}return this._oList};c.prototype.upload=function(){if(!this.getUploadEnabled()){t.warning("Upload is currently disabled for this upload set.");return}this.getIncompleteItems().forEach(function(e){this._uploadItemIfGoodToGo(e)}.bind(this))};c.prototype.uploadItem=function(e){this._uploadItemIfGoodToGo(e)};c.prototype.getDefaultFileUploader=function(){var e;if(!this._oFileUploader){this._oFileUploader=new m(this.getId()+"-uploader",{buttonOnly:true,buttonText:e,tooltip:e,iconOnly:true,enabled:this.getUploadEnabled(),icon:"sap-icon://add",iconFirst:false,style:"Transparent",name:"uploadSetFileUploader",sameFilenameAllowed:true,useMultipart:false,sendXHR:true,change:[this._onFileUploaderChange,this],uploadStart:[this._onUploadStarted,this],uploadProgress:[this._onUploadProgressed,this],uploadComplete:[this._onUploadCompleted,this],uploadAborted:[this._onUploadAborted,this]})}return this._oFileUploader};c.prototype.registerUploaderEvents=function(e){e.attachUploadStarted(this._onUploadStarted.bind(this));e.attachUploadProgressed(this._onUploadProgressed.bind(this));e.attachUploadCompleted(this._onUploadCompleted.bind(this));e.attachUploadAborted(this._onUploadAborted.bind(this))};c.prototype._onFileUploaderChange=function(e){var t=e.getParameter("files");this._processNewFileObjects(t)};c.prototype._onUploadStarted=function(e){var t=e.getParameter("item");t.setUploadState(_.Uploading)};c.prototype._onUploadProgressed=function(e){var t=e.getParameter("item"),o=Math.round(e.getParameter("loaded")/e.getParameter("total")*100);t.setProgress(o)};c.prototype._onUploadCompleted=function(e){var t=e.getParameter("item");t.setProgress(100);t.setUploadState(_.Complete);this.fireUploadCompleted({item:t})};c.prototype._onUploadAborted=function(e){var t=e.getParameter("item");t.setUploadState(_.Error);this.fireUploadTerminated({item:t})};c.prototype._handleItemEdit=function(e,t){if(this._oEditedItem){this._handleItemEditConfirmation(e,this._oEditedItem)}if(!this._oEditedItem){if(this.fireBeforeItemEdited({item:t})){this._oEditedItem=t;this._oEditedItem._setInEditMode(true)}}};c.prototype._handleItemRestart=function(e,t){t.setUploadState(_.Ready);this._uploadItemIfGoodToGo(t)};c.prototype._handleItemEditConfirmation=function(e,t){var o=t._getFileNameEdit(),i,a,r=t.getFileName(),s=g._splitFileName(r);i=o.getValue().trim();if(!i||i.length===0){t._setContainsError(true);return}if(s.name!==i){a=i+"."+s.extension;t.setFileName(a)}t._setContainsError(false);t._setInEditMode(false);this._oEditedItem=null};c.prototype._handleItemEditCancelation=function(e,t){t._setContainsError(false);t._setInEditMode(false);this._oEditedItem=null};c.prototype._handleItemDelete=function(e,t){var o;if(this._oEditedItem){this._handleConfirmEdit(e,this._oEditedItem);if(this._oEditedItem){return}}if(!t.fireDeletePressed({item:t})){return}if(!this.fireBeforeItemDeleted({item:t})){return}if(!t.getFileName()){o=this._oRb.getText("UPLOAD_SET_DELETE_WITHOUT_FILE_NAME_TEXT")}else{o=this._oRb.getText("UPLOAD_SET_DELETE_TEXT",t.getFileName())}this._oItemToBeDeleted=t;n.show(o,{id:this.getId()+"-deleteDialog",title:this._oRb.getText("UPLOAD_SET_DELETE_TITLE"),actions:[n.Action.OK,n.Action.CANCEL],onClose:this._handleClosedDeleteDialog.bind(this),dialogId:"messageBoxDeleteFile",styleClass:this.hasStyleClass("sapUiSizeCompact")?"sapUiSizeCompact":""})};c.prototype._handleClosedDeleteDialog=function(e){if(e!==n.Action.OK){return}this.removeItem(this._oItemToBeDeleted);this.removeIncompleteItem(this._oItemToBeDeleted);this._oItemToBeDeleted=null};c.prototype._handleTerminateRequest=function(e,t){var o=new s({items:[new p({title:t.getFileName(),icon:t._getIcon().getSrc()})]}),i=new r({id:this.getId()+"-teminateDialog",title:this._oRb.getText("UPLOAD_SET_TERMINATE_TITLE"),content:[new d({text:this._oRb.getText("UPLOAD_SET_TERMINATE_TEXT")}),o],buttons:[new a({text:this._oRb.getText("UPLOAD_SET_OKBUTTON_TEXT"),press:[n,this]}),new a({text:this._oRb.getText("UPLOAD_SET_CANCEL_BUTTON_TEXT"),press:function(){i.close()}})],afterClose:function(){i.destroy()}});i.open();function n(){if(t.getUploadState()===_.Uploading){if(this.fireBeforeUploadTermination({item:t})){this._handleUploadTermination(t)}}else if(t.getUploadState()===_.Complete){this.removeItem(t)}i.close();this.invalidate()}};c.prototype._handleUploadTermination=function(e){this._getActiveUploader().terminateItem(e)};c.prototype._onDragEnterSet=function(e){if(e.target===this._$DragDropArea[0]){this._$DragDropArea.addClass("sapMUCDropIndicator")}};c.prototype._onDragLeaveSet=function(e){if(e.target===this._$DragDropArea[0]){this._$DragDropArea.removeClass("sapMUCDropIndicator")}};c.prototype._onDragOverSet=function(e){e.preventDefault()};c.prototype._onDropOnSet=function(e){var t;e.preventDefault();if(e.target===this._$DragDropArea[0]){this._$DragDropArea.removeClass("sapMUCDropIndicator");this._$DragDropArea.addClass("sapMUCDragDropOverlayHide");t=e.originalEvent.dataTransfer.files;this._processNewFileObjects(t)}};c.prototype._onDragEnterBody=function(e){this._oLastEnteredTarget=e.target;this._$DragDropArea.removeClass("sapMUCDragDropOverlayHide")};c.prototype._onDragLeaveBody=function(e){if(this._oLastEnteredTarget===e.target){this._$DragDropArea.addClass("sapMUCDragDropOverlayHide")}};c.prototype._onDragOverBody=function(e){e.preventDefault();this._$DragDropArea.removeClass("sapMUCDragDropOverlayHide")};c.prototype._onDropOnBody=function(e){this._$DragDropArea.addClass("sapMUCDragDropOverlayHide")};c.prototype._getAllItems=function(){return this.getItems().concat(this.getIncompleteItems())};c.prototype._refreshInnerListStyle=function(){var e=this.getList().length-1;this._oList.getItems().forEach(function(t,o){t.removeStyleClass("sapMUCListSingleItem").removeStyleClass("sapMUCListFirstItem").removeStyleClass("sapMUCListLastItem").removeStyleClass("sapMUCListItem");if(o===0&&e===0){t.addStyleClass("sapMUCListSingleItem")}else if(o===0){t.addStyleClass("sapMUCListFirstItem")}else if(o===e){t.addStyleClass("sapMUCListLastItem")}else{t.addStyleClass("sapMUCListItem")}})};c.prototype._processNewFileObjects=function(e){var t=[],o;for(var i=0;i<e.length;i++){t.push(e[i])}t.forEach(function(e){o=new g({fileName:e.name,uploadState:_.Ready});o._setFileObject(e);if(!this.fireBeforeItemAdded({item:o})){return}this.insertIncompleteItem(o);this.fireAfterItemAdded({item:o});if(this.getInstantUpload()){this._uploadItemIfGoodToGo(o)}}.bind(this))};c.prototype._projectToNewListItem=function(e,t){var o=e._getListItem();this._mListItemIdToItemMap[o.getId()]=e;if(t||t===0){this.getList().insertAggregation("items",o,t,true)}else{this.getList().addAggregation("items",o,true)}this._checkRestrictionsForItem(e)};c.prototype._getImplicitUploader=function(){if(!this._oUploader){this._oUploader=new u;this._oUploader.setUploadUrl(this.getUploadUrl());this.registerUploaderEvents(this._oUploader);this.addDependent(this._oUploader)}return this._oUploader};c.prototype._getActiveUploader=function(){return this.getUploader()||this._getImplicitUploader()};c.prototype._uploadItemIfGoodToGo=function(e){if(e.getUploadState()===_.Ready&&!e._isRestricted()){if(this.fireBeforeUploadStarts({item:e})){this._getActiveUploader().uploadItem(e,this.getHeaderFields())}}};c.prototype._getDragDropHandlers=function(){if(!this._oDragDropHandlers){this._oDragDropHandlers={body:{dragenter:this._onDragEnterBody.bind(this),dragleave:this._onDragLeaveBody.bind(this),dragover:this._onDragOverBody.bind(this),drop:this._onDropOnBody.bind(this)},set:{dragenter:this._onDragEnterSet.bind(this),dragleave:this._onDragLeaveSet.bind(this),dragover:this._onDragOverSet.bind(this),drop:this._onDropOnSet.bind(this)}}}return this._oDragDropHandlers};c.prototype._bindDragAndDrop=function(){this._$Body=jQuery(document.body);Object.keys(this._getDragDropHandlers().body).forEach(function(e){this._$Body.on(e,this._getDragDropHandlers().body[e])}.bind(this));this._$DragDropArea=this.$("drag-drop-area");Object.keys(this._getDragDropHandlers().set).forEach(function(e){this.$().on(e,this._getDragDropHandlers().set[e])}.bind(this))};c.prototype._unbindDragAndDrop=function(){if(this._$Body){Object.keys(this._getDragDropHandlers().body).forEach(function(e){this._$Body.off(e,this._getDragDropHandlers().body[e])}.bind(this))}Object.keys(this._getDragDropHandlers().set).forEach(function(e){this.$().off(e,this._getDragDropHandlers().set[e])}.bind(this))};c.prototype._checkRestrictions=function(){this.getItems().forEach(function(e){this._checkRestrictionsForItem(e)}.bind(this));this.getIncompleteItems().forEach(function(e){this._checkRestrictionsForItem(e)}.bind(this))};c.prototype._checkRestrictionsForItem=function(e){e._checkTypeRestriction(this.getFileTypes());e._checkNameLengthRestriction(this.getMaxFileNameLength());e._checkSizeRestriction(this.getMaxFileSize());e._checkMediaTypeRestriction(this.getMediaTypes())};return c});