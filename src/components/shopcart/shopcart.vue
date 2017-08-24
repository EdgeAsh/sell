<template>
<div>
  <div class="shopcart">
    <div class="content">
      <div class="content-l" @click='toggle'>
        <div class="logo-wrap">
          <div class="logo" :class="{'highLight': totalCount>0}">
            <span class="icon-shopping_cart"></span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highLight': totalCount>0}">￥{{totalPrice}}元</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-r" @click='pay'>
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div v-for='ball in balls' > <!-- 这样布局避免用trasition-group,并且避免其它我不知道的错误 -->
      <transition
      @before-enter='beforeDrop' @enter='dropping' @after-enter='afterDrop'
      tag='div' name='drop'>
        <div class="ball" v-show='ball.show'>
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
    <transition name='fold'>
      <div class="shopcart-list" v-show='listShow'>
        <div class="shoptitle clearfix">
          <div class="title-l">购物车</div>
          <div class="title-r" @click='empty'>清空</div>
        </div>
        <div class="shopcontent" ref='shopcontentScroll'>
          <ul>
            <li class="food-item" v-for='food in selectFoods'>
              <div class="name">{{food.name}}</div>
              <div class="price">￥{{food.price*food.count}}</div>
              <div class="cartcontrol-wrap">
                <cartcontrol :food='food'></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
  <transition name='fade'>
    <div class="mask" v-show='listShow' @click='hideList'></div>
  </transition>
</div>
  
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol.vue'
import BScroll from 'better-scroll'

export default {
  props: {
    // 定义此属性，接受来自父组件的数据
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
    },
  },
  data() {
    return {
      balls: [
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        }
      ],
      // 已经下落的小球
      dropBalls:[],
      /*使用fold变量控制购物车list是否显示，于计算属性中listShow配合*/ 
      fold: true
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
    },
    listShow(){
      /*
      此计算属性的返回值会控制购物车list是否显示，
      返回true/false取决于fold属性
      （利用data中属性的特性，data中属性的任何改变都会触发页面重绘）
      */ 
      // console.log('调用listShow')
      if(!this.totalCount){
        this.fold = true
        return false;
      }
      let show = !this.fold;

      /*
        每次添加失误都会触发
        如果没哟this.shopcontentScroll，创建一个
        有，刷新，重新计算scroll区域高度
      */
      if(show){
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.shopcontentScroll,{
              probeType:3,
              click:true
            });
          }else{
            this.scroll.refresh();
          }
          console.log('tick')
        });
      }
      return show;
    }
  },
  methods: {
    drop(el){
      // 每点击cartcontrol一次添加就会遍历balls，拿到第一个show为false的ball来作动画。用dropBalls数组存储已经下落的小球
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
            // console.log(rect.left,rect.top)
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
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        // console.log('dropping');
        inner.style.webkitTransform ='translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        el.addEventListener('transitionend', done);
      });
    },
    afterDrop(el){
      let ball = this.dropBalls.shift();
      if(ball){
        // setTimeout(function () {
        //   ball.show = false;
        // },0);
        ball.show = false;
        el.style.display="none"
      }
    },
    toggle(){
      /*
      如果没哟选中实物，点击购物车直接return不做其他操作，否则使fold取反。fold值一改变，依赖于fold
      的listShow计算属性就会被触发
      */ 
      if(!this.totalCount){
        return;
      }

      let show = !this.fold;
      this.fold = show;
    },
    empty(){
      this.selectFoods.forEach((food) => {
        food.count = 0;
      })
    },
    hideList(){
      this.fold = true
    },
    pay(){
      if(this.totalPrice<this.minPrice){
        return ;
      }
      window.alert(`支付￥${this.totalPrice}元`);
    }
  },
  components: {
    cartcontrol
  },
  created(){
    // this.$nextTick(() => {
    //   this.shopcontentScroll = new BScroll(this.$refs.shopcontentScroll,{
    //     probeType:3,
    //     click:true
    //   });
    //   console.log('tick')
    // });
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
      transition: all .25s cubic-bezier(0.49,-0.29,0.75,0.41)
      .inner
        width:16px
        height:16px
        border-radius:50%
        background-color:rgb(0,160,220)
        transition: all .25s linear
    .shopcart-list
      background-color:#fff
      position:absolute
      z-index:-1
      top:48px
      left:0
      width:100%
      font-size:0px
      padding-bottom:48px
      margin-bottom:-48px
      transition:all .3s linear
      transform: translate3d(0, -100%, 0)
      &.fold-enter,&.fold-leave-to
        transform: translate3d(0, 0, 0)
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
        overflow:hidden
        max-height:265px
        padding: 0 18px
        background-color:#fff
        .food-item
          position:relative
          box-sizing:border-box
          line-height:48px
          height:48px
          border-bottom:1px solid rgba(7,17,27,.1)
          .name,.price,.cartcontrol-wrap
            line-height:24px
            height:24px
          .name
            line-height:48px
            font-size:14px
            color:rgb(7,17,27)
          .price
            position:absolute
            right:84px
            color:rgb(240,20,20)
            font-weight:700
            font-size:12px
            margin-top:-12px
          .cartcontrol-wrap
            position:absolute
            right:0
            margin-top:-18px
            // width:20%
            // background-color:#f60       
  .mask
    position:fixed
    left:0
    top:0
    bottom:0
    right:0
    background-color: rgba(7,17,27,.8)
    backgdrop-filter:blur(10px)
    transition: all .3s linear
    &.fade-enter,&.fade-leave-to
      opacity:0
      background-color:rgba(7,17,27,0)
</style>
