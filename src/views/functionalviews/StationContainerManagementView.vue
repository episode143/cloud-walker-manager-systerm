<template>
  <div>
    <div class="user-detailed-onformation-grid">
      <BreadCrumbs :path1="'站点管理'" :path2="'货柜管理'" style="grid-area: crumbs" />
      <div style="width: 786px; height: 50px; display: flex; justify-content: right; grid-area: return-icon-box">
        <ReturnIcon :link="'/admin/stations/management'" />
      </div>
    </div>
    <div class="station-operating-robot-map-container">
      <div class="station-operating-robot-map" style="grid-area: map">
        <span style="font-weight: 550; color: #294567; font-size: 20px; position: absolute; top: 15px; left: 35px">当前站点</span>
        <span style="font-weight: 550; color: #0482ff; font-size: 20px; position: absolute; top: 15px; left: 135px">{{ operatingStatus.siteName }}</span>
        <div></div>
        <div style="position: absolute; left: 35px; top: 52px; width: 790px; height: 345px; background-color: rgb(235.9, 245.3, 255); border-radius: 4px">
          <br />
          <br />
          <br />
          <h1>货柜分布地图</h1>
          <h1>规格：高345px 宽790px</h1>
        </div>
      </div>
      <div class="station-operating-robot-displayer" style="grid-area: display-station">
        <span style="top: 30px; font-weight: 550">超时亟待清理货柜数</span>
        <span style="top: 70px">{{ operatingStatus.overTimeCount }}</span>
        <el-tooltip content="清除并打印表单" placement="top" effect="light">
          <button class="displayer-function-button" style="top: 35px; left: 232px" @click="openClearUpDialog">
            <i class="iconfont icon-yijianqingli" style="font-size: 30px"></i>
          </button>
        </el-tooltip>
        <span style="top: 125px; font-weight: 550">本月总存取次数</span>
        <span style="top: 165px">{{ operatingStatus.monthlyWithdrawalCount }}次</span>
        <el-tooltip content="新增货柜" placement="top" effect="light">
          <button class="displayer-function-button" style="top: 135px; left: 232px">
            <i class="iconfont icon-chakanhuogui" style="font-size: 30px; margin-left: 4px"></i>
          </button>
        </el-tooltip>
        <span style="top: 220px; font-weight: 550">本月日均存取次数</span>
        <span style="top: 260px">{{ averageDailyWithdrawTimes }}次</span>
        <span style="top: 315px; font-weight: 550">当前货柜容量情况</span>
        <span style="top: 355px">{{ operatingStatus.currentDepositionCount }}/{{ operatingStatus.totalCabinetCount }}</span>
      </div>
    </div>

    <div class="list-filtration-box">
      <span style="left: 35px">货柜状态</span>
      <el-select v-model="selectedContainerState" placeholder="Select" size="large" style="width: 240px; border: none; position: absolute; top: 75px; left: 35px" class="filtrate-header-selector-2">
        <el-option v-for="item in containerStates" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <span style="left: 370px">货柜大小</span>
      <el-select v-model="selectedContainerSize" placeholder="Select" size="large" style="width: 240px; border: none; position: absolute; top: 75px; left: 370px" class="filtrate-header-selector-2">
        <el-option v-for="item in containerSizes" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <span style="left: 705px">包裹类型</span>
      <el-select v-model="selectedPackageType" placeholder="Select" size="large" style="width: 240px; border: none; position: absolute; top: 75px; left: 705px" class="filtrate-header-selector-2">
        <el-option v-for="item in packageTypes" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <button class="filtrate-header-button" style="top: 75px; left: 1050px" @click="getCabinetPageTable">筛选</button>
    </div>

    <div style="width: 1189px; height: 660px; margin-top: 30px">
      <el-table :data="currentPageData" style="width: 100%; border-top-left-radius: 8px; border-top-right-radius: 8px" row-style="height:56px;">
        <el-table-column prop="avatar" label="" align="center" width="100">
          <template v-slot:default="scope">
            <div class="icon-center">
              <div class="icon-inner-box" :style="getPackageIconStyle(scope.row.packageType)">
                <i class="iconfont" :class="getPackageIconClass(scope.row.packageType)" style="font-size: 20px">{{ scope.row.id }}</i>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cabinetId" label="货柜号" align="center"></el-table-column>
        <el-table-column prop="inTime" label="货物存入时间" align="center"></el-table-column>
        <el-table-column prop="status" label="货柜状态" align="center"></el-table-column>
        <el-table-column prop="cabinetSize" label="货柜尺寸" align="center"></el-table-column>
        <el-table-column prop="packageId" label="包裹号" align="center"></el-table-column>
        <el-table-column prop="packageType" label="包裹类型" align="center"></el-table-column>
      </el-table>
      <div
        style="
          height: 55px;
          display: flex;
          justify-content: right;
          background-color: white;
          width: 100;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        "
      >
        <el-pagination
          :current-page="currentPage"
          :page-size="10"
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
    v-model="clearupDialogVisibility"
    title=""
    width="400"
    :before-close="handleClose"
    :show-close="false"
    :close-on-click-modal="false"
    style="height: 200px; display: flex; justify-content: center"
  >
    <div style="position: absolute; width: 400px; height: 50px; top: 10px; left: 0px; display: flex; justify-content: center">
      <h1 style="font-size: 18px; color: #294567">一键清理</h1>
    </div>
    <div style="position: absolute; width: 400px; height: 50px; top: 60px; left: 0px; display: flex; justify-content: center">
      <h1 style="font-size: 18px; color: #294567; font-weight: 500">当前站点滞留超时货柜较多，确定一键清理？</h1>
    </div>
    <div style="position: absolute; width: 400px; height: 50px; top: 140px; left: 0px">
      <el-button @click="cancleClearUp" style="margin-right: 30px">取消</el-button>
      <el-button type="primary" @click="confirmClearUp" style="margin-left: 30px">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import BreadCrumbs from "../../components/BreadCrumbs.vue";
import ReturnIcon from "../../components/ReturnIcon.vue";
import { computed, onMounted, ref,onActivated} from "vue";
import { useRoute } from "vue-router";
import api from "../../api/index";
import { ElNotification } from "element-plus";
import * as XLSX from "xlsx";
export default {
  components: {
    BreadCrumbs,
    ReturnIcon,
  },
  setup() {
    const route = useRoute();
    const clearupDialogVisibility = ref(false);
    const operatingStatus = ref({});
    const averageDailyWithdrawTimes = computed(() => {
      if (operatingStatus.value) {
        const today = new Date();
        return operatingStatus.value.monthlyWithdrawalCount / today.getDate();
      } else {
        return 0;
      }
    });
    const currentPageData = ref([
      {
        type: "其它",
      },
      {
        type: "快递",
      },
      {
        type: "外卖",
      },
      {
        type: "蛋糕",
      },
      {
        type: "鲜花",
      },

      {
        userId: "1",
      },
      {
        userId: "1",
      },
      {
        userId: "1",
      },
      {
        userId: "1",
      },
      {
        userId: "1",
      },
    ]);
    const currentPage = ref(1);
    const totalItems = ref(100);
    const containerStates = ref([
      {
        value: "全部",
        label: "全部",
      },
      {
        value: "available",
        label: "空闲",
      },
      {
        value: "occupied",
        label: "占用",
      },
      {
        value: "timeout",
        label: "超时",
      },
    ]);
    const selectedContainerState = ref("全部");
    const containerSizes = ref([
      {
        value: "全部",
        label: "全部",
      },
      {
        value: "大",
        label: "大型",
      },
      {
        value: "中",
        label: "中型",
      },
      {
        value: "小",
        label: "小型",
      },
    ]);
    const selectedContainerSize = ref("全部");
    const packageTypes = ref([
      {
        value: "全部",
        label: "全部",
      },
      {
        value: "快递",
        label: "快递",
      },
      {
        value: "外卖",
        label: "外卖",
      },
      {
        value: "鲜花",
        label: "鲜花",
      },
      {
        value: "蛋糕",
        label: "蛋糕",
      },
      {
        value: "其它",
        label: "其它",
      },
    ]);
    const selectedPackageType = ref("全部");
    const getPackageIconClass = (type) => {
      if (type === "其他") {
        return "icon-qita";
      } else if (type === "快递") {
        return "icon-huowu";
      } else if (type === "外卖") {
        return "icon-xiaochikuaican";
      } else if (type === "鲜花") {
        return "icon-meigui";
      } else if (type === "蛋糕") {
        return "icon-dangao";
      } else {
        return "icon-kongxian";
      }
    };
    const getPackageIconStyle = (type) => {
      if (type === "其他") {
        return "background-color: #909399";
      } else if (type === "快递") {
        return "background-color: #e60033";
      } else if (type === "外卖") {
        return "background-color: #ffd900";
      } else if (type === "鲜花") {
        return "background-color: #F56C6C";
      } else if (type === "蛋糕") {
        return "background-color: #ec6800";
      } else {
        return "background-color: #409EFF";
      }
    };
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`);
      currentPage.value = val; // 更新 currentPage 的值
      getCabinetPageTable();
    };
    const clearUpOvertimeContainer = async () => {
      try {
        const response = await api.clearUpOvertimeContainers(route.params.siteId);
        if (response.code === 15071) {
          console.log(response.data.pageData);
        } else {
          console.error("一键清理超时货柜失败", response.msg);
        }
      } catch (error) {
        console.error("一键清理超时货柜失败", error);
      }
    };
    const getCabinetPageTable = async () => {
      try {
        const params = {
          currentPage: currentPage.value,
          pageSize: 10,
          siteId: parseInt(route.params.stationId,10),
          status: selectedContainerState.value,
          cabinetType: selectedContainerSize.value,
          packageType: selectedPackageType.value,
        };
        const response = await api.getCabinetPageTable(params);
        if (response.code === 15051) {
          currentPageData.value = response.data.pageData;
          totalItems.value = response.data.totalCount;
          for (let i = 0; i < currentPageData.value.length; i++) {
            if (!currentPageData.value[i].packageType) {
              currentPageData.value[i].packageType = "无包裹";
            }
          }
        } else {
          console.error("获取货柜列表失败", response.msg);
        }
      } catch (error) {
        console.error("获取货柜列表失败", error);
      }
    };
    const getStationDetailedInformation = async () => {
      try {
        const params = {
          siteId: parseInt(route.params.stationId, 10),
        };
        console.log("站点详细信息测试");
        console.log(params);
        const response = await api.getStationDetailedInformation(params);
        if (response.code === 15071) {
          operatingStatus.value = response.data;
          console.log(response);
        } else {
          console.error("获取站点详细信息失败", response.msg);
        }
      } catch (error) {
        console.error("获取站点详细信息失败", error);
      }
    };
    const openClearUpDialog = () => {
      clearupDialogVisibility.value = true;
    };
    const cancleClearUp = () => {
      clearupDialogVisibility.value = false;
    };
    const confirmClearUp = async () => {
      try {
        clearupDialogVisibility.value = false;
        const params = {
          siteId: parseInt(route.params.stationId, 10),
        };
        const response = await api.clearUpOvertimeContainers(params);
        if (response.code === 15081) {
          if (response.data.pageData.length === 0) {
            ElNotification({
              title: "本站点无超时货柜",
              message: "",
              type: "success",
            });
            return;
          }
          ElNotification({
            title: "一键清除成功",
            message: "正在生成清理货柜单...",
            type: "success",
          });
          // 定义表头
          const headers = ["货柜号", "包裹号", "存入时间", "货物类别", "转移地址"];
          // 定义数据
          const data = response.data.pageData;
          // 将对象数组转换为二维数组
          const aoaData = [headers, ...data.map((item) => [item.containerId,item.packageId, item.depositTime, item.type, item.destination])];

          // 创建工作簿和工作表
          const ws = XLSX.utils.aoa_to_sheet(aoaData);
          const colWidths = [
            { wch: 20 }, // 第一列（货柜号）两格宽
            { wch: 20 },
            { wch: 20 }, // 第二列（存入时间）一格宽
            { wch: 10 }, // 第三列（货物类别）一格宽
            { wch: 20 }, // 第四列（转移地址）两格宽
          ];
          ws["!cols"] = colWidths; // 应用列宽设置
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "超时货柜清理表单");

          // 获取当前日期并格式化
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, "0");
          const day = String(currentDate.getDate()).padStart(2, "0");
          const formattedDate = `${year}-${month}-${day}`;
          const stationName = operatingStatus.value.siteName;
          //console.log(stationName);
          // 生成 Excel 文件
          const fileName = `${formattedDate}-${stationName}-超时货柜清理表单.xlsx`;
          XLSX.writeFile(wb, fileName);
        } else {
          console.error("一键清理超时货柜失败", response.msg);
        }
      } catch (error) {
        console.error("一键清理超时货柜失败", error);
      }
    };
    onActivated(()=>{
      getCabinetPageTable();
      getStationDetailedInformation();
    });
    onMounted(() => {
      getCabinetPageTable();
      getStationDetailedInformation();
    });
    return {
      clearupDialogVisibility,
      operatingStatus,
      currentPageData,
      currentPage,
      totalItems,
      containerStates,
      selectedContainerState,
      containerSizes,
      selectedContainerSize,
      packageTypes,
      selectedPackageType,
      averageDailyWithdrawTimes,
      clearUpOvertimeContainer,
      cancleClearUp,
      confirmClearUp,
      openClearUpDialog,
      getPackageIconClass,
      getPackageIconStyle,
      handleCurrentChange,
      getCabinetPageTable,
    };
  },
};
</script>

<style scoped>
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
}
.real-time-status-box {
  position: absolute;
  width: 409px;
  height: 160px;
  border-radius: 8px;
  background-color: white;
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

<style scoped>
.station-operating-robot-map-container {
  width: 1189px;
  height: 425px;
  border-radius: 8px;
  background-color: transparent;
  margin-top: 30px;
  display: grid;
  grid-template-columns: 5fr 1.8fr;
  grid-template-rows: 425px;
  gap: 0px 20px;
  grid-template-areas: "map display-station";
  position: relative;
}
.station-operating-robot-map {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  background-color: white;
  position: absolute;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.station-operating-robot-displayer {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  /* background-image: linear-gradient(45deg, #409EFF,rgb(121.3, 187.1, 255)); */
  background-color: #409eff;
  position: absolute;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.station-operating-robot-displayer span {
  font-size: 20px;
  color: white;
  position: absolute;
  left: 25px;
}
.list-filtration-box {
  width: 1189px;
  height: 145px;
  margin-top: 30px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}
.list-filtration-box span {
  position: absolute;
  top: 22px;
  font-size: 20px;
  color: #294567;
}
.displayer-function-button {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: rgb(27, 137, 255, 192);
  border: 3px solid white;
  position: absolute;
  display: flex;
  justify-content: center;
  color: white;
  align-items: center;
}
.filtrate-header-button {
  position: absolute;
  height: 39px;
  width: 100px;
  background-color: #409eff;
  border-width: 0px;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 500;
  color: white;
}
.icon-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 确保高度占满整个单元格 */
}
.icon-inner-box {
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background-color: #409eff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style scoped>
.spanicon {
  display: inline-block; /* 确保 span 元素可以应用旋转效果 */
  transition: transform 0.3s ease-in-out; /* 平滑过渡效果 */
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spanicon:hover {
  animation: rotate 1s linear infinite; /* 使用定义的旋转动画 */
  transform-origin: center; /* 旋转中心点为元素中心 */
}
</style>
