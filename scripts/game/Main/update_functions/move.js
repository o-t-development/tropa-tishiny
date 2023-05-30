export function move(object, time, TIME_PERIOD, previousTime) {
    let period = (time - previousTime) / TIME_PERIOD;
    if (object.speed.x > object.maxSelfSpeed) debugger;
    if (!object.isStopping) {

        // Standart movement
        if (!object.isAccelerationSet) {
            object.acceleration.x = object.minSelfAcceleration * object.movement.x;
            object.acceleration.y = object.minSelfAcceleration * object.movement.y;
            object.isAccelerationSet = true;
        }
        countSpeed(object, period, 'x');
        countSpeed(object, period, 'y');

    } else {

        // Stop movement
        // if (!object.isAccelerationSet) {
        //   object.acceleration.x = object.minSelfAcceleration * (object.acceleration.x > 0 ? -1 : 1);
        //   object.acceleration.y = object.minSelfAcceleration * (object.acceleration.y > 0 ? -1 : 1);
        //   object.isAccelerationSet = true;
        // }

        if (!object.isOnLastMove) {
            object.speed.x -= object.acceleration.x * period;
            if (Math.abs(object.speed.x) > object.maxSelfSpeed) {
                object.speed.x = object.speed.x > 0 ? object.maxSelfSpeed : -object.maxSelfSpeed;
                object.acceleration.x = -object.acceleration.x
            };

        } else {
            object.speed.x = 0;
            console.log('object.speed.x: ', object.speed.x);
            object.isOnLastMove = false;
            object.isAccelerationSet = false;
            object.isStopping = false;
        }
        if (Math.abs(object.speed.x) < Math.abs(object.acceleration.x * period) && object.speed.x !== 0) object.isOnLastMove = true;

        object.position.x += object.speed.x * period;
        object.position.y += object.speed.y * period;
    }
}

function countSpeed(object, period, axis) {
    if (object.speed[axis] < object.maxSelfSpeed) object.speed[axis] += object.acceleration[axis] * period;
    if (Math.abs(object.speed[axis]) > object.maxSelfSpeed) object.speed[axis] = object.maxSelfSpeed * object.movement[axis];
    object.position[axis] += object.speed[axis] * period;
}