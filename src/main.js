import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as echarts from 'echarts';
import ECharts from 'vue-echarts';

// 导入样式
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/dataZoom';
// 在线链接使用阿里图标
import "./assets/icons/icons.css"; 
// import "./styles/blockstyles.css"; // 自己设计的块状图标

//导入本地的阿里巴巴矢量库图案
import "@/assets/aliconfont/confirm/iconfont.css"

// 导入字体
import "./assets/font/font.css"

//导入element-plus中的提示内容
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-notification.css";
import "element-plus/theme-chalk/el-message-box.css";
const app = createApp(App);

// 全局注册 ECharts 组件
app.component('ECharts', ECharts);

// 设置全局的 ECharts 配置
app.config.globalProperties.$echarts = {
  init: (dom, theme, opts = {}) => {
    // 默认设置 devicePixelRatio 和 renderer
    const options = {
      devicePixelRatio: window.devicePixelRatio || 1,
      renderer: 'svg', // 使用 SVG 渲染
      ...opts
    };
    return echarts.init(dom, theme, options);
  }
};

// 注册 Vuex 和 Vue Router
app.use(store);
app.use(router);

// 挂载应用 解决ResizeObserver
app.mount('#app');

const debounce = (fn, delay) => {
  let timer
   return (...args) => {
     if (timer) {
       clearTimeout(timer)
     }
     timer = setTimeout(() => {
       fn(...args)
     }, delay)
   }
}
  
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
   constructor(callback) {
     callback = debounce(callback, 200);
     super(callback);
   }
}