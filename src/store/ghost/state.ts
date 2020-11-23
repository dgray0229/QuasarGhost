import { PostsOrPages } from '@tryghost/content-api';

export interface GhostStateInterface {
  prop: boolean;
  posts?: PostsOrPages | never[];
  pages?: PostsOrPages | never[];
}

const state: GhostStateInterface = {
  prop: false,
  posts: [],
  pages: [],
};

export default state;
