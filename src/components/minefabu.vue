<template>
	<div class="app" v-swipeup="{ fn: vuetouch, name: '上滑' }">
		<div class="headers"><van-nav-bar title="我的发布" left-arrow @click-left="onClickLeft" /></div>
		<div class="content">
			<div class="header">
				<div @click="xq(1)" :class="current ? 'active' : ''">需求</div>
				<div @click="xq(2)" :class="!current ? 'active' : ''">服务</div>
			</div>
			<div v-show="current">
				<div class="xqItem" v-for="item in rows" @click="toProjectDes(item)">
					<div class="xq">
						<span class="name">{{ item.title }}</span>
						<span class="righticon">
							<span class="bg bg9 pr10" v-show="item.status == '已过期'">已过期</span>
							<span class="bg">{{ item.type }}</span>
						</span>
					</div>
					<div class="article">{{ item.jianjie }}</div>
					<div class="xq">
						<span>发布时间: {{ item.time }}</span>
						<span>{{ item.sum }}人已报名</span>
					</div>
					<div class="row">
						<van-button type="info" size="small" v-show="item.status == '已过期'" @click.stop="pay">
							付费延期
						</van-button>
					</div>
				</div>
			</div>

			<div v-show="!current">
				<div class="xqItem" v-for="item in rows" @click="toProjectDes(item)">
					<div class="xq">
						<span class="name">{{ item.title }}</span>
						<span class="righticon">
							<span class="bg bg9 pr10" v-show="item.status == '已过期'">已过期</span>
							<span class="bg">{{ item.type }}</span>
						</span>
					</div>
					<div class="article">{{ item.jianjie }}</div>
					<div class="xq">
						<span>发布时间: {{ item.time }}</span>
						<span>{{ item.sum }}人已报名</span>
					</div>
					<div class="row">
						<van-button type="info" size="small" v-show="item.status == '已过期'" @click.stop="pay">
							付费延期
						</van-button>
					</div>
				</div>
			</div>
		</div>
		<van-popup v-model="timeout" round position="bottom" :style="{ height: '25%' }">
			<div class="outBuy">
				<div class="price">¥{{ month }}元</div>
				<div class="buy">
					<span>延期时长(月)</span>
					<div class="num"><van-stepper v-model="month" /></div>
				</div>
				<van-button type="primary" class="purchase" @click="purchase">购买</van-button>
			</div>
		</van-popup>
		<form action="/api/faOrder/h5addorder" method="post" ref="forms">
			<input type="hidden" name="moneny" :value="month" />
			<input type="hidden" name="payType" value="1" />
		</form>
	</div>
</template>

<script>
export default {
	name: 'login',
	created() {
		this.type = 1;
		this.getFabu();
	},
	data() {
		return {
			current: true,
			type: '',
			rows: [],
			timeout: false,
			month: '',
			 pageSize: '6',
			pageNum: '1',
			total: 0
		};
	},
	methods: {
		xq(i) {
			if (i == 1) {
				this.current = true;
				this.type = 1;
			} else {
				this.current = false;
				this.type = 2;
			}
				if (this.rows.length == this.total) {
				return;
			}
			this.getFabu();
		},
		purchase() {
			this.$refs.forms.submit();
			// this.$toast('跳转到支付');
		},
		pay() {
			this.timeout = true;
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
				.post('/api/faUser/myProject', {
					id: localStorage.getItem('userid'),
					type: this.type,
						pageSize: this.pageSize,
					pageNum: this.pageNum
				})
				.then(res => {
					if (res.data.code == 0) {
						// this.rows = res.data.rows;
							this.total = res.data.total;
						this.rows = this.rows.concat(res.data.rows);
						this.$toast.clear();
					} else {
						this.$toast(res.data.msg);
					}
				});
		},
		toProjectDes(item) {
			localStorage.setItem('fbstar', item.certification);
			localStorage.setItem('fbUser',localStorage.getItem('userid'));
			console.log(item);
			if (
				item.type == '兼职需求' ||
				item.type == '全职需求' ||
				item.type == '项目需求' ||
				item.type == '咨询需求' ||
				item.type == '培训需求' ||
				item.type == '宝贝需求'
			) {
				this.$router.push({
					name: 'taskContent',
					params: {
						pid: item.id,
						type: item.type,
						userId: localStorage.getItem('userid'), //登录人id
						userid: localStorage.getItem('userid'),
						my_type: 1
					}
				});
			} else {
				this.$router.push({
					name: 'serviceContent',
					params: {
						pid: item.id,
						type: item.type,
						userId: localStorage.getItem('userid'), //发布人id
						userid: localStorage.getItem('userid')
					}
				});
			}
		},
		onClickLeft() {
			this.$router.push({ name: 'mine' });
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
	justify-content: space-between;
	align-items: center;
}

.xq .name {
	color: black;
}
.row {
	padding: 0.1rem 0;
}
.xq .bg {
	background-color: #0172ff;
	color: white;
	padding: 0.03rem 0.1rem;
	font-size: 0.28rem;
	border-radius: 5px;
}

.xq .bg9 {
	background-color: #999;
	margin-left: 0.1rem;
}
.pr10 {
	margin-right: 0.1rem !important;
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
.righticon {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.buy {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.outBuy {
	text-align: left;
	padding: 0.2rem;
	font-size: 0.3rem;
}

.outBuy .price {
	font-size: 0.36rem;
	color: #fd0000;
}

.purchase {
	width: 100%;
	margin: 0.7rem auto 0;
	background-color: #fe0000;
	border: none;
}
</style>
