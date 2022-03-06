<template>
    <div class="header">
<!--      <div >后台管理系统</div>-->
        <div class="logo">后台管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <!-- <img class="user-logo" src="../../../static/img/img.jpg"> -->
                    欢迎,{{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { logout} from "@/api/account";
import qs from "qs";

    export default {
        data() {
            return {
                name: '未知用户(测试)'
            }
        },
        computed:{
            username(){
              //从state中获取name
              let username = this.$store.getters['account/getName']
              return username ? username : this.name;
            },
            // headerStataus() {
            //     return this.$store.getters.getHeaderStatus
            // }
        },
        methods:{
            async handleCommand(command) {
              console.log("command:", command)
              if (command == 'logout') {
                //调用后端登出接口,让后端清空当前用户的数据:要让这个请求先携带jwtToken,然后执行后再向下执行清空jwtToken的代码才行
                await logout();
                // localStorage.removeItem("jwtToken") //下面的代码会移除
                this.$store.commit('account/RESET_STATE')
                sessionStorage.removeItem("menus") //移除sessionStorage中的menus

                this.$router.push('/login');
              }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
