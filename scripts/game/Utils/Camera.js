export class Camera {
  constructor(frameGape = 110) {
    this.position = {
      x: 0,
      y: 0,
    };

    this.modifiers = {
      x: 0,
      y: 0,
    };

    this.frame = {
      position: { x: 0, y: 0 },
      size: { width: null, height: null },
      gape: frameGape,
    };
  }

  setFocus(obj, axis = null) {
    if (!axis || axis === "x") this._setAxis(obj, "x");
    if (!axis || axis === "y") this._setAxis(obj, "y");
    if (!this.frame.size.width || !this.frame.size.height) {
      this.frame.size.width = obj.size.width + this.frame.gape * 2;
      this.frame.size.height = obj.size.height + this.frame.gape * 2;
    }
  }

  _setAxis(obj, axis) {
    this.position[axis] +=
      (-obj.position[axis] +
        this.modifiers[axis] -
        obj.size.width / 2 -
        this.position[axis]) /
      10;
    this.frame.position[axis] =
      obj.position[axis] > this.frame.position[axis]
        ? obj.position[axis] - this.frame.gape * 2
        : obj.position[axis];
  }

  moveFrame(obj) {
    if (
      this.frame.position.x >= obj.position.x ||
      this.frame.position.x + this.frame.width <=
        obj.position.x + obj.size.width
    )
      this.frame.position.x = obj.position.x - this.frame.gape;
    if (
      this.frame.position.y >= obj.position.y ||
      this.frame.position.y + this.frame.height <=
        obj.position.y + obj.size.height
    )
      this.frame.position.y = obj.position.y - this.frame.gape;
  }

  setModifiers(x, y) {
    this.modifiers.x = x; //|| screen.orientation.type !== "portrait-primary"
    // ? window.outerWidth / 2
    // : window.outerHeight / 2;
    this.modifiers.y = y; //|| screen.orientation.type !== "portrait-primary"
    // ? window.outerHeight / 2
    // : window.outerWidth / 2;
  }
}
