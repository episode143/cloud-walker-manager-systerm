<template>
  <div class="robot-maintenance-grid-container">
    <BreadCrumbs :path1="'机器人管理'" :path2="'维护信息'" style="grid-area: crumbs" />
    <div style="width: 786px; height: 50px; display: flex; justify-content: right; grid-area: return-icon-box">
      <ReturnIcon :link="'/admin/robots/management'" />
    </div>
    <StatisticsHeaderCard
      :field1="'当前任务量'"
      :todayField="''"
      :statistics1="robotWorkingSituation.waitingOrderCount"
      :changeText="''"
      :statistics2="''"
      :color="'#4096FF'"
      :buttonColor="'#1677ff'"
      :changecolor="''"
      :iconClass="'icon-dangqianrenwu'"
      style="grid-area: header-card1"
    />
    <StatisticsHeaderCard
      :field1="'运行机器人数量'"
      :todayField="''"
      :statistics1="robotWorkingSituation.busyRobotCount"
      :changeText="''"
      :statistics2="''"
      :color="'#41D282'"
      :buttonColor="'#28C76F'"
      :changecolor="''"
      :iconClass="'icon-jiankongyunwei'"
      style="grid-area: header-card2"
    />
    <StatisticsHeaderCard
      :field1="'待维护机器人总数'"
      :todayField="''"
      :statistics1="robotWorkingSituation.maintenanceRobotCount"
      :changeText="''"
      :statistics2="''"
      :color="'rgba(128,128,255)'"
      :buttonColor="'rgba(0,0,170,0.4)'"
      :changecolor="''"
      :iconClass="'icon-yuanquyunwei'"
      style="grid-area: header-card3"
    />
    <div class="damaged-parts-status-chart-container">
      <span style="position: absolute; top: 10px; left: 20px; z-index: 5; font-size: 20px; color: #294567; font-weight: 550">零件损坏情况</span>
      <DamagedPartsDetailedStatus style="position: absolute; top: 20px; left: 60px" />
      <div class="tag-list">
        <div class="tag" style="grid-area: tag1; background-color: #409EFF ;">
          <div>
            <i class="iconfont icon-shiping-xue" style="color: white; font-size: 20px;"></i>
          </div>
          <span>摄像头</span>
        </div>
        <div class="tag" style="grid-area: tag2; background-color: #41d282;">
          <div>
            <i class="iconfont icon-leida" style="color: white; font-size: 20px;"></i>
          </div>
          <span>雷达</span>
        </div>
        <div class="tag" style="grid-area: tag3; background-color: #36cfc9;">
          <div>
            <i class="iconfont icon-dipanzhuangjia" style="color: white; font-size: 20px;"></i>
          </div>
          <span>底盘</span>
        </div>
        <div class="tag" style="grid-area: tag4; background-color: rgba(128,128,255);">
          <div>
            <i class="iconfont icon-fadianji" style="color: white; font-size: 20px;"></i>
          </div>
          <span>电机</span>
        </div>
        <div class="tag" style="grid-area: tag5; background-color: #89c3eb;">
          <div>
            <i class="iconfont icon-cpuchuliqi" style="color: white; font-size: 20px;"></i>
          </div>
          <span>处理器</span>
        </div>
        <div class="tag" style="grid-area: tag6; background-color: #5383c3;">
          <div>
            <i class="iconfont icon-luyouqi" style="color: white; font-size: 20px;"></i>
          </div>
          <span>路由器</span>
        </div>
      </div>
    </div>

    <div class="partwarehouse-status" style="grid-area: left-parts-warehouse-chart">
      <span style="font-size: 20px; color: #294567; font-weight: 550; position: absolute; top: 10px; left: 16px">维修零件库存情况</span>
      <div style="position: absolute; top: 10px; left: 276px;width: 80px;height: 24px;cursor: pointer;" @click="jumptoPartsWarehous">
        <span style="font-size: 20px; color: rgba(0, 0, 170, 0.4); font-weight: 550; position: absolute; top: 0px; left: 0px;" @click="jumptoPartsWarehous">查看仓库</span>
      </div>
      <div class="partlist">
        <span style="top: 6px">摄像头</span>
        <div style="position: absolute; width: 90%; height: 40px; left: 16px; top: 40px">
          <PartStatusProgress :styleColor="'#409EFF'" :denominator="100" :numerator="partsInventory[0]" />
        </div>
        <span style="top: 73px">雷达</span>
        <div style="position: absolute; width: 90%; height: 40px; left: 16px; top: 107px">
          <PartStatusProgress :styleColor="' #41d282'" :denominator="100" :numerator="partsInventory[1]" />
        </div>
        <span style="top: 140px">底盘</span>
        <div style="position: absolute; width: 90%; height: 40px; left: 16px; top: 174px">
          <PartStatusProgress :styleColor="'#36cfc9'" :denominator="100" :numerator="partsInventory[2]" />
        </div>
        <span style="top: 207px">电机</span>
        <div style="position: absolute; width: 90%; height: 40px; left: 16px; top: 241px">
          <PartStatusProgress :styleColor="'rgba(128,128,255)'" :denominator="100" :numerator="partsInventory[3]" />
        </div>
        <span style="top: 274px">处理器</span>
        <div style="position: absolute; width: 90%; height: 40px; left: 16px; top: 308px">
          <PartStatusProgress :styleColor="'#89c3eb'" :denominator="100" :numerator="partsInventory[4]" />
        </div>
        <span style="top: 341px">路由器</span>
        <div style="position: absolute; width: 90%; height: 40px; left: 16px; top: 375px">
          <PartStatusProgress :styleColor="'#5383c3'" :denominator="100" :numerator="partsInventory[5]" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumbs from "../../components/BreadCrumbs.vue";
import ReturnIcon from "../../components/ReturnIcon.vue";
import StatisticsHeaderCard from "../../components/StatisticsHeaderCard.vue";
import DamagedPartsDetailedStatus from "../../components/DamagedPartsStatus.vue";
import PartStatusProgress from "../../components/PartStatusProgress.vue";
import { useRouter } from "vue-router";
import api from "../../api/index";
import { onMounted ,ref  } from "vue";
export default {
  components: {
    BreadCrumbs,
    ReturnIcon,
    StatisticsHeaderCard,
    DamagedPartsDetailedStatus,
    PartStatusProgress,
  },
  setup() {
    const router = useRouter();
    const robotWorkingSituation = ref({
      waitingOrderCount:0,
      busyRobotCount:0,
      maintenanceRobotCount:0,
    });
    const partsInventory = ref([63,67,82,27,84,35]);
    const jumptoPartsWarehous = ()=>{
      router.push({ path: "/admin/robots/warehouse" });
    }
    const getRobotWorkingSituation = async()=>{
      try {
        const response = await api.getRobotWorkingSituation();
        if (response.code === 14021) {
          robotWorkingSituation.value.waitingOrderCount = response.data.waitingOrderCount;
          robotWorkingSituation.value.busyRobotCount = response.data.busyRobotCount;
          robotWorkingSituation.value.maintenanceRobotCount = response.data.maintenanceRobotCount;
        } else {
          console.error("获取机器人运维情况请求失败", response.msg);
        }
      } catch (error) {
        console.error("获取机器人运维情况请求失败", error);
      }
    }
    //待对接
    const getRobotPartsInventory = async()=>{
      try {
        const response = await api.getRobotPartsInventory();
        if (response.code === 14031) {
          partsInventory.value = response.data.inventory;
        } else {
          console.error("获取机器人零件库存请求失败", response.msg);
        }
      } catch (error) {
        console.error("获取机器人零件库存请求失败", error);
      }
    }
    onMounted(()=>{
      getRobotWorkingSituation();
      getRobotPartsInventory();
    })
    return{
      robotWorkingSituation,
      partsInventory,
      jumptoPartsWarehous,
    }
  },
};
</script>
<style scoped>
.robot-maintenance-grid-container {
  display: grid;
  grid-template-columns: 383px 383px 383px;
  grid-template-rows: 18px 140px 450px;
  gap: 25px 20px;
  grid-template-areas:
    "crumbs return-icon-box return-icon-box"
    "header-card1 header-card2 header-card3"
    "damaged-parts-status-chart damaged-parts-status-chart left-parts-warehouse-chart";
}
.damaged-parts-status-chart-container {
  width: 786px;
  height: 450px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}
.partwarehouse-status {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}
.partlist {
  position: absolute;
  top: 45px;
  width: 100%;
  height: 402px;
}
.partlist span {
  position: absolute;
  font-size: 20px;
  left: 16px;
}
.tag-list {
  position: absolute;
  width: 200px;
  height: 72%;
  /* background-color: red; */
  left: 550px;
  top: 70px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr;
  gap: 15px 0px;
  grid-template-areas: 
  "tag1"
  "tag2"
  "tag3"
  "tag4"
  "tag5"
  "tag6";
}
.tag{
  height: 100%;
  width: 85%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  align-items: center;
}
.tag div{
  height: 32px;
  width: 32px;
  border-radius: 50%;
  border: 2px solid white;
  margin-left: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tag span{
  font-size: 20px;
  color: white;
  margin-left: 10px;
}
</style>
