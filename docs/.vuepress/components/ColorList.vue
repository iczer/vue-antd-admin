<template>
  <div>
    <color class="color" :key="index" v-for="(color, index) in colors" :color="color" ></color>
  </div>
</template>

<script>
  export default {
    name: 'ColorList',
    props: ['colors']
  }
</script>

<style scoped>
  .color{
    margin: 0 2px;
  }
</style>