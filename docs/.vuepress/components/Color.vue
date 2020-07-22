<template>
  <div :data-clipboard-text="color" class="color" @click="onClick" :style="`background-color:${color}`" />
</template>

<script>
  import Clipboard from 'clipboard'
  export default {
    name: 'Color',
    props: ['color'],
    data() {
      return {
        alert: false
      }
    },
    methods: {
      onClick() {
        let clipboard = new Clipboard('.color')
        clipboard.on('success', () => {
          this.$alert(`颜色代码已复制：${this.color}`)
          clipboard.destroy()
        })
      }
    }
  }
</script>

<style scoped>
  .color{
    border: 1px dashed #a0d911;
    display: inline-block;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
</style>