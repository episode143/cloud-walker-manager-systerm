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
    const xAxisData = ref(["总收入金额", "设备维护支出金额", "营收总利润"]);

    // 定义响应式的 value 数组
    const values = ref([]);

    // 计算属性 option
    const option = computed(() => {
      return {
        title: {
          top:"5px",
          text: "近30天财务状况",
          subtext: "单位：元",
          left: "10px",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "3%",
          top: "10%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: xAxisData.value,
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} 元",
          },
        },
        series: [
          {
            name: "金额",
            type: "bar",
            barWidth: "60%",
            data: values.value.map((value, index) => ({
              value,
              itemStyle: {
                color: ["#25C94F", "rgba(217,0,27,0.7)", "#FFA940"][index],
              },
            })),
            label: {
              show: true,
              position: "top",
              formatter: "{c} 元",
            },
          },
        ],
      };
    });
    const getProfitComponentAnalysis = async()=>{
      try {
        const response = await api.getProfitComponentAnalysis();
        if (response.code === 17021) {
          values.value = [];
          values.value.push(response.data.totalIncomeMonth);
          values.value.push(response.data.totalExpenseMonth);
          values.value.push(response.data.totalProfitMonth);
        } else {
          console.error("近30天收支情况数据请求失败", response.msg);
        }
      } catch (error) {
        console.error("近30天收支情况数据请求失败", error);
      }
    }
    onMounted(()=>{
      getProfitComponentAnalysis();
    })
    return {
      option,
    };
  },
};
</script>

<style scoped>
.chart-container {
  width: 686px;
  height: 564px;
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
