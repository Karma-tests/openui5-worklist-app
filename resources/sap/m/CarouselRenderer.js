/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/Device"],function(e,r){"use strict";var t=e.CarouselArrowsPlacement;var i=e.PlacementType;var s={};s._BULLETS_TO_NUMBERS_THRESHOLD=9;s.render=function(e,a){var o=a.getPages(),n=o.length,d=a.getPageIndicatorPlacement(),l=a.getArrowsPlacement(),w=a.getId(),c=s._BULLETS_TO_NUMBERS_THRESHOLD,g=a._getPageNumber(a.getActivePage());this._renderOpeningDiv(e,a);if(d===i.Top){this._renderPageIndicatorAndArrows({rm:e,iPageCount:n,sId:w,iIndex:g,iBulletsToNumbersThreshold:c,sArrowsPlacement:l,bBottom:false,bShowPageIndicator:a.getShowPageIndicator()},a)}this._renderInnerDiv(e,a,o,d);if(r.system.desktop&&n>1&&l===t.Content){this._renderHudArrows(e,a)}if(d===i.Bottom){this._renderPageIndicatorAndArrows({rm:e,iPageCount:n,sId:w,iIndex:g,iBulletsToNumbersThreshold:c,sArrowsPlacement:l,bBottom:true,bShowPageIndicator:a.getShowPageIndicator()},a)}this._renderClosingDiv(e)};s._renderOpeningDiv=function(e,r){var t=r.getTooltip_AsString();e.write("<div");e.writeControlData(r);e.writeAttribute("data-sap-ui-customfastnavgroup","true");e.addStyle("width",r.getWidth());e.addStyle("height",r.getHeight());e.writeStyles();e.addClass("sapMCrsl");e.addClass("sapMCrslFluid");e.writeClasses();if(t){e.writeAttributeEscaped("title",t)}e.writeAttributeEscaped("tabindex","0");e.writeAccessibilityState(r,{role:"list"});e.write(">")};s._renderInnerDiv=function(e,r,s,a){e.write("<div class='sapMCrslInner");r._cleanUpScrollContainer();if(s.length>1&&(r.getShowPageIndicator()||r.getArrowsPlacement()===t.PageIndicator)){if(a===i.Bottom){e.write(" sapMCrslBottomOffset");if(r.getArrowsPlacement()===t.PageIndicator){e.write(" sapMCrslBottomArrowsOffset")}}else{e.write(" sapMCrslTopOffset");if(r.getArrowsPlacement()===t.PageIndicator){e.write(" sapMCrslTopArrowsOffset")}}}e.write("'>");var o=function(t,i,s){e.write("<div class='sapMCrslItem");e.write("' id='"+r.sId+"-"+t.sId+"-slide'");e.writeAccessibilityState(t,{role:"listitem",posinset:i+1,setsize:s.length});e.write(">");e.renderControl(r._createScrollContainer(t,i));e.write("</div>")};s.forEach(o);e.write("</div>")};s._renderClosingDiv=function(e){e.write("</div>")};s._renderPageIndicatorAndArrows=function(e,i){var s=e.rm,a=e.iPageCount,o=r.system.desktop&&e.sArrowsPlacement===t.PageIndicator,n=e.bBottom,d=e.sId,l=e.iIndex,w=e.iBulletsToNumbersThreshold,c=e.bShowPageIndicator,g=c?"":"opacity: 0",p=sap.ui.getCore().getLibraryResourceBundle("sap.m"),C="",u=p.getText("CAROUSEL_PAGE_INDICATOR_TEXT",[l+1,a]);if(a<=1){return}if(!c&&!o){return}if(n){C+=" sapMCrslControlsBottom"}else{C+=" sapMCrslControlsTop"}if(o){s.write("<div");s.addClass("sapMCrslControls");s.addClass(C);s.writeClasses();s.write(">");s.write('<div class="sapMCrslControlsContainer'+C+'">')}else{s.write('<div class="sapMCrslControlsNoArrows'+C+'">')}if(o){this._renderPrevArrow(s,i)}var v=d+"-pageIndicator";s.write('<div id="'+v+'" style="'+g+'"');if(a<w){s.write(' class="sapMCrslBulleted">');for(var f=1;f<=a;f++){s.write("<span role='img' data-slide="+f+" aria-label='"+p.getText("CAROUSEL_POSITION",[f,a])+"'>"+f+"</span>")}}else{s.write(' class="sapMCrslNumeric">');s.write("<span id="+d+"-"+"slide-number>"+u+"</span>")}s.write("</div>");if(o){this._renderNextArrow(s,i)}if(!o){s.write("</div>")}if(o){s.write("</div>");s.write("</div>")}};s._renderHudArrows=function(e,r){var t;if(r.getShowPageIndicator()){if(r.getPageIndicatorPlacement()===i.Top){t="sapMCrslHudTop"}else if(r.getPageIndicatorPlacement()===i.Bottom){t="sapMCrslHudBottom"}}else{t="sapMCrslHudMiddle"}var s=r.getId()+"-hud";e.write('<div id="'+s+'" class="sapMCrslHud '+t+'">');this._renderPrevArrow(e,r);this._renderNextArrow(e,r);e.write("</div>")};s._renderPrevArrow=function(e,r){e.write("<a class='sapMCrslPrev' href='#' data-slide='prev' tabindex='-1'><div class='sapMCrslArrowInner'>");e.renderControl(r._getNavigationArrow("left"));e.write("</div></a>")};s._renderNextArrow=function(e,r){e.write("<a class='sapMCrslNext' href='#' data-slide='next' tabindex='-1'><div class='sapMCrslArrowInner'>");e.renderControl(r._getNavigationArrow("right"));e.write("</div></a>")};return s},true);