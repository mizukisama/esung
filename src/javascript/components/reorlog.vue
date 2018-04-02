<template>
<section class="wrap">
 
    <div class="hd"> <span>欢迎光临，登录后体验更多服务</span></div>
      <ul class="change">
        <li :class="!isReg?'on':''" @click="toLog" ><a >登录</a></li>
        <li :class="isReg?'on':''" @click="toReg"><a >注册</a></li>
      </ul>

    <div v-if="!isReg" class="login">
      <ul>
        <div class="table_box">

            <dl>
              <dd>
                <input placeholder="用户名/手机/电子邮件地址" v-model="username" name="username" type="text" class="inputBg" id="username">
              </dd>
               <dd class="err" style="border:0">{{error.username}}</dd>
            </dl>
            <dl>
              <dd>
                <input v-model="password" placeholder="密码" name="password" type="password" class="inputBg">
              </dd>
               <dd class="err" style="border:0">{{error.password}}</dd>
            </dl>
            <dl>
              <dd class="agreement">
                <input type="checkbox" value="1" name="remember" id="remember" style="vertical-align:middle; zoom:200%;"><label for="remember"> 一个月内免登录</label>
              </dd>
            </dl>
            <dl>
              <dd class="last">
    
              <button  class="submit on" name="Submit" @click="userLogin"  >立即登陆</button>
              </dd>
            </dl>
        

        </div>
      </ul>
    </div>
    <div v-else class="reg">
      <ul>
      	   
        
          <div class="table_box">
            <dl>
              <dd>
                <input placeholder="请输入用户名" v-model="username" class="inputBg" name="username" id="username" type="text">
              </dd>
              <dd class="err" style="border:0">{{error.username}}</dd>
            </dl>

            <dl>
              <dd>
                <input placeholder="请输入登录密码" v-model="password" class="inputBg" name="password" id="password1" type="password">
              </dd>
               <dd class="err" style="border:0">{{error.password}}</dd>
            </dl>
            <dl>
              <dd>
                <input placeholder="请重新输入一遍密码" class="inputBg" name="confirm_password" v-model="repassword" id="confirm_password" type="password">
              </dd>
              <dd class="err" style="border:0">{{error.cfpassword}}</dd>
            </dl>

            <dl>
              <dd class="agreement">
                <input id="agreement" name="agreement" type="checkbox" value="1" :checked="flag" @change="changeCheck" style="vertical-align:middle; zoom:200%;"><label for="agreement"> 我已看过并同意《<a >用户协议</a>》</label>
              </dd>
            </dl>
            <dl>
              <dd class="last">
                <button :class="flag?'submit on':'submit'" name="Submit" @click="register" :disabled="!flag">下一步</button>
              </dd>
            </dl>
          </div>
      
     </ul>
    </div>
 
</section>
</template>
<script>
export default {
  name: "reorlog",
  data() {
    return {
      isReg: false,
      username: "",
      password: "",
      repassword: "",
      flag: false,
      error: {
        username: "",
        password: "",
        cfpassword: ""
      }
    };
  },
  computed: {},
  methods: {
    toReg() {
      this.isReg = true;
      this.error = {};
      this.username = "";
      this.password = "";
      this.repassword = "";
    },
    toLog() {
      this.isReg = false;
      this.error = {};
    },
    changeCheck() {
      this.flag = !this.flag;
    },
    userLogin() {
      this.error = {};
      ((username, password) => {
        if (!username) {
          this.error.username = "请输入用户名/手机/电子邮件";
        }
        if (!password) {
          this.error.password = "请输入密码";
        }
      })(this.username, this.password);
      if (JSON.stringify(this.error) == "{}") {
        this.$http
          .post("/log", {
            username: this.username,
            password: this.password
          })
          .then(res => {
            if (res.data.code == 1) {
            //   alert("恭喜您登陆成功");
            localStorage.setItem('username',this.username)
            this.$router.go(0)
            } else {
              this.error = {
                username: "用户名或者密码不正确",
                password: ""
              };
            }
          })
          .catch(err => {});
      } else {
        
      }
    },
    register() {
      this.error = {};
      (username => {
        if (!!username) {
          if (!/^[a-zA-Z0-9_-]{4,16}$/.test(username)) {
            this.error.username =
              "用户名长度4到16位（字母，数字，下划线，减号）";
          }
        } else {
          this.error.username = "用户名不能为空";
        }
      })(this.username);

      ((pwd, cfpwd) => {
        if (!!pwd && !!cfpwd) {
          if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/.test(pwd)) {
            this.error.password = "密码要由6-21字母和数字组成";
          }
          if (pwd != cfpwd) {
            this.error.cfpassword = "重复密码和密码不一致";
          }
        } else {
          if (!pwd) {
            this.error.password = "密码不能为空";
          }
          if (!cfpwd) {
            this.error.cfpassword = "确认密码不能为空";
          }
        }
      })(this.password, this.repassword);
      if (JSON.stringify(this.error) == "{}") {
        this.$http
          .post("/reg", {
            username: this.username,
            password: this.password
          })
          .then(res => {
            if (res.data.code == 1) {
            //   alert("恭喜您注册成功！");
             this.toLog();
            } else if (res.data.code == -1) {
              alert("对不起，服务器错误");
            } else {
              this.error = {
                username: "该用户名已被占用",
                password: ""
              };
            }
          })
          .catch(err => {});
      } else {
        
      }
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
@import "../common/scss/index.scss";
.wrap {
  font-size: 0.3rem;
  .hd {
    font-size: 0.3rem;
    text-align: center;
  }
  .change {
    width: 100%;
    height: 0.68rem;
    font-size: 0.3rem;
    line-height: 0.68rem;
    text-align: center;
    li {
      float: left;
      width: 50%;
      a {
        font-size: 0.3rem;
      }
      &.on {
        border-bottom: 1px solid $mC;
        a {
          color: $mC;
        }
      }
    }
  }
  .table_box {
    dl {
      // height: .5rem;
      // line-height: .5rem;
      dd {
        // min-height: .2rem;
        width: 90%;
        margin: 0.2rem auto;
        border: 1px solid #ccc;
        border-radius: 0.1rem;
        text-indent: 0.1rem;
        font-size: 0.3rem;
        input {
          width: 90%;
        }
        input[type="checkbox"] {
          width: auto;
        }
        &.agreement {
          border: 0;
        }
        &.err {
          color: red;
          font-size: 0.2rem;
        }
        &.last {
          border: 0;
          text-align: center;
          // background: $mC;
          .submit {
            margin: 0 auto;
            border: 0;
            color: white;
            width: 40%;
            height: 100%;
            border-radius: 0.1rem;
            &.on {
              background: $mC;
            }
          }
        }
      }
    }
  }
}
</style>
