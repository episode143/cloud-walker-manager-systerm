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
        <h1 style="font-size: 20px; color: #294567; margin-left: 270px; font-weight: 550; font-size: 20px">{{ robotId }}号</h1>
        <h1 style="font-size: 20px; margin-left: 5px; font-weight: 550; color: #0482ff; font-size: 20px">机器人第一视角</h1>
      </div>
      <div class="first-sight-content">
        <div style="height: 96%; width: 96%;border-radius: 4px;border: 4px solid #409eff">
          <img src="http://192.168.172.236:8000/robot/video_stream" alt="机器人实时图像流" style="height: 100%; width: 100%; border-radius: 3px;" />
        </div>
      </div>

      <div class="real-time-status-box">
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
      </div>

      <div class="real-time-status-list">
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
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import BreadCrumbs from "../../components/BreadCrumbs.vue";
import ReturnIcon from "../../components/ReturnIcon.vue";
import { computed, onMounted, ref, onUnmounted } from "vue";
import api from "../../api/index";
export default {
  components: {
    BreadCrumbs,
    ReturnIcon,
  },
  setup() {
    const route = useRoute();
    const robotId = computed(() => route.params.robotId);

    // 初始化实时状态数据
    const realtimeStatus = ref({
      completeOrderNumber: 32,
      deliveryingOrderId: "O431231",
      dumpEnergy: 70,
      todayToatlMileage: 31.45,
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

    //获取机器人实时状态列表(待对接)
    const getRealTimeStatus = async () => {
      try {
        const params = {
          robotId: route.params.robotId,
        };
        const response = await api.getRealTimeStatus(params);
        if (response.code === 14071) {
          realtimeStatus.value.completeOrderNumber = response.data.todayCompleteOrderNumber;
          realtimeStatus.value.todayToatlMileage = response.data.todayTotalMileage;
          realtimeStatus.value.dumpEnergy = response.data.leftBatteryCapacity;
        } else {
          console.error("获取机器人实时状态失败", response.msg);
        }
      } catch (error) {
        console.error("获取机器人实时状态失败", error);
      }
    };
    //获取机器人实时订单列表(待对接)
    const getRealTimeOrderList = async () => {
      try {
        const params = {
          robotId: route.params.robotId,
        };
        const response = await api.getRealTimeOrderList(params);
        if (response.code === 14081) {
          orderList.value = response.data.orderList;
        } else {
          console.error("获取机器人实时任务失败", response.msg);
        }
      } catch (error) {
        console.error("获取机器人实时任务失败", error);
      }
    };

    //待对接（设置请求的周期）
    onMounted(() => {
      // 组件挂载后立即执行一次请求
      getRealTimeStatus();
      getRealTimeOrderList();
    });

    onUnmounted(() => {});
    return {
      orderList,
      robotId,
      realtimeStatus,
      colorStyle,
      powerLength,
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
  width: 756px;
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
  width: 756px;
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
</style>
