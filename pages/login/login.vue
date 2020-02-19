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
				<text class='name'>密码</text>
				<input type="password" placeholder="请输入您的密码" placeholder-class="color" v-model="password" class='input' />
			</view>
			<view class="go-login">
				<text @click='changeType'>短信验证码登录</text>
			</view>
			<view class="footer">
				<text class='commit' @click='Login'>登录</text>
			</view>
		</view>
		<view class="content" v-show="!Register">
			<view class="logo-box">
				<image src="../../static/icon_login_logo.png" mode="" class="logo"></image>
			</view>
			<view class="item"> 
				<text class='name'>手机号码</text>
				<input type="text" placeholder="请输入您的手机号码" placeholder-class="color" v-model="account" class='input' />
			</view>
			<view class="item">
				<text class='name'>短信验证码</text>
				<input type="text" placeholder="请输入短信验证码" placeholder-class="color" v-model="msgCaptcha" class='input' />
				<button class="button" @click='getCode' v-if="show">获取验证码</button>
				<button class="button" disabled="true" v-if="!show">重新发送{{count}}s</button>
			</view>
			<view class="go-login">
				<text @click='changeType'>账号密码登录</text>
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
				password: '',
				msgCaptcha: '',
				show: true,
				timer: null,
				count: ''
			}
		},
		onHide(){
			clearInterval(this.timer);
		},
		methods: {
			changeType() {
				this.Register = !this.Register;
			},
			Login() {
				uni.removeStorageSync('token');
				this.$http.post('/Login/login', {
						account: this.account,
						password: md5.md5(this.password),
						msgCaptcha: this.msgCaptcha
					})
					.then(res => {
						if (res.code != 1) {
							uni.showToast({
								icon: 'none',
								title: res.message
							})
						} else {
							let token = 'Bearer ' + res.data.token;
							uni.setStorageSync('token', token);
							uni.setStorageSync('account',this.account);
							uni.showToast({
								icon: 'none',
								title: '登录成功!',
								duration: 1000,
								success: res => {
									setTimeout(() => {
										uni.switchTab({
											url: '../petbnb/petbnb' 
										})
									}, 1000)
								}
							})
						}
					})
					.catch(err => {
						uni.showToast({
							icon: 'none',
							title: '登录失败'
						})
						console.log('登录' + err);
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
						type: 1
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
			},
			// 改变图片验证码
			changeCaptcha() {
				this.i += 1;
				this.captchaImg = 'http://192.168.1.250:8051/api/Distribution/Captcha?id=' + this.i
			},
		}
	}
</script>

<style lang="less">
</style>
