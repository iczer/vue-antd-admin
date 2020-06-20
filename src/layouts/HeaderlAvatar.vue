<template>
  <a-dropdown class="header-avatar">
    <span style="cursor: pointer">
      <a-avatar class="avatar" size="small" shape="circle" :src="user.avatar"/>
      <span>{{user.name}}</span>
    </span>
    <a-menu :class="['avatar-menu']" slot="overlay">
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
import {mapState} from 'vuex'

export default {
  name: 'HeaderAvatar',
  computed: {
    ...mapState('setting', ['weekMode']),
    ...mapState('account', ['user']),
  }
}
</script>

<style lang="less">
  .header-avatar{
    display: inline-block;
    height: 100%;
    vertical-align: initial;
  }
  .avatar{
    margin: 20px 4px 20px 0;
    color: #1890ff;
    background: hsla(0,0%,100%,.85);
    vertical-align: middle;
  }
  .avatar-menu{
    width: 150px;
  }
</style>
