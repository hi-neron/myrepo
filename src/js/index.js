'use strict'
import * as THREE from "three"
import yo from "yo-yo"
import { Cube } from "./objects/cube"

var renderer, scene, camera, stars

function rnd(max, min = 0) {
  return Math.random() * (max - min) + min
}

class Star {
  constructor (max) {
    // width = window.innerWidth
    // height = window.innerHeight

    this.max = max
    this.x = rnd(max) - max / 2
    this.y = rnd(max) - max / 2
    this.z = -100

    
    this.history = []
    
    this.size = rnd(3.9)
    this.speed = 4 - this.size
    this.historySize = Math.floor(this.speed * 10)

    let geometry = new THREE.DodecahedronGeometry(this.size, 1)
    let material = new THREE.MeshBasicMaterial({
      color: 0x0
    })

    this.star = new THREE.Group()

    let d = 1 / this.historySize
    let opacity = 1 - d
    
    for (let i = 0; i < this.historySize; i++) {
      let materialS = new THREE.MeshLambertMaterial({
        color: 0x0
      })

      let shadowH = new THREE.Mesh(geometry, materialS)
      shadowH.geometry.translate(.01, 0, 0)
      shadowH.position.set(this.x, this.y, this.z - i * this.speed)
      this.history.push(shadowH)
      this.star.add(shadowH)
    }

    this.main = new THREE.Mesh(geometry, material)
    this.star.add(this.main)

    this.star.position.set(this.x, this.y, this.z)
  }
  
  update () {
    this.z += this.speed
    this.star.position.set(this.x, this.y, this.z)

    for (let i = 0; i < this.history.length; i++) {
      this.history[i].rotateZ((i * 0.01))
    }

    if(this.z > 800) {
      this.z = -100
      this.x = rnd(this.max) - this.max / 2
      this.y = rnd(this.max) - this.max / 2
    }
  }
}

class World {
  constructor () {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.initBackColor = 0xffffff
    
    let container = yo`
    <div className="game">
    </div>
    `
    // main conf
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera( 45, this.width / this.height, 1, 1000 )
    renderer = new THREE.WebGLRenderer({alpha: true, antialias:true})
    renderer.setPixelRatio( window.devicePixelRatio)
    
    // change background COlor
    renderer.setClearColor(this.initBackColor, 0)
    this.conf ()

    container.appendChild(renderer.domElement)
    document.body.appendChild(container)
    
    renderer.setSize(this.width, this.height)

    this.initStarField()
    
    this.animation = this.startAnimation()
  }

  initStarField() {
    let quantity = 200
    let size = 100
    stars = []

    for( let i = 0; i < quantity; i++) {
      let one = new Star(size)
      scene.add(one.star)
      stars.push(one)
    }
  }

  conf () {
    camera.position.set( 0, 0, 400 );
    // camera.rotation.order = 'YXZ';
    // camera.rotation.y = - Math.PI / 4;
    // camera.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) );
    scene.fog = new THREE.Fog(0xffffff, 0.0025, 370);
    camera.lookAt(0, 0, 0)
  }

  startAnimation () {
    this.animation = animate()
  }
} 

function animate () {
  renderer.render(scene, camera)
  stars.map((star) => {
    star.update()
  })
  return requestAnimationFrame(animate)
}

let myWorld = new World(true)
