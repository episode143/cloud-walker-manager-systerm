<template>
  <div class="login-container">
    <div class="login-card">
      <div style="grid-area: title; display: flex; align-items: center; justify-content: center">
        <h1 style="position: absolute; top: 0px; color: #40a0fff0">云行者配送管理员系统</h1>
        <!-- <h1>{{ rememberPassword }}</h1> -->
      </div>
      <div
        style="position: absolute; left: 40px; top: 70px; background-color: transparent; height: 300px; width: 300px; display: flex; align-items: center; justify-content: center; border-radius: 8px"
      >
        <SpinPicture />
      </div>

      <div style="grid-area: loginform; background-color: transparent; height: 300px; width: 500px; border-radius: 8px">
        <el-form
          :model="credentials"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          style="
            display: grid;
            width: 100%;
            height: 100%;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            padding-top: 50px;
            grid-template-areas:
              'username-input'
              'password-input'
              'remember-password';
          "
        >
          <el-form-item :prop="username" :style="{ 'grid-area': 'username-input', height: '100%', width: '100%' }">
            <el-input v-model="credentials.username" placeholder="请输入用户名" style="width: 350px; height: 40px; font-size: 18px" />
          </el-form-item>
          <el-form-item prop="password" style="grid-area: password-input; height: 100%; width: 100%">
            <el-input v-model="credentials.password" type="password" placeholder="请输入密码" show-password style="width: 350px; height: 40px; font-size: 18px" />
          </el-form-item>
          <el-form-item style="grid-area: remember-password">
            <h1 style="font-size: 20px; margin-right: 10px; color: #40e0d0">记住密码</h1>
            <el-switch v-model="rememberPassword" />
            <el-button type="primary" @click="handleLogin" style="margin-left: 40px; font-size: 16px; height: 32px">
              <!-- <i class="iconfont icon-xiangyun1" style="font-size: 30px;"></i> -->
              登录
              <!-- <i class="iconfont icon-xiangyun1" style="font-size: 30px; transform: scaleX(-1);"></i> -->
            </el-button>
            <el-button @click="handRegister" style="margin-left: 30px; font-size: 16px; height: 32px; background-color: #40e0d0; color: white; border: none">
              <!-- <i class="iconfont icon-xiangyun1" style="font-size: 30px;"></i> -->
              注册
              <!-- <i class="iconfont icon-xiangyun1" style="font-size: 30px; transform: scaleX(-1);"></i> -->
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, ref } from "vue";
import api from "../../api/index";
import { useRouter } from "vue-router";
import SpinPicture from "../../components/interest/SpinPicture.vue";
import { reactive } from "vue";
import { ElMessage } from "element-plus";
export default {
  components: {
    SpinPicture,
  },
  setup() {
    const credentials = ref({
      username: "",
      password: "",
    });
    const rememberPassword = ref(localStorage.getItem("cloud_walker_manager_remember_password") || false);
    const formRef = ref(null);
    const router = useRouter();
    const rules = reactive({
      username: [
        { required: true, message: "用户名不能为空", trigger: "blur" },
        { max: 10, message: "Username should not exceed 10 characters", trigger: "blur" },
      ],
      password: [
        { required: true, message: "密码不能为空", trigger: "blur" },
        {
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/,
          message: "密码不符合规范",
          trigger: "blur",
        },
      ],
    });
    //测试中（待修改）
    const handleLogin = async () => {
      try {
        const response = await api.login(credentials.value);
        if (response.code === 11011) {
          if (rememberPassword.value) {
            localStorage.setItem("cloud_walker_manager_username", credentials.value.username);
            localStorage.setItem("cloud_walker_manager_password", credentials.value.password);
          }
          localStorage.setItem("cloud_walker_manager_remember_password", JSON.stringify(rememberPassword.value));
          sessionStorage.setItem("token", response.data);
          sessionStorage.setItem("cloud_walker_manager_username", credentials.value.username);
          sessionStorage.setItem("cloud_walker_manager_password", credentials.value.password);
          ElMessage({
            type: "success",
            message: "登录成功，欢迎您上线云行者后台管理系统",
          });
          router.push({ path: "/admin/overview" });
        } else {
          console.error("登录失败，服务器返回:", response);
          ElMessage({
            type: "error",
            message: "登录失败，请检查用户名和密码",
          });
        }
      } catch (error) {
        console.error("登录请求失败", error);
        ElMessage({
          type: "error",
          message: "登录失败，请检查用户名和密码",
        });
      }
    };
    const handRegister = () => {
      router.push({ path: "/register" });
    };
    onMounted(() => {
      //console.log(window.innerWidth);
      //console.log(window.innerHeight);
      if (rememberPassword.value) {
        credentials.value.username = localStorage.getItem("cloud_walker_manager_username") || "";
        credentials.value.password = localStorage.getItem("cloud_walker_manager_password") || "";
      }
    });
    onBeforeMount(() => {
      const storedRememberPassword = localStorage.getItem("cloud_walker_manager_remember_password");
      if (storedRememberPassword !== null) {
        rememberPassword.value = JSON.parse(storedRememberPassword);
      }
    });
    //返回
    return {
      credentials,
      rememberPassword,
      formRef,
      rules,
      handleLogin,
      handRegister,
    };
  },
};
</script>

<style scoped>
* {
  font-family: "montserrat", sans-serif;
}

.login-container {
  width: 100%;
  height: 100vh;
  border: none;
  background-image: url("../../assets/background/cloud1.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
  animation: gradient-flow 200s linear infinite; /* 添加动画 */
}

/* 定义动画 */
@keyframes gradient-flow {
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 50% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  75% {
    background-position: 50% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.login-card {
  position: relative;
  width: 800px;
  height: 430px;
  border-radius: 24px;
  background-color: white;
  display: grid;
  grid-template-columns: 300px 500px;
  grid-template-rows: 30px 400px;
  gap: 0;
  grid-template-areas:
    "title title"
    "picture loginform";
}
.el-form-item >>> .el-form-item__error {
  font-size: 16px; /* 调整到所需的大小 */
  color: red; /* 可选：更改错误消息的颜色 */
  margin-top: -15px;
}
</style>
