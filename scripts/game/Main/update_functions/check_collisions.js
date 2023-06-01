export function checkCollisions(data) {
  let moveableObjs = data.getMoveableObjects();
  let obstackles = data.getObstackles();
  for (let i in moveableObjs) {
    if (!moveableObjs.hasOwnProperty(i)) continue;
    moveableObjs[i].forEach((obj) => {
      obj.movement.blocked = {
        x: [false, false],
        y: [false, false],
      };
      obstackles.forEach((obstackle) => {
        if (obj.collider.isColliding(obstackle.collider)) {
          if (obj.movement.x !== 0)
            executeCollision("x", obj, obstackle.collider);
          if (obj.movement.y !== 0)
            executeCollision("y", obj, obstackle.collider);
        }
      });
    });
  }
  return null;
}

function executeCollision(axis, obj, obstackle) {
  obj.onCollision(obstackle);
  obstackle.onCollision(obj);
  obj.movement.blocked[axis][obj.movement[axis] > 0 ? 1 : 0] = true;
  obj.position[axis] =
    obj.movement[axis] > 0 ? obstackle.x1 - obj.size.width : obstackle.x2;
  obj.collider.x1 = obj.position.x;
  obj.collider.y1 = obj.position.y;
  obj.collider.x2 = obj.position.x + obj.size.width;
  obj.collider.y2 = obj.position.y + obj.size.height;
  obj.speed[axis] = 0;
  obj.isOnLastMove = false;
  obj.isAccelerationSet = false;
  obj.isStopping = false;
}
