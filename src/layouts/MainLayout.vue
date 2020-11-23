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

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class=""
    >
      <q-list>
        <q-item-label header>
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
  },
  data() {
    return {};
  },
});
</script>
