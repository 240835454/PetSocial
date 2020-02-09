<template>
	<view class="page">
		<view class="content" v-show='Register'>
			<view class="logo-box">
				<image src="../../static/icon_login_logo.png" mode="" class="logo"></image>
			</view>
			<view class="item">
				<text class='name'>手机号码</text>
				<input type="text" placeholder="请输入您的手机号码" placeholder-class="color" v-model="account" class='input' />
			</view>
			<view class="item">
				<text class='name'>手机验证码</text>
				<input type="text" placeholder="请输入验证码" placeholder-class="color" v-model="msgCaptcha" class='input' />
				<button class="button" @click='getCode' v-if="show">获取验证码</button>
				<button class="button" disabled="true" v-if="!show">重新发送{{count}}s</button>
			</view>
			<view class="go-login">
				<text @click='goLogin'>去登录</text>
			</view>
			<view class="footer">
				<text class='commit' @click='commitRegister'>注册账号</text>
			</view>
		</view>
		<view class="content" v-show="!Register">
			<view class="logo-box">
				<image src="../../static/icon_login_logo.png" mode="" class="logo"></image>
			</view>
			<view class="info-box">
				<view class="item">
					<text class='name'>新密码</text>
					<input type="text" placeholder="请输入新密码" placeholder-class="color" v-model="name" class='input' />
				</view>
				<view class="item">
					<text class='name'>确认密码</text>
					<input type="text" placeholder="请再次输入密码" placeholder-class="color" v-model="name" class='input' />
				</view>
			</view>
			<view class="footer">
				<text class='commit' @click='Login'>登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import '@/public/css/login/common.less';
	import md5 from '../../public/js/md5.js';
	export default {
		data() {
			return {
				Register: true,
				account: '',
				msgCaptcha: '',
				show: true,
				timer: null,
				count: ''
			}
		},
		onLoad() {
			this.changeCaptcha();
		},
		onHide(){
			clearInterval(this.timer);
		},
		methods: {
			// 注册
			commitRegister() {
				// let cookie = uni.getStorageSync('cookieKey');
				// let config = {
				//     headers:{}
				// };
				// if(cookie){
				//     config.headers.Cookie = cookie;
				// }
				if (this.account != '' && this.msgCaptcha != '') {
					this.$http.post('/Login/register', {
						account: this.account,
						msgCaptcha: this.msgCaptcha,
					}).then(res => {
						if (res.code != 1) {
							uni.showToast({
								icon: 'none',
								title: res.message
							})
						} else {
							let token = 'Bearer ' + res.data.token;
							uni.setStorageSync('token', token);
							uni.showToast({
								icon: 'success',
								title: res.message
							})
							setTimeout(() => {
								uni.navigateTo({
									url: 'setPassword'
								})
							}, 1000)
						}
					}).catch(err => {
						uni.showToast({
							icon: 'none',
							title: '系统错误，请稍后再试!'
						})
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '请将信息填写完整！'
					})
				}
			},
			// 去登录页面
			goLogin() {
				uni.navigateTo({
					url: './login'
				})
			},
			// 获取手机验证码
			getCode() {
				if (this.account == '') {
					uni.showToast({
						title: '请输入手机号码！',
						icon: 'none'
					})
				} else {
					this.$http.get('/Login/captcha', {
						account: this.account,
						type: 2
					}).then(res => {
						const TIME_COUNT = 60;
						if (!this.timer) {
							this.count = TIME_COUNT;
							this.show = false;
							this.timer = setInterval(() => {
								if (this.count > 0 && this.count <= TIME_COUNT) {
									this.count--;
								} else {
									this.show = true;
									clearInterval(this.timer);
									this.timer = null;
								}
							}, 1000)
						}
						if (res.code === 1) {

						} else {
							uni.showToast({
								icon: 'none',
								title: res.message
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="less">
</style>
