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
import { mapGetters } from 'vuex';
import { defineComponent } from '@vue/composition-api';
import PostCard from 'components/PostCard.vue';

export default defineComponent({
  name: 'Posts',
  components: { PostCard },
  computed: {
    ...mapGetters({ posts: 'GhostModule/allPosts' })
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
