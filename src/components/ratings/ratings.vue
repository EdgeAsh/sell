<template>
<div>
  <!-- <div id="demo">我是ratings</div> -->
  <!-- <icontext msg='这是爸爸给你的信息这是爸爸给你的信息这是爸爸给你的信息这是爸爸给你的信息这是爸爸给你的信息' :index="4" :size='32'></icontext> -->




  <!-- 动画 -->
  <!-- <div class='ss'>
    <button v-on:click='show = !show'>点我</button>
    <transition name="fade">
      <p v-if="true">hello</p>
    </transition>
  </div> -->

</div>
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
  // data:{
  //   show:true
  // },
  components:{
    // icontext: icontext
  }
}
</script>

<style lang='stylus'>
.ss
  &.fade-enter-active,&.fade-leave-active
    transition: all 0.5s
  &.fade-enter, &.fade-leave-active
    opacity: 0 
</style>