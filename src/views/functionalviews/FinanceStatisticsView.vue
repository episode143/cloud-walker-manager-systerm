<template>
  <div class="finance-statistics-grid-container">
    <BreadCrumbs :path1="'流水管理'" :path2="'数据分析'" style="grid-area: crumbs" />
    <div style=" height: 50px; display: flex; justify-content: right; grid-area: return-icon-box">
      <ReturnIcon :link="'/admin/finance/management'" />
    </div>
    <FinanceStatisticsCard
      :field1="'总收入金额'"
      :todayField="'近30天'"
      :statistics1="profitComponent.totalIncomeMonth"
      :changeText="profitComponent.changeField1"
      :statistics2="profitComponent.changeIncomeMonth"
      :color="'#25C94F'"
      :buttonColor="'rgba(149,242,2,0.42)'"
      :iconClass="'icon-shouru'"
      style="grid-area: statistics-card1"
    />
    <FinanceStatisticsCard
      :field1="'设备维护支出金额'"
      :todayField="'近30天'"
      :statistics1="profitComponent.totalExpenseMonth"
      :changeText="profitComponent.changeField2"
      :statistics2="profitComponent.changeExpenseMonth"
      :color="'rgba(217,0,27,0.7)'"
      :buttonColor="'rgba(217,0,27,0.84)'"
      :iconClass="'icon-zhichu'"
      style="grid-area: statistics-card2"
    />
    <FinanceStatisticsCard
      :field1="'营收总利润'"
      :todayField="'近30天'"
      :statistics1="profitComponent.totalProfitMonth"
      :changeText="profitComponent.changeField3"
      :statistics2="profitComponent.changeProfitMonth"
      :color="'#FFA940'"
      :buttonColor="'rgba(163,103,23,0.43)'"
      :iconClass="'icon-lirun'"
      style="grid-area: statistics-card3"
    />
    <FinanceRevenueChart style="grid-area: revenue-bar-chart" />
    <WeekFinanceChart style="grid-area: week-finance-statistics-chart" />
  </div>
</template>

<script>
import BreadCrumbs from "../../components/BreadCrumbs.vue";
import ReturnIcon from "../../components/ReturnIcon.vue";
import FinanceStatisticsCard from "../../components/FinanceStatisticsCard.vue";
import FinanceRevenueChart from "../../components/FinanceRevenueChart.vue";
import WeekFinanceChart from "../../components/WeekFinanceChart.vue";
import { ref, onMounted } from "vue";
import api from "../../api/index";
export default {
  components: {
    BreadCrumbs,
    ReturnIcon,
    FinanceStatisticsCard,
    FinanceRevenueChart,
    WeekFinanceChart,
  },
  setup() {
    const profitComponent = ref({
      totalIncomeMonth: "",
      changeField1: "",
      changeIncomeMonth: "",
      totalExpenseMonth: "",
      changeField2: "",
      changeExpenseMonth: "",
      totalProfitMonth: "",
      changeField3: "",
      changeProfitMonth: "",
    });
    onMounted(() => {
      getProfitComponentAnalysis();
    });
    const getProfitComponentAnalysis = async () => {
      try {
        const response = await api.getProfitComponentAnalysis();
        if (response.code === 17021) {
          profitComponent.value.totalIncomeMonth = response.data.totalIncomeMonth.toString() + "元";
          if (response.data.changeIncomeMonth > 0) {
            profitComponent.value.changeField1 = "增加";
          } else if (response.data.changeIncomeMonth < 0) {
            profitComponent.value.changeField1 = "减少";
          } else {
            profitComponent.value.changeField1 = "持平";
          }
          if (response.data.changeIncomeMonth !== 0) {
            profitComponent.value.changeIncomeMonth = Math.abs(response.data.changeIncomeMonth).toString() + "元";
          }
          profitComponent.value.totalExpenseMonth = response.data.totalExpenseMonth.toString() + "元";
          if (response.data.changeExpenseMonth > 0) {
            profitComponent.value.changeField2 = "增加";
          } else if (response.data.changeExpenseMonth < 0) {
            profitComponent.value.changeField2 = "减少";
          } else {
            profitComponent.value.changeField2 = "持平";
          }
          if (response.data.changeExpenseMonth !== 0) {
            profitComponent.value.changeExpenseMonth = Math.abs(response.data.changeExpenseMonth).toString() + "元";
          }
          profitComponent.value.totalProfitMonth = response.data.totalProfitMonth.toString() + "元";
          if (response.data.changeProfitMonth > 0) {
            profitComponent.value.changeField3 = "增加";
          } else if (response.data.changeProfitMonth < 0) {
            profitComponent.value.changeField3 = "减少";
          } else {
            profitComponent.value.changeField3 = "持平";
          }
          if (response.data.changeProfitMonth !== 0) {
            profitComponent.value.changeProfitMonth = Math.abs(response.data.changeProfitMonth).toString() + "元";
          }
        } else {
          console.error("营收成分分析请求失败", response.msg);
        }
      } catch (error) {
        console.error("营收成分分析请求失败", error);
      }
    };
    return {
      profitComponent,
    };
  },
};
</script>

<style>
.finance-statistics-grid-container {
  display: grid;
  grid-template-columns: 483px 686px;
  grid-template-rows: 20px 168px 168px 168px;
  gap: 30px 20px;
  grid-template-areas:
    "crumbs  return-icon-box"
    "statistics-card1 revenue-bar-chart"
    "statistics-card2 revenue-bar-chart"
    "statistics-card3 revenue-bar-chart"
    "week-finance-statistics-chart week-finance-statistics-chart";
  margin-bottom: 20px;
}
</style>
