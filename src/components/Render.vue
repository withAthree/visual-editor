<script lang="ts">
import type { Params } from '@/config/componentsConfig';
import allComponents from '@/config/components';
import { useComponentStore } from '../stores';
import { toPx } from '../utils';

const componentStore = useComponentStore();

export default {
  setup() {
    return () => {
      const renderList: Params[] = [];
      for (let i = 0; i < componentStore.components.length; i++) {
        const item = componentStore.components[i];
        renderList.push(
          h(
            'div',
            {
              style: {
                position: 'absolute',
                left: toPx(item.x),
                top: toPx(item.y),
                width: toPx(item.w),
                height: toPx(item.h),
                zIndex: i,
              },
              key: item.id,
            },
            h(
              allComponents[item.component],
            ),
          ),
        );
      }

      return renderList;
    };
  },
};
</script>
