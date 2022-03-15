
//登录接口调用
// import axios from "axios";

import requests from '@/api/index'
//登录接口
export function login(data) {//在发送ajax请求前进行的特定配置
    // console.log(1111111)
    return requests({
        // url: '/vue-admin-template/test/list', // 假数据
        url: '/account/login',
        method: 'post',
        data // *这里注意:如果是分开的请求参数,要用params..因为这个值是配置项的属性名,对应的是req的分开的参数(这里触发了es6的同名省略规则)
    })
}
//检查token是否合法接口
export function checkToken(data) {//在发送ajax请求前进行的特定配置
    return requests({
        // url: '/vue-admin-template/test/list', // 假数据
        url: '/account/checkToken',
        method: 'post',
        data // *这里注意:如果是分开的请求参数,要用params..因为这个值是配置项的属性名,对应的是req的分开的参数(这里触发了es6的同名省略规则)
    })
}

//登出接口
export function logout() {//在发送ajax请求前进行的特定配置
    return requests({
        // url: '/vue-admin-template/test/list', // 假数据
        url: '/account/logout',
        method: 'get'
    })
}







