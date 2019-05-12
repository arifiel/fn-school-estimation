<template>
  <v-dialog
    v-model="removeTaskDialog"
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">Remove task {{taskId}}?</v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn light @click="closeCr()">
          Remove task
        </v-btn>

        <v-btn @click="removeTaskDialog = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  export default {
    name: 'RemoveTask',
    data: () => ({
      removeTaskDialog: false,
      taskId: '',
    }),
    methods: {
      openDialog(taskId: string) {
        this.taskId = taskId;
        this.removeTaskDialog = true;
      },
      closeCr() {
        this.$store.dispatch('tasksForCr/remove', this.taskId);
        this.removeTaskDialog = false;
      },
    }
  }
</script>

<style scoped>

</style>
