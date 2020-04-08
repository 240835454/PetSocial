<template>
	<view class="index">
		<!-- 头部新建 -->
		<view class="top">
			<text class="add" @click="add">新建</text>
		</view>
		<!-- 头部选项 -->
		<view class="nav">
			<view class="item" v-for="(item,index) in tabList" :key="index" @click="changeTab(index)">
				<text :class="index === activeIndex ? 'active' : ''">{{item}}</text>
			</view>
		</view>
		<Detail v-if="activeIndex === 0"></Detail>
		<Charts v-if="activeIndex === 1" :list='list'></Charts>
	</view>
</template>

<script>
	import Charts from './components/charts.vue'; 
	import Detail from './components/detail.vue'
	export default {
		components:{
			Charts,
			Detail
		},
		data() {
			return {
				tabList: ["明细", "图表"],
				activeIndex: 0,
			}
		},
		onShow(){
			if(this.activeIndex === 0){
				this.activeIndex = 1;
				this.$nextTick(function(){
					this.activeIndex = 0
				})
			}else{
				this.activeIndex = 0;
				this.$nextTick(function(){
					this.activeIndex = 1
				})
			}
		},
		methods: {
			changeTab(e) {
				this.activeIndex = e;
			},
			add() {
				uni.navigateTo({
					url: './addAccount'
				})
			},
		}
	}
</script>

<style lang="less">
	.index {
		padding-bottom: 100upx;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		margin-top: 140upx;
		background-color: #FFFFFF;
	} 

	page {
		background: #fff;
		width: 750upx;
		overflow-x: hidden;
	}

	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.top {
		height: 70upx;
		line-height: 70upx;
		padding-right: 40upx;
		background-color: #F2473D;
		color: #fff;
		text-align: right;

		.add {}
	}


	.nav {
		position: relative;
		// top: 70upx;
		display: flex;
		justify-content: space-around;
		width: 100%;
		padding: 20upx;
		background-color: #fff;
		margin: 0;
		box-sizing: border-box;
		box-shadow: 1rpx 1rpx 10rpx 1rpx rgba(188, 188, 188, 0.3);
		z-index: 10;

		.item {
			display: flex;
			align-items: center;

			// color: #999;
			.icon {
				width: 35upx;
				height: 35upx;
				padding-right: 30upx;
			}

			.active {
				color: #F2473D;
			}

			&:last-child {
				&::before {
					content: '';
					position: absolute;
					left: 50%;
					width: 2upx;
					height: 30upx;
					background-color: #ccc;
				}
			}
		}
	}

	.box {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		margin-top: 50upx;
		height: 300upx;

		.box-item {
			display: flex;
			align-items: center;

			.date-icon {
				width: 48upx;
				height: 48upx;
			}

			.input {
				margin-left: 10upx;
				padding: 10upx;
				border: 2upx solid #ccc;
				border-radius: 10upx;
			}
		}
	}

	.costList {
		.item {
			display: flex;
			// flex-direction: column;
			align-items: center;
			font-size: 24upx;
			position: relative;
			padding: 10upx 20upx;
			border-top: 1upx solid #ccc;

			&:last-child {
				border-bottom: 1upx solid #ccc;
			}

			.item-icon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 60upx;
				height: 60upx;
				border-radius: 50%;

				.icon {
					width: 36upx;
					height: 36upx;
				}
			}

			.name {
				display: block;
				padding-left: 20upx;
				// margin-top: 5upx;
			}

			.price {
				position: absolute;
				right: 20upx;

				&::before {
					content: '￥'
				}
			}
		}
	}
</style>
