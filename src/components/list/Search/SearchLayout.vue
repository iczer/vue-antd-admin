<template>
    <div>
      <div class="search-head">
        <div class="search-input">
          <a-input-search style="width: 522px" placeholder="请输入..." size="large" enterButton="搜索" />
        </div>
        <div style="padding: 0 24px">
          <a-tabs :tabBarStyle="{margin: 0}" @change="navigate" :activeKey="activeKey">
            <a-tab-pane tab="文章" key="1"></a-tab-pane>
            <a-tab-pane tab="应用" key="2"></a-tab-pane>
            <a-tab-pane tab="项目" key="3"></a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="search-content">
        <router-view />
      </div>
    </div>
</template>

<script>
import AInput from 'vue-antd-ui/es/input/Input'
import AInputGroup from 'vue-antd-ui/es/input/Group'
import AButton from 'vue-antd-ui/es/button/button'
import AInputSearch from 'vue-antd-ui/es/input/Search'
import ATabs from 'vue-antd-ui/es/tabs'

const ATabPane = ATabs.TabPane

export default {
  name: 'SearchLayout',
  components: {ATabPane, ATabs, AInputSearch, AButton, AInputGroup, AInput},
  data () {
    return {
      activeKey: '1'
    }
  },
  watch: {
    '$route': function (val) {
      switch (val.path) {
        case '/list/search/article':
          this.activeKey = '1'
          break
        case '/list/search/application':
          this.activeKey = '2'
          break
        case '/list/search/project':
          this.activeKey = '3'
          break
        default:
          this.activeKey = '2'
      }
    }
  },
  methods: {
    navigate (key) {
      this.activeKey = key
      switch (key) {
        case '1':
          this.$router.push('/list/search/article')
          break
        case '2':
          this.$router.push('/list/search/application')
          break
        case '3':
          this.$router.push('/list/search/project')
          break
        default:
          this.$router.push('/workplace')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .search-head{
    background-color: #fff;
    margin: -25px -24px -24px;
    .search-input{
      text-align: center;
    }
  }
  .search-content{
    margin-top: 48px;
  }
</style>
