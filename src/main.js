import Vue from 'vue'
import Apps from './App'

Vue.config.productionTip = false
Apps.mpType = 'app'

//云开发环境配置
wx.cloud.init({
  env: 'fosusquare-9gwq61i6a0c9d216',
  traceUser: true
});
App({
  onLaunch: function(options) {
    this.getSystemInfo()
  },
  onShow: function(options) {
  },
  onHide: function() {
      console.log("onHide");
      // Do something when hide.

  },
  onError: function(msg) {
      console.log(msg)
  },

  getSystemInfo(){
    //获取手机屏幕信息
    if(!wx.getStorageSync("systemInfo")){
      wx.getSystemInfo({
            success: e => {
              let custom = wx.getMenuButtonBoundingClientRect();
              let StatusBar = e.statusBarHeight;
              let Custom = custom;
              let CustomBar = custom.bottom + custom.top - e.statusBarHeight;
              // 获取屏幕高度
              let screenHeight = e.screenHeight
              // 获取状态栏高度
              let statusBarHeight = e.statusBarHeight
              //通过操作系统 确定自定义导航栏高度
              let navBarHeight = 0;
              if (e.system.substring(0, 3) == "iOS") {
                 navBarHeight = 42
              } else {
                navBarHeight = 44
              }
             wx.setStorage({
               key: 'systemInfo',
               data: {
                 StatusBar,
                 Custom,
                 CustomBar,
                 screenHeight,
                 statusBarHeight,
                 navBarHeight
               },
             })
            }
          })
    }

  }
  })
var systemInfo =  wx.getSystemInfo({
      success: e => {
        let custom = wx.getMenuButtonBoundingClientRect();
        let StatusBar = e.statusBarHeight;
        let Custom = custom;
        let CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        // 获取屏幕高度
        let screenHeight = e.screenHeight
        // 获取状态栏高度
        let statusBarHeight = e.statusBarHeight
        //通过操作系统 确定自定义导航栏高度
        let navBarHeight = 0;
        if (e.system.substring(0, 3) == "iOS") {
           navBarHeight = 42
        } else {
          navBarHeight = 44
        }
        return{
          StatusBar,
          Custom,
          CustomBar,
          screenHeight,
          statusBarHeight,
          navBarHeight
        }
      }
    })
const app = new Vue(Apps)
app.$mount()
Vue.prototype.globalData = {
  systemInfo:"fdf"
}
