import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes.config';

export const installRouter = (app) => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });

  app.use(router);
};
