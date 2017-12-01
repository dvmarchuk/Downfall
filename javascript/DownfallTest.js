// Get the canvas element from our HTML above
var canvas = document.getElementById("renderCanvas");
var overlay = document.getElementById("overlayCanvas");

// Load the BABYLON 3D engine
//var engine = new BABYLON.Engine(canvas, true);
var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
//var camera;
// This begins the creation of a function that we will 'call' just after it's
// built
var createScene = function() {
	// Now create a basic Babylon Scene object
	var scene = new BABYLON.Scene(engine);

	// Change the scene background color to green.
	//scene.clearColor = new BABYLON.Color3(0, 1, 0);

	// This creates and positions a free camera
	camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5,
			-10), scene);

	// This targets the camera to scene origin
	camera.setTarget(BABYLON.Vector3.Zero());

	// This attaches the camera to the canvas
	camera.attachControl(canvas, false);

	// This creates a light, aiming 0,1,0 - to the sky.
	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0,
			1, 0), scene);

	// Dim the light a small amount
	light.intensity = .5;

	// Let's try our built-in 'ground' shape. Params: name, width, depth,
	// subdivisions, scene
	var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

	// Start skybox code from tutorial 2
	var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
	skybox.infiniteDistance = true;
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.disableLighting = true;
	skybox.material = skyboxMaterial;
	
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../textures/skybox/basic_skybox/skybox", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	
	skybox.renderingGroupId = 0;
	
	var spriteManagerMonster = new BABYLON.SpriteManager("monsterManagr","../images/monster.png", 1, 60, scene);
	var monster = new BABYLON.Sprite("monster", spriteManagerMonster);
	monster.position.y = 1;
	monster.position.z = -2;
	monster.size = 2.25;
	monster.playAnimation(0, 2, true, 350);
	
	spriteManagerBoss = new BABYLON.SpriteManager("bossManagr","../images/boss.png", 1, 148, scene);
	boss = new BABYLON.Sprite("boss", spriteManagerBoss);
	boss.position.y = 1;
	boss.position.z = -5;
	boss.size = 2.75;
	boss.playAnimation(0, 2, true, 400);
	
	var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

	var text1 = new BABYLON.GUI.TextBlock();
    text1.text = "Hello world";
    text1.color = "white";    
    text1.height = "40px";
    text1.fontSize = 24;
    text1.zIndex = 1;
    text1.verticalAlignment	= BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    advancedTexture.addControl(text1);    

    var image = new BABYLON.GUI.Image("but", "../images/hud.png");
    image.width = 1;
    var size = window.screen.availWidth / 624;
    size = size * 75;
    image.height = size + "px";
    //image.height = "40px";
    image.verticalAlignment	= BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    advancedTexture.addControl(image);   
	
	/*var image = new BABYLON.GUI.Image("but", "images/hud.png");
    image.width = 1;
    var size = window.screen.availWidth / 624;
    size = size * 75;
    image.height = size + "px";
    image.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    advancedTexture.addControl(image);  
    
    var timeTitle = new BABYLON.GUI.TextBlock();
    timeTitle.text = "TIME";
    timeTitle.color = "red";
    timeTitle.zIndex = 1;
    timeTitle.fontSize = 24;
    timeTitle.horozontalAlignment = BABYLON.GUI.Control.HOROZONTAL_ALIGNMENT_RIGHT;
    advancedTexture.addControl(timeTitle);*/ 
	
	/*var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "CSCI 305 - Animation and 3D Programming");
	button1.width = "300px"
	button1.height = "60px";
	button1.color = "white";
	button1.cornerRadius = 20;
	button1.background = "green";
	button1.onPointerUpObservable.add(function() {
	    window.location = "http://spector5.xyz/CSCI305.html";
	});
	button1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	button1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
	advancedTexture.addControl(button1); */
	  
	// Leave this function
	return scene;
}; // End of createScene function

// Now, call the createScene function that you just finished creating
var scene = createScene();

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function() {
	boss.position.y -= 0.003;
	scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function() {
	engine.resize();
});