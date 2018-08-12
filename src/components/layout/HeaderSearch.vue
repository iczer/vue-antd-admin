<template>
  <span class="header-item">
    <a-icon type="search" style="font-size: 16px; cursor: pointer;" @click="enterSearchMode"/>
    <a-auto-complete
      ref="input"
      :dataSource="dataSource"
      :class="[searchMode ? 'enterSearch' : 'leaveSearch']"
      placeholder="站内搜索"
      @blur="leaveSearchMode"
    >
      <a-input style="" />
    </a-auto-complete>
  </span>
</template>

<script>
import AIcon from 'ant-design-vue/es/icon/icon'
import AAutoComplete from 'ant-design-vue/es/auto-complete/index'
import AInput from 'ant-design-vue/es/input/Input'
export default {
  name: 'HeaderSearch',
  components: {AInput, AAutoComplete, AIcon},
  data () {
    return {
      dataSource: ['选项一', '选项二'],
      searchMode: false
    }
  },
  methods: {
    enterSearchMode () {
      this.searchMode = true
      this.$refs.input.focus()
    },
    leaveSearchMode () {
      this.searchMode = false
    }
  }
}
</script>

<style scoped>
  .enterSearch {
    width: 225px;
    border-bottom: 1px rgba(3, 5, 6, 0.23) solid;
    transition: width 0.3s ease-in-out;
  }
  .leaveSearch {
    width: 0px;
    border-bottom: 1px rgba(3, 5, 6, 0.23) solid;
    transition: width 0.3s ease-in-out;
  }
  .enterSearch input, .leaveSearch input {
    border: 0;
  }
  .enterSearch input:focus {
    border: 0;
    box-shadow: 0 0 0 0;
  }
  .leaveSearch input{
    width: 0px;
    border: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: width .3s;
  }
  .fade-enter{
    width: 200px;
  }
  .fade-leave{
    width: 0px;
  }
  .header-item{
    margin: 0 12px;
  }
</style>
