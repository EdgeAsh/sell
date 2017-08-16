<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-l">
        <div class="logo-wrap">
          <div class="logo" :class="{'highLight': totalCount>0}">
            <span class="icon-shopping_cart"></span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highLight': totalCount>0}">￥{{totalPrice}}元</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-r">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <transition-group 
    @before-enter='beforeDrop' @enter='dropping' @after-enter='afterDrop'
    tag='div' name='drop'>
      <div class="ball out-drop" v-for='ball in balls' :key='ball.id' v-show='ball.show'>
        <div class="inner in-drop inner-hook"></div>
      </div>
    </transition-group>
    <div class="shopcart-list">
      <div class="shoptitle clearfix">
        <div class="title-l">购物车</div>
        <div class="title-r">清空</div>
      </div>
      <div class="shopcontent">
      <ul>
        <li class="food-item" v-for='food in selectFoods'>
          <div class="name">{{food.name}}</div>
          <div class="price">￥{{food.price}}</div>
          <div class="cartcontrol-wrap">
            <cartcontrol></cartcontrol>
          </div>
        </li>
      </ul>
      </div>
    </div>
  </div>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol.vue'
export default {
  props: {
    selectFoods:{
      type: Array,
      default:function(){
        return [];
      }
    },
    deliveryPrice:{
      type:Number,
      default:0
    },
    minPrice:{
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        {
          show:false,
          id:1
        },
        {
          show:false,
          id:2
        },
        {
          show:false,
          id:3
        },
        {
          show:false,
          id:4
        },
        {
          show:false,
          id:5
        }
      ],
      // 已经下落的小球
      dropBalls:[]
    }
  },
  computed: {
    totalPrice(){
      // 计算总价
      let total=0;
      this.selectFoods.forEach((food) => {
        total += food.count * food.price;
      });
      return total;
    },
    totalCount(){
      let count=0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc(){
      if(this.totalPrice === 0){
        return `￥${this.minPrice}元起送`;
      }else if(this.minPrice>this.totalPrice){
        let dd = this.minPrice - this.totalPrice;
        return `还差￥${dd}元送`;
      }else{
        return '去结算'
      }
    },
    payClass(){
      if(this.minPrice<=this.totalPrice){
        return 'can'
      }else{
        return 'cannot'
      }
    }
  },
  methods: {
    drop(el){
      // 遍历balls，拿到第一个show为false的ball来作动画。用dropBalls数组存储已经下落的小球
      for(let i=0;i<this.balls.length;i++){
        let ball = this.balls[i];
        if(!ball.show){
          ball.show=true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop(el){
        // 遍历show为true的小球，做动画
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if(ball.show){
            // 获取被点击的cartcontrol元素在视口的位置
            let rect = ball.el.getBoundingClientRect();
            // console.log(rect)
            let x = rect.left-32;
            let y = -(window.innerHeight- rect.top -22);
            el.style.display='';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform =`translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
    },
    dropping(el, done){
      /*eslint-disable no-unused-vars*/
      let rf = el.offsetHeight; //触发浏览器重回
      this.$nextTick(() => {
        el.style.display='';
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        // console.log('dropping');
        inner.style.webkitTransform ='translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
      })
      
      // console.log(el,'doing')
      done();
    },
    afterDrop(el){
      let ball = this.dropBalls.shift();
      if(ball){
        setTimeout(function () {
          ball.show = false;
        },200);
        // ball.show = false;
        // el.style.display = 'none';
      }
    }
  },
  components: {
    cartcontrol
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixin.styl'
  .shopcart
    position: fixed
    left:0
    bottom:0
    z-index:10
    width:100%
    height:48px
    .content
      width:100%
      height:100%
      display:flex
      background-color:#141d27
      .content-l
        flex:1
        font-size:0px
        .logo-wrap
          position:relative
          display: inline-block
          width:56px
          height:56px
          padding:6px;
          background-color:#141d27
          margin:-10px 12px 0
          border-radius: 50%
          box-sizing: border-box
          .logo
            background-color:#2b343c
            width:100%
            height:100%
            border-radius: 50%
            text-align: center
            &.highLight
              background-color:rgb(0,160,220)
              .icon-shopping_cart
                color:#fff
            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
              color:#80858a
          .num
            position: absolute
            top:0
            right:0
            width:24px
            height:16px
            line-height:16px
            border-radius:16px;
            font-size:9px
            font-weight: 700
            color:#fff
            text-align:center
            background-color:rgb(240,20,20)
            box-shadow:0 4px 8px 0 rgba(0,0,0,.4)
        .price
          display: inline-block
          margin-top:12px
          line-height:24px
          padding-right:12px
          box-sizing:border-box
          font-size:16px
          font-weight:700
          color:rgba(255,255,255,.4)
          border-right: 1px solid rgba(255,255,255,.1)
          &.highLight
            color:#fff
        .desc
          display: inline-block
          margin-top:12px
          line-height:24px
          padding-left:12px
          font-size:14px
          font-weight:200
          color:rgba(255,255,255,.2)
      .content-r
        flex: 0 0 105px
        width: 105px
        .pay
          line-height:48px
          text-align:center
          font-weight:700
          font-size: 12px
          color:rgba(255,255,255,.2)
          background-color:#2b333b
          &.cannot
            background-color:#2b333b
          &.can
            background-color:rgb(50,202,71)
            color:#fff
    .ball
      position:fixed
      left:32px
      bottom:22px
      z-index:200
      transition: all .3s cubic-bezier(0.49,-0.29,0.75,0.41)
      .inner
        width:16px
        height:16px
        border-radius:50%
        background-color:rgb(0,160,220)
        transition: all .3s linear
    .shopcart-list
      background-color:#fff
      position:absolute
      z-index:-1
      left:0
      bottom:48px
      height:305px
      width:100%
      font-size:0px
      padding-bottom:48px
      margin-bottom:-48px
      .shoptitle
        height:40px
        background-color:#f3f5f7
        font-weight:200
        padding: 0 18px
        border-1px(rgba(7,17,27,.1)) 
        .title-l
          float:left
          line-height:40px
          color:rgb(7,17,27)
          font-size:14px
        .title-r
          float:right
          font-size:12px
          line-height:40px
          color:rgb(0,160,220)
      .shopcontent
        height:265px
        padding: 0 18px
        background-color:#fff
        overflow:scroll
        .food-item
          position:relative
          box-sizing:border-box
          line-height:48px
          border-bottom:1px solid rgba(7,17,27,.1)
          .name,.price,.cartcontrol-wrap
            display:inline-block
            line-height:24px
            height:24px
          .name
            font-size:14px
            color:rgb(7,17,27)
          .price
            color:rgb(240,20,20)
            font-weight:700
            font-size:10px
            margin: 0 12px 0 18px 
          .cartcontrol-wrap
            position:absolute
            right:0
            bottom:12px
            width:20%
            background-color:#f60       
</style>
