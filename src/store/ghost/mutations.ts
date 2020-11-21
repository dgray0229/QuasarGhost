import { MutationTree } from 'vuex';
import { GhostStateInterface } from './state';

const mutation: MutationTree<GhostStateInterface> = {
  SET_POSTS(state, posts) {
    state.posts = posts;
  },
  SET_PAGES(state, pages) {
    state.pages = pages;
  },
};

export default mutation;
