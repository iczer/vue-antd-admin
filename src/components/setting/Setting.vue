<template>
  <a-layout-sider class="sider" width="273">
    <setting-item title="整体风格设置">
      <div class="flex">
        <style-item img="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg" :selected="true"/>
        <style-item img="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg" :selected="false"/>
      </div>
    </setting-item>
    <setting-item title="主题色">
      <color-check-box-group @change="onColorChange">
        <color-check-box color="rgb(245, 34, 45)" value="1" />
        <color-check-box color="rgb(250, 84, 28)" value="2" />
        <color-check-box color="rgb(250, 173, 20)" value="3" />
        <color-check-box color="rgb(19, 194, 194)" value="4" />
        <color-check-box color="rgb(82, 196, 26)" value="5" />
        <color-check-box color="rgb(24, 144, 255)" value="6" />
        <color-check-box color="rgb(47, 84, 235)" value="7" />
        <color-check-box color="rgb(114, 46, 209)" value="8" />
      </color-check-box-group>
    </setting-item>
    <a-divider/>
    <setting-item title="导航设置">
      <div class="flex">
        <style-item img="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg" :selected="true"/>
        <style-item img="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg" :selected="false"/>
      </div>
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
      </a-list>
    </setting-item>
    <a-divider />
    <a-button style="width: 100%" icon="copy">拷贝代码</a-button>
  </a-layout-sider>
</template>

<script>
import ALayoutSider from 'ant-design-vue/es/layout/Sider'
import AIcon from 'ant-design-vue/es/icon/icon'
import SettingItem from './SettingItem'
import StyleItem from './StyleItem'
import ADivider from 'ant-design-vue/es/divider/index'
import ThemeColor from './ThemeColor'
import AList from 'ant-design-vue/es/list/index'
import AListItem from 'ant-design-vue/es/list/Item'
import AButton from 'ant-design-vue/es/button/button'
import ASwitch from 'ant-design-vue/es/switch/index'
import ASelect from 'ant-design-vue/es/select/index'
import ColorCheckBox from '../check/ColorCheckBox'

const ASelectOption = ASelect.Option
const ColorCheckBoxGroup = ColorCheckBox.Group

export default {
  name: 'Setting',
  components: {
    ColorCheckBoxGroup,
    ColorCheckBox,
    ASelectOption,
    ASelect,
    ASwitch,
    AButton,
    AListItem,
    AList,
    ThemeColor,
    ADivider,
    StyleItem,
    SettingItem,
    AIcon,
    ALayoutSider},
  methods: {
    onColorChange (values) {
      console.log(values)
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
