<template>
  <div class="standard-table">
    <div class="alert">
      <a-alert type="info">
        <div slot="message">
          已选择<span></span>项
          服务调用总计<span></span>
          <a>清空</a>
        </div>
      </a-alert>
    </div>
    <a-table
      :bordered="bordered"
      :loading="loading"
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="rowKey"
      :pagination="pagination"
    />
  </div>
</template>

<script>
import AAlert from 'vue-antd-ui/es/alert/index'
import ATable from 'vue-antd-ui/es/table'
export default {
  name: 'StandardTable',
  components: {ATable, AAlert},
  props: ['bordered', 'loading', 'columns', 'dataSource', 'rowKey', 'pagination']
}
</script>

<style scoped>
  .alert{
    margin-bottom: 16px;
  }
</style>
