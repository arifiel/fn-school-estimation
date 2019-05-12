<template>
  <v-dialog
    v-model="closeCrDialog"
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">Close CR {{crId}}?</v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn light @click="closeCr()">
          Close CR
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
    name: 'CloseCr',
    data:() => ({
      closeCrDialog: false,
      crId: '',
    }),
    methods: {
      openDialog(crId: string) {
        this.crId = crId;
        this.closeCrDialog = true;
      },
      closeCr() {
        this.$store.dispatch('closeCr', this.crId);
        this.closeCrDialog = false;
      },
    }
  }
</script>

<style scoped>

</style>
