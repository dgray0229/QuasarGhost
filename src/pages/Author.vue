<template>
  <q-page padding>
    <main v-if="author">
      <div class="q-pa-md q-gutter-md">
        <div class="row justify-between">
          <q-parallax class="blog-jumbotron" :src="author.cover_image">
            <q-avatar class="row flex-center">
              <img :src="author.profile_image" />
            </q-avatar>
            <h1 class="text-white">{{ author.name }}</h1>
            <h2 class="text-white">{{ author.location }}</h2>
          </q-parallax>
        </div>
      </div>
      <article v-html="author.bio"></article>
    </main>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { Route } from 'vue-router';
import { Author } from '@tryghost/content-api';

interface SingleAuthor {
  author: Author;
  name: string;
}
export default defineComponent({
  name: 'SingleAuthor',
  data() {
    return { name: '', author: {} } as SingleAuthor;
  },
  async created() {
    this.author = await this.getAuthor(this.$route.params.slug);
  },
  methods: {
    getAuthor: async function(slug: string): Promise<Author> {
      const author: Author = await this.$ghost.authors.read({
        slug
      });
      return Promise.resolve(author);
    },
  },
  watch: {
    async $route(to: Route, from: Route) {
      if (from.params.slug === to.params.slug) return;
      this.author = await this.getAuthor(this.$route.params.slug);
    }
  },
  meta() {
    return {
      // sets document title
      title: 'post',
      // optional; sets final title as "Index Page - My Website", useful for multiple level meta
      titleTemplate: (title: string) => `${title} - The Blog of Devin Gray`,

      // meta tags
      meta: {
        description: {
          name: 'description',
          content: 'TBD'
        },
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
<style lang="scss">
main {
  max-width: 100%;
  overflow: hidden;
  .blog-jumbotron {
    > .q-parallax__content.absolute-full {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
  >>> article {
    pre,
    code {
      overflow-x: auto;
      white-space: pre-wrap;
      white-space: -moz-pre-wrap;
      white-space: -pre-wrap;
      white-space: -o-pre-wrap;
      word-wrap: break-word;
    }
  }
}
</style>
