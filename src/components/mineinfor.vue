<template>
  <div class="app">
    <div class="content">
      <div v-show="current">
        <div class="xqItem">
          <div class="xq">
            <span>2019-06-14</span>
          </div>
          <div class="article">求养殖咨询师</div>
        </div>
        <div class="xqItem">
          <div class="xq">
            <span>2019-06-14</span>
          </div>
          <div class="article">求养殖咨询师</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  created() {
    this.$emit("footer", false);
    this.$emit("header", true);
    localStorage.setItem("title", "消息中心");
  },
  data() {
    return {
      current: true
    };
  },
  methods: {
    xq(i) {
      if (i == 1) {
        this.current = true;
      } else {
        this.current = false;
      }
    }
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
  justify-content: flex-start;
  align-items: center;
  font-size: 0.28rem;
}

.xq .name {
  color: black;
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
</style>
