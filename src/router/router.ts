import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
import Requirements from '@/views/Requirements.vue';
import CreateCr from '@/views/CreateCr.vue';
import Inspect from '@/views/Inspect.vue';
import {AuthService} from '@/common/services/AuthService';
import {RouteNames} from '@/router/RouteNames';

Vue.use(Router);

const router =  new Router({
  routes: [
    {
      path: '/login',
      name: RouteNames.Login,
      component: Login,
    },
    {
      path: '/',
      // lazy-load
      component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: RouteNames.Requirements,
          component: Requirements,
        },
        {
          path: '/create',
          name: RouteNames.Create,
          component: CreateCr,
        },
        {
          path: '/cr/:id/:action',
          name: RouteNames.Inspect,
          component: Inspect,
        },
      ],
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
