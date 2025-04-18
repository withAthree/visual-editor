import pinia, { useStageStore } from '@/stores';

const stageStore = useStageStore(pinia);

interface Coordinate { x: number, y: number }

/**
 * 鼠标坐标转换为舞台坐标系坐标
 */
const pointToStageByMouse = (x: number, y: number): Coordinate => {
  return {
    x: (x - stageStore.stageConfig.x) / stageStore.stageConfig.s,
    y: (y - stageStore.stageConfig.y) / stageStore.stageConfig.s,
  };
};

export default {
  pointToStageByMouse,
};
