<template>
  <div :class="['tabs-head', layout, pageWidth]">
    <a-tabs
        type="editable-card"
        :class="['tabs-container', layout, pageWidth, {'affixed' : affixed, 'fixed-header' : fixedHeader, 'collapsed' : adminLayout.collapsed}]"
        :active-key="active"
        :hide-add="true"
        @change="onChange"
        @edit="onEdit"
        @contextmenu="onContextmenu"
    >
      <a-tooltip placement="left" :title="lockTitle" slot="tabBarExtraContent">
        <a-icon
            theme="filled"
            @click="onLockClick"
            class="header-lock"
            :type="fixedTabs ? 'lock' : 'unlock'"
        />
      </a-tooltip>
      <a-tab-pane v-for="page in pageList" :key="page.fullPath">
        <span slot="tab" :pagekey="page.fullPath">{{pageName(page)}}</span>
      </a-tab-pane>
    </a-tabs>
    <div v-if="affixed" class="virtual-tabs"></div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {getI18nKey} from '@/utils/routerUtil'

  export default {
    name: 'TabsHead',
    i18n: {
      messages: {
        CN: {
          lock: '点击锁定页签头',
          unlock: '点击解除锁定',
        },
        HK: {
          lock: '點擊鎖定頁簽頭',
          unlock: '點擊解除鎖定',
        },
        US: {
          lock: 'click to lock the tabs head',
          unlock: 'click to unlock',
        }
      }
    },
    props: {
      pageList: Array,
      active: String,
      fixed: Boolean
    },
    data() {
      return {
        affixed: false,
      }
    },
    inject:['adminLayout'],
    watch: {
      'adminLayout.collapsed': (val) => {
        console.log(val)
      }
    },
    created() {
      this.affixed = this.fixedTabs
    },
    computed: {
      ...mapState('setting', ['layout', 'pageWidth', 'fixedHeader', 'fixedTabs']),
      lockTitle() {
        return this.$t(this.fixedTabs ? 'unlock' : 'lock')
      }
    },
    methods: {
      ...mapMutations('setting', ['setFixedTabs']),
      onLockClick() {
        this.setFixedTabs(!this.fixedTabs)
        if (this.fixedTabs) {
          setTimeout(() => {
            this.affixed = true
          }, 200)
        } else {
          this.affixed = false
        }
      },
      onChange(key) {
        this.$emit('change', key)
      },
      onEdit(key, action) {
        if (action === 'remove') {
          this.$emit('close', key)
        }
      },
      onContextmenu(e) {
        this.$emit('contextmenu', e)
      },
      pageName(page) {
        return this.$t(getI18nKey(page.keyPath))
      }
    }
  }
</script>

<style scoped lang="less">
  .tabs-head{
    margin: 0 auto;
    &.head.fixed{
      width: 1400px;
    }
  }
  .tabs-container{
    margin: -16px auto 8px;
    transition: top,left 0.2s;
    .header-lock{
      font-size: 18px;
      cursor: pointer;
      color: @primary-3;
      &:hover{
        color: @primary-color;
      }
    }
    &.affixed{
      margin: 0 auto;
      top: 0px;
      padding: 8px 24px 0;
      position: fixed;
      height: 48px;
      z-index: 1;
      background-color: @layout-body-background;
      &.side,&.mix{
        right: 0;
        left: 256px;
        &.collapsed{
          left: 80px;
        }
      }
      &.head{
        width: inherit;
        padding: 8px 0 0;
        &.fluid{
          left: 0;
          right: 0;
          padding: 8px 24px 0;
        }
      }
      &.fixed-header{
        top: 64px;
      }
    }
  }
  .virtual-tabs{
    height: 48px;
  }
</style>