<template>
    <div class="filtrate-header">
      <h1 class="filtrate-header-field-1">筛选</h1>
      <h2 class="filtrate-header-subfield-1">NAME1</h2>
      <div class="filtrate-header-selector-1"></div>
      <h2 class="filtrate-header-subfield-2">NAME2</h2>
      <div class="filtrate-header-selector-2"></div>
      <button class="filtrate-header-button">筛选</button>
    </div>
</template>
<style>
.filtrate-header {
  position: relative;
  height: 145px;
  width: 785px;
  background-color: white;
  border-radius: 8px;
}
.filtrate-header-field-1 {
  position: absolute;
  text-align: left;
  top: 9px;
  left: 35px;
  font-size: 20px;
  font-weight: 350;
}
.filtrate-header-subfield-1 {
  position: absolute;
  text-align: left;
  top: 47px;
  left: 35px;
  font-size: 16px;
  font-weight: 350;
}
.filtrate-header-subfield-2 {
  position: absolute;
  text-align: left;
  top: 47px;
  left: 330px;
  font-size: 16px;
  font-weight: 350;
}
.filtrate-header-selector-1 {
  position: absolute;
  top: 85px;
  left: 35px;
  height: 37px;
  width: 250px;
  font-size: 16px;
  font-weight: 350;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  border-color: rgba(0, 0, 0, 0.26);
}
.filtrate-header-selector-2 {
  position: absolute;
  top: 85px;
  left: 330px;
  height: 37px;
  width: 250px;
  font-size: 16px;
  font-weight: 350;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  border-color: rgba(0, 0, 0, 0.26);
}
.filtrate-header-button {
  position: absolute;
  top: 85px;
  left: 625px;
  height: 39px;
  width: 120px;
  background-color: #02a7f0;
  border-width: 0px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  color: white;
}
</style>