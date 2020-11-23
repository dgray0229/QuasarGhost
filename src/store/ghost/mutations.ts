import { MutationTree } from 'vuex';
import { GhostStateInterface } from './state';
import { PostsOrPages } from '@tryghost/content-api';

const mutation: MutationTree<GhostStateInterface> = {
  SET_POSTS(state, posts: PostsOrPages) {
    state.posts = posts;
  },
  SET_PAGES(state, pages: PostsOrPages) {
    state.pages = pages;
  },
};

export default mutation;
