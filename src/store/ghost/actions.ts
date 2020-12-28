import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { GhostStateInterface } from './state';
import ghost from '../../config/ghostapi';

const actions: ActionTree<GhostStateInterface, StateInterface> = {
  async fetchPostInfo({ commit }): Promise<void> {
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
        ],
      });
      commit('SET_POSTS', posts);
    } catch ({ message }) {
      console.error(message);
    }
  },
  async fetchPageInfo({ commit }): Promise<void> {
    try {
          const pages = await ghost.pages.browse(); /*?*/
          commit('SET_PAGES', pages);
        } catch ({ message }) {
      console.error(message);
    }
  },
  async fetchTags({ commit }): Promise<void> {
    try {
      const tags = await ghost.tags.browse();
      commit('SET_TAGS', tags);
    } catch ({ message }) {
      console.error(message);
    }
  },
  async fetchAuthors({ commit }): Promise<void> {
    try {
      const authors = await ghost.authors.browse();
      commit('SET_AUTHORS', authors);
    } catch ({ message }) {
      console.error(message);
    }
  },
  async fetchSettings({ commit }): Promise<void> {
    try {
      const settings = await ghost.settings.browse();
      commit('SET_SETTINGS', settings);
    } catch ({ message }) {
      console.error(message);
    }
  },
};
export default actions;
