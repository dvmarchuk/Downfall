// JavaScript source code
var B = BABYLON;

var canvas = document.getElementById("renderCanvas");

var engine = new B.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

                           
var onSuccess = function (meshes, particlesystems, skeletons) {
    console.log("Success");
    var wall = scene.getMeshByName("Cube.000");
    //floor.scaling.x += 1;
    //floor.scaling.z += 1;
    wall.checkCollisions = true;
    var wallMaterial = new B.StandardMaterial("wall", scene);
    wallMaterial.diffuseTexture = new B.Texture("materials/wall.jpg", scene);
    wall.material = wallMaterial;

    var floor = scene.getMeshByName("Cube.031");
    floor.checkCollisions = true;
    var floorMaterial = new B.StandardMaterial("floor", scene);
    floorMaterial.diffuseTexture = new B.Texture("materials/floor.jpg", scene);
    floor.material = floorMaterial;
    //walls.scaling.x += 1;
    //walls.scaling.y = 2;
    //walls.scaling.z += 1;
};

var createScene = function () {
    var scene = new B.Scene(engine);
    //skybox auto
    var envTexture = new B.CubeTexture("textures/Mars/mars", scene);
    scene.createDefaultSkybox(envTexture, true, 1000);

    //physics
    scene.enablePhysics();

    camera = new B.FreeCamera("camera1", new B.Vector3(0, 50, -10), scene);
    camera.setTarget(B.Vector3.Zero());
    camera.attachControl(canvas, false);

    //lighting
    /*var light0 = new B.PointLight("Omin0", new B.Vector3(0, 40, 0), scene);
    light0.diffuse = new B.Color3(255, 255, 255);
    light0.specular = new B.Color3(255, 255, 255);*/
    var light = new B.HemisphericLight("hemiLight", new B.Vector3(0, 10, 0), scene);
    light.diffuse = new B.Color3(255, 255, 255);
    light.specular = new B.Color3(255, 255, 255);
    light.groundColor = new B.Color3(255, 255, 255);
    light.intensity = .5;

  
    //get in the walls and floor
   /* var wallNames = ["wall"];
    var baseDir1 = "assets/Blender/";
    var fileName1 = "wall.babylon";

    B.SceneLoader.ImportMesh(wallNames, baseDir1, fileName1, scene, onSuccessWall);

    var floorNames = ["floor"];
    var baseDir2 = "assets/Blender/";
    var fileName2 = "floor.babylon";

    B.SceneLoader.ImportMesh(floorNames, baseDir2, fileName2, scene, onSuccessFloor);

    var columnNames = ["column"];
    var baseDir3 = "assets/Blender/";
    var fileName3 = "column.babylon";

    B.SceneLoader.ImportMesh(columnNames, baseDir3, fileName3, scene, onSuccessColumn);*/

    var testNames = ["Cube.000", "Cube.031"];
    var baseDir2 = "assets/Blender/";
    var fileName2 = "downfall_hallway1.babylon";

    B.SceneLoader.ImportMesh(testNames, baseDir2, fileName2, scene, onSuccess);

    
    

    //gravity and camera stuff
    scene.gravity = new B.Vector3(0, -9.81, 0);
    //scene.gravity = new B.Vector3(0, -1, 0);
    camera.applyGravity = true;

    //creating a collision body around camera
    camera.ellipsoid = new B.Vector3(1, 1, 1);

    //enabling collisions to occur
    scene.checkCollisions = true;
    camera.checkCollisions = true;
    

    //setting what can be collided with by our camera

    /*ground.checkCollisions = true;
    sphere.checkCollisions = true;
    sphere2.checkCollisions = true;
    box.checkCollisions = true;*/

    scene.registerBeforeRender(function () {
    });

    

    //Scene picker
    /*pickedBox = B.Mesh.CreateBox("pickedBox", 2, false, B.Mesh.DEFAULTSIDE);
    pickedBox.position.x = 8;

    window.addEventListener("click", function () {
        var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    });

    scene.onPointerDown = function (evt, pickResult) {
        if (pickResult.hit) {
            if (pickResult.pickedMesh != null) {
                pickResult.pickedMesh.material = new B.StandardMaterial("sun", scene);
                pickResult.pickedMesh.material.emissiveColor = new B.Color3(1, 1, 0);
            }
            else {
                console.log("You missed");
            }
        }
    };*/

    //Sounds and Music
var gunSound = new B.Sound("gunSound", "Alien_Machine_Gun-Matt_Cutillo-2023875589.wav",scene);
  
window.addEventListener("keydown", function (evt) {
    // "o" to fire
    if (evt.button === "o") {
        gunSound.play();
    }
});

//BossRoomSound
var bossRoomSound = new B.Sound("bossSound", "572129_8-bit-Vengeance.wav",scene, null, { loop: true, autoplay: true });

// Sound will now follow the box mesh position
mazeSound.attachToMesh(boss);

                           
var mazeSound =new B.Sound("mazeSound", "611689_8-bit-Against-the-Odds-Red.wav",scene, null, { loop: true, autoplay: true });

// Sound will now follow the box mesh position
mazeSound.attachToMesh(wall);


//MonsterSound
var monsterSound =new B.Sound("monsterSound", "Monster Growl-SoundBible.com-344645592.wav",scene 
    function (){
    if(bullet.checkCollisions == true)   
    {
        else if(monster.checkCollisions == true)
        {
            monsterSound.play();
        }
    }
}
);
    
    return scene;
}

var scene = createScene();

engine.runRenderLoop(function () {

    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
