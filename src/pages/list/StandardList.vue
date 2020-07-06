<template>
  <div>
    <a-card :bordered="false">
      <div style="display: flex; flex-wrap: wrap">
          <head-info title="我的待办" content="8个任务" :bordered="true"/>
          <head-info title="本周任务平均处理时间" content="32分钟" :bordered="true"/>
          <head-info title="本周完成任务数" content="24个"/>
      </div>
    </a-card>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="标准列表"
    >
      <div slot="extra">
        <a-radio-group>
          <a-radio-button>全部</a-radio-button>
          <a-radio-button>进行中</a-radio-button>
          <a-radio-button>等待中</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>
      <a-button type="dashed" style="width: 100%" icon="plus">添加</a-button>
      <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
        <a-list-item :key="i" v-for="i in 5">
          <a-list-item-meta
            description="那是一种内在的东西， 他们到达不了，也无法触及的"
          >
            <a-avatar slot="avatar" size="large" shape="square" src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"/>
            <a slot="title">AliPay</a>
          </a-list-item-meta>
          <div slot="actions">
            <a>编辑</a>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a>编辑</a></a-menu-item>
                <a-menu-item><a>删除</a></a-menu-item>
              </a-menu>
              <a>更多<a-icon type="down"/></a>
            </a-dropdown>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>Owner</span>
              <p>付晓晓</p>
            </div>
            <div class="list-content-item">
              <span>开始时间</span>
              <p>2018-07-26 22:44</p>
            </div>
            <div class="list-content-item">
              <a-progress :percent="80" style="width: 180px" />
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '../../components/tool/HeadInfo'
export default {
  name: 'StandardList',
  components: {HeadInfo}
}
</script>

<style lang="less" scoped>
  .list-content-item{
    color: @text-color-second;
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;
    span{
      line-height: 20px;
    }
    p{
      margin: 4px 0 0;
      line-height: 22px;
    }
  }
</style>
