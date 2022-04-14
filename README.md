# foqu-mpvue

> 一个基于mpvue和微信云开发的校园社交类小程序

![小程序二维码](https://s3.bmp.ovh/imgs/2022/03/159d40f7fe6cba9d.jpg)

## 构建步骤
使用mpvue-cli 初始化项目
``` bash
# 全局安装 vue-cli
$ npm install --global vue-cli

# 创建一个基于 mpvue-quickstart 模板的新项目
$ vue init mpvue/mpvue-quickstart my-project

# 安装依赖，走你
$ cd my-project
$ npm install
$ npm run dev
```

配置云开发环境（默认已了解[微信云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html))
+ main.js文件中指定云开发环境
```javascript
wx.cloud.init({
  env: '云开发环境ID',
  traceUser: true
})
```
+ app.json 开通云开发功能
```javascript
//添加
"cloud": true
```
+ project.config.json 文件中指定云函数存放目录
```json
//即在static下创建一个文件夹cloudfunctions，用来存放云函数
"cloudfunctionRoot": "static/cloudfunctions/"
```
+ 在微信开发者工具中找到cloudfunctions文件，即可进行云函数创建部署。

安装vue-router
控制台输入
```
npm install vue-router@4
```
