<script setup lang="ts">
import Library from './Library.vue';

const menus = [
  { name: '组件库', component: Library },
];
</script>

<template>
  <div class="absolute top-0 left-8 right-8 bg-bg-default h-56 rounded-b-8 p-4 flex justify-between text-text-default ">
    <div class="mx-auto">
      <div v-for="item in menus" :key="item.name" class="h-full aspect-square rounded-[4px]">
        <component :is="item.component">
          <template #default>
            {{ item.name }}
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
