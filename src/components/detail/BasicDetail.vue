<template>
  <div>
    <a-card :bordered="false">
      <a-tooltip slot="title" title="test" >
        <a-avatar src="https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png" />
      </a-tooltip>
    </a-card>
  </div>
</template>

<script>
import ACard from 'vue-antd-ui/es/card/Card'
import ATooltip from 'vue-antd-ui/es/tooltip/Tooltip'
import AAvatar from 'vue-antd-ui/es/avatar/Avatar'
export default {
  name: 'BasicDetail',
  components: {AAvatar, ATooltip, ACard}
}
</script>

<style scoped>

</style>
