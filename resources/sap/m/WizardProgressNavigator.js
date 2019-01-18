/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/ResizeHandler","sap/ui/core/delegate/ItemNavigation","sap/ui/Device","sap/m/ActionSheet","./WizardProgressNavigatorRenderer","sap/ui/thirdparty/jquery"],function(t,e,i,r,s,a,n,p){"use strict";var o=e.extend("sap.m.WizardProgressNavigator",{metadata:{properties:{stepCount:{type:"int",group:"Data",defaultValue:3},stepTitles:{type:"string[]",group:"Appearance",defaultValue:[]},stepIcons:{type:"sap.ui.core.URI[]",group:"Appearance",defaultValue:[]},varyingStepCount:{type:"boolean",group:"Appearance",defaultValue:false}},events:{stepChanged:{parameters:{current:{type:"int"}}}}}});o.CONSTANTS={MINIMUM_STEPS:3,MAXIMUM_STEPS:8,MIN_STEP_WIDTH_NO_TITLE:64,MIN_STEP_WIDTH_WITH_TITLE:200};o.TEXT={SELECTED:"WIZARD_PROG_NAV_SELECTED",PROCESSED:"WIZARD_PROG_NAV_PROCESSED",STEP:"WIZARD_PROG_NAV_STEP_TITLE",OPTIONAL_STEP:"WIZARD_STEP_OPTIONAL_STEP_TEXT"};o.prototype.init=function(){this._currentStep=1;this._activeStep=1;this._cachedSteps=[];this._stepOptionalIndication=[];this._resourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._actionSheet=new a;this._createAnchorNavigation()};o.prototype.onBeforeRendering=function(){if(this.getStepCount()!==this.getStepIcons().filter(String).length){this.setStepIcons([])}if(this.getStepCount()!==this.getStepTitles().filter(String).length){this.setStepTitles([])}};o.prototype.onAfterRendering=function(){var t,e=this._activeStep-1,r=this._currentStep-1;this._cacheDOMElements();this._updateStepZIndex();this._updateAnchorNavigation(e);this._updateStepActiveAttribute(e);this._removeAnchorAriaDisabledAttribute(e);this._updateStepCurrentAttribute(r);this._updateAnchorAriaLabelAttribute(r);this._updateOpenSteps();i.register(this.getDomRef(),this._updateOpenSteps.bind(this));if(s.os.name===s.os.OS.IOS){t=this.$().find(".sapMWizardProgressNavStep").css("display","block");setTimeout(t["css"].bind(t,"display",""),0)}};o.prototype.ontap=function(t){if(this._isGroupAtStart(t.target)){return this._showActionSheet(t.target,true)}if(this._isGroupAtEnd(t.target)){return this._showActionSheet(t.target,false)}if(!this._isAnchor(t.target)||!this._isOpenStep(t.target)||!this._isActiveStep(this._getStepNumber(t.target))){return}this._updateCurrentStep(this._getStepNumber(t.target));this.fireStepChanged({current:this._getStepNumber(t.target)})};o.prototype.onsapspace=function(t){if(this._onEnter){this._onEnter(t,this._anchorNavigation.getFocusedIndex())}this.ontap(t)};o.prototype.onsapenter=o.prototype.onsapspace;o.prototype.exit=function(){i.deregisterAllForControl(this.getId());this.removeDelegate(this._anchorNavigation);this._anchorNavigation.destroy();this._anchorNavigation=null;this._actionSheet.destroy();this._actionSheet=null;this._currentStep=null;this._activeStep=null;this._cachedSteps=null;this._stepOptionalIndication=null};o.prototype.getCurrentStep=function(){return this._currentStep};o.prototype.getProgress=function(){return this._activeStep};o.prototype.previousStep=function(){var t=this.getCurrentStep();if(t<2){return this}return this._moveToStep(t-1)};o.prototype.nextStep=function(){return this._moveToStep(this.getCurrentStep()+1)};o.prototype.incrementProgress=function(){return this._moveToStep(this.getProgress()+1)};o.prototype.discardProgress=function(t){if(t<=0||t>this._activeStep){return this}this._updateCurrentStep(t,this._currentStep);this._updateStepActiveAttribute(t-1,this._activeStep-1);this._addAnchorAriaDisabledAttribute(t-1);this._updateAnchorNavigation(t-1);this._currentStep=t;this._activeStep=t};o.prototype._setOnEnter=function(t){this._onEnter=t};o.prototype._createAnchorNavigation=function(){var t=this;this._anchorNavigation=new r;this._anchorNavigation.setCycling(false);this._anchorNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"]});this._anchorNavigation.attachEvent("AfterFocus",function(e){var i=e.mParameters.event;if(!i||!i.relatedTarget||p(i.relatedTarget).hasClass(n.CLASSES.ANCHOR)){return}t._anchorNavigation.focusItem(t._currentStep-1)});this.addDelegate(this._anchorNavigation)};o.prototype._cacheDOMElements=function(){var t=this.getDomRef();this._cachedSteps=t.querySelectorAll("."+n.CLASSES.STEP)};o.prototype._updateStepZIndex=function(){var t=this._currentStep-1,e=this._cachedSteps.length,i=o.CONSTANTS.MAXIMUM_STEPS;for(var r=0;r<e;r++){if(r<=t){this._cachedSteps[r].style.zIndex=0}else{this._cachedSteps[r].style.zIndex=i;i-=1}}};o.prototype._updateAnchorNavigation=function(t){var e=this.getDomRef(),i=[];for(var r=0;r<=t;r++){if(this._cachedSteps[r]){i.push(this._cachedSteps[r].children[0])}}this._anchorNavigation.setRootDomRef(e);this._anchorNavigation.setItemDomRefs(i);this._anchorNavigation.setPageSize(t);this._anchorNavigation.setFocusedIndex(t)};o.prototype._updateStepActiveAttribute=function(t,e){if(e!==undefined&&this._cachedSteps[e]){this._cachedSteps[e].removeAttribute(n.ATTRIBUTES.ACTIVE_STEP)}if(this._cachedSteps[t]){this._cachedSteps[t].setAttribute(n.ATTRIBUTES.ACTIVE_STEP,true)}};o.prototype._updateStepCurrentAttribute=function(t,e){if(e!==undefined&&this._cachedSteps[e]){this._cachedSteps[e].removeAttribute(n.ATTRIBUTES.CURRENT_STEP)}if(this._cachedSteps[t]){this._cachedSteps[t].setAttribute(n.ATTRIBUTES.CURRENT_STEP,true)}};o.prototype._addAnchorAriaDisabledAttribute=function(t){var e=this._cachedSteps.length,i;for(var r=t+1;r<e;r++){i=this._cachedSteps[r].children[0];i.setAttribute(n.ATTRIBUTES.ARIA_DISABLED,true);i.removeAttribute(n.ATTRIBUTES.ARIA_LABEL)}};o.prototype._removeAnchorAriaDisabledAttribute=function(t){if(this._cachedSteps[t]){this._cachedSteps[t].children[0].removeAttribute(n.ATTRIBUTES.ARIA_DISABLED)}};o.prototype._updateAnchorAriaLabelAttribute=function(t,e){if(e!==undefined&&this._cachedSteps[e]){this._cachedSteps[e].children[0].setAttribute(n.ATTRIBUTES.ARIA_LABEL,this._resourceBundle.getText(o.TEXT.PROCESSED))}if(this._cachedSteps[t]){this._cachedSteps[t].children[0].setAttribute(n.ATTRIBUTES.ARIA_LABEL,this._resourceBundle.getText(o.TEXT.SELECTED))}};o.prototype._moveToStep=function(t){var e=this.getStepCount(),i=this.getCurrentStep();if(t>e){return this}if(t>this._activeStep){this._updateActiveStep(t)}return this._updateCurrentStep(t,i)};o.prototype._updateActiveStep=function(t,e){var i=t-1,r=(e||this._activeStep)-1;this._activeStep=t;this._updateAnchorNavigation(i);this._removeAnchorAriaDisabledAttribute(i);this._updateStepActiveAttribute(i,r)};o.prototype._updateCurrentStep=function(t,e){var i=t-1,r=(e||this.getCurrentStep())-1;this._currentStep=t;this._updateStepZIndex();this._updateOpenSteps();this._updateStepCurrentAttribute(i,r);this._updateAnchorAriaLabelAttribute(i,r);return this};o.prototype._updateOpenSteps=function(){var t=this.$().width(),e=this._currentStep-1,i=0,r=true,s=this.getStepTitles().length?Math.floor(t/o.CONSTANTS.MIN_STEP_WIDTH_WITH_TITLE):Math.floor(t/o.CONSTANTS.MIN_STEP_WIDTH_NO_TITLE);[].forEach.call(this._cachedSteps,function(t){t.setAttribute(n.ATTRIBUTES.OPEN_STEP,false);t.setAttribute(n.ATTRIBUTES.OPEN_STEP_PREV,false);t.setAttribute(n.ATTRIBUTES.OPEN_STEP_NEXT,false)});if(this._cachedSteps[e]){this._cachedSteps[e].setAttribute(n.ATTRIBUTES.OPEN_STEP,true)}for(var a=1;a<s;a++){if(r){i+=1}if(r&&this._cachedSteps[e+i]){this._cachedSteps[e+i].setAttribute(n.ATTRIBUTES.OPEN_STEP,true);r=!r}else if(!r&&this._cachedSteps[e-i]){this._cachedSteps[e-i].setAttribute(n.ATTRIBUTES.OPEN_STEP,true);r=!r}else if(this._cachedSteps[e+i+1]){i+=1;this._cachedSteps[e+i].setAttribute(n.ATTRIBUTES.OPEN_STEP,true);r=true}else if(this._cachedSteps[e-i]){this._cachedSteps[e-i].setAttribute(n.ATTRIBUTES.OPEN_STEP,true);i+=1;r=false}}for(a=0;a<this._cachedSteps.length;a++){if(this._cachedSteps[a].getAttribute(n.ATTRIBUTES.OPEN_STEP)=="true"&&this._cachedSteps[a-1]&&this._cachedSteps[a-1].getAttribute(n.ATTRIBUTES.OPEN_STEP)=="false"){this._cachedSteps[a-1].setAttribute(n.ATTRIBUTES.OPEN_STEP_PREV,true)}if(this._cachedSteps[a].getAttribute(n.ATTRIBUTES.OPEN_STEP)=="false"&&this._cachedSteps[a-1]&&this._cachedSteps[a-1].getAttribute(n.ATTRIBUTES.OPEN_STEP)=="true"){this._cachedSteps[a].setAttribute(n.ATTRIBUTES.OPEN_STEP_NEXT,true);break}}};o.prototype._isGroupAtStart=function(t){var e=p(t).closest("."+n.CLASSES.STEP);var i=this._getStepNumber(e);return e.attr(n.ATTRIBUTES.OPEN_STEP_PREV)==="true"&&i>1};o.prototype._isGroupAtEnd=function(t){var e=p(t).closest("."+n.CLASSES.STEP);var i=this._getStepNumber(e);return e.attr(n.ATTRIBUTES.OPEN_STEP_NEXT)==="true"&&i<this._cachedSteps.length};o.prototype._showActionSheet=function(t,e){var i=e?0:this._getStepNumber(t)-1;var r=e?this._getStepNumber(t):this._cachedSteps.length;var s,a;this._actionSheet.removeAllButtons();for(var n=i;n<r;n++){s=this.getStepIcons()[n];a=this._cachedSteps[n].childNodes[0].getAttribute("title");this._actionSheet.addButton(new sap.m.Button({width:"200px",text:a,icon:s,enabled:this._activeStep>=n+1,press:function(t){this._moveToStep(t);this.fireStepChanged({current:t})}.bind(this,n+1)}))}this._actionSheet.openBy(t)};o.prototype._isAnchor=function(t){return t.className.indexOf(n.CLASSES.ANCHOR)!==-1};o.prototype._isOpenStep=function(t){var e=p(t).closest("."+n.CLASSES.STEP);return e.attr(n.ATTRIBUTES.OPEN_STEP)==="true"||e.attr(n.ATTRIBUTES.OPEN_STEP)==="false"&&e.attr(n.ATTRIBUTES.OPEN_STEP_PREV)==="true"||e.attr(n.ATTRIBUTES.OPEN_STEP)==="false"&&e.attr(n.ATTRIBUTES.OPEN_STEP_NEXT)==="true"};o.prototype._isActiveStep=function(t){return t<=this._activeStep};o.prototype._getStepNumber=function(t){var e=p(t).closest("."+n.CLASSES.STEP).attr(n.ATTRIBUTES.STEP);return parseInt(e)};return o});