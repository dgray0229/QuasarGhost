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

export default defineComponent({
  name: 'Page',
  data() {
    return { slug: '', page: {} };
  },
  async created() {
    this.slug = this.$route.params.slug;
    this.page = await this.getPage();
  },
  watch: {
    async $route(to: Route) {
      if (this.slug === to.params.slug) return;
      this.slug = to.params.slug;
      this.page = await this.getPage();
    }
  },
  methods: {
    getPage: async function() {
      const page: PostOrPage = await this.$ghost.pages.read({
        slug: this.slug
      });
      return Promise.resolve(page);
    }
  },
  meta() {
    return {
      // sets document title
      title: `${this.page.title}`,
      // optional; sets final title as "Index Page - My Website", useful for multiple level meta
      titleTemplate: (title: string) => `${title} - The Blog of Devin Gray`,

      // meta tags
      meta: {
        description: { name: 'description', content: this.page.excerpt },
        keywords: { name: 'keywords', content: 'The Blog of Devin Gray' },
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
