<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
  name: 'App',
  created() {
    void this.$store.dispatch('GhostModule/fetchPostInfo');
    void this.$store.dispatch('GhostModule/fetchPageInfo');
    void this.$store.dispatch('GhostModule/fetchTags');
  }
});
</script>
