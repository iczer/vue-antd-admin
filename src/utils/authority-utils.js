/**
 * 判断是否有路由的权限
 * @param authority 路由权限配置
 * @param permissions 用户权限集合
 * @returns {boolean|*}
 */
function hasPermission(authority, permissions) {
  let required = '*'
  if (typeof authority === 'string') {
    required = authority
  } else if (Array.isArray(authority)) {
    required = authority
  } else if (typeof authority === 'object') {
    required = authority.permission
  }
  return required === '*' || hasAnyItem(required, permissions, (r, t) => !!(r === t || r === t.id))
}

/**
 * 判断是否有路由需要的角色
 * @param authority 路由权限配置
 * @param roles 用户角色集合
 */
function hasRole(authority, roles) {
  let required = undefined
  if (typeof authority === 'object') {
    required = authority.role
  }
  return authority === '*' || hasAnyItem(required, roles, (r, t) => !!(r === t || r === t.id))
}

/**
 * 判断目标数组是否有所需元素
 * @param {String | String[]}required 所需元素，数组或单个元素
 * @param {String[]|Object[]} source 目标数组
 * @param {Function} filter 匹配条件
 * (r: String, s: String|Object) => boolean
 * @returns {boolean}
 */
function hasAnyItem(required, source, filter) {
  if (!required) {
    return false
  }
  let checkedList = Array.isArray(required) ? required : [required]
  return !!source.find(s => checkedList.find(r => filter(r, s)))
}

/**
 * 路由权限校验
 * @param route 路由
 * @param permissions 用户权限集合
 * @param roles 用户角色集合
 * @returns {boolean}
 */
function hasAuthority(route, permissions, roles) {
  const authorities = [...route.meta.pAuthorities, route.meta.authority]
  for (let authority of authorities) {
    if (!hasPermission(authority, permissions) && !hasRole(authority, roles)) {
      return false
    }
  }
  return true
}

/**
 * 根据权限配置过滤菜单数据
 * @param menuData
 * @param permissions
 * @param roles
 */
function filterMenu(menuData, permissions, roles) {
  return menuData.filter(menu => {
    if (menu.meta && menu.meta.invisible === undefined) {
      if (!hasAuthority(menu, permissions, roles)) {
        return false
      }
    }
    if (menu.children && menu.children.length > 0) {
      menu.children = filterMenu(menu.children, permissions, roles)
    }
    return true
  })
}

export {filterMenu, hasAuthority}
