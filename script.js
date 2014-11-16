/**
 * Created by Hendel Jo on 16.11.14.
 */

"use strict";

var canvas;

var scene, camera, renderer;

function init() {
	// Set Variables
	canvas = document.getElementById("canvas");
	canvas.width = 700;
	canvas.height = 700;

	renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
	renderer.setSize(canvas.width, canvas.height);
	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(50, canvas.width / canvas.height, 1, 10000);
	camera.position.x = 5;
	camera.position.y = 5;
	camera.position.z = 5;
	camera.lookAt(scene.position);

	var ambient = new THREE.AmbientLight("#222222");
	var directionalLight1 = new THREE.DirectionalLight("#ffffff");
	var directionalLight2 = new THREE.DirectionalLight("#ffffff");

	directionalLight1.position.set(70, -70, 100).normalize();
	directionalLight2.position.set(-70, 70, -100).normalize();

	scene.add(ambient);
	scene.add(directionalLight1);
	scene.add(directionalLight2);
}

window.addEventListener("load", init);