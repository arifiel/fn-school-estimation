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
              <v-btn icon @click="$refs.estimateTask.openDialog(props.item.id);" title='Estimate' :color="!estimation(props.item.id) ? 'blue' : 'green'">
                <v-icon v-if="!estimation(props.item.id)">hourglass_empty</v-icon>
                <span v-else v-text="estimation(props.item.id)"></span>
              </v-btn>  
            </td>
            <td class="text-xs-left" v-if="isMerge">
              <template v-for="estimator in estimationList(props.item)">
                <div :key="estimator.id">
                  <span v-text="estimator.estimation" class="title"></span> 
                  <span v-if="!$vuetify.breakpoint.xs" v-text="estimator.estimation ? ' by ' : 'waiting for '"></span> 
                  <span v-if="!$vuetify.breakpoint.xs" v-text="estimator.name"></span>
                </div>
              </template>
            </td>
            <td class="text-xs-right">
              <v-btn v-if="isMerge" icon @click="$refs.mergeEstimation.openDialog(props.item.id);"
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
  name : 'Inspect',
  components: {
    RemoveTask,
    EstimateTask,
    MergeEstimation,
  },
  props: {
    id: String,
    action: String,
  },
  data () {
    return {
      dialog: false,
      defaultItem: {
        title: '',
        description: '',
      },
      editedItem: {
        title: '',
        description: '',
      },
    }
  },
  methods: {
    estimation(taskId : string) {
      let task = this.taskList.filter(t => t.id === taskId)[0];
      if(!task) {
        return undefined;
      }
      let estimation = task.estimationList.find(e => e.userId === this.$store.state.user.id);
      if(!estimation) {
        return undefined;
      }
      return estimation.value;

    },
    estimationList(task : ITask) {
      let result = this.crData.assigned as Array<any>;
      result.forEach(r => r.estimation = task.estimationList.find(e => e.userId === r.id).value)
      return result;
    },
    reload() {
      if(!!this.id) {
        this.$store.dispatch('loadTasksForCr', this.id)
      }
    },
    addTask() {
      let title = this.editedItem.title;
      let description = this.editedItem.description;
      if (!title || !description) {
        this.$refs.newTaskForm.validate();
        this.snackbar = true;
        return;
      } else {
        this.$store.dispatch('createTask', {
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
      }, 300)
    },
  },
  computed: {
    required: function () { 
      return ValidationRules.required;
    },
    crData: function () : ICr { 
      if(this.$store.state.crList) {
        return this.$store.state.crList.find(cr => cr.id === this.id)
      }
    },
    taskList: function () : Array<ITask> {
      //return this.$store.dispatch('loadTasksForCr', this.id);
      if(!!this.$store.state.tasksForCr) {
        return this.$store.state.tasksForCr;
      }
      return [];
    },
    isEstimation : function () {
      return this.action === Actions.Estimate.toLowerCase();
    },
    isMerge : function () {
      return this.action === Actions.Merge.toLowerCase();
    },
    isMergeAllowed : function () {
      return this.isMerge && this.crData.status === CrStatus.WaitForMerge;
    },
    headers : function () { 
      var result = [];
      let smallScreen = this.$vuetify.breakpoint.xs;
      
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
  beforeMount: function () {
    if(!!this.id) {
      this.$store.dispatch('loadTasksForCr', this.id)
    }
  },
})
</script>

<style lang="stylus" scoped>
.crData
  margin-top: 12px;
</style>

