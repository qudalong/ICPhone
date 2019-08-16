<template>
  <div class="app">
    <div class="headers">
      <van-nav-bar title="个人中心" />
    </div>
    <div class="content">
      <div class="header">
        <div class="nn">
          <div class="name">
            <img src="../assets/vip.png" v-show="faUser.isMember == 1" alt srcset />
            <span>{{faUser.username}}</span>
          </div>
          <div class="des" >{{userType}}·{{isCertificate}}</div>
          <!-- <div class="des" v-show="faUser.isCertificate == 0">个人·未认证</div> -->
        </div>
        <div class="img">
          <img :src="faUser.avatar" alt srcset />
        </div>
      </div>
      <!-- <div> -->
      <a @click="minefabu">
        <img src="../assets/dh.png" width="24" height="24" />
        <van-cell title="我的发布" is-link to="index" />
      </a>
      <a @click="minetoudi">
        <img src="../assets/td.png" width="24" height="24" />
        <van-cell title="我的投递" is-link to="index" />
      </a>
      <a @click="minefw">
        <img src="../assets/hy.png" width="24" height="24" />
        <van-cell title="会员服务" is-link to="index" />
      </a>
      <a @click="minerenzheng">
        <img src="../assets/rz.png" width="24" height="24" />
        <van-cell title="认证中心" is-link to="index" />
      </a>
      <a @click="message">
        <img src="../assets/xx.png" width="24" height="24" />
        <van-cell title="消息中心" is-link to="index" />
      </a>
      <a @click="wanshan">
        <img src="../assets/ws.png" width="24" height="24" />
        <van-cell title="完善信息" is-link to="index" />
      </a>
      <a @click="mineset">
        <img src="../assets/sz.png" width="24" height="24" />
        <van-cell title="设置" is-link to="index" />
     </a>
    </div>
    <div class="foot">
        <div class="item" @click="task">
          <img src="../assets/xq.png" v-show="unselect" alt srcset />
          <p>需求大厅</p>
        </div>
        <div class="item" @click="service">
          <img src="../assets/fw.png" v-show="un" alt srcset />
          <p>服务大厅</p>
        </div>
        <div class="item" @click="mine">
          <img src="../assets/mineS.png" alt v-show="u" srcset />
          <p>个人中心</p>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "login",
  created() {
    // 个人信息
    axios.defaults.headers.common['token'] =localStorage.getItem('token');
    this.$axios.post("/api/faUser/info",{
      id:localStorage.getItem("userid")
    }).then(res => {
      if (res.data.code == 0) {
        this.faUser = res.data.faUser;
        if(this.faUser.type == "1"){
          this.userType="公司用户"
        }else{
          this.userType="个人用户"
        }
        if(this.faUser.isCertificate=="0"){
          this.isCertificate="未认证"
        }else{
          this.isCertificate="已认证"
        }
        localStorage.setItem("isMember",this.faUser.isMember);
        localStorage.setItem("iscerficate",this.faUser.isCertificate)
        localStorage.setItem("username",this.faUser.username)
      } else {
        this.$toast(res.data.msg);
      }
    });
  },
  data() {
    return {
      faUser:{},
      unselect: true,
      un: true,
      u: true,
      userType:"",
      isCertificate:"",
      type:1
    };
  },
  methods: {
    minefabu(){
      this.$router.replace({
        name:"minefabu"
      })
    },
    minetoudi(){
      this.$router.replace({
        name:"minetoudi"
      })
    },
    minefw(){
      this.$router.replace({
        name:"minefw"
      })
    },
    minerenzheng(){
      this.$router.replace({
        name:"minerenzheng"
      })
    },
    message(){
      this.$router.replace({
        name:"message"
      })
    },
    mineset(){
      this.$router.replace({
        name:"mineset"
      })
    },
    wanshan(){
      this.$router.replace({
        name:"minewanshan",
        params:{
          type:this.faUser.type
        }
      })
    },
    task() {
      this.$router.push({
        name:"taskRoom"
      })
    },
    service() {
      this.$router.push({
        name:"serviceRoom"
      })
    },
    mine() {
      this.$router.push({
        name:"mine"
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  margin: 46px auto 60px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  position: relative;
  padding: 0.4rem;
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 0.2rem;
}

.nn {
  float: left;
  padding: 0.3rem 0;
  max-width: 80%;
  text-align: left;
}

.nn img {
  width: 0.36rem;
}

.name {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.name span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 80%;
}

.img {
  display: flex;
  align-items: center;
}

.img img {
  width: 1.2rem;
}

.des {
  color: #b5b5b5;
  font-size: 0.28rem;
  margin-top: 0.1rem;
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
  padding-left: 0.6rem;
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

.foot {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  height: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
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
