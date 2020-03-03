<template lang="pug">
  .GroupsList
    el-row.GroupsList-table
      el-col
        p(v-if="list.length === 0" v-loading="loading") {{ $t('general.table.empty') }}
    el-row.GroupsList-table
      el-col
        el-table(
          v-if="list.length > 0"
          :data="list"
          stripe
          style="width: 100%"
          v-loading="loading"
          )
          el-table-column(
            :label="$t('GroupsList.props.name.label')"
            prop="name"
            )
          el-table-column(
            :label="$t('GroupsList.props.created.label')"
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
                :to="{ name: 'GroupsEdit', params: {id: scope.row.id} }"
                )
                el-button(
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
                  plain
                  size="mini"
                  slot="reference"
                  type="danger"
                  v-text="$t('general.actions.delete.label')"
                  )
    el-row.GroupsList-pagination(v-if="!hidePagination && count !== null && list.length !== 0")
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
import firestoreGroups from '@/firebase/collections/groups.js'

export default {
  name: 'GroupsList',

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
    deleteItem(id) {
      firestoreGroups.deleteItem(id).then(() => {
        this.getData()
      })
    },

    getData() {
      this.loading = true
      firestoreGroups.getPage(this.page).then((data) => {
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

<style lang="stylus">
.GroupsList

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
