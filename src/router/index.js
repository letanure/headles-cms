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
        name: 'home',
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
        path: 'users/:page?',
        props(route) {
          const props = { ...route.params }
          props.page = +props.page
          return props
        },
        name: 'users',
        component: () =>
          import(/* webpackChunkName: "users" */ '../views/Users.vue'),
      },
      {
        path: 'users/create',
        name: 'UsersCreate',
        component: () =>
          import(/* webpackChunkName: "users" */ '../views/UsersCreate.vue'),
      },
      {
        path: 'users/edit/:id',
        name: 'UserEdit',
        props: true,
        component: () =>
          import(/* webpackChunkName: "users" */ '../views/UserEdit.vue'),
      },
      {
        path: 'groups/:page?',
        props(route) {
          const props = { ...route.params }
          props.page = +props.page
          return props
        },
        name: 'Groups',
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

  if (store.state.user.loaded) {
    navigate()
  } else {
    store.watch(store.getters['user/loaded'], () => {
      navigate()
    })
  }
})

export default router
