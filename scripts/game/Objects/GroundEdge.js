import { GameObject } from "./GameObject.js";

export class GroundEdge extends GameObject {
  constructor(obj) {
    super(obj);
    // this.isDisplayed = false;
    this.isWaitingCollisionChkEnd = true;
    this.prevObjects = [];
    this.objects = [];
  }

  onCollision(obj) {
    if (this.objects.indexOf(obj) < 0) this.objects.push(obj);
    // obj.isOnTheGround = false;
  }

  onCollisionChkEnd() {
    if (this.prevObjects.length === 0) {
      this.prevObjects = [...this.objects];
    } else {
      for (let i = 0; i < this.prevObjects.length; i++) {
        console.log("G");
        if (this.objects.indexOf(this.prevObjects[i]) < 0)
          this.prevObjects[i].isOnTheGround = false;
        this.prevObjects.splice(i, 1);
        i--;
      }
    }
    this.objects = [];
  }
}
