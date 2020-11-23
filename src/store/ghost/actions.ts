import { ActionTree } from 'vuex';

import { StateInterface } from '../index';
import { GhostStateInterface } from './state';
import ghost from '../../config/ghostapi';

const actions: ActionTree<GhostStateInterface, StateInterface> = {
  async fetchPosts(context): Promise<void> {
    try {
      const posts = await ghost.posts.browse({ include: ['tags', 'authors'] });
      context.commit('SET_POSTS', posts);
    } catch ({ message }) {
      console.error(message);
    }
  },
  async fetchPages(context): Promise<void> {
    try {
      const pages = await ghost.pages.browse();
      context.commit('SET_PAGES', pages);
    } catch ({ message }) {
      console.error(message);
    }
  }
};
export default actions;
