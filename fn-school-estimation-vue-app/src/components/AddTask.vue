<template>
  <v-dialog v-model="dialog" max-width="500px" >
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
</template>

<script lang="ts">
  import {ICr} from '../common/interfaces/ICr';
  import {ITask} from '../common/interfaces/ITask';
  import ValidationRules from '../common/util/ValidationRules';

  export default {
    name: 'AddTask',
    data: () => ({
      dialog: false,
      crId: '',
      defaultItem: {
        title: '',
        description: '',
      },
      editedItem: {
        title: '',
        description: '',
      },
    }),
    computed: {
      required: function() { 
        return ValidationRules.required;
      },
    },
    methods: {
      openDialog(crId: string) {
        this.$refs.newTaskForm.reset();
        this.crId = crId;
        // need time to reset form
        setTimeout(() => {
          this.dialog = true;
        }, 10);
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
            cr_id: this.crId,
            title: title,
            description: description,
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
