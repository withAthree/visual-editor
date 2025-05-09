<script setup lang="ts">

</script>

<template>
  <Transition name="expand">
    <slot />
  </Transition>
</template>

<style scoped>
/* 展开动画 */
.expand-enter-active,
.expand-leave-active {
  transition: height 0.05s ease-in-out;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  height: 0;
}

.expand-enter-to,
.expand-leave-from {
  height: 300px;
}
</style>
