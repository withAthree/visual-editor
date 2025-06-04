import type { Params } from '@/config/componentsConfig';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useComponentStore = defineStore('components', () => {
  const components = ref<Params<string>[]>([]);
  const dragStatus = ref({
    draggingComponent: null,
    currentDraggingOffset: { offsetX: 0, offsetY: 0 },
  });
  // const activeComponent = null;

  function addComponent(component: Params<string>) {
    components.value.push(component);
  };

  function resetDragStatus() {
    dragStatus.value.draggingComponent = null;
    dragStatus.value.currentDraggingOffset = { offsetX: 0, offsetY: 0 };
  }

  return { dragStatus, components, addComponent, resetDragStatus };
});
