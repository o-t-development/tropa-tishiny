export class Collider {
  constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0, isSolid = true) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.isSolid = isSolid;
  }

  isColliding(collider) {
    if (
      this.x1 <= collider.x2 &&
      this.x2 >= collider.x1 &&
      this.y1 <= collider.y2 &&
      this.y2 >= collider.y1
    )
      return true;
    else return false;
  }
}
