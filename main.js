// import { animate, drawOnScreen } from "./scripts/mainCanvasFunctions.js";
import { animate } from "./scripts/forAnimatedProject/animate.js";
import { StartGame } from "./scripts/game/Main/Game.js";

const screen = document.getElementById("screen");
const ctx = screen.getContext("2d");

//setting width & height
const width = window.innerWidth,
  height = window.innerHeight;
screen.width = width;
screen.height = height;

//some functions
function initiate(data = null) {
  if (data && !Array.isArray(data) && data.hasOwnProperty('effects')) {
    return data
  } else {
    return {
      effects: [],
      objects: [],
      map: [],
    }
  }
}

//calling functions
let data = initiate();
StartGame(data, ctx, screen);