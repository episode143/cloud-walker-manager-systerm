<template>
  <div style="position: relative">
    <!-- 跳转卡片部分 -->
    <div class="management-grid">
      <BreadCrumbs :path1="'个人信息'" :path2="chooseFunction === 'account' ? '账户编辑' : '更改密码'" style="grid-area: crumbs" />
    </div>
    <button class="function-button" style="position: absolute; top: 60px" :style="accountFunctionButtonStyle" @click="changeToAccount">账户</button>

    <button class="function-button" style="position: absolute; top: 100px" :style="safetyFunctionButtonStyle" @click="changeToSafety">安全</button>

    <div class="information-form" v-show="chooseFunction === 'account'">
      <img :src="adminAvatarUrl" :alt="头像" class="admin-avatar" />
      <span class="admin-name">{{ adminInformation.username }}</span>
      <button class="change-avatar-button" @click="modifyAvatarDialogVisible = true">修改头像</button>
      <div class="gender-icon-box">
        <i class="iconfont" style="font-size: 32px" :class="genderIconClass" :style="genderIconColor"></i>
      </div>
      <div class="thanks-card">
        <h1 class="thanks-statement" style="position: absolute; top: 0px; left: 30px">thank you for your companionship</h1>
        <h1 class="thanks-statement" style="position: absolute; top: 50px; left: 30px; font-size: 32px">您已陪伴阿云</h1>
        <h1 class="thanks-statement" style="position: absolute; top: 44px; left: 230px; font-size: 36px">{{ adminInformation.tenure }}天</h1>
        <i class="iconfont icon-meigui" style="font-size: 80px; position: absolute; top: 30px; left: 360px; color: white"></i>
      </div>

      <div class="field-box-left" style="position: absolute; left: 40px; top: 200px">
        <h1>真实姓名</h1>
        <input type="text" id="name" v-model="adminInformation.realname" :readonly="notChange" :class="{ 'readonly-state': notChange , 'custom-focus' : true }" />
      </div>

      <div class="field-box-left" style="position: absolute; left: 40px; top: 300px">
        <h1>出生日期</h1>
        <input type="text" id="name" v-model="adminInformation.birthday" :readonly="notChange" :class="{ 'readonly-state': notChange , 'custom-focus' : true }" />
      </div>

      <div class="field-box-left" style="position: absolute; left: 40px; top: 400px">
        <h1>所在省份</h1>
        <input type="text" id="name" v-model="adminInformation.province" :readonly="isReadOnly" :class="{ 'readonly-state': isReadOnly , 'custom-focus' : true }" />
      </div>

      <div class="field-box-right" style="position: absolute; left: 495px; top: 200px">
        <h1>联系方式/电话</h1>
        <input type="text" id="name" v-model="adminInformation.telephone" :readonly="isReadOnly" :class="{ 'readonly-state': isReadOnly , 'custom-focus' : true }" />
      </div>

      <div class="field-box-right" style="position: absolute; left: 495px; top: 300px">
        <h1>联系方式/邮箱</h1>
        <input type="text" id="name" v-model="adminInformation.email" :readonly="isReadOnly" :class="{ 'readonly-state': isReadOnly , 'custom-focus' : true }" />
      </div>

      <div class="field-box-right" style="position: absolute; left: 495px; top: 400px">
        <h1>常住地址</h1>
        <input type="text" id="name" v-model="adminInformation.address" :readonly="isReadOnly" :class="{ 'readonly-state': isReadOnly , 'custom-focus' : true }" />
      </div>

      <button class="change-information-button" v-show="isReadOnly" @click="toggleEdit" :style="buttonStyle">编辑信息</button>
      <button class="change-information-button" v-show="!isReadOnly" @click="saveChanges" :style="buttonStyle">保存修改</button>
    </div>

    <div class="information-form" v-show="chooseFunction === 'safety'">
      <h2>修改密码</h2>
      <el-form :model="changeCode" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="旧密码" prop="oldPassword" style="width: 80%; position: absolute; left: 100px; top: 150px">
          <el-input v-model="changeCode.oldPassword" type="password" placeholder="请输入旧密码" show-password style="font-size: 18px"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword1" style="width: 80%; position: absolute; left: 100px; top: 225px; display: flex">
          <el-input v-model="changeCode.newPassword1" type="password" placeholder="请输入新密码" show-password style="font-size: 18px"> </el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="newPassword2" style="width: 80%; position: absolute; left: 100px; top: 300px">
          <el-input v-model="changeCode.newPassword2" type="password" placeholder="请再次输入新密码" show-password style="font-size: 18px"></el-input>
        </el-form-item>
        <el-form-item style="position: absolute; left: 312px; top: 400px">
          <el-button type="primary" @click="submitForm" style="font-size: 18px">提交</el-button>
          <el-button @click="resetForm" style="font-size: 18px">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

  <el-dialog title="确定提交修改" v-model="confirmChangeInformationDialogVisible" width="30%" :show-close="false">
    <div style="display: flex; width: 100%; justify-content: center">
      <button @click="confirmChange" class="confirm-change-button">确定</button>
      <button @click="cancelChange" class="cancel-change-button">取消</button>
    </div>
  </el-dialog>

  <el-dialog title="" v-model="modifyAvatarDialogVisible" style="width: 420px; height: 420px; display: flex; justify-content: center" :show-close="false">
    <div class="upload-avatar-container">
      <span class="upload-avatar-title">上传头像</span>
      <!-- 头像上传组件 -->
      <el-upload class="avatar-uploader" style="position: absolute; top: 34px" :auto-upload="false" :show-file-list="false" @change="handleChange" :before-upload="beforeAvatarUpload" ref="uploadRef">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <div class="upload-picture" v-else>
          <i class="iconfont icon-shangchuantouxiang upload-icon" style="font-size: 50px"></i>
        </div>
      </el-upload>

      <!-- 提交按钮 -->
      <el-button type="primary" @click="submitUpload" style="position: absolute; top: 360px; left: 120px">提交</el-button>
      <el-button style="position: absolute; top: 360px; right: 120px; background-color: rgb(243.9, 244.2, 244.8); color: rgb(115.2, 117.6, 122.4)" @click="modifyAvatarDialogVisible = false"
        >取消</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { computed, onMounted, ref, reactive } from "vue";
import BreadCrumbs from "../../components/BreadCrumbs.vue";
import { ElNotification, ElMessage } from "element-plus";
import api from "../../api/index";
import { base } from "../../api/path";
export default {
  components: {
    BreadCrumbs,
  },
  setup() {
    const adminAvatarUrl = computed(() => {
      return getAdminAvatarUrl(adminInformation.value.avatar);
    });

    const getAdminAvatarUrl = (avatarUrl) => {
      return base.baseUrl + avatarUrl; // 动态绑定路径
    };
    //确定新密码规范
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入新密码"));
      }
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)) {
        return callback(new Error("密码必须包含大小写字母、数字，且至少8位"));
      }
      callback();
    };
    //确定新密码
    const validateConfirmPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请再次输入新密码"));
      }
      if (value !== changeCode.newPassword1) {
        return callback(new Error("两次输入的新密码不一致"));
      }
      callback();
    };
    const inputElement = document.getElementById("myInput");
    const chooseFunction = ref("account");
    const accountFunctionButtonStyle = computed(() => {
      return chooseFunction.value === "account" ? "background-color: #2f95fc; color: white;" : "background-color: transparent; color: #294567;";
    });
    const safetyFunctionButtonStyle = computed(() => {
      return chooseFunction.value === "safety" ? "background-color: #2f95fc; color: white;" : "background-color: transparent; color: #294567;";
    });
    const buttonStyle = computed(() => {
      return isReadOnly.value ? "background-color: white; border: 2px solid #2f95fc; color: #2f95fc" : "background-color: #2f95fc; border: 1px solid #2f95fc; color: white";
    });
    const isReadOnly = ref(true);
    const notChange = ref(true);
    const genderIconClass = computed(() => {
      return adminInformation.value.gender === "男" ? "icon-xingbienan" : "icon-xingbienv";
    });
    const genderIconColor = computed(() => {
      return adminInformation.value.gender === "男" ? "color: #409EFF" : "color: #F56C6C";
    });
    const confirmChangeInformationDialogVisible = ref(false);
    const modifyAvatarDialogVisible = ref(false);
    // const changePasswordForm = ref({
    //   oldPassword:"",
    //   newPassword:"",
    //   againNewPassWord:"",
    // })
    const adminInformation = ref({
      avatar: "lijingyue.jpg",
    });
    //修改密码表单内容
    const changeCode = reactive({
      oldPassword: "",
      newPassword1: "",
      newPassword2: "",
    });

    //密码规则
    const rules = {
      oldPassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
      newPassword1: [
        { required: true, message: "请输入新密码", trigger: "blur" },
        { validator: validatePassword, trigger: "blur" },
      ],
      newPassword2: [
        { required: true, message: "请再次输入新密码", trigger: "blur" },
        { validator: validateConfirmPassword, trigger: "blur" },
      ],
    };

    const formRef = ref(null);

    // 为头像上传的逻辑
    // 用于存储图片的Base64字符串
    const imageBase64 = ref("");
    // 用于存储图片的URL（用于预览）
    const imageUrl = ref("");

    // 上传图片的类型
    const imageFileType = ref("");
    // 用于存储用户选择的文件
    let file = null;

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
      const reader = new FileReader();

      // 当文件读取完成时，将结果赋值给 imageBase64
      reader.onload = (e) => {
        imageBase64.value = e.target.result; // Base64 字符串
        imageUrl.value = URL.createObjectURL(uploadFile.raw); // 更新图片预览
      };

      // 开始读取文件为 Base64 字符串
      reader.readAsDataURL(uploadFile.raw);

      // 保存文件
      file = uploadFile.raw;
      imageFileType.value = file.type;
      //console.log("文件类型", imageFileType.value);
    };

    // 上传前的校验
    const beforeAvatarUpload = (rawFile) => {
      const allowedTypes = ["image/jpeg", "image/png"];

      // 检查文件类型
      if (!allowedTypes.includes(rawFile.type)) {
        ElMessage.error("选择照片必须是 JPG 或 PNG 格式!");
        return false;
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error("头像大小不能超过 2MB!");
        return false;
      }
      return true;
    };

    // 点击“提交”按钮时触发上传
    const submitUpload = async () => {
      if (!file) {
        ElMessage.warning("请选择一张照片作为新头像");
        return;
      }
      try {
        const params = {
          avatar: imageBase64.value, // Base64 字符串
          format: imageFileType.value,
        };

        // 发送 POST 请求到自定义 API 接口
        const response = await api.modifyAdminAvatar(params);
        if (response.code === 11061) {
          ElMessage.success("头像上传成功!");
          getAdminDetailedInformation();
        } else {
          ElMessage.error("头像上传失败，请稍后再试。");
        }
      } catch (error) {
        ElMessage.error("头像上传失败，请检查网络连接。");
        console.error("Upload error:", error);
      } finally {
        adminAvatarUrl.value = imageUrl.value;
        modifyAvatarDialogVisible.value = false;
      }
    };
    //提交表单
    const submitForm = () => {
      formRef.value.validate((valid) => {
        if (valid) {
          if (!checkOldPassword(changeCode.oldPassword)) {
            ElNotification({
              title: "修改失败",
              message: "旧密码错误",
              type: "error",
            });
            return;
          }
          // 所有条件都符合，打印消息
          changeAdminPassword();
          ElNotification({
            title: "处理中",
            message: "正在修改中，请稍候...",
            type: "info",
          });
        } else {
          ElNotification({
            title: "修改失败",
            message: "表单验证失败",
            type: "error",
          });
          return false;
        }
      });
    };

    //重置表单
    const resetForm = () => {
      formRef.value.resetFields();
    };

    //检查是否输入正确旧密码
    const checkOldPassword = (password) => {
      return password === sessionStorage.getItem("cloud_walker_manager_password"); // 替换为实际的旧密码验证逻辑
    };
    const changeToSafety = () => {
      chooseFunction.value = "safety";
    };
    const changeToAccount = () => {
      chooseFunction.value = "account";
    };
    const toggleEdit = () => {
      isReadOnly.value = false;
    };
    const confirmChange = () => {
      confirmChangeInformationDialogVisible.value = false;
      isReadOnly.value = true;
      changeAdminInformation();
    };
    const cancelChange = () => {
      confirmChangeInformationDialogVisible.value = false;
    };
    const saveChanges = () => {
      confirmChangeInformationDialogVisible.value = true;
    };
    //获取管理员详细信息
    const getAdminDetailedInformation = async () => {
      try {
        const response = await api.getAdminDetailedInformation();
        if (response.code === 11041) {
          adminInformation.value = response.data;
        } else {
          console.error("获取管理员详细信息失败", response.msg);
        }
      } catch (error) {
        console.log("获取管理员详细信息失败", error);
      }
    };

    const changeAdminInformation = async () => {
      try {
        const params = {
          telephone: adminInformation.value.telephone,
          email: adminInformation.value.email,
          address: adminInformation.value.address,
          province: adminInformation.value.province,
        };
        const response = await api.changeAdminInformation(params);
        if (response.code === 11071) {
          getAdminDetailedInformation();
          ElNotification({
            title: "修改成功",
            message: "修改个人信息成功",
            type: "success",
          });
        } else {
          ElNotification({
            title: "修改失败",
            message: response.msg,
            type: "error",
          });
          console.error("修改个人信息失败", response.msg);
        }
      } catch (error) {
        ElNotification({
          title: "修改失败",
          message: error.message,
          type: "error",
        });
        console.log("更改管理员信息失败", error);
      }
    };

    const changeAdminPassword = async () => {
      try {
        const params = {
          newPassword: changeCode.newPassword1,
        };
        const response = await api.changeAdminPassword(params);
        if (response.code === 11051) {
          getAdminDetailedInformation();
          ElNotification({
            title: "修改成功",
            message: "修改密码成功",
            type: "success",
          });
        } else {
          ElNotification({
            title: "修改失败",
            message: response.msg,
            type: "error",
          });
          console.error("更改管理员密码失败", response.msg);
        }
      } catch (error) {
        ElNotification({
          title: "修改失败",
          message: error.message,
          type: "error",
        });
        console.log("修改密码失败", error);
      }
    };
    onMounted(() => {
      getAdminDetailedInformation();
    });
    return {
      adminAvatarUrl,
      inputElement,
      chooseFunction,
      accountFunctionButtonStyle,
      safetyFunctionButtonStyle,
      isReadOnly,
      adminInformation,
      notChange,
      buttonStyle,
      confirmChangeInformationDialogVisible,
      modifyAvatarDialogVisible,
      genderIconClass,
      genderIconColor,
      changeCode,
      rules,
      formRef,
      imageUrl,
      uploadRef,
      handleChange,
      beforeAvatarUpload,
      submitUpload,
      submitForm,
      resetForm,
      changeToAccount,
      changeToSafety,
      toggleEdit,
      saveChanges,
      confirmChange,
      cancelChange,
    };
  },
};
</script>

<style scoped>
.management-grid {
  display: grid;
  grid-template-columns: 384px 785px;
  grid-template-rows: 20px;
  gap: 30px 20px;
  grid-template-areas: "crumbs return-icon";
}
.function-button {
  height: 40px;
  width: 140px;
  border-radius: 8px;
  /* background-color: #0482ff; */
  font-size: 18px;
  display: flex;
  justify-content: left;
  align-items: center;
  /* color: white; */
  padding-left: 20px;
  border: none;
  cursor: pointer;
}
.information-form {
  position: absolute;
  left: 160px;
  top: 60px;
  width: 1000px;
  height: 585px;
  background-color: white;
  border-radius: 8px;
}
.admin-avatar {
  position: absolute;
  left: 40px;
  top: 40px;
  width: 140px;
  height: 140px;
  border-radius: 16px;
  object-fit: cover;
  object-position: center;
}
.gender-icon-box {
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: transparent;
  top: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 372px;
}
.admin-name {
  position: absolute;
  top: 60px;
  left: 210px;
  font-size: 24px;
  color: #294567;
}
.change-avatar-button {
  position: absolute;
  top: 125px;
  left: 210px;
  width: 170px;
  height: 40px;
  background-color: transparent;
  border-radius: 8px;
  color: #327ee6;
  font-size: 18px;
  border: 2px solid #327ee6;
  cursor: pointer;
}
.thanks-card {
  position: absolute;
  top: 40px;
  left: 475px;
  width: 480px;
  height: 140px;
  border-radius: 16px;
  background: linear-gradient(45deg, #409eff, rgb(121.3, 187.1, 255));
  /* background-color: white;
  border: 2px solid #2f95fc; */
}
.thanks-statement {
  /* color: #2f95fc; */
  color: white;
  font-family: thanks-field;
  font-size: 24px;
}
.field-box-left {
  position: absolute;
  height: 65px;
  width: 400px;
  border-radius: 4px;
  background-color: transparent;
}
.field-box-right {
  position: absolute;
  height: 65px;
  width: 460px;
  border-radius: 4px;
  background-color: transparent;
}
.field-box-left h1 {
  position: absolute;
  top: -10px;
  left: 10px;
}
.field-box-left input {
  position: absolute;
  height: 35px;
  width: 380px;
  top: 40px;
  left: 0px;
  border-radius: 4px;
  font-size: 18px;
  padding-left: 10px;
  color: rgb(107, 99, 99);
  background-color: rgba(236, 245, 255, 0.5);
  border: 2px solid rgb(107, 99, 99);
  border: none;
}
.field-box-right input {
  position: absolute;
  height: 35px;
  width: 440px;
  top: 40px;
  left: 0px;
  border-radius: 4px;
  font-size: 18px;
  padding-left: 10px;
  color: rgb(107, 99, 99);
  background-color: rgba(236, 245, 255, 0.5);
  border: 2px solid rgb(107, 99, 99);
  border: none;
}
.field-box-right h1 {
  position: absolute;
  top: -10px;
  left: 10px;
}
.change-information-button {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 520px;
  left: 365px;
  height: 40px;
  width: 200px;
  background-color: #2f95fc;
  border: none;
  color: white;
  border-radius: 8px;
  font-size: 18px;
}
.confirm-change-button {
  height: 36px;
  width: 90px;
  border-radius: 8px;
  background-color: #2f95fc;
  border: none;
  color: white;
  font-size: 18px;
  margin: 10px 20px;
}
.cancel-change-button {
  height: 36px;
  width: 90px;
  border-radius: 8px;
  background-color: white;
  border: 2px solid #2f95fc;
  color: #2f95fc;
  font-size: 18px;
  margin: 10px 20px;
}
</style>

<style scoped>
/* ::v-deep是vue3提供的深度选择器，.el-form-item__label是element-plus官方定义的类 */
::v-deep .el-form-item__label {
  color: #294567;
  font-size: 18px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  margin-bottom: 20px;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
  color: #409eff;
}

.el-icon-plus.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

<style scoped>
.upload-avatar-container {
  display: flex;
  justify-content: center;
  position: relative;
  background-color: white;
  height: 420px;
  width: 420px;
  border-radius: 6px;
}
.upload-avatar-title {
  position: absolute;
  top: 4px;
  font-size: 18px;
  color: #294567;
}
</style>

<style scoped>
.avatar-uploader .avatar {
  width: 306px;
  height: 306px;
  display: block;
  object-fit: cover; /* 确保图片覆盖整个容器 */
  object-position: center; /* 从图片的中心开始裁剪 */
}
.avatar-uploader .upload-picture {
  border: 1px dashed var(--el-border-color);
  width: 306px;
  height: 306px;
  display: block;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: #8c939d;
}
.avatar-uploader .upload-picture:hover {
  color: #409eff;
}
.custom-focus:focus {
  border-color: #42b983; /* 你可以根据需要更改颜色 */
  outline: none; /* 移除默认的浏览器焦点样式 */
}
</style>
