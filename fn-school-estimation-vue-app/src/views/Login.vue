<template>
  <v-container id="login" fill-height>
    <v-layout align-center justify-center>
      <v-flex class='login-form text-xs-center display-1'>
        <v-img class="logo-image" :src="getImageSrc('epsilon.png')"></v-img>
        <span>Estimation tool</span>
        <v-card light >
          <v-snackbar :color="'error'" red v-model="$store.state.loginError" top>
            <v-card-text class="subheading" > Incorrect username or password </v-card-text>
          </v-snackbar>
          <v-card-text v-if="!isSignUp" class="subheading" > 
            <span>Crate a new account</span>
            <v-form  @submit.prevent="login" ref="loginForm">
              <v-text-field v-model="input.username" label='Name' prepend-icon='person' :rules="[required(input.username)]"></v-text-field>
              <v-text-field v-model="input.password" label='Password' type='password' prepend-icon='lock' :rules="[required(input.password)]"></v-text-field>
              <v-checkbox v-model="shouldStayLoggedIn" light label='Stay logged in?'></v-checkbox>
              <v-btn dark block type='submit' >Sign in</v-btn>
            </v-form>
          </v-card-text>
          <v-card-text v-else class="subheading"> 
            <span>Log in to your account</span>
            <v-form @submit.prevent="signUp" ref="signUpForm">
              <v-text-field v-model="input.username" label='Name' prepend-icon='person' :rules="[required(input.username)]"></v-text-field>
              <v-text-field v-model="input.email" label='Email' prepend-icon='email' :rules="[required(input.email), email(input.email)]"></v-text-field>
              <v-text-field v-model="input.password" label='Password' type='password' prepend-icon='lock' :rules="[required(input.password)]"></v-text-field>
              <v-btn dark block type='submit'>Sign up</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        <div v-if="!isSignUp" class='body-1'>
          <span>Don't have an account?</span>
          <v-btn light @click='isSignUp = true'>Sign up</v-btn>
        </div>
        <div v-else class='body-1'>
          <span>Have an account?</span>
          <v-btn light @click='isSignUp = false'>Log in</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UrlHelper from '../common/util/UrlHelper';
import ValidationRules from '../common/util/ValidationRules';

export default Vue.extend({
  name : 'Login',
  data() {
    return {
      isSignUp: false,
      shouldStayLoggedIn: true,
      snakbar: this.$store.state.loginError,
      input: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods : {
    login() {
      let username = this.input.username;
      let password = this.input.password;
      if (!username || !password) {
        this.$refs.loginForm.validate()
        this.snackbar = true;
      } else {
        let shouldStayLoggedIn = this.shouldStayLoggedIn;
        this.$store.dispatch('login', {username, password, shouldStayLoggedIn});
      }
    },
    signUp() {
      let username = this.input.username;
      let password = this.input.password;
      let email = this.input.email;
      if (!username || !password || !email) {
        this.$refs.signUpForm.validate()
        this.snackbar = true;
      } else {
        this.$store.dispatch('createUser', {username, password, email});
      }
    },
    getImageSrc(imageName :string) {
      return UrlHelper.getImageSrc(imageName);
    },
  },
  computed: {
    required: function () { 
      return ValidationRules.required;
    },
    email: function () { 
      return ValidationRules.email;
    },
  }

});
</script>

<style lang="stylus" scoped>
.logo-image
  width: 40px;
  height: 40px;
  filter: invert(100%);
  display: inline-block;
  margin-bottom: -4px;

.login-form
  max-width: 500px
</style>

