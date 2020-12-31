<template>
  <q-page padding>
    <!-- content -->
    <main v-html="page.html"></main>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { Route } from 'vue-router';
import { PostOrPage } from '@tryghost/content-api';

interface Page {
  page: PostOrPage;
}

export default defineComponent({
  name: 'Page',
  data() {
    return { page: {} } as Page;
  },
  async created() {
    this.page = await this.getPage(this.$route.params.slug);
  },
  watch: {
    async $route(to: Route, from: Route): Promise<void> {
      if (from.params.slug === to.params.slug) return;
      this.page = await this.getPage(to.params.slug);
    }
  },
  methods: {
    getPage: async function(slug: string): Promise<PostOrPage> {
      const page: PostOrPage = await this.$ghost.pages.read({
        slug
      });
      return Promise.resolve(page);
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
