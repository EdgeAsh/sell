<template>
  <div class="cartcontrol">
    <transition name='rotate'>
      <div class="cart-decrease icon-remove_circle_outline" v-show='food.count>0' @click='deCount'>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click='inCount'>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props:{
    food: {
      type: Object
    }
  },
  created(){
    console.log(this.food);
  },
  methods: {
    inCount(event) {
      if(!event._constructed){
        return
      }
      if(!this.food.count){
        // 使用vue的set接口定义变量，变量的变化可以被侦查到
        Vue.set(this.food,'count',1);
      }else{
        this.food.count++;
      }
      // 派发事件
      this.$emit('cart-add',event);
    },
    deCount(event){
      if(!event._constructed){
        return
      }
      if(this.food.count){
        this.food.count--;
      }
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .cartcontrol
    font-size:0px
    .cart-increase,.cart-decrease
      display:inline-block
      vertical-align:middle
      font-size:24px
      color:rgb(0,160,220)
      line-height:24px
      padding:6px;
    .cart-decrease
      transition: all .3s linear
      &.rotate-enter,&.rotate-leave-to
        transform: translate3d(24px,0,0) rotate(180deg)
        opacity:0
    .cart-count
      display:inline-block
      vertical-align: middle
      width:12px
      text-align:center
      font-size:10px
      color:rgb(147,153,159)
      line-height:24px
      
</style>
