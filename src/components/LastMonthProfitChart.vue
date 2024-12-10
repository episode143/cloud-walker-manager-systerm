<template>
  <div class="chart-container">
    <e-charts class="chart" :option="option" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "../api/index";
export default {
  setup() {
    // 定义响应式的 series 数据
    const seriesData = ref([
      {
        data: [],
        type: "line",
        lineStyle: {
          color: "rgb(121.3, 187.1, 255)",
          width: 3,
        },
        itemStyle: {
          color: "rgb(51.2, 126.4, 204)",
        },
        symbolSize: 8,
      },
    ]);

    // 计算总利润
    const totalProfit = ref(0);

    // 定义 option 为 ref 类型
    const option = ref({
      title: {
        text: "前30天营收",
        subtext: `营收总额: ￥${totalProfit.value} rmb`,
        left: "10px", // 靠左对齐
        top: "6px",
        textStyle: {
          fontSize: 18,
          color: "#333",
        },
        subtextStyle: {
          fontSize: 14,
          color: "#666",
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line", // 使用直线指针
        },
      },
      grid: {
        containLabel: true,
        top: "20%", // 调整顶部间距以容纳标题和副标题
        left: "5%",
        right: "5%",
        bottom: "10%",
      },
      xAxis: {
        type: "category",
        data: [],
        splitLine: {
          show: false, // 关闭 x 轴的网格线
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed", // 将 y 轴的网格线设为虚线
            color: "#ddd",
          },
        },
      },
      series: seriesData.value,
    });
    onMounted(() => {
      getFirst30DaysProfit();
    });
    const getFirst30DaysProfit = async () => {
      try {
        const response = await api.getFirst30DaysProfit();
        if (response.code === 12051) {
          // 更新x轴的数据
          option.value.xAxis.data = response.data.map((item) => item.dateString);
          // 更新series的数据
          seriesData.value[0].data = response.data.map((item) => item.amount);
        } else {
          console.error("近30天营收数据请求失败", response.msg);
        }
      } catch (error) {
        console.error("近30天营收数据请求失败", error);
      }
    };
    // 返回需要暴露的变量
    return {
      option,
    };
  },
};
</script>

<style scoped>
.chart-container {
  width: 786px;
  height: 432px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0; /* 去掉内边距 */
  margin: 0; /* 去掉外边距 */
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
