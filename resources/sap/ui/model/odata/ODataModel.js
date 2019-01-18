/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/BindingMode","sap/ui/model/Context","sap/ui/model/Model","./ODataUtils","./CountMode","./ODataContextBinding","./ODataListBinding","./ODataMetadata","./ODataPropertyBinding","./ODataTreeBinding","sap/ui/model/FilterProcessor","sap/ui/model/odata/ODataMetaModel","sap/ui/thirdparty/URI","sap/ui/thirdparty/datajs","sap/base/util/uid","sap/base/util/merge","sap/base/Log","sap/base/assert","sap/base/security/encodeURL","sap/ui/thirdparty/jquery","sap/base/util/isPlainObject"],function(e,t,a,s,i,r,n,o,h,d,u,c,f,l,p,y,_,g,m,v,b){"use strict";var M=a.extend("sap.ui.model.odata.ODataModel",{constructor:function(t,r,n,h,d,u,c,f){a.apply(this,arguments);var p,y,_,g=null,m,v,b,R,T,C,U=this;if(typeof t==="object"){r=t;t=r.serviceUrl}if(typeof r==="object"){n=r.user;h=r.password;d=r.headers;u=r.tokenHandling;f=r.loadMetadataAsync;c=r.withCredentials;_=r.maxDataServiceVersion;p=r.useBatch;y=r.refreshAfterChange;g=r.annotationURI;m=r.loadAnnotationsJoined;b=r.defaultCountMode;v=r.metadataNamespaces;R=r.serviceUrlParams;T=r.metadataUrlParams;C=r.skipMetadataAnnotationParsing;r=r.json}this.oServiceData={};this.sDefaultBindingMode=e.OneWay;this.mSupportedBindingModes={OneWay:true,OneTime:true,TwoWay:true};this.mUnsupportedFilterOperators={Any:true,All:true};this.bCountSupported=true;this.bJSON=r;this.bCache=true;this.aPendingRequestHandles=[];this.oRequestQueue={};this.aBatchOperations=[];this.oHandler;this.bTokenHandling=u!==false;this.bWithCredentials=c===true;this.bUseBatch=p===true;this.bRefreshAfterChange=y!==false;this.sMaxDataServiceVersion=_;this.bLoadMetadataAsync=!!f;this.bLoadAnnotationsJoined=m===undefined?true:m;this.sAnnotationURI=g;this.sDefaultCountMode=b||i.Both;this.oMetadataLoadEvent=null;this.oMetadataFailedEvent=null;this.bSkipMetadataAnnotationParsing=C;this.oHeaders={};this.setHeaders(d);this.oData={};this.oMetadata=null;this.oAnnotations=null;this.aUrlParams=[];if(t.indexOf("?")==-1){this.sServiceUrl=t}else{var A=t.split("?");this.sServiceUrl=A[0];if(A[1]){this.aUrlParams.push(A[1])}}if(sap.ui.getCore().getConfiguration().getStatistics()){this.aUrlParams.push("sap-statistics=true")}this.sServiceUrl=this.sServiceUrl.replace(/\/$/,"");var q=this._createRequestUrl("$metadata",undefined,T);if(!M.mServiceData[q]){M.mServiceData[q]={}}this.oServiceData=M.mServiceData[q];if(this.bTokenHandling&&this.oServiceData.securityToken){this.oHeaders["x-csrf-token"]=this.oServiceData.securityToken}this.sUser=n;this.sPassword=h;this.oHeaders["Accept-Language"]=sap.ui.getCore().getConfiguration().getLanguageTag();if(!this.oServiceData.oMetadata){this.oServiceData.oMetadata=new o(q,{async:this.bLoadMetadataAsync,user:this.sUser,password:this.sPassword,headers:this.mCustomHeaders,namespaces:v,withCredentials:this.bWithCredentials})}this.oMetadata=this.oServiceData.oMetadata;this.pAnnotationsLoaded=this.oMetadata.loaded();if(this.sAnnotationURI||!this.bSkipMetadataAnnotationParsing){var E=this._getAnnotationParser();if(!this.bSkipMetadataAnnotationParsing){if(!this.bLoadMetadataAsync){this.addAnnotationXML(this.oMetadata.sMetadataBody,!!this.sAnnotationURI)}else{this.pAnnotationsLoaded=this.oMetadata.loaded().then(function(e,t){if(this.bDestroyed){return Promise.reject()}return this.addAnnotationXML(t["metadataString"],e)}.bind(this,!!this.sAnnotationURI))}}if(this.sAnnotationURI){if(this.bLoadMetadataAsync){this.pAnnotationsLoaded=this.pAnnotationsLoaded.then(E.addUrl.bind(E,this.sAnnotationURI))}else{this.pAnnotationsLoaded=Promise.all([this.pAnnotationsLoaded,E.addUrl(this.sAnnotationURI)])}}}if(R){this.aUrlParams=this.aUrlParams.concat(s._createUrlParamsArray(R))}this.onMetadataLoaded=function(e){U._initializeMetadata();U.initialize()};this.onMetadataFailed=function(e){U.fireMetadataFailed(e.getParameters())};if(!this.oMetadata.isLoaded()){this.oMetadata.attachLoaded(this.onMetadataLoaded);this.oMetadata.attachFailed(this.onMetadataFailed)}if(this.oMetadata.isFailed()){this.refreshMetadata()}if(this.oMetadata.isLoaded()){this._initializeMetadata(true)}if(this.bJSON){if(this.sMaxDataServiceVersion==="3.0"){this.oHeaders["Accept"]="application/json;odata=fullmetadata"}else{this.oHeaders["Accept"]="application/json"}this.oHandler=l.jsonHandler}else{this.oHeaders["Accept"]="application/atom+xml,application/atomsvc+xml,application/xml";this.oHandler=l.atomHandler}this.oHeaders["MaxDataServiceVersion"]="2.0";if(this.sMaxDataServiceVersion){this.oHeaders["MaxDataServiceVersion"]=this.sMaxDataServiceVersion}this.oHeaders["DataServiceVersion"]="2.0"},metadata:{publicMethods:["create","remove","update","submitChanges","getServiceMetadata","read","hasPendingChanges","refresh","refreshMetadata","resetChanges","isCountSupported","setCountSupported","setDefaultCountMode","getDefaultCountMode","forceNoCache","setProperty","getSecurityToken","refreshSecurityToken","setHeaders","getHeaders","setUseBatch"]}});M.M_EVENTS={RejectChange:"rejectChange",MetadataLoaded:"metadataLoaded",MetadataFailed:"metadataFailed",AnnotationsLoaded:"annotationsLoaded",AnnotationsFailed:"annotationsFailed"};M.mServiceData={};M.prototype.fireRejectChange=function(e){this.fireEvent("rejectChange",e);return this};M.prototype.attachRejectChange=function(e,t,a){this.attachEvent("rejectChange",e,t,a);return this};M.prototype.detachRejectChange=function(e,t){this.detachEvent("rejectChange",e,t);return this};M.prototype._initializeMetadata=function(e){var t=this;this.bUseBatch=this.bUseBatch||this.oMetadata.getUseBatch();var a=function(e){if(!!e){t.metadataLoadEvent=setTimeout(a.bind(t),0)}else{if(t.oMetadata){t.fireMetadataLoaded({metadata:t.oMetadata});_.debug("ODataModel fired metadataloaded")}}};if(this.sAnnotationURI&&this.bLoadAnnotationsJoined){if(this.oAnnotations&&(this.oAnnotations.bInitialized||this.oAnnotations.isFailed())){a(!this.bLoadMetadataAsync)}else{this.oAnnotations.attachEventOnce("loaded",function(){a(true)})}}else{a(e)}};M.prototype.fireAnnotationsLoaded=function(e){if(!this.bLoadMetadataAsync){setTimeout(this.fireEvent.bind(this,"annotationsLoaded",e),0)}else{this.fireEvent("annotationsLoaded",e)}return this};M.prototype.attachAnnotationsLoaded=function(e,t,a){this.attachEvent("annotationsLoaded",e,t,a);return this};M.prototype.detachAnnotationsLoaded=function(e,t){this.detachEvent("annotationsLoaded",e,t);return this};M.prototype.fireAnnotationsFailed=function(e){if(!this.bLoadMetadataAsync){setTimeout(this.fireEvent.bind(this,"annotationsFailed",e),0)}else{this.fireEvent("annotationsFailed",e)}_.debug("ODataModel fired annotationsfailed");return this};M.prototype.attachAnnotationsFailed=function(e,t,a){this.attachEvent("annotationsFailed",e,t,a);return this};M.prototype.detachAnnotationsFailed=function(e,t){this.detachEvent("annotationsFailed",e,t);return this};M.prototype.fireMetadataLoaded=function(e){this.fireEvent("metadataLoaded",e);return this};M.prototype.attachMetadataLoaded=function(e,t,a){this.attachEvent("metadataLoaded",e,t,a);return this};M.prototype.detachMetadataLoaded=function(e,t){this.detachEvent("metadataLoaded",e,t);return this};M.prototype.fireMetadataFailed=function(e){this.fireEvent("metadataFailed",e);return this};M.prototype.attachMetadataFailed=function(e,t,a){this.attachEvent("metadataFailed",e,t,a);return this};M.prototype.detachMetadataFailed=function(e,t){this.detachEvent("metadataFailed",e,t);return this};M.prototype.refreshMetadata=function(){if(this.oMetadata&&this.oMetadata.refresh){this.oMetadata.refresh()}};M.prototype._createRequestUrl=function(e,t,a,i,r){var n,o,h,d="";if(e&&e.indexOf("?")!=-1){h=e.substr(e.indexOf("?")+1);e=e.substr(0,e.indexOf("?"))}o=this._normalizePath(e,t);if(!i){d=this.sServiceUrl+o}else{d=o.substr(o.indexOf("/")+1)}n=s._createUrlParamsArray(a);if(this.aUrlParams){n=n.concat(this.aUrlParams)}if(h){n.push(h)}if(n.length>0){d+="?"+n.join("&")}if(r===undefined){r=true}if(r===false){var u=v.now();var c=d.replace(/([?&])_=[^&]*/,"$1_="+u);d=c+(c===d?(/\?/.test(d)?"&":"?")+"_="+u:"")}return d};M.prototype._loadData=function(e,t,a,s,i,r,n){var o,h,d=this;function u(e,t){var s=e,i={};if(t.statusCode==204){if(a){a(null)}if(n){n(null)}d.fireRequestCompleted({url:h.requestUri,type:"GET",async:h.async,info:"Accept headers:"+d.oHeaders["Accept"],infoObject:{acceptHeaders:d.oHeaders["Accept"]},success:true});return}if(!s){_.fatal("The following problem occurred: No data was retrieved by service: "+t.requestUri);d.fireRequestCompleted({url:h.requestUri,type:"GET",async:h.async,info:"Accept headers:"+d.oHeaders["Accept"],infoObject:{acceptHeaders:d.oHeaders["Accept"]},success:false});return false}if(d.bUseBatch){var r=d._getBatchErrors(e);if(r.length>0){c(r[0]);return false}if(s.__batchResponses&&s.__batchResponses.length>0){s=s.__batchResponses[0].data}else{_.fatal("The following problem occurred: No data was retrieved by service: "+t.requestUri)}}y=y.concat(s.results);if(s.__next){var o=new f(s.__next);h.requestUri=o.absoluteTo(t.requestUri).toString();p(h)}else{if(s.results){var u,l;for(l in y){u=y[l];if(y===u){continue}s.results[l]=u}}if(s.results&&!Array.isArray(s.results)){s=s.results}d._importData(s,i);if(d.sChangeKey&&i){var g=d.sChangeKey.substr(d.sChangeKey.lastIndexOf("/")+1);if(i[g]){delete d.oRequestQueue[d.sChangeKey];d.sChangeKey=null}}if(a){a(s)}d.checkUpdate(false,false,i);if(n){n(s)}d.fireRequestCompleted({url:h.requestUri,type:"GET",async:h.async,info:"Accept headers:"+d.oHeaders["Accept"],infoObject:{acceptHeaders:d.oHeaders["Accept"]},success:true})}}function c(e){if(d.bTokenHandling&&e.response){var t=d._getHeader("x-csrf-token",e.response.headers);if(!h.bTokenReset&&e.response.statusCode=="403"&&t&&t.toLowerCase()=="required"){d.resetSecurityToken();h.bTokenReset=true;p();return}}var a=d._handleError(e);if(s){s(e,o&&o.bAborted)}d.fireRequestCompleted({url:h.requestUri,type:"GET",async:h.async,info:"Accept headers:"+d.oHeaders["Accept"],infoObject:{acceptHeaders:d.oHeaders["Accept"]},success:false,errorobject:a});if(!o||!o.bAborted){a.url=h.requestUri;d.fireRequestFailed(a)}}function p(){if(d.bUseBatch){d.updateSecurityToken();var t=f.parse(h.requestUri).query;var a=d._createRequestUrl(e,null,t,d.bUseBatch);h=d._createRequest(a,"GET",true);var s=d._createBatchRequest([h],true);o=d._request(s,u,c,l.batchHandler,undefined,d.getServiceMetadata())}else{o=d._request(h,u,c,d.oHandler,undefined,d.getServiceMetadata())}if(r){var i={abort:function(){o.bAborted=true;o.abort()}};r(i)}}var y=[];var g=this._createRequestUrl(e,null,t,null,i||this.bCache);h=this._createRequest(g,"GET",true);this.fireRequestSent({url:h.requestUri,type:"GET",async:h.async,info:"Accept headers:"+this.oHeaders["Accept"],infoObject:{acceptHeaders:this.oHeaders["Accept"]}});p()};M.prototype._importData=function(e,t){var a=this,s,i,r,n;if(e.results){s=[];v.each(e.results,function(e,i){s.push(a._importData(i,t))});return s}else{i=this._getKey(e);n=this.oData[i];if(!n){n=e;this.oData[i]=n}v.each(e,function(e,s){if(s&&(s.__metadata&&s.__metadata.uri||s.results)&&!s.__deferred){r=a._importData(s,t);if(Array.isArray(r)){n[e]={__list:r}}else{n[e]={__ref:r}}}else if(!s||!s.__deferred){n[e]=s}});t[i]=true;return i}};M.prototype._removeReferences=function(e){var t=this,a;if(e.results){a=[];v.each(e.results,function(e,s){a.push(t._removeReferences(s))});return a}else{v.each(e,function(t,a){if(a){if(a["__ref"]||a["__list"]){delete e[t]}}});return e}};M.prototype._restoreReferences=function(e){var t=this,a,s=[];if(e.results){a=[];v.each(e.results,function(e,s){a.push(t._restoreReferences(s))});return a}else{v.each(e,function(a,i){if(i&&i["__ref"]){var r=t._getObject("/"+i["__ref"]);g(r,"ODataModel inconsistent: "+i["__ref"]+" not found!");if(r){delete i["__ref"];e[a]=r;t._restoreReferences(r)}}else if(i&&i["__list"]){v.each(i["__list"],function(e,a){var r=t._getObject("/"+i["__list"][e]);g(r,"ODataModel inconsistent: "+i["__list"][e]+" not found!");if(r){s.push(r);t._restoreReferences(r)}});delete i["__list"];i.results=s;s=[]}});return e}};M.prototype.removeData=function(){this.oData={}};M.prototype.initialize=function(){var e=this.aBindings.slice(0);v.each(e,function(e,t){t.initialize()})};M.prototype.refresh=function(e,t){if(t){this.removeData()}this._refresh(e)};M.prototype._refresh=function(e,t,a){var s=this.aBindings.slice(0);v.each(s,function(s,i){i.refresh(e,t,a)})};M.prototype.checkUpdate=function(e,t,a,s){if(t){if(!this.sUpdateTimer){this.sUpdateTimer=setTimeout(function(){this.checkUpdate(e,false,a)}.bind(this),0)}return}if(this.sUpdateTimer){clearTimeout(this.sUpdateTimer);this.sUpdateTimer=null}var i=this.aBindings.slice(0);v.each(i,function(t,i){if(!s||this.isMetaModelPath(i.getPath())){i.checkUpdate(e,a)}}.bind(this))};M.prototype.bindProperty=function(e,t,a){var s=new h(this,e,t,a);return s};M.prototype.bindList=function(e,t,a,s,i){var r=new n(this,e,t,a,s,i);return r};M.prototype.bindTree=function(e,t,a,s){var i=new d(this,e,t,a,s);return i};M.prototype.createBindingContext=function(e,t,a,s,i){var i=!!i,r=this.resolve(e,t);if(typeof t=="function"){s=t;t=null}if(typeof a=="function"){s=a;a=null}if(!r){if(s){s(null)}return null}var n=this._getObject(e,t),o,h,d=this;if(!i){i=this._isReloadNeeded(r,n,a)}if(!i){o=this._getKey(n);h=this.getContext("/"+o);if(s){s(h)}return h}if(s){var u=!e.startsWith("/");if(r){var c=[],f=this.createCustomParams(a);if(f){c.push(f)}this._loadData(r,c,function(a){o=a?d._getKey(a):undefined;if(o&&t&&u){var i=t.getPath();i=i.substr(1);if(d.oData[i]){d.oData[i][e]={__ref:o}}}h=d.getContext("/"+o);s(h)},function(){s(null)})}else{s(null)}}};M.prototype._isReloadNeeded=function(e,t,a){var s,i=[],r,n=[];if(!e){return false}if(!t){return true}if(a&&a["expand"]){s=a["expand"].replace(/\s/g,"");i=s.split(",")}if(i){for(var o=0;o<i.length;o++){var h=i[o].indexOf("/");if(h!==-1){var d=i[o].slice(0,h);var u=i[o].slice(h+1);i[o]=[d,u]}}}for(var o=0;o<i.length;o++){var c=i[o];if(Array.isArray(c)){var f=t[c[0]];var l=c[1];if(!f||f&&f.__deferred){return true}else{if(f){if(f.__list&&f.__list.length>0){for(var p=0;p<f.__list.length;p++){var y="/"+f.__list[p];var _=this.getObject(y);var g=this._isReloadNeeded(y,_,{expand:l});if(g){return true}}}else if(f.__ref){var y="/"+f.__ref;var _=this.getObject(y);var g=this._isReloadNeeded(y,_,{expand:l});if(g){return true}}}}}else{if(t[c]===undefined||t[c]&&t[c].__deferred){return true}}}if(a&&a["select"]){r=a["select"].replace(/\s/g,"");n=r.split(",")}for(var o=0;o<n.length;o++){if(t[n[o]]===undefined){return true}}if(n.length==0){var m=this.oMetadata._getEntityTypeByPath(e);if(!m){return false}else{for(var o=0;o<m.property.length;o++){if(t[m.property[o].name]===undefined){return true}}}}return false};M.prototype.destroyBindingContext=function(e){};M.prototype.createCustomParams=function(e){var t=[],a,s={expand:true,select:true};for(var i in e){if(i in s){t.push("$"+i+"="+m(e[i]))}if(i=="custom"){a=e[i];for(var i in a){if(i.indexOf("$")==0){_.warning("Trying to set OData parameter "+i+" as custom query option!")}else{t.push(i+"="+m(a[i]))}}}}return t.join("&")};M.prototype.bindContext=function(e,t,a){var s=new r(this,e,t,a);return s};M.prototype.setCountSupported=function(e){this.bCountSupported=e};M.prototype.isCountSupported=function(){return this.bCountSupported};M.prototype.setDefaultCountMode=function(e){this.sDefaultCountMode=e};M.prototype.getDefaultCountMode=function(){return this.sDefaultCountMode};M.prototype._getKey=function(e,a){var s,i;if(e instanceof t){s=e.getPath().substr(1)}else if(e&&e.__metadata&&e.__metadata.uri){i=e.__metadata.uri;s=i.substr(i.lastIndexOf("/")+1)}if(a){s=decodeURIComponent(s)}return s};M.prototype.getKey=function(e,t){return this._getKey(e,t)};M.prototype.createKey=function(e,t,a){var i=this.oMetadata._getEntityTypeByPath(e),r=e,n=this,o,h,d;g(i,'Could not find entity type of collection "'+e+'" in service metadata!');r+="(";if(i.key.propertyRef.length==1){o=i.key.propertyRef[0].name;g(o in t,'Key property "'+o+'" is missing in object!');d=this.oMetadata._getPropertyMetadata(i,o);h=s.formatValue(t[o],d.type);r+=a?h:encodeURIComponent(h)}else{v.each(i.key.propertyRef,function(e,u){if(e>0){r+=","}o=u.name;g(o in t,'Key property "'+o+'" is missing in object!');d=n.oMetadata._getPropertyMetadata(i,o);h=s.formatValue(t[o],d.type);r+=o;r+="=";r+=a?h:encodeURIComponent(h)})}r+=")";return r};M.prototype.getProperty=function(e,t,a){var s=this._getObject(e,t);if(a==null||a==undefined){return s}if(!b(s)){return s}s=y({},s);if(a==true){return this._restoreReferences(s)}else{return this._removeReferences(s)}};M.prototype._getObject=function(e,t){var a=this.isLegacySyntax()?this.oData:null,s=this.resolve(e,t),i,r,n,o,h,d;if(this.oMetadata&&s&&s.indexOf("/#")>-1){if(this.isMetaModelPath(s)){i=s.indexOf("/##");d=this.getMetaModel();if(!this.bMetaModelLoaded){return null}r=s.substr(0,i);n=s.substr(i+3);o=d.getMetaContext(r);a=d.getProperty(n,o)}else{a=this.oMetadata._getAnnotation(s)}}else{if(t){h=t.getPath();h=h.substr(1);a=this.oData[h]}if(!e){return a}var u=e.split("/"),c=0;if(!u[0]){a=this.oData;c++}while(a&&u[c]){a=a[u[c]];if(a){if(a.__ref){a=this.oData[a.__ref]}else if(a.__list){a=a.__list}else if(a.__deferred){a=undefined}}c++}}return a};M.prototype.updateSecurityToken=function(){if(this.bTokenHandling){if(!this.oServiceData.securityToken){this.refreshSecurityToken()}if(this.bTokenHandling){this.oHeaders["x-csrf-token"]=this.oServiceData.securityToken}}};M.prototype.resetSecurityToken=function(){delete this.oServiceData.securityToken;delete this.oHeaders["x-csrf-token"]};M.prototype.getSecurityToken=function(){var e=this.oServiceData.securityToken;if(!e){this.refreshSecurityToken();e=this.oServiceData.securityToken}return e};M.prototype.refreshSecurityToken=function(e,t,a){var s=this,i,r;a=a===true;i=this._createRequestUrl("/");var n=this._createRequest(i,"GET",a);n.headers["x-csrf-token"]="Fetch";function o(t,a){if(a){r=s._getHeader("x-csrf-token",a.headers);if(r){s.oServiceData.securityToken=r;s.oHeaders["x-csrf-token"]=r}else{s.resetSecurityToken();s.bTokenHandling=false}}if(e){e(t,a)}}function h(e){s.resetSecurityToken();s.bTokenHandling=false;s._handleError(e);if(t){t(e)}}return this._request(n,o,h,undefined,undefined,this.getServiceMetadata())};M.prototype._submitRequest=function(e,t,a,s,i,r){var n=this,o,h={};function d(s,d){if(t&&i){var c=n._getBatchErrors(s);if(c.length>0){u(c[0]);return false}if(s.__batchResponses&&s.__batchResponses.length>0){o=s.__batchResponses[0].data;if(!o&&s.__batchResponses[0].__changeResponses){o=s.__batchResponses[0].__changeResponses[0].data}}s=o}if(r){if(s&&s.__batchResponses){v.each(s.__batchResponses,function(e,t){if(t&&t.data){n._importData(t.data,h)}})}}n._handleETag(e,d,t);n._updateRequestQueue(e,t);if(n._isRefreshNeeded(e,d)){n._refresh(false,e.keys,e.entityTypes)}if(a){a(s,d)}}function u(t){if(n.bTokenHandling&&t.response){var a=n._getHeader("x-csrf-token",t.response.headers);if(!e.bTokenReset&&t.response.statusCode=="403"&&a&&a.toLowerCase()=="required"){n.resetSecurityToken();e.bTokenReset=true;c();return}}n._handleError(t);if(s){s(t)}}function c(){if(n.bTokenHandling&&e.method!=="GET"){n.updateSecurityToken();if(n.bTokenHandling){e.headers["x-csrf-token"]=n.oServiceData.securityToken}}if(t){return n._request(e,d,u,l.batchHandler,undefined,n.getServiceMetadata())}else{return n._request(e,d,u,n.oHandler,undefined,n.getServiceMetadata())}}return c()};M.prototype._createBatchRequest=function(e,t){var a,s,i={},r={},n={},o={};r.__batchRequests=e;a=this.sServiceUrl+"/$batch";if(this.aUrlParams.length>0){a+="?"+this.aUrlParams.join("&")}v.extend(i,this.mCustomHeaders,this.oHeaders);delete i["Content-Type"];s={headers:i,requestUri:a,method:"POST",data:r,user:this.sUser,password:this.sPassword,async:t};if(t){s.withCredentials=this.bWithCredentials}v.each(e,function(e,t){if(t["__changeRequests"]){v.each(t["__changeRequests"],function(e,t){if(t.keys&&t.method!="POST"){v.each(t.keys,function(e,t){n[e]=t})}else if(t.entityTypes&&t.method=="POST"){v.each(t.entityTypes,function(e,t){o[e]=t})}})}});s.keys=n;s.entityTypes=o;return s};M.prototype._handleETag=function(e,t,a){var s,i,r,n,o,h;if(a){o=e.data.__batchRequests;h=t.data.__batchResponses;if(h&&o){for(var d=0;d<o.length;d++){r=o[d].__changeRequests;if(h[d]){n=h[d].__changeResponses;if(r&&n){for(var u=0;u<r.length;u++){if(r[u].method=="MERGE"||r[u].method=="PUT"){s=r[u].requestUri.replace(this.sServiceUrl+"/","");if(!s.startsWith("/")){s="/"+s}i=this._getObject(s);if(i&&i.__metadata&&n[u].headers&&n[u].headers.ETag){i.__metadata.etag=n[u].headers.ETag}}}}}else{_.warning("could not update ETags for batch request: corresponding response for request missing")}}}else{_.warning("could not update ETags for batch request: no batch responses/requests available")}}else{s=e.requestUri.replace(this.sServiceUrl+"/","");if(!s.startsWith("/")){s="/"+s}i=this._getObject(s);if(i&&i.__metadata&&t.headers.ETag){i.__metadata.etag=t.headers.ETag}}};M.prototype._handleBatchErrors=function(e,t){this._getBatchErrors(t);this._handleETag()};M.prototype._getBatchErrors=function(e){var t=[],a;v.each(e.__batchResponses,function(e,s){if(s.message){a="The following problem occurred: "+s.message;if(s.response){a+=s.response.statusCode+","+s.response.statusText+","+s.response.body}t.push(s);_.fatal(a)}if(s.__changeResponses){v.each(s.__changeResponses,function(e,s){if(s.message){a="The following problem occurred: "+s.message;if(s.response){a+=s.response.statusCode+","+s.response.statusText+","+s.response.body}t.push(s);_.fatal(a)}})}});return t};M.prototype._handleError=function(e){var t={},a;var s="The following problem occurred: "+e.message;t.message=e.message;if(e.response){if(this.bTokenHandling){a=this._getHeader("x-csrf-token",e.response.headers);if(e.response.statusCode=="403"&&a&&a.toLowerCase()=="required"){this.resetSecurityToken()}}s+=e.response.statusCode+","+e.response.statusText+","+e.response.body;t.statusCode=e.response.statusCode;t.statusText=e.response.statusText;t.responseText=e.response.body}_.fatal(s);return t};M.prototype.getData=function(e,t,a){return this.getProperty(e,t,a)};M.prototype._getETag=function(e,t,a){var s,i,r;if(a){s=a}else{if(t&&t.__metadata){s=t.__metadata.etag}else if(e){i=e.replace(this.sServiceUrl+"/","");r=i.indexOf("?");if(r>-1){i=i.substr(0,r)}if(this.oData.hasOwnProperty(i)){s=this.getProperty("/"+i+"/__metadata/etag")}}}return s};M.prototype._createRequest=function(e,t,a,s,i){var r={},n;v.extend(r,this.mCustomHeaders,this.oHeaders);n=this._getETag(e,s,i);if(n&&t!="GET"){r["If-Match"]=n}if(this.bJSON&&t!="DELETE"&&this.sMaxDataServiceVersion==="2.0"){r["Content-Type"]="application/json"}if(t=="MERGE"&&!this.bUseBatch){r["x-http-method"]="MERGE";t="POST"}var o={headers:r,requestUri:e,method:t,user:this.sUser,password:this.sPassword,async:a};if(s){o.data=s}if(a){o.withCredentials=this.bWithCredentials}return o};M.prototype._isRefreshNeeded=function(e,t){var a=false,s,i=[],r=this;if(!this.bRefreshAfterChange){return a}if(e.data&&Array.isArray(e.data.__batchRequests)){if(t){i=r._getBatchErrors(t.data);v.each(i,function(e,t){if(t.response&&t.response.statusCode=="412"){s=t.response.statusCode;return false}});if(!!s){return false}}v.each(e.data.__batchRequests,function(e,t){if(Array.isArray(t.__changeRequests)){v.each(t.__changeRequests,function(e,t){a=a||r._isRefreshNeeded(t);return!a})}return!a})}else{if(e.method==="GET"){return false}else{if(t&&t.statusCode=="412"){a=false}else{a=true}}}return a};M.prototype.update=function(e,a,s){var i,r,n,o,h,d,u,c,f,l,p,y,_=false;if(s instanceof t||arguments.length>3){d=s;i=arguments[3];r=arguments[4];n=arguments[5]}else{d=s.context||s.oContext;i=s.success||s.fnSuccess;r=s.error||s.fnError;u=s.eTag||s.sETag;n=typeof s.merge=="undefined"?s.bMerge===true:s.merge===true;_=typeof s.async=="undefined"?s.bAsync===true:s.async===true;y=s.urlParameters}h=this._createRequestUrl(e,d,y,this.bUseBatch);if(n){o=this._createRequest(h,"MERGE",_,a,u)}else{o=this._createRequest(h,"PUT",_,a,u)}e=this._normalizePath(e,d);l=this._getObject(e);o.keys={};if(l){p=this._getKey(l);o.keys[p]=true}if(this.bUseBatch){f=this._createBatchRequest([{__changeRequests:[o]}],_);c=this._submitRequest(f,this.bUseBatch,i,r,true)}else{c=this._submitRequest(o,this.bUseBatch,i,r)}return c};M.prototype.create=function(e,a,s){var i,r,n,o,h,d,u,c,f=false,l;if(s&&typeof s=="object"&&!(s instanceof t)){d=s.context;u=s.success;l=s.urlParameters;c=s.error;f=s.async===true}else{d=s;u=arguments[3];c=arguments[4]}n=this._createRequestUrl(e,d,l,this.bUseBatch);i=this._createRequest(n,"POST",f,a);e=this._normalizePath(e,d);h=this.oMetadata._getEntityTypeByPath(e);i.entityTypes={};if(h){i.entityTypes[h.entityType]=true}if(this.bUseBatch){r=this._createBatchRequest([{__changeRequests:[i]}],f);o=this._submitRequest(r,this.bUseBatch,u,c,true)}else{o=this._submitRequest(i,this.bUseBatch,u,c)}return o};M.prototype.remove=function(e,a){var s,i,r,n,o,h,d,u,c,f,l,p,y,_,g=false,m=this;if(a instanceof t||arguments[2]){s=a;n=arguments[2];o=arguments[3]}else if(a){s=a.context||a.oContext;n=a.success||a.fnSuccess;o=a.error||a.fnError;u=a.eTag||a.sETag;f=a.payload||a.oPayload;g=typeof a.async=="undefined"?a.bAsync===true:a.async===true;_=a.urlParameters}l=function(e,t){i=d.substr(d.lastIndexOf("/")+1);if(i.indexOf("?")!=-1){i=i.substr(0,i.indexOf("?"))}delete m.oData[i];delete m.mContexts["/"+i];if(n){n(e,t)}};d=this._createRequestUrl(e,s,_,this.bUseBatch);h=this._createRequest(d,"DELETE",g,f,u);e=this._normalizePath(e,s);r=this._getObject(e);h.keys={};if(r){c=this._getKey(r);h.keys[c]=true}if(this.bUseBatch){p=this._createBatchRequest([{__changeRequests:[h]}],g);y=this._submitRequest(p,this.bUseBatch,l,o,true)}else{y=this._submitRequest(h,this.bUseBatch,l,o)}return y};M.prototype.callFunction=function(e,t){var a,i,r,n,o,h,d,u,c,l,p="GET",y={},m=this;if(t&&typeof t=="object"){p=t.method?t.method:p;h=t.urlParameters;d=t.context;u=t.success;c=t.error;l=t.async===true}else{p=t;h=arguments[2];d=arguments[3];u=arguments[4];c=arguments[5];l=arguments[6]===true}o=this.oMetadata._getFunctionImportMetadata(e,p);g(o,"Function "+e+" not found in the metadata !");if(o){r=this._createRequestUrl(e,d,null,this.bUseBatch);var b=f(r);if(o.parameter!=null){v.each(h,function(t,a){var i=o.parameter.filter(function(e){return e.name==t&&e.mode=="In"});if(i.length>0){var r=i[0];y[t]=s.formatValue(a,r.type)}else{_.warning("Parameter "+t+" is not defined for function call "+e+"!")}})}if(p==="GET"){return m.read(e,d,y,true,u,c)}else{v.each(y,function(e,t){b.addQuery(e,t)});a=this._createRequest(b.toString(),p,l);if(this.bUseBatch){i=this._createBatchRequest([{__changeRequests:[a]}],l);n=this._submitRequest(i,this.bUseBatch,u,c,true)}else{n=this._submitRequest(a,this.bUseBatch,u,c)}return n}}};M.prototype.read=function(e,a){var i,r,n,o,h,d,c,f,l,p,y,g,m,v,b,M,R;if(a&&typeof a=="object"&&!(a instanceof t)){h=a.context;d=a.urlParameters;c=a.async!==false;f=a.success;l=a.error;p=a.filters;y=a.sorters}else{h=a;d=arguments[2];c=arguments[3]!==false;f=arguments[4];l=arguments[5]}c=c!==false;R=s._createUrlParamsArray(d);m=s.createSortParams(y);if(m){R.push(m)}if(p&&!this.oMetadata){_.fatal("Tried to use filters in read method before metadata is available.")}else{M=this._normalizePath(e,h);b=this.oMetadata&&this.oMetadata._getEntityTypeByPath(M);v=u.groupFilters(p);g=s.createFilterParams(v,this.oMetadata,b);if(g){R.push(g)}}r=this._createRequestUrl(e,h,R,this.bUseBatch);i=this._createRequest(r,"GET",c);if(this.bUseBatch){o=this._createBatchRequest([i],c);n=this._submitRequest(o,this.bUseBatch,f,l,true)}else{n=this._submitRequest(i,this.bUseBatch,f,l)}return n};M.prototype.createBatchOperation=function(e,t,a,s){var i={},r,n,o,h;v.extend(i,this.mCustomHeaders,this.oHeaders);if(e.startsWith("/")){e=e.substr(1)}if(s){r=s.sETag}if(t!="GET"){r=this._getETag(e,a,r);if(r){i["If-Match"]=r}}if(this.bJSON){if(t!="DELETE"&&t!="GET"&&this.sMaxDataServiceVersion==="2.0"){i["Content-Type"]="application/json"}}else{i["Content-Type"]="application/atom+xml"}var d={requestUri:e,method:t.toUpperCase(),headers:i};if(a){d.data=a}if(t!="GET"&&t!="POST"){if(e&&e.indexOf("/")!=0){e="/"+e}n=this._getObject(e);if(n){o=this._getKey(n);d.keys={};d.keys[o]=true}}else if(t=="POST"){var u=e;if(e.indexOf("?")!=-1){u=e.substr(0,e.indexOf("?"))}h=this.oMetadata._getEntityTypeByPath(u);if(h){d.entityTypes={};d.entityTypes[h.entityType]=true}}return d};M.prototype.addBatchReadOperations=function(e){if(!Array.isArray(e)||e.length<=0){_.warning("No array with batch operations provided!");return false}var t=this;v.each(e,function(e,a){if(a.method!="GET"){_.warning("Batch operation should be a GET operation!");return false}t.aBatchOperations.push(a)})};M.prototype.addBatchChangeOperations=function(e){if(!Array.isArray(e)||e.length<=0){return false}v.each(e,function(e,t){if(t.method!="POST"&&t.method!="PUT"&&t.method!="MERGE"&&t.method!="DELETE"){_.warning("Batch operation should be a POST/PUT/MERGE/DELETE operation!");return false}});this.aBatchOperations.push({__changeRequests:e})};M.prototype.clearBatch=function(){this.aBatchOperations=[]};M.prototype.submitBatch=function(e,t,a,s){var i,r,n=this;function o(t,a){if(e){e(t,a,n._getBatchErrors(t))}}if(!(typeof e=="function")){var h=a;var d=t;a=e;e=d;t=h}a=a!==false;if(this.aBatchOperations.length<=0){_.warning("No batch operations in batch. No request will be triggered!");return false}i=this._createBatchRequest(this.aBatchOperations,a);r=this._submitRequest(i,true,o,t,false,s);this.clearBatch();return r};M.prototype.getServiceMetadata=function(){if(this.oMetadata&&this.oMetadata.isLoaded()){return this.oMetadata.getServiceMetadata()}};M.prototype.getServiceAnnotations=function(){if(this.oAnnotations&&this.oAnnotations.getAnnotationsData){return this.oAnnotations.getAnnotationsData()}};M.prototype.submitChanges=function(e,t,a){var s,i,r=this,n,o,h,d,u,c;if(this.sChangeKey){n=this.sChangeKey.replace(this.sServiceUrl,"");u=this._getObject(n);i=u;if(b(u)){i=y({},u);if(i.__metadata){h=i.__metadata.type;d=i.__metadata.etag;delete i.__metadata;if(h||d){i.__metadata={}}if(h){i.__metadata.type=h}if(!!d){i.__metadata.etag=d}}v.each(i,function(e,t){if(t&&t.__deferred){delete i[e]}});var f=this.oMetadata._getEntityTypeByPath(n);if(f){var l=this.oMetadata._getNavigationPropertyNames(f);v.each(l,function(e,t){delete i[t]})}i=this._removeReferences(i)}if(a&&a.sETag){o=a.sETag}s=this._createRequest(this.sChangeKey,"MERGE",true,i,o);if(this.sUrlParams){s.requestUri+="?"+this.sUrlParams}s.keys={};if(u){c=this._getKey(u);s.keys[c]=true}this.oRequestQueue[this.sChangeKey]=s}if(v.isEmptyObject(this.oRequestQueue)){return undefined}if(this.bUseBatch){var p=[];v.each(this.oRequestQueue,function(e,t){delete t._oRef;var a=y({},t);t._oRef=a;a.requestUri=a.requestUri.replace(r.sServiceUrl+"/","");a.data._bCreate?delete a.data._bCreate:false;p.push(a)});s=this._createBatchRequest([{__changeRequests:p}],true);this._submitRequest(s,this.bUseBatch,e,t,true)}else{v.each(this.oRequestQueue,function(a,s){delete s._oRef;var i=y({},s);s._oRef=i;if(i.data&&i.data._bCreate){delete i.data._bCreate}r._submitRequest(i,this.bUseBatch,e,t,true)})}return undefined};M.prototype._updateRequestQueue=function(e,t){var a,s,i,r=this;if(t){a=e.data.__batchRequests;if(a){for(var n=0;n<a.length;n++){s=a[n].__changeRequests;if(s){for(var o=0;o<s.length;o++){i=s[o];v.each(this.oRequestQueue,function(e,t){if(t._oRef===i&&e!==r.sChangeKey){delete r.oRequestQueue[e];delete r.oData[e];delete r.mContexts["/"+e]}else if(r.sChangeKey&&e===r.sChangeKey){delete r.oRequestQueue[e];r.sChangeKey=null}})}}}}}else{v.each(this.oRequestQueue,function(t,a){if(a._oRef===e&&t!==r.sChangeKey){delete r.oRequestQueue[t];delete r.oData[t];delete r.mContexts["/"+t]}else if(r.sChangeKey&&t===r.sChangeKey){delete r.oRequestQueue[t];r.sChangeKey=null}})}};M.prototype.resetChanges=function(e,t){var a;if(this.sChangeKey){a=this.sChangeKey.replace(this.sServiceUrl,"");this._loadData(a,null,e,t)}};M.prototype.setProperty=function(e,t,a,s){var i,r={},n={},o=this._createRequestUrl(e,a),h=e.substring(0,e.lastIndexOf("/")),d,u,c={},f=false;if(!this.resolve(e,a)){return false}o=o.replace(this.sServiceUrl+"/","");o=o.substring(0,o.indexOf("/"));o=this.sServiceUrl+"/"+o;i=e.substr(e.lastIndexOf("/")+1);n=this._getObject(h,a);if(!n){return false}u=h.split("/");for(var l=u.length-1;l>=0;l--){r=this._getObject(u.join("/"),a);if(r){d=this._getKey(r);if(d){break}}u.splice(l-1,1)}if(!d){d=this._getKey(a)}if(d){c[d]=true}if(n._bCreate){n[i]=t;f=true;this.checkUpdate(false,s,c)}else{if(!this.sChangeKey){this.sChangeKey=o}if(this.sChangeKey==o){n[i]=t;f=true;this.checkUpdate(false,s,c)}else{this.fireRejectChange({rejectedValue:t,oldValue:n[i]})}}return f};M.prototype._isHeaderPrivate=function(e){switch(e.toLowerCase()){case"accept":case"accept-language":case"maxdataserviceversion":case"dataserviceversion":return true;case"x-csrf-token":return this.bTokenHandling;default:return false}};M.prototype.setHeaders=function(e){var t={},a=this;if(e){v.each(e,function(e,s){if(a._isHeaderPrivate(e)){_.warning("Not allowed to modify private header: "+e)}else{t[e]=s}});this.mCustomHeaders=t}else{this.mCustomHeaders={}}if(this.oAnnotations){this.oAnnotations.setHeaders(this.mCustomHeaders)}};M.prototype.getHeaders=function(){return v.extend({},this.mCustomHeaders,this.oHeaders)};M.prototype._getHeader=function(e,t){var a;for(a in t){if(a.toLowerCase()===e.toLowerCase()){return t[a]}}return null};M.prototype.hasPendingChanges=function(){return this.sChangeKey!=null};M.prototype.updateBindings=function(e){this.checkUpdate(e)};M.prototype.forceNoCache=function(e){this.bCache=!e};M.prototype.setTokenHandlingEnabled=function(e){this.bTokenHandling=e};M.prototype.setUseBatch=function(e){this.bUseBatch=e};M.prototype.formatValue=function(e,t){return s.formatValue(e,t)};M.prototype.deleteCreatedEntry=function(e){if(e){var t=e.getPath();delete this.mContexts[t];if(t.startsWith("/")){t=t.substr(1)}delete this.oRequestQueue[t];delete this.oData[t]}};M.prototype.createEntry=function(e,t){var a={},s,i,r;if(!e.startsWith("/")){e="/"+e}var n=this.oMetadata._getEntityTypeByPath(e);if(!n){g(n,"No Metadata for collection "+e+" found");return undefined}if(typeof t==="object"&&!Array.isArray(t)){a=t}else{for(var o=0;o<n.property.length;o++){var h=n.property[o];var d=t&&t.indexOf(h.name)>-1;if(!t||d){a[h.name]=this._createPropertyValue(h.type);if(d){t.splice(t.indexOf(h.name),1)}}}if(t){g(t.length===0,"No metadata for the following properties found: "+t.join(","))}}a._bCreate=true;s=e.substring(1)+"('"+p()+"')";this.oData[s]=a;a.__metadata={type:""+n.entityType};i=this._createRequestUrl(e);r=this._createRequest(i,"POST",true,a);r.entityTypes={};r.entityTypes[n.entityType]=true;this.oRequestQueue[s]=r;return this.getContext("/"+s)};M.prototype._createPropertyValue=function(e){var t=this.oMetadata._splitName(e);var a=t.namespace;var s=t.name;if(a.toUpperCase()!=="EDM"){var i={};var r=this.oMetadata._getObjectMetadata("complexType",s,a);g(r,"Complex type "+e+" not found in the metadata !");for(var n=0;n<r.property.length;n++){var o=r.property[n];i[o.name]=this._createPropertyValue(o.type)}return i}else{return this._getDefaultPropertyValue(s,a)}};M.prototype._getDefaultPropertyValue=function(e,t){return undefined};M.prototype._normalizePath=function(e,t){if(e&&e.indexOf("?")!=-1){e=e.substr(0,e.indexOf("?"))}if(!t&&!e.startsWith("/")){e="/"+e;_.warning(this+" path "+e+" should be absolute if no Context is set")}return this.resolve(e,t)};M.prototype.setRefreshAfterChange=function(e){this.bRefreshAfterChange=e};M.prototype.isList=function(e,t){var e=this.resolve(e,t);return e&&e.substr(e.lastIndexOf("/")).indexOf("(")===-1};M.prototype.isMetaModelPath=function(e){return e.indexOf("##")==0||e.indexOf("/##")>-1};M.prototype._request=function(e,t,a,s,i,r){if(this.bDestroyed){return{abort:function(){}}}var n=this;function o(e){return function(){if(n.aPendingRequestHandles){var t=n.aPendingRequestHandles.indexOf(h);if(t>-1){n.aPendingRequestHandles.splice(t,1)}}if(!(h&&h.bSuppressErrorHandlerCall)){e.apply(this,arguments)}}}var h=l.request(e,o(t||l.defaultSuccess),o(a||l.defaultError),s,i,r);if(e.async!==false){this.aPendingRequestHandles.push(h)}return h};M.prototype.destroy=function(){this.bDestroyed=true;if(this.aPendingRequestHandles){for(var e=this.aPendingRequestHandles.length-1;e>=0;e--){var t=this.aPendingRequestHandles[e];if(t&&t.abort){t.bSuppressErrorHandlerCall=true;t.abort()}}delete this.aPendingRequestHandles}if(!!this.oMetadataLoadEvent){clearTimeout(this.oMetadataLoadEvent)}if(!!this.oMetadataFailedEvent){clearTimeout(this.oMetadataFailedEvent)}if(this.oMetadata){this.oMetadata.detachLoaded(this.onMetadataLoaded);this.oMetadata.detachFailed(this.onMetadataFailed);if(!this.oMetadata.isLoaded()&&!this.oMetadata.hasListeners("loaded")){this.oMetadata.destroy();delete this.oServiceData.oMetadata}delete this.oMetadata}if(this.oAnnotations){this.oAnnotations.detachFailed(this.onAnnotationsFailed);this.oAnnotations.detachLoaded(this.onAnnotationsLoaded);this.oAnnotations.destroy();delete this.oAnnotations}a.prototype.destroy.apply(this,arguments)};M.prototype._getAnnotationParser=function(e){if(!this.oAnnotations){var t=sap.ui.requireSync("sap/ui/model/odata/ODataAnnotations");this.oAnnotations=new t({annotationData:e,url:null,metadata:this.oMetadata,async:this.bLoadMetadataAsync,headers:this.mCustomHeaders});this.oAnnotations.attachFailed(this.onAnnotationsFailed,this);this.oAnnotations.attachLoaded(this.onAnnotationsLoaded,this)}return this.oAnnotations};M.prototype.onAnnotationsFailed=function(e){this.fireAnnotationsFailed(e.getParameters())};M.prototype.onAnnotationsLoaded=function(e){this.fireAnnotationsLoaded(e.getParameters())};M.prototype.addAnnotationUrl=function(e){var t=[].concat(e),a=[],s=[],i=[],r=this;v.each(t,function(e,t){var i=t.indexOf("$metadata");if(i>=0){if(i==0){t=r.sServiceUrl+"/"+t}a.push(t)}else{s.push(t)}});return this.oMetadata._addUrl(a).then(function(e){return Promise.all(v.map(e,function(e){i=i.concat(e.entitySets);return r.addAnnotationXML(e["metadataString"])}))}).then(function(){return r._getAnnotationParser().addUrl(s)}).then(function(e){return{annotations:e.annotations,entitySets:i}})};M.prototype.addAnnotationXML=function(e,t){return new Promise(function(a,s){this._getAnnotationParser().setXML(null,e,{success:a,error:s,fireEvents:!t})}.bind(this))};M.prototype.getMetaModel=function(){var e=this;if(!this.oMetaModel){this.oMetaModel=new c(this.oMetadata,this.oAnnotations,{addAnnotationUrl:this.addAnnotationUrl.bind(this),annotationsLoadedPromise:this.oMetadata.isLoaded()&&(!this.oAnnotations||this.oAnnotations.isLoaded())?null:this.pAnnotationsLoaded});this.oMetaModel.loaded().then(function(){e.bMetaModelLoaded=true;e.checkUpdate(false,false,null,true)})}return this.oMetaModel};return M});