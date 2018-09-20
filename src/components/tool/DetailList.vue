<template>
  <div :class="['detail-list', size === 'small' ? 'small' : 'large', layout === 'vertical' ? 'vertical': 'horizontal']">
    <div v-if="title" class="title">{{title}}</div>
    <a-row>
      <slot></slot>
    </a-row>
  </div>
</template>

<script>
import ACol from 'ant-design-vue/es/grid/Col'
const Item = {
  name: 'DetailListItem',
  props: {
    term: {
      type: String,
      required: false
    }
  },
  inject: {
    col: {
      type: Number
    }
  },
  methods: {
    renderTerm (h, term) {
      return term ? h(
        'div',
        {
          attrs: {
            class: 'term'
          }
        },
        [term]
      ) : null
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
        props: responsive[this.col]
      },
      [term, content]
    )
  }
}

const responsive = {
  1: { xs: 24 },
  2: { xs: 24, sm: 12 },
  3: { xs: 24, sm: 12, md: 8 },
  4: { xs: 24, sm: 12, md: 6 }
}

export default {
  name: 'DetailList',
  Item: Item,
  props: {
    title: {
      type: String,
      required: false
    },
    col: {
      type: Number,
      required: false,
      default: 3
    },
    size: {
      type: String,
      required: false,
      default: 'large'
    },
    layout: {
      type: String,
      required: false,
      default: 'horizontal'
    }
  },
  provide () {
    return {
      col: this.col > 4 ? 4 : this.col
    }
  }
}
</script>

<style lang="less">
  .detail-list{
    .title {
      font-size: 16px;
      color: rgba(0,0,0,.85);
      font-weight: bolder;
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
      color: rgba(0,0,0,.65);
      display: table-cell;
    }
    &.small{
      .title{
        font-size: 14px;
        color: rgba(0,0,0,.65);
        font-weight: normal;
        margin-bottom: 12px;
      }
      .term,.content{
        padding-bottom: 8px;
      }
    }
    &.large{
      .term,.content{
        padding-bottom: 16px;
      }
    }
    &.vertical{
      .term {
        padding-bottom: 8px;
      }
      .term,.content{
        display: block;
      }
    }
  }
</style>
