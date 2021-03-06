"use strict";

function Settings(){}

//Angles
Settings.RADIANS = 0;
Settings.DEGREES = 1;

//Navigation
Settings.FREE = 10;
Settings.ORBIT = 11;

//Load default settings
Settings.loadDefault = function()
{
	//General
	Settings.general = {};
	Settings.general.theme = "dark";
	Settings.general.filePreviewSize = 70;
	Settings.general.showStats = false;
	Settings.general.showUUID = false;

	//Editor
	Settings.editor = {};
	Settings.editor.angleFormat = Settings.RADIANS;
	Settings.editor.snap = false;
	Settings.editor.snapAngle = 0.1;
	Settings.editor.gridSize = 500;
	Settings.editor.gridSpacing = 5;
	Settings.editor.gridEnabled = true;
	Settings.editor.axisEnabled = true;
	Settings.editor.cameraPreviewEnabled = true;
	Settings.editor.cameraPreviewPercentage = 0.35;
	Settings.editor.lockMouse = true;
	Settings.editor.transformationSpace = "world";
	Settings.editor.navigation = Settings.FREE;
	Settings.editor.invertNavigation = false;

	//Render
	Settings.render = {};
	Settings.render.followProject = false;
	Settings.render.toneMapping = THREE.LinearToneMapping;
	Settings.render.toneMappingExposure = 1.0;
	Settings.render.toneMappingWhitePoint = 1.0;
	Settings.render.antialiasing = true;
	Settings.render.shadows = true;
	Settings.render.shadowsType = THREE.PCFSoftShadowMap;

	//Code
	Settings.code = {};
	Settings.code.theme = "monokai";
	Settings.code.keymap = "sublime";
	Settings.code.fontSize = 14;
	Settings.code.lineNumbers = true;
	Settings.code.lineWrapping = false;
	Settings.code.autoCloseBrackets = true;
	Settings.code.highlightActiveLine = false;
	Settings.code.showMatchesOnScrollbar = true;
};

//Store settings
Settings.store = function()
{
	var data = JSON.stringify(
	{
		general: Settings.general,
		editor: Settings.editor,
		render: Settings.render,
		code: Settings.code
	}, null, "\t");

	data.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1");
	
	//Store file
	if(Nunu.runningOnDesktop())
	{
		FileSystem.writeFile("config", data);
	}
	//Cookie
	else
	{
		Cookies.set("config", data);
	}
};

//Load settings
Settings.load = function()
{
	try
	{
		if(Nunu.runningOnDesktop())
		{
			var data = JSON.parse(FileSystem.readFile("config"));
		}
		else
		{
			var data = JSON.parse(Cookies.get("config"));
		}
		
		Settings.general = data.general;
		Settings.editor = data.editor;
		Settings.render = data.render;
		Settings.code = data.code;
	}
	catch(e)
	{
		Settings.loadDefault();
	}
};