<template>
  <div>
    <div class="management-grid">
      <BreadCrumbs :path1="'订单管理'" :path2="'查看订单'" style="grid-area: crumbs" />
      <div class="filtrate-header" style="grid-area: form-filter">
        <h2 class="filtrate-header-subfield-1">查询方式</h2>
        <el-select v-model="selectedQueryMode" placeholder="Select" size="large" style="width: 240px; border: none" class="filtrate-header-selector-1">
          <el-option v-for="item in queryModes" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <h2 class="filtrate-header-subfield-2"></h2>
        <el-input v-model="queryField" class="filtrate-header-selector-2" style="width: 240px; border: none" placeholder="请输入查询字段" clearable />
        <button class="filtrate-header-button" @click="getFilteredOrderPageTable">查询</button>
      </div>
      <TransferCard
        :field1="'待处理订单总数'"
        :statistics1="totalItems"
        :field2="'切换'"
        :color="'rgba(19,194,194,0.67)'"
        :buttonColor="'rgba(1, 111, 160, 0.62)'"
        :iconClass="'icon-shijian'"
        :link="'/admin/orders/history/management'"
        style="grid-area: transefer-card"
      />
    </div>
    <div style="width: 1189px; height: 660px; margin-top: 30px">
      <div style="grid-area: robot-form" class="robot-form">
        <el-table :data="currentPageData" ref="tableRef" style="width: 100%; border-top-left-radius: 8px; border-top-right-radius: 8px" :row-style="{ height: '56px' }">
          <el-table-column prop="orderId" label="订单编号" align="center"></el-table-column>
          <el-table-column prop="status" label="订单状态" align="center"></el-table-column>
          <el-table-column prop="orderTime" label="发起时间" align="center"></el-table-column>
          <el-table-column prop="expectedCompletionTime" label="预计完成时间" align="center"></el-table-column>
          <el-table-column prop="customer" label="订单发起方" align="center"></el-table-column>
          <el-table-column prop="address" label="配送地址" align="center">
            <template v-slot:default="scope">
              <el-tooltip effect="customized" :content="scope.row.address" placement="top">
                <span class="ellipsis" style="margin-top: 7px;">{{ scope.row.address }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="robotId" label="配送机器人编号" align="center"></el-table-column> -->
          <el-table-column label="配送机器人编号" align="center" width="160">
            <template v-slot:default="scope">
              <el-button size="default" @click="jumpToDeliverRobotFirstSight(scope.row.robotId, scope.row.status)" style="background-color: transparent; color: #03bf16; border: none; font-size: 16px"
                >{{ formatRobotId(scope.row.robotId) }}</el-button
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
  </div>
</template>

<script>
import TransferCard from "../../components/TransferCard.vue";
import BreadCrumbs from "../../components/BreadCrumbs.vue";
import api from "../../api/index";
import { ref, onMounted ,onActivated ,nextTick} from "vue";
import router from "@/router";
import { ElNotification } from "element-plus";

export default {
  components: {
    TransferCard,
    BreadCrumbs,
  },
  setup() {
    const tableRef = ref(null);
    const totalOrderCount = ref("");
    const currentPage = ref(1);
    const pageSize = ref(10);
    const totalItems = ref(100); // 假设总项目数是固定的
    const currentPageData = ref([]);
    const selectedQueryMode = ref("");
    const queryModes = ref([
      {
        label: "用户名",
        value: "用户名",
      },
      {
        label: "订单号",
        value: "订单号",
      },
    ]);
    const queryField = ref("");
    // 获取总订单数
    const getTotalOrderCount = async () => {
      try {
        const response = await api.getTotalOrderCount();
        if (response.code === 16011) {
          totalOrderCount.value = response.data.totalOrderCount.toString();
        } else {
          console.error("总订单数请求失败", response.msg);
        }
      } catch (error) {
        console.error("总订单数请求失败", error);
      }
    };
    //监听页面变化
    const handleCurrentChange = (val) => {
      currentPage.value = val; // 更新当前页码
      getCurrentOrderPageTable();
    };
    const jumpToDeliverRobotFirstSight = (robotId,status) =>{
      if(status === "正在运输"){
        router.push({ path: `/admin/robots/${robotId}/state` });
      } else {
        ElNotification({
          title: "订单待发货",
          message: "无法查看机器人第一视角",
          type: "info",
        });
      }
    };
    //获取当前订单后端分页数据
    const getCurrentOrderPageTable = async () => {
      try {
        const params = {
          currentPage: currentPage.value,
          pageSize: 10,
          inquiryMode: selectedQueryMode.value,
          inputField: queryField.value,
        };
        const response = await api.getCurrentOrderPageTable(params);
        if (response.code === 16021) {
          currentPageData.value = response.data.pageData;
          totalItems.value = response.data.totalItems;
        } else {
          console.error("获取当前订单列表失败", response.msg);
        }
      } catch (error) {
        console.error("获取当前订单列表失败", error);
      }
    };
    const getFilteredOrderPageTable = async()=>{
      currentPage.value = 1;
      try {
        const params = {
          currentPage: currentPage.value,
          pageSize: 10,
          inquiryMode: selectedQueryMode.value,
          inputField: queryField.value,
        };
        const response = await api.getCurrentOrderPageTable(params);
        if (response.code === 16021) {
          currentPageData.value = response.data.pageData;
          totalItems.value = response.data.totalItems;
        } else {
          console.error("获取当前订单列表失败", response.msg);
        }
      } catch (error) {
        console.error("获取当前订单列表失败", error);
      }
    };
    const formatRobotId = (cellValue) => {
      // 确保 cellValue 是字符串
      let value = String(cellValue);
      // 如果长度不足 15 位，在前面补零
      while (value.length < 7) {
        value = "0" + value;
      }
      value = "ROID" + value;
      return value;
    };
    onMounted(() => {
      nextTick(() => {
        tableRef.value.doLayout();
      });
      getTotalOrderCount();
      getCurrentOrderPageTable();
    });
    onActivated(() => {
      nextTick(() => {
        tableRef.value?.doLayout();
      });
    });
    //返回
    return {
      tableRef,
      totalOrderCount,
      currentPageData,
      pageSize,
      totalItems,
      selectedQueryMode,
      queryModes,
      queryField,
      handleCurrentChange,
      getCurrentOrderPageTable,
      getFilteredOrderPageTable,
      jumpToDeliverRobotFirstSight,
      formatRobotId,
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
