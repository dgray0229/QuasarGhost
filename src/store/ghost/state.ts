import { PostOrPage, PostsOrPages, Tags, Settings, Authors, Author } from '@tryghost/content-api';

export interface GhostStateInterface {
ghostModule: any;
  title: string;
  author: Author | Record<string, unknown>;
  post: PostOrPage | Record<string, unknown>;
  page: PostOrPage | Record<string, unknown>;
  posts?: PostsOrPages[];
  pages?: PostsOrPages[];
  tags?: Tags | [];
  authors?: Authors | [];
  settings?: Settings | [];
}

const state: GhostStateInterface = {
  title: 'Test Title',
  author: {},
  post: {},
  page: {},
  posts: [],
  pages: [],
  tags: [],
  authors: [],
  settings: [],
  ghostModule: undefined
};

export default state;
