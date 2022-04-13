<template>
  <div id="">

    <div class="pageContainer">
      <scroll-div scroll-y class="scrollPage">
        <div class="UCenter-bg" :style="bgPic">
          <image @click="inSetting" :src="avatarpic" class="png" mode="aspectFill"
            style="height:75px;width:75px"></image>
          <div @click="inSetting" class="text-xl">{{name}}
          </div>
          <div class="margin-top-sm">
            <div class="cu-item signature">
              <div class="content " @click="setSignature">
                <text class="cuIcon-writefill text-olive"></text>
                <text class="text-black signatureText ">{{signature}}</text>
              </div>
            </div>
          </div>

          <!-- <button v-if="!ifLogin" class="cu-btn block bg-red margin-tb-sm lg loginBtn" @click="login">点击登陆</button> -->

          <!-- <modal hidden="{{hiddenmodalput}}" title="设置个性签名({{signature.length}}/23)" confirm-text="完成" cancel-text="取消"
            bindcancel="cancelM" bindconfirm="confirmM">
            <input bindinput='iName' type='text' placeholder="请输入个性签名..." auto-focus />
          </modal> -->

         <image
            src="https://786c-xly-3g3sm5xb43ed094b-1305336006.tcb.qcloud.la/system/wave.gif?sign=7c48c589f74b5e6c008edbc0bcf96c9d&t=1621865772"
            mode="scaleToFill" class="gif-wave"></image>
        </div>

      <!--  <div class="padding flex text-center text-grey bg-white ">
          <radio-group class="block" @click="radioChange">
            <div class="cu-form-group">
              <text class="cuIcon-skinfill text-{{iconColor}}"></text>
              <div class="title">四季随你</div>
              <div style="position:relative;float:right;" v-for="(item,index) in items" :key="index">
                <radio class="{{item.color}} radio margin-left-sm" value="{{item.value}}" checked="{{item.checked}}">
                </radio>
              </div>
            </div>
          </radio-group>
        </div> -->

      </scroll-div>

    <!--  <div class="cu-list grid col-3 padding ">
        <div @click="inPage" class="cu-item" class=" shadow bg-white cu-item animation-reverse "   v-for="(item,index) in list" :key="index" data-index="{{index}}">
          <div class="cuIcon-{{item.icon}} text-{{iconColor}} " style="font-size:32px">
          </div>
          <text>item.title</text>
        </div>
      </div> -->
    </div>
    <!-- <div class="cu-tabbar-height"></div> -->
  </div>
</template>

<script>

  const app = getApp()
  const db = wx.cloud.database()
  var arrList = [];

  export default{
    data(){
      return{
        signature:'',
            avatarpic:'',
            name:'',
            ifLogin:app.ifLogin,
            index: null,
            hiddenmodalput: true,
            showModal: true,
            StatusBar: app.globalData.StatusBar,
            list:[
              {
                title:'动态空间',
                icon:'discoverfill'
              },
              {
                title:'我的关注',
                icon:'likefill'
              },
              {
                title:'关注我的',
                icon:'favorfill'
              },
              {
                title:'设置',
                icon:'settingsfill'
              },
              {
                title:'佛趣指南',
                icon:'activityfill'
              },
              {
                title:'认证',
                icon:'newsfill'
              },

            ],
            items: [
              {value: 'green', color: 'green', checked: false
            ,url:'https://666f-fosusquare-9gwq61i6a0c9d216-1305659720.tcb.qcloud.la/system/%E7%BB%BF%E8%89%B2%E6%98%A5%E5%A4%A9.jpeg?sign=9b24c71fed95fc2cf2fd7a255631cdc3&t=1627785835'},
              {value: 'blue', color: 'blue', checked: true
              ,url:'https://666f-fosusquare-9gwq61i6a0c9d216-1305659720.tcb.qcloud.la/system/326b9a70-7630-438b-89e4-f38e8cfafa2e.jpeg?sign=0cd0bf3…&t=1621865681'},
              {value: 'yellow',color: 'yellow', checked: false
            ,url:'https://666f-fosusquare-9gwq61i6a0c9d216-1305659720.tcb.qcloud.la/system/%E7%A7%8B%E5%A4%A9.jpeg?sign=37b7ca2b404ad6674802d0729d5c77f8&t=1627785951'},
              {value: 'white', color: 'cyan', checked: false,
            url:'https://666f-fosusquare-9gwq61i6a0c9d216-1305659720.tcb.qcloud.la/system/%E5%86%AC%E5%A4%A9.jpeg?sign=2df3b1af8874bcb92f2570c45a3aeaa9&t=1627785967'},
            ],
            picUrl:'',
            iconColor:''
      }
    },

    created() {
       if(wx.getStorageSync('theme')&&wx.getStorageSync('picUrl'))
          {

              this.items = wx.getStorageSync('theme');
              this.picUrl = wx.getStorageSync('picUrl');
              this.iconColor = wx.getStorageSync('iconColor');
          }
          else
          {
              this.items = this.items;
              this.picUrl = 'https://666f-fosusquare-9gwq61i6a0c9d216-1305659720.tcb.qcloud.la/system/326b9a70-7630-438b-89e4-f38e8cfafa2e.jpeg?sign=0cd0bf3…&t=1621865681';
              this.iconColor = 'blue';
          }

          if(wx.getStorageSync('signature'))
          {

              this.signature = wx.getStorageSync('signature');
          }
          else
          {
            wx.setStorageSync('signature', '个性签名')
          }
    },

    onPullDownRefresh: function () {
        // this.CheckIfLogin();
        wx.stopPullDownRefresh({})
        wx.showToast({
          title: '已刷新',
          icon: 'none',
          duration: 800
        })

      },
     //用户点击右上角分享朋友圈
     onShareTimeline: function () {

    },
    onShow: function () {
        // this.CheckIfLogin()
      },

    components:{

    },
    computed:{
      bgPic(){
        console.log('background-image:url(\'' + this.picUrl +'\');')
        return 'background-image:url(\'' + this.picUrl +'\');';
      }
    },
    methods:{
       //文本内容合法性检测
        async checkStr(text) {
          try {
            var res = await wx.cloud.callFunction({
              name: 'checkStr',
              data: {
                text: text,
              }
            });
            if (res.result.errCode == 0)
              return true;
          } catch (err) {
            return false;
          }
        },

         //开始审核文本
         async checkText() {
          var text = this.data.signature
          if (text.length > 0) {
            var checkOk = await this.checkStr(text);
          } else {
            var checkOk = true
          }
          if (!checkOk) {

            wx.hideLoading({}),//审核不通过隐藏
              wx.showToast({
                title: '文本含有违法违规内容',
                icon: 'none',
                duration: 5000,
              })
            filePath = [];
            arrList = [];

            this.signature = '';
            this.searchinput = '';
            return false//这个return返回，停止继续执行
          }
          else {
            return true
          }
        },
        login(){
          wx.navigateTo({
            url: '../login/login',
          })
        },
        //修改签名
        setSignature: function () {

          this.hiddenmodalput = false;

        },
        cancelM: function (e) {
          this.hiddenmodalput = true;
        },
        async confirmM (e) {
          wx.showLoading({
            title: '上传中...',
          })
          var strOK = await this.checkText();
          if(strOK)
          {
            //上传修改数据
            db.collection('usersInfformation').where({
              _openid:wx.getStorageSync('openid')
            }).update({
              data: {
                signature:this.data.signature
              }
            }).then((res) => {

              wx.setStorageSync('signature',this.data.signature)
              wx.hideLoading({})
              wx.showToast({
                title: '已修改！',
                duration: 500
              })

          });
          }

            this.hiddenmodalput = true;
        },
         iName (e) {
          this.signature = e.detail.value
        },
        radioChange(e) {
          const items = this.items
          for (let i = 0, len = items.length; i < len; ++i) {
            items[i].checked = items[i].value === e.detail.value
            if(items[i].checked)
            {
                this.picUrl = this.items[i].url;
                this.iconColor = this.items[i].color;

            }
          }

          this.items = items;

          wx.setStorageSync('theme', this.data.items)
          wx.setStorageSync('picUrl', this.data.picUrl)
          wx.setStorageSync('iconColor', this.data.iconColor)
        },
        inSetting()
        {
          wx.navigateTo({
            url: '../side/setting/setting',
          })
        },
        inPage(e)
        {
          var index=e.currentTarget.dataset.index
          if(index==0)
          {
            wx.navigateTo({
              url: '../side/history/history',
            })
          }
          if(index==1)
          {
            wx.navigateTo({
              url: '../side/myFollow/myFollow',
            })
          }
          if(index==2)
          {
           wx.navigateTo({
             url: '../side/fans/fans',
           })
          }
          if(index==3)
          {
            wx.navigateTo({
              url: '../side/setting/setting',
            })
          }
          if(index==4)
          {
            wx.navigateTo({
              url: '../side/tips/tips',
            })
          }
          if(index==5)
          {
            wx.navigateTo({
              url: '../side/identification/identification',
            })
          }
        }
    }
  }
</script>

<style scoped>
  .pageContainer{
    width: 100%;
    min-height: 100vh;
    background-color:white;
  }

  .UCenter-bg {
    background-size: cover;
    height: 550rpx;
    display: flex;
    justify-content: center;
    padding-top: 40rpx;
    overflow: hidden;
    position: relative;
    flex-direction: column;
    align-items: center;
    color: #fff;

  }

  .UCenter-bg image {
    width: 200rpx;
    height: 200rpx;
  }

  .UCenter-bg .gif-wave{
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 99;
    mix-blend-mode: screen;
    height: 100rpx;
  }

  map,.mapBox{
    left: 0;
    z-index: 99;
    mix-blend-mode: screen;
    height: 100rpx;
  }

  map,.mapBox{
    width: 750rpx;
    height: 300rpx;
  }
  .png
  {
    position: relative;
    border-radius: 50%;
    border: #e1e1ea 2px solid;
  }
  .text-xl {
    color: black;
    font-size: 36rpx;
    margin-top: 4px;
    font-weight: 500;
  }
  .signature
  {
    position: relative;
    margin-left: 10px;
    margin-right: 18px;
  }
  .cu-form-group .title {
    text-align: justify;
    margin-left: 5px;
    padding-right: 48rpx;
    font-size: 28rpx;
    position: relative;
    height: 56rpx;
    line-height: 58rpx;
    color: black;
  }
  .setting
  {
    position: relative;
    float: right;
  }
  .grid.col-3>view {
    width: 29.33%;
    margin: 0 auto;
    margin-left: 9px;
    margin-top: 20px;
    border-radius: 9px;
  }
  .shadow[class*='white'] {
    --ShadowSize: 0 0rpx 19rpx;
  }
  .cu-list.grid>.cu-item {
    position: relative;
    display: flex;
    padding: 20rpx 0 40rpx;
    transition-duration: 0s;
    flex-direction: column;
  }
  .cu-tabbar-height {
    background-color: white;
    min-height: 100rpx;
    height: calc(100rpx + env(safe-area-inset-bottom) / 2);
  }
</style>
