<template>
  <div>
    <div class="add-marketing-activity-form-grid">
      <BreadCrumbs :path1="'营销管理'" :path2="'新增活动'" style="grid-area: crumbs" />
      <div style="width: 786px; height: 50px; display: flex; justify-content: right; grid-area: return-icon-box">
        <ReturnIcon :link="'/admin/marketing/management'" />
      </div>

      <div style="width: 100%; height: 100%; border-radius: 8px; background-color: white; grid-area: form; position: relative">
        <h1 style="position: absolute; font-size: 20px; color: #0482ff; top: 15px; left: 20px; margin: 0px">活动名称</h1>
        <el-input v-model="activityTitle" style="width: 1143px; position: absolute; top: 50px; left: 20px; height: 40px; font-size: 18px" placeholder="请输入活动名称" />

        <h1 style="position: absolute; font-size: 18px; color: #0482ff; top: 85px; left: 20px">活动开始时间</h1>
        <el-date-picker v-model="selectedStartTime" type="datetime" placeholder="请选择时间" style="position: absolute; top: 135px; left: 20px" />
        <h1 style="position: absolute; font-size: 18px; color: #0482ff; top: 85px; left: 430px">活动结束时间</h1>
        <el-date-picker v-model="selectedEndTime" type="datetime" placeholder="请选择时间" style="position: absolute; top: 135px; left: 430px" />

        <h1 style="position: absolute; left: 20px; top: 160px; font-size: 18px; color: #0482ff">活动图概览</h1>
        <div class="background-image-example">
          <el-upload class="carousel-uploader" style="position: absolute" :auto-upload="false" :show-file-list="false" @change="handleChange" :before-upload="beforeCarouselUpload" ref="uploadRef">
            <img v-if="imageUrl" :src="imageUrl" class="carousel-image" />
            <div class="upload-picture" v-else>
              <i class="iconfont icon-shangchuantouxiang upload-icon" style="font-size: 50px"></i>
            </div>
          </el-upload>
        </div>

        <button class="activity-button" style="position: absolute; top: 105px; left: 765px" :style="ticketStyle" @click="changFormToTicket">赠送礼券</button>
        <button class="activity-button" style="position: absolute; top: 105px; left: 965px" :style="rechargeStyle" @click="changFormToRecharge">充值福利</button>
        <div class="activity-content-form1" style="left: 765px; top: 145px" v-show="ticketShow">
          <i class="iconfont icon-gufengxiangyunyunduo201" style="position: absolute; left: 45px; top: 320px; font-size: 75px; color: white"></i>
          <!-- <h1 style="position: absolute; top: 10px; left: 50px; color: white; margin: 0px">选择赠送群体</h1> -->
          <!-- <div style="position: absolute; background-color: white; border-radius: 4px; height: 150px; width: 298px; top: 45px; left: 50px; border: 2px solid rgb(199.5, 201, 204)">
            <el-checkbox v-model="ticketForm.selectedOptions" label="未使用配送用户" style="position: absolute; left: 10px; top: 0px; color: #294567c0">未使用配送用户</el-checkbox>
            <el-checkbox v-model="ticketForm.selectedOptions" label="频率小于5%用户" style="position: absolute; left: 10px; top: 30px; color: #294567c0">频率小于5%用户</el-checkbox>
            <el-checkbox v-model="ticketForm.selectedOptions" label="频率小于10%用户" style="position: absolute; left: 10px; top: 60px; color: #294567c0">频率小于10%用户</el-checkbox>
            <el-checkbox v-model="ticketForm.selectedOptions" label="频率小于20%用户" style="position: absolute; left: 10px; top: 90px; color: #294567c0">频率小于20%用户</el-checkbox>
            <el-checkbox v-model="ticketForm.selectedOptions" label="高频用户" style="position: absolute; left: 10px; top: 120px; color: #294567c0">高频用户</el-checkbox>
          </div> -->
          <h1 style="position: absolute; top: 15px; left: 50px; color: white">选择礼券类型</h1>
          <div style="position: absolute; background-color: white; border-radius: 4px; height: 30px; width: 300px; top: 65px; left: 50px; display: flex; align-items: center">
            <el-radio-group v-model="ticketForm.type" style="height: 100%; width: 100%; display: flex; align-items: center; position: absolute">
              <el-radio label="代金券" style="position: absolute; left: 10px; color: #294567c0"> 代金券 </el-radio>
              <i class="iconfont icon-daijinquan" style="font-size: 24px; color: #294567c0; position: absolute; left: 80px" :style="voucherStyle"></i>
              <el-radio label="折扣券" style="position: absolute; left: 150px; color: #294567c0"> 折扣券 </el-radio>
              <i class="iconfont icon-v" style="font-size: 26px; color: #294567c0; position: absolute; left: 220px" :style="discountCouponStyle"></i>
            </el-radio-group>
          </div>

          <h1 style="position: absolute; top: 95px; left: 50px; color: white" v-show="showDiscountCoupon">折扣量/折</h1>
          <el-input-number
            v-model="ticketForm.discountCouponNum"
            v-show="showDiscountCoupon"
            :precision="1"
            :step="0.1"
            :max="10"
            :min="5"
            style="position: absolute; left: 50px; top: 155px; font-size: 18px"
          />

          <h1 style="position: absolute; top: 95px; left: 50px; color: white" v-show="showVoucher">减免金额/元</h1>
          <el-input-number v-model="ticketForm.voucherNum" v-show="showVoucher" :precision="1" :step="0.5" :max="10" :min="1" style="position: absolute; left: 50px; top: 155px; font-size: 18px" />
          <h1 style="position: absolute; top: 185px; left: 50px; color: white">有效时间/天</h1>
          <el-input-number v-model="ticketForm.validDuration" :precision="0" :step="1" :max="14" :min="3" style="position: absolute; left: 50px; top: 245px; font-size: 18px" />
        </div>
        <div class="activity-content-form2" style="left: 765px; top: 145px" v-show="rechargeShow">
          <h1 style="font-size: 20px; color: white">充值返送设置</h1>
          <i class="iconfont icon-gufengxiangyunyunduo201" style="position: absolute; left: 45px; top: 320px; font-size: 75px; color: white"></i>
          <!-- <i class="iconfont icon-xiangyun2 " style="position: absolute; left: 75px; top: 310px; font-size: 55px; color: white"></i> -->
          <h1 style="position: absolute; font-size: 20px; color: white; left: 67px; top: 35px">充值10元</h1>
          <el-input-number v-model="rechargeReward[0]" :min="1" :max="3" controls-position="right" style="position: absolute; top: 90px; left: 40px" />
          <h1 style="position: absolute; font-size: 20px; color: white; right: 77px; top: 35px">充值30元</h1>
          <el-input-number v-model="rechargeReward[1]" :min="6" :max="9" controls-position="right" style="position: absolute; top: 90px; left: 224px" />
          <h1 style="position: absolute; font-size: 20px; color: white; left: 67px; top: 115px">充值50元</h1>
          <el-input-number v-model="rechargeReward[2]" :min="10" :max="15" controls-position="right" style="position: absolute; top: 170px; left: 40px" />
          <h1 style="position: absolute; font-size: 20px; color: white; right: 67px; top: 115px">充值100元</h1>
          <el-input-number v-model="rechargeReward[3]" :min="28" :max="38" controls-position="right" style="position: absolute; top: 170px; left: 224px" />
          <h1 style="position: absolute; font-size: 20px; color: white; left: 67px; top: 195px">充值200元</h1>
          <el-input-number v-model="rechargeReward[4]" :min="58" :max="68" controls-position="right" style="position: absolute; top: 250px; left: 40px" />
          <h1 style="position: absolute; font-size: 20px; color: white; right: 67px; top: 195px">充值300元</h1>
          <el-input-number v-model="rechargeReward[5]" :min="108" :max="118" controls-position="right" style="position: absolute; top: 250px; left: 224px" />
        </div>

        <button
          style="
            position: absolute;
            height: 38px;
            width: 120px;
            font-size: 18px;
            left: 1020px;
            top: 500px;
            border: none;
            border-radius: 4px;
            border: 2px solid #0482ff;
            background-color: white;
            color: #0482ff;
          "
          @click="handlePostMarketingActivity"
        >
          提交
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumbs from "../../components/BreadCrumbs.vue";
import ReturnIcon from "../../components/ReturnIcon.vue";
import { computed, ref } from "vue";
import api from "../../api/index";
import { ElNotification, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
export default {
  components: {
    BreadCrumbs,
    ReturnIcon,
  },
  setup() {
    const router = useRouter();
    const activityTitle = ref("");
    const selectedStartTime = ref(null);
    const selectedEndTime = ref(null);
    const formatDateToYYYYMMDD = (date) => {
      if (!date) return ""; // 如果 date 为 null 或 undefined，返回空字符串

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始，需要加 1
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };
    const formattedStartTime = computed(() => formatDateToYYYYMMDD(selectedStartTime.value));
    const formattedEndTime = computed(() => formatDateToYYYYMMDD(selectedEndTime.value));
    const defaultTime = new Date(2000, 1, 1, 12, 0, 0);
    const selectedActivityForm = ref("ticket");
    const ticketForm = ref({
      type: "代金券",
      discountCouponNum: 8,
      voucherNum: 2,
      validDuration: 3,
    });
    const rechargeReward = ref([1, 6, 10, 28, 58, 108]);

    //
    // 用于存储图片的URL（用于预览）
    const imageUrl = ref("");

    // 用于存储用户选择的文件
    let file = null;

    // 用于存储Base64编码的图片数据
    const base64Image = ref("");

    // 用于存储图片的MIME类型
    const imageType = ref("");

    // 引用 el-upload 组件
    const uploadRef = ref(null);

    const handleClearPreview = () => {
      if (imageUrl.value) {
        URL.revokeObjectURL(imageUrl.value);
        imageUrl.value = "";
      }
    };
    // 当用户选择图片时调用此方法
    const handleChange = (uploadFile) => {
      handleClearPreview();
      const rawFile = uploadFile.raw;

      // 更新图片预览
      imageUrl.value = URL.createObjectURL(rawFile);

      // 保存文件
      file = rawFile;

      // 读取文件并生成Base64字符串
      const reader = new FileReader();
      reader.onload = (e) => {
        base64Image.value = e.target.result; // Base64编码的图片数据
        imageType.value = file.type; // 图片的MIME类型
      };
      reader.readAsDataURL(rawFile);
    };

    // 上传前的校验
    const beforeCarouselUpload = (rawFile) => {
      const allowedTypes = ["image/jpeg", "image/png"];

      // 检查文件类型
      if (!allowedTypes.includes(rawFile.type)) {
        ElMessage.error("选择照片必须是 JPG 或 PNG 格式!");
        return false;
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error("活动图大小不能超过 2MB!");
        return false;
      }
      return true;
    };

    // const ticketForm = ref({
    const voucherStyle = computed(() => {
      return ticketForm.value.type === "代金券" ? "color: #0482ff" : "color: #294567c0";
    });
    const discountCouponStyle = computed(() => {
      return ticketForm.value.type === "折扣券" ? "color: #0482ff" : "color: #294567c0";
    });
    // });
    const ticketStyle = computed(() => {
      return selectedActivityForm.value === "ticket" ? "background-color: #0482ffd0; color: white" : "background-color: transparent; color: #0482ff";
    });
    const rechargeStyle = computed(() => {
      return selectedActivityForm.value === "recharge" ? "background-color: #0482ffd0; color: white" : "background-color: transparent; color: #0482ff";
    });
    const ticketShow = computed(() => {
      return selectedActivityForm.value === "ticket";
    });
    const rechargeShow = computed(() => {
      return selectedActivityForm.value === "recharge";
    });
    const changFormToTicket = () => {
      selectedActivityForm.value = "ticket";
    };
    const changFormToRecharge = () => {
      selectedActivityForm.value = "recharge";
    };
    const showDiscountCoupon = computed(() => {
      return ticketForm.value.type === "折扣券";
    });
    const showVoucher = computed(() => {
      return ticketForm.value.type === "代金券";
    });
    const shortcuts = [
      {
        text: "Today",
        value: new Date(),
      },
      {
        text: "Yesterday",
        value: () => {
          const date = new Date();
          date.setDate(date.getDate() - 1);
          return date;
        },
      },
      {
        text: "A week ago",
        value: () => {
          const date = new Date();
          date.setDate(date.getDate() - 7);
          return date;
        },
      },
    ];
    const modifyRechargeAward = async () => {
      if (!selectedStartTime.value || !selectedEndTime.value || !rechargeReward.value) {
        throw new Error("表单信息不完整");
      }
      if( new Date(selectedStartTime.value) > new Date(selectedEndTime.value)) {
        throw new Error("活动开始时间必须早于结束时间");
      }
      const params = {
        startTime: formattedStartTime.value,
        endTime: formattedEndTime.value,
        rechargeAward: rechargeReward.value,
      };
      const response = await api.modifyRechargeAward(params);
      if (response.code === 18021) {
        console.log("修改充值活动成功");
      } else {
        throw new Error(`${response.msg}`);
      }
    };
    const jumptoMarketingActivitiesManagement = () => {
      router.push({ path: "/admin/marketing/management" });
    };
    const postMarketingActivity = async () => {
      if( new Date(selectedStartTime.value) > new Date(selectedEndTime.value)) {
        throw new Error("活动开始时间必须早于结束时间");
      }
      const params = {
        activityName: activityTitle.value,
        startTime: formattedStartTime.value,
        endTime: formattedEndTime.value,
        picture: base64Image.value,
        format: imageType.value,
        activityType: selectedActivityForm.value,
        couponType: ticketForm.value.type,
        discountValue: 0,
        validDuration: ticketForm.value.validDuration,
      };
      if (ticketForm.value.type === "代金券") {
        params.discountValue = ticketForm.value.voucherNum;
      } else {
        params.discountValue = ticketForm.value.discountCouponNum;
      }
      console.log(params);
      console.log(formattedStartTime.value);
      console.log(formattedEndTime.value);
      if (!(activityTitle.value && selectedStartTime.value && selectedEndTime.value && base64Image.value && selectedActivityForm.value && ticketForm.value)) {
        throw new Error("表单信息不完整");
      }
      //console.log(base64Image.value);
      const response = await api.postMarketingActivity(params);
      if (response.code === 18011) {
        console.log("新增营销活动成功");
      } else {
        throw new Error(`${response.msg}`);
      }
    };
    const handlePostMarketingActivity = async () => {
      if (selectedActivityForm.value === "recharge") {
        try {
          //jumptoMarketingActivitiesManagement();
          await Promise.all([postMarketingActivity(), modifyRechargeAward()]);
          ElNotification({
            title: "操作成功",
            message: "新增营销活动成功",
            type: "success",
          });
          jumptoMarketingActivitiesManagement();
        } catch (error) {
          ElNotification({
            title: "操作失败",
            message: `新增营销活动失败: ${error.message}`,
            type: "error",
          });
        }
      } else {
        try {
          //jumptoMarketingActivitiesManagement();
          await postMarketingActivity();
          ElNotification({
            title: "操作成功",
            message: "新增营销活动成功",
            type: "success",
          });
          jumptoMarketingActivitiesManagement();
        } catch (error) {
          ElNotification({
            title: "操作失败",
            message: `新增营销活动失败: ${error.message}`,
            type: "error",
          });
        }
      }
    };
    return {
      activityTitle,
      selectedStartTime,
      selectedEndTime,
      defaultTime,
      shortcuts,
      ticketStyle,
      rechargeStyle,
      ticketShow,
      rechargeShow,
      ticketForm,
      voucherStyle,
      discountCouponStyle,
      showDiscountCoupon,
      showVoucher,
      rechargeReward,
      imageUrl,
      uploadRef,
      handleChange,
      beforeCarouselUpload,
      changFormToTicket,
      changFormToRecharge,
      handlePostMarketingActivity,
    };
  },
};
</script>
<style scoped>
.add-marketing-activity-form-grid {
  display: grid;
  grid-template-columns: 384px 785px;
  grid-template-rows: 20px 600px;
  gap: 30px 20px;
  grid-template-areas:
    "crumbs return-icon-box"
    "form form";
}
.background-image-example {
  position: absolute;
  top: 210px;
  left: 20px;
  height: 360px;
  width: 714px;
  border-radius: 4px;
  background-color: transparent;
}
.activity-button {
  height: 40px;
  width: 200px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border: none;
  font-size: 20px;
  font-weight: 550;
  color: white;
}
.activity-content-form1 {
  position: absolute;
  width: 400px;
  height: 428px;
  background-color: #0482ffd0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
}
.activity-content-form2 {
  position: absolute;
  width: 400px;
  height: 428px;
  background-color: #0482ffd0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 8px;
}
</style>

<style scoped>
.carousel-uploader .carousel-image {
  height: 360px;
  width: 714px;
  display: block;
  object-fit: cover; /* 确保图片覆盖整个容器 */
  object-position: center; /* 从图片的中心开始裁剪 */
}
.carousel-uploader .upload-picture {
  border: 1px dashed var(--el-border-color);
  height: 360px;
  width: 714px;
  display: block;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(244, 244, 245, 0.5);
  color: #8c939d;
}
.carousel-uploader .upload-picture:hover {
  color: #409eff;
  background-color: rgb(235.9, 245.3, 255);
}
</style>
<style>
.carousel-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  margin-bottom: 20px;
}

.carousel-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
  color: #409eff;
}

.el-icon-plus.carousel-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 258px;
  height: 258px;
  text-align: center;
}
</style>

<style scoped>
.upload-carousel-container {
  display: flex;
  justify-content: center;
  position: relative;
  background-color: #f0f2f5; /* 更改为更合适的背景颜色 */
  height: 420px;
  width: 720px;
  position: relative;
  left: 300px;
  top: 30px;
}
.upload-carousel-title {
  position: absolute;
  top: 4px;
  font-size: 18px;
  color: #294567;
}
</style>
