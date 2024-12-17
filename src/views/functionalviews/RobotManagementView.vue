<template>
  <div>
    <div class="management-grid">
      <BreadCrumbs :path1="'机器人管理'" :path2="'查看机器人'" style="grid-area: crumbs" />
      <div class="filtrate-header" style="grid-area: form-filter">
        <h2 class="filtrate-header-subfield-1">所属站点</h2>
        <el-select v-model="selectedBelongStation" placeholder="Select" size="large" style="width: 240px; border: none" class="filtrate-header-selector-1">
          <el-option v-for="item in belongStations" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <h2 class="filtrate-header-subfield-2">当前状态</h2>
        <el-select v-model="selectedOperatingState" placeholder="Select" size="large" style="width: 240px; border: none" class="filtrate-header-selector-2">
          <el-option v-for="item in operatingStates" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <button class="filtrate-header-button" @click="getFilteredRobotPageTable">筛选</button>
      </div>
      <TransferCard
        :field1="'总配备机器人数量'"
        :statistics1="totalRobotCount"
        :field2="'维护信息'"
        :color="'#02A7F0'"
        :buttonColor="'rgba(0, 0, 255, 0.32)'"
        :iconClass="'icon-weixiu2'"
        :link="'/admin/robots/maintenance'"
        style="grid-area: transefer-card"
      />
    </div>
    <div style="width: 1189px; height: 660px; margin-top: 30px">
      <div style="grid-area: robot-form" class="robot-form">
        <el-table :data="currentPageData" ref="tableRef" style="width: 100%; border-top-left-radius: 8px; border-top-right-radius: 8px" row-style="height:56px;">
          <el-table-column prop="robotId" label="机器人编号" align="center" :formatter="formatRobotId"></el-table-column>
          <el-table-column prop="station" label="所属站点" align="center"></el-table-column>
          <!-- <el-table-column prop="state" label="当前状态" align="center"></el-table-column> -->
          <el-table-column label="当前状态" align="center" width="120" style="padding: none">
            <template v-slot:default="scope">
              <!-- <div style="height: 34px; display: flex; align-items: center; justify-content: center">
                <i class="iconfont icon-dingwei" style="font-size: 24px; color: #03bf16" @click="handleCheckRobotPosition(scope.row.robotId)"></i>
              </div> -->
              <button v-show="scope.row.state === '待维护'" style="border: none; background-color: transparent; color: #f56c6c; font-size: 17px" @click="openRepairRobotDialog(scope.row.robotId)">
                维修
              </button>
              <span v-show="scope.row.state !== '待维护'">{{ scope.row.state }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="leftEnergy" label="剩余电量" align="center"></el-table-column>
          <el-table-column label="当前位置" align="center" width="180" style="padding: none">
            <template v-slot:default="scope">
              <div style="height: 34px; display: flex; align-items: center; justify-content: center">
                <i class="iconfont icon-dingwei" style="font-size: 24px; color: #03bf16" @click="handleCheckRobotPosition(scope.row.robotId, scope.row.state)"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderNumber" label="配送订单数" align="center"></el-table-column>
          <el-table-column label="实时状态" align="center" width="180">
            <template v-slot:default="scope">
              <el-button size="default" @click="handleCheckRobotState(scope.row.robotId, scope.row.state)" style="background-color: transparent; color: #03bf16; border: none; font-size: 18px"
                >查看机器人</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div
          style="
            height: 55px;
            display: flex;
            justify-content: right;
            background-color: white;
            width: 100%;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
          "
        >
          <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :size="'default'"
            :disabled="false"
            :background="false"
            layout="total, prev, pager, next"
            :total="totalItems"
            @current-change="handleCurrentChange"
          />
          <!-- total需要通过请求获取 -->
        </div>
      </div>
    </div>
    <el-dialog
      v-model="repairRobotDialogVisibility"
      title=""
      width="400"
      :before-close="handleClose"
      :show-close="false"
      :close-on-click-modal="false"
      style="height: 200px; display: flex; justify-content: center"
    >
      <div style="position: absolute; width: 400px; height: 50px; top: 10px; left: 0px; display: flex; justify-content: center">
        <h1 style="font-size: 18px; color: #294567">维修机器人</h1>
      </div>
      <div style="position: absolute; width: 400px; height: 50px; top: 60px; left: 0px; display: flex; justify-content: center">
        <h1 style="font-size: 18px; color: #294567; font-weight: 500">{{ selectedRobotId }}号机器人{{ robotRepairType }}部位损坏</h1>
      </div>
      <div style="position: absolute; width: 400px; height: 50px; top: 140px; left: 0px">
        <el-button @click="cancleRepair" style="margin-right: 30px">取消</el-button>
        <el-button type="primary" @click="getRobotRepaired" style="margin-left: 30px">维修</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TransferCard from "../../components/TransferCard.vue";
import BreadCrumbs from "../../components/BreadCrumbs.vue";
import api from "../../api/index";
import { useRouter } from "vue-router";
import { ref, onMounted, onActivated, nextTick } from "vue";
import { ElNotification } from "element-plus";
export default {
  components: {
    TransferCard,
    BreadCrumbs,
  },
  setup() {
    const tableRef = ref(null);
    const router = useRouter();
    //总机器人数
    const totalRobotCount = ref("");
    //总数据大小
    const totalItems = ref(100);
    //当前页
    const currentPage = ref(1);
    //页面大小
    const pageSize = ref(10);
    //所属站点列表
    const belongStations = ref([
      {
        value: "全部",
        label: "全部",
      },
      {
        value: "三区十九栋",
        label: "三区十九栋",
      },
      {
        value: "夏雪儿",
        label: "夏雪儿",
      },
      {
        value: "乐尔乐",
        label: "乐尔乐",
      },
    ]);
    //选择的站点
    const selectedBelongStation = ref("全部");
    //选择机器人的id
    const selectedRobotId = ref(0);
    //机器人损坏的部位
    const robotRepairType = ref("");
    const robotRepairPartId = ref(0);

    const repairRobotDialogVisibility = ref(false);
    //机器人状态列表
    const operatingStates = ref([
      {
        value: "全部",
        label: "全部",
      },
      {
        value: "idle",
        label: "空闲",
      },
      {
        value: "busy",
        label: "忙碌",
      },
      {
        value: "maintenance",
        label: "待维护",
      },
    ]);
    //选择的运行状态
    const selectedOperatingState = ref("全部");
    //获取当前页的数据
    const currentPageData = ref([
      {
        robotId: 2345,
      },
    ]);
    //获取头部卡片总机器人数
    const getTotalRobotCount = async () => {
      try {
        const response = await api.getTotalRobotCount();
        // ;
        if (response.code === 14011) {
          totalRobotCount.value = response.data.totalRobotCount.toString();
        } else {
          console.error("配置机器人总数请求失败", response.msg);
        }
      } catch (error) {
        console.error("配置机器人总数请求失败", error);
      }
    };
    //点击查看机器人位置跳转实时路径图
    const handleCheckRobotPosition = (robotId , state) => {
      router.push({ path: `/admin/robots/${robotId}/route` });
      sessionStorage.setItem("robotState", state);
      console.log('set seesion roboState', sessionStorage.getItem('robotState'));
    };
    //点击查看机器人状态跳转机器人状态
    const handleCheckRobotState = (robotId, state) => {
      if (state === "忙碌") {
        router.push({ path: `/admin/robots/${robotId}/state` });
      } else {
        ElNotification({
          title: "当前机器人"+state,
          message: "实时状态为"+state+"，无法查看更加详细信息",
          type: "info",
        });
      }
    };
    //切换当前页
    const handleCurrentChange = (val) => {
      currentPage.value = val; // 更新当前页码
      getRobotPageTable();
    };
    //获取机器人后端分页数据
    const getRobotPageTable = async () => {
      try {
        const params = {
          belongStation: selectedBelongStation.value,
          operatingState: selectedOperatingState.value,
          currentPage: currentPage.value,
          pageSize: 10,
        };
        const response = await api.getRobotPageTable(params);
        if (response.code === 14051) {
          currentPageData.value = response.data.pageData;
          totalItems.value = response.data.totalItems;
          for (let i = 0; i < currentPageData.value.length; i++) {
            if (currentPageData.value[i].state === "busy") {
              currentPageData.value[i].state = "忙碌";
            } else if (currentPageData.value[i].state === "maintenance") {
              currentPageData.value[i].state = "待维护";
            } else {
              currentPageData.value[i].state = "空闲";
            }
          }
        } else {
          console.error("获取机器人列表失败", response.msg);
        }
      } catch (error) {
        console.error("获取机器人列表失败", error);
      }
    };
    const getFilteredRobotPageTable = async()=>{
      currentPage.value = 1;
      try {
        const params = {
          belongStation: selectedBelongStation.value,
          operatingState: selectedOperatingState.value,
          currentPage: currentPage.value,
          pageSize: 10,
        };
        const response = await api.getRobotPageTable(params);
        if (response.code === 14051) {
          currentPageData.value = response.data.pageData;
          totalItems.value = response.data.totalItems;
          for (let i = 0; i < currentPageData.value.length; i++) {
            if (currentPageData.value[i].state === "busy") {
              currentPageData.value[i].state = "忙碌";
            } else if (currentPageData.value[i].state === "maintenance") {
              currentPageData.value[i].state = "待维护";
            } else {
              currentPageData.value[i].state = "空闲";
            }
          }
        } else {
          console.error("获取机器人列表失败", response.msg);
        }
      } catch (error) {
        console.error("获取机器人列表失败", error);
      }
    }
    const formatRobotId = (row, column, cellValue) => {
      // 确保 cellValue 是字符串
      let value = String(cellValue);
      // 如果长度不足 15 位，在前面补零
      while (value.length < 7) {
        value = "0" + value;
      }
      value = "ROID" + value;
      return value;
    };
    //获取机器人所属站点列表(待对接)
    const getBelongStationList = async () => {
      try {
        const response = await api.getBelongStationList();
        if (response.code === 14061) {
          belongStations.value = [
            {
              value: "全部",
              label: "全部",
            },
          ];
          // console.log(response.data.stationList.length);
          for (let i = 0; i < response.data.stationList.length; i++) {
            let stationName = response.data.stationList[i];
            belongStations.value.push({
              value: stationName,
              label: stationName,
            });
          }
        } else {
          console.error("获取站点列表失败", response.msg);
        }
      } catch (error) {
        console.error("获取站点列表失败", error);
      }
    };

    const getRobotRepaired = async () => {
      try {
        const params = {
          robotId: parseInt(selectedRobotId.value, 10),
          partId: robotRepairPartId.value,
        };
        console.log(params);
        const response = await api.getRobotRepaired(params);
        console.log(response);
        if (response.code === 14131) {
          ElNotification({
            title: "维修成功",
            message: "机器人" + selectedRobotId.value + "号已维修",
            type: "success",
          });
          selectedRobotId.value = 0;
          robotRepairType.value = "";
          robotRepairPartId.value = 0;
          repairRobotDialogVisibility.value = false;
          await getRobotPageTable();
        } else {
          console.error("获取机器人损坏情况失败", response.msg);
        }
      } catch (error) {
        console.error("获取机器人损坏情况失败", error);
      }
    };
    const openRepairRobotDialog = (robotId) => {
      repairRobotDialogVisibility.value = true;
      selectedRobotId.value = robotId;
      getRobotRepairType();
    };
    const getRobotRepairType = async () => {
      try {
        const params = {
          robotId: parseInt(selectedRobotId.value, 10),
        };
        const response = await api.getRobotRepairType(params);
        if (response.code === 14121) {
          robotRepairType.value = response.data.part_name;
          robotRepairPartId.value = response.data.repair_sparepart_id;
        } else {
          console.error("获取机器人损坏情况失败", response.msg);
        }
      } catch (error) {
        console.error("获取机器人损坏情况失败", error);
      }
    };
    const cancleRepair = () => {
      selectedRobotId.value = 0;
      repairRobotDialogVisibility.value = false;
      robotRepairType.value = "";
      robotRepairPartId.value = 0;
    };
    //返回
    onMounted(() => {
      nextTick(() => {
        tableRef.value?.doLayout();
      });
      getTotalRobotCount();
      getRobotPageTable();
      getBelongStationList();
    });
    onActivated(() => {
      nextTick(() => {
        tableRef.value?.doLayout();
      });
    });
    return {
      tableRef,
      totalRobotCount,
      currentPage,
      pageSize,
      currentPageData,
      totalItems,
      belongStations,
      selectedBelongStation,
      operatingStates,
      selectedOperatingState,
      formatRobotId,
      selectedRobotId,
      getRobotRepairType,
      robotRepairType,
      repairRobotDialogVisibility,
      openRepairRobotDialog,
      getRobotRepaired,
      cancleRepair,
      handleCheckRobotPosition,
      handleCheckRobotState,
      handleCurrentChange,
      getRobotPageTable,
      getFilteredRobotPageTable,
    };
  },
};
</script>

<style scoped>
@import "../../styles/filterstyle.css";
.management-grid {
  display: grid;
  grid-template-columns: 384px 785px;
  grid-template-rows: 20px 145px;
  gap: 30px 20px;
  grid-template-areas:
    "crumbs return-icon"
    "transefer-card form-filter";
}

.robot-form {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
</style>
