import { checkCollisions } from "../game/Main/update_functions/check_collisions.js";
import { decodePlayerInput } from "../game/Main/update_functions/decode_player_input.js";
import { findControlledObject } from "../game/Main/update_functions/find_object.js";
import { move } from "../game/Main/update_functions/move.js";

let previousTime = 0;
const TIME_PERIOD = 10, ACCELERATION_TIMES = 13, GRAVITY = 9;
let controlledObject = null;
let isControlledObjectChanged = false,
  log = true,
  lastInput = [null, false];

export function update(data = null, time = 0, input) {
  if (!controlledObject || isControlledObjectChanged) controlledObject = findControlledObject(data.objects);
  lastInput = decodePlayerInput(input, controlledObject);
  checkCollisions(data);
  data.objects.forEach(object => {
    if (object.movement.x !== 0 || object.movement.y !== 0 || object.isStopping) move(object, time, TIME_PERIOD, previousTime);
    else if (log) {
      // Some logs
      log = false;
    }
  });
  previousTime = time;
  data.camera.setFocus(data.objects[0]);
  return data;
}