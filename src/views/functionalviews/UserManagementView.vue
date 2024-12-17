<template>
  <div>
    <!-- 跳转卡片部分 -->
    <div class="management-grid">
      <BreadCrumbs :path1="'用户管理'" :path2="'查看用户'" style="grid-area: crumbs" />
      <div class="filtrate-header" style="grid-area: form-filter">
        <h2 class="filtrate-header-subfield-1">当前状态</h2>
        <el-select v-model="selectedOnlineState" placeholder="Select" size="large" style="width: 240px; border: none" class="filtrate-header-selector-1">
          <el-option v-for="item in onlineState" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <h2 class="filtrate-header-subfield-2">排序方式</h2>
        <el-select v-model="selectedSortOrder" placeholder="Select" size="large" style="width: 240px; border: none" class="filtrate-header-selector-2">
          <el-option v-for="item in sortOrders" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <button class="filtrate-header-button" @click="getFilteredUserPageData">筛选</button>
      </div>
      <TransferCard
        :field1="'总注册用户数'"
        :statistics1="totalUserCount"
        :field2="'数据分析'"
        :color="'#ff9f43'"
        :buttonColor="'rgba(217, 0, 27, 0.32)'"
        :iconClass="'icon-yunwei'"
        :link="'/admin/users/statistics'"
        style="grid-area: transefer-card"
      />
    </div>
    <!-- 表格 -->
    <div style="width: 1189px; height: 660px; margin-top: 30px">
      <el-table :data="currentPageData" ref="tableRef" style="width: 100%; border-top-left-radius: 8px; border-top-right-radius: 8px" row-style="height:56px;">
        <el-table-column prop="avatar" label="头像" align="center" width="160" style="padding: 0px">
          <template v-slot:default="scope">
            <div class="avatar-container">
              <img :src="getAvatarUrl(scope.row.avatar)" class="avatar" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" align="center"></el-table-column>
        <el-table-column prop="phoneNumber" label="账号" align="center"></el-table-column>
        <el-table-column prop="createdAt" label="注册时间" align="center"></el-table-column>
        <el-table-column prop="balance" label="余额" align="center"></el-table-column>
        <el-table-column prop="onlineStatus" label="当前状态" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template v-slot:default="scope">
            <!-- 定义的关于用户的主键来访问 -->
            <el-button size="default" @click="handleCheckUser(scope.row.userId)" style="background-color: transparent; color: #03bf16; border: none; font-size: 18px">查看用户</el-button>
          </template>
        </el-table-column>
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
</template>

<script>
import TransferCard from "../../components/TransferCard.vue";
import BreadCrumbs from "../../components/BreadCrumbs.vue";
import api from "../../api/index";
import { base } from "../../api/path";
import { useRouter } from "vue-router";
import { ref, onMounted, onActivated, nextTick } from "vue";
export default {
  components: {
    TransferCard,
    BreadCrumbs,
  },
  setup() {
    const tableRef = ref(null);
    const router = useRouter();
    //总用户数
    const totalUserCount = ref("");
    //当前页
    const currentPage = ref(1);
    //页面大小
    //const pageSize = ref(10);
    //总数据大小
    const totalItems = ref(100);
    //获取的表格的数据
    const currentPageData = ref([
      {
        userId: "1",
        avatar: "0.png",
      },
      {
        userId: "1",
        avatar: "1.jpg",
      },
      {
        userId: "1",
        avatar: "2.jpg",
      },
      {
        userId: "1",
        avatar: "3.jpg",
      },
      {
        userId: "1",
        avatar: "4.jpg",
      },
      {
        userId: "1",
        avatar: "5.jpg",
      },
      {
        userId: "1",
        avatar: "6.jpg",
      },
      {
        userId: "1",
        avatar: "7.png",
      },
      {
        userId: "1",
        avatar: "8.png",
      },
      {
        userId: "1",
        avatar: "9.jpg",
      },
    ]);
    //过滤的类型
    const onlineState = ref([
      {
        value: "全部",
        label: "全部",
      },
      {
        value: "online",
        label: "在线",
      },
      {
        value: "offline",
        label: "离线",
      },
      {
        value: "away",
        label: "流失",
      },
    ]);
    //选择过滤的类型
    const selectedOnlineState = ref("全部");
    //排序的类型
    const sortOrders = ref([
      {
        value: "默认",
        label: "默认",
      },
      {
        value: "按照注册时间排序",
        label: "按照注册时间排序",
      },
      {
        value: "余额",
        label: "按照账户余额排序",
      },
    ]);
    //选择排序的方式
    const selectedSortOrder = ref("默认");
    onMounted(() => {
      nextTick(() => {
        tableRef.value.doLayout();
      });
      // console.log("获取总用户数");
      getTotalUserCount();
      getUserPageTable();
    });
    //获取头部卡片的总用户数
    const getTotalUserCount = async () => {
      try {
        const response = await api.getTotalUserCount();
        if (response.code === 13011) {
          totalUserCount.value = response.data.totalUserCount.toString();
        } else {
          console.error("总用户数请求失败", response.msg);
        }
      } catch (error) {
        console.error("总用户数请求失败", error);
      }
    };
    const getAvatarUrl = (avatar) => {
      return base.baseUrl + avatar; // 动态绑定路径
    };
    //查看用户按钮跳转用户详细信息页面
    const handleCheckUser = (userId) => {
      router.push({ path: `/admin/users/${userId}/info` });
    };
    //切换当前页
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`);
      currentPage.value = val; // 更新 currentPage 的值
      getUserPageTable();
    };

    //获取用户后端分页内容
    const getUserPageTable = async () => {
      try {
        const params = {
          currentPage: currentPage.value,
          pageSize: 10,
          userStatus: selectedOnlineState.value,
          sortType: selectedSortOrder.value,
        };
        const response = await api.getUserPageTable(params);
        if (response.code === 13061) {
          currentPageData.value = response.data.pageData;
          totalItems.value = response.data.totalItems;
          for (let i = 0; i < response.data.pageData.length; i++) {
            if (response.data.pageData[i].onlineStatus === "online") {
              currentPageData.value[i].onlineStatus = "在线";
            } else if (response.data.pageData[i].onlineStatus === "offline") {
              currentPageData.value[i].onlineStatus = "离线";
            } else {
              currentPageData.value[i].onlineStatus = "流失";
            }
          }
        } else {
          console.error("获取用户列表失败", response.msg);
        }
      } catch (error) {
        console.error("获取用户列表失败", error);
      }
    };
    const getFilteredUserPageData = async () => {
      currentPage.value = 1;
      try {
        const params = {
          currentPage: currentPage.value,
          pageSize: 10,
          userStatus: selectedOnlineState.value,
          sortType: selectedSortOrder.value,
        };
        const response = await api.getUserPageTable(params);
        if (response.code === 13061) {
          currentPageData.value = response.data.pageData;
          totalItems.value = response.data.totalItems;
          for (let i = 0; i < response.data.pageData.length; i++) {
            if (response.data.pageData[i].onlineStatus === "online") {
              currentPageData.value[i].onlineStatus = "在线";
            } else if (response.data.pageData[i].onlineStatus === "offline") {
              currentPageData.value[i].onlineStatus = "离线";
            } else {
              currentPageData.value[i].onlineStatus = "流失";
            }
          }
        } else {
          console.error("获取用户列表失败", response.msg);
        }
      } catch (error) {
        console.error("获取用户列表失败", error);
      }
    };
    onActivated(() => {
      nextTick(() => {
        tableRef.value.doLayout();
      });
    });
    //返回
    return {
      tableRef,
      totalUserCount,
      totalItems,
      currentPageData,
      currentPage,
      onlineState,
      selectedOnlineState,
      sortOrders,
      selectedSortOrder,
      getAvatarUrl,
      handleCheckUser,
      handleCurrentChange,
      getUserPageTable,
      getFilteredUserPageData,
    };
  },
};
</script>

<style scoped>
@import "../../styles/filterstyle.css";
.flex-container {
  display: flex;
  justify-content: space-between;
  padding: none;
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
.avatar {
  width: 40px;
  height: 40px;
  object-fit: cover; /* 按中心缩放并填充整个容器 */
  border-radius: 50%; /* 圆形头像 */
  margin: 0px;
}
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  /* background-color: red; */
  padding: 0px;
  margin: 0px;
}
</style>
