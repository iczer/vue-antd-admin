<template>
  <a-dropdown style="display: inline-block; height: 100%" >
    <span style="vertical-align: middle; cursor: pointer">
      <a-avatar style="vertical-align: middle;" size="small" shape="circle" :src="currUser.avatar"/>
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
import ADropdown from 'vue-antd-ui/es/dropdown'
import AAvatar from 'vue-antd-ui/es/avatar/Avatar'
import AIcon from 'vue-antd-ui/es/icon/icon'
import AMenu from 'vue-antd-ui/es/menu/index'

const AMenuItem = AMenu.Item
const AMenuDivider = AMenu.Divider

export default {
  name: 'HeaderAvatar',
  components: {AMenu, AMenuItem, AMenuDivider, AIcon, AAvatar, ADropdown},
  data () {
    return {
      currUser: {
        name: 'XXXXX',
        avatar: ''
      }
    }
  },
  mounted () {
    this.currentUser()
  },
  methods: {
    currentUser () {
      this.$axios({
        method: 'get',
        url: '/user/current'
      }).then(res => {
        this.currUser = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
