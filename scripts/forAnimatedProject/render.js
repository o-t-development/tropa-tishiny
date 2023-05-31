import { clear, drawRect } from "../utils/mainCanvasUtils.js";

export function render(data, time, ctx, screen) {
  clear(ctx, screen);
  let camera = data.getAdditionalObject("camera");
  data.getStaticObjects("layer0")[0].forEach((line, x) => {
    line.forEach((value, y) => {
      if (value === 1)
        drawRect(
          {
            x: x * 64 + 12 + camera.position.x,
            y: y * 64 + 12 + camera.position.y,
            w: 52,
            h: 52,
            color: "#000000",
          },
          ctx
        );
    });
  });
  let staticObjs = data.getStaticObjects();
  for (let i = 1; i < data.getLayersCount(); i++) {
    if (!staticObjs[`layer${i}`]) continue;
    staticObjs[`layer${i}`].forEach((object) =>
      drawRect(
        {
          x: object.position.x + camera.position.x,
          y: object.position.y + camera.position.y,
          ...object.texture,
        },
        ctx
      )
    );
  }
  let moveable = data.getMoveableObjects();
  for (let i = 0; i < data.getLayersCount(); i++) {
    if (!moveable[`layer${i}`]) continue;
    moveable[`layer${i}`].forEach((object) =>
      drawRect(
        {
          x: object.position.x + camera.position.x,
          y: object.position.y + camera.position.y,
          ...object.texture,
        },
        ctx
      )
    );
  }
}
