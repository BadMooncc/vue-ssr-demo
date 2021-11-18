import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: 'https://www.fastmock.site/mock/a2df8d92827e202e2ba7b0276eb53455/ext', // api 的 base_url
  timeout: process.env.TIMEOUT // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code && res.code !== 200) {
      // 报错信息应由请求最后的catch统一处理,默认情况可用全局通用的handleError处理
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    Promise.reject(error)
  }
)
export default service
