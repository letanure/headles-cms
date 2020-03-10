<template lang="pug">
  .SectionEdit
    el-row(
      type="flex"
      )
      el-col(:xs="24" :sm="24" :md="12" :lg="12" :xl="8")
        component(:is="sectionFormComponent" @success="onSuccess" :id="id" :key="this.$route.name")
</template>

<script>
import { Col, Row } from 'element-ui'

export default {
  name: 'SectionEdit',

  components: {
    [Col.name]: Col,
    [Row.name]: Row,
  },

  props: {
    id: {
      required: true,
      type: String,
    },
  },

  computed: {
    sectionFormComponent() {
      const componentFormName = this.$route.name.replace('Edit', 'Form')
      const name = this.$route.name.replace('Edit', '')
      return () => import(`@/components/${name}/${componentFormName}`)
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
