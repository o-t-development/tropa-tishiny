import { animate } from "../../forAnimatedProject/animate.js";
import { GameObject } from "../Objects/GameObject.js";
import { GroundEdge } from "../Objects/GroundEdge.js";
import { Collider } from "../Physics/Collider.js";
import { Force } from "../Physics/Force.js";
import { Camera } from "../Utils/Camera.js";
import { getMap } from "../Utils/map.js";
const bg_01_Src = "../../../references/photo_2023-05-31_21-47-44.jpg";
const front_Src = "../../../references/первый слой (фон игры).png";

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
      new Collider(
        player.position.x,
        player.position.y,
        player.position.x + player.size.width,
        player.position.y + player.size.height
      )
    );
    let object = new GroundEdge({
      x: 400,
      y: 800,
      width: 10,
      height: 40,
      color: "#58070d",
    });
    object.setCollider(
      new Collider(
        object.position.x,
        object.position.y,
        object.position.x + object.size.width,
        object.position.y + object.size.height,
        false
      )
    );
    data.setObstackles(object);
    data.setStaticObjects(1, object);
    data.setObstacles;
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
      value: 0.095,
      maxSpeed: 160,
    })
  );

  let bg_1 = new Image(),
    front = new Image();
  bg_1.src = bg_01_Src;
  front.src = front_Src;
  front.onload = () => {
    data.setStaticObjects(
      0,
      new GameObject({
        x: 0,
        y: 0,
        width: 1529,
        height: 1080,
        color: bg_1,
      })
    );
    data.setStaticObjects(
      3,
      new GameObject({
        x: 0,
        y: 0,
        width: 1529,
        height: 1080,
        color: front,
      })
    );
    animate(data, 0, ctx, screen);
  };
}
