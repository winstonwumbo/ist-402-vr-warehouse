import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

let camera, scene, renderer, controls;
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Camera controls
// Movement states (keyboard)
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

const objects = [];

let raycaster;
let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

// Messing with lights
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light
directionalLight.position.set(5, 10, 7.5); // Position it above the scene
directionalLight.castShadow = true; // Enable shadows
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100); // White light with intensity of 1 and distance of 100
pointLight.position.set(0, 10, 0);
scene.add(pointLight);

// Adjust shadow properties
directionalLight.shadow.mapSize.width = 512; // Default is 512
directionalLight.shadow.mapSize.height = 512;
directionalLight.shadow.camera.near = 0.5; // Default
directionalLight.shadow.camera.far = 50; // Default

// Skybox
const sky = new Sky();
sky.scale.setScalar( 300 );

const phi = THREE.MathUtils.degToRad( 90 );
const theta = THREE.MathUtils.degToRad( 180 );
const sunPosition = new THREE.Vector3().setFromSphericalCoords( 1, phi, theta );

sky.material.uniforms.sunPosition.value = sunPosition;


scene.add( sky );

const loader = new GLTFLoader();

//add warehouse
loader.load('./abandoned_warehouse.glb', async function ( gltf ) {

    const model = gltf.scene;

    model.scale.set(1.75, 1.75, 1.75)
    model.position.set(-5, 0.05, 0)

    // wait until the model can be added to the scene without blocking due to shader compilation

    await renderer.compileAsync( model, camera, scene );

    scene.add( model );

} );

// add spaceshuttle easter
loader.load('./discovery_space_shuttle.glb', async function ( gltf ) {

    const shuttle = gltf.scene;
    shuttle.scale.set(1.5, 1.5, 1.5)

    shuttle.position.set(32, 10, 0)

    // wait until the model can be added to the scene without blocking due to shader compilation

    await renderer.compileAsync( shuttle, camera, scene );

    scene.add( shuttle );

} )
//add shelving
loader.load('./old_rusty_shelving_unit.glb', async function ( gltf ) {
    const model = gltf.scene;

    model.position.set(6, 0.05, 5)
    await renderer.compileAsync( model, camera, scene );
    scene.add(model);

    const model2 =  model.clone()
    model2.position.set(6, 0.05, 2.5)
    await renderer.compileAsync(model2, camera, scene);
    scene.add(model2);

    const model3 =  model.clone()
    model3.position.set(6, 0.05, 0)
    await renderer.compileAsync(model3, camera, scene);
    scene.add(model3);

    const model4 =  model.clone()
    model4.position.set(6, 0.05, -2.5)
    await renderer.compileAsync(model4, camera, scene);
    scene.add(model4);

    const model5 =  model.clone()
    model5.position.set(6, 0.05, -5)
    await renderer.compileAsync(model5, camera, scene);
    scene.add(model5);

    const model7 =  model.clone()
    model7.position.set(6, 0.05, -7.5)
    await renderer.compileAsync(model7, camera, scene);
    scene.add(model7);

    const model8 =  model.clone()
    model8.position.set(6, 0.05, -10)
    await renderer.compileAsync(model8, camera, scene);
    scene.add(model8);
} );

loader.load('./wooden_box.glb', async function ( gltf ) {
    const model = gltf.scene;
    model.scale.set(0.005, 0.005, 0.005)
    model.position.set(6.2, 1.6, 4.5)
    await renderer.compileAsync(model, camera, scene);
    scene.add(model);

    const model2 = model.clone();
    model2.scale.set(0.005, 0.005, 0.005)
    model2.position.set(6.2, 1.6, 5.5)
    await renderer.compileAsync(model2, camera, scene);
    scene.add(model2);

    const model3 = model.clone();
    model3.scale.set(0.005, 0.005, 0.005)
    model3.position.set(5.2, 1.6, 4.5)
    await renderer.compileAsync(model3, camera, scene);
    scene.add(model3);

    const model4 = model.clone();
    model4.scale.set(0.005, 0.005, 0.005)
    model4.position.set(5.2, 1.6, 5.5)
    await renderer.compileAsync(model4, camera, scene);
    scene.add(model4);

    const model5 = model.clone();
    model5.scale.set(0.005, 0.005, 0.005)
    model5.position.set(6.2, 1.6, -0.5)
    await renderer.compileAsync(model5, camera, scene);
    scene.add(model5);

    const model6 = model.clone();
    model6.scale.set(0.005, 0.005, 0.005)
    model6.position.set(6.2, 1.6, 0.5)
    await renderer.compileAsync(model6, camera, scene);
    scene.add(model6);

    const model7 = model.clone();
    model7.scale.set(0.005, 0.005, 0.005)
    model7.position.set(5.2, 1.6, -0.5)
    await renderer.compileAsync(model7, camera, scene);
    scene.add(model7);

    const model8 = model.clone();
    model8.scale.set(0.005, 0.005, 0.005)
    model8.position.set(5.2, 1.6, 0.5)
    await renderer.compileAsync(model8, camera, scene);
    scene.add(model8);

    const model9 = model.clone();
    model9.scale.set(0.005, 0.005, 0.005)
    model9.position.set(6.2, 1.6, -5.5)
    await renderer.compileAsync(model9, camera, scene);
    scene.add(model9);

    const model10 = model.clone();
    model10.scale.set(0.005, 0.005, 0.005)
    model10.position.set(6.2, 1.6, -4.5)
    await renderer.compileAsync(model10, camera, scene);
    scene.add(model10);

    const model11 = model.clone();
    model11.scale.set(0.005, 0.005, 0.005)
    model11.position.set(5.2, 1.6, -5.5)
    await renderer.compileAsync(model11, camera, scene);
    scene.add(model11);

    const model12 = model.clone();
    model12.scale.set(0.005, 0.005, 0.005)
    model12.position.set(5.2, 1.6, -4.5)
    await renderer.compileAsync(model12, camera, scene);
    scene.add(model12);

    const model13 = model.clone();
    model13.scale.set(0.005, 0.005, 0.005)
    model13.position.set(6.2, 1.6, -10.5)
    await renderer.compileAsync(model13, camera, scene);
    scene.add(model13);

    const model14 = model.clone();
    model14.scale.set(0.005, 0.005, 0.005)
    model14.position.set(6.2, 1.6, -9.5)
    await renderer.compileAsync(model14, camera, scene);
    scene.add(model14);

    const model15 = model.clone();
    model15.scale.set(0.005, 0.005, 0.005)
    model15.position.set(5.2, 1.6, -10.5)
    await renderer.compileAsync(model15, camera, scene);
    scene.add(model15);

    const model16 = model.clone();
    model16.scale.set(0.005, 0.005, 0.005)
    model16.position.set(5.2, 1.6, -9.5)
    await renderer.compileAsync(model16, camera, scene);
    scene.add(model16);
} );

// Default cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
cube.position.set(0, 7, 14)
cube.scale.set(0.5, 0.5, 0.5)
scene.add( cube );

init()

function init() {

    camera.position.y = 2;

    controls = new PointerLockControls( camera, document.body );

    const blocker = document.getElementById( 'blocker' );
    const instructions = document.getElementById( 'instructions' );

    instructions.addEventListener( 'click', function () {

        controls.lock();

    } );

    controls.addEventListener( 'lock', function () {

        instructions.style.display = 'none';
        blocker.style.display = 'none';

    } );

    controls.addEventListener( 'unlock', function () {

        blocker.style.display = 'block';
        instructions.style.display = '';

    } );

    scene.add( controls.object );

    const onKeyDown = function ( event ) {

        switch ( event.code ) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = true;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;

            case 'Space':
                if ( canJump === true ) velocity.y += 50;
                canJump = false;
                break;

        }

    };

    const onKeyUp = function ( event ) {

        switch ( event.code ) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;

        }

    };

    document.addEventListener( 'keydown', onKeyDown );
    document.addEventListener( 'keyup', onKeyUp );

    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

    // floor

    let floorGeometry = new THREE.PlaneGeometry( 1000, 1000 );
    floorGeometry.rotateX( - Math.PI / 2 );

    let tex = new THREE.TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/4/4c/Grass_Texture.png")
    tex.anisotropy = 32
    tex.repeat.set(100, 100)
    tex.wrapT = THREE.RepeatWrapping
    tex.wrapS = THREE.RepeatWrapping
    const pmaterial = new THREE.MeshLambertMaterial({
        map: tex
    });
    const floor = new THREE.Mesh( floorGeometry, pmaterial );
    scene.add( floor );

    // // objects

    // const boxGeometry = new THREE.BoxGeometry( 20, 20, 20 ).toNonIndexed();

    // position = boxGeometry.attributes.position;
    // const colorsBox = [];

    // for ( let i = 0, l = position.count; i < l; i ++ ) {

    //     color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace );
    //     colorsBox.push( color.r, color.g, color.b );

    // }

    // boxGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colorsBox, 3 ) );

    // for ( let i = 0; i < 500; i ++ ) {

    //     const boxMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: true } );
    //     boxMaterial.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace );

    //     const box = new THREE.Mesh( boxGeometry, boxMaterial );
    //     box.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
    //     box.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
    //     box.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;

    //     scene.add( box );
    //     objects.push( box );

    // }

    //

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animate );
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    const time = performance.now();

    if ( controls.isLocked === true ) {

        raycaster.ray.origin.copy( controls.object.position );
        raycaster.ray.origin.y -= 10;

        const intersections = raycaster.intersectObjects( objects, false );

        const onObject = intersections.length > 0;

        const delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 15.0 * delta; // 100.0 = mass

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 40.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 40.0 * delta;

        if ( onObject === true ) {

            velocity.y = Math.max( 0, velocity.y );
            canJump = true;

        }

        controls.moveRight( - velocity.x * delta );
        controls.moveForward( - velocity.z * delta );

        controls.object.position.y += ( velocity.y * delta ); // new behavior

        if ( controls.object.position.y < 2 ) {

            velocity.y = 0;
            controls.object.position.y = 2;

            canJump = true;

        }

    }

    prevTime = time;

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );

}