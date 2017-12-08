// Get the canvas element from our HTML above
var canvas = document.getElementById("renderCanvas");

// Load the BABYLON 3D engine
//var engine = new BABYLON.Engine(canvas, true);
var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
//var camera;
// This begins the creation of a function that we will 'call' just after it's
// built
var createScene = function() {
	// Now create a basic Babylon Scene object
	var scene = new BABYLON.Scene(engine);
	var physicsPlugin = new BABYLON.CannonJSPlugin();
	scene.actionManager = new BABYLON.ActionManager(scene);
	
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

	//Where we make a mesh to mimic the sprite - I put a cube and made it invisible.
	//I tried using a plane but then the sprite moves and the plane stays facing one way.
    var box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
    box.position.y = monster.position.y;
    box.position.x = monster.position.x;
    box.position.z = -10;
        box.visibility = true;









	spriteManagerBoss = new BABYLON.SpriteManager("bossManagr","../images/boss.png", 1, 148, scene);
	boss = new BABYLON.Sprite("boss", spriteManagerBoss);
	boss.position.y = 1;
	boss.position.z = -5;
	boss.size = 2.75;
	boss.playAnimation(0, 2, true, 400);
	
	var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

	console.log("working");
	console.log(window.screen.width);
	var width = window.screen.availWidth / 1536;
	var text1 = new BABYLON.GUI.TextBlock();
    text1.text = "TIME";
    text1.color = "red";    
    text1.height = "40px";
    text1.fontSize = 40;
    text1.zIndex = 1;
    text1.verticalAlignment	= BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    text1.left = (585 * width) + "px";	// 585
    advancedTexture.addControl(text1); 
    
    var text2 = new BABYLON.GUI.TextBlock();
    text2.text = "KILLS";
    text2.color = "red";    
    text2.height = "40px";
    text2.fontSize = 40;
    text2.zIndex = 1;
    text2.verticalAlignment	= BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    text2.left = (230 * width) + "px";
    advancedTexture.addControl(text2); 
    
    var text3 = new BABYLON.GUI.TextBlock();
    text3.text = "SHOTS";
    text3.color = "red";    
    text3.height = "40px";
    text3.fontSize = 40;
    text3.zIndex = 1;
    text3.verticalAlignment	= BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    text3.left = (-165 * width) + "px";
    advancedTexture.addControl(text3); 
    
    var text4 = new BABYLON.GUI.TextBlock();
    text4.text = "HEALTH";
    text4.color = "red";    
    text4.height = "40px";
    text4.fontSize = 40;
    text4.zIndex = 1;
    text4.verticalAlignment	= BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    text4.left = (-395 * width) + "px";
    advancedTexture.addControl(text4); 
    
    var text5 = new BABYLON.GUI.TextBlock();
    text5.text = "GRADE";
    text5.color = "red";    
    text5.height = "40px";
    text5.fontSize = 40;
    text5.zIndex = 1;
    text5.verticalAlignment	= BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    text5.left = (-640 * width) + "px";
    advancedTexture.addControl(text5);

    var image = new BABYLON.GUI.Image("but", "../images/hud.png");
    image.width = 1;
    var size = window.screen.availWidth / 624;
    size = size * 7; //TODO I changed this from 75 because it took up the entire screen.
    image.height = size + "px";
    //image.height = "40px";
    image.verticalAlignment	= BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    advancedTexture.addControl(image);   
	
    scene.enablePhysics();
    var fired = false;
	scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction({ trigger: BABYLON.ActionManager.OnKeyDownTrigger, parameter: "o" },
			  function () {
					var bullet = new BABYLON.Mesh.CreateSphere("bullet", 4, .6, scene); 
					var muzzleVelocity = 39;	// was 3
					var gravity = 0;	// was -9.81
					bullet.position.y = camera.position.y - .3;
					bullet.position.x = camera.position.x;
					bullet.position.z = camera.position.z;
					bullet.checkCollisions = true;
					bullet.physicsImpostor = new BABYLON.PhysicsImpostor(bullet, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2, restitution: 0.9 }, scene);
						
					physicsPlugin.setLinearVelocity(bullet.physicsImpostor, new BABYLON.Vector3(Math.sin(camera.rotation.y) * muzzleVelocity, 0, Math.cos(camera.rotation.y) * muzzleVelocity));


                  if (bullet.intersectsMesh(box)) {
                      console.log("enemy killed");
                      //then add whatever else you need here after enemy gets hit
                  }//this will only work in I am like inside the box
			}));


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