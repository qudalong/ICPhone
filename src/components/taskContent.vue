<template>
	<div class="app">
		<div class="headers"><van-nav-bar title="需求详情" left-arrow @click-left="onClickLeft" /></div>

		<div class="content">
			<div class="author">
				<img src="../assets/touxiang.png" class="tx" alt srcset />

				<img src="../assets/vip.png" v-if="userid" alt srcset />

				<span>{{ info.userName }}</span>

				<span v-for="index of 5" :key="index">
					<img
						v-if="index <= starnum"
						src="../assets/star.png"
						class="star"
						v-show="starnum != 0"
					/>
				</span>

				<!-- <img src="../assets/star.png"
	
	          v-for="n of this.starnum"
	
	          v-show="starnum != 0"
	
	          class="star"
	
	          alt
	
	          srcset
	
	        /> -->
			</div>

			<div class="wrapper">
				<div class="name">
					<img src="../assets/bBorder.png" alt srcset />

					<span>{{ info.title }}</span>
				</div>

				<p>类型: {{ projecttype }}</p>
				<p v-show="projecttype == '兼职需求' || projecttype == '全职需求'">
					工作地点: {{ info.workaddress }}
				</p>
				<p
					v-show="
						projecttype == '兼职需求' ||
							projecttype == '全职需求' ||
							projecttype == '宝贝需求' ||
							projecttype == '项目外包' ||
							projecttype == '咨询需求' ||
							projecttype == '培训需求'
					"
				>
					发布时间: {{ info.updatetime }}
				</p>
				<p
					v-show="
						projecttype == '宝贝需求' ||
							projecttype == '项目外包' ||
							projecttype == '咨询需求' ||
							projecttype == '培训需求'
					"
				>
					有效期: {{ info.validity }}
				</p>
			</div>

			<div class="wrapper">
				<div class="name">
					<img src="../assets/bBorder.png" alt srcset />

					<span>详细信息</span>
				</div>
				<p>联系人: {{ info.telName }}</p>
				<p v-show="projecttype == '咨询需求'">咨询种类: {{ info.categoryZx }}</p>
				<p v-show="projecttype == '宝贝需求'">宝贝种类: {{ info.typeBb }}</p>
				<p v-show="projecttype == '宝贝需求'">宝贝名称: {{ info.name }}</p>
				<p v-show="projecttype == '宝贝需求'">宝贝介绍: {{ info.content }}</p>
				<p v-show="projecttype == '宝贝需求'">
					交易方式: {{ info.tradeType == 0 ? '直接交易' : '平台担保' }}
				</p>
				<p v-show="projecttype == '咨询需求'">内容范围: {{ info.content }}</p>
				<p v-show="projecttype == '咨询需求'">合作方式: {{ info.cooperateWay }}</p>
				<p v-show="projecttype == '项目外包'">项目名称: {{ info.projectName }}</p>
				<p v-show="projecttype == '项目外包'">项目简介: {{ info.content }}</p>
				<p v-show="projecttype == '项目外包'">项目周期: {{ info.cycle }}</p>
				<p v-show="projecttype == '项目外包'">项目任务: {{ info.task }}</p>
				<p v-show="projecttype == '项目外包'">项目预算: {{ info.budget }}</p>
				<p v-show="projecttype == '项目外包'">项目交付标准: {{ info.standard }}</p>
				<p v-show="projecttype == '项目外包'">项目文档: {{ info.viewCount || 0 }}</p>
				<p v-show="projecttype == '培训需求'">职能: {{ info.categoryZn }}</p>
				<p v-show="projecttype == '培训需求'">产品方向: {{ info.chanpin }}</p>
				<p v-show="projecttype == '兼职需求' || projecttype == '全职需求'">
					职能: {{ info.functions }}
				</p>
				<p v-show="projecttype == '兼职需求' || projecttype == '全职需求'">
					产品方向: {{ info.productDir }}
				</p>
				<p v-show="projecttype == '培训需求'">培训说明: {{ info.contentTraining }}</p>
				<p v-show="projecttype == '兼职需求' || projecttype == '全职需求'">
					技能关键字: {{ info.skill }}
				</p>
				<p v-show="projecttype == '兼职需求' || projecttype == '全职需求'">
					熟悉的EDA工具: {{ info.edaTool }}
				</p>
				<p v-show="projecttype == '兼职需求' || projecttype == '全职需求'">
					经历技能介绍: {{ info.experience }}
				</p>
				<p v-show="projecttype == '兼职需求'">工作时间: {{ info.worktime }}</p>
				<p v-show="projecttype == '兼职需求'">工作模式: {{ info.workmode }}</p>
				<p v-show="projecttype == '兼职需求'">工作地点: {{ info.workaddress }}</p>
				<p v-show="projecttype == '兼职需求' || projecttype == '全职需求'">
					期望待遇: {{ info.pay }}
				</p>
				<p v-show="projecttype == '兼职需求' || projecttype == '全职需求'">
					最早开工时间: {{ info.startTime }}
				</p>
				<p
					v-show="
						projecttype == '兼职需求' ||
							projecttype == '项目外包' ||
							projecttype == '咨询需求' ||
							projecttype == '宝贝需求'
					"
				>
					可预约人数: {{ info.maxnum || 0 }}
				</p>
				<p v-show="projecttype == '兼职需求' || projecttype == '全职需求'">
					有效期: {{ info.validity }}个月
				</p>
				<p v-show="projecttype == '兼职需求'">其他条件: {{ info.other || '无' }}</p>
			</div>

			<div class="wrapper">
				<div class="name">
					<span class="pingjia">
						<span>
							<img src="../assets/bBorder.png" alt srcset />

							评价({{ pjstander }}.0分)
						</span>

						<span @click="topingjia">评价</span>
					</span>
				</div>

				<p class="pjcontent" v-for="item in pingjiainfo">
					<img src="../assets/touxiang.png" alt srcset />

					<span>{{ item.messageuser }}: {{ item.coment }}</span>
				</p>
			</div>
		</div>

		<div class="btn" v-if="my_type == 2">
			<van-button type="info" @click="yuyue">我要预约</van-button>

			<van-button type="info" @click="call">拨打电话</van-button>
		</div>

		<!-- 我要预约 -->

		<van-popup v-model="yyshow">
			<div class="yy">
				<div class="title">我要预约</div>

				<div class="yycontent">
					<van-field
						type="textarea"
						v-model="message"
						placeholder="请在此输入给需求发布方的留言..."
					/>
				</div>

				<div class="yyBtn">
					<van-button @click="yyCancel">取消</van-button>

					<van-button @click="yySure">确认</van-button>
				</div>
			</div>
		</van-popup>

		<!-- 我要拨打 -->

		<van-popup v-model="callshow">
			<div class="call">
				<div class="title">拨打电话</div>

				<div class="callBtn">
					<van-button @click="linkPlat">{{ platContent }}</van-button>

					<!-- <van-button @click="linkPerson">{{ personContent }}</van-button> -->
				</div>
			</div>
		</van-popup>

		<!--购买查看次数-->

		<van-dialog
			v-model="lookShow"
			title="购买查看联系方式次数"
			show-cancel-button
			show-confirm-button
			@confirm="look_num"
		>
			<van-row style="margin-top:10px;">
				<van-col span="8"></van-col>

				<van-col span="8"><van-stepper v-model="lookNum" /></van-col>
			</van-row>

			<p>
				应支付

				<span class="color_red">{{ lookNum }}</span>
				元
			</p>

			<form action="/api/faOrder/h5addorder" method="post" ref="forms">
				<input type="hidden" name="money" :value="lookNum" />

				<input type="hidden" name="payType" value="1" />
			</form>
		</van-dialog>

		<!--支付弹框-->

		<van-dialog
			v-model="show"
			:title="conten_val"
			show-cancel-button
			show-confirm-button
			@confirm="pay_num"
		>
			<van-row style="margin-top:10px;">
				<van-col span="8"></van-col>

				<van-col span="8"><van-stepper v-model="yuyues" /></van-col>
			</van-row>

			<p>
				应支付

				<span class="color_red">{{ yuyues }}</span>
				元
			</p>

			<form action="/api/faOrder/h5addorder" method="post" ref="forms">
				<input type="hidden" name="money" :value="yuyues" />

				<input type="hidden" name="payType" value="1" />
			</form>
		</van-dialog>

		<!-- 留言板 -->

		<!-- 	<van-dialog
	
				v-model="blackboard"
	
				title="预约留言"
	
				show-cancel-button
	
				show-confirm-button
	
				@confirm="liuyan"
	
			>
	
				<textarea
	
					class="textarea"
	
					v-model="message"
	
					placeholder="请输入留言"
	
					cols="30"
	
					rows="5"
	
				></textarea>
	
			</van-dialog> -->
	</div>
</template>

<script>
export default {
	name: 'login',
	created() {
		this.projectID = this.$route.params.pid;
		this.projecttype = this.$route.params.type;
		this.userid = this.$route.params.userid;
		this.userId = this.$route.params.userId; //发布人id
		this.title = this.$route.params.title;
		this.my_type = this.$route.params.my_type;
		// this.fbstar = localStorage.getItem("iscerficate");
		// localStorage.setItem('fbUser',this.userId);
		this.getStarts();
		this.projectInfo();
		this.pingjia();
		// this.getUserMax()
		if (this.userid == 2 || this.userid == 0) {
			this.operate = false;
		}
	},
	data() {
		return {
			lookNum: 0,
			lookShow: false,
			message: '', //留言内容
			blackboard: false, //留言板
			maxYynum: 0, //最大预约人数
			yyshow: false,
			yyValue: '',
			callshow: false,
			projectID: '',
			projecttype: '',
			info: {},
			pingjiainfo: [],
			pingjiascore: 0,
			pingjiaL: '',
			userid: '',
			userId: '',
			platContent: '联系平台',
			personContent: '联系发布者本人',
			title: '',
			pjstander: '0',
			operate: true,
			starnum: '',
			my_type: '', //1是我的发布 2是需求大厅
			yuyuenum: '', //个人可预约人数
			show: false, //支付弹框
			yuyues: 1,
			conten_val: '购买预约人数',
			ckphonenum: 0 //可查看次数
		};
	},
	methods: {
		liuyan() {
			if (!this.message) {
				this.blackboard = true;
				this.$toast('请输入留言内容');
				return false;
			}
			this.$axios
				.post('/api/faApply/add', {
					userId: localStorage.getItem('userid'),
					type: this.projecttype,
					title: this.info.title,
					needId: this.info.id,
					content: this.message,
					username: this.userInfo.username,
					isMember: this.userInfo.isMember,
					certification: this.userInfo.certificateLevel,
					fabuId: this.userId
				})
				.then(res => {
					console.log(res);
				});
		},
		pay_num() {
			this.$refs.forms.submit();
		},
		// 我要预约
		yuyue() {
			var userid = localStorage.getItem('userid');
			if (!userid) {
				this.$router.push({ name: 'login' });
			} else {
				this.getinfo();
				this.$axios
					.post('/api/faUser/info', {
						id: localStorage.getItem('userid')
					})
					.then(res => {
						if (res.data.code === 0) {
							this.userInfo = res.data.faUser;
							this.yuyuenum = res.data.faUser.yuyuenum;
							console.log('预约=' + this.yuyuenum);
							console.log('最大预约=' + this.maxYynum);
							//预约人数为0时
							// if (this.yuyuenum <= 0) {
							// 	this.conten_val = '购买预约人数';
							// 	this.show = true;
							// 	return;
							// }
							//可以预约
							if (Number(this.maxYynum) - Number(this.yuyuenum) > 0) {
								this.yyshow = true;
							} else {
								this.$toast('当前需求可预约次数为零，预约失败!');
								return;
							}
						} else if (res.data.code == 500) {
							this.$router.push({ name: 'login' });
							return;
						} else {
							this.$toast(res.data.msg);
						}
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		yyCancel() {
			this.yyshow = false;
		},
		yySure() {
			if (!this.message) {
				this.$toast('留言内容不能为空');
				return;
			}
			this.$axios
				.post('/api/faApply/add', {
					// 					userId: localStorage.getItem('userid'),
					// 					type: this.projecttype,
					// 					needId: this.projectID,
					// 					content: this.yyValue,

					userId: localStorage.getItem('userid'),
					type: this.projecttype,
					title: this.info.title,
					needId: this.info.id,
					content: this.message,
					username: this.userInfo.username,
					isMember: this.userInfo.isMember,
					certification: this.userInfo.certificateLevel,
					fabuId: this.userId
				})
				.then(res => {
					if (res.data.code == 0) {
						this.$toast('操作成功');
						this.yyshow = false;
					} else {
						this.$toast(res.data.msg);
					}
				});
		},
		// 拨打电话
		look_num() {
			this.$refs.forms.submit();
		},
		call() {
			var userid = localStorage.getItem('userid');
			if (!userid) {
				this.$router.push({ name: 'login' });
			} else {
				this.getinfo();
				this.$axios
					.post('/api/faUser/info', {
						id: localStorage.getItem('userid')
					})
					.then(res => {
						if (res.data.code == 0) {
							var isMember = Number(res.data.faUser.isMember);
							var ckphonenum = Number(res.data.faUser.ckphonenum);
							console.log('会员=' + isMember);
							console.log('电话次数=' + ckphonenum);
							if (isMember) {
								if (ckphonenum == 0) {
									this.lookShow = true;
								} else {
									this.callshow = true;
								}
							} else {
								this.$toast('您不是会员，无法查看联系方式');
							}
						}
					});
			}
		},
		linkPlat() {
			// if(this.info.telStatus == 1){
			//   this.$toast("发布人未公开联系方式");
			//   return
			// }
			if (this.userid == 3) {
				this.$toast('不是会员,无法操作');
			} else {
				this.platContent = '平台电话:' + this.info.tel;
			}
		},
		linkPerson() {
			if (this.info.telStatus == 1) {
				this.$toast('发布人未公开联系方式');
				return;
			}
			if (this.userid == 3) {
				this.$toast('不是会员,无法操作');
			} else {
				this.$axios
					.post('/api/faUser/info', {
						id: localStorage.getItem('userid')
					})
					.then(res => {
						if (res.data.code === 0) {
							this.yuyuenum = res.data.faUser.yuyuenum;
							this.ckphonenum = res.data.faUser.ckphonenum;
							if (!this.ckphonenum) {
								this.conten_val = '查看次数不足！请购买可查看次数';
								this.show = true;
								return;
							} else {
								this.platContent = '发布者电话:' + this.info.tel;
							}
						} else {
							this.$toast(res.data.msg);
						}
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		topingjia() {
			var userid = localStorage.getItem('userid');
			if (!userid) {
				this.$router.push({ name: 'login' });
			} else {
				this.$router.push({
					name: 'pingjia',
					params: {
						type: this.projecttype,
						pid: this.projectID,
						fbid: this.info.userId,
						title: this.info.title
					}
				});
			}
		},
		//获取用户可预约人数
		getUserMax() {
			this.$axios
				.post('/api/faUser/info', {
					id: localStorage.getItem('userid')
				})
				.then(res => {
					if (res.data.code === 0) {
						this.yuyuenum = res.data.faUser.yuyuenum;
						this.ckphonenum = res.data.faUser.ckphonenum;
					} else {
						this.$toast(res.data.msg);
					}
				})
				.catch(err => {});
		},
		projectInfo() {
			this.$axios
				.post('/api/faPublic/projectInfo', {
					id: this.projectID,
					type: this.projecttype
				})
				.then(res => {
					if (res.data.code == 0) {
						this.info = res.data.project;
					} else {
						this.$toast(res.data.msg);
					}
				});
		},
		getStarts() {
			this.$axios
				.post('/api/faUser/info', {
					 id:localStorage.getItem('fbUser')
				})
				.then(result => {
					if (result.data.code == 0) {
						this.starnum = result.data.faUser.certificateLevel;
					}
				});
		},
		// 详情信息
		getinfo() {
			this.$axios
				.post('/api/faPublic/projectInfo', {
					id: this.projectID,
					type: this.projecttype
				})
				.then(res => {
					if (res.data.code == 0) {
						this.info = res.data.project;
						this.maxYynum = res.data.project.maxnum; //最大预约人数
						console.log('userid=========' + this.userId);
						this.$axios
							.post('/api/faUser/info', {
								// id: this.userId
								id: localStorage.getItem('fbUser')
							})
							.then(result => {
								if (result.data.code == 0) {
									if (result.data.faUser) {
										var projectUserInfo = result.data.faUser;
										this.starnum = projectUserInfo.certificateLevel;
										console.log('星星=' + this.starnum);
									}
								}
							});
					} else {
						this.$toast(res.data.msg);
					}
				});
		},
		// 获取评价
		pingjia() {
			this.$axios
				.post('/api/faMessage/list', {
					pId: this.projectID,
					type: this.projecttype
				})
				.then(res => {
					if (res.data.code == 0) {
						this.pingjiainfo = res.data.rows;
						if (this.pingjiainfo.length) {
							this.pingjiainfo.forEach(el => {
								this.pingjiascore += parseInt(el.star);
							});
							this.pjstander = parseInt(this.pingjiascore / this.pingjiainfo.length);
						}
					} else {
						this.$toast(res.data.msg);
					}
				});
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
.author {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 0.32rem;
	padding: 0 0.2rem;
	position: relative;
	background-color: white;
	padding-top: 0.2rem;
}

.author img {
	width: 0.36rem;
}

.author img:nth-child(2) {
	position: absolute;
	left: 0.65rem;
	bottom: 0;
}

.author span {
	margin: 0 0.1rem;
}

.author .tx {
	width: 0.72rem;
}

.author .star {
	width: 0.28rem;
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

.wrapper .name {
	color: #0172ff;
	overflow: hidden;
}

.wrapper .span {
	float: left;
}

.wrapper img {
	width: 0.24rem;
}

.textarea {
	border: 1px solid #f0f0f0;
	text-indent: 10px;
	line-height: 1.4;
}

.wrapper p {
	margin: 0.2rem 0;
}

.wrapper .pingjia {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.wrapper .pjcontent {
	display: flex;
	align-items: center;
	margin: 0.2rem 0;
	padding: 0 0.2rem;
}

.pjcontent img {
	width: 0.72rem;
}

.pjcontent span {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding-left: 0.1rem;
}

.btn {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
	display: flex;
}

.btn button {
	width: 50%;
	border: none;
	border-radius: none;
	font-size: 0.32rem;
}

.btn button:nth-child(1) {
	background-color: #0172ff;
	color: white;
}

.btn button:nth-child(2) {
	background-color: #cbe3ff;
	color: #0172ff;
}

.yy {
	width: 4.6rem;
	padding: 0.4rem;
	font-size: 0.32rem;
	background-color: white;
}

.yy .yycontent {
	margin: 0.4rem 0;
}

.yyBtn button:nth-child(1) {
	background-color: #f2f2f2;
	color: #737373;
}

.yyBtn button:nth-child(2) {
	background-color: #39b249;
	color: white;
}

.yy .yyBtn {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.yyBtn button {
	width: 40%;
	font-size: 0.32rem;
}

.van-popup--center {
	border: 1px solid #e2e4e6;
	border-radius: 8px;
}

.yy .van-cell {
	height: 100px;
	border: 1px solid #e2e4e6;
	border-radius: 8px;
}

.van-button--default {
	border-radius: 5px;
}

.yy .van-button {
	height: 36px;
	line-height: 34px;
}

.call {
	width: 4.6rem;
	padding: 0.4rem;
}

.call button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	font-size: 0.32rem;
}

.call button:nth-child(1) {
	margin: 0.2rem 0;
}

.callBtn button:nth-child(2) {
	background-color: #f2f2f2;
	color: #737373;
}

.callBtn button:nth-child(1) {
	background-color: #39b249;
	color: white;
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

.color_red {
	color: red;
	font-size: 26px;
}

.app >>> .van-dialog__header {
	padding-bottom: 10px !important;
}
</style>
