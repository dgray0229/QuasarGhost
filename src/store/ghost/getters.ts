import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { GhostStateInterface } from './state';

const getters: GetterTree<GhostStateInterface, StateInterface> = {
  // your code
  allPosts: state => state?.posts,
  allTags: state => state?.tags
};

export default getters;
