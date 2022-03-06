<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo mySidebar" theme="light" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.children">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.children" :key="i" :index="subItem.index">{{ subItem.title }}</el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: '/home',
                    //     title: '首页',
                    //     hidden: false
                    // },
                    // {
                    //     icon: 'el-icon-menu',
                    //     index: '2',
                    //     title: '用户管理',
                  //     hidden: false
                    //     children: [
                    //         {
                    //             index: '/users',
                    //             title: '用户列表'
                    //         }
                    //     ]
                    // }
                ]
            }
        },
        beforeMount() {
            let menus = sessionStorage.getItem('menus')
            const qs = require('qs');
            this.items = qs.parse(menus);
            console.log(this.items)
        },
        computed: {
            onRoutes(){
                console.log("@@@onRoutes:",this.$route.path);
                return this.$route.path;
            }
        }
    }
</script>

<style scoped>
.mySidebar{
  background-color: #eef1f6;
}
.sidebar{
    display: block;
    position: absolute;
    width: 200px;
    left: 0;
    top: 70px;
    bottom:0;
    background: #2E363F;
}
.sidebar > ul {
    height:100%;
}


</style>
