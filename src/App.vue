<template>
  <div id='app'>
    <v-header v-bind:seller='seller'></v-header>
    <div class="tab">
      <div class="tab-item">
      <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
      <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
      <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller='seller'></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue'

const ERR_OK = 0;

export default {
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.$http.get('/api/seller').then(function(response){
        response = response.body;
        // console.log(response);
        if(response.errno === ERR_OK){
          this.seller = response.data;
          // console.log(this.seller);
        }
    }, function(response){
      console.log('有错误');
    });
  },
  name: 'app',
  components: {
    'v-header': header
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import './common/stylus/enter.styl'
  
  #app 
    .tab 
      display:flex
      width:100%
      line-height:40px
      // border-bottom:1px solid rgba(7,17,27,.1)
      border-1px(rgba(7,17,27,.1))
      .tab-item
          flex:1
          text-align:center
          &>a
            display:block
            font-size:14px
            color:rgb(77,85,93)
            &.active
              color:rgb(240,20,20)
</style>
