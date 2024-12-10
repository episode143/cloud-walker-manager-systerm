<template>
  <div class="container">
    <div class="circle">
      <i class="iconfont icon-redhat" 
         style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 100px; color: #40a0ffd7; z-index: 10; cursor: pointer;"
         @click="gotoRegister"
         :style="{ color: isHovered ? '#40a0ffd7' : '#40a0ffd7' }"
         @mouseover="isHovered = true"
         @mouseleave="isHovered = false"></i>
      <div class="orbit"></div>
      <div class="icon-container1" :class="{ 'speed-up': isSpeedUp }">
        <div class="inner1"><i class="iconfont icon-xiangyun_xiangyun" style="font-size: 75px"></i></div>
      </div>
      <div class="icon-container2" :class="{ 'speed-up': isSpeedUp }">
        <div class="inner2"><i class="iconfont icon-xiangyun_xiangyun" style="font-size: 75px"></i></div>
      </div>
      <div class="icon-container3" :class="{ 'speed-up': isSpeedUp }">
        <div class="inner3"><i class="iconfont icon-xiangyun_xiangyun" style="font-size: 75px"></i></div>
      </div>
      <div class="icon-container4" :class="{ 'speed-up': isSpeedUp }">
        <div class="inner4"><i class="iconfont icon-xiangyun_xiangyun" style="font-size: 75px"></i></div>
      </div>
      <div class="icon-container5" :class="{ 'speed-up': isSpeedUp }">
        <div class="inner5"><i class="iconfont icon-xiangyun_xiangyun" style="font-size: 75px"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: "RotatingIconOnCircle",
  setup() {
    const isSpeedUp = ref(false);
    const router = useRouter();
    const isHovered = ref(false);
    const animationPeriod = ref('8s');
    const speedUpIcons = () => {
      animationPeriod.value = '4s'; // 鼠标悬停时加速
    };

    const slowDownIcons = () => {
      animationPeriod.value = '8s'; // 鼠标离开时减速
    };

    const gotoRegister = () => {
      router.push('proclamation');
    };
    return {
      isSpeedUp,
      isHovered,
      speedUpIcons,
      slowDownIcons,
      gotoRegister
    };
  }
};
</script>

<style scoped>
.container {
  position: relative;
  width: 300px;
  height: 302px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.circle {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: transparent; /* 按钮背景色 */
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.orbit {
  position: absolute;
  width: 170px;
  height: 170px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 4px dashed #a3a3a2; /* 修改边框样式和颜色 */
  padding: 0;
  margin: 0;
}

.icon-container1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em; /* 设置图标大小 */
  color: #40a0ffd7; /* 设置图标颜色 */
  animation: rotateOnCircle1 8s linear infinite;
}

.icon-container2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em; /* 设置图标大小 */
  color: #40a0ffd7; /* 设置图标颜色 */
  animation: rotateOnCircle2 8s linear infinite;
}

.icon-container3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em; /* 设置图标大小 */
  color: #40a0ffd7; /* 设置图标颜色 */
  animation: rotateOnCircle3 8s linear infinite;
}

.icon-container4 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em; /* 设置图标大小 */
  color: #40a0ffd7; /* 设置图标颜色 */
  animation: rotateOnCircle4 8s linear infinite;
}

.icon-container5 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em; /* 设置图标大小 */
  color: #40a0ffd7; /* 设置图标颜色 */
  animation: rotateOnCircle5 8s linear infinite;
}

.inner1 {
  animation: spin-reverse1 8s infinite linear;
}

.inner2 {
  animation: spin-reverse2 8s infinite linear;
}

.inner3 {
  animation: spin-reverse3 8s infinite linear;
}

.inner4 {
  animation: spin-reverse4 8s infinite linear;
}

.inner5 {
  animation: spin-reverse5 8s infinite linear;
}

@keyframes rotateOnCircle1 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateY(115px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translateY(115px) rotate(-360deg);
  }
}

@keyframes rotateOnCircle2 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateX(-109.371px) translateY(35.537px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translateX(-109.371px) translateY(35.537px) rotate(-360deg);
  }
}

@keyframes rotateOnCircle3 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateX(-67.595px) translateY(-93.037px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translateX(-67.595px) translateY(-93.037px) rotate(-360deg);
  }
}

@keyframes rotateOnCircle4 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateX(67.595px) translateY(-93.037px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translateX(67.595px) translateY(-93.037px) rotate(-360deg);
  }
}

@keyframes rotateOnCircle5 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateX(109.371px) translateY(35.537px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translateX(109.371px) translateY(35.537px) rotate(-360deg);
  }
}

@keyframes spin-reverse1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse2 {
  0% {
    transform: rotate(72deg);
  }
  100% {
    transform: rotate(432deg);
  }
}

@keyframes spin-reverse3 {
  0% {
    transform: rotate(144deg);
  }
  100% {
    transform: rotate(504deg);
  }
}

@keyframes spin-reverse4 {
  0% {
    transform: rotate(216deg);
  }
  100% {
    transform: rotate(576deg);
  }
}

@keyframes spin-reverse5 {
  0% {
    transform: rotate(288deg);
  }
  100% {
    transform: rotate(648deg);
  }
}
</style>