<template>
  <q-page padding>
    <!-- content -->
    <list-posts :posts="posts" />
  </q-page>
</template>

<script lang="ts">
import { preFetch } from 'quasar/wrappers';
import { mapGetters, Store } from 'vuex';
import { defineComponent } from '@vue/composition-api';
import { Route } from 'vue-router';
import { PostsOrPages } from '@tryghost/content-api';
import ListPosts from 'components/ListPosts.vue';
import { GhostStateInterface } from '../store/ghost/state';

interface Posts {
  posts: PostsOrPages | [];
}

export default defineComponent({
  name: 'Tags',
  preFetch: preFetch<Store<GhostStateInterface>>(
    async ({ store, currentRoute }) => {
      void (await store.dispatch(
        'ghostModule/fetchPostsByTags',
        currentRoute.params.slug
      ));
    }
  ),
  computed: {
    ...mapGetters({posts: 'ghostModule/getPosts'}),
  },
  components: { ListPosts },
  watch: {
    async $route(to: Route, from: Route) {
      if (from.params.slug === to.params.slug) return;
      void (await this.$store.dispatch(
        'ghostModule/fetchPostsByTags',
        to.params.slug
      ));
    }
  },
});
</script>
<style lang="scss" scoped>
</style>
