<template>
  <div class="common-layout" style="background-color: #f1f4f5">
    <el-container>
      <el-header class="admin-header">
        <!-- <div class="sepreate-line"></div> -->
        <i class="iconfont icon-xiangyun_xiangyun"></i>
        <!-- <i class="iconfont icon-huabian10" style="position: absolute; top: 0px; left: 2px; font-size: 32px; color: #0482ff"></i> -->
        <h1 class="title">云行者</h1>
        <el-popover placement="bottom" title="" :width="150" trigger="hover" content="" :offset="17">
          <template #reference>
            <div style="position: absolute; height: 30px; width: 30px; right: 100px; top: 14px">
              <el-badge :value="unreadedMessageCount" :max="99" class="item">
                <div style="height: 30px; width: 30px; border: none; display: flex; justify-content: center; align-items: center">
                  <i class="iconfont icon-mention" style="font-size: 32px; color: #0482ff; left: 0px"></i>
                </div>
              </el-badge>
            </div>
          </template>
          <template #default>
            <div class="popover-content">
              <div class="notification-container">
                <div class="notification-item" style="top: -5px">
                  <el-badge :value="unreadedContainerMessageCount" class="badge-notification">
                    <button class="action-button" @click="jumptoDashboard">站点货柜清理</button>
                  </el-badge>
                </div>
                <div class="notification-item" style="top: 30px">
                  <el-badge :value="unreadedUserMessageCount" class="badge-notification">
                    <button class="action-button" @click="jumptoDashboard">用户反馈建议</button>
                  </el-badge>
                </div>
                <div class="notification-item" style="top: 65px">
                  <el-badge :value="unreadedRobotMessageCount" class="badge-notification">
                    <button class="action-button" @click="jumptoDashboard">机器损坏提示</button>
                  </el-badge>
                </div>
                <div class="notification-item" style="top: 100px">
                  <el-badge :value="unreadedPartMessageCount" class="badge-notification">
                    <button class="action-button" @click="jumptoDashboard">零件水位预警</button>
                  </el-badge>
                </div>
                <div class="notification-item" style="top: 135px">
                  <el-badge :value="unreadedFinanceMessageCount" class="badge-notification">
                    <button class="action-button" @click="jumptoDashboard">月度营收结算</button>
                  </el-badge>
                </div>
              </div>
            </div>
          </template>
        </el-popover>
        <el-popover placement="bottom" title="" :width="100" trigger="hover" content="">
          <template #reference>
            <img :src="getAdminAvatarUrl(avatarUrl)" alt="管理员头像" class="avatar" style="cursor: pointer" />
          </template>
          <template #default>
            <div class="popover-content">
              <div class="hover-box">
                <button class="hover-box-button" style="top: -5px; border-bottom: 2px solid #409eff; color: #294567; font-weight: 550" @click="jumptoPersonalInformation">{{ username }}</button>
                <button class="hover-box-button" style="top: 30px" @click="jumptoPersonalInformation">账户设置</button>
                <button class="hover-box-button" style="top: 65px" @click="logout">退出</button>
              </div>
            </div>
          </template>
        </el-popover>
        <div class="sepreate-line" style="height: 3px; width: 100%; position: absolute; top: 59px"></div>
      </el-header>
      <el-container>
        <el-aside class="admin-aside" :style="{ height: correctedAsideHeight }">
          <el-menu
            :default-active="activeIndex"
            class="admin-aside"
            :style="{ height: correctedAsideHeight }"
            @select="handleSelect"
            background-color="white"
            text-color="#8799AD"
            active-text-color="#0482FF"
          >
            <el-menu-item index="/admin/overview">
              <i class="iconfont icon-zonglan"></i>
              <span>数据总览</span>
              <i class="iconfont icon-jiantou2 arrow"></i>
            </el-menu-item>
            <el-menu-item index="/admin/users/management">
              <i class="iconfont icon-yonghuguanli"></i>
              <span>用户管理</span>
              <i class="iconfont icon-jiantou2 arrow"></i>
            </el-menu-item>
            <el-menu-item index="/admin/robots/management">
              <i class="iconfont icon-iconfont_B_icon_"></i>
              <span>机器管理</span>
              <i class="iconfont icon-jiantou2 arrow"></i>
            </el-menu-item>
            <el-menu-item index="/admin/stations/management">
              <i class="iconfont icon-yewu-dailidian"></i>
              <span>站点管理</span>
              <i class="iconfont icon-jiantou2 arrow"></i>
            </el-menu-item>
            <el-menu-item index="/admin/orders/management">
              <i class="iconfont icon-dingdanguanli"></i>
              <span>订单管理</span>
              <i class="iconfont icon-jiantou2 arrow"></i>
            </el-menu-item>
            <el-menu-item index="/admin/finance/management">
              <i class="iconfont icon-jiaofuliushuiguanli"></i>
              <span>流水管理</span>
              <i class="iconfont icon-jiantou2 arrow"></i>
            </el-menu-item>
            <el-menu-item index="/admin/marketing/management">
              <i class="iconfont icon-weixinyingxiaohuodong"></i>
              <span>营销管理</span>
              <i class="iconfont icon-jiantou2 arrow"></i>
            </el-menu-item>
            <el-menu-item index="/admin/personal/info">
              <i class="iconfont icon-gerenxinxi"></i>
              <span>个人信息</span>
              <i class="iconfont icon-jiantou2 arrow"></i>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main-content">
          <div class="router-view-container" :style="{ height: correctedViewHeight }" ref="routerViewContainer">
            <router-view v-slot="{ Component }">
              <transition>
                <keep-alive>
                  <component :is="Component"></component>
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { computed, onMounted, ref, nextTick, onUnmounted } from "vue";
import { base } from "../../api/path";
import api from "../../api/index";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const unreadedMessageCount = computed(() => store.getters.getUnreadedMessgaeCount);
    const unreadedContainerMessageCount = computed(() => store.getters.getUnreadedContainerMessgaeCount);
    const unreadedRobotMessageCount = computed(() => store.getters.getUnreadedRobotMessgaeCount);
    const unreadedFinanceMessageCount = computed(() => store.getters.getUnreadedFinanceMessgaeCount);
    const unreadedPartMessageCount = computed(() => store.getters.getUnreadedPartMessgaeCount);
    const unreadedUserMessageCount = computed(() => store.getters.getUnreadedUserMessgaeCount);
    const windowHeight = ref(window.innerHeight);
    const router = useRouter();
    const username = ref("");
    const route = useRoute();
    const avatarUrl = ref("");
    const routerViewContainer = ref(null); // 获取 router-view 的 DOM 元素
    //实时监听激活索引
    const computeActiveIndex = (path) => {
      if (path.startsWith("/admin/overview")) {
        return "/admin/overview";
      } else if (path.startsWith("/admin/users")) {
        return "/admin/users/management";
      } else if (path.startsWith("/admin/robots")) {
        return "/admin/robots/management";
      } else if (path.startsWith("/admin/stations")) {
        return "/admin/stations/management";
      } else if (path.startsWith("/admin/orders")) {
        return "/admin/orders/management";
      } else if (path.startsWith("/admin/finance")) {
        return "/admin/finance/management";
      } else if (path.startsWith("/admin/marketing")) {
        return "/admin/marketing/management";
      } else if (path.startsWith("/admin/personal")) {
        return "/admin/personal/info";
      } else {
        return path;
      }
    };

    const correctedViewHeight = computed(() => {
      let modifyHeight = (windowHeight.value * 1536) / window.innerWidth - 62;
      return modifyHeight.toString() + "px";
    });

    const correctedAsideHeight = computed(() => {
      let modifyHeight = (windowHeight.value * 1536) / window.innerWidth - 60;
      return modifyHeight.toString() + "px";
    });
    const activeIndex = computed(() => {
      return computeActiveIndex(route.path);
    });

    const getAdminAvatarUrl = (URL) => {
      return base.baseUrl + URL;
    };

    const logout = () => {
      router.push({ path: "/login" });
    };

    const jumptoPersonalInformation = () => {
      router.push({ path: "/admin/personal/info" });
    };

    const jumptoDashboard = () => {
      router.push({ path: "/admin/overview" });
    };
    const getAdminDetailedInformation = async () => {
      try {
        const response = await api.getAdminDetailedInformation();
        if (response.code === 11041) {
          avatarUrl.value = response.data.avatar;
          username.value = response.data.username;
        } else {
          console.error("获取管理员详细信息失败", response.msg);
        }
      } catch (error) {
        console.log("获取管理员详细信息失败", error);
      }
    };
    const handleSelect = async (key) => {
      // 导航到新路径
      await router.push(key);

      // 确保 DOM 更新完成后滚动到顶部
      await nextTick();
      if (routerViewContainer.value) {
        routerViewContainer.value.scrollTop = 0;
      }
    };

    const handleResize = () => {
      windowHeight.value = window.innerHeight;
      //console.log(`高度变化: ${windowHeight.value}px`);
      // 在这里可以添加更多逻辑，例如调整布局或样式
    };
    // 监听路由变化，自动更新 activeIndex
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      //console.log(window.innerWidth);
      //console.log(window.innerHeight);
      getAdminDetailedInformation();
      router.afterEach((to) => {
        if (to.path.startsWith("/admin/overview")) {
          activeIndex.value = "/admin/overview";
        } else if (to.path.startsWith("/admin/users")) {
          activeIndex.value = "/admin/users/management";
        } else if (to.path.startsWith("/admin/robots")) {
          activeIndex.value = "/admin/robots/management";
        } else if (to.path.startsWith("/admin/stations")) {
          activeIndex.value = "/admin/stations/management";
        } else if (to.path.startsWith("/admin/orders")) {
          activeIndex.value = "/admin/orders/management";
        } else if (to.path.startsWith("/admin/finance")) {
          activeIndex.value = "/admin/finance/management";
        } else if (to.path.startsWith("/admin/marketing")) {
          activeIndex.value = "/admin/marketing/management";
        } else if (to.path.startsWith("/admin/personal")) {
          activeIndex.value = "/admin/personal/info";
        }
        // sessionStorage.setItem("activeIndex", to.path);
      });
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    return {
      unreadedMessageCount,
      unreadedContainerMessageCount,
      unreadedRobotMessageCount,
      unreadedFinanceMessageCount,
      unreadedPartMessageCount,
      unreadedUserMessageCount,
      avatarUrl,
      username,
      activeIndex,
      routerViewContainer,
      correctedViewHeight,
      correctedAsideHeight,
      windowHeight,
      logout,
      jumptoDashboard,
      jumptoPersonalInformation,
      getAdminAvatarUrl,
      handleSelect,
    };
  },
};
</script>

<style scoped>
.admin-header {
  position: relative;
  width: 100%;
  height: 62px;
  /* background-image: url(../../assets/background/layout1.jpg);
  background-position: center top 80%; */
  background-color: white;
  margin: 0;
  padding: 0;
}
.admin-header .sepreate-line {
  width: 100%;
  height: 4px;
  background-color: #0482ff;
  margin: 0;
  padding: 0;
}
.admin-header .iconfont {
  position: absolute;
  top: 3px;
  left: 35px;
  font-size: 50px;
  color: #0482ff;
}
.admin-header .title {
  position: absolute;
  top: 7px;
  left: 95px;
  color: #0482ff;
  font-size: 30px;
  padding: 0;
  margin: 0;
}
.admin-aside {
  width: 215px;
  height: 670px;
  background-color: white;
  border: none;
}
.el-menu-demo {
  border: none;
}
.el-menu-item .iconfont {
  font-size: 26px;
  padding-left: 0.3vh;
}
.el-menu-item > span {
  padding-left: 20px;
  font-size: 18px;
}
.el-menu-item .arrow {
  padding-left: 30px;
}
.el-menu-item.is-active {
  background-color: #f2f2f2;
}
.router-view-container {
  width: 1189px; /* 固定宽度 */
  height: 668px; /* 固定高度 */
  margin: 0 auto; /* 水平居中 */
  overflow: auto; /* 处理超出部分的内容 */
  background-color: transparent; /* 背景颜色 */
}
.main-content {
  background-color: transparent;
  padding: 0px;
  display: grid;
  place-items: center;
  height: 100%;
}
</style>
<style scoped>
.avatar {
  position: absolute;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  right: 30px;
  top: 9px;
  display: block;
  object-fit: cover; /* 确保图片覆盖整个容器 */
  object-position: center; /* 从图片的中心开始裁剪 */
  /* border: 2px solid rgb(221.7, 222.6, 224.4); */
}
.hover-box {
  height: 95px;
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  position: relative;
}
.hover-message-box {
  height: 165px;
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  position: relative;
}
.hover-box-button {
  position: absolute;
  height: 35px;
  width: 100%;
  background-color: transparent;
  color: #0482ff;
  font-size: 17px;
  border: none;
}
.hover-box-button:hover {
  background-color: #409eff;
  color: white;
  border-radius: 4px;
}
</style>

<style scoped>
.notification-container {
  height: 165px;
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  position: relative;
}

.notification-item {
  margin-left: 10px;
  position: absolute;
  width: 100%; /* 确保与 .notification-container 的宽度一致 */
}

.action-button {
  position: relative; /* 使徽章能够相对于按钮定位 */
  height: 35px;
  width: 100%;
  background-color: transparent;
  color: #0482ff;
  border-radius: 4px;
  font-size: 17px;
  border: none;
  z-index: 1; /* 确保按钮在徽章之下 */
}

.action-button:hover {
  background-color: #0482ff;
  color: white;
}
.badge-notification .el-badge__content {
  top: 0;
  right: 0;
}
</style>
