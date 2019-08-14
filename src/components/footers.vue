<template>
  <div class="app">
    <div class="foot">
      <div class="item" @click="task">
        <img src="../assets/xq.png" v-show="!unselect" alt="" srcset="">
        <img src="../assets/xqS.png" v-show="unselect" alt="" srcset="">
        <p>需求大厅</p>
      </div>
      <div class="item" @click="service">
        <img src="../assets/fw.png" v-show="!un" alt="" srcset="">
        <img src="../assets/fwS.png" v-show="un" alt="" srcset="">
        <p>服务大厅</p>
      </div>
      <div class="item" @click="mine">
        <img src="../assets/mine.png" alt="" v-show="!u" srcset="">
        <img src="../assets/mineS.png" alt="" v-show="u" srcset="">
        <p>个人中心</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
import { truncate } from 'fs';
export default {
  name: "footers",
  data() {
    return {
      unselect: false,
      un: false,
      u: false,
    };
  },
  props:['isShow'],
  methods: {
    task() {
      this.un = this.u = false;
      this.unselect = true;
      this.$router.push({
        name:"taskRoom"
      })
    },
    service() {
      this.unselect = this.u = false;
      this.un = true;
      this.$router.push({
        name:"serviceRoom"
      })
    },
    mine() {
      this.unselect = this.un =false;
      this.u = true;
      this.$router.push({
        name:"mine"
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.foot {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  height: 60px;
  bottom: 0;
  left: 0;
  right: 0;
}

.foot .item {
  flex: 1;
  font-size: 0.28rem;
}

.item p {
  margin: 0;
}

.item img {
  width: 0.56rem;
  vertical-align: top;
}
</style>
