import { createRouter, createWebHistory } from 'vue-router';
import { Store } from 'vuex';
import GhostStateInterface from '../store';
import routes from './routes';

export default function (store: Store<typeof GhostStateInterface>) {
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 }),
  });

  router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  });

  return router;
}
