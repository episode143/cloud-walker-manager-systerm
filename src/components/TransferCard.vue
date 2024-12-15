<template>
  <div class="transfer-header" :style="headerStyle">
    <h1 class="transfer-header-field-1">{{ field1 }}</h1>
    <h1 class="transfer-header-statistics-1">{{ statistics1 }}</h1>
    <h1 class="transfer-header-field-2">{{ field2 }}</h1>
    <button class="transfer-header-button" :style="buttonStyle"  @click="redirectToLink">
      <i class="iconfont" :class="iconClass" :style="iconStyle"></i>
    </button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'TransferCard',
  props: {
    field1: String,
    statistics1: String,
    field2: String,
    color: String,
    buttonColor: String,
    iconClass: String,
    link: String
  },
  setup(props) {
    const router = useRouter();
    const headerStyle = computed(() => ({
      backgroundColor: props.color,
      borderRadius: '8px'
    }));

    const buttonStyle = computed(() => ({
      backgroundColor: props.buttonColor,
    }));
    const redirectToLink = () => {
      if (props.link) {
        router.push(props.link);
      }
    };

    return {
      headerStyle,
      buttonStyle,
      redirectToLink
    };
  }
};
</script>

<style scoped>
.transfer-header {
  position: relative;
  height: 145px;
  width: 384px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.transfer-header-field-1 {
  position: absolute;
  text-align: left;
  top: 9px;
  left: 20px;
  height: 28px;
  font-size: 20px;
  color: white;
}

.transfer-header-statistics-1 {
  position: absolute;
  text-align: left;
  top: 60px;
  left: 20px;
  height: 32px;
  font-size: 26px;
  color: white;
}

.transfer-header-field-2 {
  position: absolute;
  top: 75px;
  left: 266px;
  height: 32px;
  width: 100px;
  font-size: 20px;
  font-weight: 350;
  color: white;
}

.transfer-header-button {
  position: absolute;
  top: 30px;
  left: 288px;
  height: 56px;
  width: 56px;
  border-radius: 28px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid rgb(243.9, 244.2, 244.8,0.2);
}

.transfer-header-button:hover {
  cursor: pointer;
  top: 32px;
  left: 290px;
  height: 52px;
  width: 52px;
  border-radius: 26px;
}

.transfer-header-button .iconfont {
  color: white;
  font-size: 32px;
}

.transfer-header-button:hover .iconfont {
  color: #02a7f0;
  font-size: 29px;
}
</style>