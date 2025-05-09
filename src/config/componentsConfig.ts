import type components from './components';

export interface Params<K extends string> {
  name: string
  label?: string
  id?: string
  w: number
  h: number
  x: number
  y: number
  component: K
  zIndex: number
}
type ComponentConfigs = {
  [K in keyof typeof components]: Params<K>
};

const configs: ComponentConfigs = {
  rectangle: {
    name: '矩形',
    component: 'rectangle',
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    zIndex: 0,
  },
};

export default configs;
