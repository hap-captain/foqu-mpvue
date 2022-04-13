<template>
<div>
  <div class="UCenter-bg" :style="bgPicUrl">
    <div class="userInfo-box" >
      <img :src="avatarpic" class="avatar-box" mode="aspectFill" @click="toSetting()">
      <div class="userName" @click="toSetting()">{{name}}</div>
      <text class="cuIcon-writefill text-olive" @click="toSetting()">
        <text class="text-black">{{signature}}</text>
      </text>
    </div>
    <image :src="wavePic" mode="scaleToFill" class="gif-wave"></image>
  </div>
</div>
</template>

<script>
  export default{
    data(){
      return{
        wavePic :'https://786c-xly-3g3sm5xb43ed094b-1305336006.tcb.qcloud.la/system/wave.gif?sign=7c48c589f74b5e6c008edbc0bcf96c9d&t=1621865772',
      }
    },
    props:['avatarpic','bgPic','name','signature'],
    computed:{
      bgPicUrl(){
        return 'background-image:url(\'' + this.bgPic +'\');';
      }
    },
    methods:{
      toSetting(e){
        this.$emit("click",e);
      }
    }
  }
</script>

<style scoped>
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
    width: 150rpx;
    height: 150rpx;
  }

  .UCenter-bg .gif-wave{
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 99;
    mix-blend-mode: screen;
    height: 100rpx;
  }
  .userInfo-box{
    width: 70%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }
  .avatar-box
  {
    position: relative;
    border-radius: 50%;
    border: #e1e1ea 2px solid;
  }
  .userName {
    color: black;
    font-size: 36rpx;
    padding: 20rpx;
    font-weight: 500;
  }
</style>
