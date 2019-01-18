/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/base/security/encodeXML"],function(e,t){"use strict";var r=e.extend("sap.ui.core.support.controls.ObjectViewer",{constructor:function(){e.apply(this,arguments);this._oRenderParent=null;this._oRootObject=null}});var i={rowstart:'<div class="{cssclass}" collapsed="{collapsed}" visible="{visible}" style="padding-left:{pxlevel};margin-left: 16px;" idx="{idx}" key="{key}" sectionkey="{sectionkey}" level="level" raise="_select" hover="_hover" args="{sectionkey},{key}">',namestart:'<span class="key" title="{key}">',keyinfo:'<span class="keyinfo {color}" selected="{selected}" sectionkey="{sectionkey}" key="{key}" raise="_keyInfoPress" args="{sectionkey},{key},{infoidx}"  title="{tooltip}" style="margin-right:{pxlevel}"></span>',nameend:"{key}</span>",separator:'<span class="colon">:</span>',valuestart:'<span class="value" title="{value}"><input {readonly} class="valueInput"value="{value}" raise="_changeValue" args="{sectionkey},{key}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">',valueend:"{value}</span>",rowend:"</div>",headerrow:'<div sectionkey="{sectionkey}" collapsed="{collapsed}" class="header" raise="_toggleSection" args="{sectionkey}"><span class="expand"></span>{header} ({count})</span></div>'};var o=-1;function a(e,r){o++;for(var a in e){var n=r.initialExpandedSections===null||r.initialExpandedSections.indexOf(a)===-1;r.addWithParam(i.headerrow,{idx:o,sectionkey:a,header:a,level:0,collapsed:n,count:Object.keys(e[a]).length});var l=e[a];o++;for(var s in l){r.addWithParam(i.rowstart,{idx:o,sectionkey:a,key:s,level:l._level||0,pxlevel:(l._level||0)*16+"px",cssclass:"",visible:!n,header:a,collapsed:n});r.addWithParam(i.namestart,{key:s});var d=r.fnObjectInfos(e,a,l,s);if(d){for(var c=0;c<d.length;c++){var p=d[c];r.addWithParam(i.keyinfo,{infoidx:c+"",sectionkey:a,key:s,pxlevel:(l[s].__level||0)*16+3+"px",selected:p.selected||false,color:p.color||"orange",tooltip:p.tooltip||""})}}r.addWithParam(i.nameend,{key:s});r.addWithParam(i.separator,{});r.addWithParam(i.valuestart,{value:t(String(l[s].value)),readonly:l[s].__change?"":"readonly",sectionkey:a,key:s});r.addWithParam(i.valueend,{value:t(String(l[s].value))});r.addWithParam(i.rowend,{});if("value2"in l[s]){r.addWithParam(i.rowstart,{idx:o,sectionkey:a,key:s,level:l._level||0,pxlevel:(l._level||0)*16+"px",cssclass:"hiddenkey",visible:!n,header:a,collapsed:n});r.addWithParam(i.namestart,{key:s});var d=r.fnObjectInfos(e,a,l,s);if(d){for(var c=0;c<d.length;c++){var p=d[c];r.addWithParam(i.keyinfo,{infoidx:c+"",sectionkey:a,key:s,pxlevel:(l[s].__level||0)*16+3+"px",selected:p.selected||false,color:p.color||"orange",tooltip:t(String(p.tooltip)||"")})}}r.addWithParam(i.nameend,{key:s});r.addWithParam(i.separator,{});r.addWithParam(i.valuestart,{value:t(String(l[s].value2)),readonly:"readonly",sectionkey:a,key:s});r.addWithParam(i.valueend,{value:t(String(l[s].value2))});r.addWithParam(i.rowend,{})}}}}function n(){this._aBuffer=[];var e=this;this.add=function(){e._aBuffer.push.apply(e._aBuffer,arguments)};this.addWithParam=function(t,r){for(var i in r){var o=new RegExp("{"+i+"}","g");t=t.replace(o,r[i])}e.add(t)};this.toString=function(){return e._aBuffer.join("")}}r.prototype.fnSelect=function(){};r.prototype.fnHover=function(){};r.prototype.initialExpandedSections=null;r.prototype.expandedSections=[];r.prototype.setRootObject=function(e){this._oRootObject=e};r.prototype.attachSelect=function(e){this.fnSelect=e};r.prototype.attachHover=function(e){this.fnHover=e};r.prototype.attachObjectInfos=function(e){this.fnObjectInfos=e};r.prototype.attachInfoPress=function(e){this.fnInfoPress=e};r.prototype.setInfoSelected=function(e,t,r,i){var o=this._oRenderParent.firstChild.querySelector("[args='"+e+","+t+","+r+"']");if(o){o.setAttribute("selected",i+"")}};r.prototype._keyInfoPress=function(e,t,r){r=parseInt(r);this.fnInfoPress(e,t,r);return true};r.prototype._changeValue=function(e,t,r,i){if(r===undefined){return}var o=this._oRootObject[e][t].__change(r);if(o&&o.error){i.setAttribute("error","true");i.setAttribute("title",o.error)}else{i.removeAttribute("error");if("value"in o){if(r!==""+o.value){i.setAttribute("title",r+"->"+o.value)}else{i.setAttribute("title",o.value)}i.value=o.value}}};r.prototype._toggleSection=function(e){var t=this._oRenderParent.firstChild.querySelectorAll("[sectionkey='"+e+"']");if(t[0].getAttribute("collapsed")==="true"){for(var r=1;r<t.length;r++){t[r].setAttribute("visible","true")}t[0].setAttribute("collapsed","false");if(this.expandedSections.indexOf(e)===-1){this.expandedSections.push(e)}}else{for(var r=1;r<t.length;r++){t[r].setAttribute("visible","false")}t[0].setAttribute("collapsed","true");if(this.expandedSections.indexOf(e)>-1){this.expandedSections.splice(this.expandedSections.indexOf(e),1)}}};r.prototype._select=function(e,t){this.fnSelect(this._oRootObject[e][t],e,t)};r.prototype._hover=function(e,t){this.fnHover(this._oRootObject[e][t],e,t)};r.prototype.update=function(e){if(!e&&!this._oRenderParent){return}if(this._oRenderParent&&e){this._oRenderParent.innerHTML=""}this._oRenderParent=e||this._oRenderParent;if(this._oRootObject){var t=new n;t.initialExpandedSections=this.initialExpandedSections;t.fnObjectInfos=this.fnObjectInfos||function(){};o=-1;t.add('<div class="objectviewer" id="'+this.getId()+'">');if(this._oRootObject){a(this._oRootObject,t)}t.add("</div>");this._oRenderParent.innerHTML=t.toString();var r=this;this._oRenderParent.firstChild.addEventListener("click",function(e){if(e.target.tagName==="INPUT"){return}var t=e.target,i=false,o=[];while(!i){if(t.getAttribute("raise")){if(t.getAttribute("args")){var a=t.getAttribute("args").split(",");a=a.concat(o);i=r[t.getAttribute("raise")].apply(r,a)}else{var a=[t];a=a.concat(o);i=r[t.getAttribute("raise")].apply(r,a)}}else if(t.getAttribute("reason")){o.push(t.getAttribute("reason"))}t=t.parentNode;if(t===r._oRenderParent){break}}});this._oRenderParent.firstChild.addEventListener("mouseover",function(e){var t=e.target,i=false,o=[];while(!i){if(t.getAttribute("hover")){if(t.getAttribute("args")){var a=t.getAttribute("args").split(",");a=a.concat(o);i=r[t.getAttribute("hover")].apply(r,a)}else{var a=[t];a=a.concat(o);i=r[t.getAttribute("hover")].apply(r,a)}}else if(t.getAttribute("reason")){o.push(t.getAttribute("reason"))}t=t.parentNode;if(t===r._oRenderParent){break}}});this._oRenderParent.firstChild.addEventListener("change",function(e){var t=e.target,i=false,o=[],a=[t.value,t];while(!i){if(t.getAttribute("raise")){if(t.getAttribute("args")){var n=t.getAttribute("args").split(",");n=n.concat(o,a);i=r[t.getAttribute("raise")].apply(r,n)}}break}});this._oRenderParent.firstChild.addEventListener("mouseout",function(e){var t=e.target,i=false,o=[];while(!i){if(t.getAttribute("hover")){if(t.getAttribute("args")){var a=t.getAttribute("args").split(",");a=a.concat(o);i=r[t.getAttribute("hover")].apply(r,a)}else{var a=[t];a=a.concat(o);i=r[t.getAttribute("hover")].apply(r,a)}}else if(t.getAttribute("reason")){o.push(t.getAttribute("reason"))}t=t.parentNode;if(t===r._oRenderParent){break}}})}};r.getCss=function(){return[".objectviewer {white-space: nowrap;font-family:consolas;display:block;cursor:default;width: 100%; overflow: auto; height: 100%; padding:10px; box-sizing:border-box;}",".objectviewer .key {white-space: nowrap;color: #b93232; width: 40%; overflow:hidden; display: inline-block; text-overflow: ellipsis;}",".objectviewer .hiddenkey .keyinfo{visibility:hidden}",".objectviewer .hiddenkey .colon{visibility:hidden}",".objectviewer .hiddenkey .key{visibility:hidden}",".objectviewer .value {white-space: nowrap;color: #007dc0; width: 50%; overflow:hidden; display: inline-block; text-overflow: ellipsis;}",".objectviewer .value .valueInput {font-family:consolas;border:none; padding:0; background-color:transparent;white-space: nowrap;color: #007dc0; width: 100%; overflow:hidden; display: inline-block; text-overflow: ellipsis;}",".objectviewer .value .valueInput:not([readonly])[error='true'] {color:#d80000;solid 2px rgba(255, 0, 0, 0.26)}",".objectviewer .value .valueInput:not([readonly]):hover {background-color:#f5f5f5}",".objectviewer .value .valueInput:not([readonly]):focus {background-color:#fff;border:none;outline:none}",".objectviewer .colon {padding:0 6px;display: inline-block;overflow: hidden; width: 2%}",".objectviewer .header {color:#666; font-size: 14px; font-family:arial;margin: 3px 0 2px;}",".objectviewer .control .key{font-weight:bold; color:#333}",".objectviewer .control .value{font-weight:bold; color:#333}",".objectviewer .keyinfo.orange {border: 1px solid orange;}",".objectviewer .keyinfo.blue {border: 1px solid #007dc0;}",".objectviewer .keyinfo.green {border: 1px solid green;}",".objectviewer .keyinfo.red {border: 1px solid #cc1919;}",".objectviewer .keyinfo.orange[selected='true'] {background-color: orange;}",".objectviewer .keyinfo.blue[selected='true'] {background-color: #007dc0;}",".objectviewer .keyinfo.green[selected='true'] {background-color: green;}",".objectviewer .keyinfo.red[selected='true'] {background-color: #cc1919;}",".objectviewer .keyinfo {display: inline-block; border-radius: 10px; height: 10px;width: 10px;overflow: hidden; margin-right: 3px;position: relative;vertical-align: top;margin-top: 1px;}",".objectviewer .header[collapsed='true'] .expand{border-color: transparent transparent transparent #cecece;border-radius: 0;border-style: solid;border-width: 4px 3px 4px 8px;height: 0;width: 0;position: relative;margin-top: 0px;margin-left: 2px;display: inline-block;}",".objectviewer [collapsed='false'] .expand  {border-color: #cecece transparent transparent transparent;border-radius: 0;border-style: solid;border-width: 8px 4px 0px 4px;height: 0;width: 0;position: relative;margin-top: 0px;margin-left: 0px;margin-right: 5px;display: inline-block;}",".objectviewer [collapsed='true'] .expand:hover {border-color: transparent transparent transparent #aaa;}",".objectviewer [collapsed='false'] .expand:hover {border-color: #aaa transparent transparent transparent;}",".objectviewer [visible='false'] {display: none}",".objectviewer .internal {opacity: 0.7}",".objectviewer .private {opacity: 0.7}",".objectviewer .default {opacity: 0.7}",".objectviewer .end { border-top:1px solid #e0e0e0; height:1px;}"].join("")};return r});