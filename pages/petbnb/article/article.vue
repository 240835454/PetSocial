<template>
	<view class="page">
		<view class="content">
			<template v-for="(item, index) in list">
				<view class="guide" :key="index" @click="enterDetail(item.a_id, item.url)">
					<image :src="item.img" mode="aspectFill"></image>
					<view class="message">
						<text class="title">{{ item.title }}</text>
						<text class="text">{{ item.content }}</text>
					</view> 
				</view>
			</template>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			now_page: 1,
			size: 10,
			total: ''
		};
	},
	onLoad() {
		this.getList();
	},
	onReachBottom() {
		//监听上拉触底事件
		// this.showLoadMore = true;
		if (this.list.length < this.total) {
			uni.showToast({
				icon: 'loading',
				title: '正在加载',
				duration: 1000
			});
			this.now_page += 1;
			setTimeout(() => {
				this.$http
					.get('/petbnb/article/getArticleList', {
						index: this.now_page,
						size: this.size
					})
					.then(res => {
						this.freshList = res.data.list;
						this.list = this.list.concat(this.freshList);
					})
					.catch(err => {
						uni.showToast({
							icon: 'none',
							title: '系统错误，请稍后再试'
						});
					});
			}, 1000);
		} else {
			uni.showToast({
				icon: 'none',
				title: '暂无更多数据'
			});
		}
	},
	methods: {
		getList() {
			this.$http
				.get('/petbnb/article/getArticleList', {
					index: this.now_page,
					size: this.size
				})
				.then(res => {
					this.total = res.data.total;
					this.list = res.data.list;
				});
		},
		enterDetail(id, url) {
			uni.navigateTo({
				url: './detail?id='+id,
			});
		}
	}
};
</script>

<style lang="less">
page {
	height: 100%;
	background-color: #f9fafd;
}

.guide {
	display: flex;
	padding: 30rpx;
	margin-bottom: 10rpx;
	background-color: #fff;

	image {
		flex: 0 0 230rpx;
		height: 172rpx;
	}

	.message {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 20rpx;

		.title {
			display: block;
			color: #80899c;
			font-size: 24rpx;
			font-weight: bold;
		}

		.text {
			width: 400rpx;
			font-size: 22rpx;
			color: #999999;
			letter-spacing: 1px;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}

		.info {
			display: flex;
			justify-content: space-between;
			font-size: 24rpx;
			color: #cccccc;

			.date {
				display: flex;
				align-items: center;

				image {
					flex: 0 0 26rpx;
					width: 26rpx;
					heihgt: 26rpx;
					padding-right: 12rpx;
				}
			}

			.visit {
				display: flex;
				align-items: center;

				image {
					flex: 1 1 30rpx;
					width: 30rpx;
					height: 25rpx;
					padding-right: 12rpx;
				}
			}
		}
	}
}

.video {
	margin-top: 10rpx;
	background-color: #fff;

	.picture {
		position: relative;

		image {
			width: 100%;
			height: 355rpx;
		}

		.play-icon {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 80rpx;
			height: 80rpx;
		}
	}

	.message {
		padding: 0 30rpx;

		.title {
			font-size: 30rpx;
			color: #80899c;
		}

		.info {
			display: flex;
			justify-content: space-between;
			width: 380rpx;
			padding: 20rpx 0;
			margin-bottom: 30rpx;
			font-size: 24rpx;
			color: #cccccc;

			.date {
				display: flex;
				align-items: center;

				image {
					flex: 0 0 26rpx;
					width: 26rpx;
					heihgt: 26rpx;
					padding-right: 12rpx;
				}
			}

			.visit {
				display: flex;
				align-items: center;

				image {
					flex: 1 1 30rpx;
					width: 30rpx;
					height: 25rpx;
					padding-right: 12rpx;
				}
			}
		}
	}
}
</style>
