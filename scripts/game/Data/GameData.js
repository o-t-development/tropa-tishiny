export class Data {
  constructor(layersOfScreen = 1, playerLayer = 1) {
    this._staticObjects = {};
    this._moveableObjects = {};
    this._forces = {
      relative: [],
      absolute: [],
    };
    this._player = null;
    this._playerStatistic = {};
    this._layersOfScreen = layersOfScreen;
    this._playerLayer = playerLayer;
    this._additionalObjects = {};
    this._obstackles = [];

    this.isJustCreated = true;
  }

  getPlayer() {
    return this._player;
  }
  getPlayerStatistic(field = "") {
    if (!field) return this._playerStatistic;
    if (!!this._playerStatistic[field]) return this._playerStatistic[field];
  }
  getForces(type = "") {
    if (!type) return [...this._forces.absolute, ...this._forces.relative];
    if (!!this._forces[type]) return this._forces[type];
  }
  getObjectsToRender() {
    let forRender = [];
    for (let i = 0; i < this._layersOfScreen; i++) {
      if (i === this._playerLayer) {
        forRender.push(this._player);
        continue;
      }
      if (!this._staticObjects[`layer${i}`])
        this._staticObjects[`layer${i}`] = [];
      if (!this._moveableObjects[`layer${i}`])
        this._moveableObjects[`layer${i}`] = [];

      forRender.push(
        ...this._staticObjects[`layer${i}`],
        ...this._moveableObjects[`layer${i}`]
      );
    }
    return forRender;
  }
  getStaticObjects(layer = "") {
    return layer ? this._staticObjects[layer] : this._staticObjects;
  }
  getMoveableObjects(layer = "") {
    return layer ? this._moveableObjects[layer] : this._moveableObjects;
  }
  getAdditionalObject(object = "") {
    return this._additionalObjects[object];
  }
  getLayersCount() {
    return this._layersOfScreen;
  }
  getObstackles() {
    return this._obstackles;
  }

  setStaticObjects(layer = 0, ...objects) {
    !!this._staticObjects[`layer${layer}`]
      ? this._staticObjects[`layer${layer}`].push(...objects)
      : (this._staticObjects[`layer${layer}`] = [...objects]);
  }
  setMoveableObjects(layer = 0, ...objects) {
    !!this._moveableObjects[`layer${layer}`]
      ? this._moveableObjects[`layer${layer}`].push(...objects)
      : (this._moveableObjects[`layer${layer}`] = [...objects]);
  }
  setPlayer(player) {
    this._player = player;
    this._moveableObjects[`layer${this._playerLayer}`] = [this._player];
  }
  setForces(type = "", ...forces) {
    if (!this._forces[type]) return;
    this._forces[type].push(...forces);
  }
  setPlayerStatistic(statistic) {
    this._playerStatistic = statistic;
  }
  setAdditionalObject(name = "", object = {}) {
    this._additionalObjects[name] = object;
  }
  setObstackles(...obstackles) {
    this._obstackles.push(...obstackles);
  }
}
