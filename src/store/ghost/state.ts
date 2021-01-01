import { PostOrPage, PostsOrPages, Tags, Settings, Authors, Author } from '@tryghost/content-api';

export interface GhostStateInterface {
  prop: boolean;
  title: string;
  author: Author | Record<string, unknown>;
  post: PostOrPage | Record<string, unknown>;
  page: PostOrPage | Record<string, unknown>;
  posts?: PostsOrPages | never[];
  pages?: PostsOrPages | never[];
  tags?: Tags | never[];
  authors?: Authors | never[];
  settings?: Settings | never[];
}

const state: GhostStateInterface = {
  prop: false,
  title: 'Test Title',
  author: {},
  post: {},
  page: {},
  posts: [],
  pages: [],
  tags: [],
  authors: [],
  settings: []
};

export default state;
