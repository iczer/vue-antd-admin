<template>
  <div class="header-search">
    <a-icon type="search" class="search-icon" @click="enterSearchMode"/>
    <a-auto-complete
      ref="input"
      :getPopupContainer="e => {return e.parentNode || document.body}"
      :dataSource="dataSource"
      :class="['search-input', searchMode ? 'enter' : 'leave']"
      placeholder="站内搜索"
      @blur="leaveSearchMode"
    >
    </a-auto-complete>
  </div>
</template>

<script>
export default {
  name: 'HeaderSearch',
  data () {
    return {
      dataSource: ['选项一', '选项二'],
      searchMode: false
    }
  },
  methods: {
    enterSearchMode () {
      this.searchMode = true
      this.$emit('active', true)
      setTimeout(() => this.$refs.input.focus(), 300)
    },
    leaveSearchMode () {
      this.searchMode = false
      setTimeout(() => this.$emit('active', false), 300)
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
      border-bottom: 1px solid @border-color-split;
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
