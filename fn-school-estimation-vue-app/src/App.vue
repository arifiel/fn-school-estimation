<template>
  <v-app dark>
    <v-toolbar app v-if="$store.state.loggedIn">
      <v-toolbar-title class="headline text-uppercase">
        <v-img class="logo-image" :src="getImageSrc('epsilon.png')"></v-img>
        <span v-if='!$vuetify.breakpoint.xs' class="display-1">Estimation tool</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="$store.state.user" class="headline">{{$store.state.user.name}}</span>
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
    data () {
    return {
      //
    }
  },
  methods: {
    getImageSrc(imageName :string) {
      return UrlHelper.getImageSrc(imageName);
    },
    logout() {
      this.$store.commit('logout');
    },
  },
  mounted: function () {
    if(this.$store.state.loggedIn) {
      this.$store.dispatch('getUser');
    }
  },
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

</style>

