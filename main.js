import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Sky } from 'three/addons/objects/Sky.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement)

const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light
directionalLight.position.set(5, 10, 7.5); // Position it above the scene
directionalLight.castShadow = true; // Enable shadows
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100); // White light with intensity of 1 and distance of 100
pointLight.position.set(0, 10, 0);
scene.add(pointLight);

// Optional: Adjust shadow properties
directionalLight.shadow.mapSize.width = 512; // Default is 512
directionalLight.shadow.mapSize.height = 512;
directionalLight.shadow.camera.near = 0.5; // Default
directionalLight.shadow.camera.far = 50; // Default

const sky = new Sky();
sky.scale.setScalar( 300 );

const phi = THREE.MathUtils.degToRad( 90 );
const theta = THREE.MathUtils.degToRad( 180 );
const sunPosition = new THREE.Vector3().setFromSphericalCoords( 1, phi, theta );

sky.material.uniforms.sunPosition.value = sunPosition;


scene.add( sky );

const loader = new GLTFLoader();
loader.load('./public/abandoned_warehouse.glb', async function ( gltf ) {

    const model = gltf.scene;

    model.position.set(0, 0.05, 0)

    // wait until the model can be added to the scene without blocking due to shader compilation

    await renderer.compileAsync( model, camera, scene );

    scene.add( model );

} );

const pgeometry = new THREE.PlaneGeometry( 50, 50 );
let tex = new THREE.TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/4/4c/Grass_Texture.png")
tex.anisotropy = 32
tex.repeat.set(100, 100)
tex.wrapT = THREE.RepeatWrapping
tex.wrapS = THREE.RepeatWrapping
const pmaterial = new THREE.MeshLambertMaterial({
    map: tex
});
const plane = new THREE.Mesh( pgeometry, pmaterial );
plane.position.set(0, 0, 0)
plane.rotation.set(Math.PI/-2, 0, 0)
scene.add( plane );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );

}