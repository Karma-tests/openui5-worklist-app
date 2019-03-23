/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./library","sap/ui/layout/BlockLayoutCellData","./BlockLayoutRowRenderer","sap/base/Log"],function(t,e,a,o,r){"use strict";var n=e.BlockBackgroundType;var s=e.BlockRowColorSets;var l=t.extend("sap.ui.layout.BlockLayoutRow",{metadata:{library:"sap.ui.layout",properties:{scrollable:{type:"boolean",group:"Appearance",defaultValue:false},rowColorSet:{type:"sap.ui.layout.BlockRowColorSets",group:"Appearance"}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.layout.BlockLayoutCell",multiple:true,singularName:"content"}},associations:{accentCells:{type:"sap.ui.layout.BlockLayoutCell",multiple:true,singularName:"accentCell"}},designtime:"sap/ui/layout/designtime/BlockLayoutRow.designtime"}});l.prototype.init=function(){this._applyLayoutData={}};l.prototype.addContent=function(t){this._ensureLayoutData(t);return this.addAggregation("content",t)};l.prototype.insertContent=function(t,e){this._ensureLayoutData(t);return this.insertAggregation("content",t,e)};l.prototype.onBeforeRendering=function(){var t=this.getContent(),e=this;t.forEach(function(t,a){t._setParentRowScrollable(e.getScrollable())});this._calculateBreakpointRendering()};l.prototype.setRowColorSet=function(e){var a=Array.prototype.slice.call(arguments),o=t.prototype.setProperty.apply(this,["rowColorSet"].concat(a)),r="sapUiBlockLayoutBackground"+e,n=this.getParent(),l=n&&n.getBackground(),i=n&&n.indexOfAggregation("content",this),c=n&&n.getContent(),u=i&&c[i-1]||null,y=c&&c[i+1]||null,p=s,g=Object.keys(p).map(function(t){return p[t]}),h=false;if(u&&u._hasStyleClass(r,l,h,e)){r+="Inverted";h=true}g.forEach(function(t){var e="sapUiBlockLayoutBackground"+t,a=e+"Inverted";if(this._hasStyleClass(e,l,false,t)){this.removeStyleClass(e,true)}else if(this._hasStyleClass(a,l,true,t)){this.removeStyleClass(a,true)}},this);this.addStyleClass(r,true);if(y&&y._hasStyleClass(r,l,h,e)){y.setRowColorSet.apply(y,a)}this.invalidate();return o};l.prototype.addAccentCell=function(t){var e,a=t&&t.getId?t.getId():t,o=Array.prototype.slice.call(arguments),s=n,l=this.getParent(),i=l&&(l.getBackground()||"");e=this.addAssociation.apply(this,["accentCells"].concat(o));if(!l){return this}if([s.Accent,s.Mixed].indexOf(i)===-1){r.warning(a+" was not se as accent cell. Accent cells could be set only for 'Accent' and 'Mixed' layout backgrounds.");return this}if(s.Mixed===i){this._processMixedCellStyles(a,this.getContent())}else if(s.Accent===i){this._processAccentCellStyles(this.getAccentCells(),this.getContent())}return e};l.prototype._ensureLayoutData=function(t){var e=t.getLayoutData();if(!e||!(e instanceof a)){t.setLayoutData(new a)}};l.prototype._onParentSizeChange=function(t){this._currentSize=t;this._calculateBreakpointRendering();this.invalidate()};l.prototype._getCellArangementForCurrentSize=function(){if(!this._arrangements||!this._currentSize){return null}return this._arrangements[this._currentSize]};l.prototype._calculateBreakpointRendering=function(){if(!this._currentSize){return}this._arrangements={S:this._calcArrangementForSize("S"),M:this._calcArrangementForSize("M"),L:this._calcArrangementForSize("L"),XL:this._calcArrangementForSize("Xl")}};l.prototype._calcArrangementForSize=function(t){var e=this.getContent();if(e.length>=3&&t==="M"&&e.length<5){return this._generateArrangementForMCase()}else{return this._generateArrangement(t)}};l.prototype._generateArrangement=function(t){var e,a=0,o=[],r=[],n=[[]],s=this.getContent();s.forEach(function(a){e=a.getLayoutData();r.push(e["breakRowOn"+t+"Size"]);o.push(e["get"+t+"Size"]())});o.forEach(function(t,e){n[a].push(t);if(r[e+1]){a++;n[a]=[]}});return n};l.prototype._generateArrangementForMCase=function(){var t=this.getContent();if(t.length===3&&this._isAllCellsHasSameWidth("M")){return[[1,1,1]]}else if(t.length===3){return[[1,1],[1]]}else if(t.length===4){return[[1,1],[1,1]]}};l.prototype._isAllCellsHasSameWidth=function(t){var e,a=this.getContent(),o=a[0].getLayoutData()["get"+t+"Size"]();for(var r=1;r<a.length;r++){e=a[r].getLayoutData()["get"+t+"Size"]();if(e!==o){return false}}return true};l.prototype._processMixedCellStyles=function(t,e){var a,o;if(!e||!e.length){return this}a=this.getParent();o=a&&(a.hasStyleClass("sapUiBlockLayoutSizeL")||a.hasStyleClass("sapUiBlockLayoutSizeXL"));e.forEach(function(e){var a,l;if(o&&e.getId()===t&&e.getWidth()===1){e.addStyleClass("sapContrast").addStyleClass("sapContrastPlus");a=s;l=this._hasStyleClass("sapUiBlockLayoutBackground"+a.ColorSet1,n.Mixed,false,a.ColorSet1)||this._hasStyleClass("sapUiBlockLayoutBackground"+a.ColorSet1,n.Mixed,true,a.ColorSet1);if(l){e.addStyleClass("sapUiBlockLayoutBackgroundContrast2")}}else if((!o||e.getId()!==t)&&(e.hasStyleClass("sapContrast")||e.hasStyleClass("sapContrastPlus"))){e.removeStyleClass("sapContrast").removeStyleClass("sapContrastPlus").removeStyleClass("sapUiBlockLayoutBackgroundContrast2");this.removeAssociation("accentCells",e);r.warning(t+" was removed as accent cell. Only one cell at a time could be accented for Mixed layout background")}},this);return this};l.prototype._processAccentCellStyles=function(t,e){var a,o,r,n=0,s=0,l=Array.prototype.slice.call(t);if(!t||!t.length){return this}for(n=0;n<e.length;n++){a=e[n];o=a.getId();if(!l.length){break}if(l.indexOf(o)>-1){s++;r="sapUiBlockLayoutBackgroundColorSetGray"+(s%2+1);if(a.hasStyleClass(r)){continue}l.splice(l.indexOf(o),1);a.removeStyleClass("sapUiBlockLayoutBackgroundColorSetGray1").removeStyleClass("sapUiBlockLayoutBackgroundColorSetGray2").addStyleClass(r)}}return this};l.prototype._hasStyleClass=function(t,e,a,o){var r=n,l=s,i,c,u;if([r.Light,r.Mixed].indexOf(e)===-1){return this.hasStyleClass(t)}else if(this.hasStyleClass(t)){return true}u=[[l.ColorSet1,l.ColorSet3],[l.ColorSet2,l.ColorSet4]];for(i=0;i<=u.length;i++){if(u[i]&&u[i].indexOf(o)>-1){break}}if(!u[i]){return false}c=u[i].map(function(t){return"sapUiBlockLayoutBackground"+t+(a?"Inverted":"")});return c.some(this.hasStyleClass,this)};return l});