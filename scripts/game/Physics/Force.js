export class Force {
  constructor({
    type = "absolute",
    angle = 0,
    value = 0,
    maxSpeed = 0,
    radius = 0,
  }) {
    this.type = type;
    this.angle = angle;
    this.value = value;
    this.radius = type === "relative" ? radius : null;
    this.maxSpeed = maxSpeed;
    this.x = value * Math.cos(angle);
    this.y = value * Math.sin(angle);
  }
}
