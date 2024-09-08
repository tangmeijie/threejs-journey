import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const Ambient = gui.addFolder('Ambient')
Ambient.add(ambientLight, 'visible')
Ambient.addColor(ambientLight, 'color')
Ambient.add(ambientLight, 'intensity').min(0).max(2).step(0.01)

// Directional light
const directionalLight = new THREE.DirectionalLight(0x00fffc, 1)
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)

const Directional = gui.addFolder('Directional')
Directional.add(directionalLight, 'visible')
Directional.addColor(directionalLight, 'color')
Directional.add(directionalLight, 'intensity').min(0).max(3).step(0.01)
Directional.add(directionalLight.position, 'z').min(- 5).max(5).step(0.01)

// Hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9)
scene.add(hemisphereLight)

const Hemisphere = gui.addFolder('Hemisphere')
Hemisphere.add(hemisphereLight, 'visible')
Hemisphere.addColor(hemisphereLight, 'color')
Hemisphere.addColor(hemisphereLight, 'groundColor')
Hemisphere.add(hemisphereLight, 'intensity').min(0).max(3).step(0.01)

// Point light
const pointLight = new THREE.PointLight(0xff9000, 1.5, 0, 2)
pointLight.position.set(1, - 0.5, 1)
scene.add(pointLight)

const Point = gui.addFolder('Point')
Point.add(pointLight, 'visible')
Point.addColor(pointLight, 'color')
Point.add(pointLight, 'intensity').min(0).max(3).step(0.01)
Point.add(pointLight.position, 'x').min(- 5).max(5).step(0.01)
Point.add(pointLight, 'distance').min(0).max(5).step(0.01)
Point.add(pointLight, 'decay').min(0).max(5).step(0.01)

// RectAreaLight
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 1)
rectAreaLight.position.set(- 1.5, 0, 1.5)
scene.add(rectAreaLight)
rectAreaLight.lookAt(new THREE.Vector3())

const RectArea = gui.addFolder('RectArea')
RectArea.add(rectAreaLight, 'visible')
RectArea.addColor(rectAreaLight, 'color')
RectArea.add(rectAreaLight, 'intensity').min(0).max(10).step(0.01)
RectArea.add(rectAreaLight, 'width').min(0).max(5).step(0.01)
RectArea.add(rectAreaLight, 'height').min(0).max(5).step(0.01)
RectArea.add(rectAreaLight.position, 'x').min(- 5).max(5).step(0.01)
RectArea.add(rectAreaLight.position, 'y').min(- 5).max(5).step(0.01)
RectArea.add(rectAreaLight.position, 'z').min(- 5).max(5).step(0.01)

// Spot light
const spotLight = new THREE.SpotLight(0x78ff00, 4.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)
spotLight.target.position.x = - 0.75
scene.add(spotLight.target)

const Spot = gui.addFolder('Spot')
Spot.add(spotLight, 'visible')
Spot.addColor(spotLight, 'color')
Spot.add(spotLight, 'intensity').min(0).max(10).step(0.01)
Spot.add(spotLight, 'distance').min(0).max(10).step(0.01)
Spot.add(spotLight, 'angle').min(0).max(Math.PI / 2).step(0.01)
Spot.add(spotLight, 'penumbra').min(0).max(1).step(0.01)
Spot.add(spotLight, 'decay').min(0).max(10).step(0.01)
Spot.add(spotLight.target.position, 'x').min(- 5).max(5).step(0.01)

// Helper
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()