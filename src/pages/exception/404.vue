<template>
  <exception-page :style="`min-height: ${minHeight}px`" type="404" />
</template>

<script>
import ExceptionPage from '@/components/exception/ExceptionPage'
import {mapState} from 'vuex'
export default {
  name: 'Exp404',
  components: {ExceptionPage},
  inject: ['layoutMinHeight'],
  computed: {
    ...mapState('setting', ['multiPage']),
    minHeight() {
      let layoutMinHeight = this.layoutMinHeight || window.innerHeight
      return this.multiPage ? layoutMinHeight - 32 : layoutMinHeight
    }
  }
}
</script>

<style scoped lang="less">
</style>
