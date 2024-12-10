<template>
  <div class="chart-container">
    <e-charts class="chart" :option="option" :settings="{ renderer: 'svg' }"/>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import * as echarts from "echarts"; // 确保导入 echarts
import ECharts from "vue-echarts"; // 引入 vue-echarts 组件
import api from "../api/index"

export default {
  name: "YearUserGrowthChart",
  components: {
    ECharts, // 注册 ECharts 组件
  },
  setup() {
    const option = ref({
      color: ["#80FFA5"],
      title: {
        text: "用户增长",
        left: '12px',
        top: '5px',
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data:[],
          // data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        },
      ],
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} 人",
        },
        axisPointer: {
          snap: true,
        },
      },
      series: [
        {
          name: "当月用户增长数量",
          type: "line",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(128, 255, 165)",
              },
              {
                offset: 1,
                color: "rgb(1, 191, 236)",
              },
            ]),
          },
          data:[],
          // data: [140, 232, 101, 264, 90, 340, 250, 140, 232, 101, 264, 90],
        },
      ],
    });
    onMounted(() => {
      getYearUserGrowthStatus();
    });
    const getYearUserGrowthStatus = async()=>{
      try{
        const response = await api.getYearUserGrowthStatus();
        if(response.code === 13031){
          option.value.xAxis[0].data = response.data.map(item=> item.name);
          option.value.series[0].data = response.data.map(item=> item.value);
        } else {
          console.error('获取用户近12月增长情况信息请求失败', response.msg);
        }
      }catch(error){
        console.error('获取用户近12月增长情况信息请求失败', error);
      }
    }
    return {
      option,
    };
  },
};
</script>

<style scoped>
.chart-container {
  width: 1189px;
  height: 450px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
