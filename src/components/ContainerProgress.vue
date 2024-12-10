<template>
    <el-progress
        :text-inside="true"
        :stroke-width="17"
        :percentage="50"
        :color="colorObject"
        status="exception"
      >
        <span>2309/4131</span>
      </el-progress>
  </template>
  
  <script>
  import { computed, ref } from 'vue'
  export default {
    props:{
        type: String,
    },
    setup(props) {
      const percentage = ref(20);
  
      // 定义颜色对象
      const colorObject = computed(()=>{
        if(props.type === "大型") {
            return '#409EFF';
        } else if(props.type === "中型") {
            return '#41d282';
        } else {
            return '#36cfc9';
        }
      })
  
      return {
        percentage,
        colorObject,
      };
    },
  };
  </script>