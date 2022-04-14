<template>
  <div id="item">
  <div @click="inPage()" class="cu-item shadow bg-white" >
    <div style="font-size:32px" :class="[iconType, iconColorType]">
    </div>
    <text>{{title}}</text>
  </div>
 </div>
</template>

<script>
  export default{
    data(){
      return{

      }
    },
    props:['title','icon','iconColor'],
    methods:{
      inPage(){
        console.log("inPages")
      }
    },
    computed:{
      iconType(){
        return "cuIcon-" + this.icon;
      },
      iconColorType(){
        return "text-" + this.iconColor;
      }
    }
  }
</script>

<style scoped>
  .cu-item {
    position: relative;
    display: flex;
    padding: 40rpx 40rpx;
    transition-duration: 0s;
    flex-direction: column;
  }
  .cu-item text {
      display: block;
      margin-top: 10rpx;
      color: #888;
      font-size: 26rpx;
      line-height: 40rpx;
  }
  .shadow[class*='white'] {
    --ShadowSize: 0 0rpx 19rpx;
  }
  #item>div {
    width: 90%;
    margin: 0 auto;
    margin-left: 9px;
    margin-top: 20px;
    border-radius: 9px;
  }
</style>
