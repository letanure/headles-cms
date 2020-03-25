<template lang="pug">
  .GroupsList
    el-row(v-if="list.length === 0" v-loading="loading")
      el-col
        p {{ $t('general.table.empty') }}
    transition(name="fade" mode="out-in")
      el-row.GroupsList-table(v-if="list.length > 0" v-loading="loading")
        el-col
          el-table(
            :data="list"
            stripe
            style="width: 100%"
            v-if="list.length > 0"
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
    el-row.GroupsList-pagination(v-if="!hidePagination && count !== null && list.length > 0")
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
import {
  Button,
  Col,
  Pagination,
  Popconfirm,
  Row,
  Table,
  TableColumn,
} from 'element-ui'
import firestoreGroups from '@/firebase/collections/groups'

export default {
  name: 'GroupsList',

  components: {
    [Button.name]: Button,
    [Col.name]: Col,
    [Pagination.name]: Pagination,
    [Popconfirm.name]: Popconfirm,
    [Row.name]: Row,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },

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
    page: function () {
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
