<template>
    <div class="finance-statistics-header-card" :style="{ backgroundColor: color }">
      <h1 class="finance-statistics-header-card-field-1" style="color: white;">{{ field1 }}</h1>
      <h1 class="finance-statistics-header-card-field-today" style="color: white;">{{ todayField }}</h1>
      <h1 class="finance-statistics-header-card-statistics-1" style="color: white;">{{ statistics1 }}</h1>
      <i class="iconfont change-icon" :class="changeIconClass"></i>
      <h1 class="finance-statistics-header-card-statistics-2" style="color: white;">{{ statistics2 }}</h1>
      <div class="finance-statistics-header-card-button" :style="{ backgroundColor: buttonColor }">
        <i class="iconfont" :class="iconClass" style="color: white; font-size: 32px;"></i>
      </div>
    </div>
  </template>
  
  <script>
import { computed } from 'vue';

  export default {
    name: 'FinanceStatisticsCard',
    props: {
      field1: String,
      todayField: String,
      statistics1: String,
      changeText: String,
      statistics2: String,
      color: String,
      buttonColor: String,
      iconClass: String
    },
    setup(props){
      const changeIconClass = computed(()=>{
        if(props.changeText === "增加") {
          return "icon-zengchang";
        } else if(props.changeText === "减少") {
          return "icon-jiangdi";
        } else {
          return "icon-chicangbubian";
        }
      });
      return {
        changeIconClass,
      }
    }
  };
  </script>
  
  <style scoped>
  .finance-statistics-header-card {
    position: relative;
    height: 168px;
    width: 483px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .finance-statistics-header-card-field-1 {
    position: absolute;
    text-align: left;
    left: 35px;
    top: 0px;
    height: 30px;
    font-size: 26px;
  }
  
  .finance-statistics-header-card-field-today {
    position: absolute;
    text-align: left;
    left: 380px;
    top: 10px;
    font-size: 20px;
    font-weight: 550;
  }
  
  .finance-statistics-header-card-statistics-1 {
    position: absolute;
    text-align: left;
    left: 35px;
    top: 70px;
    font-size: 26px;
  }
  .change-icon{
    position: absolute;
    font-size: 30px;
    color: white;
    top: 100px;
    left: 170px;
  }
  .finance-statistics-header-card-field-change {
    position: absolute;
    text-align: left;
    left: 235px;
    top: 73px;
    font-size: 20px;
  }
  
  .finance-statistics-header-card-statistics-2 {
    position: absolute;
    text-align: left;
    left: 205px;
    top: 80px;
    font-size: 22px;
  }
  
  .finance-statistics-header-card-button {
    position: absolute;
    top: 85px;
    left: 383px;
    height: 56px;
    width: 56px;
    border-radius: 28px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .finance-statistics-header-card-button .iconfont {
    font-size: 32px;
  }
  </style>