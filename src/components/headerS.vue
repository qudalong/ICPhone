<template>
  <div class="app">
    <div class="headers">
      <van-nav-bar
        :title="msg"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        />
    </div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
import { truncate } from 'fs';
export default {
  name: "footers",
  created(){
    this.msg = localStorage.getItem("title");
  },
  data() {
    return {
      msg:""
    };
  },
  props:['isShow'],
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
