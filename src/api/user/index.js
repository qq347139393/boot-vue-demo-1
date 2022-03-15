
//登录接口调用
// import axios from "axios";

import requests from '@/api/index'
//分页查询用户记录接口
export function selectsByPage(data) {//在发送ajax请求前进行的特定配置
    // console.log(1111111)
    return requests({
        // url: '/vue-admin-template/test/list', // 假数据
        url: '/user/byPage',
        method: 'post',
        data // *这里注意:如果是分开的请求参数,要用params..因为这个值是配置项的属性名,对应的是req的分开的参数(这里触发了es6的同名省略规则)
    })
}
//修改指定用户记录接口
export function updatesByIds(data) {//在发送ajax请求前进行的特定配置
    // console.log(1111111)
    return requests({
        // url: '/vue-admin-template/test/list', // 假数据
        url: '/user/',
        method: 'put',
        data // *这里注意:如果是分开的请求参数,要用params..因为这个值是配置项的属性名,对应的是req的分开的参数(这里触发了es6的同名省略规则)
    })
}
//新增用户记录接口
export function inserts(data) {//在发送ajax请求前进行的特定配置
    // console.log(1111111)
    return requests({
        // url: '/vue-admin-template/test/list', // 假数据
        url: '/user/',
        method: 'post',
        data // *这里注意:如果是分开的请求参数,要用params..因为这个值是配置项的属性名,对应的是req的分开的参数(这里触发了es6的同名省略规则)
    })
}
//删除一个或多个用户记录接口
export function deletesByIds(params) {//在发送ajax请求前进行的特定配置
    // console.log(1111111)
    return requests({
        // url: '/vue-admin-template/test/list', // 假数据
        url: '/user/',
        method: 'delete',
        params // *这里注意:如果是分开的请求参数,要用params..因为这个值是配置项的属性名,对应的是req的分开的参数(这里触发了es6的同名省略规则)
    })
}
//查询一个或多个用户记录接口
export function selectsByIds(params) {//在发送ajax请求前进行的特定配置
    // console.log(1111111)
    return requests({
        // url: '/vue-admin-template/test/list', // 假数据
        url: '/user/',
        method: 'get',
        params // *这里注意:如果是分开的请求参数,要用params..因为这个值是配置项的属性名,对应的是req的分开的参数(这里触发了es6的同名省略规则)
    })
}

//用户excel导出
export function excelExport(data) {//在发送ajax请求前进行的特定配置
    // console.log(1111111)
    return requests({
        // url: '/vue-admin-template/test/list', // 假数据
        url: '/user/excelExport',
        method: 'post',
        data, // *这里注意:如果是分开的请求参数,要用params..因为这个值是配置项的属性名,对应的是req的分开的参数(这里触发了es6的同名省略规则)
        responseType: 'arraybuffer' //返回文件流的请求要设置这个项
    })
}







