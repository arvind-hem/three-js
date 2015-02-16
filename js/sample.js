var scene, 
	camera, 
	floor, 
	roof,
	rotateXInterval,
	rotateYInterval, 
	wall;
 
bindEvents();
initializeScene(); 
renderScene(); 

function bindEvents(){
	$("body").on('click','.jBtnRotateX', function(){
		clearInterval(rotateXInterval);
		clearInterval(rotateYInterval);
		rotateXInterval =  setInterval(function(){	
			wall.rotateX(0.01);
			roof.rotateX(0.01);
			floor.rotateX(0.01);
			renderer.render(scene, camera);
		},10); 
	});

	$("body").on('click','.jBtnRotateY', function(){
		
		clearInterval(rotateYInterval);
		clearInterval(rotateXInterval);
		rotateYInterval =  setInterval(function(){	
			wall.rotateY(0.01);
			roof.rotateY(0.01);
			floor.rotateY(0.01);
			renderer.render(scene, camera);
		},10); 
	});

	$("body").on('click','.jBtnStopRotation', function(){
		
		clearInterval(rotateYInterval);
		clearInterval(rotateXInterval);
	});
}

function initializeScene(){ 

	var roofGeometry, 
		floorGeometry,
		canvasWidth,
		canvasHeight,	 
		wallGeometry;

    renderer = new THREE.WebGLRenderer({antialias:true}); 
    // Set the background color of the renderer to black, with full opacity 
    renderer.setClearColor(0x000000, 1); 
    
    // Get the size of the inner window (content area) to create a full size renderer 
    canvasWidth = $("#dvCanvasContainer").innerWidth(); 
    canvasHeight = $("#dvCanvasContainer").innerHeight(); 
    
    // Set the renderers size to the content areas size 
    renderer.setSize(canvasWidth, canvasHeight); 
    
    document.getElementById("dvCanvasContainer").appendChild(renderer.domElement); 
    
    scene = new THREE.Scene(); 
    
    camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 100); 
    camera.position.set(0, 0, 50); 
    camera.lookAt(scene.position); 
    scene.add(camera); 
  
    
 
    roofGeometry = getRoofGeometry();
    roof = new THREE.Mesh(roofGeometry, new THREE.MeshBasicMaterial({ 
        color: 0xB2D1FF, 
        side: THREE.DoubleSide 
    })
    ); 
    roof.position.set(0, 0, 0); 
    roof.rotation.x = 0;
    scene.add(roof);              


    floorGeometry = getFloorGeometry();
    floor = new THREE.Mesh(floorGeometry,  new THREE.MeshBasicMaterial({ 
        color: 0x006B24, 
        side: THREE.DoubleSide 
    })
    ); 


    floor.position.set(0, 0, 0); 
    scene.add(floor);              


    wallGeometry = getWallGeometry();              

    wall = new THREE.Mesh(wallGeometry,  new THREE.MeshBasicMaterial({ 
        color: 0x993300, 
        side: THREE.DoubleSide 
    })
    ); 
    wall.position.set(0, 0, 0); 
    
    scene.add(wall); 
}

function getWallGeometry (){
	
	var wallGeometry = new THREE.Geometry(); 
    
    wallGeometry.vertices.push(new THREE.Vector3( -35, -5, -15)); 
    wallGeometry.vertices.push(new THREE.Vector3( 35, -5, -15));     
    wallGeometry.vertices.push(new THREE.Vector3( 35, 5, -15)); 
    wallGeometry.vertices.push(new THREE.Vector3( -35, 5, -15)); 
    wallGeometry.faces.push(new THREE.Face3(0, 1, 3)); 
    wallGeometry.faces.push(new THREE.Face3(1, 2, 3));              

    return wallGeometry;

}

function getRoofGeometry (){
	
	var roofGeometry = new THREE.Geometry(); 

    roofGeometry.vertices.push(new THREE.Vector3(-35,  10, 5)); 
    roofGeometry.vertices.push(new THREE.Vector3( 35,  10, 5)); 
    roofGeometry.vertices.push(new THREE.Vector3( 35, 5, -15)); 
    roofGeometry.vertices.push(new THREE.Vector3( -35, 5, -15)); 
    roofGeometry.faces.push(new THREE.Face3(0, 1, 3)); 
    roofGeometry.faces.push(new THREE.Face3(1, 2, 3));

    return roofGeometry;
}

function getFloorGeometry (){

	var floorGeometry = new THREE.Geometry(); 

    floorGeometry.vertices.push(new THREE.Vector3(-35,  -10, 5)); 
    floorGeometry.vertices.push(new THREE.Vector3( 35,  -10, 5)); 
    floorGeometry.vertices.push(new THREE.Vector3( 35, -5, -15)); 
    floorGeometry.vertices.push(new THREE.Vector3( -35, -5, -15)); 
    floorGeometry.faces.push(new THREE.Face3(0, 1, 3)); 
    floorGeometry.faces.push(new THREE.Face3(1, 2, 3));              

    return floorGeometry;
}

/** 
 * Render the scene. Map the 3D world to the 2D screen.
 */ 
function renderScene(){ 
	
    renderer.render(scene, camera); 
} 