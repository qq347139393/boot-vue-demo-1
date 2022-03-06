<template>
  <div id="index">
    <img style="" src="../assets/index.gif">
  </div>
</template>
<script type="text/javascript">
  export default {
    mounted() {
      this.open();
    },
    methods: {
       open() {
        const h = this.$createElement;

        this.$notify({
          title: '标题名称',
          message: h('i', { style: 'color: teal'}, '欢迎进入demo系统'),
          offset: 200
        });
      }
    }
  }
</script>

<style scoped>
#index{
  width: 100%;
  height: 100%;
  /*background: url("../assets/index.gif");*/
}

</style>
