'use strict'
import * as THREE from "three"
import yo from "yo-yo"
import { Ship, Bullet } from "./objects/ship"
import { Enemmies, Army } from "./objects/ennemies"

// World
var renderer, scene, camera
// stars and ship
var stars, ship, mx
// bullets
var bulletSpace = 0
var maxBulletBag = 10
var bulletBag = new Array(maxBulletBag)
// Enemies
var ennemies

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

    setTimeout(() => {
      this.createEnemmies()
    }, 500);
    
    this.animation = this.startAnimation()
  }

  conf () {
    camera.position.set( 0, 0, 400 );
    camera.lookAt(0, 0, 0)
  }

  createEnemmies () {
    // un grupo de enemigos
    // se mueven en conjunto
    // cuadricula x * x
    ennemies = new Army()
    scene.add(ennemies.army)
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


document.addEventListener('keyup', (e) => {
  if (e.code != "Space") return
  bulletSpace = bulletSpace > maxBulletBag - 1 ? 0: bulletSpace
  let position = ship.getPosition()
  let bullet = new Bullet(position)
  scene.add(bullet.body)

  if (bulletBag[bulletSpace]) {
    scene.remove(bulletBag[bulletSpace].body)
  }
  bulletBag[bulletSpace] = bullet
  bulletSpace += 1
})

function animate () {
  renderer.render(scene, camera)
  ship.plane(mx)
  // console.log(bullets)

  if (bulletBag.length > 0) {
    for(let i = 0; i < bulletBag.length; i++) {
      if (bulletBag[i]) {
        bulletBag[i].forward()
        bulletBag[i].detectCollision()
      }
    }
  }

  return requestAnimationFrame(animate)
}

let myWorld = new World(true)
