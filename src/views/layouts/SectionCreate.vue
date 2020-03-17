<template lang="pug">
  .SectionCreate
    el-row(
      type="flex"
      )
      el-col
        component(:is="sectionFormComponent" @success="onSuccess" :key="this.$route.name")
</template>

<script>
import { Col, Row } from 'element-ui'

export default {
  name: 'SectionCreate',

  components: {
    [Col.name]: Col,
    [Row.name]: Row,
  },

  computed: {
    sectionFormComponent() {
      const componentFormName = this.$route.name.replace('Create', 'Form')
      const name = this.$route.name.replace('Create', '')
      return () => import(`@/components/${name}/${componentFormName}`)
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
