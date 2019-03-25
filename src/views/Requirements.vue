<template>
  <div class="requirements">
    <h1>Requirements</h1>
    <Search/>
    <RequirementList :cr_list="cr_list"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Search from '@/components/Search.vue';
import RequirementList from '@/components/RequirementList.vue';
import {ICr} from '@/common/interfaces/ICr';
import {CrLoadService} from '@/common/services/CrLoadService';

export default Vue.extend({
  name: 'Requirements',
  components : {
    Search,
    RequirementList,
  },
  data() {
    return {
      cr_list: [] as ICr[]
    }
  },
  beforeCreate() {
    CrLoadService.load();
  },
  created() {
    this.cr_list = CrLoadService.get();
  }
});
</script>

<style lang="scss">

</style>