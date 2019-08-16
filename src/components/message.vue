<template>
  <div class="app" v-swipeup="{ fn: vuetouch, name: '上滑' }">
    <div class="headers">
      <van-nav-bar title="消息中心" left-arrow @click-left="onClickLeft" />
    </div>
    <div v-if="rows.length" class="content">
        <div class="xqItem" v-for="item in rows" @click="toProjectDes(item)">
          <div class="xq">
            <span class="name">
              <span>{{item.createtime}}</span>
            </span>
            <span class="bg">{{item.ptype}}</span>
          </div>
          <div class="article">{{item.content}}</div>
          <div v-show="item.createTime" class="xq">
            <span>回复内容: {{item.message}}</span>
          </div>
        </div>
    </div>
    <div v-else class='empty' >暂无消息</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "login",
  created() {
    axios.defaults.headers.common['token'] =localStorage.getItem('token');
    this.getMessage();
  },
  data() {
    return {
      current: true,
      rows:[],
      pageSize: '10',
			pageNum: '1',
      total: 0,
      rows:[]
    };
  },
  methods: {
    toProjectDes(item) {
      item.createTime=!item.createTime
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
			this.getMessage();
		},
    getMessage() {
      this.$axios
        .post("/api/faNotice/list", {
          userId: localStorage.getItem("userid"),//713211
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
    onClickLeft() {
      this.$router.push({name:"mine"});
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.empty{
  position:fixed;
  top:40%;
  left:50%;
  transform: translate(-50%,-50%);
  color:#666;
}
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
