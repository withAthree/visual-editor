<script lang="ts">
import allComponents from '@/config/components';

export default {
  setup() {
    return () => {
      const renderList = [];
      renderList.push(
        h(
          'div',
          {
            style: {
              position: 'absolute',
              left: '50%',
              top: '50%',
              background: 'red',
            },
            key: '123',
          },
          h(
            allComponents.rectangle,
          ),
        ),
      );
      return renderList;
    };
  },
};
</script>
