<template>
  <span class="header-search">
    <a-icon type="search" class="search-icon" @click="enterSearchMode"/>
    <a-auto-complete
      ref="input"
      :dataSource="dataSource"
      :class="['search-input', searchMode ? 'enter' : 'leave']"
      placeholder="站内搜索"
      @blur="leaveSearchMode"
    >
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
      setTimeout(() => this.$refs.input.focus(), 300)
    },
    leaveSearchMode () {
      this.searchMode = false
    }
  }
}
</script>

<style lang="less">
  .header-search{
    .search-icon{
      font-size: 16px;
      cursor: pointer;
    }
    .search-input{
      border: 0;
      border-bottom: 1px rgba(3, 5, 6, 0.23) solid;
      transition: width 0.3s ease-in-out;
      input{
        border: 0;
        box-shadow: 0 0 0 0;
      }
      &.leave{
        width: 0px;
        input{
          display: none;
        }
      }
      &.enter{
        width: 200px;
        input:focus{
          box-shadow: 0 0 0 0;
        }
      }
    }
  }
</style>
