<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Devin Gray
        </q-toolbar-title>

        <div>
          <q-btn
            flat
            round
            @click="$q.dark.toggle()"
            :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
          />
          &copy; {{ new Date().getFullYear() }}
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="">
      <q-list>
        <q-item-label header>
          Pages
        </q-item-label>
        <q-avatar class="row flex-center">
          <img :src="author.profile_image" />
        </q-avatar>
        <EssentialRoute
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';
import EssentialRoute from 'components/EssentialRoute.vue';
// const linksData = [
//   {
//     title: 'Home',
//     caption: 'Devin Gray',
//     icon: 'home',
//     link: '/'
//   },
//   {
//     title: 'About',
//     caption: 'Devin Gray',
//     icon: 'person',
//     link: '/about-me'
//   },
//   {
//     title: 'Why I Created A Blog',
//     caption: '',
//     icon: 'web',
//     link: '/why-i-created-a-blog'
//   },
//   {
//     title: 'Posts',
//     caption: 'From Me',
//     icon: 'article',
//     link: '/posts'
//   }
// ];

import { defineComponent, ref } from '@vue/composition-api';
import { Author, Settings, SettingsResponse } from '@tryghost/content-api';

type EssentialLink = {
  title: string
  link: string
}
export default defineComponent({
  name: 'MainLayout',
  components: { EssentialLink, EssentialRoute },
  setup() {
    const leftDrawerOpen = ref(false);
    return { leftDrawerOpen };
  },
  data() {
    return {
      essentialLinks: [] as EssentialLink[],
      settings: {} as Settings | undefined,
      author: {} as Author | undefined
    };
  },
  methods: {
    getNavigationLinks: async function(): Promise<EssentialLink[]> {
      let settings: SettingsResponse | null = null;
      try {
        settings = await this.$ghost.settings.browse();
      } catch ({ message }) {
        console.error(message);
      }
      const navigation = settings?.navigation ?? [];
      let essentialLinks: EssentialLink[] = navigation.map(navigationItem => ({
        title: navigationItem?.label,
        link: navigationItem?.url
      }));
      return essentialLinks;
    },
    getPageAuthor: async function(): Promise<Author | undefined> {
      let author: Author | undefined;
      try {
        author = await this.$ghost.authors.read({ id: '1' }) ?? {};
      } catch ({ message }) {
        console.error(message);
      }
      if (author) return author;
    }
  },
  created: async function() {

    this.essentialLinks.push(...await this.getNavigationLinks());
    this.author = await this.getPageAuthor();
  }
});
</script>
