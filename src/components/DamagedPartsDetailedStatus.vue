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
    const data = ref([1048, 735, 580, 484, 300, 402]);
    const names = ref(["摄像头", "雷达", "底盘", "电机", "处理器", "路由器"]);
    const colors = ref(["#409EFF", "#41d282", "#36cfc9", "rgba(128,128,255)", "#89c3eb", "#5383c3"]);
    //待对接
    const getRobotRepairPartsStatus = async () => {
      try {
        const response = await api.getRobotRepairPartStatus();
        if (response.code === 14041) {
          // 确保 damagedNumber 是一个数组
          data.value = response.data;
        } else {
          console.error("获取机器人零件损坏情况请求失败", response.msg);
        }
      } catch (error) {
        console.error("获取机器人零件损坏情况请求失败", error);
      }
    };
    const option = computed(() => {
      return {
        tooltip: {
          trigger: "item",
        },
        color: colors.value, // 设置颜色
        series: [
          {
            name: "损坏数量",
            type: "pie",
            radius: ["65%", "95%"], // 调整饼图的内外半径比例
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 10,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 55, // 保持高亮状态下的标签字体大小不变
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: data.value.map((value, index) => ({
              value,
              name: names.value[index],
              itemStyle: {
                color: colors.value[index], // 为每个数据项设置颜色
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 10,
              },
            })),
          },
        ],
      };
    });

    onMounted(() => {
      getRobotRepairPartsStatus();
    });
    return {
      option,
    };
  },
};
</script>

<style scoped>
.chart-container {
  width: 420px; /* 增大宽度 */
  height: 420px; /* 增大高度 */
  background-color: white;
}
.chart {
  width: 100%;
  height: 100%;
}
</style>
