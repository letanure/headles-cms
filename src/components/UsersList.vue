<template lang="pug">
  .UsersList
    el-row.UsersList-table
      el-col
        el-table(
          :data="users"
          stripe
          style="width: 100%"
          )
          el-table-column(
            :label="$t('Users.props.name.label')"
            prop="displayName"
            )
          el-table-column(
            :label="$t('Users.props.email.label')"
            prop="email"
            )
          el-table-column(
            :label="$t('Users.props.provider.label')"
            prop="provider"
            )
            template(slot-scope="scope")
              span(v-for="provider in scope.row.providerData" :key="provider.uid")
                img(:src="`${publicPath}img/icons/auth/auth_service_${provider.providerId.split('.')[0]}.svg`")
          el-table-column(
            :label="$t('Users.props.created.label')"
            prop="created"
            )
            template(slot-scope="scope")
              span {{ new Date(scope.row.created._seconds * 1000 ).toLocaleString('en-GB') }}
    
    el-row.UsersList-pagination(v-if="!hidePagination")
      el-col
        el-button-group
          router-link.el-button(
            :to="{ name: $route.name, params: { page: (page - 1 < 1 ? 1 : (page - 1) ) }}"
            )
            i.el-icon-arrow-left
            span {{ $t('general.pagination.previous') }}
          router-link.el-button(
            :to="{ name: $route.name, params: { page: (page + 1) }}"
            )
            span {{ $t('general.pagination.next') }}
            i.el-icon-arrow-right

</template>

<script>
import { getPageCollection } from '@/firebase/functions'

export default {
  name: 'UsersList',

  props: {
    page: {
      default: 1,
      required: false,
      type: Number,
    },
    perPage: {
      default: 5,
      required: false,
      type: Number,
    },
    hidePagination: {
      default: false,
      required: false,
      type: Boolean,
    },
  },

  data: () => ({
    users: [],
    publicPath: process.env.BASE_URL,
  }),

  watch: {
    page: function() {
      this.getData()
    },
  },

  async beforeMount() {
    this.getData()
  },

  methods: {
    getData() {
      getPageCollection({
        collection: 'users',
        orderBy: 'created',
        limit: this.perPage,
        offset: (this.page - 1) * this.perPage,
      }).then((snap) => {
        this.users = snap.data
      })
    },
  },
}
</script>

<style lang="stylus">
.UsersList
  &-pagination
    margin-top 15px
    text-align right
    a
      text-decoration none
</style>
