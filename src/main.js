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
    this.getSystemInfo();
    this.checkLogin();
  },
  onShow: function(options) {},
  onHide: function() {},
  onError: function(msg) {},

  //获取设备信息
  getSystemInfo() {
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
  },

  //获取用户openid
  async getUserOpenid() {
    let openid = '';
    if (!wx.getStorageSync('openid')) {
      openid = await wx.cloud.callFunction({
          name: 'getopenid',
          data: {},
        })
        .then(res => {
          wx.setStorageSync('openid', res.result.openid) //将获取到的openid存入缓存
          return res.result.openid;
        })
      return openid;
    } else {
      return wx.getStorageSync('openid')
    }
  },

  //检查用户是否登陆
  async checkLogin() {
    let openid = await this.getUserOpenid();
    let ifLogin = true
    //没有登陆标记先设置缓存
    if (!wx.getStorageSync("ifLogin")) {
      wx.setStorageSync('ifLogin', false);
    }
    //版本迭代遗留问题，判断是否已经有注册记录
    if (!wx.getStorageSync('userInformation'))
    { console.log("woengllll")
      let userInfo = await wx.cloud.database().collection('usersInfformation')
        .where({
          _openid: openid
        })
        .get()
        .then(res => {
          return res.data;
        })
        console.log("userInfo", userInfo[0])
      if (userInfo.length == 0) { //如果用户不存在则缓存中不因存在userInformation，用于删除用户
        try {
          wx.removeStorage({
            key: 'userInformation',
          })
          wx.setStorageSync('ifLogin', false);
        } catch (e) {
          wx.setStorageSync('ifLogin', false);
        }
      } else {
        wx.setStorageSync('userInformation', userInfo[0])
        wx.setStorageSync('ifLogin', true);
      }

    }
    //查找到记录则说明已经登陆
    else if (wx.getStorageSync('userInformation')) {
      wx.setStorageSync('ifLogin', true);
    }
  }
})

const app = new Vue(Apps)
app.$mount()
Vue.prototype.globalData = {
  systemInfo: "fdf"
}
