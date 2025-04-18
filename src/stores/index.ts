import { createPinia } from 'pinia';

const pinia = createPinia();

export const installPinia = (app) => {
  app.use(pinia);
};

export default pinia;

export * from './stageConfig';
