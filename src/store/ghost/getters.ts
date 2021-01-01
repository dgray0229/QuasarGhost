import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { GhostStateInterface } from './state';

const getters: GetterTree<GhostStateInterface, StateInterface> = {
  // your code
  getTitle: state => state?.title,
  getAuthor: state => state?.author,
  getPost: state => state?.post,
  getPage: state => state?.page,
  getPosts: state => state?.posts,
  getPages: state => state?.pages,
  getTags: state => state?.tags,
  getSettings: state => state?.settings,
  getAuthors: state => state?.authors
};

export default getters;
