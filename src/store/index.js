// src/store/index.js
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import api from "../api/index"; // 假设你有一个 api 文件来处理 API 请求

export default createStore({
  state: {
    messages: [],
  },
  getters: {
    getMessages(state) {
      return state.messages;
    },
    getUnreadedMessgaeCount(state) {
      return state.messages.filter((message) => !message.read).length;
    },
    getUnreadedContainerMessgaeCount(state) {
      return state.messages.filter(
        (message) => !message.read && message.type === "货柜待清理"
      ).length;
    },
    getUnreadedRobotMessgaeCount(state) {
      return state.messages.filter(
        (message) => !message.read && message.type === "机器人故障"
      ).length;
    },
    getUnreadedFinanceMessgaeCount(state) {
      return state.messages.filter(
        (message) => !message.read && message.type === "流水结算"
      ).length;
    },
    getUnreadedPartMessgaeCount(state) {
      return state.messages.filter(
        (message) => !message.read && message.type === "零件存量预警"
      ).length;
    },
    getUnreadedUserMessgaeCount(state) {
      return state.messages.filter(
        (message) => !message.read && message.type === "反馈建议"
      ).length;
    },
  },
  mutations: {
    setMessages(state, messages) {
      state.messages = messages;
    },
    setMessageHaveRead(state, index) {
      if (index >= 0 && index < state.messages.length) {
        state.messages[index].read = true;
      }
    },
  },
  actions: {
    async fetchSystemNotificationMessages({ commit }) {
      try {
        const response = await api.getSystemNotificationMessageList();
        if (response.code === 12061) {
          const formattedMessages = response.data.map((item, index) => ({
            id: index + 1,
            content: item.content,
            title: item.title,
            type: item.type,
            timestamp: item.timestamp,
            read: item.read,
            destinationId: item.relatedId?.toString() || item.userId,
            messageId: item.messageId,
          }));
          commit("setMessages", formattedMessages);
        } else {
          console.error("获取系统提示消息失败", response.msg);
        }
      } catch (error) {
        console.error("获取系统提示消息失败", error);
      }
    },
  },
  plugins: [
    createPersistedState({
      // 配置选项
      key: 'system-messages', // 自定义存储的键名
      storage: window.sessionStorage, // 使用 sessionStorage
      paths: ['messages'], // 只持久化 messages 状态
    }),
  ],
  modules: {},
});