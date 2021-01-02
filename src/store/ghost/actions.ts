import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { GhostStateInterface } from './state';
import ghost from '../../config/ghostapi';

const actions: ActionTree<GhostStateInterface, StateInterface> = {
  async fetchAllPosts({ commit }, options): Promise<void> {
    const posts = await ghost.posts.browse({
      ...options
    });
    commit('SET_POSTS', posts);
  },
  async fetchMorePosts({ commit }, options): Promise<void> {
    const posts = await ghost.posts.browse({
      ...options
    });
    commit('ADD_POSTS', posts);
  },
  async fetchPageInfoBySlug({ commit }, options?): Promise<void> {
    const page = await ghost.pages.read({ ...options }); /*?*/
    commit('SET_PAGE', page);
  },
  async fetchPostInfoBySlug({ commit }, options?): Promise<void> {
    const post = await ghost.posts.read({ ...options }); /*?*/
    commit('SET_POST', post);
  },
  async fetchAllTags({ commit }, options?): Promise<void> {
    const tags = await ghost.tags.browse({ ...options });
    commit('SET_TAGS', tags);
  },
  async fetchPostsByTags({ commit }, options?): Promise<void> {
    const postsByTag = await ghost.posts.browse({
      ...options
    });
    commit('SET_POSTS', postsByTag);
  },
  async fetchAuthorById({ commit }, options?): Promise<void> {
    const author = await ghost.authors.read({ ...options });
    commit('SET_AUTHOR', author);
  },
  async fetchAuthors({ commit }, options?): Promise<void> {
    const authors = await ghost.authors.browse({ ...options });
    commit('SET_AUTHORS', authors);
  },
  async fetchAllSettings({ commit }): Promise<void> {
    const settings = await ghost.settings.browse();
    commit('SET_SETTINGS', settings);
  },
  setTitle({ commit }, title): void {
    commit('SET_TITLE', title);
  }
};
export default actions;
