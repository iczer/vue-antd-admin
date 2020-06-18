<template>
  <a-layout-sider class="sider" width="273">
    <setting-item title="整体风格设置">
      <img-checkbox-group @change="setTheme">
        <img-checkbox img="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg" :checked="true" value="dark"/>
        <img-checkbox img="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg" value="light"/>
      </img-checkbox-group>
    </setting-item>
    <setting-item title="主题色">
      <color-checkbox-group @change="onColorChange" :defaultValues="[5]" :multiple="false">
        <color-checkbox v-for="(color, index) in colors" :key="index" :color="color" :value="index" />
      </color-checkbox-group>
    </setting-item>
    <a-divider/>
    <setting-item title="导航设置">
      <img-checkbox-group @change="setLayout">
        <img-checkbox img="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg" :checked="true" value="side"/>
        <img-checkbox img="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg" value="head"/>
      </img-checkbox-group>
    </setting-item>
    <setting-item>
      <a-list :split="false">
        <a-list-item>
          栅格模式
          <a-select size="small" defaultValue="1" slot="actions" style="width: 80px">
            <a-select-option value="1">流式</a-select-option>
            <a-select-option value="2">定宽</a-select-option>
          </a-select>
        </a-list-item>
        <a-list-item>
          固定Header
          <a-switch slot="actions" size="small" />
        </a-list-item>
        <a-list-item>
          固定Siderbar
          <a-switch slot="actions" size="small" />
        </a-list-item>
      </a-list>
    </setting-item>
    <a-divider />
    <setting-item title="其他设置">
      <a-list :split="false">
        <a-list-item>
          色弱模式
          <a-switch slot="actions" size="small" />
        </a-list-item>
        <a-list-item>
          显示抽屉按钮
          <a-switch slot="actions" size="small" />
        </a-list-item>
        <a-list-item>
          多页签模式
          <a-switch :checked="multiPage" slot="actions" size="small" @change="setMultiPage" />
        </a-list-item>
      </a-list>
    </setting-item>
    <a-divider />
    <setting-item title="页面切换动画">
      <a-list :split="false">
        <a-list-item>
          动画效果
          <a-select v-model="animate" @change="setAnimate" class="select-item" size="small" slot="actions">
            <a-select-option :key="index" :value="index" v-for="(item, index) in animates">{{item.alias}}</a-select-option>
          </a-select>
        </a-list-item>
        <a-list-item>
          动画方向
          <a-select v-model="direction" @change="setAnimate" class="select-item" size="small" slot="actions">
            <a-select-option :key="index" :value="index" v-for="(item, index) in animateCfg.directions">{{item}}</a-select-option>
          </a-select>
        </a-list-item>
      </a-list>
    </setting-item>
    <a-button id="copyBtn" data-clipboard-text="Sorry, you have copied nothing O(∩_∩)O~" @click="copyCode" style="width: 100%" icon="copy" >拷贝代码</a-button>
  </a-layout-sider>
</template>

<script>
import SettingItem from './SettingItem'
import ColorCheckbox from '../checkbox/ColorCheckbox'
import ImgCheckbox from '../checkbox/ImgCheckbox'
import Clipboard from 'clipboard'
import themeUtil from '../../utils/themeUtil';
import { mapState } from 'vuex'

const ColorCheckboxGroup = ColorCheckbox.Group
const ImgCheckboxGroup = ImgCheckbox.Group

export default {
  name: 'Setting',
  components: {ImgCheckboxGroup, ImgCheckbox, ColorCheckboxGroup, ColorCheckbox, SettingItem},
  data() {
    return {
      animate: 0,
      direction: 0,
      colors: ['#f5222d', '#fa541c', '#faad14', '#13c2c2', '#52c41a', '#1d92ff', '#2f54eb', '#722ed1'],
    }
  },
  watch: {
    animate(){
      this.direction = 0
    }
  },
  computed: {
    animateCfg() {
      return this.animates[this.animate]
    },
    ...mapState('setting', ['animates', 'multiPage'])
  },
  methods: {
    onColorChange (values, colors) {
      if (colors.length > 0) {
        let closeMessage = this.$message.loading(`您选择了主题色 ${colors}, 正在切换...`)
        themeUtil.changeThemeColor(colors[0]).then(closeMessage)
      }
    },
    setTheme (values) {
      this.$store.commit('setting/setTheme', values[0])
    },
    setLayout (values) {
      this.$store.commit('setting/setLayout', values[0])
    },
    copyCode () {
      let clipboard = new Clipboard('#copyBtn')
      const _this = this
      clipboard.on('success', function () {
        _this.$message.success(`复制成功`)
        clipboard.destroy()
      })
    },
    setMultiPage (checked) {
      this.$store.commit('setting/setMultiPage', checked)
    },
    setAnimate() {
      let animation = this.animates[this.animate]
      let animate = {
        name: animation.name,
        direction: animation.directions[this.direction]
      }
      this.$store.commit('setting/setAnimate', animate)
    }
  }
}
</script>

<style lang="less" scoped>
  .sider{
    background-color: #fff;
    height: 100%;
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
    position: relative;
    .flex{
      display: flex;
    }
    .select-item{
      width: 80px;
    }
  }
</style>
