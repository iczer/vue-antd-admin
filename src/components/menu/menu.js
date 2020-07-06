/**
 * 该插件可根据菜单配置自动生成 ANTD menu组件
 * menuOptions示例：
 * [
 *  {
 *    name: '菜单名称',
 *    path: '菜单路由',
 *    meta: {
 *      icon: '菜单图标',
 *      invisible: 'boolean, 是否不可见, 默认 false',
 *    },
 *    children: [子菜单配置]
 *  },
 *  {
 *    name: '菜单名称',
 *    path: '菜单路由',
 *    meta: {
 *      icon: '菜单图标',
 *      invisible: 'boolean, 是否不可见, 默认 false',
 *    },
 *    children: [子菜单配置]
 *  }
 * ]
 *
 * i18n: 国际化配置。组件默认会根据 options route配置的 path 和 name 生成英文以及中文的国际化配置，如需自定义或增加其他语言，配置
 * 此项即可。如：
 * i18n: {
 *   CN: {dashboard: {name: '监控中心'}}
 *   HK: {dashboard: {name: '監控中心'}}
 * }
 **/
import Menu from 'ant-design-vue/es/menu'
import Icon from 'ant-design-vue/es/icon'
import '@/utils/Objects'

const {Item, SubMenu} = Menu

export default {
  name: 'IMenu',
  props: {
    options: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    i18n: Object
  },
  data () {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: []
    }
  },
  computed: {
    rootSubmenuKeys: (vm) => {
      let keys = []
      vm.options.forEach(item => {
        keys.push(item.path)
      })
      return keys
    },
    menuTheme() {
      return this.theme == 'light' ? this.theme : 'dark'
    }
  },
  beforeMount() {
    let CN = this.generateI18n(new Object(), this.options, 'name')
    let US = this.generateI18n(new Object(), this.options, 'path')
    this.$i18n.setLocaleMessage('CN', CN)
    this.$i18n.setLocaleMessage('US', US)
    if(this.i18n) {
      Object.keys(this.i18n).forEach(key => {
        this.$i18n.mergeLocaleMessage(key, this.i18n[key])
      })
    }
    this.$emit('i18nComplete', this.$i18n._getMessages())
  },
  created () {
    this.updateMenu()
    this.formatOptions(this.options, '')
  },
  watch: {
    collapsed (val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys
        this.openKeys = []
      } else {
        this.openKeys = this.cachedOpenKeys
      }
    },
    '$route': function () {
      this.updateMenu()
    }
  },
  methods: {
    renderIcon: function (h, icon) {
      return !icon || icon == 'none' ? null : h(Icon, {props: {type:  icon}})
    },
    renderMenuItem: function (h, menu) {
      return h(
        Item, {key: menu.fullPath},
        [
          h('router-link', {props: {to: menu.fullPath}},
            [
              this.renderIcon(h, menu.meta ? menu.meta.icon : 'none'),
              h('span', [this.$t(menu.fullPath.substring(1).replace(new RegExp('/', 'g'), '.') + '.name')])
            ]
          )
        ]
      )
    },
    renderSubMenu: function (h, menu) {
      let this_ = this
      let subItem = [h('span', {slot: 'title'},
        [
          this.renderIcon(h, menu.meta ? menu.meta.icon : 'none'),
          h('span', [this.$t(menu.fullPath.substring(1).replace(new RegExp('/', 'g'), '.') + '.name')])
        ]
      )]
      let itemArr = []
      menu.children.forEach(function (item) {
        itemArr.push(this_.renderItem(h, item))
      })
      return h(SubMenu, {key: menu.fullPath},
        subItem.concat(itemArr)
      )
    },
    renderItem: function (h, menu) {
      const meta = menu.meta
      if (!meta || !meta.invisible) {
        let renderChildren = false
        const children = menu.children
        if (children != undefined) {
          for (let i = 0; i < children.length; i++) {
            const childMeta = children[i].meta
            if (!childMeta || !childMeta.invisible) {
              renderChildren = true
              break
            }
          }
        }
        return (menu.children && renderChildren) ? this.renderSubMenu(h, menu) : this.renderMenuItem(h, menu)
      }
    },
    renderMenu: function (h, menuTree) {
      let this_ = this
      let menuArr = []
      menuTree.forEach(function (menu, i) {
        menuArr.push(this_.renderItem(h, menu, '0', i))
      })
      return menuArr
    },
    formatOptions(options, parentPath) {
      let this_ = this
      options.forEach(route => {
        let isFullPath = route.path.substring(0, 1) == '/'
        route.fullPath = isFullPath ? route.path : parentPath + '/' + route.path
        if (route.children) {
          this_.formatOptions(route.children, route.fullPath)
        }
      })
    },
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    updateMenu () {
      let routes = this.$route.matched.concat()
      const route = routes.pop()
      this.selectedKeys = [this.getSelectedKey(route)]
      let openKeys = []
      routes.forEach((item) => {
        openKeys.push(item.path)
      })
      this.collapsed || this.mode === 'horizontal' ? this.cachedOpenKeys = openKeys : this.openKeys = openKeys
    },
    getSelectedKey (route) {
      if (route.meta.invisible && route.parent) {
        return this.getSelectedKey(route.parent)
      }
      return route.path
    },
    generateI18n(lang, options, valueKey) {
      options.forEach(menu => {
        let keys = menu.fullPath.substring(1).split('/').concat('name')
        lang.assignProps(keys, menu[valueKey])
        if (menu.children) {
          this.generateI18n(lang, menu.children, valueKey)
        }
      })
      return lang
    }
  },
  render (h) {
    return h(
      Menu,
      {
        props: {
          theme: this.menuTheme,
          mode: this.$props.mode,
          openKeys: this.openKeys,
          selectedKeys: this.selectedKeys
        },
        on: {
          openChange: this.onOpenChange,
          select: (obj) => {
            this.selectedKeys = obj.selectedKeys
            this.$emit('select', obj)
          }
        }
      }, this.renderMenu(h, this.options)
    )
  }
}
