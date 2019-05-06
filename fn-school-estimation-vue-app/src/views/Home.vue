<template>
  <v-container id="home" fill-height>
    <router-view/>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export default Vue.extend({
  name : 'Home',
})
</script>
