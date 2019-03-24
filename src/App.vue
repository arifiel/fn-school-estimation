<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
export default class Login extends Vue {}
</script>

<style lang="scss">
  @import '@/common/styles/common.scss';

  html, body {
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: $background-color;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $text-color;
    height: 100vh;
  }

</style>
