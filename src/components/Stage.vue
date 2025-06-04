<script setup lang="ts">
import type { MouseStatus } from '../types';
import key from '@/common/key';
import MouseEvent from '@/events/mouseEvent';
import { useComponentStore, useStageStore } from '@/stores';
import { toPx } from '@/utils';
import coordinate from '@/utils/tools';
import _ from 'lodash';
import { nanoid } from 'nanoid';

const mouseEvent = new MouseEvent();

const stageStore = useStageStore();
const componentStore = useComponentStore();

const mouseState = ref<MouseStatus>(''); // 鼠标状态
let mouseAnchor = {}; // 鼠标当前位置
let mouseAnchorWorld = {}; // 鼠标交互初始位置
let pagePositionAnchor = {}; // 舞台位置信息
const mouseMoved = ref(false); // 鼠标是否在移动
// 选择蒙层的样式
const frame = reactive({
  x: 0,
  y: 0,
  w: 0,
  h: 0,
});
// 画板样式
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

// 重置鼠标
const resetMouse = () => {
  mouseState.value = '';
  mouseMoved.value = false;
};

// 设置鼠标左键按下
mouseEvent.setLeftKeyDownFn((e) => {
  resetMouse();
  mouseState.value = 'brush';
  // 记录鼠标当前位置
  mouseAnchor = coordinate.pointToStageByMouse(e.offsetX, e.offsetY);
});

// 设置鼠标中键按下
mouseEvent.setMiddleKeyDownFn((e) => {
  resetMouse();
  mouseState.value = 'move';
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
});

// 设置鼠标移动
mouseEvent.setMove((e) => {
  // 实时位置
  const mousePoint = coordinate.pointToStageByMouse(e.offsetX, e.offsetY);
  if (mouseState.value === 'brush') {
    // 当前为刷选模式
    mouseMoved.value = true;

    // 设置刷选框坐标和宽高
    const width = Math.abs(mousePoint.x - mouseAnchor.x);
    frame.w = width > 1 ? width : 1;
    const height = Math.abs(mousePoint.y - mouseAnchor.y);
    frame.h = height > 1 ? height : 1;
    frame.x = mousePoint.x < mouseAnchor.x ? mousePoint.x : mouseAnchor.x;
    frame.y = mousePoint.y < mouseAnchor.y ? mousePoint.y : mouseAnchor.y;
  }
  else if (mouseState.value === 'move') {
    // 当前为移动画布模式
    stageStore.updateStageOffsetPositionByMove(
      e.offsetX - mouseAnchorWorld.x + pagePositionAnchor.x,
      e.offsetY - mouseAnchorWorld.y + pagePositionAnchor.y,
    );
  }
});

// 设置鼠标左键松开
mouseEvent.setLeftKeyUpFn(() => {
  mouseState.value = '';
});

// 设置鼠标中键松开
mouseEvent.setMiddleKeyUpFn(() => {
  mouseState.value = '';
});

// 设置鼠标滚动
mouseEvent.setWheel((e) => {
  if (key.ctrlKeyDown(e)) {
    stageStore.updateStageScale({
      deltaX: e.deltaX,
      deltaY: e.deltaY,
      x: e.offsetX,
      y: e.offsetY,
    });
  }

  if (mouseState.value === '') {
    // 如果鼠标没按下左键，只是移动
    mouseMoved.value = false;
  }
});

onMounted(() => {
  stageStore.initPageOffsetPosition();
  window.document.oncontextmenu = () => {
    return false;
  };
});

// 拖拽进入画布
const handleDragEnter = () => {
};
// 拖拽离开画布
const handleDragLeave = () => {
};

const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDrop = (e) => {
  e.preventDefault();
  const { x, y } = coordinate.pointToStageByMouse(e.offsetX - componentStore.dragStatus.currentDraggingOffset.offsetX, e.offsetY - componentStore.dragStatus.currentDraggingOffset.offsetY);
  const copyComponent = _.cloneDeep(componentStore.dragStatus.draggingComponent);
  copyComponent.x = x;
  copyComponent.y = y;
  copyComponent.id = nanoid();
  componentStore.addComponent(copyComponent);
};
</script>

<template>
  <div class="w-full h-full relative overflow-hidden stage-bg" @dragenter="handleDragEnter" @dragleave="handleDragLeave" @dragover="handleDragOver" @drop="handleDrop">
    <!-- 画板 -->
    <div class="absolute drawing-board origin-top-left" :style="drawingBoardStyle">
      <Render />
    </div>
    <!-- 底部控制栏 -->
    <div class="z-20 absolute h-28 bottom-8 left-216 right-314">
      <StageControlBar />
    </div>
    <!-- 选择蒙层 -->
    <div
      class="relative"
      :style="_.pick(drawingBoardStyle, ['width', 'height', 'left', 'top'])"
    >
      <div
        v-if="mouseState === 'brush' && mouseMoved"
        class="brush-mask"
        :style="{
          width: toPx(frame.w * stageStore.stageConfig.s),
          height: toPx(frame.h * stageStore.stageConfig.s),
          left: toPx(frame.x * stageStore.stageConfig.s),
          top: toPx(frame.y * stageStore.stageConfig.s),
        }"
      />
    </div>
    <!-- 操作蒙层 -->
    <div
      class="absolute top-0 left-0 bottom-0 right-0"
      @mousedown="mouseEvent.down"
      @mouseup="mouseEvent.up"
      @mousemove="mouseEvent.move"
      @mousewheel.prevent="mouseEvent.wheel"
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

.brush-mask {
  position: absolute;
  border: 1px solid rgb(239 244 255 / 50%);
  background-color: rgb(239 244 255 / 10%);
}
</style>
