<template>
  <div class="login" id="login-app">
    <div class="login-box">
      <img src="../assets/imgs/login/login-l.png" alt="" />

      <div class="login-form">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
          <div class="login-form-title">
            <img
              src="../assets/imgs/login/logo.png"
              style="width: 200px; height: 80px"
              alt=""
            />
          </div>
          <el-form-item prop="companyId">
            <el-input
              v-model="loginForm.companyId"
              type="text"
              auto-complete="off"
              placeholder="公司编码"
              maxlength="20"
              prefix-icon="iconfont icon-user"
            />
          </el-form-item>
          <el-form-item prop="phone">
            <el-input
              v-model="loginForm.phone"
              type="text"
              auto-complete="off"
              placeholder="手机号"
              maxlength="20"
              prefix-icon="iconfont icon-user"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              prefix-icon="iconfont icon-lock"
              maxlength="20"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-form-item style="width: 100%">
            <el-button
              :loading="loading"
              class="login-btn"
              size="medium"
              type="primary"
              @click.native.prevent="handleLogin"
            >
              <span style="color: white">登录</span>
            </el-button>
            <el-button
              :loading="loading"
              class="login-btn"
              size="medium"
              type="primary"
              @click.prevent="handleRegister"
            >
              <span style="color: white">注册</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { loginApi } from "@/assets/login.js";
import "../assets/styles/login.css";

export default {
  data() {
    return {
      loginForm: {
        companyId: "1001",
        phone: "15631786860",
        password: "981205",
      },
      loading: false,
    };
  },
  computed: {
    loginRules() {
      const validateUsername = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error("请输入账号"));
        } else {
          callback();
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error("请输入密码"));
        } else {
          callback();
        }
      };
      const validateCompany = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error("请输入企业编码"));
        } else {
          callback();
        }
      };
      return {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        company: [{ validator: validateCompany, trigger: "blur" }],
      };
    },
  },
  created() {},
  methods: {
    async handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          let res = await loginApi(this.loginForm);
          res = res.data;
          if (String(res.code) === "1") {
            //1表示登录成功
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            this.$router.push("/");
          } else {
            this.$message.error(res.msg);
            this.loading = false;
          }
        }
      });
    },
    handleRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoprd>
.body {
  min-width: 1366px;
}
</style>
