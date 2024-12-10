<template>
  <el-scrollbar height="405px" class="message-list">
    <MessageCard
      class="items"
      v-for="(message, index) in messages"
      :key="message.id"
      :content="message.content"
      :title="message.title"
      :type="message.type"
      :timestamp="message.timestamp"
      :destinationId="message.destinationId"
      :read ="message.read"
      @delete="deleteNotificationMessage(index, message.messageId, message.title)"
      @haveRead="haveReadSystemMessage(index, message.messageId)"
    />
  </el-scrollbar>
</template>

<script>
import { computed, onMounted } from "vue";
import MessageCard from "./MessageCard.vue";
import { ElScrollbar } from "element-plus";
import { ElNotification } from "element-plus";
import api from "../api/index";
import { useStore } from "vuex";
export default {
  components: {
    MessageCard,
    ElScrollbar,
  },
  setup() {
    const store = useStore();
    const messages = computed(() => {
      return store.getters.getMessages;
    });
    const deleteNotificationMessage = async (index, selectedMessageId, selectedTitle) => {
      try {
        const params = {
          messageId: selectedMessageId,
        };
        const response = await api.deleteSystemNotificationMessage(params);
        if (response.code === 12081) {
          //messages.value.splice(index, 1);
          ElNotification({
            title: "处理成功",
            message: "已处理" + selectedTitle + "事务",
            type: "success",
          });
          messages.value.splice(index, 1);
        } else {
          ElNotification({
            title: "删除失败",
            message: response.msg,
            type: "error",
          });
          console.error("修改零件水位线请求失败", response.msg);
          await store.dispatch("fetchSystemNotificationMessages");
        }
      } catch (error) {
        ElNotification({
          title: "删除失败",
          message: error,
          type: "error",
        });
        await store.dispatch("fetchSystemNotificationMessages");
        console.error("修改零件水位线请求失败", error);
      }
    };
    const haveReadSystemMessage = async (selectedIndex, selectedMessageId) => {
      try {
        const params = {
          messageId: selectedMessageId,
        };
        const response = await api.haveReadSystemMessage(params);
        if (response.code === 12071) {
          store.commit("setMessageHaveRead",selectedIndex)
        } else {
          console.error("设置信息已读请求失败", response.msg);
        }
      } catch (error) {
        console.error("设置信息已读请求失败", error);
      }
    };
    const fetchMessages = () => {
      store.dispatch("fetchSystemNotificationMessages");
    };
    onMounted(() => {
      fetchMessages();
    });
    return {
      messages,
      haveReadSystemMessage,
      deleteNotificationMessage,
    };
  },
};
</script>

<style scoped>
.message-list {
  width: 760px; /* 固定宽度 */
  border: none;
  background-color: white; /* 可选：背景颜色 */
}
</style>
