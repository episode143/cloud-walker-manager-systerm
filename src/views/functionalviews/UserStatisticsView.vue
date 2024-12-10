<template>
  <div>
    <div class="user-statistics-grid-container1">
      <BreadCrumbs :path1="'用户管理'" :path2="'数据分析'" style="grid-area: crumbs" />
      <div style=" width: 786px; height: 50px;  display: flex; justify-content: right; grid-area: return-icon-box">
        <ReturnIcon :link="'/admin/users/management'" />
      </div>
      <StatisticsHeaderCard
        :field1="'回头客'"
        :todayField="'过去30天'"
        :statistics1="userTransformationSituation.highFrequencyUserCount"
        :changeText="''"
        :statistics2="''"
        :color="'#B77ED4'"
        :buttonColor="'#AA66CC'"
        :changecolor="'#3572F3'"
        :iconClass="'icon-huitouke-01'"
        style="grid-area: header-card1"
      />
      <StatisticsHeaderCard
        :field1="'新用户'"
        :todayField="'过去30天'"
        :statistics1="userTransformationSituation.lastMonthNewUserCount"
        :changeText="''"
        :statistics2="''"
        :color="'#5AC3EA'"
        :buttonColor="'rgba(0,0,255,0.13)'"
        :changecolor="'#F59A23'"
        :iconClass="'icon-xinyonghu'"
        style="grid-area: header-card2"
      />
      <StatisticsHeaderCard
        :field1="'粘性用户占比'"
        :todayField="'过去30天'"
        :statistics1="userTransformationSituation.userRetentionRate"
        :changeText="''"
        :statistics2="''"
        :color="'#41D282'"
        :buttonColor="'#28C76F'"
        :changecolor="'#8400FF'"
        :iconClass="'icon-nianxing'"
        style="grid-area: header-card3"
      />
      <YearUserGrowthChart style="grid-area: user-growth-chart" />
    </div>
    <div class="user-statistics-grid-container2">
      <YearUserLossChart style="grid-area: user-loss-chart" />
      <UserDistributionFrequencyChart style="grid-area: user-portrait-chart" />
    </div>
  </div>
</template>
<script>
import BreadCrumbs from "../../components/BreadCrumbs.vue";
import ReturnIcon from "../../components/ReturnIcon.vue";
import StatisticsHeaderCard from "../../components/StatisticsHeaderCard.vue";
import YearUserGrowthChart from "../../components/YearUserGrowthChart.vue";
import YearUserLossChart from "../../components/YearUserLossChart.vue";
import UserDistributionFrequencyChart from "../../components/UserDistributionFrequencyChart.vue";
import { ref, onMounted } from "vue";
import api from "../../api/index";
export default {
  components: {
    StatisticsHeaderCard,
    YearUserGrowthChart,
    YearUserLossChart,
    UserDistributionFrequencyChart,
    BreadCrumbs,
    ReturnIcon,
  },
  setup() {
    const userTransformationSituation = ref({
      highFrequencyUserCount: "0",
      lastMonthNewUserCount: "0",
      userRetentionRate: "0",
    });
    onMounted(() => {
      //console.log("渲染用户转化信息");
      getUserTransformationSituation();
    });
    const getUserTransformationSituation = async () => {
      try {
        const response = await api.getUserTransformationSituation();
        if (response.code === 13021) {
          userTransformationSituation.value.highFrequencyUserCount = response.data.highFrequencyUserCount.toString();
          userTransformationSituation.value.lastMonthNewUserCount = response.data.lastMonthNewUserCount.toString();
          userTransformationSituation.value.userRetentionRate = (response.data.userRetentionRate * 100).toFixed(2) + "%";
        } else {
          console.error("获取用户转化信息请求失败", response.msg);
        }
      } catch (error) {
        console.error("获取用户转化信息请求失败", error);
      }
    };
    return {
      userTransformationSituation,
    };
  },
};
</script>
<style scoped>
.user-statistics-grid-container1 {
  display: grid;
  grid-template-columns: 383px 383px 383px;
  grid-template-rows: 20px 140px 450px;
  gap: 30px 20px;
  grid-template-areas:
    "crumbs return-icon-box return-icon-box"
    "header-card1 header-card2 header-card3"
    "user-growth-chart user-growth-chart user-growth-chart";
}
.user-statistics-grid-container2 {
  padding-top: 30px;
  display: grid;
  grid-template-columns: 719px 450px;
  grid-template-rows: 500px;
  gap: 30px 20px;
  grid-template-areas: "user-portrait-chart user-loss-chart";
  margin-bottom: 20px;
}
</style>
