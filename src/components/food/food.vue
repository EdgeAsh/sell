<template>
  <transition name='move'>
    <div v-show="showFlag" class="food">
      <div class="foodContent">
        <div class="img-head">
          <img :src="food.image" alt="">
          <span class="back icon-arrow_lift" @click="hide()"></span>
        </div>
        <div class="content">
          <h3 class="name">{{food.name}}</h3>
          <div class="sell-rati">
            <span class="sell">月售{{food.sellCount}}份</span><span class="rati">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="price-n">￥{{food.price}}</span><span class="price-o" v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrwrap">
            <cartcontrol
              :food='food'
            ></cartcontrol>
          </div>
          <div 
            class="addToCart" 
            v-show='!food.count || food.count===0'
            @click='addTo'
          >加入购物车</div>
        </div>
        <div class="split" v-if='food.info'></div>
        <div class="info" v-if='food.info'>
          <h3 class="title">商品介绍</h3>
          <p class="body">{{food.info}}</p>
        </div>
        <div class="split"></div>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect
          @contentToggle='contentToggle1' @ratingtypeSelect='ratingtypeSelect1'
            :select-type='selectType' :only-content='onlyContent' :desc='desc' :ratings='food.ratings'
          ></ratingselect>
          <div class="rating-wrap">
            <ul v-if="food.ratings && food.ratings.length">
              <li v-show="needShow(rati.rateType,rati.text)" v-for='rati in food.ratings' class="rating-item clearfix">
                <div class="user">
                  <span class="name">{{rati.username}}</span>
                  <img :src="rati.avatar" alt="头像" class="avatar">
                </div>
                <div class="time">{{rati.rateTime | setDate}}</div>
                <p class="txt">
                  <span :class="{'icon-thumb_down': rati.rateType === 1,'icon-thumb_up':rati.rateType === 0}"></span>{{rati.text}}
                </p>
              </li>
            </ul>
            <div v-else class='otherwise'>暂无评论</div>
          </div>  
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import vue from 'vue'
import cartcontrol from 'components/cartcontrol/cartcontrol.vue'
import ratingselect from 'components/ratingselect/ratingselect.vue'
import {formatDate} from 'common/js/date.js'

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2

export default {
  props:{
    food:{
      type:Object
    }
  },
  data(){
    return {
      showFlag:false,
      selectType: ALL,
      onlyContent: false,
      desc:{
        all:'全部',
        positive:'推荐',
        negative:'吐槽'
      }
    }
  },
  methods:{
    show(){
      this.showFlag = true;
    },
    hide(){
      this.showFlag = false;
    },
    addTo(event){
      // if(!event._constructed){
      //   return
      // }
      vue.set(this.food,'count',1);
      // console.log(event);
    },
    needShow(type,text){
      if(this.onlyContent && !text){
        return false;
      }

      if(this.selectType === ALL){
        return true;
      }else{
        return type === this.selectType;
      }
    },
    ratingtypeSelect1(type){
      this.selectType = type[0]
    },
    contentToggle1(onlyContent){
      this.onlyContent = onlyContent[0]
    }
  },
  components:{
    cartcontrol,
    ratingselect
  },
  computed:{
    
  },
  filters: {
    // js模块化编程体现
    setDate(time){
      let date = new Date(time);
      return formatDate(date,'yyyy/MM/dd hh:mm');
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .food
    position:fixed
    overflow-y: scroll
    left:0
    right:0
    top:0
    bottom:48px
    background-color:#fff
    z-index:5
    // transform: translate3d(0,0,0)
    transition: transform .3s linear
    // &.move-enter-to,&.move-leave
    //   transform: translate3d(100%,0,0)
    &.move-enter,&.move-leave-to
      transform: translate3d(100%,0,0)
    // &.move-leave-to
      // transition: all .3s linear
      // transform: translate3d(100%,0,0)
    .foodContent
      position: relative
      .img-head
        position:relative
        width:100%
        padding-top:100% //相对于width
        img
          position:absolute
          top:0
          width:100%
          height:100%
        .back
          position:absolute
          top:0
          font-size:18px
          left:0
          color:#fff
          padding:10px
      .content
        position: relative
        padding:18px
        .name
          font-size: 14px
          font-weight:700
          color:rgb(7,17,27)
          line-height:14px
        .sell-rati
          font-size:0
          margin:8px 0 18px
          .sell,.rati
            font-size:10px
            margin-right:12px
            color:rgb(147,153,159)
        .price
          line-height:24px
          .price-n
            font-size:14px
            font-weight:700
            color:rgb(240,20,20)
          .price-o
            margin-left:6px
            text-decoration:line-through
            font-size:10px
            color:rgb(147,153,159)
        .cartcontrwrap
          position: absolute
          z-index: 1
          right: 12px
          bottom: 6px
        .addToCart
          position: absolute
          z-index: 2
          right: 12px
          bottom: 12px
          padding: 6px 12px
          line-height: 12px
          font-size: 10px
          color: #fff
          border-radius: 12px
          background-color: rgb(0,160,220)
      .info
        padding: 18px
        .title
          font-size: 14px
        .body
          padding: 6px 8px
          font-size: 12px
          color:rgb(77,85,93)
          font-weight:200
          line-height:24px
      .rating
        // padding:18px 18px 0
        // border-bottom: 1px solid rgba(7,17,27,.1)
        .title
          margin-top: 18px
          margin-left: 18px
          line-height: 14px
          font-size: 14px
          color:rgb(7,17,27)
        .rating-wrap
          .rating-item
            margin:0 16px
            padding: 16px 0
            border-bottom: 1px solid rgba(7,17,27,.1)
            .user
              float:right
              font-size:0px
              color:rgb(147,153,159)
              .name
                font-size:10px
                line-height:12px
                margin-right: 6px
                vertical-align: top
              .avatar
                width:12px
                height:12px
                border-radius:50%
            .time
              font-size:10px
              color:rgb(147,153,159)
              line-height:12px
            .txt
              font-size:12px
              color:rgb(7,17,27)
              line-height:16px
              margin-top: 6px
              .icon-thumb_down,.icon-thumb_up
                font-size:12px
                line-height:24px
                margin-right:4px
                vertical-align:middle
              .icon-thumb_down
                color:rgb(147,153,159)
              .icon-thumb_up
                color:rgb(0,160,220)
          .otherwise
            margin:0 16px
            padding: 16px 0
            font-size: 12px
            color:rgb(147,153,159)
            line-height:24px
</style>
