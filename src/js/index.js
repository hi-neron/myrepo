'use strict'
import * as THREE from "three"
import yo from "yo-yo"
import { Ship, Bullet } from "./objects/ship"
import { Enemmies } from "./objects/ennemies"

var renderer, scene, camera, stars, ship, mx

function rnd(max, min = 0) {
  return Math.random() * (max - min) + min
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
    
    renderer.setClearColor(this.initBackColor, 0)
    this.conf ()

    container.appendChild(renderer.domElement)
    document.body.appendChild(container)
    
    renderer.setSize(this.width, this.height)

    // create a ship
    this.createShip()
    // create array with ennemies
    
    this.animation = this.startAnimation()
  }

  conf () {
    camera.position.set( 0, 0, 400 );
    camera.lookAt(0, 0, 0)
  }

  createShip () {
    ship = new Ship()
    scene.add(ship.vehicle)
  }

  startAnimation () {
    this.animation = animate()
  }
} 

document.addEventListener('mousemove', (e) => {
  mx = e.clientX
})

function animate () {
  renderer.render(scene, camera)
  ship.animation(mx)
  return requestAnimationFrame(animate)
}

let myWorld = new World(true)
