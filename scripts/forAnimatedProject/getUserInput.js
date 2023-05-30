import { getAllKeys } from "../game/Data/keyInfo.js";

let inputs = [];
let time = 0, lastTime = null;
let keys = getAllKeys();

document.addEventListener("keydown", (e) => {
    if (!keys.hasOwnProperty(e.code)) return;
    e.preventDefault();
    e.stopPropagation();
    keys[e.code].isPressed = true;
    inputs.push([keys[e.code].action, keys[e.code].isPressed]);
    time = Date.now() - lastTime;
    lastTime = Date.now();
});

document.addEventListener("keyup", (e) => {
    if (!keys.hasOwnProperty(e.code)) return;
    e.preventDefault();
    e.stopPropagation();
    keys[e.code].isPressed = false;
    inputs.push([keys[e.code].action, keys[e.code].isPressed]);
    time = Date.now() - lastTime;
    lastTime = Date.now();
});

export function getUserInput() {
    let lastInput = [...inputs]
    inputs = [];
    return lastInput;
}

export function setTime(newTime = null) {
    lastTime = newTime || Date.now();
}

setTime();