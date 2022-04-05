<template>
  <div>
  <div class="cu-item animation-reverse " @click="jumpTo">
  	<div class="iconPic">
  	<img :src="resultImgSrc"/>
  	</div>
  	<text>{{title}}</text>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return{
    }
  },
  props: ['title','imgSrc','jumpTo'],
  computed: {
    resultImgSrc() {
      return "../../static/images/" + this.imgSrc;
    }
  },
  methods:{
    jumpTo(){
     let resultUrl = '/pages/' + this.jumpTo + '/main'
     mpvue.navigateTo({
       url: resultUrl
     })
    }
  },
  newFunction(){
    console.log("dfsd")
  }
}
</script>

<style>
  .cu-item {
    padding-top: 10rpx;
    padding-bottom: 50rpx;
  }
  .cu-item text {
    display: block;
    margin-top: 10rpx;
    color: #888;
    font-size: 20rpx;
    line-height: 40rpx;
  }
  .iconPic
  {
    width: 35px;
    height: 35px;
    margin: 0 auto;
    margin-bottom: 6px;
  }
  .iconPic image
  {
    width: 35px;
    height: 35px;
  }
</style>
