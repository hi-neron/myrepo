import * as THREE from "three"

class Ship {
  constructor () {
    let boxWidth = 12
    this.startPosition = boxWidth / 2
    let vehicleGeometry = new THREE.BoxGeometry(boxWidth, 20, 5)
    let vehicleMaterial = new THREE.MeshNormalMaterial()
    let body = new THREE.Mesh( vehicleGeometry, vehicleMaterial)
    this.vehicle = new THREE.Group()
    this.vehicle.position.set(this.startPosition, 1000, 0)
    this.vehicle.add(body)

    //balas
    this.bullets = []
  }

  plane (mx) {
    let width = window.innerWidth
    let scale = width / 2
    let distance = (mx - scale) + this.startPosition
    let max = (scale / 2) - 60
    let limited = distance * max / scale
    this.limitedMove = limited
    mx = mx | 0
    this.vehicle.position.set(limited, -120, 0)
  }

  getPosition () {
    let x = this.limitedMove
    return x
  }
}

class Bullet {
  constructor (position) {
    this.position = position
    this.color = 0x0
    let geometry = new THREE.SphereGeometry(5, 2)
    let material = new THREE.MeshBasicMaterial(
      {color: this.color}
    )

    this.body = new THREE.Mesh(geometry, material)
    this.body.position.set(this.position, -120, 0)
  }

  forward () {
    this.body.translateY(1)
  }
}

export { Ship, Bullet }