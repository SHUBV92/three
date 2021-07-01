import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// scene, camera, renderer

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

// renders the screen with scene and perspective camera
renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial( { color: 0x0000ff } )
const torus = new THREE.Mesh( geometry, material );


// adds the geometry shape to the screen
scene.add(torus)

// add lighting
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,5,5)

// natural flood light to make every object light-up
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24,24)
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff })
    const star = new THREE.Mesh( geometry, material )

    const [x, y, z ] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ))

    star.position.set(x, y, z )
    scene.add(star)
}

Array(200).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load('horizon.jpg')
scene.background = spaceTexture;


const shubsTexture = new THREE.TextureLoader().load('shubs.jpg')

const shubs = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial( { map: shubsTexture })
)

scene.add(shubs)

const moonTexture = new THREE.TextureLoader().load('blue-texture.jpeg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture ,
  })
)



scene.add(moon)


function movecamera(){

    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05
    moon.rotation.y += 0.0075
    moon.rotation.z += 0.05

    shubs.rotation.y += 0.01
    shubs.rotation.z += 0.01

    camera.position.z = t * -0.01
    camera.position.x = t * -0.0002
    camera.rotation = t * -0.0002

}

document.body.onscroll = movecamera

function animate() { 
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;   

  moon.position.z = 30
  moon.position.setX(-10)

  controls.update() 

  renderer.render( scene, camera ) 
}

animate()
