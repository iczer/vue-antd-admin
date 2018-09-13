<template>
  <div>
    <search-form />
    <a-list
      :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
    >
      <a-list-item style="padding: 0 12px" :key="n" v-for="n in 12">
        <a-card>
          <a-card-meta title="Angular">
            <a-avatar slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png" size="small" />
          </a-card-meta>
            <a-tooltip class="tool"  title="下载" slot="actions">
              <a-icon type="download" />
            </a-tooltip>
            <a-tooltip class="tool"  title="编辑" slot="actions">
              <a-icon type="edit" />
            </a-tooltip>
            <a-tooltip class="tool"  title="分享" slot="actions">
              <a-icon type="share-alt" />
            </a-tooltip>
            <a-dropdown class="tool" slot="actions">
              <a-icon type="ellipsis" />
              <a-menu slot="overlay">
                <a-menu-item>1 item</a-menu-item>
                <a-menu-item>2 item</a-menu-item>
                <a-menu-item>3 item</a-menu-item>
              </a-menu>
            </a-dropdown>
          <div class="content">
            <div>
              <p>活跃用户</p>
              <p>18万</p>
            </div>
            <div>
              <p>新增用户</p>
              <p>1,338</p>
            </div>
          </div>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import ACard from 'ant-design-vue/es/card/Card'
import SearchForm from './SearchForm'
import AList from 'ant-design-vue/es/list'
import AListItem from 'ant-design-vue/es/list/Item'
import ACardMeta from 'ant-design-vue/es/card/Meta'
import AAvatar from 'ant-design-vue/es/avatar/Avatar'
import ATooltip from 'ant-design-vue/es/tooltip/Tooltip'
import AIcon from 'ant-design-vue/es/icon/icon'
import ADropdown from 'ant-design-vue/es/dropdown'
import AMenu from 'ant-design-vue/es/menu/index'

const AMenuItem = AMenu.Item

export default {
  name: 'ApplicationList',
  components: {AMenuItem, AMenu, ADropdown, AIcon, ATooltip, AAvatar, ACardMeta, AListItem, AList, SearchForm, ACard}
}
</script>

<style lang="less" scoped>
  .clearfix() {
    zoom: 1;
    &:before,
    &:after {
      content: ' ';
      display: table;
    }
    &:after {
      clear: both;
      visibility: hidden;
      font-size: 0;
      height: 0;
    }
  }
  .content {
    .clearfix();
    margin-top: 16px;
    margin-left: 40px;
    & > div {
      position: relative;
      text-align: left;
      float: left;
      width: 50%;
      p {
        line-height: 32px;
        font-size: 24px;
        margin: 0;
      }
      p:first-child {
        color: rgba(0,0,0,.45);
        font-size: 12px;
        line-height: 20px;
        margin-bottom: 4px;
      }
    }
  }
</style>
