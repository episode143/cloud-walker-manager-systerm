<template>
  <div class="dashboard-grid-container">
    <DashBoardTransferHeaderCard
      :field1="'注册用户人数'"
      :todayField="'今日'"
      :statistics1="operationData.todayUserCount"
      :changeText="operationData.userChangeField"
      :statistics2="operationData.changeUserCount"
      :color="'#409EFF'"
      :buttonColor="'rgba(0,0,255,0.35)'"
      :changecolor="'white'"
      :iconClass="'icon-yonghuzengchang'"
      style="grid-area: header-card1"
    />
    <DashBoardTransferHeaderCard
      :field1="'今日营收额'"
      :todayField="'今日'"
      :statistics1="operationData.todayIncome"
      :changeText="operationData.incomeChangeField"
      :statistics2="operationData.changeIncome"
      :color="'#3eb370'"
      :buttonColor="'#3b7960d0'"
      :changecolor="'white'"
      :iconClass="'icon-qian'"
      style="grid-area: header-card2"
    />
    <DashBoardTransferHeaderCard
      :field1="'实时配送机器人数'"
      :todayField="'今日'"
      :statistics1="operationData.busyRobotStatus"
      :changeText="''"
      :statistics2="''"
      :color="'#36cfc9'"
      :buttonColor="'#006e5440'"
      :changecolor="'#8400FF'"
      :iconClass="'icon-robot'"
      style="grid-area: header-card3"
    />
    <div class="center-flex-container-left-column" style="grid-area: message; display: flex; justify-content: center; align-items: center;">
      <div style="background-color: transparent; height: 405px; width: 760px;">
        <MessageList/>
      </div>
    </div>
    <DashBoardTransferAsideCard
      :field1="'总订单数'"
      :iconClass="'icon-dingdan'"
      :iconBackgroundColor="'#409EFF'"
      :statistics1="orderStatus.totalOrderCount"
      :link="'/admin/orders/management'"
      style="grid-area: aside-card1"
    />
    <DashBoardTransferAsideCard
      :field1="'待派送包裹'"
      :iconClass="'icon-dingdanchulizhong'"
      :iconBackgroundColor="'rgba(128,128,255,0.9)'"
      :statistics1="orderStatus.waitingOrderCount"
      :link="'/admin/orders/management'"
      style="grid-area: aside-card2"
    />
    <DashBoardTransferAsideCard
      :field1="'今日已完成订单'"
      :iconClass="'icon-dingdanyichenggong'"
      :iconBackgroundColor="'#3eb370'"
      :statistics1="orderStatus.todayCompletedOrderCount"
      :link="'/admin/orders/management'"
      style="grid-area: aside-card3"
    />
    <div class="damaged-parts-warehouse-chart-container" style="grid-area: damaged-parts-status-chart">
      <DamagedPartsStatus />
    </div>
    <LastMonthProfitChart style="grid-area: month-profit-chart" />
    <ThisWeekOrderCircle style="grid-area: this-week-order-circle-chart" />
  </div>
</template>
<script>
import DashBoardTransferHeaderCard from "../../components/DashBoardTransferHeaderCard.vue";
import DashBoardTransferAsideCard from "../../components/DashBoardTransferAsideCard.vue";
import DamagedPartsStatus from "../../components/DamagedPartsStatus.vue";
import LastMonthProfitChart from "../../components/LastMonthProfitChart.vue";
import ThisWeekOrderCircle from "../../components/ThisWeekOrderCircle.vue";
import api from "../../api/index";
import {ref, onMounted} from "vue";
import MessageList from "../../components/MessageList.vue";
export default {
  components: {
    DashBoardTransferHeaderCard,
    DashBoardTransferAsideCard,
    DamagedPartsStatus,
    LastMonthProfitChart,
    ThisWeekOrderCircle,
    MessageList,
  },
  setup() {
    const operationData= ref({
      todayUserCount: '0',
      userChangeField:'不变',
      changeUserCount: '',
      todayIncome: '0',
      incomeChangeField:'不变',
      changeIncome: '',
      busyRobotStatus: '0',
    });
    const orderStatus=ref({
      todayCompletedOrderCount:'0',
      waitingOrderCount:'0',
      totalOrderCount:'0',
    });
    const getOperationSituation = async () => {
      try {
        const response = await api.getOperationSituation();
        if (response.code === 12011) {
          operationData.value.todayUserCount=response.data.todayUserCount.toString();
          if(response.data.changeUserCount>0){
            operationData.value.userChangeField = '增加';
          } else if(response.data.changeUserCount<0){
            operationData.value.userChangeField = '减少';
          } else {
            operationData.value.userChangeField = '不变';
          }
          if(response.data.changeUserCount!==0) {
            operationData.value.changeUserCount = Math.abs(response.data.changeUserCount).toString();
          }
          operationData.value.todayIncome = response.data.todayIncome.toString();
          if(response.data.todayIncome>0){
            operationData.value.incomeChangeField = '增加';
          } else if(response.data.todayIncome<0){
            operationData.value.incomeChangeField = '减少';
          } else {
            operationData.value.incomeChangeField = '不变';
          }
          if(response.data.todayIncome!==0) {
            operationData.value.changeIncome = Math.abs(response.data.changeIncome).toString();
          }
          operationData.value.busyRobotStatus = response.data.busyRobotCount.toString()+'/'+response.data.totalRobotCount;
        } else {
          console.error('获取操作情况失败', response.msg);
        }
      } catch (error) {
        console.error('运维信息请求失败', error);
      }
    };

    const getOrderAccomplishmentStatus = async()=>{
      try{
        const response = await api.getOrderAccomplishmentStatus();
        if(response.code === 12021){
          orderStatus.value.todayCompletedOrderCount = response.data.todayCompletedOrderCount.toString();
          orderStatus.value.waitingOrderCount = response.data.waitingOrderCount.toString();
          orderStatus.value.totalOrderCount = response.data.totalOrderCount.toString();
        } else {
          console.error('获取操作情况失败', response.msg);
        }
      }catch(error){
        console.error('订单完成信息请求失败', error);
      }
    };
    onMounted(async () => {
      await Promise.all([getOperationSituation(), getOrderAccomplishmentStatus()]);
    });
    return{
      operationData,
      orderStatus,
    }
  },
};
</script>
<style>
.dashboard-grid-container {
  position: relative;
  top: 20px;
  display: grid;
  grid-template-columns: 383px 383px 383px;
  grid-template-rows: 140px 124px 124px 124px 432px 600px;
  gap: 30px 20px;
  grid-template-areas:
    "header-card1 header-card2 header-card3"
    "message message aside-card1"
    "message message aside-card2"
    "message message aside-card3"
    "month-profit-chart month-profit-chart damaged-parts-status-chart"
    "this-week-order-circle-chart this-week-order-circle-chart this-week-order-circle-chart";
  margin-bottom: 20px;
}

.center-flex-container-left-column {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.DashboardTransferAsideCard {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
.damaged-parts-warehouse-chart-container {
  width: 384px;
  height: 432px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
