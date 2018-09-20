<template>
  <div>
    <a-card class="card" title="仓库管理" :bordered="false">
      <repository-form ref="repository" :showSubmit="false" />
    </a-card>
    <a-card class="card" title="任务管理" :bordered="false">
      <task-form ref="task" :showSubmit="false" />
    </a-card>
    <a-card title="用户管理" :bordered="false">
      <table-form />
    </a-card>
    <footer-tool-bar>
      <a-button type="primary" @click="validate" :loading="loading">提交</a-button>
    </footer-tool-bar>
  </div>
</template>

<script>
import RepositoryForm from './RepositoryForm'
import TaskForm from './TaskForm'
import TableForm from './TableForm'
import FooterToolBar from '../../../components/tool/FooterToolBar'

export default {
  name: 'AdvancedForm',
  components: {FooterToolBar, TableForm, TaskForm, RepositoryForm},
  data () {
    return {
      desc: '高级表单常见于一次性输入和提交大批量数据的场景。',
      loading: false
    }
  },
  methods: {
    validate () {
      this.$refs.repository.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
      this.$refs.task.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .card{
    margin-bottom: 24px;
  }
</style>
