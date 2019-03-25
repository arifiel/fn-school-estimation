<template>
  <div class="create">
    <h1>Create CR</h1>
    <div class="create_description">
      <div class="lable">Description</div>
      <div class="input">
        <input/>
      </div>
      <div class="lable">Title</div>
      <div class="input">
        <input/>
      </div>
      <div class="lable">Version</div>
      <div class="input">
        <input/>
      </div>
      <div class="lable">Jira link</div>
      <div class="input">
        <input/>
      </div>
      <div class="border-top border-bottom">
        <h1>Tasks</h1>
      </div>
      <div class="button border-top border-bottom">
        <button> + </button>
      </div>
      <div class="lable">Task title</div>
      <div class="input">
        <input/>
      </div>
      <div class="lable">Task title</div>
      <div class="input description ">
        <input/>
      </div>
      <div class="border-top"/><div class="border-top"/>
      <div/>
      <div class="actions">
        <button> Save </button>
        <button> Cancel </button>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export default Vue.extend({
  name: 'CreateCr',
});
</script>

<style lang="scss">
  .create_description {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    row-gap: 20px;

    .lable {
      padding: 15px;
    }

    .input input {
      width: 99%;
    }

    .border-top {
      border-top: 1px solid #CCCCCC;
    }

    .border-bottom {
      border-bottom: 1px solid #CCCCCC;
    }

    .button {
      text-align: right;
      padding: 3px;
      padding-top: 15px;

      button {
        height: 50px;
        width: 50px;
        font-size: 250%;
      }

    }

    input, textarea  {
      height: 40px;
      font-size: 100%;
    }

    .description input, textarea {
      height: 120px;
    }

    .actions {
      text-align: right;
      margin-right: 3px;

      :first-child {
        margin-right: 5px;
        background-color: rgb(46, 45, 45);
      }

      button {
        padding: 15px;
        font-size: 100%;
        background-color: rgb(24, 24, 24);
        color: #CCCCCC;
      }

    }

  }
</style>