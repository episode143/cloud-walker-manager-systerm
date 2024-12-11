<template>
  <div>
    <div class="management-grid">
      <BreadCrumbs :path1="'站点管理'" :path2="'查看站点'" style="grid-area: crumbs" />
      <div class="filtrate-header" style="grid-area: form-filter">
        <h2 class="filtrate-header-subfield-1">当前营收</h2>
        <el-select v-model="selectedRevenueRange" placeholder="Select" size="large" style="width: 240px; border: none" class="filtrate-header-selector-1">
          <el-option v-for="item in revenueRanges" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <h2 class="filtrate-header-subfield-2">营业状态</h2>
        <el-select v-model="selectedOperatingState" placeholder="Select" size="large" style="width: 240px; border: none" class="filtrate-header-selector-2">
          <el-option v-for="item in operatingStates" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <button class="filtrate-header-button" @click="getStationPageTable">筛选</button>
      </div>
      <TransferCard
        :field1="'管理线下站点数'"
        :statistics1="totalStationCount"
        :field2="'站点分布'"
        :color="'#2BA245'"
        :buttonColor="'rgba(2, 110, 13, 0.63)'"
        :iconClass="'icon-ditu1'"
        :link="'/admin/stations/distribution'"
        style="grid-area: transefer-card"
      />
    </div>
    <div style="width: 1189px; height: 660px; margin-top: 30px">
      <div style="grid-area: robot-form" class="robot-form">
        <el-table :data="currentPageData" ref="tableRef" style="width: 100%; border-top-left-radius: 8px; border-top-right-radius: 8px" :row-style="{ height: '56px' }">
          <el-table-column prop="stationName" label="站点名称" align="center"></el-table-column>
          <el-table-column prop="stationPosition" label="所处位置" align="center">
            <template v-slot:default="scope">
              <el-tooltip effect="customized" :content="scope.row.stationPosition" placement="top" content-class="custom-tooltip">
                <span class="ellipsis">{{ scope.row.stationPosition }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="containerNumber" label="货柜数目" align="center"></el-table-column>
          <el-table-column prop="robotNumber" label="配置机器人数目" align="center"></el-table-column>
          <el-table-column prop="monthProfit" label="本月营收" align="center"></el-table-column>
          <el-table-column prop="state" label="当前状态" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <template v-slot:default="scope">
              <el-button size="default" @click="handleManageContainer(scope.row.siteId)" style="background-color: transparent; color: #03bf16; border: none; font-size: 18px">管理货柜</el-button>
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
  </div>
</template>

<script>
import TransferCard from "../../components/TransferCard.vue";
import BreadCrumbs from "../../components/BreadCrumbs.vue";
import api from "../../api/index";
import { useRouter } from "vue-router";
import { ref, onMounted ,onActivated ,nextTick} from "vue";

export default {
  components: {
    TransferCard,
    BreadCrumbs,
  },
  setup() {
    const tableRef = ref(null);
    const router = useRouter();
    const totalStationCount = ref("");
    const currentPage = ref(1);
    const pageSize = ref(10);
    const totalItems = ref(100); // 假设总项目数是固定的
    //营收范围
    const revenueRanges = ref([
      {
        value: -1,
        label: "全部",
      },
      {
        value: 0,
        label: "低于2000元",
      },
      {
        value: 2000,
        label: "2000-4000元",
      },
      {
        value: 4000,
        label: "4000-6000元",
      },
      {
        value: 6000,
        label: "6000-8000元",
      },
      {
        value: 8000,
        label: "8000元以上",
      },
    ]);
    //选择过滤的营收范围
    const selectedRevenueRange = ref(-1);
    //营业状态
    const operatingStates = ref([
      {
        value: "全部",
        label: "全部",
      },
      {
        value: "正常",
        label: "正常",
      },
      {
        value: "忙碌",
        label: "忙碌",
      },
    ]);
    //选择过滤的营业状态
    const selectedOperatingState = ref("默认");
    //接收到页面数据
    const currentPageData = ref([
      {
        siteId: 1,
      },
    ]);
    //获取管理总站点数
    const getTotalStationCount = async () => {
      try {
        const response = await api.getTotalStationCount();
        if (response.code === 15011) {
          totalStationCount.value = response.data.totalSiteCount.toString();
        } else {
          console.error("总站点数请求失败", response.msg);
        }
      } catch (error) {
        console.error("总站点数请求失败", error);
      }
    };
    //跳转货柜管理
    const handleManageContainer = (siteId) => {
      router.push({ path: `/admin/stations/${siteId}/container/management` });
    };
    //监听页面变化
    const handleCurrentChange = (val) => {
      currentPage.value = val; // 更新当前页码
      getStationPageTable();
    };
    //获取站点后端分页数据
    const getStationPageTable = async () => {
      try {
        const params = {
          currentPage: currentPage.value,
          pageSize: 10,
          revenueRange: selectedRevenueRange.value,
          operatingState: selectedOperatingState.value,
        };
        const response = await api.getStationPageTable(params);
        if (response.code === 15041) {
          currentPageData.value = response.data.pageData;
          totalItems.value = response.data.totalItems;
        } else {
          console.error("获取站点列表失败", response.msg);
        }
      } catch (error) {
        console.error("获取站点列表失败", error);
      }
    };

    onMounted(() => {
      nextTick(() => {
        tableRef.value.doLayout();
      });
      getTotalStationCount();
      getStationPageTable();
    });

    onActivated(() => {
      nextTick(() => {
        tableRef.value?.doLayout();
      });
    });
    //返回
    return {
      tableRef,
      totalStationCount,
      currentPageData,
      pageSize,
      totalItems,
      revenueRanges,
      selectedRevenueRange,
      operatingStates,
      selectedOperatingState,
      handleCurrentChange,
      handleManageContainer,
      getStationPageTable,
    };
  },
};
</script>
<style scoped>
@import "../../styles/filterstyle.css";
.flex-container {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

/* 如果需要进一步调整布局 */
@media (max-width: 1200px) {
  .flex-container {
    flex-wrap: wrap;
  }
}
.management-grid {
  display: grid;
  grid-template-columns: 384px 785px;
  grid-template-rows: 20px 145px;
  gap: 30px 20px;
  grid-template-areas:
    "crumbs return-icon"
    "transefer-card form-filter";
}
.ellipsis {
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
