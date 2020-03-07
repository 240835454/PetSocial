<template>
	<view id="moments">
		<!-- 		<swiper :indicator-dots="true" indicator-color="rgb(255,255,255,0.6)" indicator-active-color="#F2473D" :autoplay="true" :interval="3000" :duration="1000" :circular="true" class="swiper-box">
			<swiper-item v-for="(item,index) in imageList" :key="index">
				<image :src="item" mode="widthFix" class="banner_img"></image> 
			</swiper-item>
		</swiper> -->
		<view class="home-pic">
			<image :src="api + info.bgImage" mode="scaleToFill" class='cover-pic'></image>
			<view class="home-pic-base"> 
				<view class="top-pic">
					<image class="header" :src="api + info.avatar"></image>
				</view> 
				<view class="top-name">{{info.name}}</view>
			</view> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// back: 'http://192.168.1.110:3000/image/1581851328227.jpg',
				current: 0,
				now_page: 1,
				size: 10,
				info: {},
				post: [],
				api: this.$API,
				total: '' 
			}
		},
		onLoad() {
			this.getList();
			this.getUserInfo();
		},
		methods: {
			getList() { 
				let account = uni.getStorageSync('account');
				this.$http.get('/User/myAlbum', {
						// index: this.now_page, 
						// size: this.size 
					})
					.then(res => {
						this.post = res.data.list;
						// this.total = res.data.total;
						for (let i = 0; i < this.post.length; i++) {
							for (let j = 0; j < this.post[i].likeList.length; j++) {
								if (this.post[i].likeList[j].uid == account) {
									this.post[i].islike = 1;
								}
							}
						} 
						console.log(this.post);
					})
					.catch(err => {
						uni.showToast({
							icon: 'none',
							title: '系统错误，请稍后再试'
						}) 
					})
			},
			getUserInfo() {
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
		}
	}
</script>

<style lang="less">
	@import url("../../public/css/community/index.css");

	.top {
		position: fixed;
		width: 100%;
		height: 0upx;
		// top: 30upx;
		// right: 30upx;
		z-index: 50;
	}

	.cover-pic {
		width: 100%;
		// margin-top: -150upx;
		position: absolute;
		top: 0;
		height: 500upx;
		z-index: -1;
		background-size: contain;
		// margin-bottom: 50upx
	}

	// .content {
	// 	display: flex;
	// 	flex-direction: column;
	// 	.swiper-box{
	// 		width: 100%;
	// 		height: 400upx;
	// 		.banner_img{
	// 			width: 100%;
	// 		}
	// 	}
	// }
</style>
