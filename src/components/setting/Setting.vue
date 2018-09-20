<template>
  <a-layout-sider class="sider" width="273">
    <setting-item title="整体风格设置">
      <img-checkbox-group @change="setTheme">
        <img-checkbox img="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg" :checked="true" value="dark"/>
        <img-checkbox img="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg" value="light"/>
      </img-checkbox-group>
    </setting-item>
    <setting-item title="主题色">
      <color-checkbox-group @change="onColorChange" :defaultValues="['1', '2', '3']" :multiple="false">
        <color-checkbox ref="colorNode" color="rgb(245, 34, 45)" value="1" />
        <color-checkbox color="rgb(250, 84, 28)" value="2" />
        <color-checkbox color="rgb(250, 173, 20)" value="3" />
        <color-checkbox color="rgb(19, 194, 194)" value="4" />
        <color-checkbox color="rgb(82, 196, 26)" value="5" />
        <color-checkbox color="rgb(24, 144, 255)" value="6" />
        <color-checkbox color="rgb(47, 84, 235)" value="7" />
        <color-checkbox color="rgb(114, 46, 209)" value="8" />
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
          <a-switch :checked="multipage" slot="actions" size="small" @change="setMultipage" />
        </a-list-item>
      </a-list>
    </setting-item>
    <a-divider />
    <a-button id="copyBtn" data-clipboard-text="Sorry, you copy nothing O(∩_∩)O~" @click="copyCode" style="width: 100%" icon="copy" >拷贝代码</a-button>
  </a-layout-sider>
</template>

<script>
import SettingItem from './SettingItem'
import StyleItem from './StyleItem'
import ColorCheckbox from '../checkbox/ColorCheckbox'
import ImgCheckbox from '../checkbox/ImgCheckbox'
import Clipboard from 'clipboard'

const ColorCheckboxGroup = ColorCheckbox.Group
const ImgCheckboxGroup = ImgCheckbox.Group

export default {
  name: 'Setting',
  components: {ImgCheckboxGroup, ImgCheckbox, ColorCheckboxGroup, ColorCheckbox, StyleItem, SettingItem},
  computed: {
    multipage () {
      return this.$store.state.setting.multipage
    }
  },
  methods: {
    onColorChange (values, colors) {
      if (colors.length > 0) {
        this.$message.info(`您选择了主题色 ${colors}`)
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
    setMultipage (checked) {
      this.$store.commit('setting/setMultipage', checked)
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
  }
</style>
