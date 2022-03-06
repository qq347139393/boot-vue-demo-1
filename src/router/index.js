// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入vuex
import store from '@/store';

//引入组件
import Login from '@/views/account/login' //登录页
import Index from '@/layout/index'//主页架子

import Home from '../layout/Home'
import {checkToken} from "@/api/account";

//创建并暴露一个路由器
//这里面的一级路由,其实是整个app的二级路由..但是作为导航栏的一级路由
const router =  new VueRouter({
	mode: 'history',
	routes:[
		{//登录页
			path: '/login',
			name: 'login',
			component: Login,
			meta:{isAuthen:false,title:'登录页'}
		},
		// {//默认地址,则跳转到首页
		// 	path:'/',
		// 	redirect:'/index'
		// },
		{
			name:'index',
			path:'/',
			component:Index,
			meta:{isAuthen:true,title:'首页'},
			children:[
				{
					name:'home',
					path:'home',
					component: resolve => require(['@/layout/Home'], resolve),
					meta:{isAuthen:true,title:'首页展示'}
				},
				{
					name:'users',
					path:'users',
					component: resolve => require(['@/views/user/index'], resolve),
					meta:{isAuthen:true,title:'用户列表'}
				},
			]
		},
		{
			path: '/404',
			component: () => import('@/views/404'),
			hidden: true
		},
		// 404 page must be placed at the end !!!
		{ path: '*', redirect: '/404', hidden: true
			// children: [
			//   {
			//     path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
			//     meta: { title: 'f ', icon: 'link' }
			//   }
			// ]
		},
	]
})

//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to,from,next)=>{
	console.log('前置路由守卫',to,from)
	if(to.meta.isAuthen){ //判断是否需要鉴权
		console.log("需要鉴证")
		//每个需要鉴证的操作,都得通过后端的接口判断:因为前端的任何安全性校验都可以被用户轻易篡改
		// (但我们知道的一些情况:有些小网站只是象征性地检查浏览器的localstorey是否存在而已,而没有真正地验证里面的token是否合法和是否过期)
		//1.首先,获取前端缓存的jwtToken:如果前端的jwtToken没有了,那么根本不需要去调用后端接口来验证当前jwtToken是否合法
		const jwtToken=localStorage.getItem('jwtToken')
		if(jwtToken===''||jwtToken===null||jwtToken===undefined){//jwtToken为空
			alert('未登录,请重新登录')
			next({//强制跳转回登录页
				path: '/login'
			})
			return;
		}
		//2.将jwtToken发送到后端进行合法性校验(后端需要提供校验jwtToken的接口供调用)
		//从共享数据中获取用户名
		const name=store.getters['account/getName'];
		console.log("name:",name)
		const userInfo = {name:name,jwtToken:jwtToken}
		//用户登录
		checkToken(userInfo).then(data=>{
			console.log(data)
			if(data.code==='000000'){//检验正确
				console.log("已鉴证")
				next()
			}else{
				alert("未登录,请重新登录")
				next({//强制跳转回登录页
					path: '/login'
				})
			}
		},error => {
			alert(error.message)
			next({//强制跳转回登录页
				path: '/login'
			})
		});
		// next() //先放行,为了调试方便
	}else{
		console.log("无需鉴证")
		next()
	}
})

//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to,from)=>{
	console.log('后置路由守卫',to,from)
	document.title = to.meta.title || 'demo项目'
})

export default router
