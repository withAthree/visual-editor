export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    redirect: '/edit',
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/edit/index.vue'),
  },
];
