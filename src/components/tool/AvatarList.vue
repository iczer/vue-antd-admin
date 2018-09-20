<template>
  <div class="avatar-list">
    <ul>
      <slot>
      </slot>
    </ul>
  </div>
</template>

<script>
import AAvatar from 'ant-design-vue/es/avatar/Avatar'
import ATooltip from 'ant-design-vue/es/tooltip/Tooltip'
const Item = {
  name: 'AvatarListItem',
  props: {
    size: {
      type: String,
      required: false,
      default: 'small'
    },
    src: {
      type: String,
      required: true
    },
    tips: {
      type: String,
      required: false
    }
  },
  methods: {
    renderAvatar (h, size, src) {
      return h(AAvatar, {props: {size: size, src: src}}, [])
    }
  },
  render (h) {
    const avatar = this.renderAvatar(h, this.$props.size, this.$props.src)
    return h(
      'li',
      {class: 'avatar-item'},
      [!this.$props.tips ? h(ATooltip, {props: {title: this.$props.tips}}, [avatar]) : avatar]
    )
  }
}
export default {
  name: 'AvatarList',
  Item: Item
}
</script>

<style lang="less">
  .avatar-list {
    display: inline-block;
    ul {
      display: inline-block;
      margin-left: 8px;
      font-size: 0;
      .avatar-item {
        display: inline-block;
        font-size: 14px;
        margin-left: -8px;
        width: 20px;
        height: 20px;
        :global {
          .ant-avatar {
            border: 1px solid #fff;
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
</style>
