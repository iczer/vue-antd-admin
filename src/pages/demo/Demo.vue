<template>
  <div class="new-page" :style="`min-height: ${layoutMinHeight}px`">
    <h1>{{$t('content')}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'Demo',
    inject: ['layoutMinHeight'],
    i18n: require('./i18n'),
    data() {
      return {
      }
    },
    computed: {
      desc() {
        return this.$t('description')
      }
    }
  }
</script>

<style scoped lang="less">
@import "index";
</style>