/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/dnd/DragInfo","sap/ui/core/dnd/DropInfo","sap/ui/events/KeyCodes"],function(e,r,t){"use strict";var n="Before",i="insertBefore",o="insertAfter",a,s="IconTabReorder";var g={_insertControl:function(e,r,t){if(e===o){r.insertAfter(t)}else{r.insertBefore(t)}},handleDrop:function(e,r,t,s,d){var f=e.indexOfItem(t),u=e.indexOfItem(s),c=t.$(),l=s.$(),p=0,D=sap.ui.getCore().getConfiguration().getRTL(),_=r===n;if(D&&!d){if(_){p=f<u?u:u+1;a=o}else{p=f<u?u-1:u;a=i}}else{if(_){p=f<u?u-1:u;a=i}else{p=f<u?u:u+1;a=o}}g._insertControl(a,c,l);g._handleConfigurationAfterDragAndDrop.call(e,t,p)},_updateAccessibilityInfo:function(){var e=this.getItems(),r=1,t;e.forEach(function(e){t=e.getDomRef();if(t&&t.getAttribute("aria-posinset")!==null){t.setAttribute("aria-posinset",r++)}})},_handleConfigurationAfterDragAndDrop:function(e,r){this.removeAggregation("items",e,true);this.insertAggregation("items",e,r,true);g._updateAccessibilityInfo.call(this)},_decreaseDropIndex:function(e){if(e===0){a=o;return e}a=i;return e-1},_increaseDropIndex:function(e,r){if(e===r-1){a=i;return e}a=o;return e+1},moveItem:function(e,r){var n=e.$(),s=this.getItems(),d=this.indexOfItem(e),f=sap.ui.getCore().getConfiguration().getRTL(),u,c,l=t;switch(r){case l.HOME:u=0;a=i;break;case l.END:u=s.length-1;a=o;break;case l.ARROW_LEFT:if(f){u=g._increaseDropIndex(d,s.length)}else{u=g._decreaseDropIndex(d)}break;case l.ARROW_RIGHT:if(f){u=g._decreaseDropIndex(d)}else{u=g._increaseDropIndex(d,s.length)}break;case l.ARROW_DOWN:u=g._increaseDropIndex(d,s.length);break;case l.ARROW_UP:u=g._decreaseDropIndex(d);break;default:return}c=s[u].$();g._insertControl(a,n,c);g._handleConfigurationAfterDragAndDrop.call(this,e,u);return true},getDraggedDroppedItemsFromList:function(e,r,t){var n,i,o,a,s;s=r._tabFilter?r._tabFilter.getId():r.getId();a=t._tabFilter?t._tabFilter.getId():t.getId();if(!e&&!r&&!t){return}e.forEach(function(e){o=e._tabFilter.getId();if(!o){return}if(o===a){n=e}if(o===s){i=e}});return{oDraggedControlFromList:i,oDroppedControlFromList:n}},setDragDropAggregations:function(t,n){var i=t._iconTabHeader?t._iconTabHeader:t;var o=i.getId();t.addDragDropConfig(new e({sourceAggregation:"items",groupName:s+o}));t.addDragDropConfig(new r({targetAggregation:"items",dropPosition:"Between",dropLayout:n,drop:t._handleDragAndDrop.bind(t),groupName:s+o}))}};return g});