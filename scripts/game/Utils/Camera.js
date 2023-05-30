export class Camera {
    constructor() {
        this.position = {
            x: 0,
            y: 0,
        };

        this.modifiers = {
            x: 0,
            y: 0,
        };
    }

    setFocus(obj) {
        this.position.x = -obj.position.x + this.modifiers.x - obj.size.width / 2;
        this.position.y = -obj.position.y + this.modifiers.y - obj.size.height / 2;
    }

    setModifiers(x, y) {
        this.modifiers.x =
            x //|| screen.orientation.type !== "portrait-primary"
        // ? window.outerWidth / 2
        // : window.outerHeight / 2;
        this.modifiers.y =
            y //|| screen.orientation.type !== "portrait-primary"
        // ? window.outerHeight / 2
        // : window.outerWidth / 2;
    }
}