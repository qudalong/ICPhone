<template>
  <div class="app">
    <div class="headers">
      <van-nav-bar title="会员服务" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <img src="../assets/swiper5.png" alt class="logo" />
      <van-cell-group>
        <van-field v-model="username" label="用户名" placeholder="请输入用户名" />
        <van-field v-model="userPhone" type="tel" label="联系电话" placeholder="请输入联系电话" />
        <div class="vip">
          <van-field value="99" readonly class="vipfee" label="会员费用" />
          <div class="unit">元</div>
        </div>
      </van-cell-group>
      <p class="zhu">注:会员费用根据会员等级和开通时长自动显示,不可更改</p>
      <div class="do">
        <form
          action="/api/faOrder/h5addorder"
          method="post"
          ref="forms"
        >
          <input type="hidden" name="type" :value="1" />
          <input type="hidden" name="userId" v-model="userid" />
          <input type="hidden" name="userName" v-model="username" />
          <input type="hidden" name="userPhone" v-model="userPhone" />
          <input type="hidden" name="money" value="0.01"/>
          <input type="hidden" name="payType" value="1" />
        </form>
        <van-button type="info" @click="pay">确认开通</van-button>
        <div class="func">
          <div>点击查看付费会员后可享受的服务</div>
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
      vipfee: "",
      userid:""
    };
  },
  created() {
    this.userid = localStorage.getItem("userid");
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: "mine" });
    },
    // 开通会员
    pay() {
      if (!this.username) {
        this.$toast("用户名不能为空");
        return false;
      }
      if (!this.userPhone) {
        this.$toast("手机号不能为空");
        return false;
      }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.userPhone)) {
        this.$toast("请输入正确的手机号");
        return false;
      }
      this.$refs.forms.submit();
      // this.$axios
      //   .post("/IC/api/faOrder/h5addorder", {
      //     id: localStorage.getItem("userid"),
      //     type: 1,
      //     money: 99,
      //     payType: 1, //0支付宝 1微信
      //     userName: this.username,
      //     userPhone: this.userPhone
      //   })
      //   .then(res => {
      //     if (res.data.code == 0) {
      //       wx.config({
      //         debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      //         appId: test.data.appId, // 必填，公众号的唯一标识
      //         timestamp: test.data.timeStamp, // 必填，生成签名的时间戳
      //         nonceStr: test.data.nonceStr, // 必填，生成签名的随机串
      //         signature: test.data.signature, // 必填，签名
      //         jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表 这里填写需要用到的微信api openlocation为使用微信内置地图查看位置接口
      //       });
      //       wx.ready(function() {
      //         wx.chooseWXPay({
      //           timestamp: test.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      //           nonceStr: test.data.nonceStr, // 支付签名随机串，不长于 32 位
      //           package: test.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      //           signType: test.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      //           paySign: test.data.paySign, // 支付签名
      //           success: function(res) {
      //             // 支付成功后的回调函数
      //             mui.toast("支付成功");
      //             window.location.href = "{:url('index/index')}";
      //           }
      //         });
      //       });
      //     } else {
      //       this.$toast(res.data.msg);
      //     }
      //   });
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
  color: #0172ff;
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
  width: 100%;
  margin: 0 auto;
  position: fixed;
  bottom: 0.2rem;
  left: 0;
  right: 0;
  background-color: white;
}

.van-button--normal {
  width: 94%;
  font-size: 0.3rem;
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
