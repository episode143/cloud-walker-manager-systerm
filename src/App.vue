<template>
  <div id="app" :style="scaleStyle">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseWidth: 1536, // 设计稿的基础宽度
      currentScale: 1,
    };
  },
  computed: {
    scaleStyle() {
      return {
        transform: `scale(${this.currentScale})`,
        transformOrigin: 'top left', // 缩放从左上角开始
        width: `${this.baseWidth}px`, // 固定宽度
        height: '100%',
        overflow: 'hidden', // 防止内容溢出
        position: 'absolute', // 确保缩放生效
        top: 0,
        left: 0,
      };
    },
  },
  mounted() {
    this.updateScale();
    window.addEventListener('resize', this.updateScale);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateScale);
  },
  methods: {
    updateScale() {
      const viewportWidth = window.innerWidth;
      let targetWidth;

      if (viewportWidth > 2560) {
        // 对于大于 2560px 的屏幕，使用 2560px 作为目标宽度
        targetWidth = 2560;
      } else if (viewportWidth >= 1536 && viewportWidth <= 2560) {
        // 对于介于 1536 和 2560px 之间的屏幕，使用实际的视口宽度
        targetWidth = viewportWidth;
      } else {
        // 对于小于 1536px 的屏幕，也使用实际的视口宽度
        targetWidth = viewportWidth;
      }

      this.currentScale = targetWidth / this.baseWidth;

      // 仅限制最小缩放比例为0.5
      if (this.currentScale < 0.5) this.currentScale = 0.5; // 最小缩放比例为0.5
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

.el-popper.is-customized {
  padding: 1px 10px;
  margin-bottom: 1px;
  background-color: #FAFCFF;
  font-size: 18px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #294567;
  border: 1px solid #294567;
}

.el-popper.is-customized .el-popper__arrow::before {
  background-color: #FAFCFF;
  border: 1px solid #294567;
  right: 0;
}

button:hover {
  cursor: pointer;
}
</style>