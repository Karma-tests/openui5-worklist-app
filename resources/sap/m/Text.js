/*!
* UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/library","sap/ui/Device","sap/m/HyphenationSupport","./TextRenderer"],function(e,t,i,r,n,a){"use strict";var o=i.TextAlign;var s=i.TextDirection;var p=e.WrappingType;var l=t.extend("sap.m.Text",{metadata:{interfaces:["sap.ui.core.IShrinkable","sap.ui.core.IFormContent","sap.m.IHyphenation"],library:"sap.m",properties:{text:{type:"string",defaultValue:"",bindable:"bindable"},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:s.Inherit},wrapping:{type:"boolean",group:"Appearance",defaultValue:true},wrappingType:{type:"sap.m.WrappingType",group:"Appearance",defaultValue:p.Normal},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:o.Begin},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},maxLines:{type:"int",group:"Appearance",defaultValue:null},renderWhitespace:{type:"boolean",group:"Appearance",defaultValue:false}},designtime:"sap/m/designtime/Text.designtime"}});l.prototype.normalLineHeight=1.2;l.prototype.cacheLineHeight=true;l.prototype.ellipsis="...";l.hasNativeLineClamp=function(){return typeof document.documentElement.style.webkitLineClamp!="undefined"&&r.browser.chrome}();l.setNodeValue=function(e,t){t=t||"";var i=e.childNodes;if(i.length===1&&i[0].nodeType===window.Node.TEXT_NODE){i[0].nodeValue=t}else{e.textContent=t}};l.prototype.setText=function(e){this.setProperty("text",e,true);var t=this.getTextDomRef();if(t){l.setNodeValue(t,n.getTextForRender(this,"main"));if(this.getWrapping()){if(e&&!/\s/.test(e)){this.$().addClass("sapMTextBreakWord")}else{this.$().removeClass("sapMTextBreakWord")}}}return this};l.prototype.getText=function(e){var t=this.getProperty("text");if(e){return t.replace(/\r\n|\n\r|\r/g,"\n")}return t};l.prototype.onAfterRendering=function(){if(this.getVisible()&&this.hasMaxLines()&&!this.canUseNativeLineClamp()){this.clampHeight()}};l.prototype.hasMaxLines=function(){return this.getWrapping()&&this.getMaxLines()>1};l.prototype.getTextDomRef=function(){if(!this.getVisible()){return null}if(this.hasMaxLines()){return this.getDomRef("inner")}return this.getDomRef()};l.prototype.canUseNativeLineClamp=function(){if(!l.hasNativeLineClamp){return false}if(this.getTextDirection()==s.RTL){return false}if(this.getTextDirection()==s.Inherit&&sap.ui.getCore().getConfiguration().getRTL()){return false}return true};l.prototype.getLineHeight=function(e){if(this.cacheLineHeight&&this._fLineHeight){return this._fLineHeight}e=e||this.getTextDomRef();if(!e){return 0}var t=window.getComputedStyle(e),i=t.lineHeight,n;if(/px$/i.test(i)){n=parseFloat(i)}else if(/^normal$/i.test(i)){n=parseFloat(t.fontSize)*this.normalLineHeight}else{n=parseFloat(t.fontSize)*parseFloat(i)}if(!r.browser.firefox){n=Math.floor(n)}if(this.cacheLineHeight&&n){this._fLineHeight=n}return n};l.prototype.getClampHeight=function(e){e=e||this.getTextDomRef();return this.getMaxLines()*this.getLineHeight(e)};l.prototype.clampHeight=function(e){e=e||this.getTextDomRef();if(!e){return 0}var t=this.getClampHeight(e);if(t){e.style.maxHeight=t+"px"}return t};l.prototype.clampText=function(e,t,i){e=e||this.getTextDomRef();if(!e){return}var r;var n=this.getText(true);var a=this.getClampHeight(e);t=t||0;i=i||n.length;l.setNodeValue(e,n.slice(0,i));if(e.scrollHeight>a){var o=e.style,s=o.height,p=this.ellipsis,u=p.length;o.height=a+"px";while(i-t>u){r=t+i>>1;l.setNodeValue(e,n.slice(0,r-u)+p);if(e.scrollHeight>a){i=r}else{t=r}}if(e.scrollHeight>a&&t>0){r=t;e.textContent=n.slice(0,r-u)+p}o.height=s}return r};l.prototype.getAccessibilityInfo=function(){return{description:this.getText()}};l.prototype.getTextsToBeHyphenated=function(){return{main:this.getText(true)}};l.prototype.getDomRefsForHyphenatedTexts=function(){return{main:this.getTextDomRef()}};n.mixInto(l.prototype);return l});