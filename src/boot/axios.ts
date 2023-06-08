import axios, { AxiosInstance } from 'axios';
import { App, AppConfig } from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

export default function axiosPlugin(app: App) {
    if (!app.config) {
      app.config = {} as AppConfig;
    }
  app.config.globalProperties.$axios = axios;
}
