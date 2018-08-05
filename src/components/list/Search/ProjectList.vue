<template>
  <div>
    <search-form />
    <a-list
      :grid='{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }'
    >
      <a-list-item :key="n" v-for="n in 8" style="padding: 0 12px">
        <a-card>
          <img slot="cover" src="https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png" height="154"/>
          <a-card-meta title="Ant Design">
            <div slot="description">
              城镇中有那么多的酒馆，她却偏偏走进了我的酒馆
            </div>
          </a-card-meta>
          <div class="content">
            <span>4小时前</span>
            <a-avatar size="small" src="https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png" />
          </div>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import ACard from 'vue-antd-ui/es/card/Card'
import SearchForm from './SearchForm'
import AList from 'vue-antd-ui/es/list'
import AListItem from 'vue-antd-ui/es/list/Item'
import ACardMeta from 'vue-antd-ui/es/card/Meta'
import AAvatar from 'vue-antd-ui/es/avatar/Avatar'
export default {
  name: 'ProjectList',
  components: {AAvatar, ACardMeta, AListItem, AList, SearchForm, ACard}
}
</script>

<style lang="less" scoped>
  .content{
    display: flex;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;
    height: 20px;
    & > span {
      color: rgba(0,0,0,.45);
      flex: 1;
      font-size: 12px;
    }
    .avatarList {
      flex: 0 1 auto;
    }
  }
</style>
