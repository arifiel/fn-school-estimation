<template>
  <div class="home">
    <PageHeader/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {AuthService} from '@/common/services/AuthService';
import PageHeader from '@/components/PageHeader.vue';

export default Vue.extend({
  name: 'Home',
  components : {
    PageHeader,
  },
});
</script>

<style lang="scss">
  .home {
    padding-top:50px;
  }

</style>