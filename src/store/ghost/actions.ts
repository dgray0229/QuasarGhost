import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { GhostStateInterface } from './state';
import ghost from '../../config/ghostapi';

const actions: ActionTree<GhostStateInterface, StateInterface> = {
  async fetchPostInfo(context): Promise<void> {
    try {
      const posts = await ghost.posts.browse({
        include: ['tags', 'authors'],
        fields: [
          'id',
          'uuid',
          'title',
          'slug',
          'custom_excerpt',
          'excerpt',
          'created_at',
          'feature_image'
        ]
      });
      context.commit('SET_POSTS', posts);
    } catch ({ message }) {
      console.error(message);
    }
  },
  async fetchPageInfo(context): Promise<void> {
    try {
      const pages = await ghost.pages.browse();
      context.commit('SET_PAGES', pages);
    } catch ({ message }) {
      console.error(message);
    }
  },
  async fetchTags(context): Promise<void> {
    try {
      const tags = await ghost.tags.browse();
      context.commit('SET_TAGS', tags);
    } catch ({ message }) {
      console.error(message);
    }
  }
};
export default actions;
