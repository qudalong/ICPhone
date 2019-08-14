<template>
  <div class="app" v-swipeup="{ fn: vuetouch, name: '上滑' }">
    <div class="headers">
      <van-nav-bar title="我的投递" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <div>
        <div class="xqItem" v-for="item in rows" @click="toProjectDes(item)">
          <div class="xq">
            <span class="name">
              <img src="../assets/vip.png" v-if="item.isMember" alt srcset />
              <span>{{item.username}}</span>
              <img
              src="../assets/star.png"
              v-for="n in certification"
              v-show="certification != 0"
              class="star"
              alt
              srcset
            />
            </span>
            <span class="bg">{{item.type}}</span>
          </div>
          <div class="article">{{item.content}}</div>
          <div class="xq">
            <span>发布时间: {{item.createtime}}</span>
            <span>{{item.yuyeunum}}人已报名</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  created() {
    this.getFabu();
    this.certification = localStorage.getItem("iscerficate");
  },
  data() {
    return {
      current: true,
      rows:[],
      pageSize: '6',
			pageNum: '1',
			total: 0
    };
  },
  methods: {
    xq(i) {
      if (i == 1) {
        this.current = true;
      } else {
        this.current = false;
      }
    },
    vuetouch(s, e) {
			this.pageNum++;
			if (this.rows.length == this.total) {
				this.$toast('没有更多数据');
				return;
			}else{
				this.$toast.loading({
				message: '加载更多...'
				});
			}
			this.getFabu();
		},
    getFabu() {
      // 发布
      this.$axios
        .post("/api/faApply/myApply", {
          id: localStorage.getItem("userid"),
          	pageSize: this.pageSize,
					pageNum: this.pageNum
        })
        .then(res => {
          if (res.data.code == 0) {
            	this.total = res.data.total;
						this.rows = this.rows.concat(res.data.rows);
						this.$toast.clear();
          } else {
            this.$toast(res.data.msg);
          }
        });
    },
    toProjectDes(item) {
      localStorage.setItem("fbstar",item.certification)
      if(item.type == "兼职需求" || item.type == "全职需求" || item.type == "项目需求" || item.type == "咨询需求" || item.type == "培训需求" || item.type == "宝贝需求"){
        this.$router.push({
          name: "taskContent",
          params: {
            // pid: item.id,
            pid: item.needId,
            type: item.type,
            userid: localStorage.getItem("userid"),
            my_type: 1
          }
        });
      }else if(item.type == "兼职服务"|| item.type == "全职服务" || item.type == "项目外包" || item.type == "咨询服务" || item.type == "培训服务" || item.type == "宝贝转卖"){
        this.$router.push({
          name: "serviceContent",
          params: {
            // pid: item.id,
            pid: item.needId,
            type: item.type,
            userid: localStorage.getItem("userid")
          }
        });
      }
      
    },
    onClickLeft() {
      this.$router.push({name:"mine"});
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  margin: 46px auto 60px;
  font-size: 0.32rem;
}
.header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
  font-size: 0.32rem;
}

.header div {
  padding: 0.2rem 1.4rem;
}

.xqItem {
  background-color: white;
  padding: 0.2rem;
  margin-bottom: 0.2rem;
  color: #b3b3b3;
}

.xq {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.xq .name {
  color: black;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.name img:nth-child(1) {
  width: 0.36rem;
}

.name span:nth-child(2) {
  margin: 0 0.1rem;
}

.name .star {
  width: 0.24rem;
}

.xq .bg {
  background-color: #0172ff;
  color: white;
  padding: 0.03rem 0.1rem;
  font-size: 0.28rem;
  border-radius: 5px;
}

.article {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  margin: 0.1rem 0;
}

.active {
  color: #0172ff;
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
