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

        <div>&copy; {{ new Date().getFullYear() }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Pages
        </q-item-label>
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

const linksData = [
  {
    title: 'Home',
    caption: 'Devin Gray',
    icon: 'home',
    link: '/'
  },
  {
    title: 'About',
    caption: 'Devin Gray',
    icon: 'person',
    link: '/about-me'
  },
  {
    title: 'Why I Created A Blog',
    caption: '',
    icon: 'web',
    link: '/why-i-created-a-blog'
  },
  {
    title: 'Posts',
    caption: 'From Me',
    icon: 'article',
    link: '/posts'
  }
];

import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'MainLayout',
  components: { EssentialLink, EssentialRoute },
  setup() {
    const leftDrawerOpen = ref(false);
    const essentialLinks = ref(linksData);

    return { leftDrawerOpen, essentialLinks };
  }
});
</script>
