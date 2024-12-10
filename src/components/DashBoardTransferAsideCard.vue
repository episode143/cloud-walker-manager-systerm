<template>
    <div class="dashboard-transfer-aside-card">
      <div class="dashboard-transfer-aside-card-iconbox" :style="{ backgroundColor: iconBackgroundColor }">
        <i class="iconfont" :class="iconClass" :style="{ color: 'white', fontSize: '50px' }"></i>
      </div>
      <h1 class="dashboard-transfer-aside-card-field-1">{{ field1 }}</h1>
      <h1 class="dashboard-transfer-aside-card-statictics-1">{{ statistics1 }}</h1>
      <h1 class="dashboard-transfer-aside-card-field-check"
          :style="{
            color: checkColor,
            cursor: isHovered ? 'pointer' : 'auto'
          }"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          @click="redirectToCheck">
        查看
      </h1>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  export default {
    name: 'DashBoardTransferAsideCard',
    props: {
      field1: String,
      iconClass: String,
      iconBackgroundColor: String,
      statistics1: String,
      link: String
    },
    setup(props) {
      const router = useRouter();
      const isHovered = ref(false);
      const checkColor = ref(props.iconBackgroundColor);
  
      const handleMouseEnter = () => {
        isHovered.value = true;
        checkColor.value = '#02A7F0';
      };
  
      const handleMouseLeave = () => {
        isHovered.value = false;
        checkColor.value = props.iconBackgroundColor;
      };
  
      const redirectToCheck = () => {
        if (props.link) {
          router.push(props.link);
        }
      };
  
      return {
        isHovered,
        checkColor,
        handleMouseEnter,
        handleMouseLeave,
        redirectToCheck
      };
    }
  };
  </script>
  
  <style scoped>
  .dashboard-transfer-aside-card {
    position: relative;
    height: 124px;
    width: 384px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .dashboard-transfer-aside-card-iconbox {
    position: absolute;
    top: 30px;
    left: 34px;
    height: 60px;
    width: 60px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .dashboard-transfer-aside-card-iconbox .iconfont {
    color: white;
    font-size: 50px;
  }
  
  .dashboard-transfer-aside-card-field-1 {
    position: absolute;
    text-align: left;
    top: 10px;
    left: 105px;
    font-size: 20px;
  }
  
  .dashboard-transfer-aside-card-statictics-1 {
    position: absolute;
    text-align: left;
    top: 48px;
    left: 105px;
    font-size: 20px;
  }
  .dashboard-transfer-aside-card-field-check {
  position: absolute;
  text-align: left;
  top: 44px;
  left: 265px;
  font-size: 20px;
}

  </style>