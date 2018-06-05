import * as THREE from 'three'

class Army {
  constructor (type) {
    this.type = type | 'normal'
    this.ennemiesQuantity = 20

    // to set ennmies grid
    this.ennemiesWidth = 25
    let cols = 8
    let rows = Math.ceil(this.ennemiesQuantity / cols)
    let modul = this.ennemiesQuantity % cols

    this.armyW = this.ennemiesWidth * cols - this.ennemiesWidth

    //Ennemies Container
    this.enemmiesBag = []
    
    this.army = new THREE.Group()


    console.log(this.armyW)

    this.army.position.set(-1 * this.armyW, 10, 0)

    for (let y = 0; y < rows; y++) {
      let ll = y === rows - 1 ? modul : 0
      for (let x = 0; x < (cols)- (ll); x++) {
        console.log('hi')
        let singleEnemmie = new Enemmies(this.ennemiesWidth)
        let size = singleEnemmie.size
        singleEnemmie.body.position.set(x*size.w*2, y*size.h*2, 0)
        this.army.add(singleEnemmie.body)
      }
    }
    
  }
}

class Enemmies {
  constructor (ennemiesWidth) {
    this.size = {w: ennemiesWidth, h:14}
    let geometry = new THREE.CubeGeometry(this.size.w, this.size.h, 4)
    let material = new THREE.MeshBasicMaterial({
      color: 0x3498fc
    })
    this.body = new THREE.Mesh(geometry, material)
  }
}



export { Enemmies, Army }