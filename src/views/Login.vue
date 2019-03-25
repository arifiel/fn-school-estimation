<template>
  <transition name="fade">
    <div id="login">
        <div class="login__header">
          <img src="@/assets/epsilon.png" />
          <h1>Estilamtion tool</h1>
        </div>  
        <div>
          <input type="text" name="username" v-model="input.username" placeholder="Username" />
        </div>
        <div>
          <input type="password" name="password" v-model="input.password" placeholder="Password" />
        </div>
        <div>
          <button type="button" v-on:click="login()">Login</button>
        </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {AuthService} from '@/common/services/AuthService';
import {RouteNames} from '@/router/RouteNames';

export default Vue.extend({
  name : 'Login',
  data() {
    return {
      input: {
        username: '',
        password: '',
      },
    };
  },
  methods : {
    login() {
      AuthService.login(this.input.username, this.input.password);
      if (AuthService.isLoggedIn()) {
        this.$router.push({name: RouteNames.Requirements});
      }
    },
  },
});
</script>

<style lang="scss" scoped>
  @import '@/common/styles/common.scss';
  @import '@/common/styles/animation.scss';

  #login {
    display: flex;
    flex-direction: column;
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: $element-background-color;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
    border-radius: 15px;

    .login__header {
      height: 40px;
      width: 100%;
      display: flex;

      img {
        width: 40px;
        filter: invert(100%);
      }

      h1 {
        margin-top: 5px;
        margin-left: -40px;
      }
    }

    & > div {
      border: 10px solid $element-background-color;

      & * {
        width: 100%;
      }

      button {
        background-color: $login-background-color;
        height: 40px;
        font-size: 100%;
        border-radius: 15px;
      }

      input {
        width: 98%;
      }

      input, textarea  {
        background-color: rgb(232, 240, 254);
        height: 40px;
        padding-left: 5px;
        font-size: 100%;
      }

    }

  }

  @media (max-width: 600px) {
    #login {
      width: 90%;
    }
  }
</style>