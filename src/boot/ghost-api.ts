import { GhostAPI } from '@tryghost/content-api';
import { boot } from 'quasar/wrappers';
import ghost from '../config/ghostapi';

declare module 'vue/types/vue' {
  interface Vue {
    $ghost: GhostAPI;
  }
}

export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$ghost = ghost;
});
