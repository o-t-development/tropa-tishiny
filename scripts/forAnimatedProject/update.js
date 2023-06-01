import { checkCollisions } from "../game/Main/update_functions/check_collisions.js";
import { decodePlayerInput } from "../game/Main/update_functions/decode_player_input.js";
import { findControlledObject } from "../game/Main/update_functions/find_object.js";
import { move } from "../game/Main/update_functions/move.js";

let previousTime = 0;
const TIME_PERIOD = 10;
let log = true;

export function update(data = null, time = 0, input) {
  decodePlayerInput(input, data.getPlayer());
  checkCollisions(data);
  let objects = data.getMoveableObjects();
  let forces = data.getForces();

  for (let layer in objects) {
    objects[layer].forEach((object) => {
      // object.acceleration.x = 0;
      // object.acceleration.y = 0;
      object.speed.max = object.maxSelfSpeed;
      let forceAcceleration = { x: 0, y: 0 };
      forces.forEach((force) => {
        if (force.type === "gravity" && object.isOnTheGround) return;
        if (!object.isUnderForce) {
          object.isUnderForce = true;
          // object.isAccelerationSet = true;
        }
        forceAcceleration.x += force.x;
        forceAcceleration.y += force.y;
        if (object.speed.max < force.maxSpeed) {
          object.speed.max = force.maxSpeed;
        }
      });
      if (forceAcceleration.x > 0 || forceAcceleration.y > 0) {
        object.acceleration.x = forceAcceleration.x;
        object.acceleration.y = forceAcceleration.y;
      } else if (object.isUnderForce) {
        object.isUnderForce = false;
      }
      if (
        object.movement.x !== 0 ||
        object.movement.y !== 0 ||
        object.isStopping ||
        object.isUnderForce
      ) {
        move(object, time, TIME_PERIOD, previousTime);
      } else if (log) {
        // Some logs
        log = false;
      }
      // if (data.getPlayer().position.x > 1000)
      //   data.getPlayer().isOnTheGround = false;
    });
  }

  previousTime = time;
  data.getAdditionalObject("camera").setFocus(data.getPlayer());
  return data;
}
