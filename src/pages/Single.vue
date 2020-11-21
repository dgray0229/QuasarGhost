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
import { defineComponent } from '@vue/composition-api';
import { mapState } from 'vuex';
import { StateInterface } from '../store';
import { Route } from 'vue-router';

import { Identification, PostsOrPages, PostOrPage } from '@tryghost/content-api';

export interface SinglePostState {
  post: PostsOrPages;
  slug: Identification['slug'];
}
export default defineComponent({
  name: 'SinglePost',
  data() {
    return { slug: '' };
  },
  created() {
    this.slug = this.$route.params.slug;
  },
  computed: mapState({
    post(state: StateInterface) {
      const result: PostsOrPages = state?.GhostModule?.posts;
      result.filter((post: PostOrPage) => post?.slug === this.slug);
      return result[0];
    }
  })
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
