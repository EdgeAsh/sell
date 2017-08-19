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
    font-weight:inherit
    font-size:0
    .icon
      display:inline-block
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
      vertical-align:middle
      font-weight:inherit
      margin-left:4px
    &.icon-24
      .icon
        width:12px
        height:12px
      .text
        font-size:12px
    &.icon-32
      .icon
        width:16px
        height:16px
      .text
        font-size:12px
</style>
