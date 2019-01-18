/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

//Provides an abstraction for list bindings
sap.ui.define([
	'sap/ui/model/Context',
	'sap/ui/model/ContextBinding',
	'sap/ui/model/ChangeReason',
	"sap/ui/thirdparty/jquery"
],
		function(Context, ContextBinding, ChangeReason, jQuery) {
	"use strict";


	/**
	 * Constructor for odata.ODataContextBinding
	 *
	 * @class
	 * The ContextBinding is a specific binding for a setting context for the model
	 *
	 * @param {sap.ui.model.Model} oModel
	 * @param {string} sPath
	 * @param {sap.ui.model.Context} oContext
	 * @param {map} [mParameters] A map which contains additional parameters for the binding.
	 * @param {string} [mParameters.expand] For the OData <code>$expand</code> query option parameter which should be included in the request
	 * @param {string} [mParameters.select] For the OData <code>$select</code> query option parameter which should be included in the request
	 * @param {map} [mParameters.custom] An optional map of custom query parameters. Custom parameters must not start with <code>$</code>.
	 * @param {boolean} [mParameters.createPreliminaryContext] Whether a preliminary Context will be created
	 * @param {boolean} [mParameters.usePreliminaryContext] Whether a preliminary Context will be used
	 * @abstract
	 * @public
	 * @alias sap.ui.model.odata.v2.ODataContextBinding
	 * @extends sap.ui.model.ContextBinding
	 */
	var ODataContextBinding = ContextBinding.extend("sap.ui.model.odata.v2.ODataContextBinding", /** @lends sap.ui.model.odata.v2.ODataContextBinding.prototype */ {

		constructor : function(oModel, sPath, oContext, mParameters, oEvents){
			ContextBinding.call(this, oModel, sPath, oContext, mParameters, oEvents);
			this.bRefreshGroupId = undefined;
			this.bPendingRequest = false;
			this.mParameters = jQuery.extend(true, {}, this.mParameters);
			this.bCreatePreliminaryContext = this.mParameters.createPreliminaryContext || oModel.bPreliminaryContext;
			this.bUsePreliminaryContext = this.mParameters.usePreliminaryContext || oModel.bPreliminaryContext;
			this.mParameters.createPreliminaryContext = this.bCreatePreliminaryContext;
			this.mParameters.usePreliminaryContext = this.bUsePreliminaryContext;
			this.bPendingRequest = false;
		}
	});

	/**
	 * Initializes the binding, will create the binding context.
	 * If metadata is not yet available, do nothing, method will be called again when
	 * metadata is loaded.
	 * @see sap.ui.model.Binding.prototype.initialize
	 */
	ODataContextBinding.prototype.initialize = function() {
		var that = this,
			sResolvedPath,
			bCreatedRelative = this.isRelative() && this.oContext && this.oContext.bCreated,
			bPreliminary = this.oContext && this.oContext.isPreliminary(),
			bReloadNeeded;

		// don't fire any requests if metadata is not loaded yet.
		if (!this.oModel.oMetadata.isLoaded() || !this.bInitial) {
			return;
		}

		this.bInitial = false;

		// If context is preliminary and usePreliminary is not set, exit here
		if (bPreliminary && !this.bUsePreliminaryContext) {
			return;
		}

		// if path cannot be resolved or parent context is created, set element context to null
		sResolvedPath = this.oModel.resolve(this.sPath, this.oContext);
		if (!sResolvedPath || bCreatedRelative) {
			this.oElementContext = null;
			this._fireChange({ reason: ChangeReason.Context });
			return;
		}

		// check whether a request is necessary and create binding context
		bReloadNeeded = this.oModel._isReloadNeeded(sResolvedPath, this.mParameters);
		if (bReloadNeeded) {
			this.fireDataRequested();
			this.bPendingRequest = true;
		}
		var oContext = this.oModel.createBindingContext(this.sPath, this.oContext, this.mParameters, function(oContext) {
			var oData;

			if (that.bCreatePreliminaryContext && oContext && that.oElementContext && that.oElementContext.isPreliminary()) {
				that.oElementContext.setPreliminary(false);
				that.oModel._updateContext(that.oElementContext, oContext.getPath());
				that._fireChange({ reason: ChangeReason.Context }, false, true);
			} else if (!oContext || oContext !== that.oElementContext) {
				that.oElementContext = oContext;
				that._fireChange({ reason: ChangeReason.Context });
			}

			if (bReloadNeeded) {
				if (that.oElementContext) {
					oData = that.oElementContext.getObject(that.mParameters);
				}
				//register datareceived call as  callAfterUpdate
				that.oModel.callAfterUpdate(function() {
					that.fireDataReceived({data: oData});
				});
				that.bPendingRequest = false;
			}
		}, bReloadNeeded);
		if (oContext && this.bCreatePreliminaryContext) {
			if (this.oElementContext !== oContext) {
				oContext.setPreliminary(true);
				this.oElementContext = oContext;
				this.oModel.oMetadata.loaded().then(function() {
					this._fireChange({ reason: ChangeReason.Context });
				}.bind(this));
			}
		}
	};

	/**
	 * @see sap.ui.model.ContextBinding.prototype.checkUpdate
	 *
	 * @param {boolean} bForceUpdate
	 */
	ODataContextBinding.prototype.checkUpdate = function(bForceUpdate) {
		var oContext,
			bPreliminary = this.oContext && this.oContext.isPreliminary();

		// If binding is initial or a request is pending, nothing to do here
		if (this.bInitial || this.bPendingRequest) {
			return;
		}

		// If context is preliminary and usePreliminary is not set, exit here
		if (bPreliminary && !this.bUsePreliminaryContext) {
			return;
		}

		// clone parameters and remove preliminaryContext flags as the preliminary context should never be created during #checkUpdate
		// it should only be created during #initialize and #refresh
		if (!this._mParameters && this.mParameters.createPreliminaryContext){
			this._mParameters =  jQuery.extend({}, this.mParameters);
			delete this._mParameters.usePreliminaryContext;
			delete this._mParameters.createPreliminaryContext;
		}

		oContext = this.oModel.createBindingContext(this.sPath, this.oContext, this._mParameters);
		if (oContext && oContext !== this.oElementContext) {
			this.oElementContext = oContext;
			this._fireChange({ reason: ChangeReason.Context });
		}
	};

	/**
	 * @see sap.ui.model.ContextBinding.prototype.refresh
	 *
	 * @param {boolean} [bForceUpdate] Update the bound control even if no data has been changed
	 * @param {string} [sGroupId] The group Id for the refresh
	 *
	 * @public
	 */
	ODataContextBinding.prototype.refresh = function(bForceUpdate, sGroupId) {
		if (typeof bForceUpdate === "string") {
			sGroupId = bForceUpdate;
			bForceUpdate = false;
		}
		this.sRefreshGroup = sGroupId;
		this._refresh(bForceUpdate);
		this.sRefreshGroup = undefined;
	};

	/**
	 * @see sap.ui.model.ContextBinding.prototype.refresh
	 *
	 * @param {boolean} [bForceUpdate] Update the bound control even if no data has been changed
	 * @param {map} [mChangedEntities] Map of changed entities
	 * @private
	 */
	ODataContextBinding.prototype._refresh = function(bForceUpdate, mChangedEntities) {
		var that = this, oData, sKey, oStoredEntry, bChangeDetected = false,
			mParameters = this.mParameters,
			bCreatedRelative = this.isRelative() && this.oContext && this.oContext.bCreated,
			sResolvedPath = this.oModel.resolve(this.sPath, this.oContext),
			sContextPath;

		if (this.bInitial || bCreatedRelative) {
			return;
		}

		if (mChangedEntities) {
			//get entry from model. If entry exists get key for update bindings
			oStoredEntry = this.oModel._getObject(this.sPath, this.oContext);
			if (oStoredEntry) {
				sKey = this.oModel._getKey(oStoredEntry);
				if (sKey in mChangedEntities) {
					bChangeDetected = true;
				}
			}
		} else { // default
			bChangeDetected = true;
		}
		if (bForceUpdate || bChangeDetected) {
			//recreate Context: force update
			if (sResolvedPath) {
				this.fireDataRequested();
				this.bPendingRequest = true;
			}
			if (this.sRefreshGroup) {
				mParameters = jQuery.extend({},this.mParameters);
				mParameters.groupId = this.sRefreshGroup;
			}
			var oContext = this.oModel.createBindingContext(this.sPath, this.oContext, mParameters, function(oContext) {
				if (that.bCreatePreliminaryContext && oContext && that.oElementContext && that.oElementContext.isPreliminary()) {
					that.oElementContext.setPreliminary(false);
					that.oModel._updateContext(that.oElementContext, oContext.getPath());
					that._fireChange({ reason: ChangeReason.Context }, false, true);
				} else if (that.oElementContext !== oContext || bForceUpdate) {
					that.oElementContext = oContext;
					that._fireChange({ reason: ChangeReason.Context }, bForceUpdate);
				}
				if (that.oElementContext) {
					oData = that.oElementContext.getObject(that.mParameters);
				}
				//register datareceived call as  callAfterUpdate
				if (sResolvedPath) {
					that.oModel.callAfterUpdate(function() {
						that.fireDataReceived({data: oData});
					});
					that.bPendingRequest = false;
				}
			}, true);
			if (oContext && this.bCreatePreliminaryContext) {
				if (this.oElementContext !== oContext || bForceUpdate) {
					oContext.setPreliminary(true);
					this.oElementContext = oContext;
					sContextPath = this.oElementContext.sPath;
					this.oModel._updateContext(this.oElementContext, sResolvedPath);
					this._fireChange({ reason: ChangeReason.Context }, bForceUpdate);
					this.oModel._updateContext(this.oElementContext, sContextPath);
				}
			}
		}
	};

	/**
	 * @see sap.ui.model.ContextBinding.prototype.setContext
	 *
	 * @param {sap.ui.model.Context} oContext The binding context object
	 * @private
	 */
	ODataContextBinding.prototype.setContext = function(oContext) {
		var that = this,
			oData,
			sResolvedPath,
			oData,
			bCreated = oContext && oContext.bCreated,
			bPreliminary = oContext && oContext.isPreliminary(),
			bForceUpdate = oContext && oContext.isRefreshForced(),
			bUpdated = oContext && oContext.isUpdated(),
			sContextPath, bReloadNeeded;

		// If binding is initial or not a relative binding, nothing to do here
		if (this.bInitial || !this.isRelative()) {
			return;
		}

		// If context is preliminary and usePreliminary is not set, exit here
		if (bPreliminary && !this.bUsePreliminaryContext) {
			return;
		}

		if (bUpdated && this.bUsePreliminaryContext) {
			this._fireChange({ reason: ChangeReason.Context });
			return;
		}

		if (Context.hasChanged(this.oContext, oContext)) {


			this.oContext = oContext;

			sResolvedPath = this.oModel.resolve(this.sPath, this.oContext);

			// If path doesn't resolve or parent context is created, reset current context
			if (!sResolvedPath || bCreated) {
				if (this.oElementContext !== null) {
					this.oElementContext = null;
					this._fireChange({ reason: ChangeReason.Context });
				}
				return;
			}

			// Create new binding context and fire change
			oData = this.oModel._getObject(this.sPath, this.oContext);
			bReloadNeeded =  bForceUpdate || this.oModel._isReloadNeeded(sResolvedPath, this.mParameters);

			if (sResolvedPath && bReloadNeeded) {
				this.fireDataRequested();
				this.bPendingRequest = true;
			}
			var oContext = this.oModel.createBindingContext(this.sPath, this.oContext, this.mParameters, function(oContext) {
				if (that.bCreatePreliminaryContext && oContext && that.oElementContext && that.oElementContext.isPreliminary()) {
					that.oElementContext.setPreliminary(false);
					that.oModel._updateContext(that.oElementContext, oContext.getPath());
					that._fireChange({ reason: ChangeReason.Context }, false, true);
				} else if (that.oElementContext !== oContext || bForceUpdate) {
					that.oElementContext = oContext;
					that._fireChange({ reason: ChangeReason.Context }, bForceUpdate);
				}
				if (sResolvedPath && bReloadNeeded) {
					if (that.oElementContext) {
						oData = that.oElementContext.getObject(that.mParameters);
					}
					//register datareceived call as  callAfterUpdate
					that.oModel.callAfterUpdate(function() {
						that.fireDataReceived({data: oData});
					});
					that.bPendingRequest = false;
				}
			}, bReloadNeeded);
			if (oContext && this.bCreatePreliminaryContext) {
				oContext.setPreliminary(true);
				this.oElementContext = oContext;
				sContextPath = this.oElementContext.sPath;
				this.oModel._updateContext(this.oElementContext, sResolvedPath);
				this._fireChange({ reason: ChangeReason.Context }, bForceUpdate);
				this.oModel._updateContext(this.oElementContext, sContextPath);
			}
		}
	};

	ODataContextBinding.prototype._fireChange = function(mParameters, bForceUpdate, bUpdated) {
		if (this.oElementContext) {
			this.oElementContext.setForceRefresh(bForceUpdate);
			this.oElementContext.setUpdated(bUpdated);
		}
		ContextBinding.prototype._fireChange.call(this, mParameters);
		if (this.oElementContext) {
			this.oElementContext.setForceRefresh(false);
			this.oElementContext.setUpdated(false);
		}
	};

	return ODataContextBinding;

});