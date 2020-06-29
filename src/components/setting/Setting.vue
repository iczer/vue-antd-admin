<template>
  <a-layout-sider class="side" width="300">
    <setting-item :title="$t('theme.title')">
      <img-checkbox-group @change="values => setTheme(values[0])">
        <img-checkbox :title="$t('theme.dark')" img="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg" :checked="true" value="dark"/>
        <img-checkbox :title="$t('theme.light')" img="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg" value="light"/>
      </img-checkbox-group>
    </setting-item>
    <setting-item :title="$t('theme.color')">
      <color-checkbox-group @change="onColorChange" :defaultValues="themeColorIndex" :multiple="false">
        <color-checkbox v-for="(color, index) in colors" :key="index" :color="color" :value="index" />
      </color-checkbox-group>
    </setting-item>
    <a-divider/>
    <setting-item :title="$t('navigate.title')">
      <img-checkbox-group @change="values => setLayout(values[0])">
        <img-checkbox :title="$t('navigate.side')" img="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg" :checked="true" value="side"/>
        <img-checkbox :title="$t('navigate.head')" img="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg" value="head"/>
      </img-checkbox-group>
    </setting-item>
    <setting-item>
      <a-list :split="false">
        <a-list-item>
          {{$t('navigate.content.title')}}
          <a-select size="small" defaultValue="1" slot="actions" style="width: 80px">
            <a-select-option value="1">{{$t('navigate.content.fluid')}}</a-select-option>
            <a-select-option value="2">{{$t('navigate.content.fixed')}}</a-select-option>
          </a-select>
        </a-list-item>
        <a-list-item>
          {{$t('navigate.fixedHeader')}}
          <a-switch :checked="fixedHeader" slot="actions" size="small" @change="setFixedHeader" />
        </a-list-item>
        <a-list-item>
          {{$t('navigate.fixedSideBar')}}
          <a-switch :checked="fixedSideBar" slot="actions" size="small" @change="setFixedSideBar" />
        </a-list-item>
      </a-list>
    </setting-item>
    <a-divider />
    <setting-item :title="$t('other.title')">
      <a-list :split="false">
        <a-list-item>
          {{$t('other.weekMode')}}
          <a-switch :checked="weekMode" slot="actions" size="small" @change="setWeekMode" />
        </a-list-item>
        <a-list-item>
          {{$t('other.multiPages')}}
          <a-switch :checked="multiPage" slot="actions" size="small" @change="setMultiPage" />
        </a-list-item>
      </a-list>
    </setting-item>
    <a-divider />
    <setting-item :title="$t('animate.title')">
      <a-list :split="false">
        <a-list-item>
          {{$t('animate.effect')}}
          <a-select
            v-model="animate"
            @change="val => setAnimate(val)"
            class="select-item" size="small" slot="actions"
          >
            <a-select-option :key="index" :value="item.name" v-for="(item, index) in animates">{{item.alias}}</a-select-option>
          </a-select>
        </a-list-item>
        <a-list-item>
          {{$t('animate.direction')}}
          <a-select
            v-model="direction"
            @change="val => setAnimate(this.animate, val)"
            class="select-item" size="small" slot="actions"
          >
            <a-select-option :key="index" :value="item" v-for="(item, index) in directions">{{item}}</a-select-option>
          </a-select>
        </a-list-item>
      </a-list>
    </setting-item>
    <a-button id="copyBtn" data-clipboard-text="Sorry, you have copied nothing O(∩_∩)O~" @click="copyCode" style="width: 100%" icon="copy" >{{$t('copy')}}</a-button>
  </a-layout-sider>
</template>

<script>
import SettingItem from './SettingItem'
import ColorCheckbox from '../checkbox/ColorCheckbox'
import ImgCheckbox from '../checkbox/ImgCheckbox'
import Clipboard from 'clipboard'
import themeUtil from '../../utils/themeUtil'
import { mapState, mapMutations } from 'vuex'

const ColorCheckboxGroup = ColorCheckbox.Group
const ImgCheckboxGroup = ImgCheckbox.Group
const colors = ['#f5222d', '#fa541c', '#faad14', '#13c2c2', '#52c41a', '#1890ff', '#2f54eb', '#722ed1']
export default {
  name: 'Setting',
  i18n: require('./i18n'),
  components: {ImgCheckboxGroup, ImgCheckbox, ColorCheckboxGroup, ColorCheckbox, SettingItem},
  data() {
    return {
      animate: this.$store.state.setting.animate.name,
      direction: this.$store.state.setting.animate.direction,
      themeColorIndex: [colors.indexOf(this.$store.state.setting.themeColor)],
      colors,
    }
  },
  computed: {
    directions() {
      return this.animates.find(item => item.name == this.animate).directions
    },
    ...mapState('setting', ['animates', 'multiPage', 'weekMode', 'fixedHeader', 'fixedSideBar'])
  },
  methods: {
    onColorChange (values, colors) {
      if (colors.length > 0) {
        let closeMessage = this.$message.info(`您选择了主题色 ${colors}, 正在切换...`)
        let _this = this
        themeUtil.changeThemeColor(colors[0]).then(() => {
          _this.setThemeColor(colors[0])
          closeMessage()
        })
      }
    },
    copyCode () {
      let clipboard = new Clipboard('#copyBtn')
      const _this = this
      clipboard.on('success', function () {
        _this.$message.success(`复制成功`)
        clipboard.destroy()
      })
    },
    setAnimate(animate, direction) {
      if (direction == undefined) {
        this.direction = this.directions[0]
      }
      this.setAnimate({name: this.animate, direction: this.direction})
    },
    ...mapMutations('setting', ['setTheme', 'setThemeColor', 'setLayout', 'setMultiPage', 'setWeekMode', 'setFixedSideBar', 'setFixedHeader', 'setAnimate'])
  }
}
</script>

<style lang="less" scoped>
  .side{
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
