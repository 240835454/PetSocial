<template>
	<view class="content list">
		<scroll-view scroll-y="true" class="scroll-box" :scroll-into-view="'NAV'+toNum" enable-back-to-top='true' scroll-with-animation='true' :scroll-top="scrollTop"
		 @scroll="scroll">
			<view class='list-group' v-for="(item,index) in list" :key='index'>
				<view class="title" :id="'NAV'+index">
					{{item.Title}}
				</view>
				<template v-for='(info,index) in item.List'>
					<view class='item' :key='index' @click="enterDetail(info.petBreedId)">
						<image :src="info.icon" mode="" lazy-load="true" class='icon'></image>
						<text>{{info.name}}</text>
					</view>
				</template>
			</view>
		</scroll-view> 
		<!-- 侧边字母导航 -->
		<view class="list-shortcut">
			<template v-for="(item,index) in list ">
				<text :key='index'  :data-id="item.Title" :data-index='index' @tap="scrollToview">{{item.Title}}</text>
			</template>
		</view>
		<!-- 固定在顶部的字母导航 -->
		<view class="list-fixed" :class="fixedTitle == '' ? 'hide' : ''" :style="{'transform':'translate3d(0,'+fixedTop+'px,0)'}">
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
	const TITLE_HEIGHT = 23;
	export default {
		data() {
			return {
				title: 'Hello',
				list: [],
				fixedTop: '',
				listHeight: [],
				height: 1000,
				currentIndex: 0,
				fixedTitle: '',
				scrollTop: 0,
				toNum: 0
			}
		},
		onLoad() {
			this.getList();
		},
		mounted() {
			this._calculateHeight();
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
			scroll(e) {
				// console.log(e);
				let newY = e.detail.scrollTop;
				this.scrollY(newY);
			},
			scrollY(newY) {
				const listHeight = this.listHeight;
				// 当滚动到顶部，newY>0
				if (newY == 0 || newY < 0) {
					// this.currentIndex = 0;
					this.fixedTitle = '';
					return;
				}
				// 在中间部分滚动 
				for (let i = 0; i < listHeight.length - 1; i++) {
					let height1 = listHeight[i]
					let height2 = listHeight[i + 1]
					if (newY >= height1 && newY < height2) {
						this.fixedTitle = this.list[i].Title;
						this.fixedTt(height2 - newY);
						// this.currentIndex = i;
						return 
					}
					// console.log(newY);
				}
				// 当滚动到底部，且-newY大于最后一个元素的上限
				this.currentIndex = this.listHeight.length - 2;
				this.fixedTitle = this.list[this.listHeight.length - 2].Title;
			},
			fixedTt(newVal) {
				let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0;
				if (this.fixedTop === fixedTop) {
					return
				}
				this.fixedTop = fixedTop;
			},
			_calculateHeight() {
				let that = this;
				setTimeout(function() {
					let lHeight = [];
					let height = 0
					lHeight.push(height);
					let query = uni.createSelectorQuery().in(that);
					query.selectAll('.list-group').boundingClientRect(data => {
						// console.log(data);
						let rect = data,
							len = rect.length;
						for (let i = 0; i < len; i++) {
							height += rect[i].height;
							lHeight.push(height);
						}
						that.listHeight = lHeight;
					}).exec();
					// let calHeight = setInterval(function() {
					// 	if (lHeight != [0]) {
					// 		this.listHeight = lHeight
					// 		clearInterval(calHeight);
					// 	}
					// }, 0)
				}, 500)
			},
			// 点击侧边导航栏跳转
			scrollToview(e) {
				let id = e.target.dataset.id;
				// this.currentIndex = e.target.dataset.index;
				this.toNum = e.target.dataset.index;
			},
			// 进入详情
			enterDetail(id){
				uni.navigateTo({
					url: ''
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
	}
	
	// .list{
	// 	  display: flex;
	// 	  flex-direction: column;
	// }

	.content {
		.scroll-box {
			height: calc(100vh - 23rpx) !important;
			white-space: nowrap !important;
		}

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

			&:last-child {
				border-bottom: none;
			}
		}
		
		.list-shortcut {
		  position: fixed;
		  z-index: 30;
		  right: 0;
		  top: 50%;
		  -webkit-transform: translateY(-50%);
		  transform: translateY(-50%);
		  width: 40rpx;
		  padding: 40rpx 0;
		  border-radius: 20rpx;
		  text-align: center;
		  background: rgba(0,0,0,.2);
		  font-family: Helvetica;
		}
		.list-shortcut text {
		  display: block;
		  padding: 8rpx;
		  line-height: 1;
		  color: #fff;
		  font-size: 24rpx;
		}
		.current{
		  color: #ffcd32 !important;
		}

		.list-fixed {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
		}

		.fixed-title {
			padding: 2rpx 10rpx;
			background-color: #f7f7f7;
		}
	}
</style>
