import { mapInfo_1 } from "../Data/maps/map_01.js";
import { mapInfo_2 } from "../Data/maps/map_02.js";
import { FallCatcher } from "../Objects/FallCatcher.js";
import { GameObject } from "../Objects/GameObject.js";
import { GroundEdge } from "../Objects/GroundEdge.js";
import { Collider } from "../Physics/Collider.js";
import { MediaLoader } from "./Loader.js";

let maps = [mapInfo_1, mapInfo_2];

export function getMap(data) {
  let promises = [];
  for (let i = 0; i < maps.length; i++) {
    console.log("Promises >>>>");
    promises.push(prepareScreen(data, maps[i], i));
  }
  return Promise.all(promises);
}

function prepareScreen(data, mapInfo, index) {
  return new Promise((resolve, reject) => {
    const loader = new MediaLoader();
    let media = {};
    for (let i in mapInfo) {
      if (mapInfo.hasOwnProperty(i) && mapInfo[i].color[0] !== "#")
        media[i] = mapInfo[i].color;
      else if (mapInfo.hasOwnProperty(i)) setObject(data, mapInfo[i]);
    }
    loader.setMedia(media);
    loader.loadMedia().then(
      (response) => {
        response.forEach((name) =>
          setObject(data, { ...mapInfo[name], color: loader.loadedMedia[name] })
        );
        console.log(`Map_${index} >>>>> Images loaded...`);
        resolve(true);
      },
      (error) => {
        console.log("error: ", error);
        reject(false);
      }
    );
  });
}

function setObject(
  data,
  {
    type,
    x,
    y,
    width,
    height,
    color,
    isDisplayed,
    paralax,
    layer,
    hasCollider,
    isSolid,
  }
) {
  {
    let object =
      type === "edge"
        ? new GroundEdge({
            x,
            y,
            width,
            height,
            color,
          })
        : type === "catcher"
        ? new FallCatcher({
            x,
            y,
            width,
            height,
            color,
          })
        : new GameObject({
            x,
            y,
            width,
            height,
            color,
            isDisplayed,
            paralax,
          });
    data.setStaticObjects(layer, object);

    if (!hasCollider) return;
    object.setCollider(
      new Collider({
        x1: object.position.x,
        y1: object.position.y,
        x2: object.position.x + object.size.width,
        y2: object.position.y + object.size.height,
        isSolid,
      })
    );
    data.setObstackles(object);
  }
}
