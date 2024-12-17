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


          <div class="cabinet-layout">
            <div class="cabinet-grid">
              <div class="cabinet-section small-section">
                <div class="cabinet small" v-for="i in 72" :key="i" :class="getCabinetStatusClass(cabs.small[i-1]?.status)">
                  <el-tooltip 
                    v-if="cabs.small[i-1]"
                    effect="light" 
                    placement="top">
                    <template #content >
                      <div class="cabinet-tooltip-content">
                        货柜号：{{ cabs.small[i-1].cabinetId }}<br>
                        入柜时间：{{ cabs.small[i-1].inTime }}<br>
                        包裹号：{{ cabs.small[i-1].packageId }}<br>
                        包裹类型：{{ cabs.small[i-1].packageType }}<br>
                        状态：{{ status2Text(cabs.small[i-1].status) }}<br>
                        尺寸：小
                      </div>
                    </template>
                    <div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;">
                      <span class="cabinet-number">{{i}}</span>
                    </div>
                  </el-tooltip>
                </div>
              </div>
              <div class="cabinet-section mid-section">
                <div class="cabinet mid" v-for="i in 24" :key="i" :class="getCabinetStatusClass(cabs.medium[i-1]?.status)">
                  <el-tooltip 
                    v-if="cabs.medium[i-1]"
                    effect="light"  
                    placement="top" >
                    <template #content >
                      <div class="cabinet-tooltip-content">
                        货柜号：{{ cabs.medium[i-1].cabinetId }}<br>
                        入柜时间：{{ cabs.medium[i-1].inTime }}<br>
                        包裹号：{{ cabs.medium[i-1].packageId }}<br>
                        包裹类型：{{ cabs.medium[i-1].packageType }}<br>
                        状态：{{ status2Text(cabs.medium[i-1].status)  }}<br>
                        尺寸：小
                      </div>
                    </template>
                    <div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;">
                      <span class="cabinet-number">{{i}}</span>
                    </div>
                  </el-tooltip>
                </div>
              </div>
              <div class="cabinet-section big-section">
                <div class="cabinet big" v-for="i in 8" :key="i" :class="getCabinetStatusClass(cabs.large[i-1]?.status)">
                  <el-tooltip 
                    v-if="cabs.large[i-1]"
                    effect="light" 
                    placement="top">
                    <template #content >
                      <div class="cabinet-tooltip-content">
                        货柜号：{{ cabs.large[i-1].cabinetId }}<br>
                        入柜时间：{{ cabs.large[i-1].inTime }}<br>
                        包裹号：{{ cabs.large[i-1].packageId }}<br>
                        包裹类型：{{ cabs.large[i-1].packageType }}<br>
                        状态：{{ status2Text(cabs.large[i-1].status) }}<br>
                        尺寸：小
                      </div>
                    </template>
                    <div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;">
                      <span class="cabinet-number">{{i}}</span>
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </div>
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
import { computed, onMounted, ref} from "vue";
import { useRoute } from "vue-router";
import api from "../../api/index";
import { ElNotification } from "element-plus";
import * as XLSX from "xlsx";
// import { ca, pa } from "element-plus/es/locale";
export default {
  components: {
    BreadCrumbs,
    ReturnIcon,
  },
  setup() {
    const route = useRoute();
    const siteId = ref(null);
    siteId.value = route.params.siteId;
    console.log('siteId:',siteId.value);
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
          siteId: parseInt(route.params.stationId, 10),
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

    const cabs = ref({
      small: [],
      medium: [],
      large: []
    });


    const isLoaded = ref(false);
    const getAllCabinets = async () => {
      try {
        const params = {
          siteId: parseInt(route.params.stationId),
        }
        console.log('请求参数:', params);  // 检查参数

        const respone = await api.getSiteCabinet(params)
        console.log('API响应:', respone);  // 检查响应

        if (respone.code == 15091) {
          cabs.value = respone.data
          console.log('设置后的cabs:', cabs.value);  // 检查设置后的值
          console.log('设置后的cabs.small:', cabs.value.small[0]);  // 检查设置后的值
          isLoaded.value = true;
        } else {
          console.error('获得货柜地图失败', respone.msg)
        }
      } catch(error) {
        console.error('获得货柜地图失败', error)
      }
    }

    const getCabinetStatusClass = (status) => {
      switch(status) {
        case 'available':
          return 'cabinet-available';
        case 'occupied':
          return 'cabinet-occupied';
        case 'timeout':
          return 'cabinet-timeout';
        default:
          return '';
      }
    }
    const status2Text = (status) => {
      switch(status) {
        case 'available':
          return '空闲';
        case 'occupied':
          return '占用';
        case 'timeout':
          return '超时';
        default:
          return '';
      }
    }



    onMounted(() => {
      console.log("mounted");
      getCabinetPageTable();
      getStationDetailedInformation();
      getAllCabinets();
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
      cabs,
      isLoaded,
      getCabinetStatusClass,
      status2Text
    };
  },
};
</script>

<style scoped>
.cabinet-layout {
  width: 100%;
  height: 100%;

  background-color: #f5f7fa;
  border-radius: 8px;
  overflow: auto;
}

.cabinet-grid {
  display: grid;
  grid-template-columns: 5fr 3fr 2fr;
  gap: 15px;
  height: 100%;
}

.cabinet-section {
  display: grid;
  gap: 5px;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  align-content: start;
}

.small-section {
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(8, 1fr);
}

.mid-section {
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
}

.big-section {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
}

.cabinet {
  aspect-ratio: 1;
  background: white;
  border: 1px solid #e4e7ed;
  /* border: 1px solid black; */

  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  cursor: pointer;
}

.cabinet:hover {
  transform: translateY(-2px);
  border-color: #409EFF;
  box-shadow: 0 2px 8px rgba(64,158,255,0.15);
}

.cabinet.small {
  background-color: #f0f9ff;
  width: 36px;
  height: 36px;
}

.cabinet.mid {
  background-color: #f0f7ff;
  width: 50px;
  height: 50px;
}

.cabinet.big {
  background-color: #ecf5ff;
  width: 60px;
  height: 85px;
}

/* .cabinet-number {
  font-size: 12px;
  font-weight: 500;
  color: #409EFF;
} */

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


.cabinet-tooltip-content {
  font-size: 14px;
  color: #333;
  line-height: 1.8;
  padding: 5px 0;
  font-weight: normal;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  
}

/* 空闲状态 */
.cabinet-available {
  background-color: #f0f9eb !important;  /* 浅绿色 */
  border: 1px solid #67c23a !important;
  font-size: 12px;
  font-weight: 500;
  color: #409EFF;
}

/* 占用状态 */
.cabinet-occupied {
  background-color: #ecf5ff !important;  /* 浅蓝色背景 */
  border: 1px solid #409EFF !important;  /* 深蓝色边框 */

  font-size: 12px;
  font-weight: 500;
  color: #409EFF;
}

/* 超时状态 */
.cabinet-timeout {

  background-color: #fef0f0 !important;  /* 浅红色 */
  border: 1px solid #f56c6c !important;
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important; */
  font-size: 12px;
  font-weight: 500;
  color: #409EFF;
}

</style>


