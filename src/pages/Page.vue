<template>
  <q-page padding>
    <!-- content -->
    <main v-html="page.html"></main>
  </q-page>
</template>

<script lang="ts">
import { preFetch } from 'quasar/wrappers';
import { mapGetters, Store } from 'vuex';
import { defineComponent } from '@vue/composition-api';
import { Route } from 'vue-router';
import { PostOrPage } from '@tryghost/content-api';
import { GhostStateInterface } from '../store/ghost/state';
interface Page {
  page: PostOrPage;
}

export default defineComponent({
  name: 'Page',
  preFetch: preFetch<Store<GhostStateInterface>>(
    async ({ store, currentRoute }) => {
      void (await store.dispatch('ghostModule/fetchPageInfoBySlug', {
        slug: currentRoute.params.slug
      }));
    }
  ),
  computed: mapGetters({
    page: 'ghostModule/getPage'
  }),
  watch: {
    $route(to: Route, from: Route): void {
      if (from.params.slug === to.params.slug) return;
      void this.$store.dispatch('ghostModule/fetchPageInfoBySlug', {
        slug: to.params.slug
      });
    }
  },
  meta() {
    return {
      // sets document title
      title: 'Page',
      // optional; sets final title as "Index Page - My Website", useful for multiple level meta
      titleTemplate: (title: string) => `${title} - The Blog of Devin Gray`,

      // meta tags
      meta: {
        description: { name: 'description', content: 'TBD' },
        keywords: { name: 'keywords', content: 'TBD' },
        equiv: {
          'http-equiv': 'Content-Type',
          content: 'text/html; charset=UTF-8'
        },
        // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
        ogTitle: {
          name: 'og:title',
          // optional; similar to titleTemplate, but allows templating with other meta properties
          template(ogTitle: string) {
            return `${ogTitle} - The Blog of Devin Gray`;
          }
        }
      }
    };
  }
});
</script>
