<template lang="pug">
  .UsersList
    el-row.UsersList-table
      el-col
        el-table(
          :data="users"
          stripe
          style="width: 100%"
          v-loading="loading"
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
        el-pagination(
          :current-page="page"
          :page-size="perPage"
          :total="usersCount"
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
        )
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
      default: 10,
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
    loading: false,
    usersCount: null,
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
    handleCurrentChange(newPage) {
      this.$router.push({ name: this.$route.name, params: { page: newPage } })
    },

    getData() {
      this.loading = true
      getPageCollection({
        collection: 'users',
        orderBy: 'created',
        limit: this.perPage,
        offset: (this.page - 1) * this.perPage,
      }).then((result) => {
        this.loading = false
        this.usersCount = result.data.meta.count
        this.users = result.data.page
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
