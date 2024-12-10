<template>
  <div class="menu">
    <el-aside width="200px">
      <el-menu 
      :default-active="activeIndex" 
      class="admin-aside" 
      @select="handleSelect" 
      background-color="white" 
      text-color="#8799AD" 
      active-text-color="#02A7F0">
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
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.menu .el-aside {
  height: 100%;
}
.menu .el-aside .el-menu {
  height: 100%;
  /* overflow-y: hidden; */
}
.menu .el-aside .el-submenu .el-menu-item {
  min-width: 0;
}
.el-aside{
    background-color: white;
    border: none;
}
.el-menu-demo{
  border: none;
}
.el-menu-item .iconfont{
  font-size: 26px;
}
.el-menu-item > span{
  padding-left: 26px;
}
.el-menu-item .arrow{
  padding-left: 4vh;
}
</style>
