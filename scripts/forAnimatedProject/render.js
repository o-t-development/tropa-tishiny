import { clear, drawRect } from "../utils/mainCanvasUtils.js";

export function render(data, time, ctx, screen) {
  clear(ctx, screen);
  let camera = data.getAdditionalObject("camera");
  // data.getStaticObjects("layer0")[0].forEach((line, x) => {
  //   line.forEach((value, y) => {
  //     if (value === 1)
  //       drawRect(
  //         {
  //           x: x * 64 + 12 + camera.position.x,
  //           y: y * 64 + 12 + camera.position.y,
  //           w: 52,
  //           h: 52,
  //           color: "#000000",
  //         },
  //         ctx
  //       );
  //   });
  // });
  // let staticObjs = data.getStaticObjects();

  let objsForRender = data.getObjectsToRender();
  for (let i = 0; i < data.getLayersCount(); i++) {
    // if (!objsForRender[`layer${i}`]) continue;
    objsForRender.forEach((object) => {
      if (!object.isDisplayed) return;
      typeof object.texture.color === "string"
        ? drawRect(
            {
              x: object.position.x + camera.position.x,
              y: object.position.y + camera.position.y,
              ...object.texture,
            },
            ctx
          )
        : ctx.drawImage(
            object.texture.color,
            object.position.x + camera.position.x,
            object.position.y + camera.position.y,
            object.size.width,
            object.size.height
          );
    });
  }
  // let moveable = data.getMoveableObjects();
  // for (let i = 0; i < data.getLayersCount(); i++) {
  //   if (!moveable[`layer${i}`]) continue;
  //   moveable[`layer${i}`].forEach((object) =>
  //     drawRect(
  //       {
  //         x: object.position.x + camera.position.x,
  //         y: object.position.y + camera.position.y,
  //         ...object.texture,
  //       },
  //       ctx
  //     )
  //   );
  // }
}
