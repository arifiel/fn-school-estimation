<template>
  <v-dialog
    v-model="mergeEstimationDialog"
    max-width="500"
  >
    <v-card>
      <v-card-title class="headline">Merge Estimation fro task {{taskId}}?</v-card-title>

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
          Merge Estimation
        </v-btn>

        <v-btn @click="mergeEstimationDialog = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { ITask } from '../common/interfaces/ITask';

  export default {
    name : 'MergeEstimation',
    data: () => ({
      mergeEstimationDialog: false,
      taskId: '',
      estimation: undefined,
    }),
    methods: {
      openDialog(taskId: string) {
        this.taskId = taskId;
        this.mergeEstimationDialog = true;
      },
      closeCr() {
        this.mergeEstimationDialog = false;
      },
      estimate() {
        let taskId = this.taskId;
        let estimation = this.estimation;
        this.$store.dispatch('mergeEstimation', {'taskId' : taskId, 'estimation' : estimation});
        this.mergeEstimationDialog = false;
      },
    },
    computed: {
      estimationList: function () {
        if(!this.$store.state.tasksForCr) {
          return [];
        }
        let task = this.$store.state.tasksForCr.find(t => t.id == this.taskId) as ITask;
        if(!task) {
          return [];
        }
        let estArr =  ['0', '1', '2', '3', '5', '8', '13', '21', '34', '100', '∞', '?'];
        var firstIndex = undefined;
        var lastIndex = undefined;
        task.estimationList.map(e => e.value).forEach(v => {
          var index = undefined;
          if(v != '?') {
            index = estArr.indexOf(v);
          }
          if(!firstIndex) {
            firstIndex = index;
            lastIndex = index;
          } else {
            if(index < firstIndex) {
              firstIndex = index;
            }
            if(lastIndex < index) {
              lastIndex = index;
            }
          }

        });
        console.log(firstIndex);
        
        if (!firstIndex) {
          return ['0', '1', '2', '3', '5', '8', '13', '21', '34', '100', '∞', '?'];
        }
        return estArr.slice(firstIndex, lastIndex + 1);
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

