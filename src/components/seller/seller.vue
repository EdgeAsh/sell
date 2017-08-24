<template>
<div class='seller'>
  <div class="seller-content">
    <div class="overview clearfix">
      <div class="favorite" @click='toggleFavor'>
        <span class="icon-favorite" :class="{'active': favorite}"></span>
        <span class="text">{{ftext}}</span>
      </div>
      <h3 class="title">{{seller.name}}</h3>
      <div class="desc">
        <star :size='36' :score='seller.score'></star>
        <span class="text">({{seller.ratingCount}})</span><span class="text">月售{{seller.sellCount}}单</span>
      </div>
      <ul class="info-list">
        <li class="block">
          <span class="zy">起送价</span>
          <p class="p"><span class="info">{{seller.minPrice}}</span>元</p>
        </li>
        <li class="block">
          <span class="zy">商家配送</span>
          <p class="p"><span class="info">{{seller.deliveryPrice}}</span>元</p>
        </li>
        <li class="block">
          <span class="zy">平均配送时间</span>
          <p class="p"><span class="info">{{seller.deliveryTime}}</span>分钟</p>
        </li>
      </ul>
    </div>
    <div class="split"></div>
    <div class="public">
      <h3 class="title">公告与活动</h3>
      <p class="bulletin">{{seller.bulletin}}</p>
      <ul v-if='seller.supports'>
        <li class="icontext-wrap" v-for='(support,index) in seller.supports'>
          <icontext
          :size='32' :msg='support.description' :index='index'
          ></icontext>
        </li>
      </ul>
    </div>
    <div class="split"></div>
    <div class="seller-scene">
      <h3 class="title">商家场景</h3>
      <ul class="scene-wrap">
        <li class="scene" v-for='pic in seller.pics'>
          <img :src="pic" alt="场景" class="pic">
        </li>
      </ul>
    </div>
    <div class="split"></div>
    <div class="seller-info">
      <h3 class="title">商家信息</h3>
      <ul class="info-wrap">
        <li class="info-item" v-for='infoitem in seller.infos'>
          {{infoitem}}
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import star from "components/star/star.vue"
import icontext from "components/icon&text/icontext.vue"
export default{
  props:{
    seller: {
      type: Object
    }
  },
  data(){
    return {
      favorite: false
    }
  },
  methods:{
    toggleFavor(){
      this.favorite = !this.favorite;
      // 将收藏的状态存入缓存
    }
  },
  components: {
    star,
    icontext
  },
  computed:{
    ftext(){
      return this.favorite ? '已收藏':'收藏'
    }
  }
}
</script>

<style lang='stylus'>
.seller
  position: absolute
  left:0
  right:0
  top:174px
  bottom:0
  .overview
    padding: 18px 18px 0
    .favorite
      float: right
      text-align: center
      font-size: 0px
      .icon-favorite
        font-size:24px
        line-height: 24px
        color: rgba(77,85,93,.6)
        &.active
          color:rgb(240,20,20)
      .text
        display:block
        color: rgb(77,85,93)
        font-size: 10px
        margin-top: 4px
        width: 30px
        line-height: 10px
    .title
      font-size: 14px
      color: rgb(7,17,27)
      line-height: 14px
    .desc
      font-size: 0
      padding: 8px 0 18px 0
      border-bottom: 1px solid rgba(7,17,27,.1)
      .star
        font-size:0
        display: inline-block
      .text
        font-size: 10px
        color: rgb(77,85,93)
        line-height: 18px
        margin-left: 8px
        vertical-align: top
        &:last-child
          margin-left: 12px
    .info-list
      display: flex
      padding: 18px 0
      font-size: 0px
      .block
        flex:1
        font-size: 0
        text-align: center
        border-right: 1px solid rgba(7,17,27,.1)
        &:last-child
          border-right:none
        .zy
          display: inline-block
          font-size:10px
          color: rgb(147,153,159)
          line-height: 10px
          margin-bottom: 4px
        .p
          font-size:10px
          font-weight:200
          color:rgb(7,17,27)
          .info
            display: inline-block
            font-size: 24px
            font-weight: 200
            line-height: 24px
  .public
    padding: 18px 18px 0
    .title
      font-size: 14px
      color: rgb(7,17,27)
      line-height: 14px
    .bulletin
      padding: 8px 12px 16px
      font-size: 12px
      font-weight: 200
      color: rgb(240,20,20)
      line-height: 24px
    .icontext-wrap
      padding: 16px 12px
      border-top: 1px solid rgba(7,17,27,.1)
      color: rgba(7,17,27,.7)
  .seller-scene
    padding: 18px
    overflow: hidden
    .title
      font-size: 14px
      color: rgb(7,17,27)
      line-height: 14px
      margin-bottom: 12px
    .scene-wrap
      font-size: 0
      overflow-x: scroll
      white-space: nowrap
      width: 100%
      .scene
        display: inline-block
        margin-right: 6px
        font-size: 0px
        width: 120px
        height: 90px
        &:last-child
          margin-right: 0px
        .pic
          width: 100%
          height: 100%
  .seller-info
    padding: 18px
    .title 
      font-size: 14px
      color: rgb(7,17,27)
      line-height: 14px
      margin-bottom: 12px
    .info-wrap
      .info-item
        border-top: 1px solid rgba(7,17,27,.1)
        padding: 16px 12px
        line-height: 16px
        font-size: 12px
        font-weight: 200
        color: rgba(7,17,27,.6)
</style>




























