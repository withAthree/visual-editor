<script setup lang="ts">
import { useStageStore } from '@/stores';
import { ExpandOutlined } from '@vicons/antd';

const stageStore = useStageStore();

const handleResize = () => {
  stageStore.initPageOffsetPosition();
};

// 滑块样式
const themeOverrides = {
  Slider: {
    handleSize: '8px',
    railColor: '#484a4d',
    railColorHover: '#484a4d',
  },
};
</script>

<template>
  <div class="w-full h-full bg-bg-default text-[12px] rounded-[8px] text-text-default flex justify-end items-center">
    <!-- 缩放 -->
    <div class="flex items-center  mr-20">
      <span>缩放</span>
      <n-config-provider class="w-200 mx-8" :theme-overrides="themeOverrides">
        <n-slider :value="stageStore.stageConfig.s * 100" :tooltip="false" @update:value="(stageStore.stageConfig.s = $event / 100)" />
      </n-config-provider>
      <span>{{ Number.parseInt((stageStore.stageConfig.s * 100)) }}%</span>
    </div>
    <!-- 恢复画板最适合大小 -->
    <div class="hover:bg-hover-default flex items-center rounded-4 px-4 py-2" @click="handleResize">
      <n-icon class="mr-4" size="14">
        <ExpandOutlined />
      </n-icon>
      <span>适合舞台</span>
    </div>
  </div>
</template>

<style scoped>
</style>
