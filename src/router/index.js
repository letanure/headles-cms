import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/'
import BaseLayout from '@/views/layouts/BaseLayout.vue'
import { auth } from '@/firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () =>
          import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () =>
          import(/* webpackChunkName: "About" */ '../views/About.vue'),
      },
      {
        path: 'users/:page?',
        name: 'Users',
        props(route) {
          const props = { ...route.params }
          props.page = +props.page
          return props
        },
        component: () =>
          import(/* webpackChunkName: "Users" */ '../views/Users.vue'),
      },
      {
        path: 'users/create',
        name: 'UsersCreate',
        component: () =>
          import(/* webpackChunkName: "Users" */ '../views/UsersCreate.vue'),
      },
      {
        path: 'users/edit/:id',
        name: 'UsersEdit',
        props: true,
        component: () =>
          import(/* webpackChunkName: "Users" */ '../views/UsersEdit.vue'),
      },
      {
        path: 'groups/:page?',
        name: 'Groups',
        props(route) {
          const props = { ...route.params }
          props.page = +props.page
          return props
        },
        component: () =>
          import(/* webpackChunkName: "Groups" */ '../views/Groups.vue'),
      },
      {
        path: 'groups/create',
        name: 'GroupsCreate',
        component: () =>
          import(/* webpackChunkName: "Groups" */ '../views/GroupsCreate.vue'),
      },
      {
        path: 'groups/edit/:id',
        name: 'GroupsEdit',
        props: true,
        component: () =>
          import(/* webpackChunkName: "Groups" */ '../views/GroupsEdit.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'SignIn',
    component: () =>
      import(/* webpackChunkName: "SignIn" */ '../views/SignIn.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "Register" */ '../views/Register.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const navigate = () => {
    const unprotectedRoutes = ['signIn', 'register']
    if (unprotectedRoutes.includes(to.name)) {
      next()
    } else {
      if (store.state.user.user.signedIn) {
        next()
      } else {
        next({ name: 'signIn' })
      }
    }
  }

  const updateToken = () => {
    auth.currentUser.getIdToken(true)
  }

  if (store.state.user.loaded) {
    updateToken()
    navigate()
  } else {
    store.watch(store.getters['user/loaded'], () => {
      navigate()
    })
  }
})

export default router
