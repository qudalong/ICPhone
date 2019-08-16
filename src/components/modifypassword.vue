<template>
  <div class="app">
    <div class="headers">
      <van-nav-bar title="修改密码" />
    </div>
    <div class="content">
      <img src="../assets/modify.png" alt class="logo" />
      <div class="ipt">
        <van-field placeholder="请输入手机号" v-model="mobile" />
        <img src="../assets/name.png" alt srcset />
      </div>
      <div class="ipt">
        <van-field type="tel" placeholder="请输入密码" v-model="password" />
        <img src="../assets/password.png" alt srcset />
      </div>
      <div class="ipt iptCode">
        <img src="../assets/code.png" alt srcset />
        <van-cell-group>
          <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
            <van-button slot="button" size="small" :disabled='codeSended' type="primary" @click="getcode">{{time}}</van-button>
          </van-field>
        </van-cell-group>
      </div>
      <van-button type="info" @click="toMine">确认修改</van-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// Vue.component(Field.name, Field);
export default {
  name: "login",
  data() {
    return {
      mobile: "",
      password: "",
      sms: "",
      code: "",
      time:"验证码",
      codeSended:false
    };
  },
  created() {
    axios.defaults.headers.common['token'] =localStorage.getItem('token');
  },
  methods: {
    // 验证码
    // 倒计时
    startCountDown() {
      this.codeSended = true;
      var time = 60;
      // this.time = time;
      const intval = setInterval(() => {
        this.time = time--;
        if (this.time === 0) {
          this.codeSended = false;
          this.time = "重新发送";
          clearInterval(intval);
        }
      }, 1000);
    },
    getcode() {
      if (!this.mobile) {
        this.$toast("手机号不能为空");
        return;
      }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile)) {
        this.$toast("请输入正确的手机号");
        return;
      }
      this.$axios
        .post("/IC/api/faUser/send-message", {
          mobile: this.mobile
        })
        .then(res => {
          if (res.data.code == 0) {
            this.startCountDown();
            this.code = res.data.msg;
          } else {
            this.$toast(res.data.msg);
          }
        });
    },
    // 修改成功
    toMine() {
      if (!this.mobile) {
        this.$toast("手机号不能为空");
        return;
      }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile)) {
        this.$toast("请输入正确的手机号");
        return;
      }
      if (!this.password) {
        this.$toast("密码不能为空");
        return;
      }
      if (!/[0-9a-zA-Z]+/.test(this.password)) {
        this.$toast("密码只能是数字或字母");
        return;
      }
      if (this.code != this.sms) {
        this.$toast("验证码输入错误");
        return;
      }
      this.$axios
        .post("/IC/api/faUser/passwordBack", {
          mobile: this.mobile,
          password: this.password
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$toast("修改成功");
            this.$router.push({ name: "login" });
          } else {
            this.$toast(res.data.msg);
          }
        });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app {
  padding: 0.2rem;
  background-color: white;
  font-size: 0.32rem;
}

.content {
  margin: 46px auto 60px;
}

.app .logo {
  width: 100%;
  vertical-align: top;
  margin-bottom: 0.2rem;
  border-radius: 8px;
}

.ipt {
  position: relative;
  margin-bottom: 0.2rem;
}

.ipt img {
  width: 0.5rem;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0.2rem;
  margin: auto 0;
  z-index: 5;
}

.ipt >>> .van-field__control {
  padding-left: 0.6rem;
}

.iptCode >>> .van-field__control {
  padding-left: 0;
}

.ipt >>> .van-cell:not(:last-child)::after {
  border-bottom: none;
}

.van-button--normal {
  width: 100%;
  padding: 0.1rem auto;
  font-size: 0.32rem;
}

.func {
  display: flex;
  justify-content: space-between;
  color: #0172ff;
  margin-top: 0.2rem;
}

.code {
  border-left: 1px solid #e6e6e6;
  padding: 0 0.2rem;
  color: #0172ff;
}

.van-cell {
  border: 1px solid #e6e6e6;
  border-radius: 8px;
}

.iptCode .van-cell {
  padding: 7px 15px;
  padding-left: 0.6rem;
}

.headers {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  height: 46px;
  z-index: 10;
}

.headers >>> .van-nav-bar {
  background-color: #0172ff;
  color: white;
}

.headers >>> .van-nav-bar__text,
.headers >>> .van-nav-bar .van-icon {
  color: white;
}

.headers >>> .van-nav-bar__title {
  color: white;
}
</style>
