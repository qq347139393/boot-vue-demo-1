<template>
  <div id="app">
    <!--  顶极路由(是在路由器之上的路由)  -->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
body{
  font-family: "微软雅黑";  /*  设置字体 */
  margin: 0px auto; /* 去除上下的边距*/

}
</style>
