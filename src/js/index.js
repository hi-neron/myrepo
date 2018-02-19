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
  const scene = new THREE.Scene()
  const renderer = new THREE.WebGLRenderer()
  const stats = createStats()

  let control

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

  document.body.appendChild(renderer.domElement)

  var mergedGeometry = new THREE.Geometry()
  control = new function () {
    this.numberToAdd = 8000
  }

  for(var i = 0; i < control.numberToAdd; i++) {
    var cubeGeometry = new THREE.BoxGeometry(4 * Math.random, 4 * Math.random, 4 * Math.random)
    var translation = new THREE.Matrix4().makeTranslation(
      100*Math.random() - 50,
      0, 100*Math.random() - 50
    )
    cubeGeometry.applyMatrix(translation)
    mergedGeometry.merge(cubeGeometry)
  }

  var mesh = new THREE.Mesh(mergedGeometry, new THREE.MeshNormalMaterial({
    opacity: 0.5,
    transparent: true
  }))

  scene.add(mesh)

  addControls(control)
  render()

  function addControls (controlObject) {
    let gui = new dat.GUI();
    gui.add(controlObject, 'numberToAdd', -0.1, 40)
  }

  function render () {
    renderer.render(scene, camera)
    stats.update()
    requestAnimationFrame(render)
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