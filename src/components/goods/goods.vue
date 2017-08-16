<template>
<div class="goods">
  <div class="menu-wrap" ref="menuScroll">
      <ul>
        <li class="menu-item" v-for='(item,index) in goods' :class='{"current": currentIndex === index}' @click='selectMenu(index,$event)'>
          <span class="text"><span class="icon" v-show='item.type>0' v-bind:class='classMap[item.type]'></span>{{item.name}}</span>
        </li>
      </ul>
  </div>
  <div class="foods-wrap" ref="foodsScroll">
      <ul>
        <li class="g-item g-item-hook" v-for='gitem in goods'>
          <h2 class="title">{{gitem.name}}</h2>
          <ul>
            <li v-for='fitem in gitem.foods' class="f-item">
              <div class="icon"><img :src="fitem.icon" alt="菜图"></div>
              <div class="content">
                <h3 class="title-f">{{fitem.name}}</h3>
                <p class="desc">{{fitem.description}}</p>
                <div class="sell-rati"><span class="sell">月售{{fitem.sellCount}}份</span><span class="rati">好评率{{fitem.rating}}%</span></div>
                <div class='price-con'><span class="price-n">￥{{fitem.price}}</span><span class="price-o" v-show='fitem.oldPrice'>￥{{fitem.oldPrice}}</span></div>
                <div class="cartcontrolwrap">
                  <cartcontrol 
                  :food='fitem'
                  @cart-add='_drop($event.target)'></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
  </div>
  <shopcart 
  ref='shopcart'
  :delivery-price="seller.deliveryPrice" 
  :min-price="seller.minPrice" 
  :select-foods='selectFoods'></shopcart>
</div>
</template>

<script>
  import shopcart from '../shopcart/shopcart.vue'
  import bScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  const ERR_OK = 0;

export default {
  props:{
    seller: {
     type: Object
    }
  },
  computed:{
    currentIndex: function() {
      for(let i=0; i<this.heightArr.length; i++) {
        // console.log(i)
        let h1 = this.heightArr[i],h2 = this.heightArr[i+1];
        if(!h2||(this.scrollY>=h1 && this.scrollY<h2)){
            return i;
        }
      }
      return 0;
    },
    selectFoods(){
      // 遍历goods,再遍历goods中的foods
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          // 如果food.count有值，则将这个food添加到foods中。
          if(food.count){
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
 data() {
   return {
     goods: [],
     heightArr: [],
     scrollY: 0
   };
 },
 created() {
  this.$http.get('/api/goods').then(function(response){
    response = response.body;
        if(response.errno === ERR_OK){
          this.goods = response.data;
          this.$nextTick(() => {
            // 在数据全部填充完成的时候调用
             this._initScroll();
             this._getFoodsHight();
           });
        }
      }, function(response){
        console.log('有错误');
      });
  this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  // 
  // this.$on('cart-add',function(target){
  //   // 掉用子组件shopcart的drop方法
  //   console.log(target)
  //   this.$refs.shopcart.drop(target);
  // });
  },
  methods: {
    selectMenu(index,event){
      // 用户点击的菜单
      if(!event._constructed){
        // 解决在浏览器下执行两次的情况
        return;
      }
      let goodsList = document.getElementsByClassName('g-item-hook');
      // 滚动到具体元素
      this.foodsScroll.scrollToElement(goodsList[index],200);
    },
    _initScroll(){
      // 调用better-scroll组件
      this.menuScroll = new bScroll(this.$refs.menuScroll,{
        click: true
      });
      this.foodsScroll = new bScroll(this.$refs.foodsScroll,{
        probeType:3,
        click: true
      });
      this.foodsScroll.on('scroll',(pos) => {
        //获取滚动的距离，区绝对值,根据滑动到的位置判断另一边条目作映射
        this.scrollY = Math.abs(Math.round(pos.y));
      });

    },
    _getFoodsHight() {
      // 计算食品列表的高度
      let goodsList;
      goodsList = document.getElementsByClassName('g-item-hook');
      let h = 0;
      this.heightArr.push(h);
      for(let i=0; i<goodsList.length; i++) {
        h += goodsList[i].clientHeight;
        this.heightArr.push(h);
      }
      // console.error(this.heightArr);
    },
    _drop(target){
      // 掉用子组件shopcart的drop方法
      this.$refs.shopcart.drop(target);
    }
  },
  components: {
    shopcart: shopcart,
    cartcontrol: cartcontrol
  }
  // ,
  // events:{
  //   // 接收来自cartcontrol的事件
  //   'cart.add'(target){
  //     this._drop(target);
  //   }
  // }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import '../../common/stylus/mixin.styl'

  .goods
    display: flex
    position: absolute
    width: 100%
    top: 174px
    bottom: 48px
    overflow: hidden
    .menu-wrap
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7
      .menu-item
        width: 100%
        box-sizing: border-box
        display: table
        height: 56px
        padding: 0 12px
        border-1px(rgba(7,17,27,.1))
        &.current
          background-color:#fff
          font-weight: 400
          margin-top: -1px
          &:after
            display:none
        .text
          display: table-cell
          font-size: 12px
          color: rgb(24,20,20)
          font-weight: 200
          line-height: 14px
          vertical-align: middle
          .icon
            display:inline-block
            width:12px
            height:12px
            margin-right:2px
            &.decrease
              bg-image('./decrease_3')
            &.discount
              bg-image('./discount_3')
            &.guarantee
              bg-image('./guarantee_3')
            &.invoice
              bg-image('./invoice_3')
            &.special
              bg-image('./special_3')
    .foods-wrap
      flex: 1
      .g-item
        .title
          line-height: 26px
          color: rgb(147,153,159)
          font-size:12px
          font-weight: 200
          text-indent: 14px
          border-left:1px solid #d9dde1
          background-color: #f3f5f7
        .f-item
          display: flex
          margin:0 18px
          padding:18px 0
          font-size:0
          border-1px(rgba(7,17,27,.1))
          &:last-child
            border-bottom:none
            &:after
              display:none
          .icon
            flex: 0 0 56px
            display:inline-block
            width: 56px
            height:56px
            img
              width:100%
              height:100%
              border-radius: 3px
          .content
            flex:1
            display:inline-block
            position:relative
            vertical-align:top
            margin:2px 0 0 10px
            .title-f
              font-size: 14px
              color:rgb(7,17,27)
              line-height:14px
            .desc
              margin: 8px 0
              font-size:10px
              color:rgb(147,153,159)
              line-height:10px
            .sell-rati 
              margin: 8px 0
              &>.sell,&>.rati
                display:inline-block
                font-size:10px
                color:rgb(147,153,159)
                line-height:10px
                margin-right:12px
            .price-con
              &>.price-n,&>.price-o
                font-weight:700
                line-height:24px
              &>.price-n
                font-size:14px
                color:rgb(240,20,20)
                margin-right:8px
              &>.price-o
                font-size: 10px
                text-decoration: line-through
                color:rgb(147,153,159)
            .cartcontrolwrap
              position: absolute
              right:0
              bottom:0
</style>










