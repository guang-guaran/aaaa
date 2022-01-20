// 初始化根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3007'
// 声明layer方法
let layer = layui.layer
// 声明form方法
let form = layui.form

// 设置请求拦截器 解决获取用户信息每次都需要设置请求头 
axios.interceptors.request.use(function (config) {
  // console.log(config)
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  return Promise.reject(error)
})

// 设置响应拦截器 解决只要身份认证失败 就强行跳转到登录页面 , 并且销毁token令牌
axios.interceptors.response.use(function (response) {
  // console.log(response)
  if (response.data.message === '身份认证失败！') {
    location.href = '/login.html'
    // 并且销毁token令牌
    localStorage.removeItem('token')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})