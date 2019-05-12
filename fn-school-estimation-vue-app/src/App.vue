<template>
  <v-app dark>
    <v-toolbar app v-if="$store.state.loggedIn">
      <router-link to='/' title='Move to CR list' class="header_text">
        <v-toolbar-title class="headline text-uppercase">
          <v-img class="logo-image" :src="getImageSrc('epsilon.png')"></v-img>
          <span v-if='!$vuetify.breakpoint.xs' class="display-1">Estimation tool</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <span v-if="$store.state.user.data" class="headline">{{$store.state.user.data.name}}</span>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on" fab>
            <v-icon large>menu</v-icon>
          </v-btn>
        </template>
        <v-list light>
          <v-list-tile>
            <v-list-tile-action @click="$router.push('/')">Cr List</v-list-tile-action>
          </v-list-tile>
          <v-list-tile class="logoutTile">
            <v-list-tile-action @click="logout">Logout</v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Login from '@/views/Login.vue'
import UrlHelper from './common/util/UrlHelper';

export default {
  name: 'App',
  methods: {
    getImageSrc(imageName :string) {
      return UrlHelper.getImageSrc(imageName);
    },
    logout() {
      this.$store.commit('logout');
    },
  },
  computed: {
    isLoggedIn: function() { 
      return this.$store.state.loggedIn;
    },
  },
  mounted: function () {
    if(this.$store.state.loggedIn) {
      console.log(this.$store.state);
      
      this.$store.dispatch('user/load');
      this.$store.dispatch('userList/load');
    }
  },
  watch : {
    isLoggedIn: function (val) {
      if(val) {
        this.$store.dispatch('user/load');
        this.$store.dispatch('userList/load');
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
.logo-image
  width: 40px;
  height: 40px;
  filter: invert(100%);
  display: inline-block;
  margin-bottom: -4px;
  @media screen and (max-width: 600px) 
    width: 20px;
    margin-bottom: -7px;

.logoutTile
  background: #808080;
  margin: 5px;
  color: white;

.header_text
  color: white;
  text-decoration: none;

</style>

