<template>
	<view class="">
		<view class="qiun-columns">
			<view class="qiun-charts">
				<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas>
			</view>
		</view>
		<view class="box">
			<view class="box-item" @click="showPicker">
				<image src="../../../../static/date.png" mode="" class="date-icon"></image>
				<input type="text" v-model='date' class="input" placeholder="选择日期" disabled />
			</view>
		</view>
		<w-picker mode="yearMonth" @confirm="pickTime" ref="picker" startYear="2016" endYear="2020">
		</w-picker>
		<view class="costList">
			<view class="item" v-for="(item,index) in list" :key="item.id">
				<view class="item-icon" :style="{'background-color': item.color}">
					<image :src="item.icon" mode="" class="icon"></image>
				</view>
				<text class="name">{{item.name}}</text>
				<text class="price">{{item.cost}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import uCharts from '../../../../js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaColumn = null;
	export default{
		components: {
			wPicker
		},
		data(){ 
			return{
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				total: 0,
				date: '',
				list: []
			}
		}, 
		created() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			let currentDate = new Date();
			let year = currentDate.getFullYear();
			let month = currentDate.getMonth() + 1;
			if (month < 10) {
				month = '0' + month;
			}
			let nowDate = year + '-' + month;
			this.date = nowDate;
			this.getServerData();
		},
		onShow() {
			this.getServerData();
		},
		methods: {
			getServerData() {
				this.$http.get('/petbnb/getAccountList', {
						date: this.date
					})
					.then(res => {
						this.list = res.data.list;
						for (let i of res.data.list) {
							i.data = parseInt(i.cost);
							i.icon = this.$API + "/image/account_" + `${i.type_id}` + ".png"
						}
						let Ring = {
							series: []
						};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						if (this.list.length == 0) {
							this.total = 0;
							Ring.series = [{
								color: 'skyblue',
								data: 0,
								name: '暂无'
							}]
						} else {
							this.total = res.data.sum;
							Ring.series = res.data.list;
						}
						_self.showRing("canvasRing", Ring);
					})
			},
			showRing(canvasId, chartData) {
				let canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: true,
					title: {
						name: '总支出',
						color: '#7cb5ec',
						fontSize: 20 * _self.pixelRatio,
						offsetY: -10 * _self.pixelRatio,
					},
					subtitle: {
						name: '￥' + _self.total,
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
			showPicker() {
				this.$refs.picker.show();
			},
			pickTime(e) {
				this.date = e.result;
				this.getServerData();
			}
		}
	}
</script>

<style>
	.charts {
		width: 750upx;
		height: 500upx;
		margin-top: 140upx;
		background-color: #FFFFFF;
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
</style>
