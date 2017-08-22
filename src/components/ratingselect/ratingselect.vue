<template>
  <div class="ratingselect">
    <div class="rati-type">
      <span @click='select(2,$event)' class="all " :class="{'active': selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click='select(0,$event)' class="positive" :class="{'active': selectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click='select(1,$event)' class="negative" :class="{'active': selectType === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click='toggleContent()' class="switch" :class="{'on': onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2

export default {
  props:{
    ratings:{
      type: Array,
      default(){
        return []
      }
    },
    selectType:{
      type: Number,
      default: ALL
    },
    onlyContent:{
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default(){
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  methods:{
    select(type,event){
      this.selectType = type
      // console.log('j')
      // this.$emit('sel')
      this.$emit('ratingtype.select',type);
    },
    toggleContent(){
      this.onlyContent = !this.onlyContent;
      this.$emit('content.toggle',this.onlyContent);
    }
  },
  computed:{
    positives(){
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      })
    },
    negatives(){
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      })
    }
  }

}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .ratingselect
    .rati-type
      font-size: 0px
      margin:0 18px
      padding: 18px 0
      border-bottom: 1px solid rgba(7,17,27,.1)
      .all,.positive,.negative
        padding:8px 12px
        font-size: 12px
        line-height: 30px
        border-radius: 2px
        margin-right: 8px
        .count
          font-size: 8px
          margin-left: 2px
      .all
        background-color: rgba(0,160,220,.2)
        &.active
          background-color: rgb(0,160,220)
          color:#fff
      .positive
        background-color: rgba(0,160,220,.2)
        &.active
          background-color: rgb(0,160,220)
          color:#fff
      .negative
        background-color: rgba(77,85,93,.2)
        &.active
          background-color: rgb(77,85,93)
          color:#fff
    .switch
      font-size: 0
      padding: 12px 18px
      border-bottom: 1px solid rgba(7,17,27,.1)
      line-height:24px
      height:24px
      color:rgb(147,153,159)
      &.on
        .icon-check_circle
          color:rgb(50,202,71)
      .icon-check_circle
        font-size: 24px
        margin-right:4px
      .text
        font-size: 12px
        vertical-align: top
</style>
