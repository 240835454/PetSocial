<template>
	<view class="page">
		<view class="chat-box" @click='closeOther' id="x_chat">
			<template v-for='(item,index) in currentList'>
				<view class="chat-item" :key='index' v-if='item.FromId != accoutId'>
					<image :src="consultantAvatar" mode="aspectFill" class='avatar'></image>
					<text class='text' v-if='item.ContentType == 0' :data-text="item.Content" selectable="true">{{item.Content}}</text>
					<image :src="item.Content" mode="aspectFill" class='chat-img' v-if='item.ContentType == 1' @click="previewImg"
					 :data-src='item.Content'></image>
				</view>
				<view class='chat-item-reverse' :key='index' v-if='item.FromId == accoutId'>
					<text class='text' v-if='item.ContentType == 0' :data-text="item.Content" selectable="true">{{item.Content}}</text>
					<image :src="item.Content" mode="aspectFill" class='chat-img' v-if='item.ContentType == 1' @click="previewImg"
					 :data-src='item.Content'></image>
					<image :src="avatar" mode="aspectFill" class='avatar'></image>
				</view>
			</template>
			<view class="timeRecord">
				<text class="time" v-text="result" :style="{'display': result ? '' : 'none'}"></text>
				<!-- <text>您好,咨询师稍后将与您沟通。</text> -->
			</view>
			<template v-for='(item,index) in chatList'>
				<view class='chat-item' :key='index' v-if='item.user === 1'>
					<image :src="item.avatar" mode="aspectFill" class='avatar'></image>
					<text class='text' v-if="item.text" selectable="true">{{item.text}}</text>
					<image :src="item.image" mode="aspectFill" class='chat-img' v-if='item.image' @click="previewImg" :data-src='item.image'></image>
				</view>
				<view class='chat-item-reverse' :key='index' v-if='item.user === 2'>
					<image :src="item.image" mode="aspectFill" class='chat-img' v-if='item.image' @click="previewImg" :data-src='item.image'></image>
					<text class='text' v-if="item.text" selectable="true">{{item.text}}</text>
					<image :src="item.avatar" mode="aspectFill" class='avatar'></image>
				</view>
			</template>
		</view>
		<view class="footer">
			<!-- 			<textarea v-model="message" placeholder="请输入您想咨询的问题..." class='textarea-box' auto-height="true" placeholder-class="phcolor"
			 @linechange='lineChange' @confirm='jim_sendMsg' fixed="true" type='text' confirm-type='done'/> -->
			<input type="text" v-model="message"  @confirm='jim_sendMsg' :disabled="hasLoading" class='textarea-box'
			 value="" placeholder-class="phcolor" confirm-type="send" />
			<image src="../../static/icon_consulting_expression.png" mode="" class='icon' @click='showEmojiList'></image>
			<image src="../../static/icon_consulting_more.png" mode="" class='icon' @click="addImg"></image>
			<!-- <button type="primary" @click='jim_sendMsg'>发送</button> -->
		</view>
		<view class="emojiList" v-show='showEmoji' :style="{'bottom':chatBoxHeight}">
			<template v-for='(item,index) in emojiList'>
				<text :key='index' @click="chooseEmoji(item)">{{item}}</text>
			</template>
		</view>
	</view>  
</template>

<script>
	import JMessage from '@/public/js/jmessage-wxapplet-sdk-1.4.2.min.js';
	import {
		hex_md5
	} from '@/public/js/md5.js';
	import emoji from '@/public/js/emoji.js'; 
	import {
		timeAgo 
	} from '@/public/js/formatTime.js';
	const jim = new JMessage({ 

	});
	export default {
		data() {
			return {
				showEmoji: false,
				message: '',
				chatBoxHeight: 0,
				id: '',
				JiGuangId: '',
				chatList: [],
				avatar: '',
				consultantAvatar: '',
				now_page: 1,
				page_size: 10,
				total: 0,
				currentList: [],
				historyList: [],
				accoutId: '',
				previewImgList: [],
				api: this.$API,
				ImgList: [],
				hasLoading: true,
				result: "",
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '用户AAA'
			})
			uni.showToast({
				title: '正在初始化...',
				icon: 'loading',
				duration: 1000
			})
			this.accoutId = uni.getStorageSync('accoutId');
			this.id = option.Id;
			this.JiGuangId = option.JiGuangId;
			this.consultantAvatar = option.consultantAvatar;
			// console.log(option);
			// this.$http.get('/API/User/MyInfo')
			// .then(res=>{
			// this.avatar = this.$API + res.Data.HeadImg;
			this.avatar = uni.getStorageSync('avatar');
			// });
			this.getLogChatList(this.now_page, this.page_size);
			// uni.setNavigationBarTitle({
			// 	title: option.name,
			// })
			this.jim_init();
		},
		onShow() {
			this.jim_init();
		},
		onReady() {
			this.jim_init();
			// this.sendMsg();
		},
		computed: {
			emojiList() {
				return emoji;
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			uni.showToast({
				title: '加载中',
				icon: 'loading',
				duration: 500
			})
			setTimeout(() => {
				this.getLogChatList(this.now_page + 1, this.page_size);
				uni.stopPullDownRefresh();
			}, 500)
		},
		methods: {
			// 消息记录
			getLogChatList(now_page, page_size) {
				this.$http.get('/API/Consultation/GetLogChatList', {
						pageIndex: now_page,
						pageSize: page_size,
						Id: this.id
					})
					.then(res => {
						this.now_page = res.Data.PageIndex;
						this.page_size = res.Data.PageSize;
						this.total = res.Data.TotalPage;
						this.historyList = res.Data.PageList.reverse();
						this.currentList.unshift.apply(this.currentList, this.historyList)
						// console.log(this.currentList[this.currentList.length-1].CreateDate);
						// let newTime = this.currentList[this.currentList.length-1].CreateDate
						let date = new Date();
						let hour = date.getHours();
						let minute = date.getMinutes();
						if (hour < 10) {
							hour = '0' + hour;
						}
						if (minute < 10) {
							minute = '0' + minute;
						}
						// let timestamp = date.valueOf();
						// console.log(timestamp);
						let result = hour + ':' + minute;
						this.result = result;
						// console.log(result); 
						// this.currentList = this.historyList.concat(this.currentList); 
						for (let i = 0; i < this.historyList.length; i++) {
							if (this.historyList[i].ContentType == 1) {
								this.previewImgList.push(this.historyList[i].Content);
							}
						}
						// console.log(this.previewImgList);
						if (this.historyList.length == 0) {
							uni.showToast({
								title: '暂无更多消息!',
								icon: 'none'
							})
						}
					})
			},
			// 选择图片
			addImg() {
				let that = this;
				let username = 'NervesourceBladder' + uni.getStorageSync('accoutId');
				uni.chooseImage({
					count: 1,
					success: res => {
						let appkey = 'b70a470571c6cc121be728f4';
						let random_str = '022cd9fd995849b58b3ef0e943421ed9';
						let secret = '245cf3e7fc7c75369eeeefc0';
						let timestamp = new Date().getTime();
						let signature = hex_md5('appkey=' + appkey + '&timestamp=' + timestamp + '&random_str=' + random_str + '&key=' +
							secret)
						let username = 'NervesourceBladder' + uni.getStorageSync('accoutId');
						jim.init({
							'appkey': appkey,
							'random_str': random_str,
							'signature': signature,
							'timestamp': timestamp
						}).onSuccess(data => {
							jim.login({
									'username': username,
									'password': 'NervesourceBladder123123'
								}).onSuccess(data2 => {
									let tempFilePaths = res.tempFilePaths[0];
									let appkey = 'b70a470571c6cc121be728f4';
									let target_name = this.JiGuangId;
									// let that = this;
									// let arr = [];
									let temp = '';
									// for (let i = 0; i < res.tempFilePaths.length; i++) {
									uni.uploadFile({
										url: that.$API + '/API/Common/Upload?Type=2',
										filePath: tempFilePaths,
										name: 'file',
										success: res => {
											this.showEmoji = false;
											// console.log(res);
											// console.log(tempFilePaths);
											temp = JSON.parse(res.data).Data.filename;
											// console.log(temp);
											// arr.push(this.$API + '/UploadFile/chat/' + JSON.parse(res.data).Data.filename)
											that.sendImg(target_name, appkey, tempFilePaths, temp);
											this.previewImgList.push(this.$API + '/UploadFile/chat/' + JSON.parse(res.data).Data.filename);
											// // console.log(arr);
										},
										fail: err => {
											// console.log(err);
										},
									});
								})
								.onFail(err => {

								})
						}).onFail(err => {})


					},
					fail: err => {
						// console.log(err);
					}
				})
			},
			// 预览图片
			previewImg(e) {
				let current = e.target.dataset.src;
				uni.previewImage({
					current: current,
					urls: this.previewImgList
				})
			},
			// 发送图片
			sendImg(target_name, appkey, tempFilePaths, temp) {
				let that = this;
				this.chatList.push({
					user: 2,
					avatar: this.avatar,
					image: this.$API + '/UploadFile/chat/' + temp,
				})
				jim.sendSinglePic({
					'target_username': target_name,
					'appkey': appkey,
					'image': tempFilePaths
				}).onSuccess((data, msg) => {
					that.$http.post('/API/Consultation/AddLogChat', {
						Id: that.id,
						Content: temp,
						ContentType: 1
					}).then(res => {})
					//回到底部
					wx.createSelectorQuery().select('#x_chat').boundingClientRect(function(rect) {
						// console.log(rect);
						wx.pageScrollTo({
							scrollTop: rect.height + 200,
							duration: 100
						})
					}).exec();
				}).onFail((err) => {
					// console.log(err);
				})
			},
			showEmojiList() {
				this.showEmoji = !this.showEmoji;
			},
			chooseEmoji(e) {
				this.message += e;
			},
			closeOther() {
				this.showEmoji = false;
			},
			// 初始化极光
			jim_init() {
				let appkey = 'b70a470571c6cc121be728f4';
				let random_str = '022cd9fd995849b58b3ef0e943421ed9';
				let secret = '245cf3e7fc7c75369eeeefc0';
				let timestamp = new Date().getTime();
				let signature = hex_md5('appkey=' + appkey + '&timestamp=' + timestamp + '&random_str=' + random_str + '&key=' +
					secret)
				let username = 'NervesourceBladder' + uni.getStorageSync('accoutId');
				jim.init({
					'appkey': appkey,
					'random_str': random_str,
					'signature': signature,
					'timestamp': timestamp
				}).onSuccess(res => {
					this.jim_login(username);
				}).onFail(err => {})
			},
			// 登录极光
			jim_login(username) {
				jim.login({
					'username': username,
					'password': 'NervesourceBladder123123'
				}).onSuccess(res => {
					this.jim_onMsgReceive();
					this.jim_sendMsg();
					this.hasLoading = false;
					//回到底部
					wx.createSelectorQuery().select('#x_chat').boundingClientRect(function(rect) {
						// console.log(rect);
						wx.pageScrollTo({
							scrollTop: rect.height + 200,
							duration: 100
						})
					}).exec();
				}).onFail(err => {})
			},
			// 发送消息
			jim_sendMsg() {
				if (this.message != '' && this.message != null) {
					this.chatList.push({
						user: 2,
						avatar: this.avatar,
						text: this.message
					})
					let that = this;
					let target_name = this.JiGuangId;
					let msg = this.message;
					this.message = '';
					jim.sendSingleMsg({
						'target_username': target_name,
						'content': msg
					}).onSuccess(res => {
						this.message = '';
						that.$http.post('/API/Consultation/AddLogChat', {
							Id: that.id,
							Content: msg,
							ContentType: 0
						}).then(res => {
							// this.message = '';
						})
					}).onFail(err => {}).onAck(res => {})
					this.message = '';
					this.showEmoji = false;
					//回到底部
					wx.createSelectorQuery().select('#x_chat').boundingClientRect(function(rect) {
						// console.log(rect);
						wx.pageScrollTo({
							scrollTop: rect.height + 200,
							duration: 100
						})
					}).exec();
				} else {
					this.message = '';
				}
			},
			// 聊天消息实时监听
			jim_onMsgReceive() {
				let that = this;
				jim.onMsgReceive(function(data) {
					// console.log(data);
					if (data.messages[0].content.msg_type == "text") {
						that.chatList.push({
							user: 1,
							avatar: that.consultantAvatar,
							text: data.messages[0].content.msg_body.text
						})
					} else {
						jim.getResource({
							'media_id': data.messages[0].content.msg_body.media_id
						}).onSuccess(res => {
							that.chatList.push({
								user: 1,
								avatar: that.consultantAvatar,
								image: res.url
							});
							that.previewImgList.push(res.url);
						}).onFail(err => {})
					}
					that.$http.get('/API/Consultation/SetNewsSee', {
							Id: that.id
						})
						.then(res => {
							wx.createSelectorQuery().select('#x_chat').boundingClientRect(function(rect) {
								// console.log(rect);
								wx.pageScrollTo({
									scrollTop: rect.height + 200,
									duration: 100
								})
							}).exec();
						})
				});
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f9f9f9;
	}
	.page {
		height: 100%;
		position: relative;

		.chat-box {
			padding-bottom: 150rpx;

			.chat-item {
				padding-top: 40rpx;

				.avatar {
					width: 100rpx;
					height: 100rpx;
					padding: 0 20rpx;
					vertical-align: top;
				}

				.chat-img {
					width: 250rpx;
					height: 250rpx;
				}

				.text {
					display: inline-block;
					max-width: 450rpx;
					padding: 30rpx;
					font-size: 34rpx;
					color: #80899c;
					background-color: #fff;
					border-radius: 10rpx;
					box-shadow: 0px 4px 20px 0px rgba(166, 181, 213, 0.1);
					word-break: break-word;
					position: relative;

					&:before {
						content: "";
						position: absolute;
						top: 50%;
						left: -23rpx;
						transform: translateY(-50%);
						width: 0;
						height: 0;
						border: 13rpx solid;
						border-color: transparent #fff transparent transparent;
						// background-color: #a6b5d5;
					}
				}
			}

			.chat-item-reverse {
				display: flex;
				justify-content: flex-end;
				.chat-item;

				.text {
					color: #fff;
					background-color: #a6b5d5;
					position: relative;

					&:before {
						content: "";
						border: none;
					}

					;

					&:after {
						content: "";
						position: absolute;
						top: 50%;
						right: -23rpx;
						transform: translateY(-50%);
						width: 0;
						height: 0;
						border: 13rpx solid;
						border-color: transparent transparent transparent #a6b5d5;
						// background-color: #a6b5d5;
					}
				}
			}

			.timeRecord {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-top: 20rpx;
				color: #80899c;
				font-size: 26rpx;
				text-align: center;

				.time {
					// display: inline-block;
					// width: 144rpx;
					// height: 44rpx;
					padding: 10rpx 30rpx;
					// line-height: 44rpx;
					background-color: #fff;
					border-radius: 5rpx;
					text-align: center;
				}
			}
		}

		.footer {
			position: fixed;
			display: flex;
			align-items: center;
			width: 100%;
			padding: 20rpx;
			margin: 0;
			background-color: #fff;
			box-sizing: border-box;
			bottom: 0;
			z-index: 10;
			
			.textarea-box {
				width: 500rpx;
				// height: 80rpx;
				padding: 20rpx;
				border: 2rpx solid #e0e4ee;
				// line-height: 0;
				border-radius: 10upx;
				font-size: 30rpx;
			}

			.phcolor {
				font-size: 30rpx;
				color: #cccccc;
			}

			.icon {
				padding-left: 30rpx;
				width: 50rpx;
				height: 50rpx;
			}
		}

		.emojiList {
			position: fixed;
			bottom: 200rpx;
			padding: 20rpx 20rpx 140rpx;
			background-color: #fff;
			font-size: 50rpx;

			text {
				display: inline-block;
				padding: 0 10rpx;
			}
		}
	}
</style>
