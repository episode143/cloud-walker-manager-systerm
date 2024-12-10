<template>
  <div>
    <div class="management-grid">
      <BreadCrumbs :path1="'流水管理'" :path2="'查看流水'" style="grid-area: crumbs" />
      <div class="filtrate-header" style="grid-area: form-filter">
        <h2 class="filtrate-header-subfield-1">流水类型</h2>
        <el-select v-model="selectedFinanceType" placeholder="Select" size="large" style="width: 240px; border: none" class="filtrate-header-selector-1">
          <el-option v-for="item in financeTypes" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <h2 class="filtrate-header-subfield-2">排序方式</h2>
        <el-select v-model="selectedSortOrder" placeholder="Select" size="large" style="width: 240px; border: none" class="filtrate-header-selector-2">
          <el-option v-for="item in sortOrders" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <button class="filtrate-header-button" @click="getTransactionPageTable">筛选</button>
      </div>
      <TransferCard
        :field1="'总盈利金额'"
        :statistics1="totalProfit"
        :field2="'数据分析'"
        :color="'rgba(255,197,61,0.75)'"
        :buttonColor="'rgba(163, 103, 23, 0.32)'"
        :iconClass="'icon-navicon-jylstj'"
        :link="'/admin/finance/statistics'"
        style="grid-area: transefer-card"
      />
    </div>
    <div style="width: 1189px; height: 660px; margin-top: 30px">
      <div style="grid-area: robot-form" class="robot-form">
        <el-table :data="currentPageData" style="width: 100%; border-top-left-radius: 8px; border-top-right-radius: 8px" row-style="height:56px;">
          <el-table-column prop="transactionId" label="流水单号" align="center"></el-table-column>
          <el-table-column prop="transactionTime" label="结算时间" align="center"></el-table-column>
          <el-table-column prop="transactionType" label="收入/支出" align="center"></el-table-column>
          <el-table-column prop="description" label="流水说明" align="center"></el-table-column>
          <el-table-column prop="amount" label="流水金额" align="center"></el-table-column>
          <el-table-column prop="counterpartyType" label="对接方" align="center"></el-table-column>
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
import { ref, onMounted } from "vue";

export default {
  components: {
    TransferCard,
    BreadCrumbs,
  },
  setup() {
    const totalProfit = ref("");
    const currentPage = ref(1);
    const pageSize = ref(10);
    const totalItems = ref(100); // 假设总项目数是固定的
    //筛选的流水类型
    const financeTypes = ref([
      {
        value: "全部",
        label: "全部",
      },
      {
        value: "收入",
        label: "收入",
      },
      {
        value: "支出",
        label: "支出",
      },
    ]);
    //选择过滤的类型
    const selectedFinanceType = ref("全部");
    //排序的类型
    const sortOrders = ref([
      {
        value: "默认",
        label: "默认",
      },
      {
        value: "按照金额排序",
        label: "按照金额排序",
      },
      {
        value: "按照时间排序",
        label: "按照时间排序",
      },
    ]);
    //选择排序的方式
    const selectedSortOrder = ref("默认");
    const currentPageData = ref([]);
    //获取总盈利额
    const getTotalProfit = async () => {
      try {
        const response = await api.getTotalProfit();
        if (response.code === 17011) {
          totalProfit.value = response.data.totalProfitLastMonth.toString() + "￥";
        } else {
          console.error("总盈利额请求失败", response.msg);
        }
      } catch (error) {
        console.error("总盈利额请求失败", error);
      }
    };
    //获取流水后端分页数据
    const getTransactionPageTable = async () => {
      try {
        const params = {
          currentPage: currentPage.value,
          pageSize: 10,
          financeType: selectedFinanceType.value,
          sortType: selectedSortOrder.value,
        };
        const response = await api.getTransactionPageTable(params);
        if (response.code === 17041) {
          currentPageData.value = response.data.pageData;
          totalItems.value = response.data.totalItems;
        } else {
          console.error("获取流水列表失败", response.msg);
        }
      } catch (error) {
        console.error("获取流水列表失败", error);
      }
    };
    //监听页面变化
    const handleCurrentChange = (val) => {
      currentPage.value = val; // 更新当前页码
      getTransactionPageTable();
    };
    onMounted(() => {
      console.log("获取总盈利额");
      getTotalProfit();
      getTransactionPageTable();
    });
    return {
      totalProfit,
      currentPageData,
      pageSize,
      totalItems,
      financeTypes,
      selectedFinanceType,
      sortOrders,
      selectedSortOrder,
      handleCurrentChange,
      getTransactionPageTable,
    };
  },
};
</script>
<style scoped>
@import "../../styles//filterstyle.css";
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
</style>
