<template>
	<view class="content">
		<view class="pet-box">
			<view class="pet-title">
				<text>成长中心</text><text @click="addPet">添加宠物</text>
			</view>
			<view class="pet-content">
				<text class="no-pet">添加宠物更多惊喜</text>
			</view>
		</view>
		<view class="tabBar-box">
			<view class="flex">
				<view class="item" @click='enterEncyclopedia'>
					<image src="../../static/18.png" mode="aspectFill"></image>
					<view class="text-box">
						<text>宠物百科</text> 
						<text class='en-text'>Pet encyclopedia</text>
					</view>
				</view>
				<view class="item" @click='enterHealth'>
					<image src="../../static/19.png" mode="aspectFill"></image>
					<view class="text-box">
						<text>记账本</text>
						<text class='en-text'>Account book</text>
					</view>
				</view>
			</view>
			<view class="flex">
				<view class="item" @click='enterBladder'>
					<image src="../../static/20.png" mode="aspectFill"></image>
					<view class="text-box">
						<text>精选文章</text>
						<text class='en-text'>Featured Posts</text>
					</view>
				</view>
				<view class="item" @click='enterOnline'>
					<image src="../../static/22.png" mode="aspectFill"></image>
					<view class="text-box">
						<text>同城服务</text>
						<text class='en-text'>Urban service</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			// 进入宠物百科
			enterEncyclopedia(){
				uni.navigateTo({
					url: './encyclopedia/encyclopedia'
				})
			},
			// 添加宠物信息
			addPet(){
				uni.navigateTo({
					url: './pet/addPet'
				})
			}
		}  
	}   
</script>

<style lang="less">
	page{
		background-color: #f9f9f9;
	}
	
	.content{
	}
	.pet-box{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 400upx;
		background-color: rgba(0,255,255,0.2);
		.pet-title{
			display: flex;
			width: 90%;
			justify-content: space-between;
			color: rgba(0,55,255,0.4);
			text{
				display: block;
				padding-bottom: 10upx;
			}
		}
		.pet-content{
			position: relative;
			width: 90%;
			height: 300upx;
			border-radius: 10upx;
			background-color: #fff;
			.no-pet{
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				color: #ccc;
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
