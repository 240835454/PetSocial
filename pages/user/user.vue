<template>
	<view class="page">
		<view class="title">
		</view>
		<view class="info-box">
			<image :src="info.avatar == '' || info.avatar == null ? 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578213813322&di=1f2177f6866877aa42baf3ebc5349c90&imgtype=0&src=http%3A%2F%2Fi8.qhimg.com%2Ft01dd2c0ec7f953404e.jpg' : api + info.avatar"
			 mode="aspectFill" class="avatar" @click='changeAvatar'></image>
			<view class="name">
				<view class="top">
					<text class='username' @click='changeInfo'>{{info.name}}</text>
					<image src="../../static/nan.png" mode="" class='icon_level' v-if='info.gender == 0'></image>
					<image src="../../static/nv.png" mode="" class='icon_level' v-if='info.gender == 1'></image>
				</view>
				<view class="">
					<text>{{info.region}}</text>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="item arrow" @click='enterMyInfo'>
				<image src="../../static/icon_info.png" mode="aspectFit" class="icon"></image>
				<text class="name">个人资料</text>
			</view>
			<view class="item arrow" @click='myPet'>
				<image src="../../static/icon_pet.png" mode="aspectFit" class="icon"></image>
				<text class="name">我的宠物</text>
			</view>
			<view class="item arrow" @click='changePhoneNumber'>
				<image src="../../static/icon_guanzhu.png" mode="aspectFit" class="icon"></image>
				<text class="name">我的关注</text>
			</view>
			<view class="item arrow" @click='enterMyAlbum'>
				<image src="../../static/icon_xiangce.png" mode="aspectFill" class="icon"></image>
				<text class="name">我的相册</text>
			</view>
			<view class="item arrow">
				<image src="../../static/icon_collect.png" mode="aspectFit" class="icon"></image>
				<text class="name">我的收藏</text>
			</view>
			<view class="item arrow" @click="exit">
				<image src="../../static/icon_logout.png" mode="aspectFill" class="icon"></image>
				<text class="name">退出登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				api: this.$API
			}
		},
		onLoad() {
			this.getList();
		},
		onShow() {
			this.getList();
		},
		methods: {
			getList() {
				this.$http.get('/User/userInfo')
					.then(res => {
						this.info = res.data;
					})
					.catch(err => {
						uni.showToast({
							icon: 'none',
							title: '请重新登录'
						})
					})
			},
			changeAvatar() {
				let that = this;
				uni.chooseImage({
					count: 1,
					success: res => {
						console.log(res);
						this.$http.uploadFile(res.tempFilePaths[0]).then(res => {
								this.$http.put('/User/changeAvatar', res.data)
									.then(res => {
										if(res.code === 1){
											uni.showToast({
												icon: 'success',
												title: '修改成功!',
												success: res => {
													that.getList();
												}
											})
										}
									})
									.catch(err => {
										uni.showToast({
											icon: 'none',
											title: '系统错误，请稍后再试!'
										})
									})
							})
							.catch(err => {
								uni.showToast({
									icon: 'none',
									title: '系统错误，请稍后再试!'
								})
							})
					}
				})
			},
			enterMyInfo() {
				uni.navigateTo({
					url: 'myInfo'
				})
			},
			enterMyAlbum(){
				uni.navigateTo({
					url: 'myAlbum'
				}) 
			},
			changeIdCard() {
				uni.navigateTo({
					url: 'changeIdCard'
				})
			},
			changePhoneNumber() {
				uni.navigateTo({
					url: 'changePhoneNumber'
				})
			},
			changePassword() {
				uni.navigateTo({
					url: 'changePassword'
				})
			},
			enterDetail() {
				uni.navigateTo({
					url: 'myCommission'
				})
			},
			// 退出
			exit() {
				uni.showModal({
					title: '提示',
					content: '确认退出登录？',
					success: res => {
						if (res.confirm) {
							uni.removeStorageSync('token');
							uni.removeStorageSync('account');
							uni.redirectTo({
								url: '../login/login'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang='less'>
	page {
		background-color: #f7f7f7;
	}

	.title {
		height: 200upx;
		background-color: #F2473D;
		border-radius: 0 0 50upx 50upx;
	}

	.info-box {
		position: absolute;
		top: 40upx;
		display: flex;
		width: calc(100% - 40upx);
		height: 260upx;
		padding: 60upx 36upx 77upx 45upx;
		box-sizing: border-box;
		margin: 0 20upx;
		z-index: 5;
		background-color: #fff;
		border-radius: 15px;

		.avatar {
			width: 120upx;
			height: 120upx;
			margin-right: 40upx;
			border-radius: 50%;
		}

		.name {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.icon_level {
				width: 42upx;
				height: 42upx;
				margin: 10upx;
			}

			.level,
			.salary {
				color: #4f79e8;
			}

			.salary {
				margin-left: 34upx;
			}

			.top {
				display: flex;
				align-items: center;

				.username {
					display: block;
					/* width: 150upx; */
				}
			}
		}

		&::after {
			border: solid #cccccc;
			border-width: 3rpx 3rpx 0 0;
			content: " ";
			top: 50%;
			transform: translateY(-50%);
			right: 40rpx;
			position: absolute;
			width: 18rpx;
			height: 18rpx;
			-webkit-transform: translateY(-50%) rotate(45deg);
			transform: translateY(-50%) rotate(45deg);
		}
	}

	.content {
		box-sizing: border-box;
		padding-bottom: 100upx;
		margin: 120upx 20upx 30upx;
		background-color: #fff;
		border-radius: 15upx;

		.item {
			display: flex;
			align-items: center;
			padding: 30upx 20upx;
			border-bottom: 1upx solid #e6e6e6;

			.name {
				display: inline-block;
				color: #333333;
			}

			.icon {
				width: 40upx;
				height: 40upx;
				margin: 0 20upx;
			}

			.detail {
				position: absolute;
				display: inline-block;
				right: 80upx;
				color: #999999;
				font-size: 30upx;
			}
		}

		.arrow {
			position: relative;

			&::after {
				border: solid #cccccc;
				border-width: 3rpx 3rpx 0 0;
				content: " ";
				top: 50%;
				transform: translateY(-50%);
				right: 40rpx;
				position: absolute;
				width: 18rpx;
				height: 18rpx;
				-webkit-transform: translateY(-50%) rotate(45deg);
				transform: translateY(-50%) rotate(45deg);
			}
		}
	}
</style>
