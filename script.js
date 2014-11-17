/**
 * Created by Hendel Jo on 16.11.14.
 */

"use strict";

var canvas;
var scene, camera, renderer;

var stats;

var animation = true;

var cr, wgr, wr, wrb, rb, rby, ry, gry, gr, wg, cw, wb, cb, by, cy, gy, cg, wog, wo, wob, ob, boy, oy, ogy, co;
		var cubes = [cr, wgr, wr, wrb, rb, rby, ry, gry, gr, wg, cw, wb, cb, by, cy, gy, cg, wog, wo, wob, ob, boy, oy, ogy, co];


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


	drawObject();
	render();
}
function drawObject() {
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
	loader.load("textures/texture.png", function(image) {
		texture.image = image;
		texture.needsUpdate = true;
	});

	loader = new THREE.OBJLoader(manager);

	//-------------------
	loader.load("objects/cube_main_texture.obj", function(object) {
		object.traverse(function(child) {
			if (child instanceof THREE.Mesh) {
				child.material.map = texture;
			}
		});

		wgr = object;
		wgr.position.set(0, 0,0);
		scene.add(wgr);

	}, onProgress, onError);
	//-----------------
	for (var i = 0; i < cubes.length; i++) {
		var list = {
			0: cr,
			1: wgr,
			2: wr,
			3: wrb,
			4: rb,
			5: rby,
			6: ry,
			7: gry,
			8: gr,
			9: wg,
			10: cw,
			11: wb,
			12: cb,
			13: by,
			14: cy,
			15: gy,
			16: cg,
			17: wog,
			18: wo,
			19: wob,
			20: ob,
			21: boy,
			22: oy,
			23: ogy,
			24: co
		}

		loader.load("object/" + list.i + ".obj", function(object) {
			object.traverse(function(child) {
				if (child instanceof THREE.Mesh) {
					child.material.map = texture;
				}
			});

			cubes[i] = object;
			scene.add(cubes[i]);

		}, onProgress, onError);
	}
}
function render() {
	if (animation) requestAnimationFrame(render);

	wgr.rotation.x += 0.01;

	stats.update();
	renderer.render(scene, camera);
}

window.addEventListener("load", init);