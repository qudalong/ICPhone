<template>
  <div class="app">
    <div class="headers">
      <van-nav-bar title="会员认证" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <img src="../assets/renzhengcenter.png" alt class="logo" />
      <van-cell-group>
        <van-field v-model="username" label="姓名" placeholder="请输入姓名" />
        <van-field v-model="userPhone" type="tel" label="联系电话" placeholder="请输入联系电话" />
        <van-field v-model="card" type="tel" label="身份证号" placeholder="请输入身份证号" />
        <van-field
          readonly
          clickable
          label="认证星级"
          :value="vipRank"
          placeholder="请选择"
          @click="showVipPicker = true"
        />

        <van-popup v-model="showVipPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="vipColumns"
            @cancel="showVipPicker = false"
            @confirm="onVipConfirm"
          />
        </van-popup>
        <div class="vip">
          <van-field v-model="vipfee" class="vipfee" label="认证费用" placeholder="请输入会员费用" />
          <div class="unit">元</div>
        </div>
      </van-cell-group>
      <p class="zhu">注:认证费用根据认证等级自动显示,不可更改</p>
      <div class="do">
        <form
          action="/IC/api/faOrder/h5addorder"
          method="post"
          ref="forms"
        >
          <input type="hidden" name="type" :value="0" />
          <input type="hidden" name="userId" :value="userid" />
          <input type="hidden" name="userName" v-model="username" />
          <input type="hidden" name="userPhone" v-model="userPhone" />
          <input type="hidden" name="userCard" v-model="card" />
          <input type="hidden" name="level" v-model="vipRank" />
          <input type="hidden" name="money" v-model="vipfee"/>
          <input type="hidden" name="payType" value="1" />
        </form>
        <van-button type="info" @click="getOrder">申请认证</van-button>
        <div class="func">
          <div>点击查看认证后可享受的服务</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      userPhone: "",
      card: "",
      vipfee: "",
      vipRank: 1,
      showVipPicker: false,
      vipColumns: ["1", "2", "3"],
      rows: [],
      userid:""
    };
  },
  created() {
    this.userid = localStorage.getItem("userid");
    if (this.$route.params.id) {
      this.passlogin = false;
    }
    // 认证费用
    this.$axios.post("/IC/api/faCertificateInfo/list").then(res => {
      if (res.data.code == 0) {
        this.rows = res.data.rows;
        this.vipfee = this.rows[0].fee;
      } else {
        this.$toast(res.data.msg);
      }
    });
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: "mine" });
    },
    onVipConfirm(value) {
      this.vipRank = value;
      console.log(value);
      switch (value) {
        case "1":
          this.vipfee = this.rows[0].fee;
          break;
        case "2":
          this.vipfee = this.rows[1].fee;
          break;
        case "3":
          this.vipfee = this.rows[2].fee;
          break;
        default:
          break;
      }
      this.showVipPicker = false;
    },
    // 开通认证
    getOrder() {
      if (!this.username) {
        this.$toast("用户名不能为空");
        return;
      }
      if (!this.userPhone) {
        this.$toast("手机号不能为空");
        return;
      }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.userPhone)) {
        this.$toast("请输入正确的手机号");
        return;
      }
      if (
        !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(
          this.card
        )
      ) {
        this.$toast("请输入正确的身份证号");
        return;
      }
      this.$refs.forms.submit();
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app {
  background-color: white;
  font-size: 0.32rem;
}

.app .logo {
  width: 94%;
  vertical-align: top;
  margin-bottom: 0.2rem;
  border-radius: 8px;
}

.func {
  display: flex;
  justify-content: space-between;
  color: #0172ff;
  margin-top: 0.2rem;
}

.content {
  margin: 46px auto 60px;
  padding: 0.2rem 0;
}

.content >>> .van-field__label {
  text-align: left;
}

.content >>> input {
  text-align: right;
}

.content >>> .van-area .van-picker__frame {
  position: absolute !important;
}

.vip {
  position: relative;
}

.vipfee >>> .van-field__control {
  width: 90% !important;
  color: #f8931f;
}

.vip .unit {
  position: absolute;
  right: 0.3rem;
  top: 0;
  bottom: 0;
  margin: auto 0;
  display: flex;
  align-items: center;
}

.zhu {
  width: 94%;
  margin: 0.2rem auto;
  font-size: 0.26rem;
  color: #999;
  text-align: left;
}

.do {
  width: 94%;
  margin: 0 auto;
  position: fixed;
  bottom: 0.2rem;
  left: 0;
  right: 0;
}

.van-button--normal {
  width: 100%;
  font-size: 0.3rem;
  background-color: #f8931f;
  border: none;
}

.do .func {
  display: flex;
  justify-content: flex-end;
  font-size: 0.28rem;
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
