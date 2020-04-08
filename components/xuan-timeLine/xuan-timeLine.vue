<template>
	<scroll-view class="time-line-wrap">
		<view class="time-line">
			<!-- 标题 -->
			<view class="time-line-title">
				{{title}}
			</view>
			<!-- 时间轴 -->
			<view class="time-line-container" :class="addTypeClass">
				<!-- 时间轴内容块列表 -->
				<view class="time-line-list">

					<!-- 时间轴内容块 -->
					<view class="time-line-info" :key="index" :class="[layoutClass(index)]" :id="'timeline'+index" v-for="(item,index) in list">


						<!-- 内容块内容 -->
						<view class="line-info-content">

							<!-- 时间轴圆点 -->
							<view class="line-on-round" :style="{ opacity: current[index]&&current[index].is=='ok'?1:0,top:'50px'}" :class="current[index]&&current[index].is=='ok'?comeani:''"></view>

							<view class="info-content-wrap" :style="{ opacity: current[index]&&current[index].is=='ok'?1:0}" :class="current[index]&&current[index].is=='ok'?comeani:''">
								<!-- 标题 -->
								<view class="info-title">
									{{item.date}}<span>总支出 ￥ {{item.cost}}</span>
								</view>

								<!-- 内容 -->
								<view class="info-content">
									<!-- 内容 -->
									<view class="info-txt">{{item.name}} ￥ {{item.cost}}</view>
								</view>
							</view>

						</view>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				HEIGHT: 0, //屏幕高度
				result: [], //监听的结果
				current: [], //当前在屏幕内的
				sum: 0, //加载完成个数
				comeani: 'come-ani', //入场动画
				isScroll: true, //是否加载动画
			}
		},
		props: {
			location: {
				type: String,
				default: 'center',
			},
			title: {
				type: String,
				default: ''
			},
			list: { 
				type: Array
			}
		},
		computed: {
			addTypeClass() {
				let _class = "";
				let arrType = ["left", "right", "center"];
				if (arrType.indexOf(this.location) !== -1 && this.location !== 'center') {
					_class += this.location + "-time-line";
				}
				return _class;
			}
		},
		onPageScroll() {
			this.$refs.timeline.getScroll();
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				try {
					// 获取屏幕高度
					const res = uni.getSystemInfoSync();
					this.HEIGHT = res.screenHeight;
					// 添加标志位
					for (let i = 0; i < this.list.length; i++) {
						this.current.push({
							tag: 'timeline' + i,
							is: 'no'
						});
					}
					// 开始获取位置信息
					this.getScroll();
				} catch (e) {
					// error
				}

			},
			loadani() {
				for (let i = 0; i < this.result.length; i++) {
					for (let j = 0; j < this.result[i].info.length; j++) {
						// 是否没加载动画
						if (this.current[j].is != 'ok') {
							// 是否进入视野
							if (this.current[j].tag == this.result[i].info[j].tag &&
								this.result[i].info[j].domTop + 90 < this.HEIGHT) {
								// 加载动画
								this.current[j].is = 'ok';
								this.sum = j + 1;
							}
						}
					}
					// 移除当前
					this.result.splice(i, 1);
				}
				// 是否全部加载完成
				if (this.sum == this.list.length) {
					this.isScroll = false;
				}
			},
			async getScroll() {
				if (!this.isScroll) {
					return;
				}
				let info = [];
				// 返回位置信息加入数组
				for (let i = 0; i < this.list.length; i++) {
					await this.getNodeList('timeline' + i, i).then(res => {
						info.push(res);
					});
				}
				this.result.push({
					info: info
				});
				// 加载动画
				this.loadani();
			},
			getNodeList(id, i) {
				// 获取位置信息并返回
				return new Promise(resolve => {
					const query = uni.createSelectorQuery().in(this);
					query.select('#' + id).boundingClientRect(data => {
						// console.log("得到布局位置信息" + JSON.stringify(data));
						// console.log("节点离页面顶部的距离为" + data.top);
						resolve({
							domInfo: data.height,
							domTop: data.top,
							tag: id
						})
					}).exec();
				});
			},
			// 添加动画
			layoutClass(index) {
				let _class = "";
				if (this.location == 'center' && index % 2 != 0) {
					_class = 'right-info';
				}
				return _class;
			}
		},
	}
</script>

<style lang="scss">
	.time-line-wrap {
		width: 100%;
		overflow-x: hidden;
	}

	.time-line-wrap {
		font-family: sans-serif;

		.time-line {
			padding: 4% 1%;

			.time-line-title {
				font-size: 25px;
				font-weight: 800;
				text-align: center;
				margin-bottom: 15px;
			}

			// 中间的轴
			.time-line-container {
				padding: 3% 1%;
				position: relative;

				&::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					margin: 0 auto;
					height: 100%;
					width: 4px;
					background: #1177dd;
				}

				.time-line-list {
					width: 100%;

					.time-line-info {
						position: relative;

						.line-info-content {
							will-change: auto;
							width: 43%;
							display: flex;
							flex-direction: column;

							.line-on-round {
								height: 20px;
								width: 20px;
								border: 4px solid #1177dd;
								border-radius: 50%;
								background: #fff;
								position: absolute;
								left: 0;
								right: 0;
								margin: 0 auto;
								top: 50px;
								box-shadow: 0px 2px 1px 1px rgba(0, 0, 0, .1);
								z-index: 10;

								&.come-ani {
									animation: come-round .8s ease-in-out;
								}
							}

							.info-content-wrap {
								position: relative;

								.info-title {
									min-height: 30px;
									word-break: break-word;
									text-align: right;
									margin: 5px 0;
									font-size: 34rpx;
									font-weight: 500;

									span {
										color: #1177dd;
										font-size: 38rpx;
										font-weight: 600;
										padding-left: 3px;
									}

								}

								.info-content {
									box-shadow: 1px 1px 1px 1px #d7e4ed;
									border-radius: 8px;
									padding: 5px;
									min-height: 40px;
									position: relative;

									.info-txt {}

									&::before {
										content: '';
										border: 7px solid;
										border-color: transparent transparent transparent #aaa;
										position: absolute;
										left: 100%;
										top: 18px;
									}
								}

								&.come-ani {
									animation: come-in-left .6s ease-in-out;
								}
							}
						}
					}

					.right-info {
						transform: rotateY(180deg);

						.line-info-content {
							.info-content-wrap {
								.info-title {
									transform: rotateY(180deg);
									text-align: left;
								}

								.info-content {
									.info-txt {
										transform: rotateY(180deg)
									}
								}
							}
						}
					}
				}
			}

			// 轴在左边
			.left-time-line {
				&::before {
					margin: 0;
					left: 15px;
				}

				.time-line-list {
					.time-line-info {
						.line-info-content {
							width: auto;

							.line-on-round {
								left: 0;
								margin: 0;
							}

							.info-content-wrap {
								margin-left: 45px;
								margin-bottom: 15px;

								.info-title {
									text-align: left;
								}

								.info-content {
									&::before {
										border-color: transparent #aaa transparent transparent;
										left: -15px;
									}
								}

								&.come-ani {
									animation: come-in-right .6s ease-in-out;
								}
							}
						}
					}
				}
			}

			// 轴在右边
			.right-time-line {
				&::before {
					margin: 0;
					left: 92.8%;
				}

				.time-line-list {
					.time-line-info {
						.line-info-content {
							width: auto;

							.line-on-round {
								left: 90%;
								margin: 0;
							}

							.info-content-wrap {
								margin-right: 55px;
								margin-bottom: 15px;

								.info-content {
									&::before {
										border-color: transparent transparent transparent #aaa;
									}
								}

							}
						}
					}
				}
			}
		}
	}

	@keyframes come-in-left {
		0% {
			transform: translateX(-120%);
		}

		70% {
			transform: translateX(8%);
		}

		100% {
			transform: translateX(0);
		}
	}

	@keyframes come-in-right {
		0% {
			transform: translateX(120%);
		}

		70% {
			transform: translateX(-8%);
		}

		100% {
			transform: translateX(0);
		}
	}

	@keyframes come-round {
		0% {
			transform: scale(0);
			opacity: 0;
		}

		40% {
			opacity: 0;
		}

		60% {
			transform: scale(1.2);
		}

		100% {
			transform: scale(1);
		}
	}
</style>
