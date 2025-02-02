import * as THREE from 'three';

const startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', init );

function init() {
  const canvas = document.querySelector( '#canvas' );
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setAnimationLoop( animate );
	document.body.appendChild( renderer.domElement );

  // Lights
  const color = 0xFFFFFF;
  const intensity = 3;
  const light = new THREE.DirectionalLight( color, intensity );
  light.position.set( - 1, 2, 4 );
  scene.add( light );

	const geometry = new THREE.BoxGeometry( 1, 1, 1 );
	const material = new THREE.MeshPhongMaterial( { color: 0x44aa88 } );
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	camera.position.z = 5;

  // Audio
  const listener = new THREE.AudioListener();
  camera.add( listener );

  // create a global audio source
  const sound = new THREE.Audio( listener );

  // load a sound and set it as the Audio object's buffer
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load( 'assets/sounds/moonlight.mp3', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( true );
    sound.setVolume( 0.5 );
    sound.play();
  });

	function animate() {
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

		renderer.render( scene, camera );
	}
}