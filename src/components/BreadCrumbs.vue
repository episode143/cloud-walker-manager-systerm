<template>
  <div class="breadcrumbs-box">
    <i class="iconfont icon-home" style="color: #294567;"></i>
    <h1 class="crumbs-path1" style="color: #294567;">{{ path1 }}</h1>
    <h1 class="crumbs-path2">{{ path2 }}</h1>
  </div>
</template>
<script>
export default{
  props: {
    path1: {
      type: String,
      required: true
    },
    path2: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped>
.breadcrumbs-box {
  display: flex;
  align-items: center;
  gap: 8px; /* 间距 */
  height: 50px;
}

.breadcrumbs-box .iconfont {
  font-size: 26px; /* 根据需要调整图标大小 */
}

.crumbs-path1,
.crumbs-path2 {
  margin: 0;
  font-size: 20px; /* 根据需要调整字体大小 */
  font-weight: 350;
}

.crumbs-path2 {
  color: #0482ff;
}
</style>
