/**
 * Created by Hendel Jo on 16.11.14.
 */

"use strict";

var canvas;
var scene, camera, renderer;

var stats;

var animation = true;

function init() {
	// Set Variables
	canvas = document.getElementById("canvas");
	canvas.width = 700;
	canvas.height = 700;

	renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
	renderer.setSize(canvas.width, canvas.height);
	renderer.setClearColor("#dddddd");
	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(50, canvas.width / canvas.height, 1, 10000);
	camera.position.x = 100;
	camera.position.y = 100;
	camera.position.z = 100;
	camera.lookAt(scene.position);

	// set State
	stats = new Stats();
	document.getElementById("stats").appendChild(stats.domElement);


	// Set Light
	var ambient = new THREE.AmbientLight("#ffffff");
	scene.add(ambient);

	var directionalLight = new THREE.DirectionalLight("#ffffff");
	directionalLight.position.set(50, 50, 50);
	scene.add( directionalLight );


	drawCube();
	render();
}
function drawCube() {
	var manager = new THREE.LoadingManager();
	manager.onProgress = function(item, loaded, total) {
		console.log(item, loaded, total);
	};

	var texture = new THREE.Texture();

	var onProgress = function(xhr) {
		if (xhr.lengthComputable) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log(Math.round(percentComplete, 2) + "% downloaded");
		}
	};

	var onError = function(xhr) {};

	var loader = new THREE.ImageLoader(manager);
	loader.load("images/UV_Grid_Sm.jpg", function(image) {
		texture.image = image;
		texture.needsUpdate = true;
	});

	loader = new THREE.OBJLoader(manager);
	loader.load("objects/cube.obj", function(object) {
		object.traverse(function(child) {
			if (child instanceof THREE.Mesh) {
				child.material.map = texture;
			}
		});

		object.position.set(0, 0, 0);
		scene.add(object);
	}, onProgress, onError);
}
function render() {
	if (animation) requestAnimationFrame(render);



	stats.update();
	renderer.render(scene, camera);
}

window.addEventListener("load", init);