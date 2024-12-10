<template>
    <el-progress type="dashboard" :percentage="percentage" :width="150" :stroke-width="12">
      <template #default="{ percentage }">
        <span style="font-size: 24px;color: #294567;">负载</span>
        <span class="percentage-value">{{ percentage }}%</span>
      </template>
    </el-progress>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { ElProgress } from 'element-plus';
  
  export default {
    components: {
      ElProgress,
    },
    setup() {
      // 定义进度条的百分比
      const percentage = ref(80);
  
      // 返回需要在模板中使用的变量
      return {
        percentage,
      };
    },
  };
  </script>
  
  <style scoped>
  .percentage-value {
    font-size: 24px;
    color: #0482FF;
    font-weight: bold;
  }
  
  .percentage-label {
    font-size: 16px;
    color: #0482FF;
  }
  </style>