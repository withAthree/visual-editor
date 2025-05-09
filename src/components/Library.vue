<script setup lang="ts">
import Expand from '@/CommonComponents/Expand.vue';
import componentsConfig from '@/config/componentsConfig';
import { useComponentStore } from '@/stores';
import { AppstoreOutlined } from '@vicons/antd';

const componentStore = useComponentStore();

const containerDisplay = ref(false);
const targetDom = useTemplateRef('target');

const toggleDropdown = () => {
  containerDisplay.value = true;
};

onClickOutside(targetDom, () => {
  containerDisplay.value = false;
});

const handleDragStart = (event, item) => {
  componentStore.dragStatus.draggingComponent = item;
};

const handleDragEnd = () => {
  componentStore.resetDragStatus();
};

const handleMouseDown = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  // 计算鼠标相对于元素左上角的坐标
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  componentStore.dragStatus.currentDraggingOffset = { offsetX, offsetY };
};
</script>

<template>
  <div ref="target" class="relative w-full h-full flex flex-col items-center" :class="{ 'bg-hover-default': containerDisplay }" @click.stop="toggleDropdown">
    <div class="flex-1 aspect-square">
      <AppstoreOutlined />
    </div>
    <div>
      <span class="text-[12px]">
        <slot />
      </span>
    </div>
    <Expand>
      <div v-show="containerDisplay" class="absolute top-50 w-300 h-300 bg-[#161618] rounded-[4px]">
        <n-scrollbar class="p-10">
          <n-grid :x-gap="20" :y-gap="20" :cols="3">
            <n-grid-item v-for="(key, index) in Object.keys(componentsConfig)" :key="index">
              <div class="w-full aspect-square item" style="border:1px solid red" draggable="true" @mousedown="handleMouseDown" @dragstart="handleDragStart($event, componentsConfig[key])" @dragend="handleDragEnd">
                {{ componentsConfig[key].name }}
              </div>
            </n-grid-item>
          </n-grid>
        </n-scrollbar>
      </div>
    </Expand>
  </div>
</template>

<style scoped>

</style>
