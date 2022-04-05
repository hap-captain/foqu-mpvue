<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>

@import "../static/colorui/main.wxss";
@import "../static/colorui/icon.wxss";
@import "../static/colorui/animation.wxss";
@import "../static/style/animate.wxss";


.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

button {
  background: initial;
}

button:focus{
  outline: 0;
}

button::after{
  border: none;
}


page {
  background-color: #F8F8FF;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.userinfo, .uploader, .tunnel {
  margin-top: 40rpx;
  height: 140rpx;
  width: 100%;
  border-left: none;
  border-right: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 300ms ease;
}
.userinfo-avatar {
  width: 100rpx;
  height: 100rpx;
  margin: 20rpx;
  border-radius: 50%;
  background-size: cover;
  background-color: white;
}

.userinfo-avatar:after {
  border: none;
}

.userinfo-nickname {
  font-size: 32rpx;
  color: #007aff;
  background-color: white;
  background-size: cover;
}

.userinfo-nickname::after {
  border: none;
}

.uploader, .tunnel {
  height: auto;
  padding: 0 0 0 40rpx;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
}

.uploader-text, .tunnel-text {
  width: 100%;
  line-height: 52px;
  font-size: 34rpx;
  color: #007aff;
}

.uploader-container {
  width: 100%;
  height: 400rpx;
  padding: 20rpx 20rpx 20rpx 0;
  display: flex;
  align-content: center;
  justify-content: center;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.uploader-image {
  width: 100%;
  height: 360rpx;
}

.tunnel {
  padding: 0 0 0 40rpx;
}

.tunnel-text {
  position: relative;
  color: #222;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.tunnel-text:first-child {
  border-top: none;
}

.tunnel-switch {
  position: absolute;
  right: 20rpx;
  top: -2rpx;
}

.disable {
  color: #888;
}

.service {
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  background: linear-gradient(#007aff, #0063ce);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-content: center;
  justify-content: center;
  transition: all 300ms ease;
}

.service-button {
  position: absolute;
  top: 40rpx;
}

.service:active {
  box-shadow: none;
}

.request-text {
  padding: 20rpx 0;
  font-size: 24rpx;
  line-height: 36rpx;
  word-break: break-all;
}
.ns {
  position:fixed;
  top: 0rpx;
  width: 100%;
  height: 11%;
  text-align:center;
  line-height: 155rpx;
  color: white;
  font-weight:bold;
  background:linear-gradient(45deg, #0081ff, #1cbbb4);
  z-index: 1;
}

@import url("app-wxa-auto-dark.wxss");
</style>
