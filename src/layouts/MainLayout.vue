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
          {{ author.title }}
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
      :breakpoint="400"
      show-if-above
      bordered
      content-class=""
    >
      <q-list v-if="author">
        <q-img class="" :src="author.cover_image" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img :src="author.profile_image" />
            </q-avatar>
            <div class="text-weight-bold">{{ author.name }}</div>
            <div>{{ author.twitter }}</div>
          </div>
        </q-img>
        <q-item-label header>
          {{ settings.description }}
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <q-list v-if="secondaryLinks">
        <q-expansion-item
          expand-separator
          icon="layers"
          label="Useful Links"
          :caption="author.name"
        >
          <q-card>
            <q-card-section>
              <EssentialLink
                v-for="link in secondaryLinks"
                :key="link.title"
                v-bind="link"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';
import { defineComponent, ref } from '@vue/composition-api';
import { Author, Settings, SettingsResponse } from '@tryghost/content-api';

type EssentialLink = {
  title: string;
  link: string;
  icon?: string;
  caption?: string;

};
export default defineComponent({
  name: 'MainLayout',
  components: { EssentialLink },
  setup() {
    const leftDrawerOpen = ref(false);
    return { leftDrawerOpen };
  },
  data() {
    return {
      essentialLinks: [] as EssentialLink[],
      secondaryLinks: [] as EssentialLink[],
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
        caption: '',
        icon: 'article',
        link: navigationItem?.url,
      }));
      return essentialLinks;
    },
    getSecondaryNavigationLinks: async function(): Promise<EssentialLink[]> {
      let settings: Settings | null = null;
      try {
        settings = await this.$ghost.settings.browse();
      } catch ({ message }) {
        console.error(message);
      }
      const secondary_navigation = settings?.secondary_navigation ?? [];
      let secondaryLinks: EssentialLink[] = secondary_navigation.map(
        navigationItem => ({
          title: navigationItem?.label,
          caption: '',
          icon: 'article',
          link: navigationItem?.url,
        })
      );
      return secondaryLinks;
    },
    getPageAuthor: async function(): Promise<Author | undefined> {
      let author: Author | undefined;
      try {
        author = (await this.$ghost.authors.read({ id: '1' })) ?? {};
      } catch ({ message }) {
        console.error(message);
      }
      if (author) return author;
    }
  },
  created: async function() {
    this.essentialLinks.push(...(await this.getNavigationLinks()));
    this.secondaryLinks.push(...(await this.getSecondaryNavigationLinks()));
    this.author = await this.getPageAuthor();
  }
});
</script>
