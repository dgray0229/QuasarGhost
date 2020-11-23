import { PostsOrPages, Tags } from '@tryghost/content-api';

export interface GhostStateInterface {
  prop: boolean;
  posts?: PostsOrPages | never[];
  pages?: PostsOrPages | never[];
  tags?: Tags | never[];
}

const state: GhostStateInterface = {
  prop: false,
  posts: [],
  pages: [],
  tags: [],
};

export default state;
