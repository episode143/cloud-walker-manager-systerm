<template>
  <div class="chart-container">
    <e-charts class="chart" :option="option" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import api from "../api/index";
export default {
  setup() {
    const xAxisData = ref(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);

    // 定义响应式的 series 数据
    const seriesData = ref([
      {
        name: "订单收入",
        type: "line",
        data: [],
        itemStyle: {
          color: "#25C94F",
        },
      },
      {
        name: "机器维护零件支出",
        type: "line",
        data: [],
        itemStyle: {
          color: "rgba(217,0,27,0.7)",
        },
      },
      {
        name: "净利润",
        type: "line",
        data: [],
        itemStyle: {
          color: "#FFBE00",
        },
      },
    ]);

    // 计算属性 option
    const option = computed(() => {
      return {
        title: {
          text: "30天内收支情况",
          left: "20px",
          top: "20px",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["订单收入", "机器维护零件支出", "净利润"],
          top: "20px",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
          top: "20px",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xAxisData.value,
        },
        yAxis: {
          type: "value",
        },
        series: seriesData.value,
      };
    });
    const getWeekFinanceChangeTrend = async () => {
      try {
        const response = await api.getWeekFinanceChangeTrend();
        console.log(response);
        if (response.code === 17031) {
          response.data.dailyIncome.forEach(item => {
            seriesData.value[0].data.push(item.amount);
            xAxisData.value.push(item.dateString);
          });
          response.data.dailyExpense.forEach(item => {
            seriesData.value[1].data.push(item.amount);
          });
          response.data.dailyProfit.forEach(item => {
            seriesData.value[2].data.push(item.amount);
          });
        } else {
          console.error("获取7天流水变化趋势数据请求失败", response.msg);
        }
      } catch (error) {
        console.error("获取7天流水变化趋势数据请求失败", error);
      }
    };
    onMounted(()=>{
      getWeekFinanceChangeTrend();
    })
    return {
      option,
    };
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 564px; /* 确保有明确的高度 */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.chart {
  width: 100%;
  height: 100%;
}
</style>
