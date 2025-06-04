<script lang="tsx">
import { ArrowDownOutlined, ArrowUpOutlined } from '@vicons/antd';
import * as _ from 'lodash';
import { useComponentStore } from '../stores';

const componentStore = useComponentStore();

const currentTreeNode = ref('');

const dataComputed = computed(() => {
  return _.cloneDeep(componentStore.components).reverse().map(item => ({
    label: item.name + item.id,
    id: item.id,
  }));
});

const handleClickTreeNode = (id: string) => {
  currentTreeNode.value = currentTreeNode.value === id ? '' : id;
};

const handleChangeNodeLevel = (direction: 'up' | 'down') => {
  if (currentTreeNode.value) {
    // 获取当前选中节点在数据中的索引
    const index = dataComputed.value.findIndex(item => item.id === currentTreeNode.value);
    if (direction === 'down' && index > 0) {
      // 复制一份组件数据
      const componentsCopy = _.cloneDeep(componentStore.components);
      // 交换当前元素与前一个元素的位置
      [componentsCopy[index], componentsCopy[index - 1]] = [componentsCopy[index - 1], componentsCopy[index]];
      // 更新组件存储中的数据
      componentStore.components = componentsCopy;
    }
    else if (direction === 'up' && index < dataComputed.value.length - 1) {
      // 复制一份组件数据
      const componentsCopy = _.cloneDeep(componentStore.components);
      // 交换当前元素与后一个元素的位置
      [componentsCopy[index], componentsCopy[index + 1]] = [componentsCopy[index + 1], componentsCopy[index]];
      // 更新组件存储中的数据
      componentStore.components = componentsCopy;
    }
  }
};

const renderTree = () => dataComputed.value.map((item) => {
  return (
    <div className={`${item.id === currentTreeNode.value ? 'bg-hover-default' : null} hover:bg-hover-default my-4`} onClick={() => handleClickTreeNode(item.id)}>{item.label}</div>
  );
});

export default {
  render() {
    return (
      <div class="absolute w-200 left-8 top-60 bottom-8 flex flex-col bg-bg-default rounded-[8px]">
        <div class="h-32 px-8 flex items-center">
          元素列表
        </div>
        <div class="flex-1 px-8" style="border:1px solid red">
          <div>
            { renderTree() }
          </div>
        </div>
        <div class="h-28 px-8 grid grid-rows-1 grid-cols-2 gap-10 items-center border-border-default border-t-[1px]" style="border:1px solid">
          <n-icon size="20" onClick={() => handleChangeNodeLevel('up')}>
            <ArrowUpOutlined />
          </n-icon>
          <n-icon size="20" onClick={() => handleChangeNodeLevel('down')}>
            <ArrowDownOutlined />
          </n-icon>
        </div>
      </div>
    );
  },
};
</script>

<style scoped>
</style>
