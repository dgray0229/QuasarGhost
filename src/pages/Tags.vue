<template>
  <q-page padding>
    <!-- content -->
    <list-posts :postOptions="postOptions" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { Params, PostsOrPages } from '@tryghost/content-api';
import ListPosts from 'components/ListPosts.vue';

interface Posts {
  posts: PostsOrPages | [];
}

const defaultPostOptions: Params = {
  include: ['tags', 'authors'],
  fields: [
    'id',
    'uuid',
    'title',
    'slug',
    'custom_excerpt',
    'excerpt',
    'created_at',
    'feature_image'
  ]
};

export default defineComponent({
  name: 'Tags',
  components: { ListPosts },
  data() {
    return { postOptions: {} };
  },
  created() {
    this.postOptions = {
      ...defaultPostOptions,
      filter: [`tag:${this.$route.params.slug}`]
    };
  },
});
</script>
<style lang="scss" scoped></style>
