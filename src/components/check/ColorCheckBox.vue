<template>
  <div class="theme-color" :style="{backgroundColor: color}" @click="toggle">
    <a-icon v-if="sChecked" type="check" />
  </div>
</template>

<script>
import AIcon from 'ant-design-vue/es/icon/icon'

const Group = {
  name: 'ColorCheckBoxGroup',
  props: {
    defaultValues: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data () {
    return {
      values: this.defaultValues
    }
  },
  provide () {
    return {
      groupContext: this
    }
  },
  methods: {
    handleChange (value) {
      if (!value.checked) {
        const values = this.values.filter(item => item.value !== value.value)
        this.values = values
      } else {
        this.values.push(value)
      }
      this.$emit('change', this.values)
    }
  },
  render (h) {
    const clear = h('div', {attrs: {style: 'clear: both'}})
    return h(
      'div',
      {},
      [this.$slots.default, clear]
    )
  }
}

export default {
  name: 'ColorCheckBox',
  Group: Group,
  components: {AIcon},
  props: {
    color: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      sChecked: this.checked
    }
  },
  inject: ['groupContext'],
  watch: {
    'sChecked': function (val) {
      const value = {
        value: this.value,
        color: this.color,
        checked: this.sChecked
      }
      this.$emit('change', value)
      this.groupContext.handleChange(value)
    }
  },
  methods: {
    toggle () {
      this.sChecked = !this.sChecked
    }
  }
}
</script>

<style lang="less" scoped>
  .theme-color{
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 2px;
    cursor: pointer;
    margin-right: 8px;
    text-align: center;
    color: #fff;
    font-weight: bold;
  }
</style>
