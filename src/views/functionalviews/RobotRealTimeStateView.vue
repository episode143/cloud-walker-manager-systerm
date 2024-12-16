<template>
  <div>
    <div class="user-detailed-onformation-grid">
      <BreadCrumbs :path1="'机器人管理'" :path2="'查看实时状态'" style="grid-area: crumbs" />
      <div style="width: 786px; height: 50px; display: flex; justify-content: right; grid-area: return-icon-box">
        <ReturnIcon :link="'/admin/robots/management'" />
      </div>
    </div>
    <div class="realtime-status-display">
      <div class="first-sight-header">
        <!-- <i class="iconfont icon-ziyuan" style="font-size: 30px; color: #0482FF; margin-left: 30px"></i> -->
        <h1 style="font-size: 20px; color: #294567; margin-left: 365px; font-weight: 550; font-size: 20px">{{ robotId }}号</h1>
        <h1 style="font-size: 20px; margin-left: 5px; font-weight: 550; color: #0482ff; font-size: 20px">机器人第一视角</h1>
      </div>
      <div class="first-sight-content">
        <div style="height: 96%; width: 97%; border-radius: 4px; border: 4px solid #409eff; position: absolute">
          <div style="position: absolute; bottom: 7px; right: 0px; background-color: transparent; height: 20px; width: 220px; z-index: 5; display: flex; justify-content: center; align-items: center">
            <i class="iconfont icon-dingwei2" style="color: #409eff; font-size: 20px; position: absolute; left: 18px"></i>
            <span style="font-size: 16px; position: absolute; left: 40px"
              >({{ robotPosition.latitude === 0 ? 28.167326 : robotPosition.latitude }},{{ robotPosition.longitude === 0 ? 112.947576 : robotPosition.longitude }})</span
            >
          </div>
          <!-- <div style="position: absolute; bottom: 7px; right: 0px; background-color: transparent; height: 20px; width: 240px; z-index: 5; display: flex; justify-content: center; align-items: center">
            <i class="iconfont icon-speed_line" style="color: #409eff; font-size: 19px; position: absolute; left: 19px"></i>
            <span style="font-size: 16px; position: absolute; left: 40px"
              >线{{ robotPosition.latitude === 0 ? 28.167326 : robotPosition.latitude }} 角{{ robotPosition.longitude === 0 ? 112.947576 : robotPosition.longitude }}</span
            >
          </div> -->
          <img src="http://192.168.172.236:8000/robot/video_stream" alt="机器人实时图像流" style="height: 100%; width: 100%; border-radius: 3px" />
        </div>
      </div>

      <div class="state-station">
        <!-- <span style="position: absolute; left: 20px; font-size: 18px; font-weight: 550; color: #294567d0; top: 20px">机器人实时状态</span> -->
        <span style="position: absolute; left: 50px; font-size: 18px; font-weight: 550; color: #294567d0; top: 490px">机器人剩余电量</span>
        <div style="position: absolute; width: 75%; left: 12.5%; height: 30px; top: 535px">
          <el-progress :text-inside="true" :stroke-width="20" :percentage="stateForm.leftBatteryCapacity" />
        </div>
        <div style="position: absolute; bottom: 100px; width: 100%; height: 350px; background-color: transparent">
          <el-timeline style="max-width: 240px; position: absolute; bottom: 70px; left: -15px">
            <el-timeline-item timestamp="" hide-timestamp="true" placement="top" type="primary">
              <div style="height: 125px; width: 180px">
                <span style="font-size: 18px; font-weight: 550; position: absolute; left: 25px; top: -2px; color: #294567d0">{{ stateForm.getOrderTime }}</span>
                <span style="font-size: 18px; font-weight: 500; position: absolute; left: 25px; top: 23px; color: #0482ff">机器人接收订单</span>
                <i class="iconfont icon-chufadian" style="position: absolute; color: #0482ff; font-size: 18px; top: 58px; left: 24px"></i>
                <span
                  style="
                    font-size: 18px;
                    font-weight: 530;
                    position: absolute;
                    left: 50px;
                    top: 57px;
                    color: #294567d0;
                    white-space: normal;
                    word-break: break-all;
                    overflow-wrap: break-word;
                    max-width: 150px;
                    text-align: left;
                  "
                  >{{ stateForm.onDeliverOrderId }}</span
                >
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="" hide-timestamp="true" placement="top" type="primary">
              <div style="height: 125px; width: 200px">
                <span style="font-size: 18px; font-weight: 550; position: absolute; left: 25px; top: -2px; color: #294567d0">{{ currentTime }}</span>
                <span style="font-size: 18px; font-weight: 500; position: absolute; left: 25px; top: 23px; color: #0482ff">正在全力配送中</span>
                <i class="iconfont icon-sudu1" style="position: absolute; color: #0482ff; font-size: 20px; top: 58px; left: 24px"></i>
                <span style="font-size: 18px; font-weight: 530; position: absolute; left: 50px; top: 54px; color: #294567d0">实时速度{{ robotVelocity.linear_velocity }}m/s</span>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="" hide-timestamp="true" placement="top" type="primary">
              <div style="height: 50px; width: 200px">
                <span style="font-size: 18px; font-weight: 550; position: absolute; left: 25px; top: -2px; color: #294567d0">{{ stateForm.predictCompleteDeliveryTime }}</span>
                <span style="font-size: 18px; font-weight: 500; position: absolute; left: 27px; top: 23px; color: #0482ff">预计送达目的地</span>
                <i class="iconfont icon-mudedi1" style="position: absolute; color: #0482ff; font-size: 18px; top: 58px; left: 24px"></i>
                <span
                  style="
                    font-size: 17px;
                    font-weight: 530;
                    position: absolute;
                    left: 50px;
                    top: 53px;
                    color: #294567d0;
                    white-space: normal;
                    word-break: break-all;
                    overflow-wrap: break-word;
                    max-width: 150px;
                    text-align: left;
                  "
                  >{{ stateForm.destinationAddress }}</span
                >
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <!-- <div class="real-time-status-box">
        <div class="state-card" style="top: 20px; left: 20px">
          <i class="iconfont icon-dingdanyichenggong" style="font-size: 36px"></i>
          <h1>今日完成</h1>
          <h1 style="margin-top: 20px">{{ realtimeStatus.completeOrderNumber }}</h1>
          <h1>单</h1>
        </div>
        <div class="state-card" style="top: 20px; left: 210px">
          <i class="iconfont icon-lucheng" style="font-size: 28px; margin-left: 8px"></i>
          <h1>今日里程</h1>
          <h1 style="margin-top: 20px">{{ realtimeStatus.todayToatlMileage }}</h1>
          <h1>km</h1>
        </div>

        <div class="power-situation-box" style="background-color: transparent">
          <h1 style="position: absolute; top: -15px; left: 0px; color: white; font-weight: 500; font-size: 20px">剩余电量</h1>
          <h1 style="position: absolute; top: -10px; left: 90px; font-weight: 550; color: white">{{ realtimeStatus.dumpEnergy }}%</h1>
          <div style="width: 100%; height: 6px; border-radius: 5px; background-color: white; position: absolute; top: 44px">
            <div style="height: 6px; border-radius: 3px" :style="{ backgroundColor: colorStyle, width: powerLength }"></div>
          </div>
        </div>
      </div> -->

      <!-- <div class="real-time-status-list">
        <div style="width: 95%; margin-left: 2.5%; height: 65px; background-color: transparent; color: #409eff">
          <i class="iconfont icon-dingdanchulizhong" style="font-size: 36px; position: absolute; top: 15px; left: 95px"></i>
          <h1 style="position: absolute; left: 140px; font-size: 20px; top: 0px">派送订单列表</h1>
        </div>
        <div style="width: 95%; margin-left: 2.5%; background-color: white">
          <ul class="list" style="overflow: auto">
            <li
              v-for="(item, index) in orderList"
              :key="index"
              class="list-item"
              :class="['list-item']"
              :style="{ color: index === 0 ? '#67C23A' : '#0482FF', backgroundColor: index === 0 ? 'rgb(239.8, 248.9, 235.3)' : 'rgb(235.9, 245.3, 255)' }"
            >
              <i class="iconfont" style="font-size: 20px" :class="index === 0 ? 'icon-yunhang' : 'icon-zanting1'"></i> 订单号：{{ item.orderId }} 预计完成时间：{{ item.predictCompleteTime }}
            </li>
          </ul>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import BreadCrumbs from "../../components/BreadCrumbs.vue";
import ReturnIcon from "../../components/ReturnIcon.vue";
import { computed, onMounted, ref, onUnmounted, onActivated, onDeactivated } from "vue";
import api from "../../api/index";
export default {
  components: {
    BreadCrumbs,
    ReturnIcon,
  },
  setup() {
    let intervalId = null;
    const route = useRoute();
    const robotId = computed(() => route.params.robotId);
    const robotPosition = ref({
      latitude: 0,
      longitude: 0,
    });
    const robotVelocity = ref({
      linear_velocity: "0.00",
    });
    // 初始化实时状态数据
    const realtimeStatus = ref({
      completeOrderNumber: 32,
      deliveryingOrderId: "O431231",
      dumpEnergy: 70,
      todayToatlMileage: 31.45,
    });
    const stateForm = ref({
      getOrderTime: "",
      onDeliverOrderId: "",
      destinationAddress: "",
      predictCompleteDeliveryTime: "",
      predictCompletePeriod: 0,
      leftBatteryCapacity: 0,
    });
    // 计算属性必须在返回对象之前定义
    const colorStyle = computed(() => {
      let colorStyle = "";
      if (realtimeStatus.value.dumpEnergy > 60) {
        colorStyle = "#67C23A";
      } else if (realtimeStatus.value.dumpEnergy > 30) {
        colorStyle = "#0482FF";
      } else if (realtimeStatus.value.dumpEnergy > 10) {
        colorStyle = "rgb(237.5, 189.9, 118.5)";
      } else {
        colorStyle = "#F56C6C";
      }
      return colorStyle;
    });

    const currentTime = ref("");
    const getCurrentTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始，所以需要加 1
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    };
    const powerLength = computed(() => {
      return realtimeStatus.value.dumpEnergy.toString() + "%";
    });
    const orderList = ref([
      { id: 1, orderId: "O214312", predictCompleteTime: 13 },
      { id: 2, orderId: "O214312", predictCompleteTime: 13 },
      { id: 3, orderId: "O214312", predictCompleteTime: 13 },
      { id: 4, orderId: "O214312", predictCompleteTime: 13 },
      { id: 5, orderId: "O214312", predictCompleteTime: 13 },
      { id: 6, orderId: "O214312", predictCompleteTime: 13 },
      { id: 7, orderId: "O214312", predictCompleteTime: 13 },
      { id: 8, orderId: "O214312", predictCompleteTime: 13 },
      { id: 9, orderId: "O214312", predictCompleteTime: 13 },
      { id: 10, orderId: "O214312", predictCompleteTime: 13 },
    ]);
    const getRobotPosition = async () => {
      try {
        const response = await api.getRobotLat({
          robotId: parseInt(robotId.value, 10),
        });
        if (response.code === 14091) {
          robotPosition.value.latitude = response.data.latitude;
          robotPosition.value.longitude = response.data.longitude;
        } else {
          console.error("获取机器人坐标失败", response.msg);
        }
      } catch (error) {
        console.error("获取机器人坐标失败", error);
      }
    };
    const getRobotRealTimeStatus = async () => {
      try {
        const params = {
          robotId: parseInt(robotId.value, 10),
        };
        const response = await api.getRealTimeStatus(params);
        if (response.code === 50081) {
          stateForm.value.leftBatteryCapacity = response.data.battery;
          robotVelocity.value.angular_velocity = response.data.angular_velocity.toFixed(2);
          robotVelocity.value.linear_velocity = response.data.linear_velocity.toFixed(2);
        } else {
          console.error("获取机器人实时状态失败", response.msg);
        }
      } catch (error) {
        console.error("获取机器人实时状态失败", error);
      }
    };
    const getRealTimeOrderState = async () => {
      try {
        const params = {
          robotId: parseInt(robotId.value, 10),
        };
        const response = await api.getRealTimeOrderState(params);
        if (response.code === 14071) {
          if (response.data !== null) {
            stateForm.value.destinationAddress = response.data.delivery_address;
            stateForm.value.getOrderTime = response.data.delivery_starttime;
            stateForm.value.onDeliverOrderId = response.data.order_id;
            stateForm.value.predictCompleteDeliveryTime = response.data.estimated_completion_time;
          } else {
            stateForm.value.destinationAddress = "暂无地址";
            stateForm.value.getOrderTime = "暂无配送任务";
            stateForm.value.onDeliverOrderId = "暂无任务";
            stateForm.value.predictCompleteDeliveryTime = "休息中";
          }
        } else {
          console.error("获取机器人实时订单状态失败", response.msg);
        }
      } catch (error) {
        console.error("获取机器人实时订单状态失败", error);
      }
    };
    onActivated(() => {
      // 如果定时器已经存在，则不重复启动
      if (!intervalId) {
        intervalId = setInterval(() => {
          currentTime.value = getCurrentTime();
        }, 1000);
      }
      getRobotPosition();
      getRobotRealTimeStatus();
      getRealTimeOrderState();
    });
    //待对接（设置请求的周期）
    onMounted(() => {
      // 组件挂载后立即执行一次请求
      getRobotPosition();
      getRobotRealTimeStatus();
      getRealTimeOrderState();
    });
    onDeactivated(() => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    });
    onUnmounted(() => {
      if (intervalId.value) {
        clearInterval(intervalId.value);
        intervalId.value = null;
      }
    });
    return {
      orderList,
      robotId,
      realtimeStatus,
      colorStyle,
      powerLength,
      robotPosition,
      robotVelocity,
      stateForm,
      currentTime,
    };
  },
};
</script>

<style scoped>
.iframe-container {
  position: absolute;
  top: 15px;
  left: 20px;
  width: 716px;
  height: 520px;
  border-radius: 4px;
  border: none;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-detailed-onformation-grid {
  display: grid;
  grid-template-columns: 384px 785px;
  grid-template-rows: 20px;
  gap: 30px 20px;
  grid-template-areas: "crumbs return-icon-box";
}
.realtime-status-display {
  width: 1189px;
  height: 600px;
  background-color: transparent;
  border-radius: 16px;
  position: relative;
  top: 30px;
}
.first-sight-header {
  width: 929px;
  height: 48px;
  background-color: white;
  display: flex;
  align-items: center;
  position: absolute;
  border: none;
  top: 0px;
  left: 0px;
  border-radius: 8px 8px 0px 0px;
}
.first-sight-content {
  position: absolute;
  width: 929px;
  height: 550px;
  left: 0px;
  top: 50.5px;
  background-color: white;
  border-radius: 0px 0px 8px 8px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.real-time-status-box {
  position: absolute;
  width: 409px;
  height: 160px;
  border-radius: 8px;
  background-color: #409eff;
  left: 780px;
  border: none;
  top: 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.real-time-status-box h1 {
  color: #606266;
  font-weight: 500;
}
.real-time-status-list {
  position: absolute;
  width: 409px;
  height: 415px;
  border-radius: 8px;
  background-color: white;
  left: 780px;
  border: none;
  top: 185px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.list {
  height: 335px;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: auto;
}
.list .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-radius: 2px;
  background: var(--el-color-primary-light-9);
  margin: 5px 0; /* 上下边距各 10px */
  color: var(--el-color-primary);
  border-radius: 5px;
}
.state-card {
  height: 50px;
  width: 180px;
  position: absolute;
  border-radius: 4px;
  display: flex;
  align-items: center;
  border: 2px solid white;
}
.state-card .iconfont {
  color: white;
  margin-left: 5px;
}
.state-card h1 {
  color: white;
}
.power-situation-box {
  position: absolute;
  height: 60px;
  width: 370px;
  top: 85px;
  left: 20px;
}
.state-station {
  position: absolute;
  width: 240px;
  right: 0px;
  height: 600px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
</style>
