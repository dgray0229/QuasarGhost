import { ActionTree, ActionContext } from 'vuex';

import { StateInterface } from '../index';
import { GhostStateInterface } from './state';
import api from '../../config/ghostapi';

export type FetchGhost = (
  context?: ActionContext<GhostStateInterface, StateInterface>
) => Promise<void>;

export interface ActionMethods extends ActionTree<GhostStateInterface, StateInterface> {
  fetchPosts: FetchGhost;
  fetchPages: FetchGhost;
}

const actions: ActionMethods = {
  async fetchPosts(context) {
    try {
      const posts = await api.posts.browse({ include: ['tags', 'authors'] });
      context.commit('SET_POSTS', posts);
      return
    } catch (error) {
      console.error(error.message);
    }
  },
  async fetchPages(context) {
    try {
      const pages = await api.pages.browse();
      context.commit('SET_PAGES', pages);
    } catch (error) {
      console.error(error.message);
    }
  }
};
export default actions;
