<template lang="pug">
  .MainArea
    transition(name="fade" mode="out-in") 
      router-view
        
</template>

<script>
export default {
  name: 'MainArea',
}
</script>

<style scoped lang="stylus">
.MainArea
  .fade-enter-active, .fade-leave-active
    transition opacity .5s
  .fade-enter, .fade-leave-to
    opacity 0
</style>
