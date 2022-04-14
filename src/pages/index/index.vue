<template>
  <div>
    <div class="container">
      <!-- 自定义导航栏 -->
      <div class="topPic">
        <img src="../../../static/images/topImg.png" />
      </div>
      <div class="week light" :style="barHeight">
        <div class="weekType animationLeft">
          {{currentWeek}} {{days[todayWeek-1]}}
        </div>
      </div>

      <div style="position: absolute;top: 270rpx; width: 100%;height: auto;">
        <!-- 菜单 -->
        <div class="cu-list grid col-3 no-border">
          <menuItem title="空教室查询" imgSrc="emptyClass.png" jumpTo="testPage">
          </menuItem>
          <menuItem title="闲置物品" imgSrc="secondHand.png" jumpTo="testPage">
          </menuItem>
          <menuItem title="失物招领" imgSrc="findThing.png" jumpTo="testPage">
          </menuItem>
          <menuItem title="新生易知" imgSrc="newStudent.png" jumpTo="testPage">
          </menuItem>
          <menuItem title="校历作息" imgSrc="watch.png" jumpTo="testPage">
          </menuItem>
          <menuItem title="更多" imgSrc="more.png" jumpTo="testPage">
          </menuItem>
        </div>

        <div class="courseBox ">
          <!-- 课表头部 -->
          <div>
            <text class="ontTextTitle ">
              -<text class="head">今日课表</text>-
            </text>
            <div class="allCourse ">
              <navigator url="/pages/course/course">
                 完整课表
              </navigator>
            </div>
          </div>
          <!-- 课表提示 -->
          <div class='invite' v-if="!tip">
            <text class="cuIcon-roundclosefill lg text-gray tipText" @click="changTip"></text>
            点击查看本学期的课程安排
          </div>

          <div class="course-body ">
          <!--  课程信息提示 -->
            <div class="course-tip" v-if="!myClass" @click="toMyInfo()">您未绑定班级信息，点我绑定</div>
            <div class="course-tip" v-else-if="courseData.length==0">{{tipStr}}</div>
            <div class="course-list" v-else>
              <div class="cu-timeline" v-for="(item,index) in courseData" :key="index">
                <div class=" cu-tag bg-mauve light round text-center animationCard" style="margin-left:20rpx">
                  <text>{{item.place}}</text>
                </div>
                <div class="cu-item text-cyan animationCard">
                  <div class="card">
                    <div class="cu-capsule ">
                      <div class="cu-tag bg-blue light box1">{{time[item.beginTime-1][0]}}-{{time[item.endTime-1][1]}}
                      </div>
                      <div class="cu-tag bg-cyan light  ">{{item.teacher}}</div>
                      <div class="cu-tag  bg-olive light box2">{{item.weeks}}</div>
                    </div>
                    <div class="margin-top name">{{item.name}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import menuItem from '@/components/menuItem'

  const app = getApp()
  const db = wx.cloud.database()

  export default {
    data() {
      return {
        CustomBar: app.globalData.CustomBar,
        todayWeek: new Date().getDay() == 0 ? 7 : new Date().getDay(),
        tipStr: '来啦来啦....',
        currentWeek: '',
        myClass: true,
        courseData: [],
        days: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
        time: [
          ['08:00', '08:40'],
          ['08:45', '09:25'],
          ['09:40', '10:20'],
          ['10:25', '11:05'],
          ['11:10', '11:50'],
          ['13:30', '14:10'],
          ['14:15', '14:55'],
          ['15:10', '15:50'],
          ['15:55', '16:35'],
          ['16:40', '17:20'],
          ['18:30', '19:10'],
          ['19:15', '19:55'],
          ['20:05', '20:45'],
          ['20:50', '21:30'],
        ],
        tip: false
      }
    },

    components: {
      menuItem
    },

    created() {
      let that = this;
      that.checkTip();
      that.getTodayCourse();
    },

    onShareTimeline: function() {
      return {
        title: '',
        query: {
          key: value
        },
        imageUrl: ''
      }
    },

    onShareAppMessage: function() {
      return {
        title: '快来看看《今日课表》吧',
        path: '/pages/courseIndex/courseIndex'
      }
    },

    onShow: function() {
    },

    onPullDownRefresh: function() {
      this.getTodayCourse()
      wx.stopPullDownRefresh({})
      wx.showToast({
        title: '已刷新',
        icon: 'none'
      })
    },

    computed: {
      barHeight() {
        return "top:" + wx.getStorageSync("systemInfo").statusBarHeight + "px";
      }
    },

    methods: {
      //获取当前学期的周数
      async getCurrentWeek() {
        let that = this;
        let date = new Date();
        let currentWeek = -1;

        //在数据库获取学期开始时间
        currentWeek = await db.collection('system')
          .doc('dateStartId123')
          .get()
          .then(res => {
            let dateStart = new Date(res.data.dateStart);
            currentWeek = Math.floor((date - dateStart) / (1000 * 60 * 60 * 24) / 7 + 1);
            return currentWeek;
          })
        return currentWeek;
      },

      //获取用户班级名字
      async getUserClass() {
        let that = this;
        if (wx.getStorageSync("className")) {
          return await wx.getStorageSync("className")
        } else {
          let className = await wx.cloud.callFunction({
              name: 'getUserInfo'
            })
            .then(res => {
              let info = res.result.info
              if (info && info.length > 0) {
                wx.setStorage({
                  key: 'className',
                  data: info[0].myClass,
                })
                return info[0].myClass;
              } else {
                that.myClass = false;
                return undefined;
              }
            })
          return className;
        }
      },

      //获取本学期课程
      async getCourse() {
        let className = await this.getUserClass();
        if (wx.getStorageSync(className)) {
          return await wx.getStorageSync(className);
        } else {
          let Courses = await wx.cloud.callFunction({
            name: 'getCourse',
            data: {
              myClass: className
            }
          }).then(res => {
            wx.setStorage({
              key: className,
              data: res.result.data,
            })
            return res.result.data;
          })
          return Courses;
        }
      },

      //获取今日课程
      async getTodayCourse() {
        let that = this;
        let todayCourseList = [];
        //获取当前是周几
        let day = new Date().getDay() === 7 ? 0 : new Date().getDay();
        //获取课程和当前周数
        let allCourses = await that.getCourse();
        let currentWeek = await that.getCurrentWeek();
        //检查周数
        if (currentWeek > 19 || currentWeek < 1) {
          that.tipStr = '放假中...';
          that.currentWeek = '';
        } else {
          that.currentWeek = '第 ' + currentWeek + ' 周';
        }
        //提示没有课程信息
        if (allCourses.length == 0) {
          that.tipStr = '暂无您的班级课程数据';
        }
        //获取当天课程信息
        for (let n = 0; n < allCourses.length; n++) {
          if (allCourses[n].day == day && allCourses[n].weeksNum.indexOf(currentWeek) != -1) {
            todayCourseList.push(allCourses[n]);
          }
        }
        if(todayCourseList.length == 0){
          that.tipStr = "今天没课，去看看完整课表吧";
        }
        this.courseData = todayCourseList;
      },

      //改变提示状态
      changTip() {
        this.tip = true;
        wx.setStorageSync('tip', true)
      },

      //检查提示状态
      checkTip() {
        if (wx.getStorageSync('tip')) {
          this.tip = wx.getStorageSync('tip')
        } else {
          wx.setStorageSync('tip', false)
        }
      },

      toMyInfo(){
        console.log("dfjakdljf")
         wx.navigateTo({
            url: '/pages/testPage/main'
        })
      }
    }
  }
</script>

<style scoped>
  /* 今日课表模板 */
  page {
    background-color: white;
  }

  .container {
    background-color: #FFFFFF;
    width: auto;
    
  }

  .week {
    position: relative;
    width: 100%;
    height: 150rpx;
    float: left;
  }

  .weekType {
    position: absolute;
    float: bottom;
    bottom: 0rpx;
    left: 26rpx;
    font-size: 28rpx;
    color: grey;
  }

  .allCourse {
    box-shadow: 1px 1px 2px 0px #A9A9A9;
    margin-right: 50rpx;
    border-radius: 30rpx;
    position: relative;
    background-color: khaki;
    padding-left: 8px;
    width: 70px;
    float: right;
    top: -20px;
  }

  .courseBox {
    box-shadow: 0px 1px 4px 0.5px #a9a9a96b;
    border-radius: 30rpx;
    position: relative;
    top: 5px;
    width: 95%;
    height: auto;
    align-items: center;
    margin-bottom: 150rpx;
    margin-left: 20rpx;
    margin-right: 20rpx;
    padding-bottom: 17px;
    background-color: #ffffff45;
    backdrop-filter: blur(6px);
  }

  .shadow[class*='white'] {
    --ShadowSize: 0 4rpx 19rpx;
  }

  .course-body {
    position: relative;
    top: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 200rpx;
  }

  .course-tip {
    margin-top: 100rpx;
    font-size: 30rpx;
    color: #666;
  }

  .course-list {
    position: relative;
    top: 11px;
    width: 100%;
  }

  .oneText {
    box-shadow: 1px 1px 2px 0px #A9A9A9;
    border-radius: 30rpx;
    position: relative;
    top: 0px;
    height: 200px;
    width: 95%;
    align-items: center;
    margin-left: 5rpx;
    margin-bottom: 20px;
  }

  .ontTextTitle {
    position: relative;
    width: 100%;
    height: 33px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .head {
    margin: 0px 10px;
    font-family: '华光综艺_CNKI';
    font-size: 30rpx;
    font-weight: bold;
  }

  .card {
    background-color: #f8f8ff;
    padding: 30rpx;
    margin-bottom: 30rpx;
    display: block;
    line-height: 1.6;
    border-radius: 20rpx;
    box-shadow: 1px 1px 2px 0px #A9A9A9;
  }

  .box1 {
    border-radius: 20rpx 0 0 20rpx;
  }

  .box2 {
    border-radius: 0 20rpx 20rpx 0;
  }

  .name {

    background-color: #f8f8ff;
  }
  .animationLeft {
    animation: fadeInLeft 2s 1;
  }

  .animationBtnEn {
    animation: zoomIn 4s 1;
  }

  .animationCard {
    animation: zoomIn 1.0s 1;
  }

  .invite {
    width: 400rpx;
    font-size: 25rpx;
    height: 62rpx;
    line-height: 62rpx;
    padding-left: 10rpx;
    float: right;
    position: relative;
    margin: 30rpx 0 0 0rpx;
    left: 66px;
    background-color: #FFF0F5;
    border: 1px solid #FFB5C5;
    border-radius: 5px;
  }

  .invite:after {
    content: '';
    width: 20rpx;
    height: 20rpx;
    position: absolute;
    top: -11rpx;
    float: right;
    right: 25px;
    transform: rotate(45deg);
    background-color: #FFF0F5;
    border: 1px #FFB5C5;
    border-style: solid none none solid;
  }

  .tipText {
    font-size: 20px;
    margin-right: 5px;
  }

  .topPic {
    position: fixed;
    height: 130px;
    width: 100%;
  }

  .topPic image {
    width: 100%;
    height: 130px;
  }
</style>
