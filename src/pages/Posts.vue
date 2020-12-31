<template>
  <list-posts />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ListPosts from 'components/ListPosts.vue';
import PostCard from 'components/PostCard.vue';

export default defineComponent({
  name: 'Posts',
  components: { ListPosts, PostCard },
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
