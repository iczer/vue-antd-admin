<template>
  <exception-page :style="`margin-top: ${marginTop}px; min-height: ${minHeight}px`" type="403" />
</template>

<script>
import ExceptionPage from '@/components/exception/ExceptionPage'
import {mapState} from 'vuex'
export default {
  name: 'Exp403',
  components: {ExceptionPage},
  inject: ['layoutMinHeight'],
  computed: {
    ...mapState('setting', ['multiPage']),
    marginTop() {
      return this.multiPage ? -24 : 0
    },
    minHeight() {
      return this.multiPage ? this.layoutMinHeight - 32 : this.layoutMinHeight
    }
  }
}
</script>

<style scoped lang="less">
</style>
