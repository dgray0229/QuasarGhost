<template>
  <q-page padding>
    <!-- content -->
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
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { Route } from 'vue-router';
import { PostsOrPages } from '@tryghost/content-api';
import PostCard from 'components/PostCard.vue';

interface Posts {
  posts: PostsOrPages | [];
  slug: string;
  title: string;
}

export default defineComponent({
  name: 'List',
  data() {
    return { title: '', posts: [] } as Posts;
  },
  components: { PostCard },
  watch: {
    async $route(to: Route) {
      if (this.slug === to.params.slug) return;
      this.posts = await this.getPostsByTags(this.$route.params.slug);
    }
  },
    methods: {
    /* TODO: Convert to Getters and Setters */
    getPostsByTags: async function(slug: string): Promise<PostsOrPages> {
      const posts = await this.$ghost.posts.browse({
        filter: [`tag:${slug}`]
      });
      return Promise.resolve(posts);
    },
  },
  created: async function() {
    this.posts = await this.getPostsByTags(this.$route.params.slug);
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
