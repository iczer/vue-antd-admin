/**
 * 获取路由需要的权限
 * @param permissions
 * @param route
 * @returns {*}
 */
const getRoutePermission = (permissions, route) => permissions.find(item => item.id === route.meta.authority.permission)
/**
 * 获取路由需要的角色
 * @param roles
 * @param route
 * @returns {*}
 */
const getRouteRole = (roles, route) => roles.find(item => item.id === route.meta.authority.role)
/**
 * 判断是否已为方法注入权限认证
 * @param method
 * @returns {boolean}
 */
const hasInjected = (method) => method.toString().indexOf('//--auth-inject') !== -1

/**
 * 操作权限校验
 * @param authConfig
 * @param permission
 * @param role
 * @param permissions
 * @param roles
 * @returns {boolean}
 */
const auth = function(authConfig, permission, role, permissions, roles) {
  const {check, type} = authConfig
  if (check && typeof check === 'function') {
    return check.apply(this, [permission, role, permissions, roles])
  } else {
    if (type === 'permission') {
      return permission && permission.operation && permission.operation.indexOf(check) !== -1
    } else if (type === 'role') {
      return role && role.operation && role.operation.indexOf(check) !== -1
    }
  }
  return false
}

const checkInject = function (el, binding,vnode) {
  const type = binding.arg
  const check = binding.value
  const instance = vnode.context
  const $auth = instance.$auth
  if (!$auth || !$auth(check, type)) {
    addDisabled(el)
  } else {
    removeDisabled(el)
  }
}

const addDisabled = function (el) {
  if (el.tagName === 'BUTTON') {
    el.setAttribute('disabled', 'disabled')
  } else {
    el.classList.add('disabled')
  }
  el.setAttribute('title', '无此权限')
}

const removeDisabled = function (el) {
  el.classList.remove('disabled')
  el.removeAttribute('disabled')
  el.removeAttribute('title')
}

const AuthorityPlugin = {
  install(Vue) {
    Vue.directive('auth', {
      bind(el, binding,vnode) {
        checkInject(el, binding, vnode)
      },
      update(el, binding,vnode) {
        checkInject(el, binding, vnode)
      },
      unbind(el) {
        removeDisabled(el)
      }
    })
    Vue.mixin({
      beforeCreate() {
        if (this.$options.authorize) {
          const authorize = this.$options.authorize
          Object.keys(authorize).forEach(key => {
            if (this.$options.methods[key]) {
              const method = this.$options.methods[key]
              if (!hasInjected(method)) {
                let authConfig = authorize[key]
                authConfig = (typeof authConfig === 'string') ? {check: authConfig} : authConfig
                const {check, type, onFailure} = authConfig
                this.$options.methods[key] = function () {
                  //--auth-inject
                  if (this.$auth(check, type)) {
                    return method.apply(this, arguments)
                  } else {
                    if (onFailure && typeof onFailure === 'function') {
                      this[`$${check}Failure`] = onFailure
                      return this[`$${check}Failure`](check)
                    } else {
                      this.$message.error(`对不起，您没有操作权限：${check}`)
                    }
                    return 0
                  }
                }
              }
            }
          })
        }
      },
      methods: {
        /**
         * 操作权限校验
         * @param check 需要校验的操作名
         * @param type 校验类型，通过 permission 校验，还是通过 role 校验。
         * 如未设置，则自动识别，如匹配到当前路由 permission 则 type = permission，否则 type = role
         * @returns {boolean} 是否校验通过
         */
        $auth(check, type) {
          const permissions = this.$store.getters['account/permissions']
          const roles = this.$store.getters['account/roles']
          const permission = getRoutePermission(permissions, this.$route)
          const role = getRouteRole(roles, this.$route)
          if (!type) {
            type = permission ? 'permission' : 'role'
          }
          return auth.apply(this, [{check, type}, permission, role, permissions, roles])
        }
      }
    })
  }
}

export default AuthorityPlugin
