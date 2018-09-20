<template>
  <div class="hot-search">
    <a-row style="margin: 0 -34px">
      <a-col style="padding: 0 34px; margin-bottom: 24px" :sm="12" :xs="24">
        <div class="num-info">
          <span class="title">搜索用户数</span>
          <div class="value">
            <span class="total">12321</span>
            <span class="subtotal">71.2<a-icon type="caret-up" /></span>
          </div>
        </div>
        <mini-area style="height: 45px" />
      </a-col>
      <a-col style="padding: 0 34px; margin-bottom: 24px" :sm="12" :xs="24">
        <div class="num-info">
          <span class="title">搜索用户数</span>
          <div class="value">
            <span class="total">2.7</span>
            <span class="subtotal">71.2<a-icon type="caret-down" /></span>
          </div>
        </div>
        <mini-area style="height: 45px" />
      </a-col>
    </a-row>
    <a-table
      :dataSource="searchData"
      :columns="columns" size="small"
      :pagination="{style: { marginBottom: 0 }, pageSize: 5}"
    >
      <a href="#/" slot="keyword" slot-scope="text">{{text}}</a>
      <span slot="rang" slot-scope="text">{{text}} %<a-icon type="caret-up" /> </span>
    </a-table>
  </div>
</template>

<script>
import MiniArea from '../chart/MiniArea'

const searchData = []
for (let i = 0; i < 50; i++) {
  searchData.push({
    index: i + 1,
    keyword: '关键词-' + i,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2)
  })
}

const columns = [
  {
    title: '排名',
    dataIndex: 'index',
    key: 'index'
  },
  {
    title: '搜索关键词',
    dataIndex: 'keyword',
    key: 'keyword',
    scopedSlots: {customRender: 'keyword'}
  },
  {
    title: '用户数',
    dataIndex: 'count',
    key: 'count',
    sorter: (a, b) => a.count - b.count
  },
  {
    title: '周涨幅',
    dataIndex: 'range',
    key: 'range',
    scopedSlots: {customRender: 'rang'}
  }
]

export default {
  name: 'HotSearch',
  components: {MiniArea},
  data () {
    return {
      searchData,
      columns
    }
  }
}
</script>

<style lang="less" scoped>
  .num-info{
    .title{
      color: rgba(0,0,0,.45);
      font-size: 14px;
      height: 22px;
      line-height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      white-space: nowrap;
    }
    .value{
      .total{
        color: rgba(0,0,0,.85);
        display: inline-block;
        line-height: 32px;
        height: 32px;
        font-size: 24px;
        margin-right: 32px;
      }
      .subtotal{
        color: rgba(0,0,0,.45);
        font-size: 16px;
        vertical-align: top;
        margin-right: 0;
        i{
          font-size: 12px;
          color: red;
          transform: scale(.82);
          margin-left: 4px;
        }
      }
    }
  }
</style>
