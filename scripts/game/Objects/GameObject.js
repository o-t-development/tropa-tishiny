export class GameObject {
  constructor({
    x = 0,
    y = 0,
    width = 64,
    height = 64,
    weight = 1,
    maxSelfSpeed = 10,
    isDestructable = false,
    isCollidable = true,
    isUnderPlayerControl = false,
    maxSelfAcceleration = 3,
    minSelfAcceleration = 1,
    color = "#0000FF",
    paralax = 1,
  }) {
    //parameters
    this.position = { x, y };
    this.size = { width, height };
    this.weight = weight;
    this.speed = {
      x: 0,
      y: 0,
      max: 0,
    };
    this.acceleration = {
      x: 0,
      y: 0,
    };
    this.movement = {
      x: 0, //1, 0, -1
      y: 0, //1, 0, -1
      blocked: {
        x: [false, false],
        y: [false, false],
      },
    };
    //properties
    this.isDestructable = isDestructable;
    this.isCollidable = isCollidable;
    this.isDisplayed = true;
    this.isWaitingCollisionChkEnd = false;

    this.paralax = paralax;

    //flags
    this.isUnderPlayerControl = isUnderPlayerControl;
    this.isUnderForce = false;
    this.isStopping = false;
    this.isOnLastMove = false;
    this.isAccelerationSet = false;
    this.isOnTheGround = false;

    //constants
    this.maxSelfSpeed = maxSelfSpeed;
    this.maxSelfAcceleration = maxSelfAcceleration;
    this.minSelfAcceleration = minSelfAcceleration;

    //textures
    this.texture = {
      color,
      w: width,
      h: height,
      filled: true,
    };
  }

  setCollider(collider) {
    this.collider = collider;
  }
  onCollision(obj) {}
  onCollisionChkEnd() {}
}
