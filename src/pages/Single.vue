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
import { PostOrPage } from '@tryghost/content-api';

export default defineComponent({
  name: 'SinglePost',
  data() {
    return { slug: '', post: {} };
  },
  async created() {
    this.slug = this.$route.params.slug;
    this.post = await this.getPost();
  },
  methods: {
    getPost: async function(): Promise<PostOrPage> {
      const post: PostOrPage = await this.$ghost.posts.read({
        slug: this.slug
      });
      return Promise.resolve(post);
    }
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
