import { App, AppConfig } from 'vue';
declare module '@vue/runtime-core' {
  interface VueCustomElementProps {
    $error: (error: Error) => unknown;
  }
}

export default function errorPlugin(app: App) {
    if (!app.config) {
      app.config = {} as AppConfig;
    }

  app.config.globalProperties.$error = (error: Error) => {
    console.error(error.message);
    return error;
  };
}
