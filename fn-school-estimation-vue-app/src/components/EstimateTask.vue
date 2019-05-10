<template>
  <v-dialog
    v-model="estimateTaskDialog"
    max-width="500"
  >
    <v-card>
      <v-card-title class="headline">Estimate task {{taskId}}?</v-card-title>

      <v-card-text>
        <v-card light>
          <v-container fluid text-xs-center>
            <v-btn small :class="$vuetify.breakpoint.xs ? 'estimationCard title' : 'estimationCard headline'" 
                v-for="(est) in estimationList" 
                :key="est" 
                @click="estimation = est" 
                :color="estimation == est ? 'blue' : 'white'" v-text="est">
              
            </v-btn>
          </v-container>
        </v-card>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn light @click="estimate()">
          Estimate
        </v-btn>

        <v-btn @click="estimateTaskDialog = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  export default {
    name : 'EstimateTask',
    data: () => ({
      estimateTaskDialog: false,
      taskId: '',
      estimation: undefined,
    }),
    methods: {
      openDialog(taskId: string) {
        this.taskId = taskId;
        this.estimateTaskDialog = true;
      },
      closeCr() {
        this.estimateTaskDialog = false;
      },
      estimate() {
        let taskId = this.taskId;
        let estimation = this.estimation;
        this.$store.dispatch('estimate', {'taskId' : taskId, 'estimation' : estimation});
        this.estimateTaskDialog = false;
      },
    },
    computed: {
      estimationList: function () {
        return ['0', '1', '2', '3', '5', '8', '13', '21', '34', '100', '∞', '?'];
      },
    },
  }
</script>

<style lang="stylus" scoped>
.estimationCard
  height: 150px;

@media (max-width: 600px)
  .estimationCard
    height: 90px;

</style>

