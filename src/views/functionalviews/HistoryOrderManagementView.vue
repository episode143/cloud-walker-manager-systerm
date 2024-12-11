<template>
  <div>
    <div class="management-grid">
      <BreadCrumbs :path1="'订单管理'" :path2="'历史订单'" style="grid-area: crumbs" />
      <div class="filtrate-header" style="grid-area: form-filter">
        <h2 class="filtrate-header-subfield-1">查询方式</h2>
        <el-select v-model="selectedQueryMode" placeholder="Select" size="large" style="width: 240px; border: none" class="filtrate-header-selector-1">
          <el-option v-for="item in queryModes" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <h2 class="filtrate-header-subfield-2"></h2>
        <el-input v-model="queryField" class="filtrate-header-selector-2" style="width: 240px; border: none" placeholder="请输入查询字段" clearable />
        <button class="filtrate-header-button" @click="getHistoryOrderPageTable">查询</button>
      </div>
      <TransferCard
        :field1="'历史订单总数'"
        :statistics1="totalHistoryOrderCount"
        :field2="'切换'"
        :color="'rgba(128,128,255,0.9)'"
        :buttonColor="'rgba(145,0,18,0.2)'"
        :iconClass="'icon-jinhangzhong'"
        :link="'/admin/orders/management'"
        style="grid-area: transefer-card"
      />
    </div>
    <div style="width: 1189px; height: 660px; margin-top: 30px">
      <div style="grid-area: robot-form" class="robot-form">
        <el-table :data="currentPageData" ref="tableRef" style="width: 100%; border-top-left-radius: 8px; border-top-right-radius: 8px" row-style="height:56px;">
          <el-table-column prop="orderId" label="订单编号" align="center"></el-table-column>
          <el-table-column prop="orderTime" label="发起时间" align="center"></el-table-column>
          <el-table-column prop="completionTime" label="完成时间" align="center"></el-table-column>
          <el-table-column prop="customer" label="订单发起方" align="center"></el-table-column>
          <el-table-column prop="address" label="配送地址" align="center">
            <template v-slot:default="scope">
              <el-tooltip effect="customized" :content="scope.row.address" placement="top">
                <span class="ellipsis">{{ scope.row.address }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金额" align="center"></el-table-column>
          <el-table-column prop="discount" label="折扣/减免情况" align="center"></el-table-column>
          <el-table-column prop="amount" label="结算金额" align="center"></el-table-column>
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
import { ref, onMounted, onActivated, nextTick } from "vue";

export default {
  components: {
    TransferCard,
    BreadCrumbs,
  },
  setup() {
    const tableRef = ref(null);
    const totalHistoryOrderCount = ref("");
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

    //获取历史订单总数
    /*const getTotalHistoryOrderCount = async () => {
      try {
        const response = await api.getHistoryOrderCount();
        if (response.code === 16041) {
          totalHistoryOrderCount.value = response.data.totalOrderCount.toString();
        } else {
          console.error("历史总订单数请求失败", response.msg);
        }
      } catch (error) {
        console.error("历史总订单数请求失败", error);
      }
    };*/
    const getTotalHistoryOrderCount = async () => {
      try {
        const params = {
          currentPage: currentPage.value,
          pageSize: 10,
          inquiryMode: "",
          inputField: "",
        };
        const response = await api.getHistoryOrderPageTable(params);
        if (response.code === 16031) {
          totalHistoryOrderCount.value = response.data.totalItems;
        } else {
          console.error("获取历史订单总数失败", response.msg);
        }
      } catch (error) {
        console.error("获取历史订单总数失败", error);
      }
    };
    //获取当前订单后端分页数据
    const getHistoryOrderPageTable = async () => {
      try {
        const params = {
          currentPage: currentPage.value,
          pageSize: 10,
          inquiryMode: selectedQueryMode.value,
          inputField: queryField.value,
        };
        const response = await api.getHistoryOrderPageTable(params);
        if (response.code === 16031) {
          currentPageData.value = response.data.pageData;
          totalItems.value = response.data.totalItems;
        } else {
          console.error("获取历史订单列表失败", response.msg);
        }
      } catch (error) {
        console.error("获取历史订单列表失败", error);
      }
    };
    //监听页面变化
    const handleCurrentChange = (val) => {
      currentPage.value = val; // 更新当前页码
      getHistoryOrderPageTable();
    };
    //（内含模拟）
    onMounted(() => {
      nextTick(() => {
        tableRef.value.doLayout();
      });
      getHistoryOrderPageTable();
      getTotalHistoryOrderCount();
    });
    onActivated(() => {
      nextTick(() => {
        tableRef.value?.doLayout();
      });
    });
    return {
      tableRef,
      totalHistoryOrderCount,
      currentPageData,
      pageSize,
      totalItems,
      selectedQueryMode,
      queryModes,
      queryField,
      //getTotalHistoryOrderCount,
      handleCurrentChange,
      getHistoryOrderPageTable,
    };
  },
};
</script>
<style scoped>
@import "../../styles/filterstyle.css";
</style>
<style>
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
