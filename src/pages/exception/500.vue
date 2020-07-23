<template>
  <exception-page :style="`min-height: ${minHeight}px`" type="500" />
</template>

<script>
import ExceptionPage from '@/components/exception/ExceptionPage'
import {mapState} from 'vuex'
export default {
  name: 'Exp500',
  components: {ExceptionPage},
  inject: ['layoutMinHeight'],
  computed: {
    ...mapState('setting', ['multiPage']),
    minHeight() {
      return this.multiPage ? this.layoutMinHeight - 24 : this.layoutMinHeight
    }
  }
}
</script>

<style scoped lang="less">
</style>
