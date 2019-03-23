/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/library","sap/base/security/encodeCSS"],function(e,t){"use strict";var a=e.AvatarSize;var i=e.AvatarType;var s={};s.render=function(e,s){var r=s.getInitials(),l=s._getActualDisplayType(),d=s._getImageFallbackType(),n=s.getDisplaySize(),p=s.getDisplayShape(),o=s.getImageFitType(),g=s.getCustomDisplaySize(),w=s.getCustomFontSize(),u=s._getEscapedSrc(),b="sapFAvatar",c=s.getTooltip_AsString(),y=s._getDefaultTooltip(),A=s.getAriaLabelledBy(),C=s.getAriaDescribedBy(),f=c&&r?y+" "+c:y,S=r?y+" "+r:y;e.write("<span");e.writeControlData(s);e.addClass(b);e.addClass(b+n);e.addClass(b+l);e.addClass(b+p);if(s.hasListeners("press")){e.addClass("sapMPointer");e.addClass("sapFAvatarFocusable");e.writeAttribute("role","button");e.writeAttribute("tabIndex",0)}else{e.writeAttribute("role","img")}if(n===a.Custom){e.addStyle("width",g);e.addStyle("height",g);e.addStyle("font-size",w)}if(c){e.writeAttributeEscaped("title",c);e.writeAttributeEscaped("aria-label",f)}else{e.writeAttributeEscaped("aria-label",S)}if(A&&A.length>0){e.writeAttributeEscaped("aria-labelledby",A.join(" "))}if(C&&C.length>0){e.writeAttributeEscaped("aria-describedby",C.join(" "))}e.writeClasses();e.writeStyles();e.write(">");if(l===i.Icon||d===i.Icon){e.renderControl(s._getIcon())}else if(l===i.Initials||d===i.Initials){e.write("<span");e.addClass(b+"InitialsHolder");e.writeClasses();e.write(">");e.writeEscaped(r);e.write("</span>")}if(l===i.Image){e.write("<span");e.addClass("sapFAvatarImageHolder");e.addClass(b+l+o);e.addStyle("background-image","url('"+t(u)+"')");e.writeClasses();e.writeStyles();e.write(">");e.write("</span>")}if(s._fnLightBoxOpen){e.write('<span class="sapFAvatarMagnifyingGlass"></span>')}e.write("</span>")};return s},true);