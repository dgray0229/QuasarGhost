import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { GhostStateInterface } from './state';
import ghost from '../../config/ghostapi';

const actions: ActionTree<GhostStateInterface, StateInterface> = {
  async fetchAllPosts({ commit }): Promise<void> {
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
    commit('SET_POSTS', posts);
  },
  async fetchPageInfoBySlug({ commit }, slug: string): Promise<void> {
    const page = await ghost.pages.read({ slug }); /*?*/
    commit('SET_PAGE', page);
  },
  async fetchPostInfoBySlug({ commit }, slug: string): Promise<void> {
    const post = await ghost.posts.read({ slug }); /*?*/
    commit('SET_POST', post);
  },
  async fetchAllTags({ commit }, fields: string[]): Promise<void> {
    const tags = await ghost.tags.browse({fields});
    commit('SET_TAGS', tags);
  },
  async fetchPostsByTags({ commit }, slug: string): Promise<void> {
    const postsByTag = await ghost.posts.browse({
      filter: [`tag:${slug}`]
    });
    commit('SET_POSTS', postsByTag)
  },
  async fetchAuthorById({ commit }, id: string): Promise<void> {
    const author = await ghost.authors.read({id});
    commit('SET_AUTHOR', author);
  },
  async fetchAuthors({ commit }): Promise<void> {
    const authors = await ghost.authors.browse();
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
