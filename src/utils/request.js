import Vue from 'vue'
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
//import store from '@/store' --zpm20230226
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
const vue = new Vue();
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {--zpm20230226
    //config.headers["token"] = store.state.login.token;
    config.headers["token"] = 'xiao';
    if (config.baseURL === null || config.baseURL === undefined) {
      config.baseURL = process.env.VUE_APP_BASE_API;
    }
    return vue.$ipMapping.mappingByPromise(config.baseURL).then(data => {
      config.baseURL = data;
      console.log("api:" + config.baseURL + config.url);
    //   if (window.loadingCount === 0) {
    //     window.loadingInstance = Loading.service({
    //       fullscreen: true,
    //       text: "加载中...",
    //       spinner: "el-icon-loading",
    //       background: "rgba(255, 255, 255, 0.7)"
    //     });
    //   }
    //   window.loadingCount++;
      return config;
    });
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code == 404) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) { --zpm20230226
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }--zpm20230226
      //return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
