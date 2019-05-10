<template>
  <v-layout align-center justify-center>
    <CloseCr ref="closeCr"/>
    <ApproveCr ref="approveCr"/>
    <RejectCr ref="rejectCr"/>
    <AddAssignee ref="addAssignee"/>

    <v-flex class='text-xs-center display-1'>
      <span>Requirements</span>
      <v-spacer></v-spacer>
      <v-card light>
          <v-expansion-panel v-if='$vuetify.breakpoint.xs'>
            <v-expansion-panel-content>
              <template v-slot:header>
                <v-icon>search</v-icon><span class="title">Search options</span>
              </template>
              <v-card>
                <v-card-title>
                  <v-text-field single-line hide-details label="CR number" append-icon="search" v-model="cr_number"></v-text-field>
                  <v-text-field single-line hide-details label="Title" append-icon="search" v-model="cr_title"></v-text-field>
                  <v-autocomplete class="autocomplete" v-model="cr_project" :items='projects' label='Project'></v-autocomplete>
                  <v-autocomplete class="autocomplete" v-model="cr_status" :items='status' label='Status'></v-autocomplete>
                </v-card-title>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-card-title v-if='!$vuetify.breakpoint.xs'>
            <v-text-field single-line hide-details label="CR number" append-icon="search" v-model="cr_number"></v-text-field>
            <v-text-field single-line hide-details label="Title" append-icon="search" v-model="cr_title"></v-text-field>
            <v-autocomplete class="autocomplete" v-model="cr_project" :items='projects' label='Project'></v-autocomplete>
            <v-autocomplete class="autocomplete" v-model="cr_status" :items='status' label='Status'></v-autocomplete>
          </v-card-title>

          <v-card-text class="text-xs-right">
            <v-layout row>
              <v-dialog v-if='isArchitect' v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn icon class="mb-2" v-on="on" title='Add CR'>
                    <v-icon large>add_circle</v-icon>
                  </v-btn>
                </template>
                <v-form  @submit.prevent="addCr" ref="newCrForm">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Create new CR</span>
                    </v-card-title>
                    <v-card-text>
                      <v-card light>
                        <v-card-title>
                          <span class="title">CR information</span>
                        </v-card-title>
                        <v-card-text>
                          <v-text-field v-model="editedItem.title" label="Title" :rules="[required(editedItem.title)]"></v-text-field>
                          <v-autocomplete :items='projects' v-model="editedItem.project.name" label="Project" :rules="[required(editedItem.project.name)]"></v-autocomplete>
                          <v-autocomplete :items='versions' v-model="editedItem.project.version" label="Version" :rules="[required(editedItem.project.version)]"></v-autocomplete>
                          <v-text-field v-model="editedItem.jiraLink" label="Jira Link"></v-text-field>
                        </v-card-text>
                      </v-card>
                      <v-card light>
                        <v-card-title>
                          <span class="title">Default task</span>
                        </v-card-title>
                        <v-card-text>
                          <v-text-field v-model="editedItem.task.title" label="Title" :rules="[required(editedItem.task.title)]"></v-text-field>
                          <v-textarea v-model="editedItem.task.description" label="Description" :rules="[required(editedItem.task.description)]"></v-textarea>
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
              <v-spacer v-if='isArchitect'></v-spacer>
              <v-btn icon @click="reload" title='Reload CR list'>
                  <v-icon large>cached</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="clearFilters" title='Clear search filters'>
                <v-icon large>clear</v-icon>
              </v-btn>
            </v-layout>
            <v-data-table :headers="headers" :items="filterdItems()">
              <template v-slot:items="props">
                <td class="text-xs-left">CR{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.title }}</td>
                <td v-if='!$vuetify.breakpoint.xs' class="text-xs-left">{{ props.item.status }}</td>
                <td v-if='!$vuetify.breakpoint.xs' class="text-xs-left">{{ props.item.owner.name }}</td>
                <td v-if='!$vuetify.breakpoint.xs' class="text-xs-left">{{ props.item.project.name }}</td>
                <td v-if='!$vuetify.breakpoint.xs' class="text-xs-left">{{ props.item.project.version }}</td>
                <td v-if='!$vuetify.breakpoint.xs' class="text-xs-left">{{ formatDate(props.item.created_at) }}</td>
                <td class="text-xs-left">
                  <v-btn :title="action" icon v-bind:key='action.id' v-for="(action) in getActions(props.item)" :class='getColor(action)' @click='() => callAction(action, props.item)'>
                    <v-icon>{{getIcon(action)}}</v-icon>
                  </v-btn>
                </td>
              </template>

            </v-data-table>
          </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Actions} from '../common/interfaces/Actions';
import {ICr} from '../common/interfaces/ICr';
import {CrStatus} from '../common/interfaces/CrStatus';
import ValidationRules from '../common/util/ValidationRules';
import CloseCr from '../components/CloseCr.vue';
import ApproveCr from '../components/ApproveCr.vue';
import RejectCr from '../components/RejectCr.vue';
import AddAssignee from '../components/AddAssignee.vue';

export default Vue.extend({
  name : 'Requirements',
  components: {
    CloseCr,
    ApproveCr,
    RejectCr,
    AddAssignee,
  },
  data () {
    return {
      cr_number: '',
      cr_status: '',
      cr_project: '',
      cr_title: '',
      dialog: false,
      defaultItem: {
        title:'',
        project: {
          name: '',
          version: '',
        },
        jiraLink:'',
        task: {
          title: '',
          description: '',
        },
      },
      editedItem: {
        title:'',
        project: {
          name: '',
          version: '',
        },
        jiraLink:'',
        task: {
          title: '',
          description: '',
        },
      },
    };
  },
  methods: {
    formatDate(date: string) : String {
      return (new Date(date)).toLocaleDateString();
    },
    getActions(cr: ICr) : Array<Actions> {
      if(!this.$store.state.user) {
        return;
      }
      let roles = this.$store.state.user.roles as Array<string>;
      //cr.status
      var result = [];
      if(roles.includes('manager')) {
        switch(cr.status) {
          case CrStatus.WaitForApprove:
            result.push(Actions.Approve, Actions.Reject);
            break;
          case CrStatus.Approved:
          case CrStatus.Assigned:
            result.push(Actions.AddAssignee);
            break;
          case CrStatus.WaitForMerge:
            result.push(Actions.Merge);
            break;
          case CrStatus.Merged:
            result.push(Actions.Close);
            break;
          case CrStatus.Closed:
            break;
        }
      }
      if(roles.includes('worker')) {
        switch(cr.status) {
          case CrStatus.Assigned:
            if(cr.assigned.map(u => u.id).includes(this.$store.state.user.id)) {
              result.push(Actions.Estimate);
            }
            break;
        }
      }
      if(! result.includes(Actions.Estimate) && ! result.includes(Actions.Merge)) {
        result.push(Actions.Inspect);
      }
      return result;
    },
    getColor(cr: Actions) : string {
      switch(cr) {
        case Actions.Inspect:
          return 'yellow';
        case Actions.Approve:
          return 'green';
        case Actions.Reject:
          return 'red';
        case Actions.Delete:
          return 'grey';
        case Actions.AddAssignee:
          return 'blue';
        case Actions.Estimate:
          return 'blue';
        case Actions.Merge:
          return 'blue';
        case Actions.Close:
          return 'green';
      }
      return 'grey';
    },
    getIcon(cr: Actions) : string {
      switch(cr) {
        case Actions.Inspect:
          return 'description';
        case Actions.Approve:
          return 'done';
        case Actions.Reject:
          return 'close';
        case Actions.Delete:
          return 'delete';
        case Actions.AddAssignee:
          return 'person_add';
        case Actions.Estimate:
          return 'hourglass_empty';
        case Actions.Merge:
          return 'merge_type';
        case Actions.Close:
          return 'done_all';
      }
      return 'mail';
    },
    reload() {
      this.$store.dispatch('loadCrList');
    },
    addCr() {
      //this.$store.dispatch('loadCrList');
      let title = this.editedItem.title;
      let project_name = this.editedItem.project.name;
      let project_version = this.editedItem.project.version;
      let jiraLink = this.editedItem.jiraLink;
      let task_title = this.editedItem.task.title;
      let task_description = this.editedItem.task.description;
      if (!title || !project_name || !project_version || !task_title || !task_description) {
        this.$refs.newCrForm.validate();
        this.snackbar = true;
        return;
      } else {
        this.$store.dispatch('createCr', {
          title: title,
          project: {
            name: project_name,
            version: project_version,
          },
          jiraLink:jiraLink,
          task: {
            title: task_title,
            description: task_description,
          },
          });
      }
      this.close();
    },
    close() {
      this.dialog = false;
      this.$refs.newCrForm.reset();
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    clearFilters() {
      this.cr_number = '';
      this.cr_status = '';
      this.cr_project = '';
      this.cr_title = '';
    },
    filterdItems() {
      var result = this.$store.state.crList as Array<ICr>;
      if(!result) {
        return [];
      }
      result = result.filter(cr => !!cr.id && cr.id.includes(this.cr_number.replace('CR', '')));
      result = result.filter(cr => !!cr.title && cr.title.includes(this.cr_title));
      result = result.filter(cr => cr.status === this.cr_status || !this.cr_status);
      result = result.filter(cr => !!cr.project.name && cr.project.name.includes(this.cr_project));
      return result;
    },
    callAction(action: Actions, cr: ICr) {
      switch(action) {
        case Actions.Inspect:
          this.$router.push('cr/' + cr.id + '/inspect')
          break;
        case Actions.Estimate:
          this.$router.push('cr/' + cr.id + '/estimate')
          break;
        case Actions.Merge:
          this.$router.push('cr/' + cr.id + '/merge')
          break;            
        case Actions.Close:
          this.$refs.closeCr.openDialog(cr.id);
          break;
        case Actions.Approve:
          this.$refs.approveCr.openDialog(cr.id);
          break;
        case Actions.Reject:
          this.$refs.rejectCr.openDialog(cr.id);
          break;
        case Actions.AddAssignee:
          this.$refs.addAssignee.openDialog(cr.id);
          break;
      }
    }
  },
  computed: {
    required: function () { 
      return ValidationRules.required;
    },
    headers : function () { 
      var result = [];
      let smallScreen = this.$vuetify.breakpoint.xs;
      if(smallScreen) {
        return  [
          { text: 'CR Number', value: 'id' },
          { text: 'Title', value: 'title' },
          { text: 'Actions', value: 'actions', sortable: false}];
      }
      return  [
        { text: 'CR Number', value: 'id' },
        { text: 'Title', value: 'title' },
        { text: 'Status', value: 'status' },
        { text: 'Created by', value: 'owner' },
        { text: 'Project', value: 'project' },
        { text: 'Version', value: 'version' },
        { text: 'Created at', value: 'created_at'},
        { text: 'Actions', value: 'actions', sortable: false},
      ];
    },
    status : function () {
      return [
        CrStatus.WaitForApprove,
        CrStatus.Approved,
        CrStatus.Assigned,
        CrStatus.WaitForMerge,
        CrStatus.Merged,
        CrStatus.Closed,
        CrStatus.Rejected,
      ];
    },
    projects : function () {
      var crList = this.$store.state.crList as Array<ICr>;
      if(!crList) {
        return [];
      }
      return crList.map(cr => cr.project.name);
    },
    versions : function () {
      var crList = this.$store.state.crList as Array<ICr>;
      if(!crList || !this.editedItem.project.name) {
        return [];
      }

      return crList.filter(cr => cr.project.name === this.editedItem.project.name).map(cr => cr.project.version);
    },
    isArchitect: function () {
      if(!this.$store.state.user) {
        return false;
      }
      let roles = this.$store.state.user.roles;
      if(!!roles) {
        return roles.includes('architect');
      }
      return false;
    },
  },
  beforeMount: function () {
    this.$store.dispatch('loadCrList');
  },
})
</script>

<style lang="stylus" scoped>
.autocomplete
  margin-bottom: -20px
</style>

