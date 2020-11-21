<template>
  <q-page padding>
    <!-- content -->
    <main v-html="page.html"></main>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { mapState } from 'vuex';
import { Route } from 'vue-router';
import { StateInterface } from '../store';

import { PostsOrPages, PostOrPage } from '@tryghost/content-api';

export interface WhyPageState {
  page: PostsOrPages;
  slug: PostOrPage['slug'];
}

export default defineComponent({
  name: 'Page',
  data() {
    return { slug: '' };
  },
  created() {
    this.slug = this.$route.params.slug;
  },
  watch: {
    $route(to: Route, from: Route) {
      this.slug = to.params.slug;
    }
  },
  computed: mapState({
    page(state: StateInterface) {
      const result: PostsOrPages = state?.GhostModule?.pages;
      result.filter((page: PostOrPage) => page.slug === this.slug);
      return result[0];
    }
  })
});
</script>
