<template>
  <div id="app">
    <PageHeader username="User" :authenticated="authenticated"/>
    <router-view @authenticated="setAuthenticated" />
  </div>
</template>

<script>
import PageHeader from './components/PageHeader.vue'

export default {
  name: 'app',
  components: {
    PageHeader
  },
  data() {
    return {
      authenticated: false,
      mockAccount: {
        username: "a",
        password: "a"
      }
    }
  },
  mounted() {
    if(!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
