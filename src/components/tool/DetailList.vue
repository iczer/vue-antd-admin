<template>
  <div>
    <div class="title">{{title}}</div>
    <a-row>
      <slot></slot>
    </a-row>
  </div>
</template>

<script>
import ACol from 'vue-antd-ui/es/grid/Col'
import ARow from 'vue-antd-ui/es/grid/Row'
const Item = {
  name: 'DetailListItem',
  props: {
    term: {
      type: String,
      required: false
    }
  },
  methods: {
    renderTerm (h, term) {
      return h(
        'div',
        {
          attrs: {
            class: 'term'
          }
        },
        [term]
      )
    },
    renderContent (h, content) {
      return h(
        'div',
        {
          attrs: {
            class: 'content'
          }
        },
        [content]
      )
    }
  },
  render (h) {
    const term = this.renderTerm(h, this.$props.term)
    const content = this.renderContent(h, this.$slots.default)
    return h(
      ACol,
      {
        props: {
          xs: 24,
          sm: 12,
          md: 8
        }
      },
      [term, content]
    )
  }
}
export default {
  name: 'DetailList',
  Item: Item,
  props: ['title'],
  components: {ARow, ACol}
}
</script>

<style lang="less">
  .title {
    font-size: 16px;
    color: rgba(0,0,0,.85);
    font-weight: 500;
    margin-bottom: 16px;
  }
  .term {
    // Line-height is 22px IE dom height will calculate error
    line-height: 20px;
    padding-bottom: 16px;
    margin-right: 8px;
    color: rgba(0,0,0,.85);
    white-space: nowrap;
    display: table-cell;
    &:after {
      content: ':';
      margin: 0 8px 0 2px;
      position: relative;
      top: -0.5px;
    }
  }
  .content{
    line-height: 22px;
    width: 100%;
    padding-bottom: 16px;
    color: rgba(0,0,0,.85);
    display: table-cell;
  }
  .term,
  .content{
    padding-bottom: 8px;
  }
</style>
