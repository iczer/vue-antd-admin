<template>
  <div :class="['tabs-head', layout, pageWidth]">
    <a-tabs
        type="editable-card"
        :class="['tabs-container', layout, pageWidth, {'affixed' : affixed, 'fixed-header' : fixedHeader, 'collapsed' : adminLayout.collapsed}]"
        :active-key="active"
        :hide-add="true"
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
        <div slot="tab" class="tab" @contextmenu="e => onContextmenu(page.fullPath, e)">
          <a-icon @click="onRefresh(page)" :class="['icon-sync', {'hide': page.fullPath !== active && !page.loading}]" :type="page.loading ? 'loading' : 'sync'" />
          <div class="title" @click="onTabClick(page.fullPath)" >{{pageName(page)}}</div>
          <a-icon v-if="!page.unclose" @click="onClose(page.fullPath)" class="icon-close" type="close"/>
        </div>
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
    created() {
      this.affixed = this.fixedTabs
    },
    computed: {
      ...mapState('setting', ['layout', 'pageWidth', 'fixedHeader', 'fixedTabs', 'customTitles']),
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
      onTabClick(key) {
        if (this.active !== key) {
          this.$emit('change', key)
        }
      },
      onClose(key) {
        this.$emit('close', key)
      },
      onRefresh(page) {
        this.$emit('refresh', page.fullPath, page)
      },
      onContextmenu(pageKey, e) {
        this.$emit('contextmenu', pageKey, e)
      },
      pageName(page) {
        const pagePath = page.fullPath.split('?')[0]
        const custom = this.customTitles.find(item => item.path === pagePath)
        return (custom && custom.title) || page.title || this.$t(getI18nKey(page.keyPath))
      }
    }
  }
</script>

<style scoped lang="less">
  .tab{
    margin: 0 -16px;
    padding: 0 16px;
    font-size: 14px;
    user-select: none;
    transition: all 0.2s;
    .title{
      display: inline-block;
      height: 100%;
    }
    .icon-close{
      font-size: 12px;
      margin-left: 6px;
      margin-right: -4px !important;
      color: @text-color-second;
      &:hover{
        color: @text-color;
      }
    }
    .icon-sync{
      margin-left: -4px;
      color: @primary-4;
      transition: all 0.3s ease-in-out;
      &:hover{
        color: @primary-color;
      }
      font-size: 14px;
      &.hide{
        font-size: 0;
      }
    }
  }
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