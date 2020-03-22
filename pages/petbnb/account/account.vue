<template>
	<view class="">
		<!-- 头部新建 -->
		<view class="top">
			<text class="add" @click="add">新建</text>
		</view>
		<!-- 头部选项 -->
		<view class="nav">
			<view class="item">
				<text>明细</text>
			</view>
			<view class="item" @click="enterChat">
				<text>图表</text>
			</view>
		</view> 
		<view class="qiun-columns"> 
			<view class="qiun-charts">
				<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '../../../js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaColumn = null;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: ''
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			getServerData() {
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data: {},
					success: function(res) {
						console.log(res.data.data)
						let Ring = {
							series: []
						};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						Ring.series = res.data.data.Ring.series;
						_self.showRing("canvasRing", Ring);
					},
					fail: () => {
						_self.tips = "网络错误，小程序端请检查合法域名";
					},
				});
			},
			showRing(canvasId, chartData) {
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: true,
					title: {
						name: '70%',
						color: '#7cb5ec',
						fontSize: 20 * _self.pixelRatio,
						offsetY: -10 * _self.pixelRatio,
					},
					subtitle: {
						name: '收益率',
						color: '#666666',
						fontSize: 15 * _self.pixelRatio,
						offsetY: 10 * _self.pixelRatio,
					},
					extra: {
						pie: {
							offsetAngle: -45,
							ringWidth: 20 * _self.pixelRatio,
							labelWidth: 15
						}
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,
				});
			},
			touchRing(e) {
				canvaRing.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
			add(){
				uni.navigateTo({
					url: './addAccount'
				})
			}
		}
	}
</script>

<style lang="less">
	.charts {
		width: 750upx; 
		height: 500upx;
		margin-top: 140upx;
		background-color: #FFFFFF;
	} 
	
	page{background:#F2F2F2;width: 750upx;overflow-x: hidden;}
	.qiun-padding{padding:2%; width:96%;}
	.qiun-wrap{display:flex; flex-wrap:wrap;}
	.qiun-rows{display:flex; flex-direction:row !important;}
	.qiun-columns{display:flex; flex-direction:column !important;}
	.qiun-common-mt{margin-top:10upx;}
	.qiun-bg-white{background:#FFFFFF;}
	.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
	.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
	.qiun-charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
	.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}

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
		position: fixed;
		top: 70upx;
		display: flex;
		justify-content: space-around;
		width: 100%;
		padding: 20upx;
		background-color: #fff;
		margin: 0;
		box-sizing: border-box;
		box-shadow: 0 5rpx 30rpx 10rpx rgba(188, 188, 188, 0.3);
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
</style>
