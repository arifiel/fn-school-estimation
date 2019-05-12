<template>
  <v-dialog
    v-model="closeCrDialog"
    max-width="500"
  >
    <v-card>
      <v-card-title class="headline">Add assignees to CR {{crId}}</v-card-title>
      <v-card>
        <v-card-text>
          <v-card light >
            <v-card-title class="title">
              Assignee list
            </v-card-title>
            <v-card-text>
              <v-card-text v-if="assigned.length <= 0">Please, add an assignee</v-card-text>
              <template v-for="item in assigned" >
                <v-layout row :key="item.id">
                  <v-flex class="text-xs-left">
                    <v-card-text v-text="item.name"></v-card-text>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex class="text-xs-right">
                    <v-btn icon @click="removeAssignee(item)">
                      <v-icon color="grey lighten-1">clear</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-divider row :key="item.id + '-devider'"></v-divider>
              </template>
            </v-card-text>
            <br/>
            <v-card-title class="title">
              User list
            </v-card-title>
            <v-card-text>
              <v-card-text v-if="workerList.length <= 0">No users available</v-card-text>
              <template v-for="item in workerList" >
                <v-layout row :key="item.id">
                  <v-flex class="text-xs-left">
                    <v-card-text v-text="item.name"></v-card-text>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex class="text-xs-right">
                    <v-btn icon @click="addAssignee(item)">
                      <v-icon color="grey lighten-1">add</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-divider row :key="item.id + '-devider'"></v-divider>
              </template>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn light @click="addAssignees()">
          Update Assignee list
        </v-btn>

        <v-btn @click="closeCrDialog = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {IAssignee} from '../common/interfaces/IAssignee';

  export default {
    name: 'AddAssignee',
    data: () => ({
      closeCrDialog: false,
      crId: '',
      assigned: [] as Array<IAssignee>,
    }),
    computed: {
      workerList: function () { 
        if(!this.$store.state.userList) {
          return [];
        }
        return this.$store.state.userList.filter(u => u.roles.includes('worker')).filter(u => !this.assigned.map(a => a.id).includes(u.id));
      },
    },
    methods: {
      openDialog(crId: string) {
        this.crId = crId;
        this.assigned = Object.assign([], this.$store.state.crList.filter(cr => cr.id === crId)[0].assigned);
        this.closeCrDialog = true;
      },
      removeAssignee(item: IAssignee) {
        const index = this.assigned.indexOf(item);
        console.log(index);
        if (index > -1) {
          this.assigned.splice(index, 1);
        }
      },
      addAssignee(item: IAssignee) {
        this.assigned.push(item);
      },
      addAssignees() {
        const assigned = this.assigned;
        const crId = this.crId;
        this.$store.dispatch('updateAssigneeList', {'crId': crId, 'assigned' : assigned});
        this.closeCrDialog = false;
      },
    }
  }
</script>

<style scoped>

</style>
