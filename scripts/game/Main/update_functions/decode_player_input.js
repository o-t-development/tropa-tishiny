export function decodePlayerInput(input, controlledObject) {
    if (input.length === 0) return;
    let action = input[input.length - 1];
    if (action[1]) {
        if (controlledObject.isStopping) controlledObject.isStopping = false;
        switch (action[0]) {
            case 'move_left':
                controlledObject.movement.x = -1; break;
            case 'move_right':
                controlledObject.movement.x = 1; break;
        }
    } else {
        controlledObject.movement.x = 0;
        if (!controlledObject.isStopping) controlledObject.isAccelerationSet = false;
        controlledObject.isStopping = true;
    }
    return input;
}