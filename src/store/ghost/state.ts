import { PostsOrPages } from '@tryghost/content-api';

export interface GhostStateInterface {
  prop: boolean;
  posts?: PostsOrPages;
  pages?: PostsOrPages;
}

const state: GhostStateInterface = {
  prop: false,
  posts: [],
  pages: [],
};

export default state;
