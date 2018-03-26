<template>
  <div class="login-container fit-parent flex-center">
    <div class="login-wrapper flex-row">
      <div class="left-wrapper">
        <div class="bg"></div>
        <div class="content fit-parent">
          <header>智慧安装平台</header>
          <div class="info">
            <section>集BIM应用</section>
            <section>项目施工信息化管理平台</section>
          </div>
        </div>
      </div>
      <div class="right-wrapper">
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="登陆" name="login">
            <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
              <el-form-item prop="username">
                <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
              </el-form-item>

              <el-form-item prop="password">
                <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password" />
              </el-form-item>

              <div class="sub-info flex-sb">
                <el-checkbox v-model="checkedLogin">记住我</el-checkbox>
                <router-link to="/resetPwd">忘记密码?</router-link>
              </div>

              <el-button type="primary" class="login-btn" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册" name="register">
            <el-form v-if="registerStep === 1" class="register-form" :model="registerForm" :rules="registerRules" ref="loginForm" label-position="left">
              <el-form-item prop="username">
                <el-input name="username" type="text" placeholder="请输入手机号码" />
              </el-form-item>

              <el-form-item prop="password">
                <el-input name="code" @keyup.enter.native="handleLogin" placeholder="请输入验证码" />
                <el-button type="primary" round size="mini" class="get-code" :disabled="true">获取验证码</el-button>
              </el-form-item>

              <el-form-item prop="password">
                <el-input name="password" type="password" placeholder="请输入密码" />
              </el-form-item>

              <div class="sub-info">
                <el-checkbox v-model="checkedLogin">*我已阅读并已同意《智慧安装服务协议》</el-checkbox>
              </div>

              <el-button type="primary" class="login-btn" :loading="loading" @click.native.prevent="registerStep = 2">下一步</el-button>
            </el-form>

            <el-form v-if="registerStep === 2" class="register-form" :model="registerForm" :rules="registerRules" ref="loginForm" label-position="left">
              <el-form-item prop="username">
                <el-input name="nickname" type="text" placeholder="请输入昵称" />
              </el-form-item>

              <el-form-item prop="username">
                <el-input name="realName" type="text" placeholder="请输入姓名" />
              </el-form-item>

              <el-form-item prop="username">
                <el-input name="email" type="text" placeholder="请输入邮箱" />
              </el-form-item>

              <el-button type="primary" class="login-btn" :loading="loading" @click.native.prevent="handleLogin">注册</el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Please enter the correct user name'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
      },
      registerForm: {},
      registerRules: {},
      passwordType: 'password',
      checkedLogin: false,
      loading: false,
      activeName: 'login',
      registerStep: 1,
    };
  },
  methods: {
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('Login', this.loginForm).then((userInfo) => {
            const { userType } = userInfo;
            this.loading = false;

            if (userType === 0) {
              this.$router.push({ path: '/userManage' });
            } else {
              this.$router.push({ path: '/projectManage' });
            }
          }).catch(() => {
            this.loading = false;
          });
        } else {
          console.log('login fail');
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
/* reset element-ui css */
.login-container {
  .el-tabs__nav {
    width: 100%;
  }

  .el-tabs__header {
    margin-bottom: 22px;
  }

  .el-tabs__item {
    width: 50%;
    text-align: center;
    font-size: 17px;
    font-weight: bolder;
    color: #999999;

    &.is-active {
      color: #000000;
    }
  }

  .el-tabs__active-bar {
    background-color: #247946;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #247946;
    border-color: #247946;
  }

  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #247946;
  }

  .register-form {
    .el-checkbox__label{
      font-size: 12px;
    }
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    border-color: #129346;
    background-color: #129346;
  }
  
  .get-code {
    position: absolute;
    top: 4px;
    right: 8px;
    border-color: #129346;
    background-color: #129346;
  }
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login-container {
  background-image: url('../../assets/images/login-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}

.login-wrapper {
  width: 542px;
  height: 379px;

  .left-wrapper {
    position: relative;
    height: 100%;
    width: 232px;

    .bg {
      width: 100%;
      height: 100%;
      background-color: #129346;
      opacity: .8;
      filter: blur(1px);
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    .content {
      padding-left: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #ffffff;

      header {
        margin-bottom: 35px;
        font-size: 24px;
      }

      section {
        font-size: 14px;
      }
    }
  }

  .right-wrapper {
    height: 100%;
    width: 310px;
    padding: 32px;
    background-color: #ffffff;

    .login-form {
      .sub-info {
        font-size: 14px;
      }
    }
  }
}
</style>
