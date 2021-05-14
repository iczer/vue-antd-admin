const Cookies = require('js-cookie')

const prefix = process.env.VUE_APP_NAME || 'vue-antd-admin'

// 动态获取cookie参数
const getCookieAttr = () => {
  return {
    path: process.env.BASE_URL || '/'
  }
}

const ck = (key) => {
    return prefix + "." + key;
}

// 设置cookie值
const setCookie = (key, value, options) => {
    if (!key) {
        return;
    }
    const cookieAttr = getCookieAttr()
    if (options && typeof options === 'object') {
        for (const key in options) {
            cookieAttr[key] = options[key]
        }
    }
    Cookies.set(ck(key), value, cookieAttr);
}

// 获取cookie值
const getCookie = (key) => {
    if (!key) {
        return;
    }
    return Cookies.get(ck(key));
}

// 删除cookie值
const removeCookie = (key) => {
    if (!key) {
        return;
    }
    return Cookies.remove(ck(key));
}

// 设置sessionStorage值
const setSessionStore = (key, value) => {
    if (!key) {
        return;
    }
    sessionStorage.setItem(ck(key), value);
}

// 获取sessionStorage值
const getSessionStore = (key) => {
    if (!key) {
        return;
    }
    return sessionStorage.getItem(ck(key));
}

// 删除sessionStorage值
const removeSessionStore = (key) => {
    if (!key) {
        return;
    }
    return sessionStorage.removeItem(ck(key));
}


// 设置localStorage值
const setLocalStorage = (key, value) => {
    if (!key) {
        return;
    }
    localStorage.setItem(ck(key), value);
}

// 获取localStorage值
const getLocalStorage = (key) => {
    if (!key) {
        return;
    }
    return localStorage.getItem(ck(key));
}

// 删除localStorage值
const removeLocalStorage = (key) => {
    if (!key) {
        return;
    }
    return localStorage.removeItem(ck(key));
}

module.exports = {
    setCookie,
    getCookie,
    removeCookie,
    setSessionStore,
    getSessionStore,
    removeSessionStore,
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage
  }