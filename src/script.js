import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'

//loading 

const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/textures/NormalMap.png')

// esto sirve de guia.
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.7, 64, 64)

//probando background 

const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.2,
})

const starVertices = []
for (let i = 0; i < 100000; i++) {
    const x = (Math.random() - 0.5) * 2000
    const y = (Math.random() - 0.5) * 2000
    const z = - Math.random() * 150
    starVertices.push(x, y, z)

}


starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(
    starVertices, 3)
)

const stars = new THREE.Points(
    starGeometry, starMaterial)
scene.add(stars)



// Materials

const material = new THREE.MeshStandardMaterial()
//new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./static/textures/probandotierra.jpg') })
material.metalness = 0.7,
    material.roughness = 0.2,
    material.normalMap = normalTexture;

material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xcc50c, 2)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

//light2
const pointLight2 = new THREE.PointLight(0xffffff, 2)
pointLight2.position.set(-2.38, 1.67, -1.78)
pointLight2.intensity = 10

scene.add(pointLight2)

const light1 = gui.addFolder('Light 1')

light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light1.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

//ligh3

const pointLight3 = new THREE.PointLight(0xe1ff, 2)
pointLight3.position.set(2.13, -3, -1.98)
pointLight3.intensity = 6, 8

scene.add(pointLight3)

const light2 = gui.addFolder('Light 2')


light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

const light2Color = {
    color: 0xff000
}

light2.addColor(light2Color, 'color')
    .onChange(() => {
        pointLight3.color.set(light2Color.color)
    })

//Sizes

const sizes = {
    width: window.innerWidth * 1.3,
    height: window.innerHeight
}

window.addEventListener('resize', () => {

    sizes.width = window.innerWidth
    sizes.height = window.innerHeight


    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//Camara

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)



//Renderizado

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Animaciones 

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}


const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001
}
window.addEventListener('scroll', updateSphere);


const clock = new THREE.Clock()

const tick = () => {

    targetX = mouseX * .001
    targetY = mouseY * .001
    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.y = .5 * elapsedTime
    sphere.rotation.y += .1 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .1 * (targetY - sphere.rotation.x)
    sphere.position.z += -.1 * (targetY - sphere.rotation.x)


    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick();
