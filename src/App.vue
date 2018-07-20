<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <gloabl-layout>
      <router-view/>
    </gloabl-layout>
  </div>
</template>

<script>
import GloablLayout from './components/layout/GloablLayout'
export default {
  name: 'App',
  components: {GloablLayout}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
