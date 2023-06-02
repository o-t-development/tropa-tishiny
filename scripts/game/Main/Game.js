import { animate } from "../../forAnimatedProject/animate.js";
import { GameObject } from "../Objects/GameObject.js";
import { GroundEdge } from "../Objects/GroundEdge.js";
import { Collider } from "../Physics/Collider.js";
import { Force } from "../Physics/Force.js";
import { Camera } from "../Utils/Camera.js";
import { getMap } from "../Utils/map.js";

export function StartGame(data, ctx, screen) {
  if (data.isJustCreated) {
    data.setPlayer(
      new GameObject({
        x: 10,
        y: 756,
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
  }

  data.setAdditionalObject("camera", new Camera());
  data.getAdditionalObject("camera").setModifiers(500, screen.height - 300);
  data.getAdditionalObject("camera").setFocus(data.getPlayer());
  data.setForces(
    "absolute",
    new Force({
      type: "gravity",
      angle: Math.PI / 2,
      value: 0.8,
      maxSpeed: 160,
    })
  );

  let res = getMap(data);
  res.then(() => animate(data, 0, ctx, screen));
  // animate(data, 0, ctx, screen);
}
