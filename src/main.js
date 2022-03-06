//引入Vue
import Vue from 'vue'
//引入App组件
import App from './App.vue'

//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'

//引入store
import store from './store'
//引入elementUI组件库和对应的css样式库
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en' //elementUI的国际化功能(英文)
import 'element-ui/lib/theme-chalk/index.css'

//关闭Vue的生产提示
Vue.config.productionTip = false
//应用插件
Vue.use(VueRouter)
//应用elementUi组件库
Vue.use(Element, { locale })

// console.log("666")

//创建vm
new Vue({
  el:'#app',
  render: h => h(App),
  store,//加载vuex *这里是演示触发了es6的变量赋值简写形式
  router:router,//加载路由器
  beforeCreate() {//创建Vue实例之前进行绑定
    Vue.prototype.$bus = this //安装全局事件总线
  },
})
