<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户<span class="go"
          >我有账号，去 <router-link to="/login">登陆</router-link></span
        >
      </h3>
      <div class="a">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="手机号" prop="phone">
            <el-input
              type="text"
              v-model="ruleForm.phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code" :inline="true">
            <el-input v-model="ruleForm.code"></el-input>
            <el-button @click="getCode">获取验证码</el-button>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="agree">
             <el-checkbox label="同意协议并注册《掌上豹用户协议》" name="type"  v-model="ruleForm.agree"></el-checkbox>
          </el-form-item>

          <div class="ab">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机掌上豹</li>
        <li>销售联盟</li>
        <li>掌上豹社区</li>
      </ul>
      <div class="address">地址：深圳市南山区科技园综合楼6层</div>
      <div class="beian">DCP备190887730号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        if (!this.isCellPhone(value)) {
          callback(new Error("请输入正确的手机号"));
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 自定义表单验证是否勾选协议协议
    var validateAgree = (rule, value, callback) => {
     value= this.ruleForm.agree
      if (value) {
        callback();
      } else {
        callback(new Error("请勾选同意协议"));
      }
    };
    return {
      ruleForm: {
        phone: "15362304491",
        password: "",
        checkPass: "",
        code: "",
        agree: true,
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        agree: [{ validator: validateAgree, trigger: "blur" }],
        code: [{ required: true, message: "验证码不能为空", trigger: 'change' }],
      },
    };
  },
  methods: {
    //验证手机号
    isCellPhone(val) {
      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
        return false;
      } else {
        return true;
      }
    },
    //获取验证码按钮的回调
    async getCode() {
      if (this.ruleForm.phone) {
        try {
          //获取验证码成功
          await this.$store.dispatch("user/getCode", this.ruleForm.phone);
          //修改VC身上的code属性,让验证码自动展示
          this.ruleForm.code = this.$store.state.user.code;
        } catch (error) {}
      }
    },
    //提交按钮
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.register()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    //注册按钮的回调
    async register() {
      //解构出参数
      const { phone, code, password, checkPass } = this.ruleForm;
      console.log(phone, code, password, checkPass);
      //目前不做表单验证

      //通知vuex发请求，进行用户的注册
      try {
        //注册成功
        await this.$store.dispatch("user/registerUser", {
          phone,
          code,
          password,
        });
        //让用户跳转到登录页面进行登录
        this.$router.push("/login");
      } catch (error) {
        //注册失败
        alert(error.message);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 800px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;
        a {
          color: #e1251b;
        }
      }
    }
    .a {
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 800px;
      height: 500px;

      /deep/ .el-input__inner {
        display: inline;
      }
      /deep/ .el-form-item__label {
        text-align: center;
        color: #606266;
        line-height: 40px;
        padding: 0;
        box-sizing: border-box;
      }
      /deep/ .el-button {
        display: inline;
      }
    }
    .ab {
      display: flex;
      justify-content: center;
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>