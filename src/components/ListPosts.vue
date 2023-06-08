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
    <template #loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import PostCard from 'components/PostCard.vue';

export default defineComponent({
  name: 'ListPosts',
  components: { PostCard },
  props: {
    postOptions: Object
  },
  setup(props) {
    const posts = ref([]);

    const { ghost } = window;

    const onLoad = async (index, done) => {
      let stopIndex = Infinity;
      const newPosts = await ghost.posts.browse({
        ...props.postOptions,
        page: index
      });
      if (newPosts) posts.value.push(...newPosts);
      if (!newPosts.length) stopIndex = index;
      done(index >= stopIndex);
    }

    const route = useRoute();

    const loadPosts = async () => {
      const postsData = await ghost.posts.browse({
        ...props.postOptions
      });
      posts.value = postsData;
    }

    loadPosts();

    // const loadPostsOnRouteChange = async (to, from) => {
    //   if (from.params.slug === to.params.slug) return;
    //   await loadPosts();
    // }

    return {
      posts,
      onLoad,
    }
  }
})
</script>
<style scoped lang="scss">
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
