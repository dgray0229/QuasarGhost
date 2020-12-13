import { PostsOrPages, Tags, Settings, Authors } from '@tryghost/content-api';

export interface GhostStateInterface {
  prop: boolean;
  posts?: PostsOrPages | never[];
  pages?: PostsOrPages | never[];
  tags?: Tags | never[];
  authors?: Authors | never[];
  settings?: Settings | never[];
}

const state: GhostStateInterface = {
  prop: false,
  posts: [],
  pages: [],
  tags: [],
  authors: [],
  settings: []
};

export default state;
