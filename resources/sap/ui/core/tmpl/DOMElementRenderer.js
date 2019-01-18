/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/security/encodeXML"],function(e){"use strict";var t={};t.render=function(t,r){t.write("<");t.writeEscaped(r.getTag());t.writeControlData(r);r.getAttributes().forEach(function(r){var i=r.getName().toLowerCase();if(i==="class"){var a=r.getValue().split(" ");a.forEach(function(r){var r=r.trim();if(r){t.addClass(e(r))}})}else if(i==="style"){var s=r.getValue().split(";");s.forEach(function(r){var i=r.indexOf(":");if(i!=-1){var a=r.substring(0,i).trim();var s=r.substring(i+1).trim();t.addStyle(e(a),e(s))}})}else{t.writeAttributeEscaped(e(r.getName()),r.getValue())}});t.writeClasses();t.writeStyles();var i=r.getElements(),a=!!r.getText()||i.length>0;if(!a){t.write("/>")}else{t.write(">");if(r.getText()){t.writeEscaped(r.getText())}i.forEach(function(e,r){t.renderControl(r)});t.write("</");t.writeEscaped(r.getTag());t.write(">")}};return t},true);