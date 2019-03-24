import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
import {AuthService} from '@/common/services/AuthService';
import {RouteNames} from '@/router/RouteNames';

Vue.use(Router);

const router =  new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'home',
      // lazy-load
      component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
  if (requiresAuth && !AuthService.isLoggedIn()) {
    // tslint:disable-next-line
    console.log('401 - not authorized');
    next({name: RouteNames.Login});
  } else {
    next();
  }
});

export default router;
