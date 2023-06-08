import { createApp, AppConfig } from 'vue';
import { GhostAPI } from '@tryghost/content-api';
import ghost from '../config/ghostapi';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $ghost: GhostAPI;
  }
}

const app = createApp({});

  if (!app.config) {
    app.config = {} as AppConfig;
  }

app.config.globalProperties.$ghost = ghost;

app.mount('#app');

export default app;
