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
	
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox/basic_skybox/skybox", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	
	skybox.renderingGroupId = 0;
	
	var spriteManagerMonster = new BABYLON.SpriteManager("monsterManagr","images/monster.png", 1, 60, scene);
	var monsters = [];
	monsters[0] = new BABYLON.Sprite("monster", spriteManagerMonster);
	monsters[0].position.y = 1;
	monsters[0].position.z = -2;
	monsters[0].size = 2.25;
	monsters[0].playAnimation(0, 2, true, 350);
	
	spriteManagerBoss = new BABYLON.SpriteManager("bossManagr","images/boss.png", 1, 148, scene);
	boss = new BABYLON.Sprite("boss", spriteManagerBoss);
	boss.position.y = 1;
	boss.position.z = -5;
	boss.size = 2.75;
	boss.playAnimation(0, 2, true, 400);
	
	shots = 0;
    kills = 0;
    health = '100%';
    grade = 'F';
	
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
    
    var text11 = new BABYLON.GUI.TextBlock();
    text11.text = "0:00";
    text11.color = "red";    
    text11.height = "55px";
    text11.fontSize = 55;
    text11.zIndex = 1;
    text11.top = 175 + "px";
    text11.left = (585 * width) + "px";	// 585
    advancedTexture.addControl(text11); 
    
    var text2 = new BABYLON.GUI.TextBlock();
    text2.text = "KILLS";
    text2.color = "red";    
    text2.height = "40px";
    text2.fontSize = 40;
    text2.zIndex = 1;
    text2.verticalAlignment	= BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    text2.left = (230 * width) + "px";
    advancedTexture.addControl(text2); 
    
    var text12 = new BABYLON.GUI.TextBlock();
    text12.text = kills.toString();
    text12.color = "red";    
    text12.height = "55px";
    text12.fontSize = 55;
    text12.zIndex = 1;
    text12.top = 175 + "px";
    text12.left = (230 * width) + "px";	// 585
    advancedTexture.addControl(text12);
    
    var text3 = new BABYLON.GUI.TextBlock();
    text3.text = "SHOTS";
    text3.color = "red";    
    text3.height = "40px";
    text3.fontSize = 40;
    text3.zIndex = 1;
    text3.verticalAlignment	= BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    text3.left = (-165 * width) + "px";
    advancedTexture.addControl(text3); 
    
    var text13 = new BABYLON.GUI.TextBlock();
    text13.text = shots.toString();
    text13.color = "red";    
    text13.height = "55px";
    text13.fontSize = 55;
    text13.zIndex = 1;
    text13.top = 175 + "px";
    text13.left = (-165 * width) + "px";	// 585
    advancedTexture.addControl(text13);
    
    var text4 = new BABYLON.GUI.TextBlock();
    text4.text = "HEALTH";
    text4.color = "red";    
    text4.height = "40px";
    text4.fontSize = 40;
    text4.zIndex = 1;
    text4.verticalAlignment	= BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    text4.left = (-395 * width) + "px";
    advancedTexture.addControl(text4); 
    
    var text14= new BABYLON.GUI.TextBlock();
    text14.text = health;
    text14.color = "red";    
    text14.height = "55px";
    text14.fontSize = 55;
    text14.zIndex = 1;
    text14.top = 175 + "px";
    text14.left = (-395 * width) + "px";	// 585
    advancedTexture.addControl(text14);
    
    var text5 = new BABYLON.GUI.TextBlock();
    text5.text = "GRADE";
    text5.color = "red";    
    text5.height = "40px";
    text5.fontSize = 40;
    text5.zIndex = 1;
    text5.verticalAlignment	= BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    text5.left = (-640 * width) + "px";
    advancedTexture.addControl(text5);

    var text15 = new BABYLON.GUI.TextBlock();
    text15.text = grade;
    text15.color = "red";    
    text15.height = "55px";
    text15.fontSize = 55;
    text15.zIndex = 1;
    text15.top = 175 + "px";
    text15.left = (-640 * width) + "px";	// 585
    advancedTexture.addControl(text15);
    
    var image = new BABYLON.GUI.Image("but", "images/hud.png");
    image.width = 1;
    var size = window.screen.availWidth / 624;
    size = size * 75;
    image.height = size + "px";
    //image.height = "40px";
    image.verticalAlignment	= BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    advancedTexture.addControl(image);   
	
    scene.enablePhysics();
    var boxMat = new BABYLON.StandardMaterial("boxMat", scene);
    boxMat.alpha = 0;
    
    var box = []
    var killed = []
    box[0] = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
    box[0].position.y = monsters[0].position.y;
    box[0].position.x = monsters[0].position.x;
    box[0].position.z = monsters[0].position.z;
    box[0].scaling.y = 1.75;
    box[0].scaling.x = 1.15;
    box[0].scaling.z = 1.15;
    box[0].material = boxMat;
    box[0].visibility = true;
    box[0].enableEdgesRendering();
    
    var bullet = new BABYLON.Mesh.CreateSphere("bullet", 4, .6, scene);
    bullet.position.y = -6;
    bullet.position.x = 0;
    bullet.position.z = 0;
    bullet.checkCollisions = true;
    bullet.physicsImpostor = new BABYLON.PhysicsImpostor(bullet, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2, restitution: 0.9 }, scene);

    
    
    /*box.actionManager = new BABYLON.ActionManager(scene);

    box.actionManager.registerAction(new BABYLON.ExecuteCodeAction({ trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: { box:bullet, usePreciseIntersection: true} }, box, "scaling", new BABYLON.Vector3(1.2, 1.2, 1.2),
        function () {

            console.log("enemy maybe killed");


            //if (bullet.intersectsMesh(box)) {
                //then add whatever else you need here after enemy gets hit
            //}//this will only work in I am like inside the box
        }));*/
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction({ trigger: BABYLON.ActionManager.OnEveryFrameTrigger},
			  function () {
			        text12.text = kills.toString();
			        text13.text = shots.toString();
			        text13.markAsDirty();
			        if (kills >= 7)
			        	grade = 'B';
			        else if (kills >= 5)
			        	grade = 'C';
			        else if (kills >= 3)
			        	grade = 'D'
			        	
			        text15.text = grade;
			        advancedTexture.uppdate();
			}));
    
    bullet.actionManager = new BABYLON.ActionManager(scene);
    
    bullet.actionManager.registerAction(new BABYLON.ExecuteCodeAction({trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: box[0]},
    			function() {
    				if (killed.indexOf(0) == -1)
    				{
    					console.log("killed enemy (bullet)");
    					box[0].dispose();
    					monsters[0].dispose();
    					killed.push(0);
    					kills++;
    				}
    }));

	scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction({ trigger: BABYLON.ActionManager.OnKeyDownTrigger, parameter: "o" },
			  function () {
					var muzzleVelocity = 39;	// was 3
					var gravity = 0;	// was -9.81

                  bullet.position.y = camera.position.y - .3;
                  bullet.position.x = camera.position.x;
                  bullet.position.z = camera.position.z;

                  shots++;
                  console.log(shots);
                  bullet.applyImpulse(new BABYLON.Vector3(muzzleVelocity,0,0), bullet.position);
				  physicsPlugin.setLinearVelocity(bullet.physicsImpostor, new BABYLON.Vector3(Math.sin(camera.rotation.y) * muzzleVelocity, 0, Math.cos(camera.rotation.y) * muzzleVelocity));
			}));
    
    /*var fired = false;
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
			}));*/
	  
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