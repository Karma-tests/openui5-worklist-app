/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Button","./Dialog","./Text","./FormattedText","./Link","./VBox","sap/ui/core/IconPool","sap/ui/core/ElementMetadata","sap/ui/core/library","sap/ui/core/Control","sap/m/library","sap/ui/thirdparty/jquery","sap/ui/core/theming/Parameters"],function(e,t,i,n,s,o,a,r,l,c,u,d,f){"use strict";var g=u.DialogType;var O=l.TextDirection;var I={};I.Action={OK:"OK",CANCEL:"CANCEL",YES:"YES",NO:"NO",ABORT:"ABORT",RETRY:"RETRY",IGNORE:"IGNORE",CLOSE:"CLOSE",DELETE:"DELETE"};I.Icon={NONE:undefined,INFORMATION:"INFORMATION",WARNING:"WARNING",ERROR:"ERROR",SUCCESS:"SUCCESS",QUESTION:"QUESTION"};(function(){var l=I.Action,u=I.Icon,S=f.get("_sap_m_Message_Box_Information_Icon")==="true",T=S?"message-information":"hint",C={INFORMATION:"sapMMessageBoxInfo",WARNING:"sapMMessageBoxWarning",ERROR:"sapMMessageBoxError",SUCCESS:"sapMMessageBoxSuccess",QUESTION:"sapMMessageBoxQuestion",STANDARD:"sapMMessageBoxStandard"},R={INFORMATION:a.getIconURI(T),WARNING:a.getIconURI("message-warning"),ERROR:a.getIconURI("message-error"),SUCCESS:a.getIconURI("message-success"),QUESTION:a.getIconURI("question-mark")};var E=function(){if(I._rb!==sap.ui.getCore().getLibraryResourceBundle("sap.m")){I._rb=sap.ui.getCore().getLibraryResourceBundle("sap.m")}};I.show=function(a,f){var S,T,p,N=null,x=[],y,M,_,A,h,b,B,L={id:r.uid("mbox"),initialFocus:null,textDirection:O.Inherit,verticalScrolling:true,horizontalScrolling:true,details:"",contentWidth:null};E();if(typeof f==="string"||arguments.length>2){M=arguments[1];_=arguments[2];A=arguments[3];h=arguments[4];b=arguments[5];B=arguments[6];f={icon:M,title:_,actions:A,onClose:h,id:b,styleClass:B}}if(f&&f.hasOwnProperty("details")){L.icon=u.INFORMATION;L.actions=[l.OK,l.CANCEL];f=d.extend({},L,f)}f=d.extend({},L,f);if(typeof f.actions!=="undefined"&&!Array.isArray(f.actions)){f.actions=[f.actions]}if(!f.actions||f.actions.length===0){f.actions=[l.OK]}function F(t){var i;if(I.Action.hasOwnProperty(t)){i=I._rb.getText("MSGBOX_"+t)}var n=new e({id:r.uid("mbox-btn-"),text:i||t,press:function(){N=t;S.close()}});return n}for(y=0;y<f.actions.length;y++){x.push(F(f.actions[y]))}function m(e,t){var i,a,r=new o({items:[t]});if(!e.details){return r}if(typeof e.details=="object"){e.details="<pre>"+JSON.stringify(e.details,null,"\t").replace(/{/gi,"\\{")+"</pre>"}i=(new n).setVisible(false).setHtmlText(e.details);a=new s({text:I._rb.getText("MSGBOX_LINK_TITLE"),press:function(){var e=S.getInitialFocus();S.addAriaLabelledBy(i);i.setVisible(true);a.setVisible(false);if(e&&e!==a.getId()){S._setInitialFocus()}else{x[0].focus()}}});a.addStyleClass("sapMMessageBoxLinkText");i.addStyleClass("sapMMessageBoxDetails");r.addItem(a);r.addItem(i);return r}function w(){if(typeof f.onClose==="function"){f.onClose(N)}S.detachAfterClose(w);S.destroy()}function v(){var e=0;var t=null;if(f.initialFocus){if(f.initialFocus instanceof c){t=f.initialFocus}if(typeof f.initialFocus==="string"){for(e=0;e<x.length;e++){if(I.Action.hasOwnProperty(f.initialFocus)){if(I._rb.getText("MSGBOX_"+f.initialFocus).toLowerCase()===x[e].getText().toLowerCase()){t=x[e];break}}else{if(f.initialFocus.toLowerCase()===x[e].getText().toLowerCase()){t=x[e];break}}}}}return t}if(typeof a==="string"){p=new i({textDirection:f.textDirection}).setText(a).addStyleClass("sapMMsgBoxText");T=p}else if(a instanceof c){p=a.addStyleClass("sapMMsgBoxText")}if(f&&f.hasOwnProperty("details")&&f.details!==""){p=m(f,p)}function G(){if(sap.ui.getCore().getConfiguration().getAccessibility()){S.$().attr("role","alertdialog")}}S=new t({id:f.id,type:g.Message,title:f.title,content:p,icon:R[f.icon],initialFocus:v(),verticalScrolling:f.verticalScrolling,horizontalScrolling:f.horizontalScrolling,afterOpen:G,afterClose:w,buttons:x,ariaLabelledBy:T?T.getId():undefined,contentWidth:f.contentWidth});if(C[f.icon]){S.addStyleClass(C[f.icon])}else{S.addStyleClass(C.STANDARD)}if(f.styleClass){S.addStyleClass(f.styleClass)}S.open()};I.alert=function(e,t){E();var i={icon:u.NONE,title:I._rb.getText("MSGBOX_TITLE_ALERT"),actions:l.OK,id:r.uid("alert"),initialFocus:null},n,s,o,a;if(typeof t==="function"||arguments.length>2){n=arguments[1];s=arguments[2];o=arguments[3];a=arguments[4];t={onClose:n,title:s,id:o,styleClass:a}}t=d.extend({},i,t);return I.show(e,t)};I.confirm=function(e,t){E();var i={icon:u.QUESTION,title:I._rb.getText("MSGBOX_TITLE_CONFIRM"),actions:[l.OK,l.CANCEL],id:r.uid("confirm"),initialFocus:null},n,s,o,a;if(typeof t==="function"||arguments.length>2){n=arguments[1];s=arguments[2];o=arguments[3];a=arguments[4];t={onClose:n,title:s,id:o,styleClass:a}}t=d.extend({},i,t);return I.show(e,t)};I.error=function(e,t){E();var i={icon:u.ERROR,title:I._rb.getText("MSGBOX_TITLE_ERROR"),actions:[l.CLOSE],id:r.uid("error"),initialFocus:null};t=d.extend({},i,t);return I.show(e,t)};I.information=function(e,t){E();var i={icon:u.INFORMATION,title:I._rb.getText("MSGBOX_TITLE_INFO"),actions:[l.OK],id:r.uid("info"),initialFocus:null};t=d.extend({},i,t);return I.show(e,t)};I.warning=function(e,t){E();var i={icon:u.WARNING,title:I._rb.getText("MSGBOX_TITLE_WARNING"),actions:[l.OK],id:r.uid("warning"),initialFocus:null};t=d.extend({},i,t);return I.show(e,t)};I.success=function(e,t){E();var i={icon:u.SUCCESS,title:I._rb.getText("MSGBOX_TITLE_SUCCESS"),actions:[l.OK],id:r.uid("success"),initialFocus:null};t=d.extend({},i,t);return I.show(e,t)}})();return I},true);