<template>
  <div >
    <a-list
      :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
      :dataSource="dataSource"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <template v-if="item === null">
          <a-button class="new-btn" type="dashed">
            <a-icon type="plus" />新增产品
          </a-button>
        </template>
        <template v-else>
          <a-card :hoverable="true">
            <a-card-meta :title="item.title" :description="item.content">
              <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="large" />
              <div slot="description">{{item.content}}</div>
            </a-card-meta>
            <ul class="ant-card-actions" slot="actions">
              <li><a >操作一</a></li>
              <li><a >操作二</a></li>
            </ul>
          </a-card>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import AList from 'vue-antd-ui/es/list/index'
import AListItem from 'vue-antd-ui/es/list/Item'
import ACard from 'vue-antd-ui/es/card/Card'
import ACardMeta from 'vue-antd-ui/es/card/Meta'
import AAvatar from 'vue-antd-ui/es/avatar/Avatar'
import AButton from 'vue-antd-ui/es/button/button'
import AIcon from 'vue-antd-ui/es/icon/icon'

const dataSource = []

for (let i = 0; i < 11  ; i++) {
  dataSource.push({
    title: 'Alipay',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    content: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
  })
}
dataSource.push(null)
export default {
  name: 'CardList',
  components: {AIcon, AButton, AAvatar, ACardMeta, ACard, AListItem, AList},
  data () {
    return {
      dataSource
    }
  }
}
</script>

<style lang="less" scoped>
  .card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 48px;
  }
  .ant-card-actions{
    background: #f7f9fa;
    li{
      float: left;
      text-align: center;
      margin: 12px 0;
      color: rgba(0, 0, 0, 0.45);
      width: 50%;
      a{
        color: rgba(0,0,0,.45);
        line-height: 22px;
        display: inline-block;
        width: 100%;
      }
      a:hover{
        color: #1890ff;
      }
    }
    li:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }
  }
  .new-btn{
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 188px;
  }
</style>
