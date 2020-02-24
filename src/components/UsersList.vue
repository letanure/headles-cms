<template lang="pug">
  .UsersList
    el-row.UsersList-table
      el-col
        p(v-if="users.length === 0" v-loading="loading") {{ $t('general.table.empty') }}
    el-row.UsersList-table
      el-col
        el-table(
          v-if="users.length > 0"
          :data="users"
          stripe
          style="width: 100%"
          v-loading="loading"
          )
          el-table-column(
            :label="$t('Users.props.name.label')"
            prop="name"
            )
          el-table-column(
            :label="$t('Users.props.email.label')"
            prop="email"
            )
          el-table-column(
            :label="$t('Users.props.status.label')"
            prop="status"
            )
            template(slot-scope="scope")
              i.el-icon-loading(v-if="['NEW', 'DELETING'].includes(scope.row.status)") #{''}
              span {{ $t(`general.status.${scope.row.status}`) }}
          el-table-column(
            :label="$t('Users.props.provider.label')"
            prop="provider"
            )
            template(slot-scope="scope")
              span(v-if="scope.row.providerData" v-for="provider in scope.row.providerData" :key="provider.uid")
                img(:src="`${publicPath}img/icons/auth/auth_service_${provider.providerId.split('.')[0]}.svg`")
          el-table-column(
            :label="$t('Users.props.created.label')"
            prop="created"
            )
            template(slot-scope="scope")
              span {{ new Date(scope.row.created._seconds * 1000 ).toLocaleString('en-GB') }}
          el-table-column(
            :label="$t('general.table.actions')"
            width="220"
          )
            template(slot-scope="scope")
              router-link(
                :to="{ name: 'UserEdit', params: {id: scope.row.id} }"
                )
                el-button(
                  :disabled="scope.row.status === 'NEW'"
                  plain
                  size="mini"
                  type="warning"
                  v-text="$t('general.actions.edit')"
                  )
              el-popconfirm(
                  @onConfirm="deleteUser(scope.row.uid)"
                  :title="$t('general.actions.delete.confirm')"
                  )
                el-button(
                  :disabled="scope.row.uid === user.data.uid || scope.row.status === 'NEW'"
                  plain
                  size="mini"
                  slot="reference"
                  type="danger"
                  v-text="$t('general.actions.delete.label')"
                  )
    el-row.UsersList-pagination(v-if="!hidePagination && usersCount !== null && users.length !== 0")
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
import { firestore } from '@/firebase/firestore'
import { getPageCollection } from '@/firebase/functions'
import { mapGetters } from 'vuex'

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

  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
  },

  watch: {
    page: function() {
      this.getData()
    },
  },

  async beforeMount() {
    this.getData()
    firestore
      .collection('metadata')
      .get()
      .then((a) => {
        console.log(a.docs[0].data())
      })
      .catch((err) => {
        console.dir(err)
      })
  },

  methods: {
    async deleteUser(uid) {
      const querySnapshot = await firestore
        .collection('users')
        .where('uid', '==', uid)
        .get()
      if (querySnapshot.size > 0) {
        querySnapshot.docs[0].ref
          .update({
            status: 'DELETING',
          })
          .then(() => {
            this.getData()
          })
      }
    },

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
        this.usersCount = result.data.meta ? result.data.meta.active : 0
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

  .el-icon-loading
    margin-right 5px

  .el-table_1_column_6
    padding 0
    a + span
      margin-left 5px
</style>
