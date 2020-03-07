<template>
	<view id="moments">
		<view class="top">
			<view class="bg-box" :class="!hide ? 'animate' : 'un-animate'">
				<image src="../../static/video.png" mode="aspectFit" class='icon_video' @click="goPublish_video"></image>
				<image src="../../static/camera.png" mode="aspectFit" class='icon_camera' @click="goPublish"></image>
			</view>
		</view>
		<!-- 当前用户名字和头像 -->
		<view class="home-pic">
			<image :src="api + info.bgImage" mode="scaleToFill" class='cover-pic' @click='changeBgImage'></image>
			<view class="home-pic-base">
				<view class="top-pic">
					<image class="header" :src="api + info.avatar" @tap="test"></image>
				</view>
				<view class="top-name">{{info.name}}</view>
			</view>
		</view>

		<view class="moments__post" v-for="(post,index) in post" :key="index" :id="'post-'+index" v-if="post.length != 0">
			<view class="post-left">
				<image class="post_header" :src="api + post.avatar" @click="enterDetail(post.uid)"></image>
			</view>
			<view class="post_right">
				<text class="post-username">{{post.name}}</text>
				<view id="paragraph" class="paragraph">{{post.content.text}}</view>
				<!-- 视频 -->
				<view class="thumbnails">
					<view class="my-gallery-video" v-for="(video, index_video) in post.content.video" :key="index_video">
						<video :src="api + video" enable-play-gesture="true" vslide-gesture="true" controls></video>
					</view>
				</view>
				<!-- 相册 -->
				<view class="thumbnails">
					<view :class="post.content.images.length === 1?'my-gallery':'thumbnail'" v-for="(image, index_images) in post.content.images"
					 :key="index_images">
						<image class="gallery_img" lazy-load mode="aspectFill" :src="api + image" :data-src="image" @tap="previewImage(post.content.images,index_images)"></image>
					</view>
				</view>
				<!-- 资料条 -->
				<view class="toolbar">
					<view class="timestamp">{{post.timestamp}}</view>
					<view class="like" @tap="like(index)">
						<image :src="post.islike==0?'../../static/index/islike.png':'../../static/index/like.png'"></image>
					</view>
					<view class="comment" @tap="comment(index)">
						<image src="../../static/index/comment.png"></image>
					</view>
				</view>
				<!-- 赞／评论区 -->
				<view class="post-footer" v-if='post.comments.content.length != 0 || post.likeList.length != 0'>
					<view class="footer_content" v-if="post.likeList.length != 0">
						<image class="liked" src="../../static/index/liked.png"></image>
						<!-- <text class="nickname" v-for="(user,index_like) in post.likeList" :key="index_like">{{user.name}}</text> -->
						<image :src="api + user.avatar" v-for="(user,index_like) in post.likeList" :key="index_like" class="liked_avatar"
						 mode=""></image>
					</view>
					<view class="footer_content" v-for="(comment,comment_index) in post.comments" :key="comment_index" @click="reply(index,comment_index)">
						<image :src="api + comment.avatar" class="liked_avatar" mode=""></image>
						<text class="comment-nickname">{{comment.name}}<text v-text="comment.to_name ? '回复' : ''"></text><text v-text="comment.to_name ? comment.to_name : ''"></text>:
							<text class="comment-content">{{comment.content}}</text></text>
					</view>
				</view>
			</view>
			<!-- 结束 post -->
		</view>

		<view class="foot" v-show="showInput">
			<chat-input @send-message="send_comment" @blur="blur" :focus="focus" :placeholder="input_placeholder"></chat-input>
		</view>
		<!-- <view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view> -->
	</view>

</template>

<script>
	import chatInput from '../../components/im-chat/chatinput.vue'; //input框
	import postData from '@/public/js/index.post.data.js'; //朋友圈数据
	import {
		timeAgo
	} from '@/public/js/formatTime.js'; // 时间

	export default {
		components: {
			chatInput
		},
		data() {
			return {
				post: [], //模拟数据
				user_id: 4,
				username: 'Liuxy',
				index: '',
				comment_index: '',

				input_placeholder: '评论', //占位内容
				focus: false, //是否自动聚焦输入框
				is_reply: false, //回复还是评论 
				showInput: false, //评论输入框

				screenHeight: '', //屏幕高度(系统)
				platform: '',
				windowHeight: '', //可用窗口高度(不计入软键盘)

				loadMoreText: "加载中...",
				showLoadMore: false,
				hide: true,
				info: '',
				api: this.$API,
				list: [],
				now_page: 1,
				size: 10,
				total: '',
				freshList: []
			}
		},
		// mounted() { 
		// 	uni.getStorage({ 
		// 		key: 'posts', 
		// 		success: function(res) {
		// 			console.log(res.data);
		// 			this.posts = res.data;
		// 		}
		// 	});
		// },
		onLoad() {
			uni.getSystemInfo({ //获取设备信息 
				success: (res) => {
					this.screenHeight = res.screenHeight;
					this.platform = res.platform;
				}
			});
			uni.startPullDownRefresh();
			this.getUserInfo();
			this.getList();
		},
		onShow() {
			uni.onWindowResize((res) => { //监听窗口尺寸变化,窗口尺寸不包括底部导航栏
				if (this.platform === 'ios') {
					this.windowHeight = res.size.windowHeight;
					this.adjust();
				} else {
					if (this.screenHeight - res.size.windowHeight > 60 && this.windowHeight <= res.size.windowHeight) {
						this.windowHeight = res.size.windowHeight;
						this.adjust();
					}
				}
			});
			this.now_page = 1;
			this.getList();
			this.getUserInfo();
		},
		onPageScroll(e) {
			if (e.scrollTop >= 144) {
				this.hide = false;
			} else {
				this.hide = true;
			}
		},
		onHide() {
			uni.offWindowResize(); //取消监听窗口尺寸变化
		},
		onUnload() {
			this.max = 0,
				this.data = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		onReachBottom() { //监听上拉触底事件
			// this.showLoadMore = true;

			let account = uni.getStorageSync('account');
			if (this.post.length < this.total) {
				uni.showToast({
					icon: 'loading',
					title: '正在加载',
					duration: 1000
				})
				this.now_page += 1;
				setTimeout(() => {
					this.$http.get('/Community/dynamic', {
							index: this.now_page,
							size: this.size
						})
						.then(res => {
							this.freshList = res.data.list;
							for (let i = 0; i < this.freshList.length; i++) {
								for (let j = 0; j < this.freshList[i].likeList.length; j++) {
									if (this.freshList[i].likeList[j].uid == account) {
										this.freshList[i].islike = 1;
									}
								} 
							} 
							this.post = this.post.concat(this.freshList);
							console.log(this.post);
						})
						.catch(err => {
							uni.showToast({
								icon: 'none',
								title: '系统错误，请稍后再试'
							})
						})
				}, 1000)
			} else {
				uni.showToast({
					icon: 'none',
					title: '暂无更多数据'
				})
			}
		},
		onPullDownRefresh() { //监听下拉刷新动作
			console.log('onPullDownRefresh');
			// 这里获取数据
			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		onNavigationBarButtonTap(e) { //监听标题栏点击事件
			if (e.index == 0) {
				this.navigateTo('../publish/publish')
			}
		},
		computed: {

		},
		methods: {
			getList() {
				let account = uni.getStorageSync('account');
				this.$http.get('/Community/dynamic', {
						index: this.now_page,
						size: this.size
					})
					.then(res => {
						this.post = res.data.list;
						this.total = res.data.total;
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
			// 修改背景图片
			changeBgImage() {
				let that = this;
				uni.chooseImage({
					count: 1,
					success: res => {
						this.$http.uploadFile(res.tempFilePaths[0]).then(res => {
								this.$http.put('/User/changeBgImage', res.data)
									.then(res => {
										if (res.code === 1) {
											uni.showToast({
												icon: 'success',
												title: '修改成功!',
												success: res => {
													that.getList();
												}
											})
										}
									})
									.catch(err => {
										uni.showToast({
											icon: 'none',
											title: '系统错误，请稍后再试!'
										})
									})
							})
							.catch(err => {
								uni.showToast({
									icon: 'none',
									title: '系统错误，请稍后再试!'
								})
							})
					}
				})
			},
			test() {
				this.navigateTo('../test/test');
			},
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			like(index) {
				let account = uni.getStorageSync('account');
				let date = new Date();
				if (this.post[index].islike == 0) {
					this.post[index].islike = 1;
					this.post[index].likeList.push({
						uid: account,
						name: this.info.name,
						avatar: this.info.avatar
					});
					this.$http.post('/Community/like', {
						post_id: this.post[index].post_id,
						uid: account,
						avatar: this.info.avatar,
						name: this.info.name,
						post_uid: this.post[index].uid,
						post_avatar: this.post[index].avatar,
						post_name: this.post[index].name, 
						post_content: JSON.stringify(this.post[index].content),
						timestamp: date.getTime()
					})
				} else {
					this.post[index].islike = 0;
					let like_id = ''; 
					for (let i = 0; i < this.post[index].likeList.length; i++) {
						if (this.post[index].likeList[i].uid == account) {
							like_id = this.post[index].likeList[i].like_id;
							this.post[index].likeList.splice(i, 1)
						}
					}
					this.$http.put('/Community/like', { 
						like_id
						})
						.then(res => {

						})
						.catch(err => {
							uni.showToast({
								icon: 'none',
								title: '系统错误，请稍后再试!'
							})
					})
				}
			},
			comment(index) {
				this.showInput = true; //调起input框
				this.focus = true;
				this.index = index;
			},
			adjust() { //当弹出软键盘发生评论动作时,调整页面位置pageScrollTo
				return;
				uni.createSelectorQuery().selectViewport().scrollOffset(res => {
					var scrollTop = res.scrollTop;
					let view = uni.createSelectorQuery().select("#post-" + this.index);
					view.boundingClientRect(data => {
						console.log("data:" + JSON.stringify(data));
						console.log("手机屏幕高度:" + this.screenHeight);
						console.log("竖直滚动位置" + scrollTop);
						console.log("节点离页面顶部的距离为" + data.top);
						console.log("节点高度为" + data.height);
						console.log("窗口高度为" + this.windowHeight);

						uni.pageScrollTo({
							scrollTop: scrollTop - (this.windowHeight - (data.height + data.top + 45)), //一顿乱算
							// scrollTop: 50, 
							duration: 300
						});
					}).exec();
				}).exec();
			},
			reply(index, comment_index) {
				this.is_reply = true; //回复中
				this.showInput = true; //调起input框
				let replyTo = this.post[index].comments[comment_index].name;
				this.input_placeholder = '回复' + replyTo;
				this.index = index; //post索引
				this.comment_index = comment_index; //评论索引
				this.focus = true;
			},
			blur: function() {
				this.init_input();
			},
			send_comment: function(message) {
				let account = uni.getStorageSync('account');
				let that = this;
				// if (this.is_reply) {
				// 	var reply_username = this.post[this.index].comments.content[this.comment_index].name;
				// 	var comment_content = '回复' + reply_username + ':' + message.content;
				// } else {
				let comment_content = message.content;
				// }
				// this.post[this.index].comments.total += 1; 
				this.post[this.index].comments.push({
					uid: account,
					name: this.info.name,
					avatar: this.info.avatar, 
					content: comment_content, //直接获取input中的值 
					to_uid: this.post[this.index].comments[this.comment_index] ? this.post[this.index].comments[
						this.comment_index].uid : '',
					to_name: this.post[this.index].comments[this.comment_index] ? this.post[this.index].comments[
						this.comment_index].name : '',
					to_avatar: this.post[this.index].comments[this.comment_index] ? this.post[this.index].comments[
						this.comment_index].avatar : ''  
				});
				let date = new Date();
				this.$http.post('/Community/commentsList', {
					post_id: this.post[this.index].post_id,
					uid: account,
					name: this.info.name,
					avatar: this.info.avatar, 
					content: comment_content,
					timestamp: date.getTime(),  
					to_uid: this.post[this.index].comments[this.comment_index] ? this.post[this.index].comments[
						this.comment_index].uid : '',
					to_name: this.post[this.index].comments[this.comment_index] ? this.post[this.index].comments[
						this.comment_index].name : '',
					to_avatar: this.post[this.index].comments[this.comment_index] ? this.post[this.index].comments[
						this.comment_index].avatar : ''
					// comments: JSON.stringify(this.post[this.index].comments)
				}).then(res => {
					that.getList();
				}).catch(err => {
					uni.showToast({
						icon: 'none', 
						title: '系统错误，请稍后再试!'
					})
				})
				this.init_input();
			},
			init_input() {
				this.showInput = false;
				this.focus = false;
				this.input_placeholder = '评论';
				this.is_reply = false;
			},
			previewImage(imageList, image_index) {
				for (let i = 0; i < imageList.length; i++) {
					imageList[i] = this.api + imageList[i];
				}
				console.log(imageList)
				var current = imageList[image_index];
				uni.previewImage({
					current: current,
					urls: imageList
				});
			},
			goPublish() {
				uni.navigateTo({
					url: 'publish?avatar=' + this.info.avatar + '&name=' + this.info.name,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goPublish_video() {
				uni.navigateTo({
					url: 'publish_video?avatar=' + this.info.avatar + '&name=' + this.info.name,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 查看用户详情
			enterDetail(id){
				uni.navigateTo({
					url: 'userDetail?id='+id 
				})
			}
		},
	}
</script>

<style scoped lang="less">
	@import url("../../public/css/community/index.css");

	.top {
		position: fixed; 
		width: 100%;
		height: 0upx;
		// top: 30upx;
		// right: 30upx;
		z-index: 50;

		.bg-box {
			position: relative;
			width: 100%;
			height: 0upx;
		}

		.animate {
			height: 100upx;
			background-color: #fff;
			transition: height .5s ease-in;
		}

		.un-animate {
			height: 0upx;
			transition: height .5s linear;
		}

		.icon_camera {
			position: absolute;
			right: 20upx;
			top: 20upx;
			width: 72upx;
			height: 72upx;
			z-index: 50;
		}

		.icon_video {
			.icon_camera;
			right: 100upx;
		}
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
</style>
