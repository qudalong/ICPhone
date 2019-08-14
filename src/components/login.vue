<template>
	<div class="app">
		<div class="headers"><van-nav-bar title="登录" /></div>
		<div class="content">
			<img src="../assets/swiper3.png" alt class="logo" />
			<div class="ipt">
				<van-field v-model="phone" type="tel" placeholder="输入手机号" />
				<img src="../assets/name.png" alt srcset />
			</div>
			<div class="ipt" v-show="!passlogin">
				<van-field v-model="password" type="password" placeholder="输入密码" />
				<img src="../assets/password.png" alt srcset />
			</div>
			<div class="ipt iptCode" v-show="passlogin">
				<img src="../assets/code.png" alt srcset />
				<van-cell-group>
					<van-field
						v-model="sms"
						type="tel"
						center
						clearable
						label="短信验证码"
						placeholder="请输入短信验证码"
					>
						<van-button
							slot="button"
							:disabled="codeSended"
							size="small"
							type="primary"
							@click="sendcode"
						>
							{{ time }}
						</van-button>
					</van-field>
				</van-cell-group>
			</div>

			<van-button type="info" @click="toMine">登录</van-button>
			<div class="func">
				<div @click="toRegister">免费注册</div>
				<div @click="logType">{{ loginType }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
import axios from 'axios'
// Vue.component(Field.name, Field);
export default {
	name: 'login',
	data() {
		return {
			phone: '',
			password: '',
			sms: '',
			passlogin: false,
			loginType: '短信登录',
			getcode: '', //验证码,
			codeSended: false,
			time: '验证码'
		};
	},
	created() {
		// 		if(window.localStorage.getItem('token')!='nudefined'){
		// 			localStorage.setItem('token',window.localStorage.getItem('token'))
		// 		}
		//

		console.log('login_create....................');

		if (this.$route.params.id) {
			this.passlogin = false;
		}
	},
	methods: {
		...mapMutations(['setToken']),
		// 登陆成功
		toMine() {
			if (!this.phone) {
				this.$toast('手机号不能为空');
				return;
			}
			if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)) {
				this.$toast('请输入正确的手机号');
				return;
			}
			if (!this.passlogin) {
				console.log(this.passlogin);
				if (!this.password) {
					this.$toast('密码不能为空');
					return;
				}
				if (!/[0-9a-zA-Z]+/.test(this.password)) {
					this.$toast('密码只能是数字或字母');
					return;
				}
			}

			if (this.passlogin) {
				console.log(this.passlogin);
				if (!this.sms) {
					this.$toast('验证码不能为空');
					return;
				}
				if (this.getcode != this.sms) {
					this.$toast('验证码输入错误');
					return;
				}
			}
			if (this.passlogin) {
				let obj = {
					mobile: this.phone
				};
				this.$axios.post('/api/faUser/yanzlogin', obj).then(res => {
					if (res.data.code == 0) {
						axios.defaults.headers.common['token'] = res.data.user.token
						console.log('token='+res.data.user.token);
						localStorage.setItem('token', res.data.user.token);
						localStorage.setItem('userid', res.data.user.id);
						this.$router.push({ name: 'mine' });
					} else {
						this.$toast(res.data.msg);
					}
				});
			} else {
				let obj = {
					mobile: this.phone,
					password: this.password
				};
				this.$axios.post('/api/faUser/login', obj).then(res => {
					// this.$axios.post("/api/faUser/login", obj).then(res => {
					if (res.data.code == 0) {
						axios.defaults.headers.common['token'] = res.data.user.token
						this.setToken({ token: res.data.user.token });
						// this.$store.state.token=res.data.user.token
						// this.$store.commit('setToken')
						localStorage.setItem('token', res.data.user.token);
						localStorage.setItem('userid', res.data.user.id);
						this.$router.push({ name: 'mine' });
					} else {
						this.$toast(res.data.msg);
					}
				});
			}
		},
		toRegister() {
			this.$router.push({ name: 'regis' });
		},
		// 切换登录
		logType() {
			this.passlogin = !this.passlogin;
			if (this.passlogin) {
				this.loginType = '密码登录';
			} else {
				this.loginType = '短信登录';
			}
		},
		// 倒计时
		startCountDown() {
			this.codeSended = true;
			var time = 60;
			// this.time = time;
			const intval = setInterval(() => {
				this.time = time--;
				if (this.time === 0) {
					this.codeSended = false;
					this.time = '重新发送';
					clearInterval(intval);
				}
			}, 1000);
		},
		//获取验证码
		sendcode() {
			if (!this.phone) {
				this.$toast('手机号不能为空');
				return;
			}
			if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)) {
				this.$toast('请输入正确的手机号');
				return;
			}
			this.$axios
				.post('/api/faUser/send-message', {
					mobile: this.phone
				})
				.then(res => {
					this.startCountDown();
					this.getcode = res.data.msg;
				});
		}
	}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app {
	padding: 0.2rem;
	background-color: white;
	font-size: 0.32rem;
}

.content {
	margin: 46px auto 60px;
}

.app .logo {
	width: 100%;
	vertical-align: top;
	margin-bottom: 0.2rem;
	border-radius: 8px;
}

.ipt {
	position: relative;
	margin-bottom: 0.2rem;
}

.ipt img {
	width: 0.5rem;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0.2rem;
	margin: auto 0;
	z-index: 5;
}

.ipt >>> .van-field__control {
	padding-left: 0.6rem;
}

.iptCode >>> .van-field__control {
	padding-left: 0;
}

.ipt >>> .van-cell:not(:last-child)::after {
	border-bottom: none;
}

.van-button--normal {
	width: 100%;
	padding: 0.1rem auto;
	font-size: 0.32rem;
}

.func {
	display: flex;
	justify-content: space-between;
	color: #0172ff;
	margin-top: 0.2rem;
}

.code {
	border-left: 1px solid #e6e6e6;
	padding: 0 0.2rem;
	color: #0172ff;
}

.van-cell {
	border: 1px solid #e6e6e6;
	border-radius: 8px;
}

.iptCode .van-cell {
	padding: 7px 15px;
	padding-left: 0.6rem;
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
