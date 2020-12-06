import {isDef, isRegExp, remove} from '@/utils/util'

const patternTypes = [String, RegExp, Array]

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    if (pattern.indexOf(name) > -1) {
      return true
    } else {
      for (let item of pattern) {
        if (isRegExp(item) && item.test(name)) {
          return true
        }
      }
      return false
    }
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function getComponentKey (vnode) {
  const {componentOptions, key} = vnode
  return key == null
    ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
    : key + componentOptions.Ctor.cid
}

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      if (isDef(c) && (isDef(c.componentOptions) || c.isAsyncPlaceholder)) {
        return c
      }
    }
  }
}

function pruneCache (keepAliveInstance, filter) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const cachedNode = cache[key]
    if (cachedNode) {
      const name = getComponentName(cachedNode.componentOptions)
      const componentKey = getComponentKey(cachedNode)
      if (name && !filter(name, componentKey)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

function pruneCacheEntry2(cache, key, keys) {
  const cached = cache[key]
  if (cached) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

function pruneCacheEntry (cache, key, keys, current) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

export default {
  name: 'AKeepAlive',
  abstract: true,
  model: {
    prop: 'clearCaches',
    event: 'clear',
  },
  props: {
    include: patternTypes,
    exclude: patternTypes,
    excludeKeys: patternTypes,
    max: [String, Number],
    clearCaches: Array
  },
  watch: {
    clearCaches: function(val) {
      if (val && val.length > 0) {
        const {cache, keys} = this
        val.forEach(key => {
          pruneCacheEntry2(cache, key, keys)
        })
        this.$emit('clear', [])
      }
    }
  },

  created() {
    this.cache = Object.create(null)
    this.keys = []
  },

  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    this.$watch('include', val => {
      pruneCache(this, (name) => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, (name) => !matches(val, name))
    })
    this.$watch('excludeKeys', val => {
      pruneCache(this, (name, key) => !matches(val, key))
    })
  },

  render () {
    const slot = this.$slots.default
    const vnode = getFirstComponentChild(slot)
    const componentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      const name = getComponentName(componentOptions)
      const componentKey = getComponentKey(vnode)
      const { include, exclude, excludeKeys } = this
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name)) ||
        (excludeKeys && componentKey && matches(excludeKeys, componentKey))
      ) {
        return vnode
      }

      const { cache, keys } = this
      const key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key + componentOptions.Ctor.cid
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key)
      } else {
        cache[key] = vnode
        keys.push(key)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }

      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}
