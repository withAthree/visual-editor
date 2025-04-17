import { createPinia } from 'pinia';

export const installPinia = (app) => {
  const pinia = createPinia();
  app.use(pinia);
};

export * from './stageConfig';
