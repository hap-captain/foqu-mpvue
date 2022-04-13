<template>
  <div id="">

    <div class="pageContainer">

      <userInfoCard
        :avatarpic="avatarpic"
        :bgPic="picUrl"
        :name="name"
        :signature="signature"
        @click="toSetting()"
        >
      </userInfoCard>
      <div id="login-btn">
        <button v-show="!ifLogin"  type="button" @click="toLogin()">点我注册</button>
      </div>

        <div class="padding flex">
           <div class="select-text">
             <text class="cuIcon-skinfill" :class="radioColor"></text>
             <text class="title">四季随你</text>
            </div>
          <radio-group @change="radioChange($event)" >
           <radio  v-for="(item,index) in items" :key="index" :class="item.color" class="radio margin-left-sm" :value="item.value" :checked="item.checked">
            </radio>
          </radio-group>
        </div>

     <div class="cu-list grid col-3 padding ">
        <div @click="inPage"class=" cu-item shadow bg-white cu-item animation-reverse "  v-for="(item,index) in list" :key="index" :data-index="index">
          <div :class="menuItemCuIcon(item)" style="font-size:32px">
          </div>
          <text>item.title</text>
        </div>
      </div>
    </div>
    <!-- <div class="cu-tabbar-height"></div> -->
  </div>
</template>

<script>
  import userInfoCard from '@/components/userInfoCard'
  const app = getApp()
  const db = wx.cloud.database()
  var arrList = [];

  export default{
    data(){
      return{
        signature:'342234234',
            avatarpic:'',
            name:'dfdsf',
            ifLogin:true,
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
      this.ifLogin = wx.getStorageSync('ifLogin')
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
      userInfoCard
    },
    computed:{
      radioColor(){
        return "text-" + this.iconColor;
      },
       // text-{{iconColor}} "
    },
    methods:{
        menuItemCuIcon(item){
          console.log(item)
          return 'cuIcon-' + item.icon;
        },
        toLogin(){
          console.log("进入注册页面")
        },
        radioChange(e) {
          console.log(e.mp.detail)
          const items = this.items
          for (let i = 0, len = items.length; i < len; ++i) {
            items[i].checked = items[i].value === e.mp.detail.value
            if(items[i].checked)
            {
                this.picUrl = this.items[i].url;
                this.iconColor = this.items[i].color;

            }
          }

          this.items = items;

          wx.setStorageSync('theme', this.items)
          wx.setStorageSync('picUrl', this.picUrl)
          wx.setStorageSync('iconColor', this.iconColor)
        },

       toSetting()
       {
         console.log("进入设置")
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

  .title {
    padding-right: 48rpx;
    font-size: 28rpx;
    position: relative;
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
  #login-btn{
    position: absolute;
    top: 430rpx;
    height: auto;
    width: 100%;
    margin: 0 auto;
    z-index: 100;
  }
  #login-btn button{
    background-color: #f5ac3bf2;
    width: 250rpx;
  }
  .select-text{
    margin-left: 30rpx;
  }

</style>
