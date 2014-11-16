/**
 * Created by Hendel Jo on 16.11.14.
 */

"use strict";

var canvas;
var scene, camera, renderer;

var stats;

var animation = true;

var cube;

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
	camera.position.x = 5;
	camera.position.y = 5;
	camera.position.z = 5;
	camera.lookAt(scene.position);

	// set State
	stats = new Stats();
	document.getElementById("stats").appendChild(stats.domElement);


	// Set Light
	var ambient = new THREE.AmbientLight("#222222");
	var directionalLight1 = new THREE.DirectionalLight("#ffffff");
	var directionalLight2 = new THREE.DirectionalLight("#ffffff");

	directionalLight1.position.set(70, -70, 100).normalize();
	directionalLight2.position.set(-70, 70, -100).normalize();

	scene.add(ambient);
	scene.add(directionalLight1);
	scene.add(directionalLight2);


	drawCube();
	render();
}
function drawCube() {
	var manager = new THREE.LoadingManager();
	manager.onProgress = function (item, loaded, total) {
		console.log(item, loaded, total);
	};

	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};

	var onError = function ( xhr ) {
	};

	var loader = new THREE.OBJLoader(manager);
	loader.load("objects/cubeTexture.obj", function(object) {
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