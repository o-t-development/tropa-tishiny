export function findControlledObject(objects) {
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].isUnderPlayerControl) return objects[i];
    }
}