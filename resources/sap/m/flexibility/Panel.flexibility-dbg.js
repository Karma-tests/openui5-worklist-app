/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	'sap/ui/fl/changeHandler/BaseRename'
], function (BaseRename) {
	"use strict";

	return {
		"hideControl": "default",
		"moveControls": "default",
		"rename": BaseRename.createRenameChangeHandler({
			propertyName: "headerText",
			translationTextType: "XGRP"
		}),
		"unhideControl": "default"
	};
}, /* bExport= */ true);