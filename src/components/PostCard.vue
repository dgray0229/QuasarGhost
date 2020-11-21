<template>
  <q-card>
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">{{ title }}</div>
      <div class="text-subtitle2">{{ created_at | formatDate }}</div>
    </q-card-section>
    <q-card-section>
      <img :src="feature_image" />
    </q-card-section>
    <q-separator />

    <q-card-section align="right">
      <p>{{ excerpt }}</p>
      <q-btn
        :to="{ name: 'single', params: { slug: slug, id: id } }"
        :slug="slug"
        :ripple="{ center: true }"
        color="secondary"
        label="Read More"
        no-caps
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
export interface PostCardInterface {
  props: Record<string, unknown>;
}
export default defineComponent({
  name: 'PostCard',
  props: {
    // type check
    title: String,
    excerpt: String,
    created_at: String,
    feature_image: String,
    slug: String,
    id: String
  } as PostCardInterface['props'],
  filters: {
    formatDate: function(value: Date) {
      if (value) {
        const formattedDate: dayjs.Dayjs = dayjs(value);
        return formattedDate;
      }
    },
    formatSlug: function(value: string) {
      if (value) {
        return `posts/${value}`;
      }
    }
  }
});
</script>
<style lang="scss" scoped>
img {
  max-width: 100%;
  max-height: auto;
  object-fit: cover;
}
</style>
