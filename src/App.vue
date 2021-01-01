<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

interface App {
  title: string;
}
export default defineComponent({
  name: 'App',
});
</script>
