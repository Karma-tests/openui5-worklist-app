/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/DataType","sap/ui/Global","sap/ui/core/library","sap/m/library"],function(e){"use strict";sap.ui.getCore().initLibrary({name:"sap.f",version:"1.61.2",dependencies:["sap.ui.core","sap.m","sap.ui.layout"],designtime:"sap/f/designtime/library.designtime",types:["sap.f.LayoutType","sap.f.DynamicPageTitleArea","sap.f.DynamicPageTitleShrinkRatio"],controls:["sap.f.Avatar","sap.f.Card","sap.f.DynamicPage","sap.f.DynamicPageHeader","sap.f.DynamicPageTitle","sap.f.FlexibleColumnLayout","sap.f.semantic.SemanticPage","sap.f.GridList"],elements:["sap.f.semantic.AddAction","sap.f.semantic.CloseAction","sap.f.semantic.CopyAction","sap.f.semantic.DeleteAction","sap.f.semantic.DiscussInJamAction","sap.f.semantic.EditAction","sap.f.semantic.ExitFullScreenAction","sap.f.semantic.FavoriteAction","sap.f.semantic.FlagAction","sap.f.semantic.FooterMainAction","sap.f.semantic.FullScreenAction","sap.f.semantic.MessagesIndicator","sap.f.semantic.NegativeAction","sap.f.semantic.PositiveAction","sap.f.semantic.PrintAction","sap.f.semantic.SemanticButton","sap.f.semantic.SemanticControl","sap.f.semantic.SemanticToggleButton","sap.f.semantic.SendEmailAction","sap.f.semantic.SendMessageAction","sap.f.semantic.ShareInJamAction","sap.f.semantic.TitleMainAction"],extensions:{flChangeHandlers:{"sap.f.DynamicPageHeader":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.f.DynamicPageTitle":"sap/f/flexibility/DynamicPageTitle","sap.f.semantic.SemanticPage":{moveControls:"default"}},"sap.ui.support":{publicRules:true,internalRules:true}}});var a=sap.f;a.DynamicPageTitleArea={Begin:"Begin",Middle:"Middle"};a.DynamicPageTitleShrinkRatio=e.createType("sap.f.DynamicPageTitleShrinkRatio",{isValid:function(e){return/^(([0-9]\d*)(\.\d)?:([0-9]\d*)(\.\d)?:([0-9]\d*)(\.\d)?)$/.test(e)}},e.getType("string"));a.LayoutType={OneColumn:"OneColumn",TwoColumnsBeginExpanded:"TwoColumnsBeginExpanded",TwoColumnsMidExpanded:"TwoColumnsMidExpanded",MidColumnFullScreen:"MidColumnFullScreen",ThreeColumnsMidExpanded:"ThreeColumnsMidExpanded",ThreeColumnsEndExpanded:"ThreeColumnsEndExpanded",ThreeColumnsMidExpandedEndHidden:"ThreeColumnsMidExpandedEndHidden",ThreeColumnsBeginExpandedEndHidden:"ThreeColumnsBeginExpandedEndHidden",EndColumnFullScreen:"EndColumnFullScreen"};sap.ui.lazyRequire("sap.f.routing.Router");sap.ui.lazyRequire("sap.f.routing.Target");sap.ui.lazyRequire("sap.f.routing.TargetHandler");sap.ui.lazyRequire("sap.f.routing.Targets");a.AvatarShape={Circle:"Circle",Square:"Square"};a.AvatarSize={XS:"XS",S:"S",M:"M",L:"L",XL:"XL",Custom:"Custom"};a.AvatarType={Icon:"Icon",Image:"Image",Initials:"Initials"};a.AvatarImageFitType={Cover:"Cover",Contain:"Contain"};return a});