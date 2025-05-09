import { defineAsyncComponent } from 'vue';

export default {
  rectangle: defineAsyncComponent(() => import('@/materials/Rectangle.vue')),
};
