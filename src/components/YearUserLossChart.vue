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
    const option = ref({
      color: ['#409eff', '#00beff','#00d3f8', '#00e5dc', '#54f1b4', '#acf88b','#f9f871','#738ae6'],
      title: {
        text: "用户流失统计",
        left: "center",
        top: "10px",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        left: "center",
        top: "bottom",
        data: [],
      },
      toolbox: {
        show: true,
        top: "10px",
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: "流失人数",
          type: "pie",
          radius: [20, 140],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 5,
          },
          data: [],
        },
      ],
    });

    onMounted(() => {
      getUserLossQuarterlyAnalysis();
    });
    const getUserLossQuarterlyAnalysis = async () => {
      try {
        const response = await api.getUserLossQuarterlyAnalysis();
        if (response.code === 13041) {
          // 格式化数据
          const formattedData = response.data.map((item) => ({
            value: item.value,
            name: item.name,
          }));
          option.value.series[0].data = formattedData;
          option.value.legend.data = formattedData.map((item) => item.name);
        } else {
          console.error("渲染用户流失信息请求失败", response.msg);
        }
      } catch (error) {
        console.error("渲染用户流失信息请求失败", error);
      }
    };
    return {
      option,
    };
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
