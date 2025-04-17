interface Coordinate { x: number, y: number }
type Stage = Coordinate & { s: number };

/**
 * 鼠标坐标转换为舞台坐标系坐标
 */
const pointToStageByMouse = (point: Coordinate, stage: Stage): Coordinate => {
  return {
    x: (point.x - stage.x) / stage.s,
    y: (point.y - stage.y) / stage.s,
  };
};

export default {
  pointToStageByMouse,
};
