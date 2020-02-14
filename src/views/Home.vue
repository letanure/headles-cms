<template lang="pug">
  .home
    img(alt="Vue logo" src="../assets/logo.png")
    HelloWorld(msg="Welcome to Your Vue.js App")
    template(slot="name" slot-scope="props") 
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
}
</script>
