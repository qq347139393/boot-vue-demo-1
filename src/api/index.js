//对于axios进行二次封装
import axios from "axios";
import nprogress from "nprogress";
//在当前模块中引入store
import store from '@/store';
//如果出现进度条没有显示：一定是你忘记了引入样式了
import "nprogress/nprogress.css";

import { getToken } from '@/utils/token'

//底下的代码也是创建axios实例
let requests = axios.create({
  //基础路径
  // baseURL: "/bootVueDemo",
  //请求不能超过15S
  timeout: 15000,
});

//请求拦截器----在项目中发请求（请求没有发出去）可以做一些事情
requests.interceptors.request.use((config) => {
  //现在的问题是config是什么?配置对象
  //可以让进度条开始动
  // if(store.state.detail.uuid_token){
  //   //请求头添加一个字段(userTempId):和后台老师商量好了
  //   config.headers.userTempId = store.state.detail.uuid_token;
  // }
  //需要携带token带给服务器
  console.log("@jwtToken",getToken())
  if(store.state.account.jwtToken){//如果共享数据中有jwtToken,则从本地缓存中取出jwtToken放到请求头中准备随请求一起带到后端
    console.log("@jwtToken",getToken())
    config.headers['jwtToken'] = getToken()
  }
  nprogress.start();//请求开始前创建进度条
  return config;
});

//响应拦截器----当服务器手动请求之后，做出响应（相应成功）会执行的
requests.interceptors.response.use(
  (res) => {
    // console.log("res:",res)
    //进度条结束
    nprogress.done();//响应返回后结束进度条
    //相应成功做的事情
    return res;
  },
  (err) => {
    alert("服务器响应数据失败");
  }
);
//最终需要对外暴露（不对外暴露外面模块没办法使用）
//这里的代码是暴露一个axios实例
export default requests;
