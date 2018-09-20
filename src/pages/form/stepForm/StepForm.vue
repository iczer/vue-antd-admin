<template>
  <a-card :bordered="false">
    <a-steps class="steps" :current="current">
      <a-step title="填写转账信息" />
      <a-step title="确认转账信息" />
      <a-step title="完成" />
    </a-steps>
    <div class="content">
      <step1 v-if="current === 0" @nextStep="nextStep"></step1>
      <step2 v-if="current === 1" @nextStep="nextStep" @prevStep="prevStep"></step2>
      <step3 v-if="current === 2" @prevStep="prevStep" @finish="finish"></step3>
    </div>
  </a-card>
</template>

<script>
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

export default {
  name: 'StepForm',
  components: {Step1, Step2, Step3},
  data () {
    return {
      desc: '将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。',
      current: 0
    }
  },
  methods: {
    nextStep () {
      if (this.current < 2) {
        this.current += 1
      }
    },
    prevStep () {
      if (this.current > 0) {
        this.current -= 1
      }
    },
    finish () {
      this.current = 0
    }
  }
}
</script>

<style lang="less" scoped>
  .steps{
    max-width: 750px;
    margin: 16px auto;
  }
</style>
