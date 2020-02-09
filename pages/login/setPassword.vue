<template>
	<view class="page">
		<view class="content">
		    <view class="logo-box">
		        <image src="../../static/icon_login_logo.png" mode="" class="logo"></image>
		    </view>
		    <view class="info-box">
		        <view class="item">
		            <text class='name'>新密码</text>
		            <input type="password" placeholder="请输入新密码" placeholder-class="color" v-model="password" class='input' />
		        </view>
		        <view class="item">
		            <text class='name'>确认密码</text>
		            <input type="password" placeholder="请再次输入密码" placeholder-class="color" v-model="confirmPassword" class='input' />
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
	export default{
		data(){
			return {
				password: '',
				confirmPassword: ''
			}
		},
		methods:{
			// 登录
			Login() {
			    this.$http.post('/Login/setPassword', {
			            password: md5.md5(this.password),
						confirmPassword: md5.md5(this.confirmPassword)
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
			                uni.showToast({
			                    icon: 'none',
			                    title: '登录成功!',
			                    duration: 1000,
			                    success: res => {
			                        setTimeout(() => {
			                            uni.switchTab({
			                                url: '../community/community'
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
		}
	}
</script>

<style>
</style>
