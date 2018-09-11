<template>
  <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial" >
    <span style="cursor: pointer">
      <a-avatar class="avatar" size="small" shape="circle" :src="currUser.avatar"/>
      <span>{{currUser.name}}</span>
    </span>
    <a-menu style="width: 150px" slot="overlay">
      <a-menu-item>
        <a-icon type="user" />
        <span>个人中心</span>
      </a-menu-item>
      <a-menu-item>
        <a-icon type="setting" />
        <span>设置</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <router-link to="/login">
          <a-icon type="poweroff" />
          <span>退出登录</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import ADropdown from 'ant-design-vue/es/dropdown'
import AAvatar from 'ant-design-vue/es/avatar/Avatar'
import AIcon from 'ant-design-vue/es/icon/icon'
import AMenu from 'ant-design-vue/es/menu/index'

const AMenuItem = AMenu.Item
const AMenuDivider = AMenu.Divider

export default {
  name: 'HeaderAvatar',
  components: {AMenu, AMenuItem, AMenuDivider, AIcon, AAvatar, ADropdown},
  computed: {
    currUser () {
      return this.$store.state.account.user
    }
  }
}
</script>

<style lang="less" scoped>
  .avatar{
    margin: 20px 4px 20px 0;
    color: #1890ff;
    background: hsla(0,0%,100%,.85);
    vertical-align: middle;
  }
</style>
