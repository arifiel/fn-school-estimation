<template>
  <v-dialog
    v-model="closeCrDialog"
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">Reject CR {{crId}}?</v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn light @click="rejectCr()">
          Reject CR
        </v-btn>

        <v-btn @click="closeCrDialog = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  export default {
    name : 'RejectCr',
    data: () => ({
      closeCrDialog: false,
      crId: '',
    }),
    methods: {
      openDialog(crId: string) {
        this.crId = crId;
        this.closeCrDialog = true;
      },
      rejectCr() {
        this.$store.dispatch('cr/reject', this.crId);
        this.closeCrDialog = false;
      },
    }
  }
</script>

<style scoped>

</style>
