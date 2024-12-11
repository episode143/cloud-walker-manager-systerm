<template>
  <div class="robot-maintenance-grid-container">
    <BreadCrumbs :path1="'机器人管理'" :path2="'零件仓库'" style="grid-area: crumbs" />
    <div style="width: 786px; height: 50px; display: flex; justify-content: right; grid-area: return-icon-box">
      <ReturnIcon :link="'/admin/robots/maintenance'" />
    </div>

    <div class="part-description-box" style="grid-area: box1">
      <div class="icon-box" style="background-color: white">
        <div style="display: flex; justify-content: center; align-items: center; height: 42px; width: 42px; border-radius: 50%; border: 3px solid #409eff">
          <i class="iconfont icon-shiping-xue" style="color: #409eff"></i>
        </div>
      </div>
      <span class="part-name" style="color: #409eff">摄像头</span>
      <div style="width: 100%; position: absolute; height: 150px; border-radius: 8px; bottom: 0px; background-color: white">
        <div class="warp">
          <div class="real-example1" style="border: 9px solid #409eff"></div>
        </div>
      </div>
      <span class="warehouse-left-number">库存{{ partsInventory[0] }}件</span>
    </div>

    <div class="part-description-box" style="grid-area: box2">
      <div class="icon-box" style="background-color: white">
        <div style="display: flex; justify-content: center; align-items: center; height: 42px; width: 42px; border-radius: 50%; border: 3px solid #41d282">
          <i class="iconfont icon-leida" style="color: #41d282"></i>
        </div>
      </div>
      <span class="part-name" style="color: #41d282">雷达</span>
      <div style="width: 100%; position: absolute; height: 150px; border-radius: 8px; bottom: 0px; background-color: white">
        <div class="warp">
          <div class="real-example2" style="border: 9px solid #41d282"></div>
        </div>
      </div>
      <span class="warehouse-left-number">库存{{ partsInventory[1] }}件</span>
    </div>

    <div class="part-description-box" style="grid-area: box3">
      <div class="icon-box" style="background-color: white">
        <div style="display: flex; justify-content: center; align-items: center; height: 42px; width: 42px; border-radius: 50%; border: 3px solid #36cfc9">
          <i class="iconfont icon-dipanzhuangjia" style="color: #36cfc9"></i>
        </div>
      </div>
      <span class="part-name" style="color: #36cfc9">底盘</span>
      <div style="width: 100%; position: absolute; height: 150px; border-radius: 8px; bottom: 0px; background-color: white">
        <div class="warp">
          <div class="real-example3" style="border: 9px solid #36cfc9"></div>
        </div>
      </div>
      <span class="warehouse-left-number">库存{{ partsInventory[2] }}件</span>
    </div>

    <div class="part-description-box" style="grid-area: box4">
      <div class="icon-box" style="background-color: white">
        <div style="display: flex; justify-content: center; align-items: center; height: 42px; width: 42px; border-radius: 50%; border: 3px solid rgba(128, 128, 255)">
          <i class="iconfont icon-fadianji" style="color: rgba(128, 128, 255)"></i>
        </div>
      </div>
      <span class="part-name" style="color: rgba(128, 128, 255)">电机</span>
      <div style="width: 100%; position: absolute; height: 150px; border-radius: 8px; bottom: 0px; background-color: white">
        <div class="warp">
          <div class="real-example4" style="border: 9px solid rgba(128, 128, 255)"></div>
        </div>
      </div>
      <span class="warehouse-left-number">库存{{ partsInventory[3] }}件</span>
    </div>

    <div class="part-description-box" style="grid-area: box5">
      <div class="icon-box" style="background-color: white">
        <div style="display: flex; justify-content: center; align-items: center; height: 42px; width: 42px; border-radius: 50%; border: 3px solid #89c3eb">
          <i class="iconfont icon-cpuchuliqi" style="color: #89c3eb"></i>
        </div>
      </div>
      <span class="part-name" style="color: #89c3eb">处理器</span>
      <div style="width: 100%; position: absolute; height: 150px; border-radius: 8px; bottom: 0px; background-color: white">
        <div class="warp">
          <div class="real-example5" style="border: 9px solid #89c3eb"></div>
        </div>
      </div>
      <span class="warehouse-left-number">库存{{ partsInventory[4] }}件</span>
    </div>

    <div class="part-description-box" style="grid-area: box6">
      <div class="icon-box" style="background-color: white">
        <div style="display: flex; justify-content: center; align-items: center; height: 42px; width: 42px; border-radius: 50%; border: 3px solid #5383c3">
          <i class="iconfont icon-luyouqi" style="color: #5383c3"></i>
        </div>
      </div>
      <span class="part-name" style="color: #5383c3">路由器</span>
      <div style="width: 100%; position: absolute; height: 150px; border-radius: 8px; bottom: 0px; background-color: white">
        <div class="warp">
          <div class="real-example6" style="border: 9px solid #5383c3"></div>
        </div>
      </div>
      <span class="warehouse-left-number">库存{{ partsInventory[5] }}件</span>
    </div>

    <div class="alarm-waterline-setting-station" style="grid-area: setting-station">
      <!-- <span style="font-size: 20px; color: #294567; font-weight: 550; position: absolute; top: 5px; left: 20px"> 各零件存量水位线 </span> -->
      <div class="field-box-left" style="position: absolute; left: 35px; top: 10px">
        <i class="iconfont icon-tishi1" style="color: #409eff"></i>
        <h1 style="color: #409eff">摄像头水位预警值</h1>
        <input type="number" v-model="partsInventoryWaterLine.cameraNumber" style="width: 170px" :readonly="notChange" :class="{ 'readonly-state': notChange }" />
      </div>

      <div class="field-box-left" style="position: absolute; left: 35px; top: 95px">
        <i class="iconfont icon-tishi1" style="color: #41d282"></i>
        <h1 style="color: #41d282">雷达水位预警值</h1>
        <input type="number"  v-model="partsInventoryWaterLine.radarNumber" style="width: 170px" :readonly="notChange" :class="{ 'readonly-state': notChange }" />
      </div>

      <div class="field-box-left" style="position: absolute; left: 35px; top: 180px">
        <i class="iconfont icon-tishi1" style="color: #36cfc9"></i>
        <h1 style="color: #36cfc9">底盘水位预警值</h1>
        <input type="number"  v-model="partsInventoryWaterLine.chassisNumber" style="width: 170px" :readonly="notChange" :class="{ 'readonly-state': notChange }" />
      </div>

      <div class="field-box-right" style="position: absolute; left: 330px; top: 10px">
        <i class="iconfont icon-tishi1" style="color: rgba(128, 128, 255)"></i>
        <h1 style="color: rgba(128, 128, 255)">电机水位预警值</h1>
        <input type="number" v-model="partsInventoryWaterLine.electricalMachineryNumber" style="width: 170px" :readonly="notChange" :class="{ 'readonly-state': notChange }" />
      </div>

      <div class="field-box-right" style="position: absolute; left: 330px; top: 95px">
        <i class="iconfont icon-tishi1" style="color: #89c3eb"></i>
        <h1 style="color: #89c3eb">处理器水位预警值</h1>
        <input type="number"  v-model="partsInventoryWaterLine.processorNumber" style="width: 170px" :readonly="notChange" :class="{ 'readonly-state': notChange }" />
      </div>

      <div class="field-box-right" style="position: absolute; left: 330px; top: 180px">
        <i class="iconfont icon-tishi1" style="color: #5383c3"></i>
        <h1 style="color: #5383c3">路由器水位预警值</h1>
        <input type="number"  v-model="partsInventoryWaterLine.routerNumber" style="width: 170px" :readonly="notChange" :class="{ 'readonly-state': notChange }" />
      </div>

      <button
        v-show="!notChange"
        style="position: absolute; top: 220px; left: 630px; height: 36px; width: 120px; border: 2px solid #409eff; border-radius: 4px; background-color: #409eff; font-size: 18px; color: white"
        @click="handleModifyWaterLine"
      >
        提交修改
      </button>
      <button
        v-show="notChange"
        style="position: absolute; top: 220px; left: 630px; height: 36px; width: 120px; border: 2px solid #409eff; border-radius: 4px; background-color: #409eff; font-size: 18px; color: white"
        @click="notChange = false"
      >
        修改阈值
      </button>
    </div>

    <div class="file-load-station" style="grid-area: load-station">
      <h1 style="position: absolute; top: 0px; left: 20px; font-size: 20; color: #294567; font-weight: 550">入库管理</h1>

      <button class="load-button" style="top: 90px" @click="exportToExcel">
        生成进货单
        <i class="iconfont icon-xiazai load-button-icon"></i>
      </button>
      <button class="load-button" style="top: 170px" @click="showUploadDialog = true">
        上传入库清单
        <i class="iconfont icon-shangchuan load-button-icon"></i>
      </button>
    </div>
  </div>
  <el-dialog
    v-model="modifyWaterLineDialogVisible"
    title=""
    width="400"
    :before-close="handleClose"
    :show-close="false"
    :close-on-click-modal="false"
    style="height: 200px; display: flex; justify-content: center"
  >
    <div style="position: absolute; width: 400px; height: 50px; top: 10px; left: 0px; display: flex; justify-content: center">
      <h1 style="font-size: 18px; color: #294567">修改零件水位线</h1>
    </div>
    <div style="position: absolute; width: 400px; height: 50px; top: 60px; left: 0px; display: flex; justify-content: center">
      <h1 style="font-size: 18px; color: #294567; font-weight: 500">确定提交新的零件预警水位线</h1>
    </div>
    <div style="position: absolute; width: 400px; height: 50px; top: 140px; left: 0px">
      <el-button @click="cancleModifyWaterLine" style="margin-right: 10px">取消</el-button>
      <el-button type="primary" @click="confirmModifyWaterLine" style="margin-left: 10px">确定</el-button>
    </div>
  </el-dialog>
  <el-dialog title="" v-model="showUploadDialog" width="600px" @close="handleClose">
    <div class="file-input-container">
      <h1 style="font-size: 20px; margin-top: 0px; margin-bottom: 20px; color: #294567">导入进货清单入库</h1>
      <label for="fileInput" class="custom-file-input">选择文件</label>
      <input id="fileInput" type="file" @change="handleFileUpload" accept=".xlsx" style="display: none" />
    </div>
    <table v-if="tableData.length > 0">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header" class="header-cell">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showUploadDialog = false">取 消</el-button>
        <el-button type="primary" @click="getPartsWarehoused">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import BreadCrumbs from "../../components/BreadCrumbs.vue";
import ReturnIcon from "../../components/ReturnIcon.vue";
import api from "../../api/index";
import { ref, onMounted } from "vue";
import { ElNotification } from "element-plus";
import * as XLSX from "xlsx";
export default {
  components: {
    BreadCrumbs,
    ReturnIcon,
  },
  setup() {
    const showUploadDialog = ref(false);
    const modifyWaterLineDialogVisible = ref(false);
    const headers = ref(["零件类别", "零件单价", "补充数量", "总计金额"]);
    const tableData = ref([]);
    const partsInventory = ref([]);
    const notChange = ref(true); // 定义 notChange
    const partsInventoryWaterLine = ref({
      cameraNumber: 10,
      radarNumber: 10,
      chassisNumber: 10,
      electricalMachineryNumber: 10,
      processorNumber: 10,
      routerNumber: 10,
    });
    const cancleModifyWaterLine = () => {
      modifyWaterLineDialogVisible.value = false;
    };
    const confirmModifyWaterLine = () => {
      updatePartsWaterLine();
      modifyWaterLineDialogVisible.value = false;
      notChange.value = true;
    };
    const handleModifyWaterLine = () => {
      modifyWaterLineDialogVisible.value = true;
    };
    const exportToExcel = async () => {
      try {
        const response = await api.getPartsPurchaseList();
        if (response.code === 14091) {
          // 定义表头
          const headers = ["零件类别", "零件单价", "补充数量", "总计金额"];
          // 定义数据
          const data = [
            { name: "摄像头", price: 0, quantity: 2, total: 0 },
            { name: "雷达", price: 0, quantity: 1, total: 0 },
            { name: "底盘", price: 0, quantity: 1, total: 0 },
            { name: "电机", price: 0, quantity: 3, total: 0 },
            { name: "处理器", price: 0, quantity: 2, total: 0 },
            { name: "路由器", price: 0, quantity: 4, total: 0 },
          ];
          for(let i=0;i<6;i++) {
            data[i].quantity = response.data[i];
          }
          // 将对象数组转换为二维数组
          const aoaData = [headers, ...data.map((item) => [item.name, item.price, item.quantity, item.total])];

          // 创建工作簿和工作表
          const ws = XLSX.utils.aoa_to_sheet(aoaData);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "零件清单");

          // 获取当前日期并格式化
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, "0");
          const day = String(currentDate.getDate()).padStart(2, "0");
          const formattedDate = `${year}-${month}-${day}`;

          // 生成 Excel 文件
          const fileName = `${formattedDate}-进货清单.xlsx`;
          XLSX.writeFile(wb, fileName);
        } else {
          console.error("修改零件水位线请求失败", response.msg);
        }
      } catch (error) {
        console.error("修改零件水位线请求失败", error);
      }
    };
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (!file) {
        console.log("No file selected");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // 原始表头
        const originalHeaders = json[0];
        // 新的表头映射
        const headerMapping = {
          零件类别: "partCategory",
          零件单价: "partPrice",
          补充数量: "additionalQuantity",
          总计金额: "totalAmount",
        };

        // 替换表头
        const mappedHeaders = originalHeaders.map((header) => headerMapping[header]);

        // 将 rawTableData 转换成对象数组
        const rawTableData = json.slice(1);
        const objectArray = rawTableData.map((row) => {
          const obj = {};
          originalHeaders.forEach((header, index) => {
            obj[mappedHeaders[index]] = row[index];
          });
          return obj;
        });

        tableData.value = objectArray;

        // 打印转换后的对象数组的 JSON 样式
        //console.log("Parsed Table Data:", JSON.stringify(tableData.value, null, 2));
      };
      reader.readAsArrayBuffer(file);
    };

    const handleClose = () => {
      // 可以在这里处理关闭对话框的逻辑
    };
    const handleConfirmUploadWarehousingSheet = () => {
      showUploadDialog.value = false;
    };

    const getRobotPartsInventory = async () => {
      try {
        const response = await api.getRobotPartsInventory();
        if (response.code === 14031) {
          partsInventory.value = response.data.inventory;
          partsInventoryWaterLine.value.cameraNumber = response.data.waterLine[0];
          partsInventoryWaterLine.value.radarNumber = response.data.waterLine[1];
          partsInventoryWaterLine.value.chassisNumber = response.data.waterLine[2];
          partsInventoryWaterLine.value.electricalMachineryNumber = response.data.waterLine[3];
          partsInventoryWaterLine.value.processorNumber = response.data.waterLine[4];
          partsInventoryWaterLine.value.routerNumber = response.data.waterLine[5];
        } else {
          console.error("获取机器人零件库存请求失败", response.msg);
        }
      } catch (error) {
        console.error("获取机器人零件库存请求失败", error);
      }
    };

    const updatePartsWaterLine = async () => {
      try {
        const params = {
          cameraNumber: partsInventoryWaterLine.value.cameraNumber,
          radarNumber: partsInventoryWaterLine.value.radarNumber,
          chassisNumber: partsInventoryWaterLine.value.chassisNumber,
          electricalMachineryNumber: partsInventoryWaterLine.value.electricalMachineryNumber,
          processorNumber: partsInventoryWaterLine.value.processorNumber,
          routerNumber: partsInventoryWaterLine.value.routerNumber,
        };
        const response = await api.updatePartsWaterLine(params);
        if (response.code === 14101) {
          ElNotification({
            title: "处理成功",
            message: "成功修改新零件警报水位阈值",
            type: "success",
          });
          getRobotPartsInventory();
        } else {
          console.error("修改零件水位线请求失败", response.msg);
        }
      } catch (error) {
        console.error("修改零件水位线请求失败", error);
      }
    };

    const getPartsWarehoused = async() =>{
      try {
        showUploadDialog.value = false;
        const params = tableData.value;
        const response = await api.getPartsWarehoused(params);
        if (response.code === 14111) {
          ElNotification({
            title: "处理成功",
            message: "零件成功入库",
            type: "success",
          });
          await getRobotPartsInventory();
        } else {
          console.error("零件入库失败", response.msg);
        }
      } catch (error) {
        console.error("零件入库失败", error);
      }
    }
    onMounted(() => {
      getRobotPartsInventory();
    });
    return {
      partsInventoryWaterLine,
      modifyWaterLineDialogVisible,
      showUploadDialog,
      headers,
      tableData,
      notChange,
      partsInventory,
      getPartsWarehoused,
      updatePartsWaterLine,
      handleFileUpload,
      handleClose,
      cancleModifyWaterLine,
      confirmModifyWaterLine,
      handleModifyWaterLine,
      exportToExcel,
      handleConfirmUploadWarehousingSheet,
    };
  },
};
</script>
<style scoped>
.robot-maintenance-grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 18px 315px 280px;
  gap: 20px 20px;
  grid-template-areas:
    "crumbs crumbs return-icon-box return-icon-box return-icon-box return-icon-box"
    "box1 box2 box3 box4 box5 box6"
    "setting-station setting-station setting-station setting-station load-station load-station";
}
.part-description-box {
  width: 100%;
  height: 90%;
  border-radius: 8px;
  background-color: white;
  margin-top: 10%;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  position: relative;
}
.part-description-box .icon-box {
  height: 60px;
  width: 60px;
  border-top-left-radius: 24px;
  border-bottom-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 24px;
  border: 8px solid #f1f4f5;
  position: absolute;
  top: -8px;
  left: -8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.part-description-box .part-name {
  position: absolute;
  font-size: 20px;
  top: 15px;
  left: 95px;
  font-weight: 550;
}
.part-description-box .real-example1 {
  height: 150px;
  width: 126px;
  border-radius: 8px;
  position: absolute;
  /* background-color: whitesmoke; */
  bottom: 0px;
  background-color: #f1f4f58e;
  background-image: url(../../assets/realparts_example/shexiangtou.png);
  background-size: contain; /* 背景图片覆盖整个容器 */
  background-position: center; /* 背景图片居中 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
}
.part-description-box .real-example2 {
  height: 150px;
  width: 126px;
  border-radius: 8px;
  position: absolute;
  /* background-color: whitesmoke; */
  bottom: 0px;
  background-color: #f1f4f58e;
  background-image: url(../../assets/realparts_example/leida.png);
  background-size: contain; /* 背景图片覆盖整个容器 */
  background-position: center; /* 背景图片居中 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
}
.part-description-box .real-example3 {
  height: 150px;
  width: 126px;
  border-radius: 8px;
  position: absolute;
  /* background-color: whitesmoke; */
  bottom: 0px;
  background-color: #f1f4f5cb;
  background-image: url(../../assets/realparts_example/dizuo.png);
  background-size: contain; /* 背景图片覆盖整个容器 */
  background-position: center; /* 背景图片居中 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
}
.part-description-box .real-example4 {
  height: 150px;
  width: 126px;
  border-radius: 8px;
  position: absolute;
  /* background-color: whitesmoke; */
  bottom: 0px;
  background-color: #f1f4f58e;
  background-image: url(../../assets/realparts_example/dianji.png);
  background-size: contain; /* 背景图片覆盖整个容器 */
  background-position: center; /* 背景图片居中 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
}
.part-description-box .real-example5 {
  height: 150px;
  width: 126px;
  border-radius: 8px;
  position: absolute;
  /* background-color: whitesmoke; */
  bottom: 0px;
  background-color: #f1f4f58e;
  background-image: url(../../assets/realparts_example/chuliqi.png);
  background-size: contain; /* 背景图片覆盖整个容器 */
  background-position: center; /* 背景图片居中 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
}
.part-description-box .real-example6 {
  height: 150px;
  width: 126px;
  border-radius: 8px;
  position: absolute;
  /* background-color: whitesmoke; */
  bottom: 0px;
  background-color: #f1f4f535;
  background-image: url(../../assets/realparts_example/luyouqi.jpg);
  background-size: contain; /* 背景图片覆盖整个容器 */
  background-position: center; /* 背景图片居中 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
}
.warp {
  width: 130px;
  height: 150px;
  position: absolute;
  border-radius: 8px;
  left: 21px;
  bottom: 19px;
  background-color: white;
}
.icon-box .iconfont {
  font-size: 32px;
  color: white;
}
.alarm-waterline-setting-station {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}
.file-load-station {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  position: relative;
  display: flex;
  justify-content: center;
}
.warehouse-left-number {
  position: absolute;
  top: 70px;
  left: 50px;
  font-size: 20px;
  color: #294567;
}
.field-box-left {
  position: absolute;
  height: 65px;
  width: 300px;
  border-radius: 4px;
  background-color: transparent;
}
.field-box-right {
  position: absolute;
  height: 65px;
  width: 300px;
  border-radius: 4px;
  background-color: transparent;
}
.field-box-left h1 {
  position: absolute;
  font-size: 18px;
  font-weight: 500;
  top: -10px;
  left: 60px;
}
.field-box-left input {
  position: absolute;
  height: 40px;
  width: 240px;
  top: 37px;
  left: 60px;
  border-radius: 4px;
  font-size: 18px;
  padding-left: 10px;
  color: rgb(107, 99, 99);
  background-color: rgba(236, 245, 255, 0.5);
  border: 2px solid rgb(107, 99, 99);
  border: none;
}
.field-box-left .iconfont {
  position: absolute;
  left: 0px;
  top: 32px;
  font-size: 50px;
}
.field-box-right .iconfont {
  position: absolute;
  left: 0px;
  top: 32px;
  font-size: 50px;
}
.field-box-right h1 {
  position: absolute;
  font-size: 18px;
  font-weight: 500;
  top: -10px;
  left: 60px;
}
.field-box-right input {
  position: absolute;
  height: 40px;
  width: 240px;
  top: 37px;
  left: 60px;
  border-radius: 4px;
  font-size: 18px;
  padding-left: 10px;
  color: rgb(107, 99, 99);
  background-color: rgba(236, 245, 255, 0.5);
  border: 2px solid rgb(107, 99, 99);
  border: none;
}
.load-button {
  position: absolute;
  height: 40px;
  width: 200px;
  border-radius: 8px;
  background-color: #409eff;
  border: none;
  font-size: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.load-button-icon {
  color: white;
  font-size: 30px;
  margin-left: 10px;
}
</style>
<style scoped>
/* 你可以在这里添加组件的样式 */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th,
td {
  border: 1px solid rgb(121.3, 187.1, 255);
  padding: 8px;
}
th {
  background-color: rgb(121.3, 187.1, 255);
  text-align: center; /* 水平居中 */
  vertical-align: middle; /* 垂直居中 */
  color: #294567; /* 修改表头文字颜色为红色 */
}
.header-cell {
  color: #294567; /* 修改表头文字颜色为红色 */
}
.centered {
  text-align: center; /* 水平居中 */
  vertical-align: middle; /* 垂直居中 */
}

.file-input-container {
  position: relative;
  display: inline-block;
}

.custom-file-input {
  background-color: #409eff; /* 自定义背景颜色 */
  color: white; /* 文字颜色 */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.custom-file-input:hover {
  background-color: #409eff; /* 鼠标悬停时的背景颜色 */
}
</style>
