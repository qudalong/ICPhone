<template>
  <div class="app">
    <div class="headers">
      <van-nav-bar title="评价" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <div class="score">
        <span>评分</span>
        <img
          v-for="(star,index) in stars"
          :src="star.src"
          v-on:click="rating(index)"
        />
        <span class="num">{{score}}.0分</span>
      </div>
      <div class="area">
        <van-field
          type="textarea"
          label="评价内容"
          v-model="pingjiaValue"
          placeholder="请在此输入给需求发布方的留言..."
        />
      </div>
    </div>
    <van-button type="info" @click="sub" class="submit">提交</van-button>
  </div>
</template>

<script>
//星星的图片路径
var starOnImg  = require('../assets/star.png');
var starOffImg  = require('../assets/starG.png');
export default {
  name: "login",
  created() {
    this.projecttype = this.$route.params.type;
    this.projectID = this.$route.params.pid;
    // this.userid = this.$route.params.fbid;
    this.userid=localStorage.getItem('userid');
    this.title = this.$route.params.title;
  },
  data() {
    return {
      starOn:'',
      pingjiaValue: "",
      projecttype: "",
      projectID: "",
      stars: [
        {
          src: starOffImg,
          active: false
        },
        {
          src: starOffImg,
          active: false
        },
        {
          src: starOffImg,
          active: false
        },
        {
          src: starOffImg,
          active: false
        },
        {
          src: starOffImg,
          active: false
        }
      ],
      starNum: 0,
      score:0,
      title:"",
      userid:""
    };
  },
  methods: {
    sub() {
      if (!this.pingjiaValue) {
        this.$toast("评价内容不能为空");
        return;
      }
      this.$axios
        .post("/api/faMessage/add", {
          pId: this.projectID,
          type: this.projecttype,
          messageId: localStorage.getItem("userid"),
          coment: this.pingjiaValue,
          star: this.score,
          userId:this.userid,
          title:this.title
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$toast("操作成功");
            this.$router.go(-1)
            // this.$router.push({name: "taskContent",, query: {pid: 719181}})
          } else {
            this.$toast(res.data.msg);
          }
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    //评分
    rating: function(index) {
      var total = this.stars.length; //星星总数
      var idx = index + 1; //这代表选的第idx颗星-也代表应该显示的星星数量
      this.score = idx * 2;
      //进入if说明页面为初始状态
      if (this.starNum == 0) {
        this.starNum = idx;
        for (var i = 0; i < idx; i++) {
          this.stars[i].src = starOnImg;
          this.stars[i].active = true;
        }
      } else {
        //如果再次点击当前选中的星级-仅取消掉当前星级，保留之前的。
        // if (idx == this.starNum) {
        //   for (var i = index; i < total; i++) {
        //     this.stars[i].src = starOffImg;
        //     this.stars[i].active = false;
        //   }
        // }
        //如果小于当前最高星级，则直接保留当前星级
        if (idx < this.starNum) {
          for (var i = idx; i < this.starNum; i++) {
            this.stars[i].src = starOffImg;
            this.stars[i].active = false;
          }
        }
        //如果大于当前星级，则直接选到该星级
        if (idx > this.starNum) {
          for (var i = 0; i < idx; i++) {
            this.stars[i].src = starOnImg;
            this.stars[i].active = true;
          }
        }

        var count = 0; //计数器-统计当前有几颗星
        for (var i = 0; i < total; i++) {
          if (this.stars[i].active) {
            count++;
          }
        }
        this.starNum = count;
        this.score = this.starNum * 2;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app {
  background-color: white;
}
.content {
  margin: 46px auto 60px;
}

.wrapper {
  margin-bottom: 0.2rem;
  font-size: 0.32rem;
  background-color: white;
  text-align: left;
  padding: 0.2rem;
  color: #999;
}

.score {
  display: flex;
  align-items: center;
  padding: 0.2rem;
}

.score img {
  width: 0.36rem;
  margin: 0 0.05rem;
}

.score span:nth-child(1) {
  margin-right: 0.1rem;
}

.score .num {
  color: #fa9221;
  margin-left: 0.1rem;
}

.area {
  font-size: 0.32rem;
}

.van-cell {
  font-size: 0.32rem;
}

.area >>> .van-field__label {
  text-align: left;
}

.area >>> .van-field--min-height .van-field__control {
  min-height: 120px;
  border: 1px solid #e2e4e6;
}

.submit {
  width: 94%;
  position: fixed;
  bottom: 0.2rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-size: 0.32rem;
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
