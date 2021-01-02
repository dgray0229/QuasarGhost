import { MutationTree } from 'vuex';
import { GhostStateInterface } from './state';
import { Author, Authors, PostOrPage, PostsOrPages, Settings, Tags,  } from '@tryghost/content-api';

const mutation: MutationTree<GhostStateInterface> = {
  SET_AUTHOR(state, author: Author) {
    state.author = author;
  },
  SET_POST(state, post: PostOrPage) {
    state.post = post;
  },
  SET_PAGE(state, page: PostOrPage) {
    state.page = page;
  },
  SET_POSTS(state, posts: PostsOrPages[]) {
    state.posts = posts;
  },
  ADD_POSTS(state, posts: PostsOrPages[]) {
    state.posts?.push(...posts);
  },
  SET_PAGES(state, pages: PostsOrPages[]) {
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
  SET_TITLE(state, title: string) {
    state.title = title;
  }
};

export default mutation;
