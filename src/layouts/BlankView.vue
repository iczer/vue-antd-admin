<template>
  <page-toggle-transition :disabled="animate.disabled" :animate="animate.name" :direction="animate.direction">
    <keep-alive :exclude="dustbins" v-if="multiPage">
      <router-view />
    </keep-alive>
    <router-view v-else />
  </page-toggle-transition>
</template>

<script>
import PageToggleTransition from '../components/transition/PageToggleTransition';
import {mapState} from 'vuex'

export default {
  name: 'BlankView',
  components: {PageToggleTransition},
  computed: {
    ...mapState('setting', ['multiPage', 'animate', 'dustbins'])
  }
}
</script>

<style scoped>

</style>
