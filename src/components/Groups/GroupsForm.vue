<template lang="pug">
  el-form.GroupsForm(
    :model="formData"
    :rules="formRules"
    @submit.native.prevent="submit('GroupsForm')"
    label-position="top"
    novalidate
    ref="GroupsForm"
    status-icon
    v-blockNavOnChange="{...formData, id}"
    )

    el-form-item(
      :label="$t('GroupsForm.fields.name.label')"
      prop="name"
      )
      el-input(
        type="text"
        v-model="formData.name"
        )

    el-form-item(
      :label="$t('GroupsForm.fields.permissions.label')"
      prop="collections"
      )
      el-table(
        :data="formData.collections"
        stripe
        style="width: 100%"
        )
        el-table-column(
          :label="$t('Permissions.groupName')"
          prop="name"
          )
        el-table-column(
          :label="$t('Permissions.type.list')"
          prop="list"
          )
          template(slot-scope="scope")
            el-switch(v-model="scope.row.list")
        el-table-column(
          :label="$t('Permissions.type.get')"
          prop="get"
          )
          template(slot-scope="scope")
            el-switch(v-model="scope.row.get")
        el-table-column(
          :label="$t('Permissions.type.update')"
          prop="update"
          )
          template(slot-scope="scope")
            el-switch(v-model="scope.row.update")
        el-table-column(
          :label="$t('Permissions.type.create')"
          prop="create"
          )
          template(slot-scope="scope")
            el-switch(v-model="scope.row.create")
        el-table-column(
          :label="$t('Permissions.type.delete')"
          prop="delete"
          )
          template(slot-scope="scope")
            el-switch(v-model="scope.row.delete")

    el-form-item
      el-button(
        native-type="submit"
        type="primary"
        v-text="$t('GroupsForm.actions.submit.label')"
        )
</template>

<script>
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Switch,
  Table,
  TableColumn,
} from 'element-ui'
import firestoreGroups from '@/firebase/collections/groups'
import '@/directives/blockNavOnChange'

export default {
  name: 'GroupsForm',

  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Switch.name]: Switch,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },

  props: {
    id: {
      default: null,
      required: false,
      type: String,
    },
  },

  data() {
    return {
      itemRef: null,
      formData: {
        name: '',
        collections: [
          {
            create: false,
            delete: false,
            get: false,
            list: false,
            name: 'groups',
            update: false,
          },
          {
            create: false,
            delete: false,
            get: false,
            list: false,
            name: 'users',
            update: false,
          },
          {
            create: false,
            delete: false,
            get: false,
            list: false,
            name: 'contentTypes',
            update: false,
          },
        ],
      },
      formRules: {
        name: [
          {
            message: this.$t('validation.required'),
            required: true,
            trigger: 'blur',
          },
          {
            message: this.$t('validation.min', { min: 5 }),
            min: 5,
            trigger: 'blur',
          },
        ],
      },
    }
  },

  beforeMount() {
    if (this.id !== null) {
      this.loadData()
    }
  },

  methods: {
    create() {
      firestoreGroups
        .addItem(this.formData)
        .then(() => {
          this.$emit('success')
        })
        .catch((err) => {
          this.$emit('error')
          this.message({
            messageKey: `auth.${err.code
              .replace(/\//g, '.')
              .replace(/-/g, '_')}`,
          })
        })
    },

    async update() {
      firestoreGroups.updateItem(this.id, this.formData).then(() => {
        this.$emit('success')
      })
    },

    async loadData() {
      firestoreGroups.getItem(this.id).then((data) => {
        this.formData = data.data
      })
    },

    message({ type = 'error', messageKey = null }) {
      if (messageKey) {
        Message({
          type,
          message: this.$t(messageKey),
        })
      }
    },

    submit() {
      this.$refs['GroupsForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('general/allowNavigation')
          if (this.id !== null) {
            this.update()
          } else {
            this.create()
          }
        } else {
          this.message({
            messageKey: 'GroupsForm.actions.submit.error',
          })
        }
      })
    },
  },
}
</script>
