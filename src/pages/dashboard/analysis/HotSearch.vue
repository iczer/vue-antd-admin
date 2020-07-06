<template>
  <div class="hot-search">
    <a-row style="margin: 0 -34px">
      <a-col style="padding: 0 34px; margin-bottom: 24px" :sm="12" :xs="24">
        <div class="num-info">
          <span class="title">
            {{$t('search')}}
            <a-tooltip :title="$t('introduce')">
              <a-icon type="info-circle" style="font-size: 14px; margin-left: 8px" />
            </a-tooltip>
          </span>
          <div class="value">
            <span class="total">12321</span>
            <span class="subtotal">71.2<a-icon type="caret-up" /></span>
          </div>
        </div>
        <mini-area style="height: 45px" />
      </a-col>
      <a-col style="padding: 0 34px; margin-bottom: 24px" :sm="12" :xs="24">
        <div class="num-info">
          <span class="title">
            {{$t('capita')}}
            <a-tooltip :title="$t('introduce')">
              <a-icon type="info-circle" style="font-size: 14px; margin-left: 8px" />
            </a-tooltip>
          </span>
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
      :columns="tableColumns"
      :pagination="{style: { marginBottom: 0 }, pageSize: 5}"
      size="small"
      rowKey="index"
    >
      <a href="#/" slot="keyword" slot-scope="text">{{text}}</a>
      <span slot="rang" slot-scope="text">{{text}} %<a-icon type="caret-up" /> </span>
    </a-table>
  </div>
</template>

<script>
import MiniArea from '../../../components/chart/MiniArea'

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
    dataIndex: 'index',
    key: 'rank'
  },
  {
    dataIndex: 'keyword',
    key: 'keyword',
    scopedSlots: {customRender: 'keyword'}
  },
  {
    dataIndex: 'count',
    key: 'users',
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
  i18n: require('./i18n-search'),
  data () {
    return {
      searchData,
      columns
    }
  },
  computed: {
    tableColumns() {
      let columns = this.columns
      return columns.map(item => {
       item.title = this.$t(item.key)
        return item
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .num-info{
    .title{
      color: @text-color-second;
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
        color: @title-color;
        display: inline-block;
        line-height: 32px;
        height: 32px;
        font-size: 24px;
        margin-right: 32px;
      }
      .subtotal{
        color: @text-color-second;
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
