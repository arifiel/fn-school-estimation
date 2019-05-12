<template>
  <v-layout align-center justify-center>
    <RemoveTask ref="removeTask"/>
    <EstimateTask ref="estimateTask"/>
    <MergeEstimation ref="mergeEstimation"/>

    <v-flex class='text-xs-center display-1'>
      <span>Requirement description</span>
      <v-spacer></v-spacer>
      <v-card light>
        <v-expansion-panel v-if='$vuetify.breakpoint.xs'>
          <v-expansion-panel-content>
            <template v-slot:header>
              <v-icon>list</v-icon><span class="title">Toggle description</span>
            </template>
            <v-card>
              <v-card-title>
                <v-card-text class="title">
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <span class="display-1">CR: {{crData.id}}</span>
                      </v-flex>
                      <v-flex class='crData' xs12 sm6 md4>
                        <span>Status: {{crData.status}}</span>
                      </v-flex>
                      <v-flex class='crData' xs12 sm6 md4>
                        <span>Created by: {{crData.owner.name}}</span>
                      </v-flex>
                      <v-flex class='crData' xs12 sm6 md4>
                        <span>Project: {{crData.project.name}}</span>
                      </v-flex>
                      <v-flex class='crData' xs12 sm6 md4>
                        <span>Version: {{crData.project.version}}</span>
                      </v-flex>
                      <v-flex class='crData' xs12 sm6 md4>
                        <span>Jira link: {{crData.project.jiraLink}}</span>
                      </v-flex>
                      <v-flex class='crData' xs12 sm12 md12 >
                        <span>Assignee list:</span>
                        <span v-for="(assignee) in crData.assigned" :key="assignee.id"> {{assignee.name}}</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card-title>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-card v-if='!$vuetify.breakpoint.xs'>
          <v-card-title>
            <v-card-text class="title">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <span class="display-1">CR: {{crData.id}}</span>
                  </v-flex>
                  <v-flex class='crData' xs12 sm6 md4>
                    <span>Status: {{crData.status}}</span>
                  </v-flex>
                  <v-flex class='crData' xs12 sm6 md4>
                    <span>Created by: {{crData.owner.name}}</span>
                  </v-flex>
                  <v-flex class='crData' xs12 sm6 md4>
                    <span>Project: {{crData.project.name}}</span>
                  </v-flex>
                  <v-flex class='crData' xs12 sm6 md4>
                    <span>Version: {{crData.project.version}}</span>
                  </v-flex>
                  <v-flex class='crData' xs12 sm6 md4>
                    <span>Jira link: {{crData.project.jiraLink}}</span>
                  </v-flex>
                  <v-flex class='crData' xs12 sm12 md12 >
                    <span>Assignee list:</span>
                    <span v-for="(assignee) in crData.assigned" :key="assignee.id"> {{assignee.name}}</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card-title>
        </v-card>
      </v-card>
      <v-spacer></v-spacer>
      <br/><br/>
      <span>Tasks</span>
      <v-spacer></v-spacer>
      <v-card light>
        <v-layout row>
          <v-dialog v-model="dialog" max-width="500px" >
            <template v-slot:activator="{ on }">
              <v-btn icon class="mb-2" v-on="on" title='Add Task'>
                <v-icon large>add_circle</v-icon>
              </v-btn>
            </template>
            <v-form  @submit.prevent="addTask" ref="newTaskForm">
              <v-card>
                <v-card-title>
                  <span class="headline">Create new Task</span>
                </v-card-title>
                <v-card-text>
                  <v-card light>
                    <v-card-text>
                      <v-text-field v-model="editedItem.title" label="Title" :rules="[required(editedItem.title)]"></v-text-field>
                      <v-textarea v-model="editedItem.description" label="Description" :rules="[required(editedItem.description)]"></v-textarea>
                    </v-card-text>
                  </v-card>
                </v-card-text>
                <v-card-actions>
                  <v-card-text class="text-xs-right">
                    <v-spacer></v-spacer>
                    <v-btn light type='submit'>Save</v-btn>
                    <v-btn @click="close">Cancel</v-btn>
                  </v-card-text>
                </v-card-actions>
              </v-card>
            </v-form>  
          </v-dialog>
          <v-spacer></v-spacer>
          <v-btn icon @click="reload" title='Reload Task list'>
            <v-icon large>cached</v-icon>
          </v-btn>
        </v-layout>

        <v-data-table :headers="headers" :items="taskList">
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td v-if="!$vuetify.breakpoint.xs" class="text-xs-left">{{ props.item.description }}</td>
            <td class="text-xs-left" v-if="isEstimation">
              <v-btn icon @click="$refs.estimateTask.openDialog(props.item.id);" title='tasksForCr/Estimate' :color="!estimation(props.item.id) ? 'blue' : 'green'">
                <v-icon v-if="!estimation(props.item.id)">hourglass_empty</v-icon>
                <span v-else v-text="estimation(props.item.id)"></span>
              </v-btn>  
            </td>
            <td class="text-xs-left" v-if="isMerge">
              <template v-for="estimator in estimationList(props.item)">
                <div :key="estimator.id">
                  <span v-text="!!estimator.estimation ? estimator.estimation.value : ''" class="title"></span> 
                  <span v-if="!$vuetify.breakpoint.xs" v-text="estimator.estimation ? ' by ' : 'waiting for '"></span> 
                  <span v-if="!$vuetify.breakpoint.xs" v-text="estimator.name"></span>
                </div>
              </template>
            </td>
            <td class="text-xs-right">
              <v-btn v-if="isMergeAllowed" icon @click="$refs.mergeEstimation.openDialog(props.item.id);"
                  title='Merege estimation' :color="!props.item.mergedEstimation ? 'blue' : 'green'">
                <v-icon v-if="!props.item.mergedEstimation">merge_type</v-icon>
                <span v-else v-text="props.item.mergedEstimation"></span>
              </v-btn>  
              <v-btn icon @click="$refs.removeTask.openDialog(props.item.id);" title='Remove task'>
                <v-icon>delete</v-icon>
              </v-btn>  
            </td>
          </template>

        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>  
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Actions} from '../common/interfaces/Actions';
import {ICr} from '../common/interfaces/ICr';
import {ITask} from '../common/interfaces/ITask';
import {CrStatus} from '../common/interfaces/CrStatus';
import ValidationRules from '../common/util/ValidationRules';
import RemoveTask from '../components/RemoveTask.vue';
import EstimateTask from '../components/EstimateTask.vue';
import MergeEstimation from '../components/MergeEstimation.vue';

export default Vue.extend({
  name: 'Inspect',
  components: {
    RemoveTask,
    EstimateTask,
    MergeEstimation,
  },
  props: {
    id: String,
    action: String,
  },
  data:() => ({
    dialog: false,
    defaultItem: {
      title: '',
      description: '',
    },
    editedItem: {
      title: '',
      description: '',
    },
  }),
  methods: {
    estimation(taskId: string) {
      const task = this.taskList.filter(t => t.id === taskId)[0];
      if(!task) {
        return undefined;
      }
      if(!task.estimationList) {
        return undefined;
      }
      const estimation = task.estimationList.find(e => e.userId === this.$store.state.user.data.id);
      if(!estimation) {
        return undefined;
      }
      return estimation.value;

    },
    estimationList(task: ITask) {
      const result = this.crData.assigned as Array<any>;
      if(!task.estimationList) {
        return [];
      }
      result.forEach(r => r.estimation = task.estimationList.find(e => e.userId === r.id));
      return result;
    },
    reload() {
      if(!!this.id) {
        this.$store.dispatch('tasksForCr/load', this.id);
        this.$store.dispatch('cr/load', this.id);
      }
    },
    addTask() {
      const title = this.editedItem.title;
      const description = this.editedItem.description;
      if(!title || !description) {
        this.$refs.newTaskForm.validate();
        this.snackbar = true;
        return;
      } else {
        this.$store.dispatch('tasksForCr/create', {
          cr_id: this.id,
          title: title,
          description: description,
        });
      }
      this.close();
    },
    close() {
      this.dialog = false;
      this.$refs.newTaskForm.reset();
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300);
    },
  },
  computed: {
    allMerged: function() {
      return this.taskList.every(t => !!t.mergedEstimation);
    },
    allEstimated: function() {
      return this.taskList.every(t => !!this.estimation(t.id));
    },
    required: function() { 
      return ValidationRules.required;
    },
    crData: function(): ICr { 
      if(!!this.$store.state.cr.data) {
        return this.$store.state.cr.data;
      } else {
        return {owner: '', project: ''} as ICr;
      }
    },
    taskList: function(): Array<ITask> {
      if(!!this.$store.state.tasksForCr.data) {
        return this.$store.state.tasksForCr.data;
      }
      return [];
    },
    isEstimation: function() {
      return this.action === Actions.Estimate.toLowerCase();
    },
    isMerge: function() {
      console.log(this.crData.status);
      
      return this.action === Actions.Merge.toLowerCase() 
        || (this.crData.status == CrStatus.Assigned && this.$store.state.user.data.roles.includes('manager'));
    },
    isMergeAllowed: function() {
      console.log(this.crData.status);
      
      return this.action === Actions.Merge.toLowerCase();
    },
    headers: function() { 
      var result = [];
      const smallScreen = this.$vuetify.breakpoint.xs;
      
      if(this.isEstimation || this.isMerge) {
        if(smallScreen) {
          return  [
            { text: 'ID', value: 'id' },
            { text: 'Title', value: 'title' },
            { text: 'Estimation', value: 'estimation', sortable: false },
            { text: 'Actions', value: 'actions', sortable: false , align: 'right'},
          ];
        }
        return  [
          { text: 'Task number', value: 'id' },
          { text: 'Title', value: 'title' },
          { text: 'Description', value: 'description', sortable: false},
          { text: 'Estimation', value: 'estimation', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false , align: 'right'},
        ];
      }
      if(smallScreen) {
          return  [
            { text: 'ID', value: 'id' },
            { text: 'Title', value: 'title' },
            { text: 'Actions', value: 'actions', sortable: false , align: 'right'},
          ];
        }
        return  [
          { text: 'Task number', value: 'id' },
          { text: 'Title', value: 'title' },
          { text: 'Description', value: 'description', sortable: false},
          { text: 'Actions', value: 'actions', sortable: false, align: 'right'},
        ];
    },
  },
  watch : {
    allMerged: function (val) {
      if(val) {
        this.$store.dispatch('cr/load', this.id);
      }
    },
    allEstimated: function (val) {
      if(val) {
        this.$store.dispatch('cr/load', this.id);
      }
    },
  },
  beforeMount: function () {
    if(!!this.id) {
      this.$store.dispatch('tasksForCr/load', this.id);
      this.$store.dispatch('cr/load', this.id);
    }
  },
})
</script>

<style lang="stylus" scoped>
.crData
  margin-top: 12px;
</style>

