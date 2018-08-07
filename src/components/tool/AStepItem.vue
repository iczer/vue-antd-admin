<template>
  <div>
    <router-link to="/" style="text-decoration:none;out-line: none; color: #000">
      <span :style="titleStyle">{{title}}</span>
      <a-icon :style="iconStyle" :type="icon" />
    </router-link>
  </div>
</template>

<script>
import AIcon from 'vue-antd-ui/es/icon/icon'

const Group = {
  name: 'AStepItemGroup',
  render (h) {
    return h(
      'div',
      {attrs: {style: 'text-align: center; margin-top: 8px'}},
      [h('div', {attrs: {style: 'text-align: left; display: inline-block;'}}, [this.$slots.default])]
    )
  }
}

export default {
  name: 'AStepItem',
  Group: Group,
  components: {AIcon},
  props: ['title', 'icon', 'link', 'titleStyle', 'iconStyle']
}
</script>

<style scoped>

</style>
