export function checkCollisions(data) {
  // console.log(data.getPlayer().position.x, data.getPlayer().position.y);
  let moveableObjs = data.getMoveableObjects();
  let obstackles = data.getObstackles();
  let waiters = [];
  for (let i in moveableObjs) {
    if (!moveableObjs.hasOwnProperty(i)) continue;
    moveableObjs[i].forEach((obj) => {
      if (obj.isWaitingCollisionChkEnd && waiters.indexOf(obj) < 0) {
        waiters.push(obj);
      }
      obj.movement.blocked = {
        x: [false, false],
        y: [false, false],
      };
      obstackles.forEach((obstackle) => {
        if (
          obstackle.isWaitingCollisionChkEnd &&
          waiters.indexOf(obstackle) < 0
        ) {
          waiters.push(obstackle);
        }
        if (obj.collider.isColliding(obstackle.collider)) {
          if (obj.isUnderPlayerControl && obstackle.collider.isSolid)
            data.getAdditionalObject("camera").moveFrame(data.getPlayer());
          executeCollision("x", obj, obstackle);
          executeCollision("y", obj, obstackle);
        }
      });
    });
  }

  waiters.forEach((waiter) => waiter.onCollisionChkEnd());
  return null;
}

function executeCollision(axis, obj, obstackle) {
  obj.onCollision(obstackle);
  obstackle.onCollision(obj);
  if (!obstackle.collider.isSolid) return;
  obstackle = obstackle.collider;
  if (axis === "y" && obj.movement.y > 0) obj.isOnTheGround = true;
  obj.movement.blocked[axis][obj.movement[axis] > 0 ? 1 : 0] = true;
  let min = Math.abs(obj.collider.x2 - obstackle.x1);
  let a = "x";
  let direction = -1;
  if (min >= Math.abs(obj.collider.x1 - obstackle.x2)) {
    min = Math.abs(obj.collider.x1 - obstackle.x2);
    direction = 1;
  }
  if (min >= Math.abs(obj.collider.y2 - obstackle.y1)) {
    min = Math.abs(obj.collider.y2 - obstackle.y1);
    a = "y";
    direction = -1;
  }
  if (min >= Math.abs(obj.collider.y1 - obstackle.y2)) {
    min = Math.abs(obj.collider.y1 - obstackle.y2);
    a = "y";
    direction = 1;
  }
  obj.position[a] += (min + 1) * direction;

  obj.collider.setPosition(
    obj.position.x,
    obj.position.y,
    obj.position.x + obj.size.width,
    obj.position.y + obj.size.height
  );
  obj.speed[axis] = 0;
  obj.isOnLastMove = false;
  obj.isAccelerationSet = false;
  obj.isStopping = false;
}
