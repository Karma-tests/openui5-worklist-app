/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/hyphenation/Hyphenation","sap/base/Log"],function(e,n,t){"use strict";var i=e.WrappingType;function a(e){if(!e.isA("sap.m.IHyphenation")){t.error("[UI5 Hyphenation] The given control does not implement interface sap.m.IHyphenation and can not use HyphenationSupport mixin.");return false}return true}function r(e,n){var i=e.getTextsToBeHyphenated();if(typeof i!=="object"){t.error("[UI5 Hyphenation] The result of getTextsToBeHyphenated method is not a map object.",e.getId());return false}if(Object.keys(i).indexOf(n)<0){t.error("[UI5 Hyphenation] The key "+n+" is not found in the result of getTextsToBeHyphenated method.",e.getId());return false}return true}function o(e,n){n=n||"";var t=e.childNodes;if(t.length===1&&t[0].nodeType===window.Node.TEXT_NODE){t[0].nodeValue=n}else{e.textContent=n}}function p(e,n){var t=[];Object.keys(e).forEach(function(i){if(!(i in n&&e[i]===n[i])){t.push(i)}});return t}function h(){var e=sap.ui.getCore().getConfiguration().getHyphenation(),t=n.getInstance();if(e==="native"){return false}if(e==="thirdparty"){return true}return t.isLanguageSupported()&&!t.canUseNativeHyphenation()&&t.canUseThirdPartyHyphenation()}function s(e){if(e.getWrappingType()===i.Hyphenated&&!e.getWrapping()){t.warning("[UI5 Hyphenation] The property wrappingType=Hyphenated will not take effect unless wrapping=true.",e.getId())}return e.getWrapping()&&e.getWrappingType()===i.Hyphenated}function u(e){if(!(s(e)&&h())){e._mHyphenatedTexts={};e._mUnhyphenatedTexts={};return}var t=e.getTextsToBeHyphenated(),i=p(t,e._mUnhyphenatedTexts);if(i.length>0){e._mUnhyphenatedTexts=t;i.forEach(function(n){delete e._mHyphenatedTexts[n]});var a=n.getInstance();if(!a.isLanguageInitialized()){a.initialize().then(function(){var n=e.isActive()?e.getDomRefsForHyphenatedTexts():null,r=false;i.forEach(function(i){e._mHyphenatedTexts[i]=a.hyphenate(t[i]);if(n&&i in n){o(n[i],e._mHyphenatedTexts[i])}else{r=true}});if(r){e.invalidate()}})}else{i.forEach(function(n){e._mHyphenatedTexts[n]=a.hyphenate(t[n])})}}}var f={};f.mixInto=function(e){if(!a(e)){return}var n=e.init;e.init=function(e){var t=n.apply(this,arguments);this._mHyphenatedTexts={};this._mUnhyphenatedTexts={};return t};var t=e.onBeforeRendering;e.onBeforeRendering=function(){var e=t.apply(this,arguments);u(this);return e}};f.writeHyphenationClass=function(e,n){if(!a(n)){return}if(s(n)&&!h()){e.addClass("sapUiHyphenation")}};f.getTextForRender=function(e,n){if(!a(e)){return null}if(!r(e,n)){return null}var t=e.getTextsToBeHyphenated();if(s(e)&&h()){if(t[n]!==e._mUnhyphenatedTexts[n]){u(e)}if(n in e._mHyphenatedTexts){return e._mHyphenatedTexts[n]}}return t[n]};return f});