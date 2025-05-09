<script setup lang="ts">
import TopMenu from '@/components/TopMenu.vue';
import Tree from '@/components/Tree.vue';
</script>

<template>
  <div class="w-screen h-screen">
    <!-- 舞台 -->
    <Stage />
    <!-- 顶部菜单 -->
    <TopMenu />
    <!-- 左侧结构树 -->
    <Tree />
  </div>
</template>

<style scoped>

</style>
