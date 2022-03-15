//引入axios请求工具
// import axios from 'axios'
//引入操作浏览器本地缓存的方法
import { setToken, getToken,removeToken} from "@/utils/token";

import { login} from "@/api/account";
import qs from "qs";


export default {
  namespaced:true,
  actions:{//相当于service
    async login(context,loginForm){
      // {后端的响应数据的格式
      //   "code": "string",
      //     "data": {},
      //   "msg": "string"
      // }
      //用户登录
      let result;
      // debugger;
      console.log("loginForm",loginForm)
      await login(loginForm).then(res=>{
        let data=res.data;
        console.log('请求成功了')
        console.log(data)
        if(data.code==='000000'){//请求成功
          // console.log("@@@jwtToken:",data.data.jwtToken)
          context.commit("SET_TOKEN", data.data.jwtToken);
          context.commit("SET_USERINFO",loginForm.name)
          //将对应导航栏的meuns保存(这个其实相当于死权限中的权限,只不过目前这个demo项目里没有涉及到权限,所以所有用户返回的menus列表都一样)
          console.log("@@@menus:",data.data.menus)
          const qs = require('qs');
          sessionStorage.setItem('menus',qs.stringify(data.data.menus));
          result=true
        }else{
          alert(data.msg)
          result=false
        }
      },res => {
        //请求后更新List的数据
        alert(res.data.message)
        result=false
      });
      return result;
    }
  },
  mutations:{//相当于dao
    SET_TOKEN: (state, jwtToken) => {
      setToken(jwtToken) //将jwtToken存入本地缓存
      state.jwtToken = jwtToken //将jwtToken存入共享对象中
      // console.log("state.jwtToken=",state.jwtToken)
    },
    SET_USERINFO: (state, name) => {
      state.name = name
    },
    RESET_STATE: (state) => {
      removeToken() //将jwtToken移除本地缓存
      state.jwtToken='' //将jwtToken移除共享对象
      state.name=''
    },
  },
  state:{//相当于redis缓存
    jwtToken:'',
    name:''
  },
  getters:{
    getJwtToken(){
      getToken(); //从本地缓存中获取jwtToken
    },
    getName(state){//获取共享数据中的用户名
      return state.name
    }
    // bigSum(state){
    //   return state.sum*10
    // }
  },
}

