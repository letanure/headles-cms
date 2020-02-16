import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/'
import BaseLayout from '@/views/layouts/BaseLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: '',
        component: () =>
          import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/About.vue'),
      },
      {
        path: 'users',
        name: 'users',
        component: () =>
          import(/* webpackChunkName: "users" */ '../views/Users.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'signIn',
    component: () =>
      import(/* webpackChunkName: "signIn" */ '../views/SignIn.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "register" */ '../views/Register.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const signedIn = store.state.user.user.signedIn
  const unprotectedRoutes = ['signIn', 'register']

  if (unprotectedRoutes.includes(to.name)) {
    next()
  } else {
    if (!signedIn) {
      next({ name: 'signIn' })
    } else {
      next()
    }
  }
})

export default router
