<template>
  <div>
    <a-row style="margin: -12px">
      <a-col :sm="24" :md="12" :xl="6" style="padding: 12px 12px 24px;">
        <chart-card title="总销售额">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <div style="display: inline-block; font-size: 14px; line-height: 22px; margin-right: 16px">
              同周比
              <span>12%</span>
              <span style="color: #f5222d; font-size: 12px"><a-icon type="caret-up" /></span>
            </div>
            <div style="display: inline-block; font-size: 14px; line-height: 22px;">
              日环比
              <span>11%</span>
              <span style="color: #52c41a; font-size: 12px"><a-icon type="caret-down" /></span>
            </div>
          </div>
          <div slot="footer">日均销售额      <span>￥ 234.56</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" style="padding: 12px 12px 24px;">
        <chart-card title="总销售额">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-chart />
          </div>
          <div slot="footer">日均销售额      <span>￥ 234.56</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" style="padding: 12px 12px 24px;">
        <chart-card title="总销售额">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <div style="display: inline-block; font-size: 14px; line-height: 22px; margin-right: 16px">
              同周比
              <span>12%</span>
              <span style="color: #f5222d; font-size: 12px"><a-icon type="caret-up" /></span>
            </div>
            <div style="display: inline-block; font-size: 14px; line-height: 22px;">
              日环比
              <span>11%</span>
              <span style="color: #52c41a; font-size: 12px"><a-icon type="caret-down" /></span>
            </div>
          </div>
          <div slot="footer">日均销售额      <span>￥ 234.56</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" style="padding: 12px 12px 24px;">
        <chart-card title="总销售额">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <div style="display: inline-block; font-size: 14px; line-height: 22px; margin-right: 16px">
              同周比
              <span>12%</span>
              <span style="color: #f5222d; font-size: 12px"><a-icon type="caret-up" /></span>
            </div>
            <div style="display: inline-block; font-size: 14px; line-height: 22px;">
              日环比
              <span>11%</span>
              <span style="color: #52c41a; font-size: 12px"><a-icon type="caret-down" /></span>
            </div>
          </div>
          <div slot="footer">日均销售额      <span>￥ 234.56</span></div>
        </chart-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ACol from 'vue-antd-ui/es/grid/Col'
import ARow from 'vue-antd-ui/es/grid/Row'
import ACard from 'vue-antd-ui/es/card/Card'
import ChartCard from './ChartCard'
import ATooltip from 'vue-antd-ui/es/tooltip/Tooltip'
import AIcon from 'vue-antd-ui/es/icon/icon'
import MiniChart from '../chart/MiniChart'
export default {
  name: 'dashboard',
  components: {MiniChart, AIcon, ATooltip, ChartCard, ACard, ARow, ACol}
}
</script>

<style scoped>

</style>
