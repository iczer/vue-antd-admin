<template>
  <a-layout-sider class="sider" width="273">
    <setting-item title="整体风格设置">
      <div class="theme">
        <style-item img="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg" :selected="true"/>
        <style-item img="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg" :selected="false"/>
      </div>
    </setting-item>
    <setting-item title="主题色">
      <div>
        <theme-color color="rgb(245, 34, 45)" />
        <theme-color color="rgb(250, 84, 28)" />
        <theme-color color="rgb(250, 173, 20)" />
        <theme-color color="rgb(19, 194, 194)" />
        <theme-color color="rgb(82, 196, 26)" />
        <theme-color color="rgb(24, 144, 255)" />
        <theme-color color="rgb(47, 84, 235)" />
        <theme-color color="rgb(114, 46, 209)" :selected="true" />
      </div>
    </setting-item>
  </a-layout-sider>
</template>

<script>
import ALayoutSider from 'ant-design-vue/es/layout/Sider'
import AIcon from 'ant-design-vue/es/icon/icon'
import SettingItem from './SettingItem'
import StyleItem from './StyleItem'
import ADivider from 'ant-design-vue/es/divider/index'
import ThemeColor from './ThemeColor'
export default {
  name: 'Setting',
  components: {ThemeColor, ADivider, StyleItem, SettingItem, AIcon, ALayoutSider}
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
    .theme{
      display: flex;
    }
  }
</style>
