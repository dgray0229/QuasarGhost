import { boot } from 'quasar/wrappers';
/**
TODO: Refactor error logic to use less try/catch blocks */
declare module 'vue/types/vue' {
  interface Vue {
    $error: (error: Error) => unknown;
  }
}

export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$error = (error: Error) => {
    console.error(error.message);
    return error;
  };
});
