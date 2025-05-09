<script setup lang="ts">
// import { useComponentStore } from '../stores';

// const componentStore = useComponentStore();
</script>

<template>
  <div class="absolute w-200 left-8 top-60 bottom-8 flex flex-col bg-bg-default rounded-[8px]">
    <div class="h-32 px-8 flex items-center">
      元素列表
    </div>
    <div class="flex-1 px-8">
      <n-config-provider>
        <n-tree />
      </n-config-provider>
    </div>
    <div class="h-28 px-8 flex items-center border-border-default border-t-[1px]">
      123
    </div>
  </div>
</template>

<style scoped>

</style>
