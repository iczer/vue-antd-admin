<template>
  <transition name="page-toggle">
    <keep-alive v-if="multiPage">
      <router-view />
    </keep-alive>
    <router-view v-else />
  </transition>
</template>

<script>
export default {
  name: 'RouteView',
  computed: {
    multiPage () {
      return this.$store.state.setting.multiPage
    }
  }
}
</script>

<style scoped>

</style>
