<script setup lang="ts">
import { useStageStore } from '@/stores';
import { ExpandOutlined } from '@vicons/antd';

const stageStore = useStageStore();

const handleResize = () => {
  stageStore.initPageOffsetPosition();
};
</script>

<template>
  <div class="w-full h-full bar text-text-default flex items-center">
    <div class="hover:bg-hover-default flex items-center rounded-4 px-4 py-2" @click="handleResize">
      <n-icon class="mr-4" size="12">
        <ExpandOutlined />
      </n-icon>
      <span>适合舞台</span>
    </div>
  </div>
</template>

<style scoped>
.bar {
  background-color: #272829;
  font-size: 12px;
  border-radius: 8px;
}
</style>
