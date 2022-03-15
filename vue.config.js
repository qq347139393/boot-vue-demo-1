module.exports = {//common.js的暴露方式
  pages: {
    index: {
      //入口
      entry: 'src/main.js',
    },
  },
	lintOnSave:false, //关闭语法检查
	//开启代理服务器（方式一）
	devServer: {
      "port": 8081,
      "open": true,
      proxy: 'http://localhost:8087'
    }
	// 开启代理服务器（方式二）
	// devServer: {
    //     "port": 8081,
    //     "open": true,
    //     proxy: {
    //       '/bootVueDemo': {
    //         target: 'http://localhost:8087',
    //                 pathRewrite:{'^/vueDemo1':''},
    //         // ws: true, //用于支持websocket
    //         // changeOrigin: true //用于控制请求头中的host值
    //       }
    //       // '/demo': {
    //       //   target: 'http://localhost:5001',
    //         // 		pathRewrite:{'^/demo':''},
    //       //   // ws: true, //用于支持websocket
    //       //   // changeOrigin: true //用于控制请求头中的host值
    //       // }
    //     }
    // }
}
