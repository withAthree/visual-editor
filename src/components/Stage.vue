<script setup lang="ts">
import type { MouseStatus } from '../../typings';
import key from '@/common/key';
import { useStageStore } from '@/stores';
import { toPx } from '@/utils';
// import coordinate from '@/utils/tools';
import _ from 'lodash';

const stageStore = useStageStore();

const mouseState = ref<MouseStatus>('');
// let mouseAnchor = {}; // ???
let mouseAnchorWorld = {}; // 鼠标交互初始位置
let pagePositionAnchor = {}; // 舞台位置信息

const drawingBoardStyle = computed(() => {
  return {
    width: toPx(stageStore.stageConfig.w),
    height: toPx(stageStore.stageConfig.h),
    left: toPx(stageStore.stageConfig.x),
    top: toPx(stageStore.stageConfig.y),
    transform: `scale(${stageStore.stageConfig.s})`,
    backgroundColor: stageStore.stageConfig.bgColor,
  };
});

// 鼠标事件
const handleMousedown = (e) => {
  if (e.button === 1) {
    // 鼠标中键
    // mouseAnchor = coordinate.pointToStageByMouse({ x: e.offsetX, y: e.offsetY }, {
    //   x: stageStore.stageConfig.x,
    //   y: stageStore.stageConfig.y,
    //   s: stageStore.stageConfig.s,
    // });

    mouseAnchorWorld = {
      x: e.offsetX,
      y: e.offsetY,
    };

    pagePositionAnchor = _.cloneDeep(stageStore.stageConfig);

    mouseState.value = 'move';
  }
};

const handleMouseMove = (e) => {
  if (mouseState.value === 'move') {
    stageStore.updateStageOffsetPositionByMove(
      e.offsetX - mouseAnchorWorld.x + pagePositionAnchor.x,
      e.offsetY - mouseAnchorWorld.y + pagePositionAnchor.y,
    );
  }
};

const handleMouseUp = (e) => {
  if (e.button === 1) {
    mouseState.value = '';
  }
};

const handleMouseWheel = (e) => {
  if (key.ctrlKeyDown(e)) {
    stageStore.updateStageScale({
      deltaX: e.deltaX,
      deltaY: e.deltaY,
      x: e.offsetX,
      y: e.offsetY,
    });
  }
};

onMounted(() => {
  stageStore.initPageOffsetPosition();
});
</script>

<template>
  <div class="w-full h-full relative overflow-hidden stage-bg">
    <!-- 画板 -->
    <div class="absolute drawing-board origin-top-left" :style="drawingBoardStyle">
      123
    </div>
    <!-- 底部控制栏 -->
    <div class="z-20 absolute h-28 bottom-8 left-216 right-314">
      <StageControlBar />
    </div>
    <!-- 操作蒙层 -->
    <div
      class="absolute top-0 left-0 bottom-0 right-0"
      @mousedown="handleMousedown"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove"
      @mousewheel.prevent="handleMouseWheel"
    />
  </div>
</template>

<style scoped>
.stage-bg {
  background-color: #18191c;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAACKADAAQAAAABAAAACAAAAACVhHtSAAAAFUlEQVQYGWNgoC9oaGj4T18bibMNAHgCAoD1EJfTAAAAAElFTkSuQmCC');
}

.drawing-board {
  background-color: #000000;
}
</style>
