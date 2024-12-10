<template>
  <div class="return-icon-box" @click="returnRouter">
    <h1 class="return-field">返回</h1>
    <i class="iconfont icon-fanhui"></i>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  props: {
    link: String,
  },
  setup(props) {
    const router = useRouter();
    const returnRouter = () => {
      router.push(props.link);
    };
    return {
      returnRouter,
    };
  },
};
</script>
<style scoped>
.return-icon-box {
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 4px; /* 间距 */
  height: 50px;
  width: 70px;
  cursor: pointer;
}
.return-icon-box .iconfont {
  font-size: 24px;
  color: #0482ff;
}
.return-field {
  margin: 0;
  font-size: 20px; /* 根据需要调整字体大小 */
  font-weight: 350;
  color: #0482ff;
  cursor: pointer;
}
</style>
