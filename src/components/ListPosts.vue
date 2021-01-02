<template>
  <!-- content -->
  <q-infinite-scroll @load="onLoad" :offset="200" :initial-index="1">
    <div class="q-pa-md">
      <div class="q-pa-md row items-start q-gutter-md postcard-container">
        <PostCard
          class="my-card"
          v-for="post in posts"
          :key="post.uuid"
          :title="post.title"
          :excerpt="post.custom_excerpt || post.excerpt"
          :created_at="post.created_at"
          :feature_image="post.feature_image"
          :slug="post.slug"
          :id="post.id"
        />
      </div>
    </div>
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { Params, PostsOrPages } from '@tryghost/content-api';
import { Route } from 'vue-router';
import PostCard from 'components/PostCard.vue';
interface Props {
  posts: PostsOrPages;
}
export default defineComponent({
  name: 'ListPosts',
  components: { PostCard },
  props: {
    postOptions: Object
  },
  data() {
    return { posts: [] as PostsOrPages | unknown[] };
  },
  async created() {
    const posts = await this.$ghost.posts.browse({
      ...this.postOptions
    } as Params);
    this.posts.push(...posts);
  },
  methods: {
    async onLoad(index: number, done: (bool?: boolean) => void) {
      let stopIndex = Infinity;
      const newPosts = await this.$ghost.posts.browse({
        ...this.postOptions,
        page: index
      } as Params);
      if (newPosts) this.posts.push(...newPosts);
      if (!newPosts.length) stopIndex = index;
      done(index >= stopIndex);
    }
  },
  watch: {
    async $route(to: Route, from: Route) {
      if (from.params.slug === to.params.slug) return;
      const posts = await this.$ghost.posts.browse({
        ...this.postOptions,
      } as Params);
      this.posts = posts;
    }
  }
});
</script>
<style lang="scss" scoped>
.postcard-container {
  .my-card {
    box-sizing: border-box;
    width: 300px;
    padding: 1px;
    > * {
      padding: 0.25rem 0.5rem;
      box-shadow: inset 0 0 0 2px $grey-6;
    }
  }
}
</style>
