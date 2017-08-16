<template>
  <div class='icontext' v-bind:class='iconType'>
    <span class="icon" v-bind:class="classMap[index]"></span>
    <span class="text">{{msg}}</span>
  </div>
</template>
  
<script>
export default {
  props: {
    msg: {
      type: String
    },
    size: {
      type: Number
    },
    index: {
      type: Number
    }
  },
  computed:{
    iconType(){
      return 'icon-'+this.size;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import '../../common/stylus/mixin.styl'
  
  .icontext
    font-size:0
    &.icon-24
      .icon
        display:inline-block
        width:12px
        height:12px
        vertical-align:middle
        &.decrease
          bg-image('./decrease_1')
        &.discount
          bg-image('./discount_1')
        &.guarantee
          bg-image('./guarantee_1')
        &.invoice
          bg-image('./invoice_1')
        &.special
          bg-image('./special_1')  
      .text
        display:inline-block
        font-size:10px
        vertical-align:middle
    &.icon-32
      .icon
        display:inline-block
        width:16px
        height:16px
        vertical-align:middle
        &.decrease
          bg-image('./decrease_1')
        &.discount
          bg-image('./discount_1')
        &.guarantee
          bg-image('./guarantee_1')
        &.invoice
          bg-image('./invoice_1')
        &.special
          bg-image('./special_1')
      .text
        display:inline-block
        font-size:12px
        vertical-align:middle
</style>
