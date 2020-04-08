<template>
	<view class="content">
		<view class="pet-box">
			<view class="pet-title">
				<text>成长中心</text><text @click="addPet">添加宠物</text>
			</view>
			<view class="pet-content">
				<text class="no-pet" @click="addPet" v-if="petList.length === 0">添加宠物更多惊喜</text>
				<swiper :indicator-dots="true" :indicator-active-color="'rgba(0,255,255,0.4)'" :autoplay="true" :indicator-color="'rgba(0,0,0,0.2)'" :interval="3000" :duration="1000" class="swiper-box">
					<swiper-item v-for="(item,index) in petList" :key="index" class="swiper-item">
						<view class="">
							<view class="top">
								<image :src="api + item.avatar" mode="aspectFill" class="avatar"></image>
								<text class="name">{{item.name}}</text>
								<image src="../../static/nan.png" mode="" class='icon_level' v-if='item.gender == 1'></image>
								<image src="../../static/nv.png" mode="" class='icon_level' v-if='item.gender == 2'></image>
								<text>{{item.day}}天陪伴</text>
							</view>
							<view class="bbb">
								<text class="breed">{{item.breed}}</text>
								<text>{{item.state}}</text>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="tabBar-box">
			<view class="flex">
				<view class="item" @click='enterEncyclopedia'>
					<image src="../../static/18.png" mode="aspectFill"></image>
					<view class="text-box">
						<text>宠物百科</text>
						<text class='en-text'>Pet Encyclopedia</text>
					</view>
				</view>
				<view class="item" @click='enterAccount'>
					<image src="../../static/19.png" mode="aspectFill"></image>
					<view class="text-box">
						<text>记账本</text>
						<text class='en-text'>Account Book</text>
					</view>
				</view>
			</view>
			<view class="flex">
				<view class="item" @click='enterArticle'>
					<image src="../../static/20.png" mode="aspectFill"></image>
					<view class="text-box">
						<text>精选文章</text>
						<text class='en-text'>Featured Posts</text>
					</view>
				</view>
				<view class="item" @click='enterService'>
					<image src="../../static/22.png" mode="aspectFill"></image>
					<view class="text-box">
						<text>同城服务</text>
						<text class='en-text'>Urban Service</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getPetList();
		},
		onShow(){
			this.getPetList();
		},
		data() {
			return {
				petList: [],
				api: this.$API
			}
		},
		methods: {
			// 进入宠物百科
			enterEncyclopedia() {
				uni.navigateTo({
					url: './encyclopedia/encyclopedia'
				})
			},
			// 获取用户宠物列表
			getPetList() {
				this.$http.get('/petbnb/getPetList')
					.then(res => {
						if (res.code === 1) {
							this.petList = res.data.list;
						}
					})
					.catch(err => {
 
					})
			},
			// 进入添加宠物信息页面
			addPet() {
				uni.navigateTo({
					url: './pet/addPet'
				})
			},
			// 进入记账本页面
			enterAccount(){
				uni.navigateTo({
					url: './account/account'
				})
			},
			// 进入文章页面
			enterArticle(){
				uni.navigateTo({
					url: './article/article'
				})
			},
			// 进入同城服务
			enterService(){
				uni.navigateTo({
					url: './service/service'
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f9f9f9;
	}

	.content {}

	.pet-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 400upx;
		background-color: rgba(0, 255, 255, 0.2);

		.pet-title {
			display: flex;
			width: 90%;
			justify-content: space-between;
			color: rgba(0, 55, 255, 0.4);

			text {
				display: block;
				padding-bottom: 10upx;
			}
		}

		.pet-content {
			position: relative;
			width: 90%;
			height: 300upx;
			border-radius: 10upx;
			background-color: #fff;

			.no-pet {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: #ccc;
				z-index: 10;
			}
		}

		.swiper-box {
			.swiper-item {
				padding: 20upx;
				box-sizing: border-box;

				.top {
					display: flex;

					.name {
						padding: 0 10upx;
					}

					.avatar {
						width: 120upx;
						height: 120upx;
						border-radius: 50%;
					}

					.icon_level {
						width: 42upx;
						height: 42upx;
						margin-top: 5upx;
						padding-right: 20upx;
					}
				}
				.bbb{
					display: flex;
					justify-content: space-between;
					padding: 20upx;
					.breed {
						display: block;
					}
				}
			}
		}
	}

	.tabBar-box {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 0 20upx 40upx;
		box-sizing: border-box;
	}

	.tabBar-box .flex {
		display: flex;
		justify-content: space-between;
		padding: 20px 0 0 0;
	}

	.tabBar-box .flex .item {
		width: 340rpx;
		background-color: #fff;
	}

	.text-box {
		padding: 30rpx;
		font-family: PingFang-SC-Medium;
		color: #80899c;
	}

	.tabBar-box .flex image {
		width: 100%;
		height: 255rpx;
	}

	.tabBar-box .flex text {
		display: block;
		font-size: 34rpx;
	}

	.tabBar-box .flex .en-text {
		position: relative;
		font-size: 20rpx;
	}
</style>
