import { store } from 'quasar/wrappers';
import Vuex from 'vuex';
import GhostStateInterface from './ghost/state';
// import example from './module-example';
// import { ExampleStateInterface } from './module-example/state';
import ghostModule from './ghost';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  // example: unknown;
  ghostModule: typeof GhostStateInterface;
}

export default store(function ({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      ghostModule
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING
  });

  return Store;
});
