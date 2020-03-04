<template lang="pug">
  .UsersList
    el-row(v-if="list.length === 0" v-loading="loading")
      el-col
        p {{ $t('general.table.empty') }}
    transition(name="fade" mode="out-in")
      el-row.UsersList-table(v-if="list.length > 0" v-loading="loading")
        el-col
          el-table(
            :data="list"
            stripe
            style="width: 100%"
            v-if="list.length > 0"
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
                  :to="{ name: 'UsersEdit', params: {id: scope.row.id} }"
                  )
                  el-button(
                    :disabled="scope.row.status === 'NEW'"
                    plain
                    size="mini"
                    type="warning"
                    v-text="$t('general.actions.edit')"
                    )
                el-popconfirm(
                    @onConfirm="deleteItem(scope.row.id)"
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
    el-row.UsersList-pagination(v-if="!hidePagination && count !== null && list.length !== 0")
      el-col
        el-pagination(
          :current-page="page"
          :page-size="perPage"
          :total="count"
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          )
</template>

<script>
import firestoreUsers from '@/firebase/collections/users'
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
    count: null,
    list: [],
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
  },

  methods: {
    deleteItem(id) {
      firestoreUsers.deleteItem(id).then(() => {
        this.getData()
      })
    },

    getData() {
      this.loading = true
      firestoreUsers.getPage(this.page).then((data) => {
        this.loading = false
        this.count = data.meta ? data.meta.active : 0
        this.list = data.page
      })
    },

    handleCurrentChange(newPage) {
      this.$router.push({ name: this.$route.name, params: { page: newPage } })
    },
  },
}
</script>
