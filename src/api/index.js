// import { ca, tr } from "element-plus/es/locale";
import instance from "../utils/request";
import { paths } from "./path";

const login = async (credentials) => {
  try {
    const response = await instance.post(paths.login, credentials);
    return response;
  } catch (error) {
    console.error("登录请求失败", error);
    throw error;
  }
};
//dashboard界面
const getOperationSituation = async () => {
  try {
    const response = await instance.get(paths.operationSituation);
    return response;
  } catch (error) {
    console.error("运维信息请求失败", error);
    throw error;
  }
};

const getOrderAccomplishmentStatus = async () => {
  try {
    const response = await instance.get(paths.orderAccomplishmentStatus);
    return response;
  } catch (error) {
    console.error("订单完成信息请求失败", error);
    throw error;
  }
};
const getAverageDailyOrderCycle = async () => {
  try {
    const response = await instance.get(paths.averageDailyOrderCycle);
    return response;
  } catch (error) {
    console.error("订单日均周期变化请求失败", error);
    throw error;
  }
};
const getSystemNotificationMessageList = async () => {
  try {
    const response = await instance.get(paths.systemNotificationMessageList);
    return response;
  } catch (error) {
    console.error("获取系统提示信息列表请求失败", error);
    throw error;
  }
};

const deleteSystemNotificationMessage = async (params) => {
  try {
    const response = await instance.delete(paths.deleteSystemNotificationMessageList, {
      data: params,
    });
    return response;
  } catch (error) {
    console.error("删除系统提示信息列表请求失败", error);
    throw error;
  }
};

const haveReadSystemMessage = async (params) => {
  try {
    const response = await instance.post(paths.haveReadSystemMessage, params);
    return response;
  } catch (error) {
    console.error("标记消息已读请求失败", error);
    throw error;
  }
};
//用户管理界面
const getTotalUserCount = async () => {
  try {
    const response = await instance.get(paths.totalUserCount);
    return response;
  } catch (error) {
    console.error("总用户数信息请求失败", error);
    throw error;
  }
};

const getUserTransformationSituation = async () => {
  try {
    const response = await instance.get(paths.userTransformationSituation);
    return response;
  } catch (error) {
    console.error("用户转化信息请求失败", error);
    throw error;
  }
};

const getYearUserGrowthStatus = async () => {
  try {
    const response = await instance.get(paths.userCountYearlyAnalysis);
    return response;
  } catch (error) {
    console.error("12月内用户增长信息请求失败", error);
    throw error;
  }
};

const getUserFrequencyAnalysis = async () => {
  try {
    const response = await instance.get(paths.userFrequencyAnalysis);
    return response;
  } catch (error) {
    console.error("用户使用频率分析失败", error);
    throw error;
  }
};

const getUserLossQuarterlyAnalysis = async () => {
  try {
    const response = await instance.get(paths.userLossQuarterlyAnalysis);
    return response;
  } catch (error) {
    console.error("用户流失信息请求失败", error);
    throw error;
  }
};

const getUserDetailedInformation = async (params) => {
  try {
    const response = await instance.post(paths.userDetailedInformation, params);
    return response;
  } catch (error) {
    console.error("用户详细信息请求失败", error);
    throw error;
  }
};
const getUserWeeklyUsage = async (params) => {
  try {
    const response = await instance.post(paths.userWeeklyUsage, params);
    return response;
  } catch (error) {
    console.error("获取用户每周使用情况请求失败", error);
    throw error;
  }
};
const rewardUserCoupon = async (params) => {
  try {
    const response = await instance.post(paths.rewardUserCoupon, params);
    return response;
  } catch (error) {
    console.error("发放用户优惠券请求失败", error);
    throw error;
  }
};
//机器人管理界面
const getTotalRobotCount = async () => {
  try {
    const response = await instance.get(paths.totalRobotCount);
    return response;
  } catch (error) {
    console.error("总机器人数信息请求失败", error);
    throw error;
  }
};
const getRobotWorkingSituation = async () => {
  try {
    const response = await instance.get(paths.robotWorkingSituation);
    return response;
  } catch (error) {
    console.error("机器人工作状态请求失败", error);
    throw error;
  }
};
const getRobotRepairPartStatus = async () => {
  try {
    const response = await instance.get(paths.robotRepairPartStatus);
    return response;
  } catch (error) {
    console.error("机器人损坏零件情况请求失败", error);
    throw error;
  }
};
const getBelongStationList = async () => {
  try {
    const response = await instance.get(paths.belongStationList);
    return response;
  } catch (error) {
    console.error("机器人所属站点列表信息请求失败", error);
    throw error;
  }
};
const getRobotPartsInventory = async () => {
  try {
    const response = await instance.get(paths.robotPartsInventory);
    return response;
  } catch (error) {
    console.error("机器人零件库存请求失败", error);
    throw error;
  }
};
const getRealTimeStatus = async (params) => {
  try {
    const response = await instance.post(paths.realTimeStatus, params);
    return response;
  } catch (error) {
    console.error("机器人实时状态请求失败", error);
    throw error;
  }
};
const getRealTimeOrderList = async (params) => {
  try {
    const response = await instance.post(paths.realTimeOrderList, params);
    return response;
  } catch (error) {
    console.error("机器人实时任务订单列表请求失败", error);
    throw error;
  }
};
const updatePartsWaterLine = async (params) => {
  try {
    const response = await instance.post(paths.updatePartsWaterLine, params);
    return response;
  } catch (error) {
    console.error("修改机器人零件水位线请求失败", error);
    throw error;
  }
};
const getPartsWarehoused = async (params) => {
  try {
    const response = await instance.post(paths.getPartsWarehoused, params);
    return response;
  } catch (error) {
    console.error("零件入库失败", error);
    throw error;
  }
};
const getPartsPurchaseList = async () => {
  try {
    const response = await instance.get(paths.partsPurchaseList);
    return response;
  } catch (error) {
    console.error("获取零件进货清单失败", error);
    throw error;
  }
};
const getRobotRepairType = async (params) => {
  try {
    const response = await instance.post(paths.robotRepairType, params);
    return response;
  } catch (error) {
    console.error("获取机器人损坏情况失败", error);
    throw error;
  }
};

const getRobotRepaired = async(params) =>{
  try {
    const response = await instance.post(paths.getRobotRepaired, params);
    return response;
  } catch (error) {
    console.error("维修机器人失败", error);
    throw error;
  }
}
//站点管理界面
const getTotalStationCount = async () => {
  try {
    const response = await instance.get(paths.totalStationCount);
    return response;
  } catch (error) {
    console.error("总站点数信息请求失败", error);
    throw error;
  }
};
const getStationsOperatingStatus = async () => {
  try {
    const response = await instance.get(paths.stationsOperatingStatus);
    return response;
  } catch (error) {
    console.error("站点运行情况请求失败", error);
    throw error;
  }
};

const getStationDetailedInformation = async (params) => {
  try {
    const response = await instance.post(paths.stationDetailedInformation, params);
    return response;
  } catch (error) {
    console.error("站点详细运行情况请求失败", error);
    throw error;
  }
};

const clearUpOvertimeContainers = async (params) => {
  try {
    const response = await instance.post(paths.clearUpOvertimeContainers, params);
    return response;
  } catch (error) {
    console.error("一键清除站点超时货柜失败", error);
    throw error;
  }
};
//订单管理界面
const getTotalOrderCount = async () => {
  try {
    const response = await instance.get(paths.totalOrderCount);
    return response;
  } catch (error) {
    console.error("总订单数信息请求失败", error);
    throw error;
  }
};

const getHistoryOrderCount = async () => {
  try {
    const response = await instance.get(paths.historyOrderCount);
    return response;
  } catch (error) {
    console.error("历史总订单数信息请求失败", error);
    throw error;
  }
};
//营收管理界面
const getTotalProfit = async () => {
  try {
    const response = await instance.get(paths.totalProfit);
    return response;
  } catch (error) {
    console.error("总营收信息请求失败", error);
    throw error;
  }
};

const getProfitComponentAnalysis = async () => {
  try {
    const response = await instance.get(paths.profitComponentAnalysis);
    return response;
  } catch (error) {
    console.error("营收成分分析请求失败", error);
    throw error;
  }
};
const getWeekFinanceChangeTrend = async () => {
  try {
    const response = await instance.get(paths.weekFinanceChangeTrend);
    return response;
  } catch (error) {
    console.error("7天流水变化趋势数据请求失败", error);
    throw error;
  }
};
const getFirst30DaysProfit = async () => {
  try {
    const response = await instance.get(paths.first30DaysProfit);
    return response;
  } catch (error) {
    console.error("前30天营收信息请求失败", error);
    throw error;
  }
};
//营销活动管理
const takeDownMarketingActivity = async (params) => {
  try {
    const response = await instance.delete(paths.takeDownMarketingActivity, {
      data: params,
    });
    return response;
  } catch (error) {
    console.error("下架营销活动失败", error);
    throw error;
  }
};
const postMarketingActivity = async (params) => {
  try {
    const response = await instance.post(paths.postMarketingActivity, params);
    return response;
  } catch (error) {
    console.error("新增营销活动请求失败", error);
    throw error;
  }
};

const modifyRechargeAward = async (params) => {
  try {
    const response = await instance.post(paths.modifyRechargeAward, params);
    return response;
  } catch (error) {
    console.error("修改充值活动请求失败", error);
    throw error;
  }
};

const getOnlineMarketingActivityList = async () => {
  try {
    const response = await instance.get(paths.onlineMarketingActivityList);
    return response;
  } catch (error) {
    console.error("上线营销管理图列表请求失败", error);
    throw error;
  }
};
//管理员信息
const getAdminDetailedInformation = async () => {
  try {
    const response = await instance.get(paths.adminDetailedInformation);
    return response;
  } catch (error) {
    console.error("管理员详细信息请求失败", error);
    throw error;
  }
};

const changeAdminInformation = async (params) => {
  try {
    const response = await instance.post(paths.changeAdminInformation, params);
    return response;
  } catch (error) {
    console.error("修改管理员详细信息失败", error);
    throw error;
  }
};

const changeAdminPassword = async (params) => {
  try {
    const response = await instance.post(paths.changeAdminPassword, params);
    return response;
  } catch (error) {
    console.error("修改管理员密码失败", error);
    throw error;
  }
};

const modifyAdminAvatar = async (params) => {
  try {
    const response = await instance.post(paths.modifyAdminAvatar, params);
    return response;
  } catch (error) {
    console.error("修改管理员头像失败", error);
    throw error;
  }
};
//获取后端分页表单
const getUserPageTable = async (params) => {
  try {
    const response = await instance.post(paths.userPageTable, params);
    return response;
  } catch (error) {
    console.error("用户分页信息请求失败", error);
    throw error;
  }
};

const getRobotPageTable = async (params) => {
  try {
    const response = await instance.post(paths.robotPageTable, params);
    return response;
  } catch (error) {
    console.error("机器人分页信息请求失败", error);
    throw error;
  }
};
const getStationPageTable = async (params) => {
  try {
    const response = await instance.post(paths.stationPageTable, params);
    return response;
  } catch (error) {
    console.error("站点分页信息请求失败", error);
    throw error;
  }
};
const getCurrentOrderPageTable = async (params) => {
  try {
    const response = await instance.post(paths.currentOrderPageTable, params);
    return response;
  } catch (error) {
    console.error("当前订单分页信息请求失败", error);
    throw error;
  }
};

const getHistoryOrderPageTable = async (params) => {
  try {
    const response = await instance.post(paths.historyOrderPageTable, params);
    return response;
  } catch (error) {
    console.error("历史订单分页信息请求失败", error);
    throw error;
  }
};

const getTransactionPageTable = async (params) => {
  try {
    const response = await instance.post(paths.transactionPageTable, params);
    return response;
  } catch (error) {
    console.error("流水分页信息请求失败", error);
    throw error;
  }
};

const getCabinetPageTable = async (params) => {
  try {
    const response = await instance.post(paths.cabinetPageTable, params);
    return response;
  } catch (error) {
    console.error("站点货柜分页内容请求失败", error);
    throw error;
  }
};

const getMarketingActivityPageTable = async (params) => {
  try {
    const response = await instance.post(paths.marketingActivityPageTable, params);
    return response;
  } catch (error) {
    console.error("营销活动分页内容请求失败", error);
    throw error;
  }
};
//获取地图数据
//--------------------- dht + 获取机器人经纬度
const getRobotLat = async (robotId) => {
  try {
    return await instance.post(paths.robotLat, robotId);
  } catch (error) {
    console.error("机器人经纬度请求失败", error);
    throw error;
  }
};
//--------------------- dht + 机器人目标请求点
const getRobotStartAndDest = async (robotId) => {
  try {

    console.log('getRobotStartAndDest',robotId)
    return await instance.post(paths.robotDest, robotId);
  } catch (error) {
    console.error("机器人目标点请求失败", error);
    throw error;
  }
};
//--------------------- dht + 站点详情
const getSiteDetails = async (siteName) => {
  try {
    return await instance.post(paths.siteDetails, siteName);
  } catch (error) {
    console.error("站点详情信息请求失败", error);
    throw error;
  }
};
// --------------------- dht + 获得某个站点的 busy 机器人数量
const getBusyRobotInfoBySiteId = async (siteId) => {
  try {
    return await instance.post(paths.busyRobotInfo, siteId);
  } catch (error) {
    console.error("站点中繁忙机器人坐标信息请求失败", error);
    throw error;
  }
};
// --------------------- dht + 获得某个站点的货柜相关信息
const getCabinetInfoBySiteId = async (siteId) => {
  try {
    return await instance.post(paths.cabinetInfo, siteId);
  } catch (error) {
    console.error("站点中货柜信息请求失败", error);
    throw error;
  }
}
const getSiteCabinet = async(siteId) => {
  try {
    return await instance.post(paths.siteCabinet, siteId);
  } catch (error) {
    console.error('货柜地图信息请求失败', error)
  }
}
/////
const api = {
  login,
  //dashboard
  getOperationSituation,
  getOrderAccomplishmentStatus,
  getAverageDailyOrderCycle,
  getSystemNotificationMessageList,
  deleteSystemNotificationMessage,
  haveReadSystemMessage,
  //用户管理
  getTotalUserCount,
  getUserTransformationSituation,
  getYearUserGrowthStatus,
  getUserFrequencyAnalysis,
  getUserLossQuarterlyAnalysis,
  getUserDetailedInformation,
  rewardUserCoupon,
  getUserWeeklyUsage,
  //机器人管理
  getTotalRobotCount,
  getRobotWorkingSituation,
  getRobotRepairPartStatus,
  getBelongStationList,
  getRobotPartsInventory,
  getRealTimeStatus,
  getRealTimeOrderList,
  updatePartsWaterLine,
  getPartsPurchaseList,
  getPartsWarehoused,
  getRobotRepairType,
  getRobotRepaired,
  //站点管理
  getTotalStationCount,
  getStationsOperatingStatus,
  getStationDetailedInformation,
  clearUpOvertimeContainers,
  //当前订单管理
  getTotalOrderCount,
  getHistoryOrderCount,
  //历史订单管理

  //营收（流水）管理
  getTotalProfit,
  getProfitComponentAnalysis,
  getWeekFinanceChangeTrend,
  getFirst30DaysProfit,
  //营销活动管理
  takeDownMarketingActivity,
  postMarketingActivity,
  modifyRechargeAward,
  getOnlineMarketingActivityList,
  //管理员信息
  getAdminDetailedInformation,
  changeAdminInformation,
  changeAdminPassword,
  modifyAdminAvatar,
  //分页表单
  getUserPageTable,
  getRobotPageTable,
  getStationPageTable,
  getCurrentOrderPageTable,
  getHistoryOrderPageTable,
  getTransactionPageTable,
  getCabinetPageTable,
  getMarketingActivityPageTable,
  //地图数据
  getRobotLat,
  getRobotStartAndDest,
  getSiteDetails,
  getBusyRobotInfoBySiteId,
  getCabinetInfoBySiteId,
  getSiteCabinet
};

export default api;
