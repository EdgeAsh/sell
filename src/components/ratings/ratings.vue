<template>
<span>
  <div id="demo" @click='dd'>我是ratings,点我,methods</div>
  <div id="demo" v-show='cc'>我是ratings,点我,computed</div>
  <div class="hh" v-if='cc'>你看见我了么if</div>
  <div v-else>我是else</div>
  <!-- <icontext msg='这是爸爸给你的信息这是爸爸给你的信息这是爸爸给你的信息这是爸爸给你的信息这是爸爸给你的信息' :index="4" :size='32'></icontext> -->

  <div v-if='ok'>{{bd}}</div>
  

  <div v-for='item in arr'>
    <li>{{item.msg1}}</li>
    <li>{{item.msg2}}</li>
  </div>

  <div v-for='item in arr2'>
    <li>{{item.msg1}}</li>
    <li>{{item.msg2}}</li>
  </div>
  

</span>
</template>

<script>
import Vue from 'vue';
// import icontext from 'components/icon&text/icontext.vue'
// new Vue({
//   el:'#demo',
//   data:{
//     show:true
//   }
// });
export default{
  props:{
    abs:'hahah',
    bd:{
      type:String,
      default:'1234',
      a:'dasha'
    },
    arr:{
      type:Array,
      default:function(){
        return [
          {msg1:'hehe1',msg2:'hehe2'},
          {msg1:'huhu1',msg2:'huhu2'}
        ];
      }
    }
  },
  data(){
    return{
      show:true,
      a:'woshi',
      ok:true,
      hide:false,
      arr2:[
        {msg1:'arr21',msg2:'arr22'},
        {msg1:'arr1',msg2:'huhu2'}
      ]
    }
  },
  components:{
  },
  methods: {
    dd(){
      
    }
  },
  computed:{
    cc(){
      if(this.show){
        return true;
      }
      return false
    }
  },
  
}

</script>

<style lang='stylus'>
.ss
  &.fade-enter-active,&.fade-leave-active
    transition: all 0.5s
  &.fade-enter, &.fade-leave-active
    opacity: 0 
</style>