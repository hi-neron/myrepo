import * as THREE from "three"

class Ship {
  constructor () {
    let vehicleGeometry = new THREE.BoxGeometry(12, 20, 5)
    let vehicleMaterial = new THREE.MeshNormalMaterial()
    let body = new THREE.Mesh( vehicleGeometry, vehicleMaterial)
    this.vehicle = new THREE.Group()
    this.vehicle.position.set(0, 1000, 0)
    this.vehicle.add(body)
  }

  animation (mx) {
    let width = window.innerWidth
    mx = mx | 0
    let distance = mx - width / 2
    let max = 200

    console.log (distance)
    this.vehicle.position.set(distance, -120, 0)
  }
}

class Bullet {
  constructor () {
    
  }
}

export { Ship, Bullet }