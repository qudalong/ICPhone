<template>
  <div class="app">
    <div class="headers">
      <van-nav-bar
        title="设置"
        left-arrow
        @click-left="onClickLeft"
        />
    </div>
    <div class="content">
      <!-- <div> -->
      <router-link to="/modifypassword">
        <van-cell title="修改密码" is-link />
      </router-link>
      <a @click="logout">
        <van-cell title="退出" is-link/>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  created() {
    this.$emit("footer", false);
    this.$emit("header", true);
    localStorage.setItem("title", "个人中心");
  },
  data() {
    return {
      msg: "个人中心",
      passlogin: false,
      loginType: "密码登录"
    };
  },
  methods: {
    logout(){
      localStorage.removeItem('userid');
      this.$router.push({name:"login"});
    },
    onClickLeft(){
      this.$router.push({name:"mine"});
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  margin: 46px auto 60px;
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

.van-nav-bar {
  background-color: #0172ff;
  color: white;
}

.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: white;
}

.van-nav-bar__title {
  color: white;
}

.van-cell__title, .van-cell__value {
  text-align: left;
}

.van-cell {
  border-bottom: 1px solid #e6e6e6;
}

a {
  display: block;
  position: relative;
}

a img{
    position: absolute;
    left: 0.2rem;
    top: 0;
    bottom: 0;
    margin: auto 0;
    z-index: 10;
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

.headers >>> .van-nav-bar__text,.headers >>> .van-nav-bar .van-icon {
  color: white;
}

.headers >>> .van-nav-bar__title {
  color:white;
}
</style>
