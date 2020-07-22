<template>
  <div class="alert" :style="`top: ${top}px`">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Alert',
    props: ['show'],
    data() {
      return {
        top: 100
      }
    },
    mounted() {
      console.log(this)
      // this.$page.alert = this.$page.alert ? this.$page.alert : {top: 100}
      // this.$page.alert.top += 20
      // this.top = this.$page.alert.top
      setTimeout(() => {
        this.$el.remove()
      }, 1000)
    }
  }
</script>

<style scoped>
  .alert{
    position: absolute;
    padding: 6px 8px;
    background-color: #f0f2f5;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    margin: 0 auto;
    z-index: 999;
    top: 100px;
    width: fit-content;
    left: 0;
    right: 0;
  }
</style>