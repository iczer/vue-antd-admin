import axios from 'axios'
import Cookie from 'js-cookie'
axios.defaults.timeout = 5000
axios.defaults.withCredentials= true

const cookies = Cookie.get()
Object.keys(cookies).forEach(key => {
  axios.defaults.headers.common[key] = cookies[key]
})

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
  switch (method) {
    case METHOD.GET:
      return axios.get(url, {params})
    case METHOD.POST:
      return axios.post(url, params)
    default:
      return axios.get(url, {params})
  }
}

export {
  METHOD,
  request
}
