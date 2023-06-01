let map = [];
let isFilled;

export const getMap = (width = null, height = null) => {
  let xLim = width || Math.random() * 200 + 100;
  let yLim = height || 500;

  for (let x = 0; x < xLim; x++) {
    map[x] = [];
    for (let y = 0; y < yLim; y++) {
      isFilled = Math.random() > 0.5 ? true : false;
      map[x][y] = isFilled ? 1 : 0;
    }
  }
  return map;
};
