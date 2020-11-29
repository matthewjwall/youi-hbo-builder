/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
* Copyright 2014 Adobe Inc.
* All Rights Reserved.
*
* NOTICE: Adobe permits you to use, modify, and distribute this file in
* accordance with the terms of the Adobe license agreement accompanying
* it. If you have received this file from a source other than Adobe,
* then your use, modification, or distribution of it requires the prior
* written permission of Adobe. 
**************************************************************************/
// Script to generate projects of high complexity.
function GenerateCompName(location) {
    if(location instanceof Project) {
            return "CompGen " + app.project.items.length;
    }
    if(location instanceof CompItem) {
            return "LayerGen " +location.numLayers;        
     }
}
function NestInComp(comp, thing){
    return comp.layers.add(thing);
    
   // return comp;
}

function BoundedRandom( minValue, maxValue )
{
    return minValue + Math.round(((maxValue - minValue) * Math.random()));
}

function MakeLayer(junkFolder, ioComp, minLayers, maxLayers, minDepth, maxDepth)
{
    var layerType = BoundedRandom(0,1);
    var newLayer = null;
    if(maxDepth > minDepth) {
       if(layerType == 0) {
           var width = BoundedRandom(10, ioComp.width);
           var height = BoundedRandom(10, ioComp.height);
           var newLayer = ioComp.layers.addSolid([Math.random(), Math.random(), Math.random()], "Solid",  width, height, 1.0 );
        } else if( layerType == 1) {
            var newComp = MakeComp(junkFolder);
            newLayer = NestInComp(ioComp, newComp);
            var newMaxDepth = BoundedRandom(minDepth, maxDepth - 1);
            FillOutComp( junkFolder,  newComp, minLayers, maxLayers, minDepth, newMaxDepth)
        }
    
            newLayer.transform.position.expression = "transform.position.wiggle(" + BoundedRandom(1,7) +"," + BoundedRandom(2,200) + ", 1);";
            newLayer.transform.opacity.setValue(50);
            newLayer.transform.opacity.expression = "transform.opacity.wiggle(4, 50);";    
    }
}

function FillOutComp(junkFolder, ioComp, minLayers, maxLayers, minDepth, maxDepth)
{
    // a comp can have from min to maxLayer. Use random to choose how many
    var numLayersToGen = BoundedRandom(minLayers, maxLayers);
    for( var i = 0; i < numLayersToGen; i++) {
       MakeLayer(junkFolder, ioComp, minLayers, maxLayers, minDepth, maxDepth );
    }
    return ioComp;
}

function MakeComp(junkFolder)
{
   return junkFolder.items.addComp(GenerateCompName(app.project), 1000, 500, 1.0, 30, 30 );
}



function Generate()
{
    var junkFolder = app.project.items.addFolder("Junk " + app.project.items.length);
    var debugComp =  app.project.items.addComp("Debug Comp " + app.project.items.length, 1000, 500, 1.0, 30, 30 );
    FillOutComp(junkFolder, debugComp,  
                                                        1 ,  // minLayers
                                                        100, // maxLayers
                                                        3,   //minDepth
                                                        5); // maxDepth
                                                        
}


if ( ! $._ext )
{
  $._ext = {};
}

$._ext.generateComplexComp = function()
{
		alert("Creating dummy project, app version=" + app.version);
		Generate();
		alert("done");
};

$._ext.sendText = function()
{
    var currentComp = app.project.activeItem;

    if (currentComp){
        var layerCount = currentComp.numLayers;
        if (layerCount > 0){
            var allText = new Array();
            for (var i = 1; i <= layerCount; ++i){
                var currentLayer = currentComp.layers[i];
                if (currentLayer instanceof TextLayer){
                    allText[i-1] = currentLayer.text.sourceText.value;
                }
            }
            alert( allText);
        } else {
            alert("No text layers in " + currentComp.name + ".");
        }
    } else {
        alert("No active Comp.");
    }
}

// Created using compCode v1.2.1
// 202001004 from composition "Btn-Push" in project "~/Downloads/ComponentLibrary-2019.aep"
// compCode_202001004_144808();
// aescripts.com/compCode

$._ext.makeButton = function(primaryColor) {

    app.beginUndoGroup("Btn-Push");
    
    try {
    
    // CREATE FOLDER HIERARCHY START
        var solids_folder_properties = {"name":"Solids","label":2,"comment":"","itemIsFolderItem":{"type":"function","arguments":["item"],"body":"return item instanceof FolderItem;"}};
        var solids_folder = findProjectItem(app.project.rootFolder, false, solids_folder_properties);
        if (solids_folder === null) {
            solids_folder = app.project.items.addFolder(solids_folder_properties.name);
            solids_folder.label = solids_folder_properties.label;
        }
    // CREATE FOLDER HIERARCHY END
    
    // CREATE COMPOSITIONS START
        var btnpush_comp_properties = {"name":"Btn-Push","label":15,"comment":"componentSubtype:push; componentType:button; class:CYIPushButtonView;","height":120,"width":400,"pixelAspect":1,"bgColor":[0,0,0],"duration":30,"numLayers":7,"frameRate":60,"itemIsCompItem":{"type":"function","arguments":["item"],"body":"return item instanceof CompItem;"}};
        var btnpush_comp = app.project.items.addComp(btnpush_comp_properties.name, btnpush_comp_properties.width, btnpush_comp_properties.height, btnpush_comp_properties.pixelAspect, btnpush_comp_properties.duration, btnpush_comp_properties.frameRate);
            btnpush_comp.time = 5.06666666666667;
            btnpush_comp.bgColor = btnpush_comp_properties.bgColor;
            btnpush_comp.comment = btnpush_comp_properties.comment;
            btnpush_comp.shutterPhase = -90;
            btnpush_comp.resolutionFactor = [1, 1];
            if (btnpush_comp.markerProperty !== undefined) {
                var btnpush_comp_marker1 = new MarkerValue("FocusIn");
                    btnpush_comp_marker1.duration = 0.08333333333333;
                    btnpush_comp_marker1.label = 0;
                    btnpush_comp_marker1.protectedRegion = false;
                    btnpush_comp.markerProperty.setValueAtTime(1, btnpush_comp_marker1);
                var btnpush_comp_marker2 = new MarkerValue("Press");
                    btnpush_comp_marker2.duration = 0.08333333333333;
                    btnpush_comp_marker2.label = 0;
                    btnpush_comp_marker2.protectedRegion = false;
                    btnpush_comp.markerProperty.setValueAtTime(2, btnpush_comp_marker2);
            }
    // CREATE COMPOSITIONS END
    
    // CREATE SOLID LAYERS START
        var whiteSolid14_solid_properties = {"name":"White Solid 14","comment":"","label":1,"pixelAspect":1,"height":120,"width":4,"mainSource":{"color":[1,1,1]},"itemIsFootageItem":{"type":"function","arguments":["item"],"body":"return item instanceof FootageItem;"}};
        var whiteSolid14_solid = findProjectItem(solids_folder, false, whiteSolid14_solid_properties);
        if (whiteSolid14_solid === null) {
            var whiteSolid14_tempSolid = btnpush_comp.layers.addSolid(whiteSolid14_solid_properties.mainSource.color, whiteSolid14_solid_properties.name, whiteSolid14_solid_properties.width, whiteSolid14_solid_properties.height, whiteSolid14_solid_properties.pixelAspect);
                whiteSolid14_solid = whiteSolid14_tempSolid.source;
                whiteSolid14_solid.label = whiteSolid14_solid_properties.label;
                whiteSolid14_solid.parentFolder = solids_folder;
            whiteSolid14_tempSolid.remove();
        }
        var whiteSolid13_solid_properties = {"name":"White Solid 13","comment":"","label":1,"pixelAspect":1,"height":4,"width":400,"mainSource":{"color":[1,1,1]},"itemIsFootageItem":{"type":"function","arguments":["item"],"body":"return item instanceof FootageItem;"}};
        var whiteSolid13_solid = findProjectItem(solids_folder, false, whiteSolid13_solid_properties);
        if (whiteSolid13_solid === null) {
            var whiteSolid13_tempSolid = btnpush_comp.layers.addSolid(whiteSolid13_solid_properties.mainSource.color, whiteSolid13_solid_properties.name, whiteSolid13_solid_properties.width, whiteSolid13_solid_properties.height, whiteSolid13_solid_properties.pixelAspect);
                whiteSolid13_solid = whiteSolid13_tempSolid.source;
                whiteSolid13_solid.label = whiteSolid13_solid_properties.label;
                whiteSolid13_solid.parentFolder = solids_folder;
            whiteSolid13_tempSolid.remove();
        }
        var pressoverlay_solid_properties = {"name":"PressOverlay","comment":"","label":1,"pixelAspect":1,"height":120,"width":400,"mainSource":{"color":[0,0,0]},"itemIsFootageItem":{"type":"function","arguments":["item"],"body":"return item instanceof FootageItem;"}};
        var pressoverlay_solid = findProjectItem(solids_folder, false, pressoverlay_solid_properties);
        if (pressoverlay_solid === null) {
            var pressoverlay_tempSolid = btnpush_comp.layers.addSolid(pressoverlay_solid_properties.mainSource.color, pressoverlay_solid_properties.name, pressoverlay_solid_properties.width, pressoverlay_solid_properties.height, pressoverlay_solid_properties.pixelAspect);
                pressoverlay_solid = pressoverlay_tempSolid.source;
                pressoverlay_solid.label = pressoverlay_solid_properties.label;
                pressoverlay_solid.parentFolder = solids_folder;
            pressoverlay_tempSolid.remove();
        }
        var PRIMARY_COLOR = primaryColor;
        var magentaredSolid1_solid_properties = {"name":"Magenta-Red Solid 1","comment":"","label":1,"pixelAspect":1,"height":120,"width":400,"mainSource":{"color":PRIMARY_COLOR},"itemIsFootageItem":{"type":"function","arguments":["item"],"body":"return item instanceof FootageItem;"}};
        var magentaredSolid1_solid = findProjectItem(solids_folder, false, magentaredSolid1_solid_properties);
        if (magentaredSolid1_solid === null) {
            var magentaredSolid1_tempSolid = btnpush_comp.layers.addSolid(magentaredSolid1_solid_properties.mainSource.color, magentaredSolid1_solid_properties.name, magentaredSolid1_solid_properties.width, magentaredSolid1_solid_properties.height, magentaredSolid1_solid_properties.pixelAspect);
                magentaredSolid1_solid = magentaredSolid1_tempSolid.source;
                magentaredSolid1_solid.label = magentaredSolid1_solid_properties.label;
                magentaredSolid1_solid.parentFolder = solids_folder;
            magentaredSolid1_tempSolid.remove();
        }
    // CREATE SOLID LAYERS END
    
    // Working with comp "Btn-Push", varName "btnpush_comp";
        btnpush_comp.openInViewer();
        // Add existing Solid Layer "White Solid 14", varName "whiteSolid14_solid";
        var borderleft = btnpush_comp.layers.add(whiteSolid14_solid);
            borderleft.name = "Border-Left";
            borderleft.moveToEnd();
            borderleft.property("ADBE Transform Group").property("ADBE Position").setValue([2,60,0]);
            borderleft.selected = false;
        // Add existing Solid Layer "White Solid 14", varName "whiteSolid14_solid";
        var borderright = btnpush_comp.layers.add(whiteSolid14_solid);
            borderright.name = "Border-Right";
            borderright.moveToEnd();
            borderright.property("ADBE Transform Group").property("ADBE Position").setValue([398,60,0]);
            borderright.selected = false;
        // Add existing Solid Layer "White Solid 13", varName "whiteSolid13_solid";
        var borderbottom = btnpush_comp.layers.add(whiteSolid13_solid);
            borderbottom.name = "Border-Bottom";
            borderbottom.moveToEnd();
            borderbottom.property("ADBE Transform Group").property("ADBE Position").setValue([200,118,0]);
            borderbottom.selected = false;
        // Add existing Solid Layer "White Solid 13", varName "whiteSolid13_solid";
        var bordertop = btnpush_comp.layers.add(whiteSolid13_solid);
            bordertop.name = "Border-Top";
            bordertop.moveToEnd();
            bordertop.property("ADBE Transform Group").property("ADBE Position").setValue([200,2,0]);
            bordertop.selected = false;
        var text = btnpush_comp.layers.addBoxText([384,76], "Button");
            text.name = "Text";
            text.moveToEnd();
            var text_TextProp = text.property("ADBE Text Properties").property("ADBE Text Document");
            var text_TextDocument = text_TextProp.value;
                text_TextDocument.font = "ArialMT";
                text_TextDocument.fontSize = 48;
                text_TextDocument.applyFill = true;
                text_TextDocument.fillColor = [0.94510000944138,0.94510000944138,0.94510000944138];
                text_TextDocument.applyStroke = false;
                text_TextDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
                text_TextDocument.tracking = 0;
                if (parseFloat(app.version) >= 13.2 ) {
                    text_TextDocument.verticalScale = 1;
                    text_TextDocument.horizontalScale = 1;
                    text_TextDocument.baselineShift = 0;
                    text_TextDocument.tsume = 0;
                    // These values are read-only. You have to set them manually in the comp.
                    // text_TextDocument.fauxBold = false;
                    // text_TextDocument.fauxItalic = false;
                    // text_TextDocument.allCaps = false;
                    // text_TextDocument.smallCaps = false;
                    // text_TextDocument.superscript = false;
                    // text_TextDocument.subscript = false;
                }
                if (parseFloat(app.version) >= 13.6 ) {
                    text_TextDocument.leading = 180;
                    text_TextDocument.autoLeading = false;
                }
                text_TextProp.setValue(text_TextDocument);
            text.property("ADBE Transform Group").property("ADBE Position").setValue([208,81,0]);
            text.selected = false;
        // Add existing Solid Layer "PressOverlay", varName "pressoverlay_solid";
        var pressoverlay = btnpush_comp.layers.add(pressoverlay_solid);
            pressoverlay.moveToEnd();
            var pressoverlayOpacity = pressoverlay.property("ADBE Transform Group").property("ADBE Opacity");
                var pressoverlayOpacity_keyTimesArray = [2,2.08333333333333];
                var pressoverlayOpacity_valuesArray = [0,40];
                pressoverlayOpacity.setValuesAtTimes(pressoverlayOpacity_keyTimesArray, pressoverlayOpacity_valuesArray);
                var pressoverlayOpacity_easeInSpeedArray = [0,0];
                var pressoverlayOpacity_easeInInfluArray = [33.333333,33.333333];
                var pressoverlayOpacity_easeOutSpeedArray = [0,0];
                var pressoverlayOpacity_easeOutInfluArray = [33.333333,33.333333];
                var pressoverlayOpacity_keyInInterpolationType = [KeyframeInterpolationType.BEZIER,KeyframeInterpolationType.BEZIER];
                var pressoverlayOpacity_keyOutInterpolationType = [KeyframeInterpolationType.BEZIER,KeyframeInterpolationType.BEZIER];
                applyEasing(pressoverlayOpacity, pressoverlayOpacity_keyTimesArray, [pressoverlayOpacity_easeInSpeedArray, pressoverlayOpacity_easeInInfluArray], [pressoverlayOpacity_easeOutSpeedArray, pressoverlayOpacity_easeOutInfluArray], [pressoverlayOpacity_keyInInterpolationType, pressoverlayOpacity_keyOutInterpolationType]);
    
            pressoverlay.selected = false;
        // Add existing Solid Layer "Magenta-Red Solid 1", varName "magentaredSolid1_solid";
        var focusbg = btnpush_comp.layers.add(magentaredSolid1_solid);
            focusbg.name = "FocusBG";
            focusbg.moveToEnd();
            var focusbgOpacity = focusbg.property("ADBE Transform Group").property("ADBE Opacity");
                var focusbgOpacity_keyTimesArray = [1,1.08333333333333];
                var focusbgOpacity_valuesArray = [0,100];
                focusbgOpacity.setValuesAtTimes(focusbgOpacity_keyTimesArray, focusbgOpacity_valuesArray);
                var focusbgOpacity_easeInSpeedArray = [0,0];
                var focusbgOpacity_easeInInfluArray = [33.333333,33.333333];
                var focusbgOpacity_easeOutSpeedArray = [0,0];
                var focusbgOpacity_easeOutInfluArray = [33.333333,33.333333];
                var focusbgOpacity_keyInInterpolationType = [KeyframeInterpolationType.BEZIER,KeyframeInterpolationType.BEZIER];
                var focusbgOpacity_keyOutInterpolationType = [KeyframeInterpolationType.BEZIER,KeyframeInterpolationType.BEZIER];
                applyEasing(focusbgOpacity, focusbgOpacity_keyTimesArray, [focusbgOpacity_easeInSpeedArray, focusbgOpacity_easeInInfluArray], [focusbgOpacity_easeOutSpeedArray, focusbgOpacity_easeOutInfluArray], [focusbgOpacity_keyInInterpolationType, focusbgOpacity_keyOutInterpolationType]);
    
            focusbg.selected = false;
    
    // Remove empty Solids folder
        var tempNullComp = app.project.items.addComp("tempNullComp", 100, 100, 1, 1, 24);
        var tempNullLayer = tempNullComp.layers.addNull();
        var nullFolder = tempNullLayer.source.parentFolder;
            tempNullLayer.source.remove();
            tempNullComp.remove();
        if (nullFolder.numItems === 0)
            nullFolder.remove();
    btnpush_comp.openInViewer();
    
    return {
        compItem : btnpush_comp
    };
    
    } catch (e) {
        alert (e.toString() + "\nScript File: " + File.decode(e.fileName).replace(/^.*[\|\/]/, '') + 
            "\nFunction: " + arguments.callee.name + 
            "\nError on Line: " + e.line.toString());
    }
    app.endUndoGroup();
    
    
    function findProjectItem(searchFolder, recursion, userData) {
        var folderItem;
        for (var i = 1, il = searchFolder.items.length; i <= il; i++) {
            folderItem = searchFolder.items[i];
            if (propertiesMatch(folderItem, userData)) {
                return folderItem;
            } else if (recursion === true && folderItem instanceof FolderItem && folderItem.numItems > 0) {
                var item = findProjectItem(folderItem, recursion, userData);
                if (item !== null) return item;
            }
        }
        return null;
    }
    
    function propertiesMatch(projectItem, userData) {
        if (typeof userData === 'undefined') return true;
    
        for (var propertyName in userData) {
            if (!userData.hasOwnProperty(propertyName)) continue;
    
            if (isFunctionObject(userData[propertyName])) {
                var functionConstructor = new Function(
                    userData[propertyName].arguments,
                    userData[propertyName].body);
                if (!functionConstructor(projectItem)) {
                    return false;
                }
            } else {
                if (typeof userData[propertyName] !== typeof projectItem[propertyName]) {
                    return false;
                }
    
                if (isArray(userData[propertyName]) && isArray(projectItem[propertyName])) {
                    if (userData[propertyName].toString() !== projectItem[propertyName].toString()) {
                        return false;
                    }
                } else if (isObject(userData[propertyName]) && isObject(projectItem[propertyName])) {
                    if (!propertiesMatch(projectItem[propertyName], userData[propertyName])) {
                        return false;
                    }
                } else if (projectItem[propertyName] !== userData[propertyName]) {
                    return false;
                }
            }
        }
        return true;
    
        function isFunctionObject(object) {
            // Object needs to be of Object type;
            if (!isObject(object)) return false;
    
            // Object needs to have a 'type' property equal to string 'function';
            if (!object.hasOwnProperty('type') || !isString(object.type) || object.type !== 'function') {
                return false;
            }
    
            // Object needs to have an 'arguments' property of Array type;
            if (!object.hasOwnProperty('arguments') || !isArray(object.arguments)) {
                return false;
            }
    
            // Object needs to have a 'body' property of String type;
            if (!object.hasOwnProperty('body') || !isString(object.body)) {
                return false;
            }
    
            return true;
        }
    }
    
    function isArray(object) {
        return Object.prototype.toString.apply(object) === '[object Array]';
    }
    
    function isObject(object) {
        return typeof object === 'object';
    }
    
    function isString(value) {
        return typeof value === 'string' || value instanceof String;
    }
    
    function applyEasing(property, keyTimesArray, easeInArray, easeOutArray, keyInterpolationArray) {
        var easeIn, easeOut, easeIn0, easeOut0, easeIn1, easeOut1, easeIn2, easeOut2;
        for (var i = 0, il = keyTimesArray.length; i < il; i ++) {
            if (property.propertyValueType === PropertyValueType.TwoD) {
                easeIn0 = new KeyframeEase(easeInArray[0][i][0], easeInArray[1][i][0]);
                easeOut0 = new KeyframeEase(easeOutArray[0][i][0], easeOutArray[1][i][0]);
                easeIn1 = new KeyframeEase(easeInArray[0][i][1], easeInArray[1][i][1]);
                easeOut1 = new KeyframeEase(easeOutArray[0][i][1], easeOutArray[1][i][1]);
                property.setTemporalEaseAtKey(i+1, [easeIn0, easeIn1], [easeOut0, easeOut1]);
            } else if (property.propertyValueType === PropertyValueType.ThreeD) {
                easeIn0 = new KeyframeEase(easeInArray[0][i][0], easeInArray[1][i][0]);
                easeOut0 = new KeyframeEase(easeOutArray[0][i][0], easeOutArray[1][i][0]);
                easeIn1 = new KeyframeEase(easeInArray[0][i][1], easeInArray[1][i][1]);
                easeOut1 = new KeyframeEase(easeOutArray[0][i][1], easeOutArray[1][i][1]);
                easeIn2 = new KeyframeEase(easeInArray[0][i][2], easeInArray[1][i][2]);
                easeOut2 = new KeyframeEase(easeOutArray[0][i][2], easeOutArray[1][i][2]);
                property.setTemporalEaseAtKey(i+1, [easeIn0, easeIn1, easeIn2], [easeOut0, easeOut1, easeOut2]);
            } else {
                easeIn = new KeyframeEase(easeInArray[0][i], easeInArray[1][i]);
                easeOut = new KeyframeEase(easeOutArray[0][i], easeOutArray[1][i]);
                if (keyInterpolationArray[1][i] !== KeyframeInterpolationType.HOLD) {
                    property.setTemporalEaseAtKey(i+1, [easeIn], [easeOut]);
                } else {
                    property.setTemporalEaseAtKey(i+1, [easeIn]);
                }
            }
            property.setInterpolationTypeAtKey(i+1, keyInterpolationArray[0][i], keyInterpolationArray[1][i]);
        }
    }
    
};
    
    
