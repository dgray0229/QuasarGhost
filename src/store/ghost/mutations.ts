import { MutationTree } from 'vuex';
import { GhostStateInterface } from './state';
import {  Authors, PostsOrPages, Settings, Tags,  } from '@tryghost/content-api';

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
  SET_AUTHORS(state, authors: Authors) {
    state.authors = authors;
  },
  SET_SETTINGS(state, settings: Settings) {
    state.settings = settings;
  },
};

export default mutation;
