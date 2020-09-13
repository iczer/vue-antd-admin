import config from '@/config'
import {ADMIN} from '@/config/default'
import {formatFullPath} from '@/utils/i18n'
import {filterMenu} from '@/utils/authority-utils'

export default {
  namespaced: true,
  state: {
    isMobile: false,
    animates: ADMIN.animates,
    palettes: ADMIN.palettes,
    pageMinHeight: 0,
    menuData: [],
    activatedFirst: undefined,
    ...config,
  },
  getters: {
    menuData(state, getters, rootState) {
      if (state.filterMenu) {
        const {permissions, roles} = rootState.account
        filterMenu(state.menuData, permissions, roles)
      }
      return state.menuData
    },
    firstMenu(state) {
      const {menuData} = state
      if (!menuData[0].fullPath) {
        formatFullPath(menuData)
      }
      return menuData.map(item => {
        const menuItem = {...item}
        delete menuItem.children
        return menuItem
      })
    },
    subMenu(state) {
      const {menuData, activatedFirst} = state
      if (!menuData[0].fullPath) {
        formatFullPath(menuData)
      }
      const current = menuData.find(menu => menu.fullPath === activatedFirst)
      return current && current.children ? current.children : []
    }
  },
  mutations: {
    setDevice (state, isMobile) {
      state.isMobile = isMobile
    },
    setTheme (state, theme) {
      state.theme = theme
    },
    setLayout (state, layout) {
      state.layout = layout
    },
    setMultiPage (state, multiPage) {
      state.multiPage = multiPage
    },
    setAnimate (state, animate) {
      state.animate = animate
    },
    setWeekMode(state, weekMode) {
      state.weekMode = weekMode
    },
    setFixedHeader(state, fixedHeader) {
      state.fixedHeader = fixedHeader
    },
    setFixedSideBar(state, fixedSideBar) {
      state.fixedSideBar = fixedSideBar
    },
    setLang(state, lang) {
      state.lang = lang
    },
    setHideSetting(state, hideSetting) {
      state.hideSetting = hideSetting
    },
    correctPageMinHeight(state, minHeight) {
      state.pageMinHeight += minHeight
    },
    setMenuData(state, menuData) {
      state.menuData = menuData
    },
    setAsyncRoutes(state, asyncRoutes) {
      state.asyncRoutes = asyncRoutes
    },
    setPageWidth(state, pageWidth) {
      state.pageWidth = pageWidth
    },
    setActivatedFirst(state, activatedFirst) {
      state.activatedFirst = activatedFirst
    }
  },
  actions: {
	loadLocalSetting({commit}) {
      const localSetting = localStorage.getItem("localSetting")
      if (localSetting !== '' && localSetting != null) {
		let setting = {}
		try {
          setting = JSON.parse(localSetting)
		} catch ( e ) {
          console.log('json error')
          return false
		}
		for (let key in setting) {
          switch (key) {
			case 'theme' : commit('setTheme', setting.theme); break;
			case 'layout': commit('setLayout', setting.layout); break;
			case 'multiPage': commit('setMultiPage', setting.multiPage); break;
			case 'weekMode': commit('setWeekMode', setting.weekMode); break;
			case 'fixedHeader': commit('setFixedHeader', setting.fixedHeader); break;
			case 'fixedSideBar': commit('setFixedSideBar', setting.fixedSideBar); break;
			case 'pageWidth': commit('setPageWidth', setting.pageWidth); break;
			// case 'hideSetting': commit('setHideSetting', setting.hideSetting); break;
			case 'animate' : commit('setAnimate', setting.animate); break;
          }
		}
      }  
	},
    //初始化配置
    initSetting({commit}) {
		commit('setTheme', config.theme); 
		commit('setLayout', config.layout); 
		commit('setMultiPage', config.multiPage);
		commit('setWeekMode', config.weekMode);
		commit('setFixedHeader', config.fixedHeader);
		commit('setFixedSideBar', config.fixedSideBar);
		commit('setPageWidth', config.pageWidth);
		commit('setAnimate', config.animate)
	}
  }
}

