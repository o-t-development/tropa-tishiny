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
              x: object.position.x + camera.position.x / object.paralax,
              y: object.position.y + camera.position.y / object.paralax,
              ...object.texture,
            },
            ctx
          )
        : ctx.drawImage(
            object.texture.color,
            object.position.x + camera.position.x / object.paralax,
            object.position.y + camera.position.y / object.paralax,
            object.size.width,
            object.size.height
          );

      if (!!object.collider) {
        drawRect(
          {
            x: object.collider.x1 + camera.position.x / object.paralax,
            y: object.collider.y1 + camera.position.y / object.paralax,
            w: object.collider.x2 - object.collider.x1,
            h: object.collider.y2 - object.collider.y1,
            filled: false,
          },
          ctx
        );
      }
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
  drawRect(
    {
      x:
        data.getAdditionalObject("camera").frame.position.x + camera.position.x,
      y:
        data.getAdditionalObject("camera").frame.position.y + camera.position.y,
      w: data.getAdditionalObject("camera").frame.size.width,
      h: data.getAdditionalObject("camera").frame.size.height,
      color: "#FF0000",
      filled: false,
    },
    ctx
  );
}
