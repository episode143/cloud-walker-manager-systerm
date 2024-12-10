<template>
  <div>
    <div class="management-grid">
      <BreadCrumbs :path1="'营销管理'" :path2="'活动图管理'" style="grid-area: crumbs" />
    </div>
    <el-carousel :interval="6000" type="card" height="300px" style="margin-top: 20px">
      <el-carousel-item v-for="(image, index) in images" :key="index">
        <img :src="getMarketingActivityUrl(image.src)" :alt="image.alt" class="carousel-image" />
      </el-carousel-item>
    </el-carousel>

    <div style="width: 1189px; height: 110px; border-radius: 8px; background-color: transparent; margin-top: 20px; position: relative">
      <div style="height: 100%; width: 890px; border-radius: 8px; background-color: white">
        <span style="position: absolute; font-size: 20px; left: 25px; top: 12px; position: absolute">活动状态</span>
        <el-select v-model="selectedActivityState" placeholder="Select" size="large" style="width: 240px; border: none; position: absolute; top: 55px; left: 25px" class="filtrate-header-selector-2">
          <el-option v-for="item in activityStates" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <span style="position: absolute; font-size: 20px; left: 370px; top: 12px">时间范围</span>
        <el-select v-model="selectedActivityPeriod" placeholder="Select" size="large" style="width: 240px; border: none; position: absolute; top: 55px; left: 370px" class="filtrate-header-selector-2">
          <el-option v-for="item in activityperiods" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <button class="filtrate-header-button" style="top: 55px; left: 720px" @click="getMarketingActivityPageTable">筛选</button>
      </div>
      <div style="height: 100%; width: 279px; display: flex; justify-content: center; border-radius: 8px; background-color: white; position: absolute; top: 0px; left: 910px">
        <span style="font-size: 20px; position: absolute; color: #294567; top: 15px">新增活动</span>
        <i class="iconfont icon-xinzenghuodong add-activity-icon" @click="jumptoAddActivity"></i>
      </div>
    </div>

    <div style="width: 1189px; height: 650px; margin-top: 20px">
      <el-table :data="currentPageData" style="width: 100%; border-top-left-radius: 8px; border-top-right-radius: 8px" row-style="height:77px;">
        <el-table-column prop="activityPicture" label="图片概览" align="center" width="150">
          <template #default="scope">
            <div class="image-container">
              <img :src="getMarketingActivityUrl(scope.row.imageData)" alt="活动图片" class="image" @click="selectActivityUrl(scope.row.imageData)" style="z-index: 5; cursor: pointer" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="activityName" label="活动名称" align="center"></el-table-column>
        <el-table-column prop="activityType" label="活动类型" align="center"></el-table-column>
        <el-table-column prop="startTime" label="开始时间" align="center"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="150"></el-table-column>
        <el-table-column prop="onlineStatus" label="操作" align="center" width="150">
          <template v-slot:default="scope">
            <!-- 定义的关于活动的主键来访问 -->
            <el-button size="default" @click="openTakeDownActivityDialog(scope.row.activityId)" style="background-color: transparent; color: #f56c6c; border: none; font-size: 18px"
              >下架</el-button
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
          width: 100;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        "
      >
        <el-pagination
          :current-page="currentPage"
          :page-size="7"
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
    v-model="takedownDialogVisible"
    title=""
    width="400"
    :before-close="handleClose"
    :show-close="false"
    :close-on-click-modal="false"
    style="height: 200px; display: flex; justify-content: center"
  >
    <div style="position: absolute; width: 400px; height: 50px; top: 10px; left: 0px; display: flex; justify-content: center">
      <h1 style="font-size: 18px; color: #294567">下架活动</h1>
    </div>
    <div style="position: absolute; width: 400px; height: 50px; top: 60px; left: 0px; display: flex; justify-content: center">
      <h1 style="font-size: 18px; color: #294567; font-weight: 500">此活动还在进行中，确定下架？</h1>
    </div>
    <div style="position: absolute; width: 400px; height: 50px; top: 140px; left: 0px">
      <el-button @click="cancleTakeDown" style="margin-right: 30px">取消</el-button>
      <el-button type="primary" @click="confirmTakeDown" style="margin-left: 30px">确定</el-button>
    </div>
  </el-dialog>
  
  
  <el-dialog
    v-model="showPictureDialogVisible"
    title=""
    width="754"
    :before-close="handleClose"
    :show-close="true"
    :close-on-click-modal="false"
    style="height: 450px; display: flex; justify-content: center; position: relative"
  >
    <img :src="getMarketingActivityUrl(selectedActivityUrl)" alt="" class="detailedCheckMarketingPicture" />
  </el-dialog>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import api from "../../api/index";
import { ElNotification } from "element-plus";
import { base } from "../../api/path";
import { format, subDays, subWeeks, subMonths, subYears } from 'date-fns';
export default {
  setup() {
    const images = ref([
      { src: "1.jpg", alt: "营销活动1标题" },
      { src: "2.jpg", alt: "营销活动2标题" },
      { src: "3.jpg", alt: "营销活动3标题" },
      { src: "4.jpg", alt: "营销活动4标题" },
      { src: "5.jpg", alt: "营销活动5标题" },
      { src: "6.jpg", alt: "营销活动6标题" },
    ]);
    const getMarketingActivityUrl = (picture) => {
      return base.baseUrl + picture;
    };
    const selectedActivityState = ref("全部");
    const router = useRouter();
    const activityStates = ref([
      {
        value: "全部",
        label: "全部",
      },
      {
        value: "进行中",
        label: "进行中",
      },
      {
        value: "已结束",
        label: "已结束",
      },
      {
        value: "未开始",
        label: "未开始",
      },
    ]);
    const selectedActivityPeriod = ref("全部");
    const activityperiods = ref([
      {
        value: "全部",
        label: "全部",
      },
      {
        value: "三天内",
        label: "三天内",
      },
      {
        value: "一周内",
        label: "一周内",
      },
      {
        value: "一个月内",
        label: "一个月内",
      },
      {
        value: "三个月内",
        label: "三个月内",
      },
      {
        value: "一年内",
        label: "一年内",
      },
    ]);
    const currentPageData = ref([]);
    const currentPage = ref(1);
    const totalItems = ref(100);
    const takedownDialogVisible = ref(false);
    const selectedTakenDownActivityId = ref("");
    const selectedTakenDownActivityStatus = ref("");
    const selectedActivityUrl = ref("");
    const showPictureDialogVisible = ref(false);
    const selectActivityUrl = (url) => {
      showPictureDialogVisible.value = true;
      selectedActivityUrl.value = url;
    };
    const jumptoAddActivity = () => {
      router.push({ path: `/admin/marketing/newactivity` });
    };
    const takeDownActivity = async (selectedActivityId) => {
      try {
        const params = {
          activityId: selectedActivityId,
        };
        const response = await api.takeDownMarketingActivity(params);
        if (response.code === 18031) {
          ElNotification({
            title: "操作成功",
            message: response.msg,
            type: "success",
          });
          getMarketingActivityPageTable();
        } else {
          console.error("下架营销活动失败", response.msg);
          ElNotification({
            title: "操作失败",
            message: response.msg,
            type: "error",
          });
        }
      } catch (error) {
        console.error("下架营销活动失败", error);
        ElNotification({
          title: "操作失败",
          message: error.message,
          type: "error",
        });
      }
    };
    const handleTakeDownActivity = async(activityId) => {
        //先下架活动再重新获取分页数据
        await takeDownActivity(activityId);
        await getMarketingActivityPageTable();
        console.log("重新获取上线活动");
        await getOnlineMarketingActivityList();
    };

    const openTakeDownActivityDialog = (activityId) => {
        selectedTakenDownActivityId.value = activityId;
        takedownDialogVisible.value = true;
    };

    const cancleTakeDown = () => {
      selectedTakenDownActivityId.value = "";
      selectedTakenDownActivityStatus.value = "";
      takedownDialogVisible.value = false;
    };

    const confirmTakeDown = () => {
      handleTakeDownActivity(selectedTakenDownActivityId.value, selectedTakenDownActivityStatus.value);
      takedownDialogVisible.value = false;
    };
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`);
      currentPage.value = val; // 更新 currentPage 的值
      getMarketingActivityPageTable();
    };
    const getMarketingActivityPageTable = async () => {
      try {
        const params = {
          currentPage: currentPage.value,
          pageSize: 7,
          activityState: selectedActivityState.value,
          startDate: "1949-10-01",
        };
        const today = new Date();
        if(selectedActivityPeriod.value === "全部") {
          params.startDate ="1949-10-01";
        } else if(selectedActivityPeriod.value === "三天内") {
          params.startDate = format(subDays(today,3),"yyyy-MM-dd");
        } else if(selectedActivityPeriod.value === "一周内") {
          params.startDate = format(subWeeks(today,1),"yyyy-MM-dd");
        } else if(selectedActivityPeriod.value === "一个月内") {
          params.startDate = format(subMonths(today,1),"yyyy-MM-dd");
        } else if(selectedActivityPeriod.value === "三个月内") {
          params.startDate = format(subMonths(today,3),"yyyy-MM-dd");
        } else if(selectedActivityPeriod.value === "一年内") {
          params.startDate = format(subYears(today,1),"yyyy-MM-dd");
        } 
        const response = await api.getMarketingActivityPageTable(params);
        if (response.code === 18051) {
          currentPageData.value = response.data.pageData;
          for (let i = 0; i < currentPageData.value.length; i++) {
            if (currentPageData.value[i].activityType === "ticket") {
              currentPageData.value[i].activityType = "赠送礼券";
            } else {
              currentPageData.value[i].activityType = "充值有礼";
            }
          }
          totalItems.value = response.data.totalItems;
        } else {
          console.error("获取营销活动列表失败", response.msg);
        }
      } catch (error) {
        console.error("获取营销活动列表失败", error);
      }
    };

    const getOnlineMarketingActivityList = async () => {
      try {
        const response = await api.getOnlineMarketingActivityList();
  
        if (response.code === 18041) {
          images.value = [];
          for (let i = 0; i < response.data.length; i++) {
            images.value.push({
              src: response.data[i].picture,
              alt: response.data[i].activityName,
            });
          }
        } else {
          console.error("获取线上营销活动图列表失败", response.msg);
        }
      } catch (error) {
        console.error("获取线上营销活动图列表失败", error);
      }
    };

    onMounted(() => {
      //console.log("重新进入营销活动");
      getOnlineMarketingActivityList();
      getMarketingActivityPageTable();
    });

    return {
      images,
      currentPageData,
      currentPage,
      totalItems,
      selectedActivityState,
      activityStates,
      selectedActivityPeriod,
      activityperiods,
      takedownDialogVisible,
      showPictureDialogVisible,
      selectedActivityUrl,
      selectActivityUrl,
      getMarketingActivityUrl,
      jumptoAddActivity,
      handleTakeDownActivity,
      getMarketingActivityPageTable,
      handleCurrentChange,
      openTakeDownActivityDialog,
      cancleTakeDown,
      confirmTakeDown,
    };
  },
};
</script>

<style scoped>
.el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  border-radius: 8px;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
  border-radius: 8px;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px; /* 设置圆角 */
}
.management-grid {
  display: grid;
  grid-template-columns: 384px 785px;
  grid-template-rows: 20px;
  gap: 30px 20px;
  grid-template-areas: "crumbs return-icon";
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
.add-activity-icon {
  color: rgb(177.3, 179.4, 183.6);
  font-size: 45px;
  position: absolute;
  top: 50px;
  cursor: pointer;
}
.add-activity-icon:hover {
  color: #409eff;
}
</style>
<style scoped>
.image-container {
  position: relative;
  width: 119px; /* 设置宽度 */
  padding-top: 50.42%; /* (60 / 119) * 100% = 50.42% */
  margin: auto; /* 居中对齐 */
}
.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* 限制图片容器的最大高度，确保不超过表格行的高度 */
.image-container {
  max-height: 77px;
  overflow: hidden;
}
.detailedCheckMarketingPicture {
  height: 360px;
  width: 714px;
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: 40px;
  left: 20px;
  border-radius: 4px;
}
</style>
