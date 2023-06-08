import { AppConfig } from 'vue';
import { store } from 'quasar/wrappers';
import { createStore, Store } from 'vuex';
import { GhostStateInterface } from './ghost/state';
import ghostModule from './ghost';

export interface StateInterface {
  ghostModule: GhostStateInterface
}

export default store(function ({ app }: any) {
    if (!app.config) {
      app.config = {} as AppConfig;
    }

  const Store: Store<StateInterface> = createStore<StateInterface>({
    modules: {
      ghostModule
    },
    strict: !!app.config.devtools
  });

  return Store;
});

