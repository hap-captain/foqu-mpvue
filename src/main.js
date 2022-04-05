import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

//云开发环境配置
wx.cloud.init({
  env: 'fosusquare-9gwq61i6a0c9d216',
  traceUser: true
})

//全局变量
this.globalData = {
  myClass: "",
  currentWeek: "",
  allCourseData: {},
  flushC: "",
  dotNum: '0' //记录消息红点数目
}

//获取手机屏幕信息
wx.getSystemInfo({
  success: e => {
    this.globalData.StatusBar = e.statusBarHeight;
    let custom = wx.getMenuButtonBoundingClientRect();
    this.globalData.Custom = custom;
    this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
    // 获取屏幕高度
    this.screenHeight = e.screenHeight
    // 获取状态栏高度
    this.statusBarHeight = e.statusBarHeight
    // 通过操作系统 确定自定义导航栏高度
    if (e.system.substring(0, 3) == "iOS") {
      this.navBarHeight = 42
    } else {
      this.navBarHeight = 44
    }
  }
})

const app = new Vue(App)
app.$mount()
