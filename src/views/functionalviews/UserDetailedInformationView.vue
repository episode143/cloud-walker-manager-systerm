<template>
  <div>
    <div class="user-detailed-onformation-grid">
      <BreadCrumbs :path1="'用户管理'" :path2="'详细信息'" style="grid-area: crumbs" />
      <div style="width: 786px; height: 50px; display: flex; justify-content: right; grid-area: return-icon-box">
        <ReturnIcon :link="'/admin/users/management'" />
      </div>
      <!-- 用户信息卡片 -->
      <div style="width: 1189px; background-color: white; height: 600px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); position: relative; grid-area: information">
        <h1 style="color: #294567; position: absolute; left: 140px; top: 10px">用户信息查看</h1>
        <img :src="getAvatarUrl(userInformation.avatar)" class="user-avatar" />
        <div class="username-box">
          <h1 style="font-weight: 550">用户名</h1>
          <h1 style="color: #409eff; position: absolute; left: 125px; font-weight: 500; font-size: 20px">{{ userInformation.username }}</h1>
        </div>
        <div class="sex-box">
          <h1 style="font-weight: 550">性别</h1>
          <i class="iconfont icon-xingbienan" style="position: absolute; left: 134px; font-size: 28px" :style="{ color: maleColor }"></i>
          <i class="iconfont icon-xingbienv" style="position: absolute; left: 220px; top: 5px; font-size: 28px" :style="{ color: femaleColor }"></i>
        </div>
        <div class="birthday-box">
          <h1 style="font-weight: 550">出生日期</h1>
          <h1 style="color: #409eff; position: absolute; font-weight: 500; left: 125px; font-size: 20px">{{ userInformation.birthday }}</h1>
        </div>
        <div class="phonenumber-box">
          <h1 style="font-weight: 550">注册手机号</h1>
          <h1 style="color: #409eff; position: absolute; left: 105px; font-weight: 500; left: 125px; font-size: 20px">{{ userInformation.phoneNumber }}</h1>
        </div>
        <div class="register-time-box">
          <h1 style="font-weight: 550">注册时间</h1>
          <h1 style="color: #409eff; position: absolute; font-weight: 500; left: 125px; font-size: 20px">{{ userInformation.createAt }}</h1>
        </div>
        <div class="withdraw-times-box">
          <h1 style="font-weight: 550">总存取次数</h1>
          <h1 style="color: #409eff; position: absolute; font-weight: 500; left: 125px; font-size: 20px">{{ userInformation.withdrawTimes }}次</h1>
        </div>
        <div class="balance-box">
          <i class="iconfont icon-gufengxiangyunyunduo201" style="font-size: 70px; color: white; position: absolute; top: 150px; left: 10px"></i>
          <h1 style="font-size: 24px; color: white; position: absolute; left: 20px; top: -5px; font-weight: 370">总资产（云币）</h1>
          <h1 style="font-size: 40px; color: white; position: absolute; left: 20px; top: 40px; font-weight: 370">{{ userInformation.balance }}</h1>
          <div
            style="
              width: 110px;
              height: 110px;
              border-radius: 50%;
              position: absolute;
              left: 370px;
              background-color: transparent;
              border: 5px solid white;
              top: 28px;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            <i class="iconfont icon-gufengxiangyunyunduo40" style="font-size: 63px; position: absolute; left: 18px; color: white"></i>
          </div>
          <button class="gift-button" @click="couponDialogVisible = true">赠送礼券</button>
        </div>
        <div class="usage-situation-box">
          <h1 style="font-weight: 550; font-size: 24px; margin-top: 16px; color: #294567">七天内配送使用情况</h1>
          <div class="usage-situation-display-box">
            <el-tooltip :content="'消费' + usageSituation[0].amount + '元'" placement="top" effect="customized">
              <div style="height: 100%; grid-area: inner1" class="usage-situation-block" :style="{ background: usageBlockBackground[0] }"></div>
            </el-tooltip>
            <el-tooltip :content="'消费' + usageSituation[1].amount + '元'" placement="top" effect="customized">
              <div style="height: 100%; grid-area: inner2" class="usage-situation-block" :style="{ background: usageBlockBackground[1] }"></div>
            </el-tooltip>
            <el-tooltip :content="'消费' + usageSituation[2].amount + '元'" placement="top" effect="customized">
              <div style="height: 100%; grid-area: inner3" class="usage-situation-block" :style="{ background: usageBlockBackground[2] }"></div>
            </el-tooltip>
            <el-tooltip :content="'消费' + usageSituation[3].amount + '元'" placement="top" effect="customized">
              <div style="height: 100%; grid-area: inner4" class="usage-situation-block" :style="{ background: usageBlockBackground[3] }"></div>
            </el-tooltip>
            <el-tooltip :content="'消费' + usageSituation[4].amount + '元'" placement="top" effect="customized">
              <div style="height: 100%; grid-area: inner5" class="usage-situation-block" :style="{ background: usageBlockBackground[4] }"></div>
            </el-tooltip>
            <el-tooltip :content="'消费' + usageSituation[5].amount + '元'" placement="top" effect="customized">
              <div style="height: 100%; grid-area: inner6" class="usage-situation-block" :style="{ background: usageBlockBackground[5] }"></div>
            </el-tooltip>
            <el-tooltip :content="'消费' + usageSituation[6].amount + '元'" placement="top" effect="customized">
              <div style="height: 100%; grid-area: inner7" class="usage-situation-block" :style="{ background: usageBlockBackground[6] }"></div>
            </el-tooltip>
          </div>
        </div>
      </div>
      <!-- 赠送礼券的弹窗 -->
      <el-dialog title="赠送礼券" v-model="couponDialogVisible" width="30%" :show-close="false">
        <el-form :model="couponForm" label-width="120px" ref="couponFormRef" :rules="couponRules">
          <el-form-item label="礼券类型" prop="type">
            <el-select v-model="couponForm.type" placeholder="请选择礼券类型" @change="handleCouponTypeChange">
              <el-option label="代金券" value="代金券"></el-option>
              <el-option label="折扣券" value="折扣券"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="减免金额" prop="amount" v-if="couponForm.type === '代金券'">
            <el-input v-model.number="couponForm.amount" type="number" :max="5" :min="1"></el-input>
          </el-form-item>
          <el-form-item label="折扣数" prop="discount" v-if="couponForm.type === 'discount'">
            <el-select v-model="couponForm.discount" placeholder="请选择折扣数">
              <el-option label="9.5折" value="0.95"></el-option>
              <el-option label="8.8折" value="0.88"></el-option>
              <el-option label="7.5折" value="0.75"></el-option>
              <el-option label="6.6折" value="0.66"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer" style="display: flex; justify-content: center">
            <el-button @click="couponDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitCouponForm">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { computed, ref, reactive, onMounted ,onActivated} from "vue";
import { useRoute } from "vue-router";
import BreadCrumbs from "../../components/BreadCrumbs.vue";
import ReturnIcon from "../../components/ReturnIcon.vue";
import api from "../../api/index";
import { ElNotification } from "element-plus";
import { base } from "../../api/path";
export default {
  components: {
    BreadCrumbs,
    ReturnIcon,
  },
  setup() {
    const route = useRoute();
    const userId = computed(() => route.params.userId);
    const ismale = computed(() => {
      return userInformation.value.gender === "男";
    });
    const maleColor = computed(() => {
      return ismale.value ? "#409EFF" : "#c4c4c4";
    });
    const femaleColor = computed(() => {
      return !ismale.value ? "#F56C6C" : "#c4c4c4";
    });
    const usageBlockBackground = computed(() => {
      return usageSituation.value.map((item) => {
        return item.hasUsed ? "linear-gradient(45deg, rgb(51.2, 126.4, 204), #409eff, rgb(197.7, 225.9, 255) 100%)" : "linear-gradient(45deg, rgb(177.3, 179.4, 183.6), rgb(221.7, 222.6, 224.4))";
      });
    });
    const usageSituation = ref([
      {
        hasUsed: true,
        amount: 12,
      },
      {
        hasUsed: true,
        amount: 10,
      },
      {
        hasUsed: false,
        amount: 0,
      },
      {
        hasUsed: true,
        amount: 3,
      },
      {
        hasUsed: false,
        amount: 0,
      },
      {
        hasUsed: true,
        amount: 7,
      },
      {
        hasUsed: false,
        amount: 0,
      },
    ]);
    const couponDialogVisible = ref(false);
    const couponForm = reactive({
      type: "代金券",
      amount: 1,
      discount: 0.95,
    });
    const getAvatarUrl = (avatarUrl) => {
      return base.baseUrl + avatarUrl; // 动态绑定路径
    };
    // const userInformation = ref({
    //   username: "蒙奇-D-路飞",
    //   avatar:"liuhuan.jpg",
    //   gender: "male",
    //   birthday: "2004-10-1",
    //   createAt: "2024-10-1",
    //   phoneNumber: "123456789",
    //   withdrawTimes: 12,
    //   balance: 12,
    // });
    const userInformation = ref({});
    const couponRules = reactive({
      type: [{ required: true, message: "请选择礼券类型", trigger: "change" }],
      amount: [
        { required: true, message: "请输入折扣金额", trigger: "blur" },
        { type: "number", min: 0, max: 5, message: "减免金额不能超过5元", trigger: "blur" },
      ],
      discount: [{ required: true, message: "请选择折扣数", trigger: "change" }],
    });

    const couponFormRef = ref(null);
    const handleCouponTypeChange = (value) => {
      if (value === "cash") {
        couponForm.discount = "";
      } else if (value === "discount") {
        couponForm.amount = null;
      }
    };
    //提交表单的内容（待完成axios内容。内含赠送礼券函数）
    const submitCouponForm = () => {
      couponFormRef.value.validate((valid) => {
        if (valid) {
          // 处理表单提交逻辑
          couponDialogVisible.value = false;
          rewardUserCoupon();
        } else {
          return false;
        }
      });
    };
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始，所以需要加 1
      const day = String(date.getDate()).padStart(2, "0"); // 确保天数是两位数
      return `${year}-${month}-${day}`; // 使用连字符分隔年、月、日
    };
    const addMonths = (date, months) => {
      const newDate = new Date(date);
      const day = newDate.getDate();
      newDate.setMonth(newDate.getMonth() + months);
      if (newDate.getDate() < day) {
        newDate.setDate(0);
      }
      return newDate;
    };
    //赠送用户礼券（待对接）
    const rewardUserCoupon = async () => {
      try {
        const today = new Date();
        const endDay = addMonths(today, 1);
        const params = {
          userId: route.params.userId,
          type: couponForm.type,
          amount: couponForm.type === "代金券" ? couponForm.amount : couponForm.discount,
          time: formatDate(today),
          endTime: formatDate(endDay),
        };
        const res = await api.rewardUserCoupon(params);
        if (res.code === 13071) {
          ElNotification({
            title: "处理成功",
            message: "礼券已经赠送",
            type: "success",
          });
        } else {
          ElNotification({
            title: "处理失败",
            message: "礼券赠送失败",
            type: "error",
          });
        }
      } catch (error) {
        ElNotification({
          title: "处理失败",
          message: error.message,
          type: "error",
        });
        console.log(error);
      }
    };

    //获取用户更加详细的数据
    const getUserDetailedInformation = async () => {
      try {
        const params = {
          userId: userId.value,
        };
        const response = await api.getUserDetailedInformation(params);
        if (response.code === 13081) {
          userInformation.value = response.data;
        } else {
          console.error("获取用户详细信息失败", response.msg);
        }
      } catch (error) {
        console.log("获取用户详细信息失败", error);
      }
    };

    //获取用户本周使用配送情况
    const getUserWeeklyUsage = async () => {
      try {
        const params = {
          userId: userId.value,
        };
        const response = await api.getUserWeeklyUsage(params);
        if (response.code === 13091) {
          usageSituation.value = response.data;
        } else {
          console.error("获取用户每周使用情况失败", response.msg);
        }
      } catch (error) {
        console.log("获取用户每周使用情况失败", error);
      }
    };
    //获取用户详细数据 获取用户本周使用情况
    onMounted(() => {
      getUserDetailedInformation();
      getUserWeeklyUsage();
    });
    onActivated(()=>{
      getUserDetailedInformation();
      getUserWeeklyUsage();
    });
    return {
      ismale,
      maleColor,
      femaleColor,
      usageSituation,
      usageBlockBackground,
      couponDialogVisible,
      couponForm,
      couponRules,
      couponFormRef,
      userInformation,
      getAvatarUrl,
      handleCouponTypeChange,
      submitCouponForm,
    };
  },
};
</script>
<style scoped>
.user-detailed-onformation-grid {
  display: grid;
  grid-template-columns: 384px 785px;
  grid-template-rows: 20px 145px;
  gap: 30px 20px;
  grid-template-areas:
    "crumbs return-icon-box"
    "information information";
}
.user-avatar {
  height: 158px;
  width: 158px;
  border-radius: 18px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: absolute;
  /* background-color: aquamarine; */
  top: 80px;
  left: 140px;
  /* background-image: url("../../assets/testavatar/p2.png"); */
  object-fit: cover;
  object-position: center;
}
.username-box {
  height: 30px;
  width: 400px;
  /* background-color: red; */
  position: absolute;
  left: 375px;
  top: 80px;
  display: flex;
  align-items: center;
  place-items: center start;
}
.sex-box {
  height: 30px;
  width: 300px;
  /* background-color: red;  */
  position: absolute;
  left: 725px;
  top: 80px;
  display: flex;
  align-items: center;
  place-items: center start;
}
.birthday-box {
  height: 30px;
  width: 300px;
  /* background-color: red;   */
  position: absolute;
  left: 375px;
  top: 145px;
  display: flex;
  align-items: center;
  place-items: center start;
}
.phonenumber-box {
  height: 30px;
  width: 300px;
  /* background-color: red;  */
  position: absolute;
  left: 375px;
  top: 210px;
  display: flex;
  align-items: center;
  place-items: center start;
}
.sum-withdraw-time-box {
  height: 30px;
  width: 300px;
  /* background-color: red;  */
  position: absolute;
  left: 250px;
  top: 200px;
  display: flex;
  align-items: center;
  place-items: center start;
}
.money-box {
  position: absolute;
}
.register-time-box {
  height: 30px;
  width: 400px;
  position: absolute;
  left: 725px;
  top: 145px;
  display: flex;
  align-items: center;
  place-items: center start;
}
.withdraw-times-box {
  height: 30px;
  width: 300px;
  /* background-color: red;   */
  position: absolute;
  left: 725px;
  top: 210px;
  display: flex;
  align-items: center;
  place-items: center start;
}
.balance-box {
  width: 535px;
  height: 230px;
  background-image: linear-gradient(45deg, #409eff, rgb(51.2, 126.4, 204));
  position: absolute;
  top: 305px;
  left: 460px;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.usage-situation-box {
  height: 230px;
  width: 270px;
  border-radius: 16px;
  background-color: #f2f6fc;
  position: absolute;
  top: 305px;
  left: 135px;
  display: flex;
  justify-content: center;
}
.gift-button {
  height: 35px;
  width: 123px;
  border-radius: 17px;
  position: absolute;
  left: 370px;
  top: 175px;
  font-size: 16px;
  background-color: transparent;
  border: 3px solid white;
  color: white;
}
.gift-button:hover {
  border-color: rgb(221.7, 222.6, 224.4);
  color: rgb(221.7, 222.6, 224.4);
  cursor: pointer;
  height: 37px;
  width: 125px;
  left: 369px;
  top: 174px;
  border-radius: 18px;
}
.usage-situation-display-box {
  height: 140px;
  width: 210px;
  display: grid;
  position: absolute;
  top: 65px;
  grid-template-columns: repeat(7, 1fr); /* 将容器分成七等分 */
  grid-gap: 10px; /* 设置每份之间的间距 */
  background-color: transparent;
  grid-template-areas: "inner1 inner2 inner3 inner4 inner5 inner6 inner7"; /* 定义网格区域 */
}
.usage-situation-block {
  border-radius: 6px;
  /* background-image: linear-gradient(45deg, rgb(51.2, 126.4, 204), #409eff, rgb(197.7, 225.9, 255) 100%); */
}
</style>
