import { getAllKeys } from "../game/Data/keyInfo.js";

let inputs = [];
let time = 0,
  lastTime = null;
let keys = getAllKeys();

document.addEventListener("keydown", (e) => {
  if (!keys.hasOwnProperty(e.code)) return;
  e.preventDefault();
  // keys[e.code].isPressed = true;
  // time = Date.now() - lastTime;
  // inputs.push([keys[e.code].action, keys[e.code].isPressed, time]);
  inputs.push([keys[e.code].action, true]);
  // lastTime = Date.now();
});

document.addEventListener("keyup", (e) => {
  if (!keys.hasOwnProperty(e.code)) return;
  e.preventDefault();
  // keys[e.code].isPressed = false;
  // time = Date.now() - lastTime;
  // inputs.push([keys[e.code].action, keys[e.code].isPressed, time]);
  inputs.push([keys[e.code].action, false]);
  // lastTime = Date.now();
});

export function getUserInput() {
  let lastInput = [...inputs];
  inputs = [];
  return lastInput;
}

export function setTime(newTime = null) {
  lastTime = newTime || Date.now();
}

setTime();
