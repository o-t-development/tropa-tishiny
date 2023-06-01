import { GameObject } from "./GameObject.js";

export class GroundEdge extends GameObject {
  constructor(obj) {
    super(obj);
    this.isDisplayed = false;
    this.objects = [];
  }

  onCollision(obj) {
    this.objects.push(obj);
    // obj.isOnTheGround = false;
  }
}
