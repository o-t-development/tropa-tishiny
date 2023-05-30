import { getUserInput } from "./getUserInput.js";
import { render } from "./render.js";
import { update } from "./update.js";

let lastInput = [];

export function animate(data, time, ctx, screen) {
  lastInput = getUserInput();
  data = update(data, time, lastInput);
  render(data, time, ctx, screen);
  requestAnimationFrame((time) => animate(data, time, ctx, screen));
}
