import { animate } from "../../forAnimatedProject/animate.js";
import { GameObject } from "../Objects/GameObject.js";
import { GroundEdge } from "../Objects/GroundEdge.js";
import { Collider } from "../Physics/Collider.js";
import { Force } from "../Physics/Force.js";
import { Camera } from "../Utils/Camera.js";
import { getMap } from "../Utils/map.js";
const bg_0_Src = "../../../references/фон игры 3 (первый слой).png";
const bg_01_Src = "../../../references/фон игры 3 (второй слой).png";
const bg_02_Src = "../../../references/фон игры 3 (третий слой).png";
const bg_03_Src = "../../../references/фон игры 3 (четвёртый слой).png";
const bg_04_Src = "../../../references/фон игры 3 (пятый слой).png";

const bgImageHeight = 950,
  index = 2.82258064;

export function StartGame(data, ctx, screen) {
  if (data.isJustCreated) {
    data.setPlayer(
      new GameObject({
        x: 10,
        y: 716,
        width: 64,
        height: 128,
        isUnderPlayerControl: true,
        maxSelfSpeed: 3, //3 -- ходьба, 5 -- бег
      })
    );
    let player = data.getPlayer();
    player.setCollider(
      new Collider({
        x1: player.position.x,
        y1: player.position.y,
        x2: player.position.x + player.size.width,
        y2: player.position.y + player.size.height,
        biasY: 90,
      })
    );
    let object = new GroundEdge({
      x: 0,
      y: 800,
      width: 1000,
      height: 120,
      color: "#58070d",
    });
    object.setCollider(
      new Collider({
        x1: object.position.x,
        y1: object.position.y,
        x2: object.position.x + object.size.width,
        y2: object.position.y + object.size.height,
        isSolid: false,
      })
    );
    let obstackle = new GameObject({
      x: 800,
      y: 800,
      width: 10,
      height: 120,
      color: "#00FF00",
    });
    obstackle.setCollider(
      new Collider({
        x1: obstackle.position.x,
        y1: obstackle.position.y,
        x2: obstackle.position.x + obstackle.size.width,
        y2: obstackle.position.y + obstackle.size.height,
      })
    );
    data.setObstackles(object, obstackle);
    data.setStaticObjects(1, object, obstackle);
  }

  data.setAdditionalObject("camera", new Camera());
  data.getAdditionalObject("camera").setModifiers(500, screen.height - 300);
  data.getAdditionalObject("camera").setFocus(data.getPlayer());

  // data.setStaticObjects(0, getMap());

  data.setForces(
    "absolute",
    new Force({
      type: "gravity",
      angle: Math.PI / 2,
      value: 0.008,
      maxSpeed: 160,
    })
  );

  let bg_0 = new Image(),
    bg_1 = new Image(),
    bg_2 = new Image(),
    bg_3 = new Image(),
    bg_4 = new Image();
  bg_1.src = bg_01_Src;
  bg_0.src = bg_0_Src;
  bg_3.src = bg_03_Src;
  bg_4.src = bg_04_Src;
  bg_2.src = bg_02_Src;
  bg_0.onload = () => {
    data.setStaticObjects(
      0,
      new GameObject({
        x: 0,
        y: 0,
        width: bgImageHeight * index,
        height: bgImageHeight,
        color: bg_4,
        paralax: 6,
      }),
      new GameObject({
        x: 0,
        y: 0,
        width: bgImageHeight * index,
        height: bgImageHeight,
        color: bg_3,
        paralax: 4,
      }),
      new GameObject({
        x: 0,
        y: 0,
        width: bgImageHeight * index,
        height: bgImageHeight,
        color: bg_2,
        paralax: 2,
      }),
      new GameObject({
        x: 0,
        y: 0,
        width: bgImageHeight * index,
        height: bgImageHeight,
        color: bg_1,
        paralax: 1,
      })
      // new GameObject({
      //   x: -500,
      //   y: 0,
      //   width: 500,
      //   height: bgImageHeight,
      //   color: "#000000",
      //   paralax: 1,
      // })
    );
    data.setStaticObjects(
      3,
      new GameObject({
        x: 0,
        y: 0,
        width: bgImageHeight * index,
        height: bgImageHeight,
        color: bg_0,
        paralax: 0.8,
      })
    );
    animate(data, 0, ctx, screen);
  };
}
