import { createRouter, createWebHashHistory } from "vue-router";
import AdminLayoutView from "@/views/layout/AdminLayoutView.vue";
//除了首页其它都使用异步加载
//页面的相关配置
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("../views/login/LoginView.vue"),
  },
  {
    path: "/aboutus",
    component: () => import("../views/functionalviews/AboutUsView.vue"),
  },
  {
    path: "/admin",
    name: "adminlayout",
    component: AdminLayoutView,
    redirect: "/admin/overview",
    children: [
      {
        path: "overview",
        name: "dashboard",
        component: () => import("../views/functionalviews/DashBoardView.vue"),
      },
      {
        path: "users",
        redirect: "/admin/users/management",
        children: [
          {
            path: "management",
            name: "userlist",
            component: () => import("../views/functionalviews/UserManagementView.vue"),
          },
          {
            path: "statistics",
            name: "userstatistics",
            component: () => import("../views/functionalviews/UserStatisticsView.vue"),
          },
          {
            path: ":userId/info",
            name: "userinfo",
            component: () => import("../views/functionalviews/UserDetailedInformationView.vue"),
          },
        ],
      },
      {
        path: "robots",
        redirect: "/admin/robots/management",
        children: [
          {
            path: "management",
            name: "robotlist",
            component: () => import("../views/functionalviews/RobotManagementView.vue"),
          },
          {
            path: "maintenance",
            name: "robotmaintenance",
            component: () => import("../views/functionalviews/RobotMaintenanceView.vue"),
          },
          {
            path: "warehouse",
            name: "partswarehouse",
            component: () => import("../views/functionalviews/RobotPartsWarehouseView.vue"),
          },
          {
            path: ":robotId/route",
            name: "robotroute",
            component: () => import("../views/functionalviews/RobotRealTimeRouteView.vue"),
          },
          {
            path: ":robotId/state",
            name: "robotstate",
            component: () => import("../views/functionalviews/RobotRealTimeStateView.vue"),
          },
        ],
      },
      {
        path: "stations",
        redirect: "/admin/stations/management",
        children: [
          {
            path: "management",
            name: "stationlist",
            component: () => import("../views/functionalviews/StationManagementView.vue"),
          },
          {
            path: "distribution",
            name: "stationmap",
            component: () => import("../views/functionalviews/StationDistributionView.vue"),
          },
          {
            path: ":stationId/container/management",
            name: "containerlist",
            component: () => import("../views/functionalviews/StationContainerManagementView.vue"),
          },
        ],
      },
      {
        path: "orders",
        redirect: "/admin/orders/management",
        children: [
          {
            path: "management",
            name: "orderlist",
            component: () => import("../views/functionalviews/OrderManagementView.vue"),
          },
          {
            path: ":orderId/info",
            name: "orderinfo",
            component: () => import("../views/functionalviews/OrderDetailedInformationView.vue"),
          },
          {
            path: ":history/management",
            name: "historyorderlist",
            component: () => import("../views/functionalviews/HistoryOrderManagementView.vue"),
          },
        ],
      },
      {
        path: "finance",
        redirect: "/admin/finance/management",
        children: [
          {
            path: "management",
            name: "financiallist",
            component: () => import("../views/functionalviews/FinanceManagementView.vue"),
          },
          {
            path: "statistics",
            name: "financialstatistics",
            component: () => import("../views/functionalviews/FinanceStatisticsView.vue"),
          },
        ],
      },
      {
        path: "marketing",
        redirect: "/admin/marketing/management",
        children: [
          {
            path: "management",
            name: "marketinglist",
            component: () => import("../views/functionalviews/MarketingManagementVIew.vue"),
          },
          {
            path: "newactivity",
            name: "addmarketingactivity",
            component: () => import("../views/functionalviews/AddMarketingActivity.vue"),
          },
        ],
      },
      {
        path: "personal",
        redirect: "/admin/personal/info",
        children: [
          {
            path: "info",
            name: "personalinfo",
            component: () => import("../views/functionalviews/PersonalInformationEditionView.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token");
  const publicRoutes = ["/login", "/aboutus"]; // 公开路由列表

  // 如果目标路径是公开路由，则直接允许访问
  if (publicRoutes.includes(to.path)) {
    next();
  } else {
    // 如果目标路径不是公开路由，并且没有 token，则重定向到登录页
    if (!token) {
      next("/login");
    } else {
      // 否则继续导航
      next();
    }
  }
});
export default router;
