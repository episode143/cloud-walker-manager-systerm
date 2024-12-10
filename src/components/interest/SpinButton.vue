<template>
  <div class="container">
    <div class="circle">
      <div class="orbit"></div>
      <div class="icon-container">
        <div class="inner1"><i class="iconfont icon-xiangyun_xiangyun" style="font-size: 40px;"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RotatingIconOnCircle",
};
</script>

<style scoped>
.container {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.circle {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #f0f0f0; /* 按钮背景色 */
  overflow: hidden;
}
.orbit {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50px;
  left: 50px;
  border-radius: 50%;
  border-color: black;
  border: 2px solid;
}
.icon-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  font-size: 2em; /* 设置图标大小 */
  color: #02a7f0; /* 设置图标颜色 */
  animation: rotateOnCircle 5s linear infinite;
}
.inner1 {
  animation: spin-reverse 5s infinite linear;
}
@keyframes rotateOnCircle {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateX(70px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translateX(70px) rotate(-360deg);
  }
}
@keyframes spin-reverse {
  0% {
    transform: rotate(-90deg);
  }
  100% {
    transform: rotate(270deg);
  }
}
</style>
