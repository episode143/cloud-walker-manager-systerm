<template>
  <div class="header">
    <el-header>
      <div class="title">云行者</div>
      <div>{{ name }}</div>
    </el-header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "管理员",
    };
  },
  created() {},
  computed: {},
  methods: {},
};
</script>
<style scoped>
.header .el-header {
  background: blue;
  color: #fff;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  margin: 0px;
  padding: 0;
}
.header .el-header .title {
  width: 200px;
  font-size: 26px;
}
</style>
