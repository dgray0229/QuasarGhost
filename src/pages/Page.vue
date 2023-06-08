<template>
  <q-page padding>
    <!-- content -->
    <main v-html="page.html"></main>
  </q-page>
</template>

<script>
import { defineComponent, onBeforeUpdate } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Page',
  computed: {
    page() {
      return this.$store.getters['ghostModule/getPage'];
    },
  },
  async mounted() {
    await this.fetchPageInfoBySlug(this.$route.params.slug);
  },
  methods: {
    async fetchPageInfoBySlug(slug) {
      await this.$store.dispatch('ghostModule/fetchPageInfoBySlug', {
        slug,
      });
    },
  },
  watch: {
    $route(to, from) {
      if (from.params.slug === to.params.slug) return;
      this.fetchPageInfoBySlug(to.params.slug);
    },
  },
  setup() {
    const store = useStore;
    const route = useRoute();

    onBeforeUpdate(async (to) => {
      if (to.params.slug !== route.value.params.slug) {
        await store.dispatch('ghostModule/fetchPageInfoBySlug', {
          slug: to.params.slug,
        });
      }
    });

    return {
      store,
      route,
    };
  },
  head() {
    return {
      // sets document title
      title: 'Page',
      // optional; sets final title as "Index Page - My Website", useful for multiple level meta
      titleTemplate: (title) => `${title} - The Blog of Devin Gray`,

      // meta tags
      meta: [
        { name: 'description', content: 'TBD' },
        { name: 'keywords', content: 'TBD' },
        { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
        {
          name: 'og:title',
          // optional; similar to titleTemplate, but allows templating with other meta properties
          template: (ogTitle) => `${ogTitle} - The Blog of Devin Gray`,
        },
      ],
    };
  },
});
</script>
