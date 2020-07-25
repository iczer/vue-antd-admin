<template>
  <exception-page :style="`min-height: ${pageMinHeight}px`" type="403" />
</template>

<script>
import ExceptionPage from '@/components/exception/ExceptionPage'
import {mapState} from 'vuex'
export default {
  name: 'Exp403',
  components: {ExceptionPage},
  computed: {
    ...mapState('setting', ['pageMinHeight'])
  }
}
</script>

<style scoped lang="less">
</style>
