<template>
  <v-layout align-center justify-center>
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
                        <span>Assignee list: </span>
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
                    <span>Assignee list: </span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card-title>
        </v-card>
      </v-card>
      <v-spacer></v-spacer>
      <span>Tasks</span>
      <v-spacer></v-spacer>
      <v-card light>
        <v-data-table :headers="headers" :items="taskList">
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-left">{{ props.item.description }}</td>
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
import axios, {API_URLS} from '../axios';

export default Vue.extend({
  name : 'Inspect',
  props: {
    id: String,
    action: String,
  },
  computed: {
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
    headers : function () { 
      var result = [];
      let smallScreen = this.$vuetify.breakpoint.xs;
      if(smallScreen) {
        return  [
          { text: 'CR Number', value: 'id' },
          { text: 'Title', value: 'title' },
          { text: 'Actions', value: 'description', sortable: false},
        ];
      }
      return  [
        { text: 'CR Number', value: 'id' },
        { text: 'Title', value: 'title' },
        { text: 'Actions', value: 'description', sortable: false},
      ];
    },
  },
  beforeMount: function () {
    this.$store.dispatch('loadTasksForCr', this.id)
  },
})
</script>

<style lang="stylus" scoped>
.crData
  margin-top: 12px;
</style>

