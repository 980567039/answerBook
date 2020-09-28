import Axios from 'axios';

// 定义错误状态提示
const getErrorMessage = status => {
  if (status < 500 && status >= 400) {
    switch (status) {
      case 408:
        return {
          success: false,
          message: '请求超时!'
        };
      case 404:
        return {
          success: false,
          message: '无此接口路径！'
        };
      case 403:
        return {
          success: false,
          message: '访问无权限的接口!'
        };
      case 400:
        return {
          success: false,
          message: '参数错误!'
        };
      default:
        return {
          success: false,
          message: '客户端异常!'
        };
    }
  } else if (status < 600 && status >= 500) {
    let result = {};
    if (status === 500) {
      // Router.push('/error500');
    } else {
      result = {
        success: false,
        message: '服务端异常!'
      };
    }
    return result;
  }
  return {
    success: true,
    message: ''
  };
};
const axios = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 100000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json;charset=utf-8',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    sessionKey: localStorage.getItem('token')
  }
});

axios.interceptors.request.use( config => {
    // 处理ie导致视图不更新
    if (config.method === 'post') {            
      config.data = {                
        ...config.data,                
        t: Date.parse(new Date()) / 1000           
      }       
    } else if (config.method === 'get') {          
      config.params = {               
          t: Date.parse(new Date()) / 1000,               
        ...config.params            
      }       
    }
    return config
  }
);

axios.interceptors.response.use(
  res => {
    //debugger
    if (res.data.code === 0) {
      if (!res.data.data || !res.list) {
        console.log('暂无数据')
      }
    } else {
      // throw new Error(res.data.msg);
    }
    return res.data || res;
  },
  error => {
    if (error && error.response) {
      const statusMsg = getErrorMessage(Number(error.response.status));
      if (!statusMsg.success) {
        console.log(statusMsg.message);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
