<template>
<div class="ratings">
  <div class="ratings-content">
    <div class="overview">
      <div class="overview-l">
        <h3 class="score">{{seller.score}}</h3>
        <p class="synthesize">综合评分</p>
        <p class="desc">高于周边商家{{seller.rankRate}}%</p>
      </div>
      <div class="overview-r">
        <div class="over-item"><span class="type">服务态度</span><star :size='36' :score='seller.serviceScore'></star><span class="score">{{seller.serviceScore}}</span></div>
        <div class="over-item"><span class="type">食物评分</span><star :size='36' :score='seller.foodScore'></star><span class="score">{{seller.foodScore}}</span></div>
        <div class="over-item"><span class="type">送达时间:</span><span class="ne-time">{{seller.deliveryTime}}分钟</span></div>
      </div>
    </div>
    <div class="split"></div>
    <ratingselect
          @contentToggle='contentToggle1' @ratingtypeSelect='ratingtypeSelect1'
            :select-type='selectType' :only-content='onlyContent' :ratings='ratings'
    ></ratingselect>
    <div class="rating-wrap">
      <ul>
        <li v-for='rati in ratings' class="rati-item">
          <div class="avatar-wrap">
            <img :src="rati.avatar" alt="" class='avatar'> 
          </div>
          <div class="content clearfix">
            <span class="time">{{rati.rateTime | setTime}}</span>
            <h3 class="name">{{rati.username}}</h3>
            <div class="star-wrap">
              <star :size='24' :score='rati.score'></star><span class="ne-time" v-if='rati.deliveryTime'>{{rati.deliveryTime}}分钟送达</span>
            </div>
            <p class="desc">{{rati.text}}</p>
            <div class="recommend-wrap" v-if='rati.recommend && rati.recommend.length'>
              <span :class="{'icon-thumb_up': rati.rateType === 0,'icon-thumb_down': rati.rateType === 1}"></span>
              <span v-for='recoitem in rati.recommend' class="re-item">{{recoitem}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import star from 'components/star/star.vue'
import ratingselect from 'components/ratingselect/ratingselect.vue'
import {formatDate} from 'common/js/date.js'

const ERR_OK = 0
const ALL = 2

export default{
  props:{
    seller:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      selectType: ALL,
      onlyContent: true,
      ratings:[]
    }
  },
  components:{
    star,
    ratingselect
  },
  created(){
    this.$http.get('/api/ratings').then((response) => {
      response = response.body;
        if(response.errno === ERR_OK){
          this.ratings = response.data;
        }
    }, (response) => {} );
  },
  methods:{
    contentToggle1(){

    },
    ratingtypeSelect1(){

    }
  },
  filters:{
    setTime(time){
      time = new Date(time);
      time = formatDate(time,"yyyy-MM-dd hh:mm");
      return time
    }
  }
}

</script>

<style lang='stylus'>
  .ratings
    position: absolute
    left:0
    top: 174px
    bottom:0
    right: 0
    .overview
      display: flex
      padding: 18px 0
      .overview-l
        flex: 0 0 137px
        border-right: 1px solid rgba(7,17,27,.1)
        text-align:center
        @media only screen and (max-width: 320px)
          flex: 0 0 116px
        .score
          font-size: 24px
          color: rgb(255,153,0)
          line-height: 28px
          margin-bottom: 6px
        .synthesize
          font-size:12px
          color:rgb(7,17,27)
          line-height:12px
        .desc
          font-size:10px
          color:rgba(7,17,27,.5)
          line-height:10px
          margin:8px 0 6px
      .overview-r
        flex: 1
        margin-left: 24px
        @media only screen and (max-width: 320px)
          margin-left: 10px
        .over-item
          margin-bottom: 8px
          font-size: 12px
          &:last-child
            margin-bottom: 0
          .type
            color:rgb(7,17,27)
            line-height: 18px
            vertical-align: top
          .star
            display: inline-block
            margin: 0 12px
            vertical-align:bottom
            @media only screen and (max-width: 320px)
              margin: 0 6px
          .score
            color:rgb(255,153,0)
            line-height: 18px
            vertical-align: top
          .ne-time
            line-height: 18px
            margin-left: 12px
            @media only screen and (max-width: 320px)
              margin-left: 6px
            color:rgb(147,153,159)
    .rating-wrap
      .rati-item
        display:flex
        margin: 0 18px
        padding: 18px 0
        border-bottom: 1px solid rgba(7,17,27,.1)
        &:last-child
          border-bottom: none
        .avatar-wrap
          flex: 0 0 40px
          .avatar
            display:block
            width:28px
            height: 28px
            border-radius: 50%
        .content
          flex: 1
          .time
            float: right
            font-size: 10px 
            font-weight: 200
            color:rgb(147,153,159)
            line-height: 12px
            height:12px
          .name
            font-size:10px 
            color:rgb(7,17,27)
            line-height:12px
          .star-wrap
            margin: 4px 0 6px 0
            font-size: 0
            .star
              display:inline-block
              margin-right: 6px
              line-height: 12px
              vertical-align: bottom
            .ne-time
              font-size:10px
              font-weight: 200
              color: rgb(147,153,159)
              line-height:12px
              vertical-align: top
          .desc
            font-size: 12px 
            color:rgb(7,17,27)
            line-height: 18px
          .recommend-wrap
            font-size:0px
            margin-top: 8px
            overflow: hidden
            width: 100%
            height: 18px
            [class^='icon']
              font-size: 12px
              line-height: 16px
              &[class$='up']
                color: rgb(0,160,220)
              &[class$='down']
                color: rgb(183,187,191)
            .re-item
              display:inline-block
              height: 16px
              padding: 0 6px
              font-size: 9px
              color: rgb(147,153,159)
              line-height: 16px
              border: 1px solid rgba(7,17,27,.1)
              border-radius: 2px
              margin-left: 8px
              vertical-align: top
</style>




















