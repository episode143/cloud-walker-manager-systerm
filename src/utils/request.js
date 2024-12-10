// utils/request.js
import axios from 'axios';
import { base } from '../api/path';

const instance = axios.create({
  baseURL: base.baseUrl, // 使用从 path.js 导入的 baseUrl
  timeout: 10000, // 增加超时时间到 10 秒
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data; // 返回响应数据
  },
  error => {
    if (error.response) {
      console.error('请求失败', error.response.data);
      if (error.response.status === 401) {
        sessionStorage.removeItem('token');
        window.location.href = '/login';
      }
    } else {
      console.error('请求失败', error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;