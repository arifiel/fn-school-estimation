<template>
  <div class="home">
    <PageHeader/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {AuthService} from '@/common/services/AuthService';
import PageHeader from '@/components/PageHeader.vue';

export default Vue.extend({
  name: 'Home',
  components : {
    PageHeader: PageHeader,
  },
});
</script>

<style lang="scss">


</style>