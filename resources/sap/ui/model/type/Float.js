/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/format/NumberFormat","sap/ui/model/SimpleType","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/thirdparty/jquery"],function(t,o,a,e,i,r){"use strict";var n=o.extend("sap.ui.model.type.Float",{constructor:function(){o.apply(this,arguments);this.sName="Float"}});n.prototype.formatValue=function(t,o){var e=t;if(t==undefined||t==null){return null}if(this.oInputFormat){e=this.oInputFormat.parse(t);if(e==null){throw new a("Cannot format float: "+t+" has the wrong format")}}switch(this.getPrimitiveType(o)){case"string":return this.oOutputFormat.format(e);case"int":return Math.floor(e);case"float":case"any":return e;default:throw new a("Don't know how to format Float to "+o)}};n.prototype.parseValue=function(t,o){var a,i;switch(this.getPrimitiveType(o)){case"string":a=this.oOutputFormat.parse(t);if(isNaN(a)){i=sap.ui.getCore().getLibraryResourceBundle();throw new e(i.getText("Float.Invalid"))}break;case"int":case"float":a=t;break;default:throw new e("Don't know how to parse Float from "+o)}if(this.oInputFormat){a=this.oInputFormat.format(a)}return a};n.prototype.validateValue=function(t){if(this.oConstraints){var o=sap.ui.getCore().getLibraryResourceBundle(),a=[],e=[],n=t;if(this.oInputFormat){n=this.oInputFormat.parse(t)}r.each(this.oConstraints,function(t,i){switch(t){case"minimum":if(n<i){a.push("minimum");e.push(o.getText("Float.Minimum",[i]))}break;case"maximum":if(n>i){a.push("maximum");e.push(o.getText("Float.Maximum",[i]))}}});if(a.length>0){throw new i(this.combineMessages(e),a)}}};n.prototype.setFormatOptions=function(t){this.oFormatOptions=t;this._createFormats()};n.prototype._handleLocalizationChange=function(){this._createFormats()};n.prototype._createFormats=function(){var o=this.oFormatOptions.source;this.oOutputFormat=t.getFloatInstance(this.oFormatOptions);if(o){if(r.isEmptyObject(o)){o={groupingEnabled:false,groupingSeparator:",",decimalSeparator:"."}}this.oInputFormat=t.getFloatInstance(o)}};return n});