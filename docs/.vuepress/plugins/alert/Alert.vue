<template>
  <div class="alert" :style="`top: ${top}px`">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Alert',
    props: ['alert'],
    data() {
      return {
        top: 0
      }
    },
    beforeMount() {
      this.top = this.alert.top
    },
    mounted() {
     window.addEventListener('alert_remove', (e) => {
       this.top -= e.detail.height
     })
    },
    watch: {
      'page.alert.top': function (value) {
      }
    }
  }
</script>

<style scoped>
  .alert{
    position: fixed;
    padding: 6px 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    margin: 0 auto;
    z-index: 999;
    top: 100px;
    width: fit-content;
    left: 0;
    right: 0;
    transition: top 0.3s;
  }
</style>