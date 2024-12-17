<template>
  <div class="station-distribution-grid-container">
    <BreadCrumbs :path1="'站点管理'" :path2="'站点分布'" style="grid-area: crumbs" />
    <div style="width: 786px; height: 50px; display: flex; justify-content: right; grid-area: return-icon-box">
      <ReturnIcon :link="'/admin/stations/management'" />
    </div>
    <StatisticsHeaderCard
      :field1="'最繁忙站点'"
      :todayField="'过去30天'"
      :statistics1="operatingStatus.mostBusySiteName"
      :changeText="''"
      :statistics2="operatingStatus.mostBusySiteCount.toString() + '次'"
      :color="'#4096ff'"
      :buttonColor="'#2f54eb'"
      :changecolor="items[0].changecolor"
      :iconClass="'icon-gongzuofanmang'"
      style="grid-area: header-card1"
    />
    <StatisticsHeaderCard
      :field1="'所有站点累计配送次数'"
      :todayField="'过去30天'"
      :statistics1="operatingStatus.monthCompletedOrderCount.toString() + '次'"
      :changeText="items[1].changeText"
      :statistics2="items[1].statistics2"
      :color="'#41D282'"
      :buttonColor="'#28C76F'"
      :changecolor="items[1].changecolor"
      :iconClass="'icon-huowudui'"
      style="grid-area: header-card2"
    />
    <StatisticsHeaderCard
      :field1="'机器人日均配送次数'"
      :todayField="'过去30天'"
      :statistics1="operatingStatus.avgDayRobotOrderCount.toString() + '次'"
      :changeText="items[2].changeText"
      :statistics2="items[2].statistics2"
      :color="'#36CFC9'"
      :buttonColor="'rgba(0,170,170,0.77)'"
      :changecolor="items[2].changecolor"
      :iconClass="'icon-pingjunzhi1'"
      style="grid-area: header-card3"
    />
    <div class="stations-distribution-map" style="grid-area: stations-map">
      <div
        style="
          height: 100%;
          width: 100%;
          grid-area: map;
          background-color: white;
          border-radius: 8px;
          display: flex;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          justify-content: center;
          align-items: center;
          position: absolute;
        "
      >
        <h1 style="position: absolute; top: -2%; color: #294567; font-size: 20px">管理站点位置分布总览</h1>
        <div id="mapContainer" style="height: 90%; width: 95%; border-radius: 4px; background-color: rgb(235.9, 245.3, 255); position: absolute; top: 6%">
          <!--          <h1>这是站点分布地图</h1>-->
          <!--          <br />-->
          <!--          <h1>规格： 高：585px 宽：911px</h1>-->
        </div>
      </div>

      <div style="grid-area: display-station" class="station-status-display">
        <div style="position: absolute; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); background-color: white; height: 74px; border-radius: 8px">
          <span style="top: 10px; font-weight: 550">当前站点</span>
          <span style="top: 40px; color: #409eff; font-size: 18px">湖南大学三区十栋配送站</span>
        </div>

        <div class="station-field-display-box">
          <div class="specific-field-box" style="grid-area: field1; background-color: #409eff">
            <div class="field-icon-box">
              <i class="iconfont icon-liuliang" style="font-size: 24px"></i>
            </div>
            <span style="color: white; position: absolute; top: 6px">今日存取流量</span>
            <span style="color: white; position: absolute; top: 35px; font-size: 18px; left: 72px">1428</span>
            <span style="color: white; position: absolute; top: 33px; font-size: 16px; left: 145px">(人次)</span>
          </div>
          <div class="specific-field-box" style="grid-area: field2; background-color: #41d282">
            <div class="field-icon-box">
              <i class="iconfont icon-peisong" style="font-size: 24px"></i>
            </div>
            <span style="color: white; position: absolute; top: 6px">今日配送次数</span>
            <span style="color: white; position: absolute; top: 35px; font-size: 18px; left: 72px">305</span>
            <span style="color: white; position: absolute; top: 33px; font-size: 16px; left: 145px">(次)</span>
          </div>
          <div class="specific-field-box" style="grid-area: field3; background-color: #36cfc9">
            <div class="field-icon-box">
              <i class="iconfont icon-lingqulirun" style="font-size: 24px"></i>
            </div>
            <span style="color: white; position: absolute; top: 6px">今日营收利润</span>
            <span style="color: white; position: absolute; top: 35px; font-size: 18px; left: 72px">1942.8</span>
            <span style="color: white; position: absolute; top: 33px; font-size: 16px; left: 145px">(元)</span>
          </div>
        </div>

        <div class="circle-station-display">
          <!-- <div style="height: 20%; width: 100%; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; position: absolute">
            <div style="height: 100%; width: 1fr; display: flex; justify-content: left">
              <div class="container-icon-box1" style="margin-left: 13px;cursor: pointer;" @click="changetoBig">
                <i class="iconfont icon-huowudui" style="font-size: 34px; color: #409eff;cursor: pointer;" @click="changetoBig"></i>
              </div>
            </div>

            <div style="height: 100%; width: 1fr; display: flex; justify-content: center">
              <div class="container-icon-box2" style="cursor: pointer;" @click="changetoMiddle">
                <i class="iconfont icon-huowudui" style="font-size: 34px; color: #41d282; cursor: pointer;" @click="changetoMiddle"></i>
              </div>
            </div>

            <div style="height: 100%; width: 1fr; display: flex; justify-content: right">
              <div class="container-icon-box3" style="margin-right: 13px;cursor: pointer;" @click="changetoSmall">
                <i class="iconfont icon-huowudui" style="font-size: 34px; color: #36cfc9; cursor: pointer;" @click="changetoSmall"></i>
              </div>
            </div>
          </div>
          <div style="height: 8%; width: 100%; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; position: absolute; top: 20%">
            <div style="width: 1fr; height: 100%">
              <div style="padding-top: 5px; margin-left: 11px; color: #409eff; cursor: pointer;" @click="changetoBig">大型</div>
            </div>
            <div style="width: 1fr; height: 100%; display: flex; justify-content: center">
              <div style="color: white; padding-top: 5px; color: #41d282; cursor: pointer;" @click="changetoMiddle">中型</div>
            </div>
            <div style="width: 1fr; height: 100%">
              <div style="padding-top: 5px; margin-right: 11px; color: #36cfc9;cursor: pointer;" @click="changetoSmall">小型</div>
            </div>
          </div> -->

          <div style="height: 72%; position: absolute; top: 28%; width: 100%">
            <!-- <div style="width: 100%; height: 30px; display: flex; justify-content: center; align-items: center; background-color: transparent">
              <div style="height: 70%; width: 90%">
                <ContainerProgress
                :type="showContainertype"
                />
              </div>
            </div> -->
            <div style="width: 100%; height: 220px; display: flex; justify-content: center; padding: 0px; position: absolute; top: 30px">
              <h1 style="margin: 0px; font-size: 20px; color: #294567; position: absolute; left: 10px; top: -110px">当前待配送订单数</h1>
              <h1 style="margin: 0px; font-size: 20px; color: #294567; position: absolute; left: 10px; top: -75px; color: #409eff">1080</h1>
              <h1 style="margin: 0px; font-size: 20px; color: #294567; position: absolute; top: -50px; left: 11px">当前运行机器人数</h1>
              <h1 style="margin: 0px; font-size: 20px; color: #294567; position: absolute; left: 10px; top: -15px; color: #409eff">1080</h1>
              <h1 style="margin: 0px; font-size: 20px; color: #294567; position: absolute; top: 18px; left: 11px">当前站点机器人运行负载</h1>
              <!-- <h1 style="margin: 0px; font-size: 20px; color: #294567;position: absolute;left: 10px;top: 80px;color: #409eff;">负载</h1> -->
              <div style="position: absolute; top: 60px; width: 210px; height: 150px">
                <StationRobotDashboardProgress />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, onUnmounted } from "vue";
import BreadCrumbs from "../../components/BreadCrumbs.vue";
import ReturnIcon from "../../components/ReturnIcon.vue";
import StatisticsHeaderCard from "../../components/StatisticsHeaderCard.vue";
import StationRobotDashboardProgress from "../../components/StationRobotDashboardProgress.vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import api from "../../api/index";
export default {
  components: {
    BreadCrumbs,
    ReturnIcon,
    StatisticsHeaderCard,
    StationRobotDashboardProgress,
  },
  setup() {


    const percentage = ref(20);
    const customColor = ref("#409eff");
    const colorObject = [
      { color: "#909399", percentage: 20 },
      { color: "#e6a23c", percentage: 40 },
      { color: "#67c23a", percentage: 100 },
    ];
    const items = ref([
      {
        field1: "回头客",
        todayField: "过去30天",
        statistics1: "2208",
        changeText: "",
        statistics2: "",
        color: "#B77ED4",
        buttonColor: "#AA66CC",
        changecolor: "#3572F3",
        iconClass: "icon-yonghuzengchang",
      },
      {
        field1: "新用户",
        todayField: "过去30天",
        statistics1: "802.5",
        changeText: "",
        statistics2: "",
        color: "#5AC3EA",
        buttonColor: "rgba(0,0,255,0.13)",
        changecolor: "#F59A23",
        iconClass: "icon-qian",
      },
      {
        field1: "用户粘性占比",
        todayField: "过去30天",
        statistics1: "34%",
        changeText: "",
        statistics2: "",
        color: "#41D282",
        buttonColor: "#28C76F",
        changecolor: "#8400FF",
        iconClass: "icon-robot",
      },
    ]);

    const operatingStatus = ref({
      mostBusySiteName: "天马学生公寓",
      mostBusySiteCount: 1302,
      avgDayRobotOrderCount: 0.83,
      monthCompletedOrderCount: 523,
    });

    const getStationsOperatingStatus = async () => {
      try {
        const response = await api.getStationsOperatingStatus();
        if (response.code === 15021) {
          operatingStatus.value.mostBusySiteName = response.data.mostBusySiteName;
          operatingStatus.value.mostBusySiteCount = response.data.mostBusySiteCount;
          operatingStatus.value.avgDayRobotOrderCount = response.data.avgDayRobotOrderCount;
          operatingStatus.value.monthCompletedOrderCount = response.data.monthCompletedOrderCount;
        } else {
          console.error("获取站点运维情况请求失败", response.msg);
        }
      } catch (error) {
        console.error("获取站点运维情况请求失败", error);
      }
    };

    // 站点信息
    const sites = [
      {},
      {
        id: 1,
        name: "天马学生公寓",
        center: [112.945817, 28.165779],
        path: [
          [112.944461, 28.16479],
          [112.944449, 28.167385],
          [112.945348, 28.167422],
          [112.945348, 28.167422],
          [112.946374, 28.166655],
          [112.94633, 28.166121],
          [112.94714, 28.166065],
          [112.94715, 28.165493],
          [112.948357, 28.165031],
          [112.948539, 28.164888],
        ],
        sitePosition: [112.945318, 28.164796],
      },
      {
        id: 2,
        name: "德智学生公寓",
        center: [112.940252, 28.162897],
        path: [
          [112.941413, 28.163192],
          [112.941301, 28.164053],
          [112.940731, 28.164063],
          [112.940727, 28.163803],
          [112.94011, 28.163769],
          [112.939995, 28.163134],
          [112.93913, 28.163121],
          [112.939064, 28.162097],
          [112.940229, 28.161878],
        ],
        sitePosition: [112.941401, 28.163157],
      },
      {
        id: 3,
        name: "财院校区学生公寓",
        center: [112.929928, 28.197679],
        path: [
          [112.92938, 28.198133],
          [112.929335, 28.197571],
          [112.930773, 28.19622],
          [112.930852, 28.19648],
          [112.931748, 28.196502],
          [112.931745, 28.197537],
          [112.930276, 28.197539],
          [112.930183, 28.198208],
        ],
        sitePosition: [112.930258, 28.197304],
      },
      {
        id: 4,
        name: "望麓桥学生公寓",
        center: [112.92857, 28.202066],
        path: [
          [112.928813, 28.200939],
          [112.927593, 28.20274],
          [112.928073, 28.203015],
          [112.928992, 28.202542],
          [112.928998, 28.202129],
          [112.928952, 28.202092],
          [112.929001, 28.201644],
          [112.929226, 28.201255],
        ],
        sitePosition: [112.928706, 28.201169],
      },
    ];
    // 切换地图
    let selectedRegion = 1;

    const changeSite = async () => {
      map.setCenter(sites[selectedRegion].center);
      try {
        const response = await api.getSiteDetails({
          siteName: sites[selectedRegion].name,
        });

        if (response.code === 15031) {
          siteInfo.value.todayPackageCount = response.data.todayPackageCount;
          siteInfo.value.totalRobotCount = response.data.totalRobotCount;
          siteInfo.value.todayTotalProfit = response.data.todayTotalProfit;
          siteInfo.value.robotInUseCount = response.data.robotInUseCount;
          siteInfo.value.todayWaitOrderCount = response.data.todayWaitOrderCount;
          console.log('getSiteDatails:', response.data);

          // cabinetInfo.value.big.current = response.data.cabinetSizeInUseCount[2].value;
          // cabinetInfo.value.mid.current = response.data.cabinetSizeInUseCount[0].value;
          // cabinetInfo.value.small.current = response.data.cabinetSizeInUseCount[1].value;
          // cabinetInfo.value.big.total = response.data.cabinetSizeCount[2].value;
          // cabinetInfo.value.mid.total = response.data.cabinetSizeCount[0].value;
          // cabinetInfo.value.small.total = response.data.cabinetSizeCount[1].value;
        } else {
          console.error(`获取${sites[selectedRegion].name}数据失败`, response.msg);
        }
      } catch (e) {
        console.log(`获取${sites[selectedRegion].name}数据失败`, e);
      }
    };
    // 地图加载
    let map = null;
    let addPolygon = (path, i) => {
      let polygon = new AMap.Polygon({
        map: map,
        path: path,
        fillColor: "#ccebc5",
        strokeOpacity: 1,
        fillOpacity: 0.5,
        strokeColor: "#2b8cbe",
        strokeWeight: 1,
        strokeStyle: "dashed",
        strokeDasharray: [5, 5],
      });
      polygon.on("mouseover", () => {
        // console.log("mouseover polygon", i);
        polygon.setOptions({
          fillOpacity: 0.7,
          fillColor: "#7bccc4",
        });
      });

      polygon.on("mouseout", () => {
        // console.log("mouseout polygon", i);
        polygon.setOptions({
          fillOpacity: 0.5,
          fillColor: "#ccebc5",
        });
      });

      polygon.on("click", () => {
        selectedRegion = i;
        // console.log("change site to", i);
        changeSite();
      });

      map.add(polygon);
    };
    const addMarker = (position, content) => {
      try {
        let marker = new AMap.Marker({
          position: position,
          // icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          title: content,
          // content: `<div class="marker">${content}</div>`,
        });
        map.add(marker);
        // console.log("add marker", position, content);
      } catch (e) {
        console.log(e);
      }

    };
    const siteInfo = ref({
      todayPackageCount: 1034,
      totalRobotCount: 203,
      todayTotalProfit: "789.6",

      robotInUseCount: 70,
      todayWaitOrderCount: 50,
    });

    // 添加机器人坐标
    
    const getRobotLocationBySiteId = async (siteId) => {
      // try {
        console.log('getRobotLocationBySiteId request:', siteId);
        const response = await api.getBusyRobotInfoBySiteId({
          siteId: parseInt(siteId, 10),
        });
        if (response.code === 15061) {
          console.log('getBusyRobotInfoBySiteId:', response.data);
          return response.data;
        } else {
          // console.error(`获取${siteId}正在忙碌机器人数据失败`, response.msg);
        }
      // } catch (e) {
      //   // console.error(`获取${siteId}正在忙碌机器人数据失败`, e);
      // }
    };

    const addAllRobotLoc = async () => {
      
      const allLocations = await getRobotLocationBySiteId(selectedRegion);

      for (let i = 0; i < allLocations.length; i++) {
        let robot = allLocations[i];
        addMarker([robot.longitude, robot.latitude], robot.id);
      }
    };


    onMounted(() => {
      window._AMapSecurityConfig = {
        securityJsCode: "80a9abd3217001b61b8c314933584e36",
      };
      AMapLoader.load({
        key: "a6f37ea40ac5c9ad84fdbb84c4f13aa9", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.ControlBar", "AMap.HawkEye"], // 需要使用的插件列表
      })
        .then(async (AMap) => {
          map = new AMap.Map("mapContainer", {
            viewMode: "3D",
            zoom: 17.5,
            center: sites[selectedRegion].center, // 默认天马学生公寓为中心
          });

          map.on('click', function(e) {
            console.log('经度:', e.lnglat.getLng());
            console.log('纬度:', e.lnglat.getLat());
          });

          for (let i = 1; i < sites.length; i++) {
            addPolygon(sites[i].path, i);
            // console.log(i,'-ploygon:',sites[i].path);
            addMarker(sites[i].sitePosition, sites[i].name);
            // console.log(i,'-marker:',sites[i].sitePosition);
          }

          addAllRobotLoc();


        })
        .catch((e) => {
          console.log(e);
        });
      // console.log(sites[selectedRegion].path);
      getStationsOperatingStatus();


    });
    onUnmounted(() => {
      map?.destroy();
    });

    return {
      percentage,
      customColor,
      items,
      colorObject,
      operatingStatus,
      sites,
      selectedRegion,
      siteInfo,
      changeSite,
      addPolygon,
      addMarker,
      addAllRobotLoc,
      getRobotLocationBySiteId

    };
  },
};
</script>
<style scoped>
.station-distribution-grid-container {
  display: grid;
  grid-template-columns: 383px 383px 383px;
  grid-template-rows: 20px 140px 650px;
  gap: 30px 20px;
  grid-template-areas:
    "crumbs return-icon-box return-icon-box"
    "header-card1 header-card2 header-card3"
    "stations-map stations-map stations-map";
  position: relative;
  margin-bottom: 10px;
}
.stations-distribution-map {
  background-color: transparent;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  position: absolute;
  display: grid;
  grid-template-columns: 7fr 1.8fr;
  grid-template-rows: 1fr;
  grid-template-areas: "map display-station";
  gap: 0px 20px;
  position: absolute;
}
.station-status-display {
  height: 100%;
  width: 100%;
  background-color: transparent;
  border-radius: 8px;
  position: absolute;
}
.station-status-display span {
  position: absolute;
  left: 11px;
  font-size: 20px;
  color: #294567;
}
.station-field-display-box {
  position: absolute;
  width: 100%;
  height: 200px;
  background-color: transparent;
  margin-top: 10px;
  left: 0px;
  border-radius: 4px;
  top: 77px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px 0px;
  grid-template-columns: 1fr;
  grid-template-areas: "field1" "field2" "field3";
}
.specific-field-box {
  position: absolute;
  height: 100%;
  width: 100%;
  border-top-left-radius: 22px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.field-icon-box {
  height: 36px;
  width: 36px;
  top: 10px;
  left: 15px;
  border-radius: 50%;
  border: 3px solid white;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.specific-field-box span {
  position: absolute;
  left: 70px;
  font-size: 20px;
}
.circle-station-display {
  width: 100%;
  height: 350px;
  background-color: white;
  position: absolute;
  top: 300px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: absolute;
}
.container-icon-box1 {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  display: flex;
  border: 3px solid #409eff;
}
.container-icon-box2 {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  display: flex;
  border: 3px solid #41d282;
}
.container-icon-box3 {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  display: flex;
  border: 3px solid #36cfc9;
}
</style>
