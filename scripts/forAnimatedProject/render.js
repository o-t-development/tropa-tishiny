import { clear, drawRect } from "../utils/mainCanvasUtils.js";

export function render(data, time, ctx, screen) {
  clear(ctx, screen);
  data.map.forEach((line, x) => {
    line.forEach((value, y) => {
      if (value === 1) drawRect({
        x: x * 64 + 12 + data.camera.position.x,
        y: y * 64 + 12 + data.camera.position.y,
        w: 52, h: 52, color: '#000000'
      }, ctx);
    })
  })
  data.objects.forEach(object => drawRect({
    x: object.position.x + data.camera.position.x,
    y: object.position.y + data.camera.position.y,
    ...object.texture
  }, ctx));
}
