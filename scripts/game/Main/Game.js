import { animate } from "../../forAnimatedProject/animate.js";
import { GameObject } from "../Objects/GameObject.js";
import { Camera } from "../Utils/Camera.js";
import { getMap } from "../Utils/map.js";

export function StartGame(data, ctx, screen) {
    if (data.objects.length === 0) {
        data.objects.push(
            new GameObject({
                x: 500,
                y: 500,
                width: 64,
                height: 128,
                isUnderPlayerControl: true,
                maxSelfSpeed: 5
            }),
            new GameObject({
                x: 0, y: 628,
                width: 1000,
                height: 20,
                color: '#58070d'
            })
        );
    }
    data.camera = new Camera();
    data.camera.setModifiers(screen.width / 2, screen.height / 2);
    data.camera.setFocus(data.objects[0]);

    data.map = getMap();
    animate(data, 0, ctx, screen);
}