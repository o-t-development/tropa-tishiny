let previousInput = [];

export function decodePlayerInput(input, controlledObject) {
  // input = [["command", true/false], ...]
  if (!controlledObject.isOnTheGround) return;
  if (input.length === 0) return;
  let action = input[input.length - 1];
  if (previousInput.length === 0 || !previousInput[1]) {
    previousInput = [...action];
  }
  if (action[1]) {
    if (controlledObject.isStopping) controlledObject.isStopping = false;
    executeCommand(action[0], controlledObject);
  } else if (previousInput[1] && action[0] !== previousInput[0]) {
    executeCommand(previousInput[0], controlledObject);
  } else {
    previousInput = [...action];
    controlledObject.movement.x = 0;
    controlledObject.movement.y = 0;
    if (!controlledObject.isStopping)
      controlledObject.isAccelerationSet = false;
    controlledObject.isStopping = true;
  }
  return input;
}

function executeCommand(command, object) {
  switch (command) {
    case "move_left":
      object.movement.x = -1;
      break;
    case "move_right":
      object.movement.x = 1;
      break;
    case "move_up":
      object.movement.y = -1;
      break;
    case "move_down":
      object.movement.y = 1;
      break;
  }
}
