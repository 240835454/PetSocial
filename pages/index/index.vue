<template>
	<view class="content">
		<scroll-view scroll-y="true" style="height:100%;white-space:nowrap" @scroll="getHeight">
			<view class='list-group' v-for="item in list" :key='item'>
				<view class="title">
					{{item.Title}}
				</view>
				<template v-for='info in item.List'>
					<view class='item' :key='info'>
						<image :src="info.icon" mode="" lazy-load="true" class='icon'></image>
						<text>{{info.name}}</text>
					</view>
				</template>
			</view>
		</scroll-view>
		<!-- 		<view class="">
			<template v-for="item in list ">
				<text :key='item'>{{item.Title}}</text>
			</template>
		</view> -->
		<view class="list-fixed" :class="fixedTitle == '' ? 'hide' : ''">
			<view class="fixed-title">
				{{fixedTitle}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatList
	} from '../../util/js/formatList.js';
	export default {
		data() {
			return {
				title: 'Hello',
				list: []
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			getList() {
				uni.request({
					url: 'http://localhost:3000/qita',
					success: res => {
						let dataList = res.data;
						let arr = formatList(dataList, 'firstWord')
						console.log(arr);
						this.list = arr;
					},
					fail: err => {
						console.log(err);
					}
				})
			},
			getHeight(e) {
				console.log(e);
				// let lHeight = [],
				// 	that = this;
				// let height = 0;
				// lHeight.push(0);
				// let query = uni.createSelectorQuery();
				// query.selectAll('.list-group').boundingClientRect(function(rects) {
				// 	console.log(rects);
				// 	let rect = rects,
				// 		len = rect.length;
				// 	for (let i = 0; i < len; i++) {
				// 		height += rect[i].height;
				// 		lHeight.push(height);
				// 	}
				// }).exec(); 
			}
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
	}

	.content {
		.title {
			padding: 2rpx 10rpx;
			background-color: #f7f7f7;
		}

		.item {
			display: flex;
			align-items: center;
			padding: 20upx;
			border-bottom: 1upx solid #f5f5f5;

			.icon {
				width: 90upx;
				height: 90upx;
				margin-right: 20upx;
				border-radius: 50%;
			}
		}
	}
</style>
