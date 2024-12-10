<template>
  <div class="dashboard-transfer-header-card" :style="{ backgroundColor: color }">
    <h1 class="dashboard-transfer-header-card-field-1" style="color: white;">{{ field1 }}</h1>
    <h1 class="dashboard-transfer-header-card-field-today" style="color: white;">{{ todayField }}</h1>
    <h1 class="dashboard-transfer-header-card-statistics-1" style="color: white;">{{ statistics1 }}</h1>
    <h1 class="dashboard-transfer-header-card-field-change" :style="{ color: changecolor }">{{ changeText }}</h1>
    <h1 class="dashboard-transfer-header-card-statistics-2" style="color: white;">{{ statistics2 }}</h1>
    <div class="dashboard-transfer-header-card-button" :style="{ backgroundColor: buttonColor }">
      <i class="iconfont" :class="iconClass" style="color: white; font-size: 32px;"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashBoardTransferHeaderCard',
  props: {
    field1: String,
    todayField: String,
    statistics1: String,
    changeText: String,
    statistics2: String,
    color: String,
    buttonColor: String,
    changecolor: String,
    iconClass: String
  }
};
</script>

<style scoped>
.dashboard-transfer-header-card {
  position: relative;
  height: 140px;
  width: 383px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard-transfer-header-card-field-1 {
  position: absolute;
  text-align: left;
  left: 20px;
  top: 1px;
  height: 30px;
  width: 200px;
  font-size: 20px;
}

.dashboard-transfer-header-card-field-today {
  position: absolute;
  text-align: center;
  left: 300px;
  top: 3px;
  font-size: 20px;
}

.dashboard-transfer-header-card-statistics-1 {
  position: absolute;
  text-align: left;
  left: 20px;
  top: 63px;
  font-size: 26px;
}

.dashboard-transfer-header-card-field-change {
  position: absolute;
  text-align: left;
  left: 110px;
  top: 65px;
  font-size: 22px;
}

.dashboard-transfer-header-card-statistics-2 {
  position: absolute;
  text-align: left;
  left: 170px;
  top: 63px;
  font-size: 26px;
}

.dashboard-transfer-header-card-button {
  position: absolute;
  top: 68px;
  left: 293px;
  height: 56px;
  width: 56px;
  border-radius: 28px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard-transfer-header-card-button .iconfont {
  font-size: 32px;
}
</style>