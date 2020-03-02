<template lang="pug">
  .SectionHome
    p
      component(:is="sectionListComponent" :page="isNaN(page) ? 1 : page" :key="this.$route.name")
    p
      router-link(
        :to="sectionCreateRoute"
        )
        el-button(
          type="primary"
          v-text="$t(`General.actions.create.label`)"
          )

</template>

<script>
export default {
  name: 'SectionHome',

  props: {
    page: {
      default: 1,
      required: false,
      type: Number,
    },
  },

  data: () => ({
    baseName: null,
  }),

  computed: {
    sectionCreateRoute() {
      const name = this.$route.name.replace('List', 'Create')
      return { name }
    },
    sectionListComponent() {
      return () => import(`@/components/${this.$route.name}`)
    },
  },

  // beforeMount() {
  //   console.log(this.$route.name)
  //   this.baseName = this.$route.name
  //   const aa = require(`@/components/${this.baseName}`).default
  //   console.log(aa)
  // },
}
</script>
