import type { StageConfig } from '../types';
import Big from 'big.js';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useStageStore = defineStore('stageConfig', () => {
  const stageConfig = reactive<StageConfig>({
    w: 1920,
    h: 1080,
    x: 0,
    y: 0,
    s: 1,
    bgColor: '#000000',
  });

  const initPageOffsetPosition = () => {
    const exhibitionWidth = window.innerWidth - 120;
    const exhibitionHeight = window.innerHeight - 120;

    if (stageConfig.w / exhibitionWidth > stageConfig.h / exhibitionHeight) {
      stageConfig.s = Big(exhibitionWidth).div(stageConfig.w).toNumber();
      if (stageConfig.s < 0.2) {
        stageConfig.s = 0.2;
      }
      stageConfig.x = 60;
      stageConfig.y = (exhibitionHeight - stageConfig.h * stageConfig.s) / 2 + 60;
    }
    else {
      stageConfig.s = Big(exhibitionHeight).div(stageConfig.h).toNumber();
      if (stageConfig.s < 0.2) {
        stageConfig.s = 0.2;
      }
      stageConfig.x = (exhibitionWidth - stageConfig.w * stageConfig.s) / 2 + 60;
      stageConfig.y = 60;
    }
  };

  // 中键平移页面更新页面位置
  const updateStageOffsetPositionByMove = (x: number, y: number) => {
    stageConfig.x = x;
    stageConfig.y = y;
  };

  // 鼠标滚轮缩放
  const updateStageScale = (payload: any) => {
    const oldS = stageConfig.s;
    // 算新的缩放
    let newScale = 0;
    if (payload.deltaY < 0) {
      newScale = Big(stageConfig.s)
        .plus(0.07 * stageConfig.s)
        .toNumber();
    }
    else {
      newScale = Big(stageConfig.s)
        .minus(0.07 * stageConfig.s)
        .toNumber();
    }

    if (newScale < 0.2) {
      stageConfig.s = 0.2;
    }
    else if (newScale > 5) {
      stageConfig.s = 5;
    }
    else {
      stageConfig.s = newScale;
    }
    // 根据新的缩放算新的舞台偏移
    stageConfig.y = Math.round(payload.y - ((payload.y - stageConfig.y) * stageConfig.s) / oldS);
    stageConfig.x = Math.round(payload.x - ((payload.x - stageConfig.x) * stageConfig.s) / oldS);
  };

  return { stageConfig, initPageOffsetPosition, updateStageOffsetPositionByMove, updateStageScale };
});
