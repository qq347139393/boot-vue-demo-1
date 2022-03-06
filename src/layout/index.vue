<template>
  <div class="wrapper">
    <fjHeader></fjHeader>
    <fjSidebar></fjSidebar>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import fjHeader from '@/layout/Header'
import fjSidebar from '@/layout/Sidebar'
// import {loadData} from '../api'

export default {
  components: {
    fjHeader, fjSidebar
  },
  mounted() {
    this.load();
  },
  methods:{
    load() {
      // loadData().then(function(response){
      //   console.log(response);
      // });
    }
  }
}
</script>

<style scoped>
.content{
  padding: 0px;
}
</style>
