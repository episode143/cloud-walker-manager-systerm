<template>
  <div class="message-card" :style="{ height: isExpanded ? '152px' : '71px', width: '760px' }">
    <div class="icon-container">
      <i class="iconfont icon-tishi"></i>
    </div>
    <div class="unread-dot" v-show="!read"></div>
    <div class="message-title-container">
      <h1 class="message-title">{{ title }}</h1>
    </div>
    <h1 class="time-content">{{ timestamp }}</h1>
    <i class="iconfont icon-zhankai extend-icon" :class="{ flipped: isIconFlipped }" @click="toggleExpand"></i>

    <div class="message-content" v-show="isExpanded">
      <p style="margin: 0px; text-align: left; line-height: 1.3; letter-spacing: 0.5px">{{ content }}</p>
    </div>

    <div class="check-button" @click="jumptoPath">
      <h1 style="font-size: 16px; color: #409eff; margin-top: 8px">查看</h1>
    </div>
    <div class="delete-button" @click="deleteMessage">
      <h1 style="font-size: 16px; color: rgb(115.2, 117.6, 122.4); margin-top: 8px">删除</h1>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  props: {
    content: String, //内容
    title: String, //标题
    type: String, //类型
    timestamp: String, //时间戳
    destinationId: String,
    read: Boolean,
    // 辅助信息
    // 1.机器人损坏就是机器人id 可以跳转到机器人实时位置的页面
    // 2.站点货柜待清理就是站点id 跳转到对应机器人的实时位置
    // 零件低于水位线什么也没有 跳转到零件仓库
    // 每月一号有结算提示 跳转到流水数据分析
  },
  emits: ["delete", "haveRead"],
  setup(props, { emit }) {
    const router = useRouter();
    const isExpanded = ref(false); // 控制卡片是否展开
    const isIconFlipped = ref(true); // 控制图标是否翻转
    const toggleExpand = () => {
      if (!props.read) emit("haveRead");
      isExpanded.value = !isExpanded.value; // 切换展开状态
      isIconFlipped.value = !isIconFlipped.value; // 切换图标翻转状态
    };
    const deleteMessage = () => {
      emit("delete");
    };
    const jumptoPath = () => {
      if (props.type === "货柜待清理") {
        router.push({ path: "/admin/stations/" + props.destinationId + "/container/management" });
      } else if (props.type === "机器人故障") {
        router.push({ path: "/admin/robots/" + props.destinationId + "/route" });
      } else if (props.type === "流水结算") {
        router.push({ path: "/admin/finance/statistics" });
      } else if (props.type === "零件存量预警") {
        router.push({ path: "/admin/robots/warehouse" });
      } else if (props.type === "反馈建议") {
        router.push({ path: "/admin/users/" + props.destinationId + "/info" });
      }
    };
    return {
      isExpanded,
      isIconFlipped,
      deleteMessage,
      toggleExpand,
      jumptoPath,
    };
  },
};
</script>

<style scoped>
/* 样式部分保持不变 */
.message-card {
  overflow: hidden;
  transition: height 0.3s ease; /* 平滑过渡效果 */
  background-color: #f5f7fa;
  border-radius: 4px;
  margin-bottom: 10px;
  position: relative;
}

.card-content {
  padding: 20px;
}

.icon-container {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background-color: #409eff;
  margin-top: 10px;
  margin-left: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-container .iconfont {
  font-size: 30px;
  color: white;
}
.message-title-container {
  position: absolute;

  height: 40px;
  width: 600px;
  /* background-color: red; */
  top: 4px;
  left: 60px;
  display: flex;
  justify-content: left;
  align-items: center;
}
.message-title {
  font-size: 20px;
  color: #294567;
}
.extend-icon {
  position: absolute;
  font-size: 30px;
  color: #294567;
  left: 370px;
  bottom: -1px;
  margin: 0px;
}
.extend-icon:hover {
  color: #409eff;
}
.extend-icon.flipped {
  transform: rotateX(180deg); /* 上下翻转 */
}
.time-content {
  font-size: 16px;
  font-weight: 500;
  color: #29456790;
  position: absolute;
  top: 1px;
  right: 30px;
}
.message-content {
  position: absolute;
  top: 47px;
  width: 540px;
  height: 75px;

  display: flex;
  justify-content: left;
  left: 60px;
}
.check-button {
  position: absolute;
  left: 630px;
  top: 93px;
  height: 30px;
  border-bottom: 2px solid #409eff;
  cursor: pointer;
}
.delete-button {
  position: absolute;
  left: 690px;
  top: 93px;
  height: 30px;
  border-bottom: 2px solid rgb(115.2, 117.6, 122.4);
  cursor: pointer;
}
.unread-dot {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  position: absolute;
  top: 19px;
  right: 10px;
  animation: colorChange 5s infinite alternate;
}
@keyframes colorChange {
  0% {
    background-color: #00c5ff;
  }
  100% {
    background: #409eff; /* 最终颜色 */
  }
}
</style>
