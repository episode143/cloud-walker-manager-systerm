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
      title: {
        text: "用户使用频率分析",
        top: "10px",
        left: "12px",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c}人",
      },
      toolbox: {
        top: "10px",
        feature: {
          saveAsImage: {},
        },
      },
      legend: {
        data: ["高频用户", "频率小于20%的用户", "频率小于10%的用户", "频率小于5%的用户", "未使用配送的用户"],
        left: "right",
        top: "460px",
      },
      series: [
        {
          name: "用户使用频率分析",
          type: "funnel",
          left: "10%",
          top: 60,
          bottom: 60,
          width: "80%",
          min: 0,
          max: 100,
          minSize: "0%",
          maxSize: "100%",
          sort: "descending",
          gap: 2,
          label: {
            show: true,
            position: "inside",
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: "solid",
            },
          },
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 1,
          },
          emphasis: {
            label: {
              fontSize: 20,
            },
          },
          data: [
            {
              value: 0,
              name: "未使用配送的用户",
              itemStyle: { color: "#00beff" },
            },
            {
              value: 0,
              name: "频率小于5%的用户",
              itemStyle: { color: "#00d8ed" },
            },
            {
              value: 0,
              name: "频率小于10%的用户",
              itemStyle: { color: "#00ebbd" },
            },
            {
              value: 0,
              name: "频率小于20%的用户",
              itemStyle: { color: "#97f68c" },
            },
            {
              value: 0,
              name: "高频用户",
              itemStyle: { color: "#f9f871" },
            },
          ],
        },
      ],
    });

    // 你可以在这里添加其他逻辑，例如在 onMounted 钩子中进行初始化
    onMounted(() => {
      getUserFrequencyAnalysis();
    });
    const getUserFrequencyAnalysis = async () => {
      try {
        const response = await api.getUserFrequencyAnalysis();
        if (response.code === 13051) {
          option.value.series[0].data[0].value=response.data.NoDeliveryUsers;
          option.value.series[0].data[1].value=response.data.MediumLowFrequencyUsers;
          option.value.series[0].data[2].value=response.data.MediumHighFrequencyUsers;
          option.value.series[0].data[3].value=response.data.LowFrequencyUsers;
          option.value.series[0].data[4].value=response.data.HighFrequencyUsers;
        } else {
          console.error('获取用户使用配送频率数据失败',response.msg)
        }
      } catch (error) {
        console.error('获取用户使用配送频率数据失败', error);
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
  width: 719px;
  height: 500px;
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
