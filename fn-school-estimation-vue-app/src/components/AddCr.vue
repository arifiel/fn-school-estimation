<template>
  <v-dialog v-model="dialog" max-width="500px">
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
</template>

<script lang="ts">
import {ICr} from '../common/interfaces/ICr';
import ValidationRules from '../common/util/ValidationRules';

  export default {
    name: 'AddCr',
    data: () => ({
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
    }),
    computed: {
      required: function() { 
        return ValidationRules.required;
      },
      projects: function() {
        var crList = this.$store.state.crList as Array<ICr>;
        if(!crList) {
          return [];
        }
        return crList.map(cr => cr.project.name);
      },
      versions: function() {
        var crList = this.$store.state.crList as Array<ICr>;
        if(!crList || !this.editedItem.project.name) {
          return [];
        }
        return crList.filter(cr => cr.project.name === this.editedItem.project.name).map(cr => cr.project.version);
    },
    },
    methods: {
      openDialog(crId: string) {
        this.$refs.newCrForm.reset();
        // need time to reset form
        setTimeout(() => {
          this.dialog = true;
        }, 10);
      },
      addCr() {
        const title = this.editedItem.title;
        const project_name = this.editedItem.project.name;
        const project_version = this.editedItem.project.version;
        const jiraLink = this.editedItem.jiraLink;
        const task_title = this.editedItem.task.title;
        const task_description = this.editedItem.task.description;
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
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        }, 300);
      },
    },
  }
</script>

<style scoped>

</style>
