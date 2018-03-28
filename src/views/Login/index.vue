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
        <el-tabs v-model="activeName">
          <el-tab-pane label="登陆" name="login">
            <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
              <el-form-item prop="username">
                <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
              </el-form-item>

              <el-form-item prop="password">
                <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码" />
              </el-form-item>

              <div class="sub-info flex-sb">
                <el-checkbox v-model="checkedLogin">记住我</el-checkbox>
                <router-link to="/resetPwd">忘记密码?</router-link>
              </div>

              <el-button
                type="success"
                class="login-btn"
                :loading="loading"
                :disabled="loginForm.username === '' || loginForm.password === ''"
                @click.native.prevent="handleLogin"
              >{{$t('login.logIn')}}</el-button>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册" name="register">
            <el-form v-if="registerStep === 1" class="register-form" :model="registerForm" :rules="registerRules" ref="registerForm" label-position="left">
              <el-form-item prop="mobile">
                <el-input name="mobile" type="text" v-model="registerForm.mobile" placeholder="请输入手机号码" />
              </el-form-item>

              <el-form-item prop="code">
                <el-input name="code" v-model="registerForm.code" @keyup.enter.native="handleGetCode" placeholder="请输入验证码" />
                <el-button
                  type="success"
                  round
                  size="mini"
                  class="get-code"
                  :loading="codeStatus === 1"
                  :disabled="registerForm.mobile === '' || codeStatus !== 0"
                  @click="handleGetCode"
                >{{ codeStatus === 2 ? `还剩${codeTime}s` : '获取验证码' }}</el-button>
              </el-form-item>

              <el-form-item prop="password">
                <el-input name="password" type="password" v-model="registerForm.password" placeholder="请输入密码" />
              </el-form-item>

              <div class="sub-info">
                <el-checkbox v-model="checkedRegister">*我已阅读并已同意《智慧安装服务协议》</el-checkbox>
              </div>

              <el-button
                type="success"
                class="login-btn"
                :loading="loading"
                @click.native.prevent="handleNextRegister"
                :disabled="registerForm.mobile === '' || registerForm.code === '' || registerForm.password === '' || !checkedRegister"
              >下一步</el-button>
            </el-form>

            <el-form v-if="registerStep === 2" class="register-form" :model="registerForm" :rules="registerRules" ref="registerForm" label-position="left">
              <el-form-item prop="username">
                <el-input name="nickname" type="text" placeholder="请输入昵称" />
              </el-form-item>

              <el-form-item prop="username">
                <el-input name="realName" type="text" placeholder="请输入姓名" />
              </el-form-item>

              <el-form-item prop="username">
                <el-input name="email" type="text" placeholder="请输入邮箱" />
              </el-form-item>

              <el-button type="success" class="login-btn" :loading="loading" @click.native.prevent="handleLogin">注册</el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode, verifyCode } from '@/api/user';
import { validateEmail, validePhone } from '@/utils/validate';

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error(`${this.$t('user.userName')}${this.$t('message.notCorrect')}`));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(`密码长度不能低于6位`));
      } else {
        callback();
      }
    };

    const checkEmail = (rule, value, callback) => {
      if (!validateEmail(value)) {
        callback(new Error(`${this.$t('user.email')}${this.$t('message.notCorrect')}`));
      } else {
        callback();
      }
    };

    const checkPhone = (rule, value, callback) => {
      if (!validePhone(value)) {
        callback(new Error(`${this.$t('user.tel')}${this.$t('message.notCorrect')}`));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
      },
      registerForm: {
        mobile: '',
        code: '',
        password: '',
      },
      registerRules: {
        mobile: [{ required: true, validator: checkPhone, trigger: 'blur' }],
        code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
        password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
      },
      passwordType: 'password',
      checkedLogin: false,
      checkedRegister: false,
      loading: false,
      activeName: 'login',
      registerStep: 1,
      // code
      codeTime: 60,
      // 0: 未获取， 1: 正在获取, 2: 已经获取
      codeStatus: 0,
      timer: null,
    };
  },
  mounted() {
    const username = window.localStorage.getItem('username');
    const password = window.localStorage.getItem('password');

    this.loginForm.username = username;
    this.loginForm.password = password;
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
    },
    handleGetCode() {
      const { mobile } = this.registerForm;

      if (validePhone(mobile)) {
        this.codeStatus = 1;
        getCode({
          mobile,
          systemType: 1,
        }).then((res) => {
          this.codeStatus = 2;

          this.timer = setInterval(() => {
            this.codeTime -= 1;

            if (this.codeTime === 0) {
              clearInterval(this.timer);
              this.codeStatus = 0;
              this.codeTime = 60;
            }
          }, 1e3);
        });
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('Login', this.loginForm).then((userInfo) => {
            const { userType } = userInfo;
            this.loading = false;

            // if check the login info
            if (this.checkedLogin) {
              window.localStorage.setItem('username', this.loginForm.username);
              window.localStorage.setItem('password', this.loginForm.password);
            } else {
              window.localStorage.setItem('username', '');
              window.localStorage.setItem('password', '');
            }

            this.$router.push({ path: '/ProjectList' });

            // if (userType === 0) {
            //   this.$router.push({ path: '/userManage' });
            // } else {
            //   this.$router.push({ path: '/projectManage' });
            // }
          }).catch(() => {
            this.loading = false;
          });
        } else {
          console.log('login fail');
        }
      });
    },
    handleNextRegister() {
      const { code, mobile } = this.registerForm;
      verifyCode({
        code,
        mobile,
      }).then((res) => {
        console.log('res', res);
        this.codeStatus = 0;
        this.registerStep = 2;
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
  }
  
  .get-code {
    position: absolute;
    top: 4px;
    right: 8px;
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
