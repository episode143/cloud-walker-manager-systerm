<template>
  <!-- 本月订单周期 -->
  <div class="chart-container">
    <e-charts class="chart" :option="option" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import api from "../api/index";
export default {
  setup() {
    // 定义数据
    const data = ref([]);

    // 计算 ECharts 配置
    const option = computed(() => {
      return {
        title: {
          text: "本月订单周期",
          left: "20px",
          top: "10px", // 增加了顶部间距
          textStyle: {
            fontSize: 18,
          },
        },
        grid: {
          containLabel: true,
          top: "10%", // 调整顶部间距以容纳标题和副标题
          left: "5%",
          right: "5%",
          bottom: "10%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
            crossStyle: {
              color: "#999",
            },
            lineStyle: {
              type: "solid",
              color: "#999",
              width: 2,
            },
            yAxis: {
              lineStyle: {
                show: false,
              },
            },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: data.value.map((item) => item[0]),
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "30%"],
        },
        visualMap: {
          type: "piecewise",
          show: false,
          dimension: 0,
          seriesIndex: 0,
          pieces: [
            {
              gt: 11,
              lt: 13,
              color: "#409EFF",
            },
            {
              gt: 17,
              lt: 19,
              color: "rgba(128,128,255,0.9)",
            },
          ],
        },
        series: [
          {
            type: "line",
            smooth: 0.4,
            symbol: "none",
            lineStyle: {
              color: "#bfbfbf",
              width: 4,
            },
            markLine: {
              symbol: ["none", "none"],
              label: { show: false },
              data: [{ xAxis: 11 }, { xAxis: 13 }, { xAxis: 17 }, { xAxis: 19 }],
            },
            areaStyle: {},
            data: data.value.map((item) => item[1]),
          },
        ],
      };
    });

    const getgetAverageDailyOrderCycle = async () => {
      try {
        const response = await api.getAverageDailyOrderCycle();
        console.log(response);
        if (response.code === 12031) {
          data.value = response.data.map(item => [item.time,item.value]);//映射方式
        } else {
          console.error("订单日均周期变化请求失败", response.msg);
        }
      } catch (error) {
        console.error("订单日均周期变化请求失败", error);
      }
    };

    onMounted(()=>{
      getgetAverageDailyOrderCycle();
    })
    return {
      option,
    };
  },
};
</script>

<style scoped>
.chart-container {
  width: 1189px;
  height: 600px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.chart {
  width: 100%;
  height: 100%;
}
</style>
