<template>
  <el-progress :text-inside="true" :stroke-width="17" :percentage="percentage" :color="styleColor" status="exception">
    <span>{{ dataField }}</span>
  </el-progress>
</template>

<script>
import { number } from "echarts";
import { computed } from "vue";
export default {
  props: {
    styleColor: String,
    denominator: number,
    numerator: number,
  },
  setup(props) {
    const percentage = computed(() => {
      return Math.round((props.numerator * 100) / props.denominator);
    });
    const dataField = computed(() => {
      return props.numerator.toString() + "/" + props.denominator.toString();
    });
    return {
      percentage,
      dataField,
    };
  },
};
</script>
