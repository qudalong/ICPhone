<template>
	<div class="app" v-swipeup="{ fn: vuetouch, name: '上滑' }">
		<div class="headers"><van-nav-bar title="需求大厅" /></div>

		<div class="content">
			<div class="header">
				<div class="diquPicker" @click="picker">
					<img src="../assets/address.png" alt v-show="!adS" />

					<img src="../assets/addressS.png" alt v-show="adS" />

					<span>{{ area }}</span>
				</div>

				<div style="width:50%;">
					<van-search placeholder="请输入搜索关键词" @search="onSearch" v-model="search" />
				</div>

				<div class="diquPicker" @click="sxPicker">
					<img src="../assets/more.png" alt v-show="!sxS" />

					<img src="../assets/moreS.png" alt v-show="sxS" />

					<span>{{ sxname }}</span>
				</div>
			</div>

			<div class="swiper">
				<van-swipe :autoplay="3000" indicator-color="white">
					<van-swipe-item v-for="(image, index) in images" :key="index">
						<img :src="image.url" />
					</van-swipe-item>
				</van-swipe>
			</div>

			<!-- list -->

			<div class="xqItem" v-for="item in info" @click="toProjectDes(item)">
				<div class="xq">
					<span class="name">
						<img src="../assets/vip.png" v-show="parseInt(item.isMember)" alt srcset />

						<span>{{ item.username }}</span>

						<img
							src="../assets/star.png"
							v-for="n in parseInt(item.certification)"
							v-show="parseInt(item.certification) != 0"
							class="star"
							alt
							srcset
						/>
					</span>

					<span class="bg">{{ item.projectType }}</span>
				</div>

				<div class="article">{{ item.title }}</div>

				<div class="xq">
					<span>发布时间: {{ item.createtime }}</span>

					<span>{{ item.yuyuenum }}人已报名</span>
				</div>
			</div>

			<div class="foot">
				<div class="item" @click="task">
					<img src="../assets/xqS.png" v-show="unselect" alt srcset />

					<p>需求大厅</p>
				</div>

				<div class="item" @click="service">
					<img src="../assets/fw.png" v-show="!un" alt srcset />

					<p>服务大厅</p>
				</div>

				<div class="item" @click="mine">
					<img src="../assets/mine.png" alt v-show="!u" srcset />

					<p>个人中心</p>
				</div>
			</div>

			<!-- list -->

			<!-- 发布需求 -->

			<img src="../assets/fabuxuqiu.png" class="fbxq" @click="fbxq" alt srcset />

			<van-popup v-model="fbshow" position="bottom">
				<van-picker :columns="columns" show-toolbar @cancel="onCancel" @confirm="onConfirm" />
			</van-popup>

			<!-- 发布需求 -->

			<!-- 筛选数据 -->

			<van-popup v-model="sxshow">
				<div class="sxData">
					<div class="sx">
						<div class="title">分类</div>

						<div class="item">
							<span v-for="(item, i) in flData" :key="i" @click="exchange($event, i, 1)">
								{{ item.name }}
							</span>
						</div>
					</div>

					<div class="sx">
						<div class="title">职能</div>

						<div class="item">
							<span v-for="(item, i) in znarr" :key="i" @click="exchange($event, i, 2)">
								{{ item }}
							</span>
						</div>
					</div>

					<div class="sx">
						<div class="title">产品方向</div>

						<div class="item">
							<span v-for="(item, i) in cparr" :key="i" @click="exchange($event, i, 3)">
								{{ item }}
							</span>
						</div>
					</div>

					<div class="sx">
						<div class="title">待遇</div>

						<div class="item">
							<span
								v-for="(item, i) in dyData"
								:key="i"
								:class="current4 == i ? 'active' : ''"
								@click="exchange($event, i, 4)"
							>
								{{ item.low }}-{{ item.hign }}
							</span>
						</div>
					</div>

					<div class="btn">
						<van-button @click="sxCancel">取消</van-button>

						<van-button @click="sxSure">确定</van-button>
					</div>
				</div>
			</van-popup>

			<!-- 地址数据 -->

			<van-popup v-model="show" position="bottom">
				<van-area :area-list="areaList" @cancel="diquCancel" @confirm="diquSure" />
			</van-popup>

			<!-- 筛选数据 -->
		</div>

		<!--支付弹框-->

		<van-dialog
			v-model="showPayDia"
			:title="conten_val"
			show-cancel-button
			show-confirm-button
			@confirm="pay_num"
		>
			<van-row style="margin-top:10px;">
				<van-col span="8"></van-col>

				<van-col span="8"><van-stepper v-model="fabus" /></van-col>
			</van-row>

			<p>
				应支付

				<span class="color_red">{{ fabus }}</span>
				元
			</p>

			<form action="/api/faOrder/h5addorder" method="post" ref="forms">
				<input type="hidden" name="money" :value="fabus" />

				<input type="hidden" name="payType" value="1" />
			</form>
		</van-dialog>
	</div>
</template>

<script>
import province_list from '../../static/area.js';
import { Dialog } from 'vant';
export default {
	name: 'login',
	data() {
		return {
			conten_val: '',
			fabus: 0, //要购买的发布次数
			showPayDia: false, //支付弹窗
			fbNum: 0, //发布次数
			area: '地区',
			sxname: '筛选',
			adS: false,
			sxS: false,
			show: false, //地址选择
			sxshow: false, //筛选选择
			fbshow: false, //发布需求
			search: '',
			current1: 100, //筛选数据字段
			current2: 100, //筛选数据字段
			current3: 100, //筛选数据字段
			current4: 100, //筛选数据字段
			addressSelect: false,
			areaList: province_list,
			flData: [
				{ name: '兼职需求' },
				{ name: '全职需求' },
				{ name: '项目需求' },
				{ name: '咨询需求' },
				{ name: '培训需求' },
				{ name: '宝贝需求' }
			],
			znarr: [],
			cparr: [],
			dyData: [
				{
					low: '1000',
					hign: '2000'
				},
				{
					low: '2000',
					hign: '3000'
				},
				{
					low: '3000',
					hign: '4000'
				},
				{
					low: '4000',
					hign: '5000'
				},
				{
					low: '5000',
					hign: '6000'
				},
				{
					low: '6000',
					hign: '2000000'
				}
			],
			images: [],
			columns: ['兼职需求', '全职需求', '项目外包', '咨询需求', '培训需求', '宝贝需求'],
			info: [],
			projectType: '', //项目分类
			znType: '', //职能分类
			cpType: '', //产品分类
			daiyu1: '', //待遇1
			daiyu2: '', //待遇2
			unselect: true,
			un: false,
			u: false,
			allAddress: '',
			// 赛选条件数组
			aFl: [],
			aZn: [],
			aCpfx: [],
			aDy: [],
			pageSize: '5',
			pageNum: '1',
			total: 0
		};
	},
	created() {
		

		// 职能接口
		this.$axios.post('/api/faFunctionsCategory/list').then(res => {
			if (res.data.code == 0) {
				res.data.rows.forEach(item => {
					this.znarr.push(item.name);
				});
			} else {
				this.$toast(res.data.msg);
			}
		});
		// 产品分类
		this.$axios.post('/api/faProductCategory/list').then(res => {
			if (res.data.code == 0) {
				res.data.rows.forEach(item => {
					this.cparr.push(item.name);
				});
			} else {
				this.$toast(res.data.msg);
			}
		});
		// 判断是否有地址
		if (!localStorage.getItem('allAddress')) {
			this.area = '地区';
			// 大厅展示
			this.getInfo();
		} else {
			this.allAddress = localStorage.getItem('allAddress');
			this.area = localStorage.getItem('allAddress');
			this.adS = true;
			this.$axios
				.post('/api/faPublic/list', {
					type: 1, //0服务 1需求,
					addr: localStorage.getItem('allAddress')
				})
				.then(res => {
					if (res.data.code == 0) {
						this.info = res.data.rows;
					} else {
						this.$toast(res.data.msg);
					}
				});
		}
		// 轮播
		this.$axios.post('/api/rotationChart/getShow').then(res => {
			if (res.data.code == 0) {
				this.images = res.data.rows;
			} else {
				this.$toast(res.data.msg);
			}
		});
	},
	methods: {
		pay_num() {
			this.$refs.forms.submit();
		},

		picker() {
			this.show = true;
		},
		sxPicker() {
			this.sxshow = !this.sxshow;
		},
		diquCancel() {
			this.allAddress = '';
			this.area = '地区';
			this.adS = false;
			// 筛选
			this.$axios
				.post('/api/faPublic/list', {
					type: 1, //0服务 1需求,
					projectType: this.projectType,
					chanpin: this.cpType,
					zhineng: this.znType,
					daiyu1: this.daiyu1,
					daiyu2: this.daiyu2
				})
				.then(res => {
					if (res.data.code == 0) {
						this.info = res.data.rows;
					} else {
						this.$toast(res.data.msg);
					}
				});
			this.show = false;
		},
		diquSure(res) {
			this.area = res[1].name; //city
			this.allAddress = res[0].name + res[1].name + res[2].name;
			localStorage.setItem('allAddress', res[1].name);
			// 筛选
			this.$axios
				.post('/api/faPublic/list', {
					type: 1, //0服务 1需求,
					addr: this.allAddress,
					projectType: this.projectType
				})
				.then(res => {
					if (res.data.code == 0) {
						this.info = res.data.rows;
					} else {
						this.$toast(res.data.msg);
					}
				});
			this.show = false;
			this.adS = true;
			this.addressSelect = true;
		},
		toggleClass(e, arr, txt) {
			if (e.target.className.indexOf('active') == -1) {
				e.target.className = 'active';
				arr.push(txt);
			} else {
				e.target.className = '';
				arr.splice(
					this.aFl.findIndex((val, i, arr) => {
						txt == val;
					}),
					1
				);
			}
			console.log(arr.join(','));
			return arr.join(',');
		},
		exchange(e, i, num) {
			switch (num) {
				case 1:
					this.projectType = this.toggleClass(e, this.aFl, this.flData[i].name);
					break;
				case 2:
					this.znType = this.toggleClass(e, this.aFl, this.znarr[i]);
					break;
				case 3:
					this.cpType = this.toggleClass(e, this.aFl, this.cparr[i]);
					break;
				case 4:
					this.daiyu1 = this.dyData[i].low;
					this.daiyu2 = this.dyData[i].hign;
					this.current4 = i;
					break;
			}
		},
		// 点击筛选
		sxCancel() {
			this.sxshow = false;
			this.$axios
				.post('/api/faPublic/list', {
					type: 1, //0服务 1需求,
					addr: this.allAddress
				})
				.then(res => {
					if (res.data.code == 0) {
						this.info = res.data.rows;
					} else {
						this.$toast(res.data.msg);
					}
				});
		},
		// 点击筛选
		sxSure() {
			this.$axios
				.post('/api/faPublic/list', {
					type: 1, //0服务 1需求,
					addr: this.allAddress,
					projectType: this.projectType,
					chanpin: this.cpType,
					zhineng: this.znType,
					daiyu1: this.daiyu1,
					daiyu2: this.daiyu2
				})
				.then(res => {
					if (res.data.code == 0) {
						this.info = res.data.rows;
					} else {
						this.$toast(res.data.msg);
					}
				});
			this.sxshow = false;
			if (this.projectType || this.znType || this.cpType || this.daiyu1) {
				this.sxS = true;
			} else {
				this.sxS = false;
			}
		},
		// 搜索筛选
		onSearch() {
			this.$axios
				.post('/api/faPublic/list', {
					type: 1, //0服务 1需求,
					title: this.search
				})
				.then(res => {
					if (res.data.code == 0) {
						this.info = res.data.rows;
					} else {
						this.$toast(res.data.msg);
					}
				});
		},
		// 获取发布次数
		faUserInfo() {
			this.$axios
				.post('/api/faUser/info', {
					id: localStorage.getItem('userid') //登录用户id
				})
				.then(result => {
					if (result.data.code == 0) {
						this.fbNum = result.data.faUser.fabunum;
						console.log('发布次数=' + this.fbNum);
						if (this.fbNum <= 0) {
							this.conten_val = '购买发布次数';
							this.showPayDia = true;
						} else {
							this.fbshow = true;
						}
					}
				});
		},
		// 发布需求
		fbxq() {
			var userid = localStorage.getItem('userid');
			if (!userid) {
				Dialog.confirm({
					message: '您还没有登录，请去到登录'
				}).then(() => {
						this.$router.push({ name: 'login' });
				}).catch(() => {
				});
			} else {
				this.faUserInfo();
			}
		},
		onCancel() {
			this.fbshow = false;
		},
		onConfirm(value, index) {
			this.$router.push({
				name: 'jzxqfb',
				params: {
					id: index
				}
			});
			this.fbshow = false;
		},
		vuetouch(s, e) {

			this.pageNum++;
			if (this.info.length == this.total) {
				this.$toast('没有更多数据');
				return;
			}else{
				this.$toast.loading({
				message: '加载更多...'
				});
			}
			this.getInfo();
		},
		getInfo() {
			this.$axios
				.post('/api/faPublic/list', {
					type: 1, //0服务 1需求
					pageSize: this.pageSize,
					pageNum: this.pageNum
				})
				.then(res => {
					if (res.data.code == 0) {
						this.total = res.data.total;
						this.info = this.info.concat(res.data.rows);
						this.$toast.clear();
					} else {
						this.$toast(res.data.msg);
					}
				});
		},
		// 项目详情
		toProjectDes(item) {
			if (item.userId == localStorage.getItem('userid')) {
				if (localStorage.getItem('isMember') == 0) {
					var userid = 0;
				} else {
					var userid = 2;
				}
			} else {
				if (item.isMember == 0) {
					var userid = 3;
				} else {
					var userid = 4;
				}
			}
			localStorage.setItem('fbstar', item.certification);
			localStorage.setItem('fbUser', item.userId);
			this.$router.push({
				name: 'taskContent',
				params: {
					pid: item.pId,
					// pid: item.id,
					userId: item.userId, //发布人id
					type: item.projectType,
					userid: userid,
					my_type: 2
				}
			});
		},
		task() {
			this.un = this.u = false;
			this.unselect = true;
			this.$router.push({
				name: 'taskRoom'
			});
		},
		service() {
			this.unselect = this.u = false;
			this.un = true;
			this.$router.push({
				name: 'serviceRoom'
			});
		},
		mine() {
			var userid = localStorage.getItem('userid');
			if (!userid) {
					Dialog.confirm({
					message: '您还没有登录，请去到登录'
				}).then(() => {
						this.$router.push({ name: 'login' });
				}).catch(() => {
				});
			} else {
				this.unselect = this.un = false;
				this.u = true;
				this.$router.push({
					name: 'mine'
				});
			}
		},
		onClickLeft() {
			this.$router.go(-1);
		},
		onClickRight() {}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: white;
	padding: 0 0.2rem;
	font-size: 0.26rem;
	position: relative;
}

.header img {
	width: 0.32rem;
}

.diquPicker {
	display: flex;
	align-items: center;
}

.content {
	margin: 46px auto 60px;
	position: relative;
}

.sx {
	font-size: 0.3rem;
}

.sx .title {
	text-align: left;
	padding-left: 3%;
	margin: 0.2rem 0;
}

.sx .item {
	display: flex;
	justify-content: space-around;
	align-items: center;
}

.sx .item {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
}

.sx .item span {
	display: inline-block;
	width: 23%;
	background-color: #f2f2f2;
	padding: 1% 1.5%;
	margin: 0 1% 4% 4%;
	color: #4c4c4c;
	border: 1px solid #f2f2f2;
}

.van-popup--center {
	width: 100%;
}

.btn {
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 0.2rem 0;
}

.btn button {
	border-radius: 5px;
	width: 44%;
	font-size: 0.3rem;
}

.btn button:nth-child(1) {
	color: #4c4c4c;
	background-color: #f2f2f2;
}

.btn button:nth-child(2) {
	color: white;
	background-color: #0172ff;
}

.sxData .sx .active {
	background-color: white;
	color: #0172ff;
	border: 1px solid #0172ff;
}

.swiper img {
	width: 100%;
	vertical-align: top;
}

.xqItem {
	background-color: white;
	padding: 0.2rem;
	margin-bottom: 0.2rem;
	color: #b3b3b3;
	font-size: 0.3rem;
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

.fbxq {
	width: 1.6rem;
	position: fixed;
	bottom: 2.4rem;
	right: 0.2rem;
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

.headers {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
	height: 46px;
	z-index: 10;
}

.header >>> .van-search {
	padding: 10px 0;
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
