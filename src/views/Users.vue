<template lang="pug">
  .Users
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
        
</template>

<script>
import { firestore } from '@/firebase/firestore'

export default {
  name: 'Users',

  data: () => ({
    users: [],
    publicPath: process.env.BASE_URL,
  }),

  async beforeMount() {
    const request = firestore.collection('users').get()
    const dataRequest = await request
    const dataPromise = Promise.all(
      dataRequest.docs.map(async (user) => user.data()),
    )
    const data = await dataPromise
    this.users = data
  },
}
</script>
