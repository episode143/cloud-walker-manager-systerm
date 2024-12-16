const base = {
  // baseUrl:"",
  //baseUrl: "https://apifoxmock.com/m1/5326600-4997107-default", // 替换为你的 API 基础 URL
  baseUrl:"http://120.46.199.126:8080",
  //baseUrl:"http://192.168.31.118:80",
};

const paths = {
  login: "/admin/login",//登录
  register: "/admin/register",//注册

  //dashboard部分
  operationSituation: "/admin/overview/branch",//dashboard头部的三个卡片——运维情况
  orderAccomplishmentStatus:'/admin/overview/orderdate',//dashboard旁边的三个数据——订单完成情况
  averageDailyOrderCycle:'/admin/overview/orderHourlyCount',//dashboard中单日订单数量周期变化（未对接）
  systemNotificationMessageList:'/admin/overview/notification',//获取系统提示消息
  deleteSystemNotificationMessageList:'/admin/overview/delete-message',//删除系统提示消息
  haveReadSystemMessage:'/admin/overview/message-read',//管理员已读系统消息
  //用户管理部分
  totalUserCount:'/admin/userview/totalUserCount',//用户管理跳转卡片——总用户数
  userTransformationSituation:'/admin/userview/analytics/cards',//用户数据统计头部三个卡片——用户转化情况
  userCountYearlyAnalysis:'/admin/userview/analytics/growthForPast12Month',//用户一年内每月数量变化 
  userFrequencyAnalysis:'/admin/userview/analytics/frequencyUsers',//用户使用频率肖像分析
  userLossQuarterlyAnalysis:'/admin/userview/analytics/find8MonthUserChurnCount',//用户流失分析
  userDetailedInformation: '/admin/userview/analytics/detailedinformation',//用户详细数据
  rewardUserCoupon:'/admin/userview/analytics/reward',//奖励用户礼券
  userWeeklyUsage:'/admin/userview/analytics/servicesituation',//用户这周配送使用情况
  //机器人管理部分
  totalRobotCount:'/admin/robotview/totalRobotCount',//机器人管理跳转卡片——总机器人数量
  robotWorkingSituation:'/admin/robotview/analytics/cards',//机器人维护信息头部三个卡片——机器人运维情况
  robotRepairPartStatus:'/admin/robotview/analytics/repairCount',//机器人损坏的零部件情况
  belongStationList:'/admin/robotview/analytics/stationlist',//机器人归属站点列表
  robotPartsInventory:'/admin/robotview/analytics/sparepartCount',//获取机器人零件库存
  realTimeStatus:'/robot/get-velocity',//机器人实时状态
  realTimeOrderState:'/admin/robotview/analytics/order',//机器人正在配送订单实时状态
  updatePartsWaterLine:'/admin/robotview/analytics/modifyWaterLine',//修改零件水位警报阈值
  partsPurchaseList:'/admin/robotview/purchaselist',//获取进货零件清单
  getPartsWarehoused:'/admin/robotview/storageParts',//零件入库
  robotRepairType: '/admin/robotview/analytics/getRobotRepairType',//机器人损坏情况
  getRobotRepaired: '/admin/robotview/analytics/repairRobot',//维修机器人
  //站点管理部分
  totalStationCount:'/admin/siteview/totalSiteCount',//站点分布跳转卡片——总管理站点数量
  stationsOperatingStatus:'/admin/siteview/analytics/cards',//站点运行情况三个卡片
  stationDetailedInformation:'/admin/siteview/analytics/cabinetInfo',//具体站点的详细运行信息
  clearUpOvertimeContainers:'/admin/cabinet/analytics/clearup',//一键清除站点所有超时货柜
  //订单管理部分
  totalOrderCount:'/admin/orderview/totalOrderCount',//——待完成的总订单数
  historyOrderCount:'/admin/orderview/historyOrderCount',// 历史总订单数
  //流水管理部分
  totalProfit:'/admin/transactionview/totalProfitLastMonth',//流水数据统计跳转卡片——总营收额
  profitComponentAnalysis:'/admin/transactionview/analytics/cards',//流水数据成分统计——收入、支出、净利润
  weekFinanceChangeTrend:'/admin/transactionview/analytics/dailyAmountData',//获取七天内收入、支出、利润变化的折线
  first30DaysProfit:'/admin/overview/dailyProfit',//dashboard中前30天营收情况

  //营销活动部分
  takeDownMarketingActivity:'/admin/marketing/deleteActivity',//下架活动
  postMarketingActivity:'/admin/marketing/newactivity',//新增营销活动
  modifyRechargeAward:'/admin/marketing/modifyRecharge',//修改充值活动内容
  onlineMarketingActivityList:'/admin/marketing/onlineActivities',//进行中的营销活动图
  //管理员个人信息管理
  adminDetailedInformation:'/admin/getinfo',//获取管理员详细信息
  changeAdminInformation:'/admin/modifyInfo',//修改管理员信息的部分字段
  changeAdminPassword:'/admin/changepassword',//修改管理员密码
  modifyAdminAvatar:'/admin/modifyAvatar',//修改管理员头像
  //获取分页表单
  userPageTable:'/admin/userview/analytics/datalist',//获取用户后端分页内容
  robotPageTable:'/admin/robotview/analytics/datalist',//获取机器人后端分页内容
  stationPageTable:'/admin/siteview/analytics/datalist',//获取站点后端分页内容
  currentOrderPageTable:'/admin/orderview/analytics/currentdatalist',//获取未完成订单后端分页内容
  historyOrderPageTable:'/admin/orderview/analytics/historydatalist',//获取历史订单后端分页内容
  transactionPageTable:'/admin/transactionview/analytics/datalist',//获取流水订单
  cabinetPageTable:'/admin/cabinet/analytics/datalist',//获取货柜后端分页内容
  marketingActivityPageTable:'/admin/marketing/analytics/datalist',//获取营销活动后端分页内容

  //获取地图信息
    //获取机器人坐标
  robotLat:'/admin/robotview/getlat', // --------------------------------dht + 机器人经纬度
  robotDest:'/admin/robotview/getdestination', //------------------------dht + 机器人目的地
    //获取站点地图相关信息
  siteDetails:'/admin/siteview/analytics/siteDetails',//----------------dht + 站点详情
  busyRobotInfo:'/admin/siteview/busyrobotinfo', //---------------------dht + 获得某个站点的 busy 机器人的坐标
  cabinetInfo: '/admin/siteview/analytics/cabinetInfo', //--------------dht + 获得某个站点的货柜相关信息
};

export { base, paths };
