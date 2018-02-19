'use strict'
// const Vue = require('vue')

// new Vue({
//   el: '#app'
// })

const Stats = require('stats.js')
const dat = require('dat.gui').default
const THREE = require('three')
console.log(dat)

function init() {
  let control
  const scene = new THREE.Scene()
  const renderer = new THREE.WebGLRenderer()
  const stats = createStats()
  const sombre = new THREE.Color(0x000000)
  const claire = new THREE.Color(0xfcfcfc)
  var myColor = new THREE.Color(0xffff23)

  document.body.appendChild(stats.domElement)

  renderer.setClearColor(0x000000, 1.0)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFBasicShadowMap

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = 15
  camera.position.y = 16
  camera.position.z = 13
  camera.lookAt(scene.position)

  let q = 8;

  document.body.appendChild(renderer.domElement)
  
  let mySpotLight = createSpotLight(0xFFdFFF)
  let myCube = createCube()

  let mySphere =  createSphere()

  let pivotPoint = new THREE.Object3D()

  
  scene.add(mySpotLight)
  scene.add(myCube)
  scene.add(mySphere)

  scene.add(pivotPoint)
  pivotPoint.add(myCube)
  
  myCube.rotation.x = 0.1 * Math.PI

  control = new function () {
    this.rotationSpeedX = 0.005
    this.rotationSpeedY = 0.005
    this.scale = 1
    this.rotationWorld = 0.005
    this.color = myColor
  }

  addControls(control)
  render()

  function addControls (controlObject) {
    let gui = new dat.GUI();
    let palette = {
      color: '#ff00ff'
    }
    gui.add(controlObject, 'rotationSpeedX', -0.1, 1)
    gui.add(controlObject, 'rotationSpeedY', -0.1, 1)
    gui.add(controlObject, 'rotationWorld', -0.1, 1)
    gui.add(controlObject, 'scale', 0.01, 2)
    gui.addColor(controlObject, 'color')
  }

  function render () {
    renderer.render(scene, camera)
    stats.update()
    pivotPoint.rotation.x += control.rotationSpeedX
    pivotPoint.rotation.y += control.rotationSpeedY
    mySphere.rotation.z += control.rotationWorld
    myCube.scale.set(control.scale, control.scale, control.scale)
    myColor = new THREE.Color(`rgb(${Math.round(Math.random()*control.color.r)}, ${Math.round(Math.random()*control.color.g)}, ${Math.round(Math.random()*control.color.g)})`)
    // myColor = new THREE.Color(`rgb(${Math.round(control.color.r)}, ${Math.round(control.color.g)}, ${Math.round(control.color.b)})`)
    myCube.material.color = myColor
    requestAnimationFrame(render)
  }

  function createCube () {
    const geometry = new THREE.BoxGeometry(
      1,
      1,
      1
    )
    const material = new THREE.MeshNormalMaterial()
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(1, 5, 1)
    cube.castShadow = true

    return cube
  }

  function createSpotLight (color) {
    const spotLight = new THREE.SpotLight(color)
    spotLight.position.set(10, 50, -35)
    spotLight.castShadow = true
    spotLight.shadowMapWidth = 512 * q; // default is 512
    spotLight.shadowMapHeight = 512 * q; // default is 512

    return spotLight
  }

  function createSphere () {
    // geometry
    let geometry = new THREE.SphereGeometry(3, 10, 10)
    // material
    let material = new THREE.MeshNormalMaterial({
      wireframe: true
    })

    let sphere = new THREE.Mesh(geometry, material)
    sphere.castShadow = true
    sphere.receiveShadow = true
    return sphere
  }

  function createPlane () {
    const geometry = new THREE.PlaneGeometry(20, 20)
    const material = new THREE.MeshLambertMaterial({
      color: 0xcccccc
    })
    const plane = new THREE.Mesh(geometry, material)
    plane.receiveShadow = true

    plane.rotation.x = -0.5 * Math.PI
    plane.position.y = -2

    return plane
  }
}

function createStats () {
  let stats = new Stats()

  stats.setMode(0)
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.left = '0'
  stats.domElement.style.top = '0'

  return stats
}

window.onload = init()