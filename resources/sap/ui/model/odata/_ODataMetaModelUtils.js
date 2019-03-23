/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_AnnotationHelperBasics","sap/base/Log","sap/ui/thirdparty/jquery"],function(e,a,t){"use strict";var i={Bool:"false"},n={Bool:"true"},r={fiscalyear:"IsFiscalYear",fiscalyearperiod:"IsFiscalYearPeriod",year:"IsCalendarYear",yearmonth:"IsCalendarYearMonth",yearmonthday:"IsCalendarDate",yearquarter:"IsCalendarYearQuarter",yearweek:"IsCalendarYearWeek"},o={interval:"SingleInterval","multi-value":"MultiValue","single-value":"SingleValue"},s="sap.ui.model.odata.ODataMetaModel",l={bday:"Contact",city:"Contact/adr",country:"Contact/adr",email:"Contact/email",familyname:"Contact/n",givenname:"Contact/n",honorific:"Contact/n",middlename:"Contact/n",name:"Contact",nickname:"Contact",note:"Contact",org:"Contact","org-role":"Contact","org-unit":"Contact",photo:"Contact",pobox:"Contact/adr",region:"Contact/adr",street:"Contact/adr",suffix:"Contact/n",tel:"Contact/tel",title:"Contact",zip:"Contact/adr",class:"Event",dtend:"Event",dtstart:"Event",duration:"Event",fbtype:"Event",location:"Event",status:"Event",transp:"Event",wholeday:"Event",body:"Message",from:"Message",received:"Message",sender:"Message",subject:"Message",completed:"Task",due:"Task","percent-complete":"Task",priority:"Task"},c=/(\w+)(?:;type=([\w,]+))?/,p={email:{typeMapping:{home:"home",pref:"preferred",work:"work"},v4EnumType:"com.sap.vocabularies.Communication.v1.ContactInformationType",v4PropertyAnnotation:"com.sap.vocabularies.Communication.v1.IsEmailAddress"},tel:{typeMapping:{cell:"cell",fax:"fax",home:"home",pref:"preferred",video:"video",voice:"voice",work:"work"},v4EnumType:"com.sap.vocabularies.Communication.v1.PhoneType",v4PropertyAnnotation:"com.sap.vocabularies.Communication.v1.IsPhoneNumber"}},u={creatable:{"Org.OData.Capabilities.V1.InsertRestrictions":{Insertable:i}},pageable:{"Org.OData.Capabilities.V1.SkipSupported":i,"Org.OData.Capabilities.V1.TopSupported":i},"requires-filter":{"Org.OData.Capabilities.V1.FilterRestrictions":{RequiresFilter:n}},topable:{"Org.OData.Capabilities.V1.TopSupported":i}},f={city:"locality",email:"address",familyname:"surname",givenname:"given",honorific:"prefix",middlename:"additional",name:"fn","org-role":"role","org-unit":"orgunit","percent-complete":"percentcomplete",tel:"uri",zip:"code"},d={"sap:filterable":["Org.OData.Capabilities.V1.FilterRestrictions","NonFilterableProperties"],"sap:required-in-filter":["Org.OData.Capabilities.V1.FilterRestrictions","RequiredProperties"],"sap:sortable":["Org.OData.Capabilities.V1.SortRestrictions","NonSortableProperties"]},m=/^com\.sap\.vocabularies\.Common\.v1\.ValueList(#.*)?$/,v=a.Level.WARNING,b;b={addEntitySetAnnotation:function(e,a,i,n,r){if(i==="EntitySet"&&a.value===n){if(r){t.extend(true,e,u[a.name])}else{t.extend(e,u[a.name])}}},addFilterRestriction:function(e,t){var i,n=o[e["sap:filter-restriction"]];if(!n){if(a.isLoggable(v,s)){a.warning("Unsupported sap:filter-restriction: "+e["sap:filter-restriction"],t.entityType+"."+e.name,s)}return}i=t["com.sap.vocabularies.Common.v1.FilterExpressionRestrictions"]||[];i.push({Property:{PropertyPath:e.name},AllowedExpressions:{EnumMember:"com.sap.vocabularies.Common.v1.FilterExpressionType/"+n}});t["com.sap.vocabularies.Common.v1.FilterExpressionRestrictions"]=i},addNavigationFilterRestriction:function(e,a){var t=a["Org.OData.Capabilities.V1.NavigationRestrictions"]||{};t.RestrictedProperties=t.RestrictedProperties||[];t.RestrictedProperties.push({FilterRestrictions:{Filterable:i},NavigationProperty:{NavigationPropertyPath:e.name}});a["Org.OData.Capabilities.V1.NavigationRestrictions"]=t},addPropertyToAnnotation:function(e,a,t){var i=d[e],n=i[0],r=i[1],o=a[n]||{},s=o[r]||[];s.push({PropertyPath:t.name});o[r]=s;a[n]=o},addSapSemantics:function(e){if(e.property){e.property.forEach(function(t){var i,o,u,d,m,y=t["sap:semantics"],g,h,C,P,O;if(!y){return}if(y==="url"){t["Org.OData.Core.V1.IsURL"]=n;return}if(y in r){g="com.sap.vocabularies.Common.v1."+r[y];t[g]=n;return}u=c.exec(y);if(!u){if(a.isLoggable(v,s)){a.warning("Unsupported sap:semantics: "+y,e.name+"."+t.name,s)}return}if(u[2]){y=u[1];O=b.getV4TypesForV2Semantics(y,u[2],t,e)}P=p[y];o=y==="tel"||y==="email";h=l[y];if(h){i=h.split("/");g="com.sap.vocabularies.Communication.v1."+i[0];e[g]=e[g]||{};C=e[g];d=i[1];if(d){C[d]=C[d]||(o?[]:{});if(o){m={};C[d].push(m);C=m}else{C=C[d]}}C[f[y]||y]={Path:t.name};if(O){C.type={EnumMember:O}}}if(P){t[P.v4PropertyAnnotation]=t[P.v4PropertyAnnotation]||n}})}},addUnitAnnotations:function(t,i){function n(t){(t||[]).forEach(function(t){(t.property||[]).forEach(function(n){var r,o,l,c,p=n["sap:unit"],u;if(p){c={Path:p};l=e.followPath({getModel:function(){return i},getPath:function(){return t.$path}},c);if(l&&l.resolvedPath){u=i.getProperty(l.resolvedPath);o=u["sap:semantics"];if(o==="unit-of-measure"){r="Org.OData.Measures.V1.Unit"}else if(o==="currency-code"){r="Org.OData.Measures.V1.ISOCurrency"}else if(a.isLoggable(v,s)){a.warning("Unsupported sap:semantics='"+o+"' at sap:unit='"+p+"'; "+"expected 'currency-code' or 'unit-of-measure'",t.namespace+"."+t.name+"/"+n.name,s)}if(r&&!(r in n)){n[r]=c}}else if(a.isLoggable(v,s)){a.warning("Path '"+p+"' for sap:unit cannot be resolved",t.namespace+"."+t.name+"/"+n.name,s)}}})})}t.forEach(function(e){n(e.complexType);n(e.entityType)})},addV4Annotation:function(e,a,t){switch(a.name){case"aggregation-role":if(a.value==="dimension"){e["com.sap.vocabularies.Analytics.v1.Dimension"]=n}else if(a.value==="measure"){e["com.sap.vocabularies.Analytics.v1.Measure"]=n}break;case"display-format":if(a.value==="NonNegative"){e["com.sap.vocabularies.Common.v1.IsDigitSequence"]=n}else if(a.value==="UpperCase"){e["com.sap.vocabularies.Common.v1.IsUpperCase"]=n}break;case"pageable":case"topable":b.addEntitySetAnnotation(e,a,t,"false",false);break;case"creatable":b.addEntitySetAnnotation(e,a,t,"false",true);break;case"deletable":case"deletable-path":b.handleXableAndXablePath(e,a,t,"Org.OData.Capabilities.V1.DeleteRestrictions","Deletable");break;case"updatable":case"updatable-path":b.handleXableAndXablePath(e,a,t,"Org.OData.Capabilities.V1.UpdateRestrictions","Updatable");break;case"requires-filter":b.addEntitySetAnnotation(e,a,t,"true",true);break;case"field-control":e["com.sap.vocabularies.Common.v1.FieldControl"]={Path:a.value};break;case"heading":e["com.sap.vocabularies.Common.v1.Heading"]={String:a.value};break;case"label":e["com.sap.vocabularies.Common.v1.Label"]={String:a.value};break;case"precision":e["Org.OData.Measures.V1.Scale"]={Path:a.value};break;case"quickinfo":e["com.sap.vocabularies.Common.v1.QuickInfo"]={String:a.value};break;case"text":e["com.sap.vocabularies.Common.v1.Text"]={Path:a.value};break;case"visible":if(a.value==="false"){e["com.sap.vocabularies.Common.v1.FieldControl"]={EnumMember:"com.sap.vocabularies.Common.v1.FieldControlType/Hidden"};e["com.sap.vocabularies.UI.v1.Hidden"]=n}break;default:}},calculateEntitySetAnnotations:function(e,a){if(a.property){a.property.forEach(function(a){if(a["sap:filterable"]==="false"){b.addPropertyToAnnotation("sap:filterable",e,a)}if(a["sap:required-in-filter"]==="true"){b.addPropertyToAnnotation("sap:required-in-filter",e,a)}if(a["sap:sortable"]==="false"){b.addPropertyToAnnotation("sap:sortable",e,a)}if(a["sap:filter-restriction"]){b.addFilterRestriction(a,e)}})}if(a.navigationProperty){a.navigationProperty.forEach(function(a){if(a["sap:filterable"]==="false"){b.addNavigationFilterRestriction(a,e);b.addPropertyToAnnotation("sap:filterable",e,a)}b.handleCreatableNavigationProperty(e,a)})}},findIndex:function(e,a,t){var i,n;t=t||"name";if(e){for(i=0,n=e.length;i<n;i++){if(e[i][t]===a){return i}}}return-1},findObject:function(e,a,t){var i=b.findIndex(e,a,t);return i<0?null:e[i]},getChildAnnotations:function(e,a,t){var i=t?e.EntityContainer:e.propertyAnnotations;return i&&i[a]||{}},getFromContainer:function(e,a,t,i){var n,r=i?undefined:null;if(e){n=b.findIndex(e[a],t);if(n>=0){r=i?e.$path+"/"+a+"/"+n:e[a][n]}}return r},getObject:function(e,a,t,i){var n,r=i?undefined:null,o,s,l,c;t=t||"";s=t.lastIndexOf(".");l=t.slice(0,s);c=t.slice(s+1);o=b.getSchema(e,l);if(o){n=o[a];if(n){n.forEach(function(e){if(e.name===c){r=i?e.$path:e;return false}})}}return r},getSchema:function(e,a){var t=null,i=Array.isArray(e)?e:e.getObject("/dataServices/schema");if(i){i.forEach(function(e){if(e.namespace===a){t=e;return false}})}return t},getV4TypesForV2Semantics:function(e,t,i,n){var r=[],o=p[e];if(o){t.split(",").forEach(function(e){var t=o.typeMapping[e];if(t){r.push(o.v4EnumType+"/"+t)}else if(a.isLoggable(v,s)){a.warning("Unsupported type for sap:semantics: "+e,n.name+"."+i.name,s)}})}return r.join(" ")},getValueLists:function(e){var a,t,i,n={};for(t in e){a=m.exec(t);if(a){i=(a[1]||"").slice(1);n[i]=e[t]}}return n},handleCreatableNavigationProperty:function(e,t){var i=t["sap:creatable"],n=t["sap:creatable-path"],r,o={NavigationPropertyPath:t.name},l;if(i&&n){a.warning("Inconsistent service","Use either 'sap:creatable' or 'sap:creatable-path' at navigation property "+"'"+e.entityType+"/"+t.name+"'",s);i="false";n=undefined}if(i==="false"||n){r=e["Org.OData.Capabilities.V1.InsertRestrictions"]=e["Org.OData.Capabilities.V1.InsertRestrictions"]||{};l=r["NonInsertableNavigationProperties"]=r["NonInsertableNavigationProperties"]||[];if(n){o={If:[{Not:{Path:n}},o]}}l.push(o)}},handleXableAndXablePath:function(e,t,n,r,o){var l=o.toLowerCase(),c;if(n!=="EntitySet"){return}if(e["sap:"+l]&&e["sap:"+l+"-path"]){a.warning("Inconsistent service","Use either 'sap:"+l+"' or 'sap:"+l+"-path'"+" at entity set '"+e.name+"'",s);c=i}else if(l!==t.name){c={Path:t.value}}else if(t.value==="false"){c=i}if(c){e[r]=e[r]||{};e[r][o]=c}},liftSAPData:function(e,a){if(!e.extensions){return}e.extensions.forEach(function(t){if(t.namespace==="http://www.sap.com/Protocols/SAPData"){e["sap:"+t.name]=t.value;b.addV4Annotation(e,t,a)}});switch(a){case"Property":if(e["sap:updatable"]==="false"){if(e["sap:creatable"]==="false"){e["Org.OData.Core.V1.Computed"]=n}else{e["Org.OData.Core.V1.Immutable"]=n}}break;case"EntitySet":if(e["sap:searchable"]!=="true"){e["Org.OData.Capabilities.V1.SearchRestrictions"]={Searchable:i}}break;default:}},merge:function(e,a,i){var n=a.dataServices.schema;if(!n){return}n.forEach(function(a,i){var r;delete a.annotations;b.liftSAPData(a);a.$path="/dataServices/schema/"+i;r=a["sap:schema-version"];if(r){a["Org.Odata.Core.V1.SchemaVersion"]={String:r}}t.extend(a,e[a.namespace]);b.visitParents(a,e,"association",function(e,a){b.visitChildren(e.end,a)});b.visitParents(a,e,"complexType",function(e,a){b.visitChildren(e.property,a,"Property");b.addSapSemantics(e)});b.visitParents(a,e,"entityType",b.visitEntityType);b.visitParents(a,e,"entityContainer",function(t,i){b.visitChildren(t.associationSet,i);b.visitChildren(t.entitySet,i,"EntitySet",n);b.visitChildren(t.functionImport,i,"",null,b.visitParameters.bind(this,e,a,t))})});b.addUnitAnnotations(n,i)},visitChildren:function(e,a,i,n,r,o){if(!e){return}if(o){e=e.slice(o)}e.forEach(function(e){b.liftSAPData(e,i)});e.forEach(function(e){var o;if(i==="EntitySet"){o=b.getObject(n,"entityType",e.entityType);b.calculateEntitySetAnnotations(e,o)}if(r){r(e)}t.extend(e,a[e.name||e.role])})},visitEntityType:function(e,a){b.visitChildren(e.property,a,"Property");b.visitChildren(e.navigationProperty,a);b.addSapSemantics(e)},visitParameters:function(e,a,i,n){var r;if(!n.parameter){return}r=b.getChildAnnotations(e,a.namespace+"."+i.name,true);n.parameter.forEach(function(e){b.liftSAPData(e);t.extend(e,r[n.name+"/"+e.name])})},visitParents:function(e,a,i,n,r){var o=e[i];function s(r,o){var s=e.namespace+"."+r.name,l=b.getChildAnnotations(a,s,i==="entityContainer");b.liftSAPData(r);r.namespace=e.namespace;r.$path=e.$path+"/"+i+"/"+o;n(r,l);t.extend(r,a[s])}if(!o){return}if(r!==undefined){s(o[r],r)}else{o.forEach(s)}}};return b},false);