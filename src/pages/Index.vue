<template>
  <q-page class="row items-top justify-evenly">
    <tag-carousel :tags="tags" />
    <list-posts :postOptions="postOptions" />
  </q-page>
</template>

<script lang="ts">
import { preFetch } from 'quasar/wrappers';
import { mapGetters, Store } from 'vuex';
import { defineComponent } from '@vue/composition-api';
import ListPosts from 'components/ListPosts.vue';
import TagCarousel from 'components/TagCarousel.vue';
import { GhostStateInterface } from '../store/ghost/state';
import { Params, PostsOrPages, Tags } from '@tryghost/content-api';

interface Getters {
  tags: Tags;
  posts: PostsOrPages;
}

const allTagsOptions: Record<string, unknown> = {
  fields: ['uuid', 'name', 'feature_image', 'description']
};
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
  components: { ListPosts, TagCarousel },
  name: 'PageIndex',
  preFetch: preFetch<Store<GhostStateInterface>>(async ({ store }) => {
    void (await store.dispatch('ghostModule/fetchAllTags', allTagsOptions));
  }),
  computed: {
    ...mapGetters({
      tags: 'ghostModule/getTags'
    }),
    postOptions() {
      return {
        ...defaultPostOptions
      };
    }
  },
  meta() {
    return {
      // sets document title
      title: 'Home',
      // optional; sets final title as "Index Page - My Website", useful for multiple level meta
      titleTemplate: (title: string) => `${title} - The Blog of Devin Gray`,

      // meta tags
      meta: {
        description: { name: 'description', content: 'TBD' },
        keywords: { name: 'keywords', content: 'TBD' },
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
.carousel-container {
  width: 100%;
  .custom-caption {
    text-align: center;
    padding: 0.75rem 0.75rem 3rem;
    color: white;
    background-color: rgba(0, 0, 0, 0.4);
  }
}
</style>
