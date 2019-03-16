import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginComponent from "./components/login.vue"
import SecureComponent from "./components/secure.vue"
import HelloWorldComponent from "./components/HelloWorld.vue"

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: {
                name: "HelloWorld",
                component: HelloWorldComponent
            }
        },
        {
            path: "/login",
            name: "login",
            component: LoginComponent
        },
        {
            path: "/secure",
            name: "secure",
            component: SecureComponent
        }
    ]
  })