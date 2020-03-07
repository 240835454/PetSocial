<template>
	<view>
		<view class="home-pic">
			<image :src="api + info.bgImage" mode="scaleToFill" class='cover-pic'></image>
			<view class="home-pic-base">
				<view class="top-pic">
					<image class="header" :src="api + info.avatar"></image>
					<view class="name"><text>{{info.name}}</text>
						<image src="../../static/nan.png" mode="" class='icon_level' v-if='info.gender == 0'></image>
						<image src="../../static/nv.png" mode="" class='icon_level' v-if='info.gender == 1'></image>
					</view>
					<text class="name">{{info.region}}</text>
				</view>
			</view>
		</view> 
		<view class="pet">
			<text class='title'>宠物</text>
		</view>
		<view class="switch-box">
			<text>主页</text>
			<text>相册</text>
		</view>
		<!-- 开始 post -->
		<view class="dynamic" id='moments'> 
			<view class="moments__post" v-for="(post,index) in post" :key="index" :id="'post-'+index" v-if="post.length != 0">
				<view class="post-left">
					<!-- <image class="post_header" :src="api + post.avatar" @click="enterDetail(post.uid)"></image> -->
				</view>
				<view class="post_right">
					<!-- <text class="post-username">{{post.name}}</text> -->
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
			</view>
			<!-- 结束 post -->
		</view>
		<!-- 底部选项 -->
		<view class="footer">
			<view class="item">
				<image src="../../static/add.png" mode="" class="icon"></image>
				<text>关注</text>
			</view>
			<view class="item" @click="enterChat">
				<image src="../../static/chat.png" mode="" class="icon"></image>
				<text>私聊</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				api: this.$API,
				info: {},
				post: []
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getInfo();
			this.getList();
		},
		methods: {
			getInfo() {
				this.$http.get('/Community/userDetail', {
						uid: this.id
					})
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
			enterChat(){
				uni.navigateTo({
					url: 'chat' 
				})
			},
			getList() {
				let account = uni.getStorageSync('account');
				this.$http.get('/Community/userDynamic', {
						uid: this.id
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
		}
	}
</script>

<style lang="less">
	@import url("../../public/css/community/index.css");
	page {
		height: 100%;
		background-color: #f7f7f7;
	}

	.home-pic {
		height: 400upx;

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
			height: 400upx;
			z-index: -1;
			background-size: contain;
			// margin-bottom: 50upx
		}

		.home-pic-base {
			.top-pic {
				padding-top: 90upx;
				text-align: center;

				.header {
					width: 150upx !important;
					height: 150upx !important;
					border-radius: 50%;
					border: 5upx solid #fff;
				}

				.name {
					display: flex;
					justify-content: center;
					align-items: center;
					color: #fff;

					.icon_level {
						width: 42upx;
						height: 42upx;
						padding-left: 15upx;
					}
				}
			}
		}
	}

	.pet {
		margin-top: 30upx;
		height: 180upx;
		background-color: #fff;

		.title {
			display: block;
			margin: 20upx;
		}
	}

	.switch-box {
		display: flex;
		justify-content: space-around;
		// width: 300upx;
		padding: 10upx 0;
		margin: 30upx auto 0;
		border-bottom: 1upx solid #d9d9d9;
		background-color: #fff;
	}

	.dynamic {}
	.footer{
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-around;
		width: 100%;
		padding: 20upx;
		background-color: #fff;
		margin: 0;
		.item{
			display: flex;
			align-items: center;
			color: #999;
			.icon{
				width: 35upx;
				height: 35upx;
				padding-right: 30upx;
			}
			&:last-child{
				&::before{
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
