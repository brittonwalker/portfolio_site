import * as THREE from 'three';
import Environment from './Environment';

export default class World {
  constructor(experience) {
    this.experience = experience;
    this.scene = this.experience.scene;

    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial()
    );
    this.scene.add(testMesh);
    this.environment = new Environment(this.experience);
  }
}
