import { MutationTree } from 'vuex';
import { GhostStateInterface } from './state';
import { Tags, PostsOrPages } from '@tryghost/content-api';

const mutation: MutationTree<GhostStateInterface> = {
  SET_POSTS(state, posts: PostsOrPages) {
    state.posts = posts;
  },
  SET_PAGES(state, pages: PostsOrPages) {
    state.pages = pages;
  },
  SET_TAGS(state, tags: Tags) {
    state.tags = tags;
  },
};

export default mutation;
