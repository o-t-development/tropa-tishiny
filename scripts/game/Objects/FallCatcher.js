import { GameObject } from "./GameObject.js";

export class FallCatcher extends GameObject {
  constructor(data) {
    super(data);
    this.isDisplayed = false;
  }
  onCollision(obj) {
    console.log("FALL");
    window.location.reload();
  }
}
