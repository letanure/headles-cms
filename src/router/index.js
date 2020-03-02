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
        path: 'users',
        component: () =>
          import(
            /* webpackChunkName: "Users" */ '../views/layouts/MainArea.vue'
          ),
        children: [
          {
            path: '',
            name: 'Users',
            redirect: { name: 'UsersList' },
          },
          {
            path: 'list:page?',
            name: 'UsersList',
            props(route) {
              const props = { ...route.params }
              props.page = +props.page
              return props
            },
            component: () =>
              import(
                /* webpackChunkName: "Users" */
                '@/views/layouts/SectionHome.vue'
              ),
          },
          {
            path: 'create',
            name: 'UsersCreate',
            component: () =>
              import(
                /* webpackChunkName: "Users" */
                '@/views/layouts/SectionCreate.vue'
              ),
          },
          {
            path: 'edit/:id',
            name: 'UsersEdit',
            props: true,
            component: () =>
              import(
                /* webpackChunkName: "Users" */
                '@/views/layouts/SectionEdit.vue'
              ),
          },
        ],
      },
      {
        path: 'groups',
        component: () =>
          import(
            /* webpackChunkName: "Groups" */ '../views/layouts/MainArea.vue'
          ),
        children: [
          {
            path: '',
            name: 'Groups',
            redirect: { name: 'GroupsList' },
          },
          {
            path: 'list:page?',
            name: 'GroupsList',
            props(route) {
              const props = { ...route.params }
              props.page = +props.page
              return props
            },
            component: () =>
              import(
                /* webpackChunkName: "Groups" */
                '@/views/layouts/SectionHome.vue'
              ),
          },
          {
            path: 'create',
            name: 'GroupsCreate',
            component: () =>
              import(
                /* webpackChunkName: "Groups" */
                '@/views/layouts/SectionCreate.vue'
              ),
          },
          {
            path: 'edit/:id',
            name: 'GroupsEdit',
            props: true,
            component: () =>
              import(
                /* webpackChunkName: "Groups" */
                '@/views/layouts/SectionEdit.vue'
              ),
          },
        ],
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
    const unprotectedRoutes = ['SignIn', 'Register']
    if (unprotectedRoutes.includes(to.name)) {
      next()
    } else {
      if (store.state.user.user.signedIn) {
        next()
      } else {
        next({ name: 'SignIn' })
      }
    }
  }

  const updateToken = () => {
    if (auth && auth.currentUser) {
      auth.currentUser.getIdToken(true)
    }
  }

  if (store.state.user.loaded) {
    let navigationIsBlocked = false
    if (store.state.general.navigationBlocked) {
      const userDiscartForm = confirm('Abandon changes?')
      if (userDiscartForm) {
        store.dispatch('general/allowNavigation')
        navigationIsBlocked = false
      } else {
        navigationIsBlocked = true
      }
    }
    if (!navigationIsBlocked) {
      updateToken()
      navigate()
    }
  } else {
    store.watch(store.getters['user/loaded'], () => {
      navigate()
    })
  }
})

export default router
