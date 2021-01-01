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
import { preFetch } from 'quasar/wrappers';
import { mapGetters, Store } from 'vuex';
import EssentialLink from 'components/EssentialLink.vue';
import { defineComponent, ref } from '@vue/composition-api';
import { Settings } from '@tryghost/content-api';
import { GhostStateInterface } from '../store/ghost/state';

type EssentialLink = {
  title: string;
  link: string;
  icon?: string;
  caption?: string;
};
export default defineComponent({
  name: 'MainLayout',
  components: { EssentialLink },
  preFetch: preFetch<Store<GhostStateInterface>>(async ({ store }) => {
    void (await store.dispatch('ghostModule/fetchAllSettings'));
    void (await store.dispatch('ghostModule/fetchAuthorById', '1'));
  }),
  setup() {
    const leftDrawerOpen = ref(false);
    return { leftDrawerOpen };
  },
  data() {
    return {
      essentialLinks: [] as EssentialLink[],
      secondaryLinks: [] as EssentialLink[]
    };
  },
  computed: {
    ...mapGetters({
      settings: 'ghostModule/getSettings',
      author: 'ghostModule/getAuthor'
    })
  },
  methods: {
    getNavigationLinks: function(
      navigation: Settings['navigation']
    ): EssentialLink[] {
      if (!navigation) navigation = [];
      let essentialLinks: EssentialLink[] = navigation?.map(navigationItem => ({
        title: navigationItem?.label,
        caption: '',
        icon: 'article',
        link: navigationItem?.url
      }));
      return essentialLinks;
    }
  },
  created: function() {
    const settings = this.settings as Settings;
    this.essentialLinks.push(...this.getNavigationLinks(settings?.navigation));
    this.secondaryLinks.push(
      ...this.getNavigationLinks(settings?.secondary_navigation)
    );
  }
});
</script>
