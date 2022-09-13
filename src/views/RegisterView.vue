<template>
  <div class="demo-ruleForm">
    <h2>北邮低碳宝</h2>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="企业编码" prop="companyId">
        <el-input v-model="ruleForm.companyId"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="ruleForm.confirmPassword" show-password></el-input>
      </el-form-item>
      <el-form-item prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio label="1"
            >我已阅读并同意《用户协议》及《北邮减碳宝隐私说明》</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { register } from "@/assets/register.js";
export default {
  data() {
    const validatePhone = (rule, value, callback) => {
      let regTest =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!value) {
        callback(new Error("手机号码不能为空"));
      } else {
        if (!regTest.test(value)) {
          callback(new Error("手机号码格式不正确"));
        }
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        companyId: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        companyId: { required: true, message: "请输入企业编码", trigger: "blur" },
        phone: { validator: validatePhone, trigger: "blur" },
        password: { validator: validatePass, trigger: "blur" },
        confirmPassword: { validator: validatePass2, trigger: "blur" },
        type: { required: true, message: "请阅读并同意", trigger: "change" },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const query = { ...this.ruleForm };
          delete query.confirmPassword;
          let res = await register(query);
          res = res.data;
          if (String(res.code) === "1") {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            this.$router.push("/login");
          } else {
            alert("注册失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style>
.demo-ruleForm {
  width: 1000px;
  margin: auto;
}
</style>
