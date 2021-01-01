<template>
  <q-page padding>
    <main v-if="post">
      <div class="q-pa-md q-gutter-md">
        <div class="row justify-between">
          <q-parallax class="blog-jumbotron" :src="post.feature_image">
            <h1 class="text-white">{{ post.title }}</h1>
          </q-parallax>
        </div>
      </div>
      <article v-html="post.html"></article>
    </main>
  </q-page>
</template>

<script lang="ts">
import { preFetch } from 'quasar/wrappers';
import { mapGetters, Store } from 'vuex';
import { defineComponent } from '@vue/composition-api';
import { Route } from 'vue-router';
import { PostOrPage } from '@tryghost/content-api';
import { GhostStateInterface } from '../store/ghost/state';

interface Post {
  post: PostOrPage;
  slug: string;
  title: string;
}
export default defineComponent({
  name: 'SinglePost',
  preFetch: preFetch<Store<GhostStateInterface>>(async ({ store, currentRoute }) => {
    void await store.dispatch('ghostModule/fetchPostInfoBySlug', currentRoute.params.slug);
  }),
    computed: mapGetters({
    post: 'ghostModule/getPost',
  }),
  watch: {
    async $route(to: Route, from: Route) {
      if (from.params.slug === to.params.slug) return;
      void await this.$store.dispatch('ghostModule/fetchPostInfoBySlug', to.params.slug);

    }
  },
  meta() {
    return {
      // sets document title
      title: 'Post',
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
