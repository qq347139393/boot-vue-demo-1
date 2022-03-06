//该文件用于创建Vuex中最为核心的store:共享数据都放在此处,相当于spring中的springContext
import Vue from 'vue'
//引入Vuex *注意:这个vuex只能在store的主文件中引入,
// 因为需要在项目的主js文件加载过程中先在这个文件中获取vuex然后供下面的代码使用;而放入主js文件的话会由于这个文件的下面代码先执行,
// 而导致下面的代码无法拿到vuex而报错
import Vuex from 'vuex'
//将不同的模块进行模块化分类,而不是都写在这个主文件中
import Account from '@/store/modules/account'
//应用Vuex插件
Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({
	//暴露两个模块
	modules:{
		account:Account
	}
})
