<template>
  <div class="login-container">
    <el-form ref="form" :rules="rules" :model="loginForm" label-width="80px" class="login-form">
      <h2 class="login-title">管理系统</h2>
      <el-form-item label="用户名"  prop="name">
        <el-input v-model="loginForm.name"  @keyup.enter.native="submitForm('form')"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" @keyup.enter.native="submitForm('form')"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [
          {required: true, message: "用户名不能为空", trigger: 'blur'},
          {min: 3, max: 8, message: "用户名3-8位", trigger: 'blur'}
        ],
        password: [
          {required: true, message: "密码不能为空", trigger: 'blur'},
          {min: 3, max: 10, message: "密码3-10位", trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        console.log(valid) //验证通过为true，有一个不通过就是false
        if (valid) {
          // 通过的逻辑
          // this.$store.dispatch('user/login', this.loginForm).then(() => {
          //   this.$router.push({ path: this.redirect || '/' })//跳转主页
          //   this.loading = false
          // }).catch(() => {
          //   this.loading = false
          // })
          const result = await this.$store.dispatch('account/login', this.loginForm)
          console.log("@@@", result)
          if (result) {
            console.log('登录成功');
            //登录成功后会立刻存入用户信息(jwtToken\name等等),然后当执行跳转主页的操作时会进行一次[鉴证](而这次[鉴证]必然能够通过)
            await this.$router.push({path: this.redirect || '/'})//跳转主页
          } else {
            console.log('登录失败');
            //不跳转
          }
        } else {
          console.log('验证失败');
          return false;
        }
      });
    }
  }
};
</script>

<style acoped>
.login-form {
  width: 350px;
  margin: 10% auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/logo2.jpg");
}

/* 标题 */
.login-title {
  color: #303133;
  text-align: center;
}
</style>
