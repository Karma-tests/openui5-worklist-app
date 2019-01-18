/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/LoaderExtensions"],function(e){"use strict";var r=function(){this.mProperties={};this.aKeys=null};r.prototype.getProperty=function(e,r){var t=this.mProperties[e];if(typeof t=="string"){return t}else if(r){return r}return null};r.prototype.getKeys=function(){return this.aKeys||(this.aKeys=Object.keys(this.mProperties))};r.prototype.setProperty=function(e,r){if(typeof r!="string"){return}if(typeof this.mProperties[e]!="string"&&this.aKeys){this.aKeys.push(String(e))}this.mProperties[e]=r};r.prototype.clone=function(){var e=new r;e.mProperties=Object.assign({},this.mProperties);return e};var t=typeof chrome==="object"||typeof v8==="object"?function(e,r){if(r>2&&40*r>e.length){Number(e)}return e}:function(e){return e};var n=/(?:\r\n|\r|\n|^)[ \t\f]*/;var i=/(\\u[0-9a-fA-F]{0,4})|(\\.)|(\\$)|([ \t\f]*[ \t\f:=][ \t\f]*)/g;var s=/(\\u[0-9a-fA-F]{0,4})|(\\.)|(\\$)/g;var o={"\\f":"\f","\\n":"\n","\\r":"\r","\\t":"\t"};function f(e,r){var f=e.split(n),u,l,a,c,p,h,y,g;function d(e){if(c){c=c+e;g++}else{c=e;g=0}}r.mProperties={};for(p=0;p<f.length;p++){u=f[p];if(u===""||u.charAt(0)==="#"||u.charAt(0)==="!"){continue}l=i;l.lastIndex=y=0;a=null;c="";while((h=l.exec(u))!==null){if(y<h.index){d(u.slice(y,h.index))}y=l.lastIndex;if(h[1]){if(h[1].length!==6){throw new Error("Incomplete Unicode Escape '"+h[1]+"'")}d(String.fromCharCode(parseInt(h[1].slice(2),16)))}else if(h[2]){d(o[h[2]]||h[2].slice(1))}else if(h[3]){u=f[++p];l.lastIndex=y=0}else if(h[4]){a=c;c="";l=s;l.lastIndex=y}}if(y<u.length){d(u.slice(y))}if(a==null){a=c;c=""}r.mProperties[a]=t(c,c?g:0)}}r.create=function(t){t=Object.assign({url:undefined,headers:{}},t);var n=!!t.async,i=new r,s;function o(e){if(typeof e==="string"){f(e,i);return i}return t.returnNullIfMissing?null:i}if(typeof t.url==="string"){s=e.loadResource({url:t.url,dataType:"text",headers:t.headers,failOnError:false,async:n})}if(n){if(!s){return Promise.resolve(o(null))}return s.then(function(e){return o(e)},function(e){throw e instanceof Error?e:new Error("Problem during loading of property file '"+t.url+"': "+e)})}return o(s)};return r});