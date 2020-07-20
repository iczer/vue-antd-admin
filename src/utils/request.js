import axios from 'axios'
import Cookie from 'js-cookie'
axios.defaults.timeout = 5000
axios.defaults.withCredentials= true

// const cookies = Cookie.get()
// Object.keys(cookies).forEach(key => {
//   axios.defaults.headers.common[key] = cookies[key]
// })

const METHOD = {
  GET: 'get',
  POST: 'post'
}

/**
 * axios请求
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 * @returns {Promise<AxiosResponse<T>>}
 */
async function request(url, method, params) {
  // header 加入 token
  const token = Cookie.get('Authorization')
  const config = token ? {headers: {Authorization: token}} : {}
  switch (method) {
    case METHOD.GET:
      return axios.get(url, {params, ...config})
    case METHOD.POST:
      return axios.post(url, params, config)
    default:
      return axios.get(url, {params, ...config})
  }
}

export {
  METHOD,
  request
}
