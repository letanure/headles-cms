<template lang="pug">
  .SectionEdit
    el-row(
      type="flex"
      )
      el-col(:xs="24" :sm="24" :md="12" :lg="12" :xl="6")
        component(:is="sectionFormComponent" @success="onSuccess" :id="id" :key="this.$route.name")
</template>

<script>

export default {
  name: 'SectionEdit',

  props: {
    id: {
      required: true,
      type: String,
    },
  },

  computed: {
    sectionFormComponent() {
      const componentFormName = this.$route.name.replace('Edit', 'Form')
      return () => import(`@/components/${componentFormName}`)
    },
  },

  methods: {
    onSuccess() {
      const name = this.$route.name.replace('Edit', '')
      this.$router.push({ name })
    },
  },
}
</script>
