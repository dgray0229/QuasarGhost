<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { mapActions } from 'vuex';
import { FetchGhost } from './store/ghost/actions';

interface AppMethods {
  fetchPosts: FetchGhost;
  fetchPages: FetchGhost;
}
export default defineComponent({
  name: 'App',
  methods: {
    ...mapActions({
      fetchPosts: 'GhostModule/fetchPosts',
      fetchPages: 'GhostModule/fetchPages'
    }) as AppMethods
  },
  created() {
    this.fetchPosts();
    this.fetchPages();
  }
});
</script>
