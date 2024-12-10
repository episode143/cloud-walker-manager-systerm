<template>
  <div>
    <div class="user-detailed-onformation-grid">
      <BreadCrumbs :path1="'机器人管理'" :path2="'查看实时位置'" style="grid-area: crumbs" />
      <div style="width: 786px; height: 50px; display: flex; justify-content: right; grid-area: return-icon-box">
        <ReturnIcon :link="'/admin/robots/management'" />
      </div>
    </div>
    <div class="realtime-path-map-container">
      <div id="mapContainer" class="realtime-path-map"></div>
      <div class="grid-box-containet">
        <div style="grid-area: box1;" class="info-box">
          <span class="field">配送总路程 ></span>
          <span class="data">1.2km</span>
        </div>
        <div style="grid-area: box2;" class="info-box">
          <span class="field">预计送达时间 ></span>
          <span class="data">12:00</span>
        </div>
        <div style="grid-area: box3;" class="info-box">
          <span class="field">当前状态 ></span>
          <span class="data-field">维修中</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import BreadCrumbs from "../../components/BreadCrumbs.vue";
import ReturnIcon from "../../components/ReturnIcon.vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import api from "../../api/index";
import { onMounted, onUnmounted, ref } from "vue";

const route = useRoute();
const robotId = route.params.robotId;

let map = null;
let start = ref({
  lat: 0,
  lng: 0,
});
let destination = ref({
  lat: 0,
  lng: 0,
});
let location = ref({
  lat: 0,
  lng: 0,
});

const getStartAndDest = async () => {
  const res = await api.getRobotStartAndDest({
    robotId: robotId,
  });
  start.value.lng = res.data.from.longitude;
  start.value.lat = res.data.from.latitude;
  destination.value.lng = res.data.to.longitude;
  destination.value.lat = res.data.to.latitude;
};

const getLocation = async () => {
  const res = await api.getRobotLat({
    robotId: robotId,
  });
  console.log(res);

  location.value.lng = res.data.longitude;
  location.value.lat = res.data.latitude;
};

const addTrace = () => {
  AMap.plugin("AMap.Walking", function () {
    let walking = new AMap.Walking({
      //map 指定将路线规划方案绘制到对应的 AMap.Map 对象上
      map: map,
      isOutline: true,
    });
    //搜索完成后，将自动绘制路线到地图上
    let sta_lat = start.value.lat;
    let sta_lng = start.value.lng;
    let des_lat = destination.value.lat;
    let des_lng = destination.value.lng;

    walking.search(new AMap.LngLat(sta_lat, sta_lng), new AMap.LngLat(des_lat, des_lng));
  });
};

onMounted(async () => {
  await getStartAndDest();
  await getLocation();
  console.log([location.value.lat, location.value.lng]);

  window._AMapSecurityConfig = {
    securityJsCode: "80a9abd3217001b61b8c314933584e36",
  };

  AMapLoader.load({
    key: "a6f37ea40ac5c9ad84fdbb84c4f13aa9", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.ControlBar", "AMap.HawkEye", "AMap.Walking"], // 需要使用的插件列表
  })
    .then((AMap) => {
      map = new AMap.Map("mapContainer", {
        zoom: 22,
        center: new AMap.LngLat(location.value.lat, location.value.lng), // 默认天马学生公寓为中心
      });
      console.log("before trace");
      addTrace();
      console.log("after trace");
    })
    .catch((e) => {
      console.log(e);
    });
});

onUnmounted(() => {
  map?.destroy();
});
</script>
<style scoped>
.user-detailed-onformation-grid {
  display: grid;
  grid-template-columns: 384px 785px;
  grid-template-rows: 20px;
  gap: 30px 20px;
  grid-template-areas: "crumbs return-icon-box";
}
.realtime-path-map {
  width: 1185px;
  height: 596px;
  background-color: white;
  border-radius: 16px;
  position: absolute;
}
.realtime-path-map-container {
  position: relative;
  top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #409eff;
  height: 600px;
  width: 1189px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.grid-box-containet {
  padding-left: 50px;
  padding-right: 50px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0 50px;
  display: grid;
  grid-template-areas: "box1 box2 box3";
  position: absolute;
  height: 55px;
  width: 1089px;
  background-color: transparent;
  z-index: 2;
  bottom: 25px;
}
.info-box{
  background-color: #409EFF;
  border: 2px solid rgb(159.5, 206.5, 255);
  border-radius: 8px;
  display: flex;
  align-items: center;
}
.info-box .field{
  color: white;
  font-size: 20px;
  font-weight: 550;
  margin-left: 30px;
}
.info-box .data{
  color: white;
  font-size: 22px;
  font-weight: 500;
  margin-left: 30px;
  margin-top: 3px;
}
.info-box .data-field{
  color: white;
  font-size: 20px;
  font-weight: 500;
  margin-left: 30px;
}
</style>
