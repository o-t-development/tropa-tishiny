export function move(object, time, TIME_PERIOD, previousTime) {
  let period = (time - previousTime) / TIME_PERIOD;
  // if (object.speed.x > object.maxSelfSpeed) debugger;
  if (
    (object.movement.blocked.x[0] && object.movement.x < 0) ||
    (object.movement.blocked.x[1] && object.movement.x > 0) ||
    (object.movement.blocked.y[0] && object.movement.y < 0) ||
    (object.movement.blocked.y[1] && object.movement.y > 0)
  )
    return;
  if (!object.isStopping) {
    // Standart movement
    if (!object.isAccelerationSet) {
      object.acceleration.x = object.minSelfAcceleration * object.movement.x;
      object.acceleration.y = object.minSelfAcceleration * object.movement.y;
      object.isAccelerationSet = true;
    }

    if (
      object.isAccelerationSet &&
      (Math.sign(object.movement.x) !== Math.sign(object.acceleration.x) ||
        Math.sign(object.movement.y) !== Math.sign(object.acceleration.y))
    ) {
      if (object.movement.x !== 0) {
        object.acceleration.x = -object.acceleration.x;
        object.speed.x -= object.acceleration.x * period;
      }
      if (object.movement.y !== 0) {
        object.acceleration.y = -object.acceleration.y;
        object.speed.y -= object.acceleration.y * period;
      }
    }

    countSpeed(object, period, "x");
    countSpeed(object, period, "y");
    object.collider.setPosition(
      object.position.x,
      object.position.y,
      object.position.x + object.size.width,
      object.position.y + object.size.height
    );
    // object.collider.x1 = object.position.x;
    // object.collider.y1 = object.position.y;
    // object.collider.x2 = object.position.x + object.size.width;
    // object.collider.y2 = object.position.y + object.size.height;
  } else {
    // Stop movement
    // if (!object.isAccelerationSet) {
    //   object.acceleration.x = object.minSelfAcceleration * (object.acceleration.x > 0 ? -1 : 1);
    //   object.acceleration.y = object.minSelfAcceleration * (object.acceleration.y > 0 ? -1 : 1);
    //   object.isAccelerationSet = true;
    // }
    if (object.movement.x !== 0 && object.movement.y !== 0) return;

    if (!object.isOnLastMove) {
      if (!object.isUnderForce) {
        if (Math.abs(object.speed.x) > 0)
          object.speed.x -= object.acceleration.x * period;
        if (Math.abs(object.speed.y) > 0)
          object.speed.y -= object.acceleration.y * period;
      }
      if (
        Math.abs(object.speed.x) > object.maxSelfSpeed ||
        Math.abs(object.speed.y) > object.maxSelfSpeed
      ) {
        object.speed.x =
          object.speed.x > 0 ? object.maxSelfSpeed : -object.maxSelfSpeed;
        object.acceleration.x = -object.acceleration.x;
        object.speed.y =
          object.speed.y > 0 ? object.maxSelfSpeed : -object.maxSelfSpeed;
        object.acceleration.y = -object.acceleration.y;
      }
    } else {
      object.speed.x = 0;
      object.speed.y = 0;
      object.isOnLastMove = false;
      object.isAccelerationSet = false;
      object.isStopping = false;
    }
    if (
      (Math.abs(object.speed.x) < Math.abs(object.acceleration.x * period) &&
        object.speed.x !== 0) ||
      (Math.abs(object.speed.y) < Math.abs(object.acceleration.y * period) &&
        object.speed.y !== 0)
    )
      object.isOnLastMove = true;

    object.position.x += object.speed.x * period;
    object.position.y += object.speed.y * period;

    object.collider.setPosition(
      object.position.x,
      object.position.y,
      object.position.x + object.size.width,
      object.position.y + object.size.height
    );
    // object.collider.x1 = object.position.x;
    // object.collider.y1 = object.position.y;
    // object.collider.x2 = object.position.x + object.size.width;
    // object.collider.y2 = object.position.y + object.size.height;
  }
}

function countSpeed(object, period, axis) {
  if (Math.abs(object.speed[axis]) < object.speed.max) {
    object.speed[axis] += object.acceleration[axis] * period;
  }
  if (Math.abs(object.speed[axis]) > object.speed.max) {
    object.speed[axis] =
      object.speed.max * (object.acceleration[axis] > 0 ? 1 : -1); //object.movement[axis];
  }
  object.position[axis] += object.speed[axis] * period;
}
