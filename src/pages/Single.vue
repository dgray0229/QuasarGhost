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
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { RouteLocationNormalized } from 'vue-router';
import { PostOrPage } from '@tryghost/content-api';
import { GhostStateInterface } from '../store/ghost/state';

export default {
  name: 'SinglePost',
  setup() {
    const store = useStore<GhostStateInterface>();
    const post = ref<PostOrPage | null>(null);

    const fetchPostInfoBySlug = async (slug: string) => {
      await store.dispatch('ghostModule/fetchPostInfoBySlug', { slug });
      post.value = store.state.ghostModule.currentPost;
    };

    onMounted(async () => {
      await fetchPostInfoBySlug(store.state.ghostModule.currentPostSlug);
    });

    return {
      post,
    };
  },
  head() {
    return {
      // sets document title
      title: 'Post',
      // optional; sets final title as "Index Page - My Website", useful for multiple level meta
      titleTemplate: (title: string) => `${title} - The Blog of Devin Gray`,

      // meta tags
      meta: [
        { name: 'description', content: 'TBD' },
        { name: 'keywords', content: 'The Blog of Devin Gray' },
        { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
        {
          name: 'og:title',
          // optional; similar to titleTemplate, but allows templating with other meta properties
          template: (ogTitle: string) => `${ogTitle} - The Blog of Devin Gray`,
        },
      ],
    };
  },
};
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
