<template>
  <div class="inspect">
    <div class="description">
      <h3>CR: {{cr.id}}</h3>
      <div class ="first_line">Status: {{cr.status}}</div>
      <div/>
      <div>Version: {{cr.version}}</div>
      <div>Created at: {{cr.created_at.toLocaleDateString()}}</div>
      <div>Assignee: Username</div>
      <div class="last_line">Owner: {{cr.owner.name}}</div>
      <div class="last_line">Jira URL:</div>
      <div class="last_line">Assignee: Username</div>
    </div>
    <div class="tasks">
      <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Estimation</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {ICr} from '@/common/interfaces/ICr';
import {CrLoadService} from '@/common/services/CrLoadService';
import {CrStatus} from '@/common/interfaces/CrStatus';

export default Vue.extend({
  name: 'Inspect',
  data() {
    return {
      cr: this.$data as ICr | undefined
    }
  },
  beforeCreate() {
    CrLoadService.load();
  },
  created() {
    const cr_list = CrLoadService.get();
    this.cr = cr_list.find((cr_element: ICr) => {
      return cr_element.id === this.$route.params.id;
    });
    if(this.cr === undefined) {
      this.cr = {
        id: "0000",
        title: "No such CR",
        status: CrStatus.Closed,
        project: {
            id: "0000",
            name: "No such Proj",
        },
        owner: {
            id: "0000",
            name: "No such Person",
            roles: [],
        },
        version: "0.0.0.0.0",
        created_at: new Date("2018-03-16"),
        tasks: [],
      } as ICr;
    }
  }
});
</script>

<style lang="scss">

.inspect {
  

  .description {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 20px;
    border: 1px solid #CCCCCC;
  }
  .first_line {
    padding-top: 25px;
  }

  .last_line {
    padding-bottom: 25px;
  }

.tasks {
  table {
    width: 100%;
  }
  table, tr, th, td {
    border: 1px solid #CCCCCC;
  }
}

}

@media (max-width: 600px) {
  .inspect {
    .description {
      width: 100%;
      grid-template-columns: 1fr;
    }
  }
}

</style>