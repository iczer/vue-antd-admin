<template>
  <div>
    <search-form />
    <a-card :bordered="false">
      contentC
    </a-card>
  </div>
</template>

<script>
import ACard from 'vue-antd-ui/es/card/Card'
import SearchForm from './SearchForm'
export default {
  name: 'ProjectList',
  components: {SearchForm, ACard}
}
</script>

<style scoped>

</style>
