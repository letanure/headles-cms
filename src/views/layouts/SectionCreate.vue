<template lang="pug">
  .SectionCreate
    el-row(
      type="flex"
      )
      el-col(:xs="24" :sm="24" :md="12" :lg="12" :xl="6")
        component(:is="sectionFormComponent" @success="onSuccess" :key="this.$route.name")
</template>

<script>
export default {
  name: 'SectionCreate',

  computed: {
    sectionFormComponent() {
      const componentFormName = this.$route.name.replace('sCreate', 'Form')
      return () => import(`@/components/${componentFormName}`)
    },
  },

  methods: {
    onSuccess() {
      const name = this.$route.name.replace('Create', '')
      this.$router.push({ name })
    },
  },
}
</script>
