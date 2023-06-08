<template>
  <q-page padding>
    <main v-if="author">
      <div class="q-pa-md q-gutter-md">
        <div class="row justify-between">
          <q-parallax class="blog-jumbotron" :src="author.cover_image">
            <q-avatar class="row flex-center">
              <img :src="author.profile_image" />
            </q-avatar>
            <h1 class="text-white">{{ author.name }}</h1>
            <h2 class="text-white">{{ author.location }}</h2>
          </q-parallax>
        </div>
      </div>
      <article v-html="author.bio"></article>
    </main>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import { Author } from '@tryghost/content-api';
import { GhostAPI } from '@tryghost/content-api';

interface CustomAppContext {
  $ghost: GhostAPI; // Replace 'any' with the appropriate type for the $ghost object
}

export default defineComponent({
  name: 'SingleAuthor',
  setup() {
    const author = ref<Author | null>(null);
    const route = useRoute();
    const appInstance = getCurrentInstance()?.appContext.app as CustomAppContext | undefined; // Update the type

    const getAuthor = async (slug: string): Promise<Author> => {
      if (appInstance) {
        const author: Author = await appInstance.$ghost.authors.read({ slug }); // Access the $ghost object from the app instance
        return author;
      } else {
        throw new Error('Unable to access $ghost object.');
      }
    };

    const fetchAuthor = async () => {
      author.value = await getAuthor(route.params.slug as string);
    };

    watch(
      () => route.params.slug,
      async (to, from) => {
        if (from === to) return;
        await fetchAuthor();
      }
    );

    fetchAuthor();

    return {
      author,
    };
  },
  head() {
    return {
      title: 'post',
      titleTemplate: (title: string) => `${title} - The Blog of Devin Gray`,
      meta: [
        { name: 'description', content: 'TBD' },
        { name: 'keywords', content: 'The Blog of Devin Gray' },
        { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
        {
          name: 'og:title',
          template: (ogTitle: string) => `${ogTitle} - The Blog of Devin Gray`,
        },
      ],
    };
  },
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
