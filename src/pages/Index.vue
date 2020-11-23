<template>
  <q-page class="row items-top justify-evenly">
    <div class="q-pa-md carousel-container">
      <q-carousel
        animated
        v-model="slide"
        horizontal
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-left"
        transition-next="slide-right"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide
          v-for="tag in tags"
          :key="tag.uuid"
          :name="tag.name"
          :img-src="tag.feature_image"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">{{ tag.name }}</div>
            <div class="text-subtitle1">{{ tag.description }}</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { mapGetters } from 'vuex';
export default defineComponent({
  name: 'PageIndex',
  data() {
    return {
      controlType: 'flat',
      controlTypeOptions: [
        { value: 'regular', label: 'regular' },
        { value: 'unelevated', label: 'unelevated' },
        { value: 'flat', label: 'flat (default)' },
        { value: 'outline', label: 'outline' },
        { value: 'push', label: 'push' }
      ],

      slide: 1,
      autoplay: true
    };
  },
  computed: {
    ...mapGetters({ tags: 'GhostModule/allTags' })
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
