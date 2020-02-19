<template>
	<view class="page" @touchstart="touchStart" @touchend="touchEnd">
		<form>
			<view class="uni-textarea">
				<textarea placeholder="这一刻的想法..." v-model="input_content" />
				</view>
			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd"> 
					<view class="uni-uploader">
						<view class="uni-uploader-head">
							<view class="uni-uploader-title"></view>
							<!-- <view class="uni-uploader-info">{{imageList.length}}/9</view> -->
						</view>
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file" style="position: relative;">
										<video :src="image" :data-src="image" class="uni-uploader__img" controls></video>
										<!-- <image class="uni-uploader__img" mode="aspectFill" :src="image" :data-src="image" @tap="previewImage"></image> -->
										<view class="close-view" @click="close(index)">×</view>
									</view>
								</block>
								<view class="uni-uploader__input-box" v-if="imageList.length == 0">
									<view class="uni-uploader__input" @tap="chooseImage" v-if="imageList.length == 0"></view>
								</view>
							</view>
						</view>
					</view>
				</view> 
			</view>
			
			<view class="footer">
				<button type="default" class="feedback-submit" @click="publish">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		data() {
			return {
				// title: 'choose/previewImage',
				input_content:'',
				imageList: [],
				
				
				api: this.$API,
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				
				//侧滑返回start
				startX: 0, //点击屏幕起始位置
				movedX: 0, //横向移动的距离
				endX: 0, //接触屏幕后移开时的位置
				//end
				
				postImageList: [],
				avatar: '',
				name: ''
			}
		},
		onUnload() {
			this.imageList = [],
				this.sourceTypeIndex = 2,
				this.sourceType = ['拍照', '相册', '拍照或相册'],
				this.sizeTypeIndex = 2,
				this.sizeType = ['压缩', '原图', '压缩或原图'],
				this.countIndex = 8;
		},
		onLoad(options){
			this.avatar = options.avatar,
			this.name = options.name
		},
		
		methods: {
			async publish(){
				// if (!this.input_content) {
				// 	uni.showModal({ content: '内容不能为空', showCancel: false, });
				// 	return;
				// }
				
				uni.showLoading({title:'发布中'});
				
				// var location = await this.getLocation();//位置信息,可删除,主要想记录一下异步转同步处理
				let date = new Date();
				let oldContent = JSON.stringify({
						text: this.input_content,
						video: this.imageList
					})
					
				this.$http.post('/Community/postDynamic',{
					avatar: this.avatar,
					name: this.name,
					content: oldContent, 
					timestamp: date.getTime()
				}).then(res => {
					if (res.code === 1) {
						uni.showToast({
												icon: 'success',
												title: '发布成功!',
												success: res => {
													setTimeout(()=>{
														uni.navigateBack({
															delta:1
														})
													},1000)

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
				// var images = [];
				// for(var i = 0,len = this.imageList.length; i < len; i++){
				// 	var image_obj = {name:'image-'+i,uri:this.imageList[i]};
				// 	images.push(image_obj);
				// }
				
				// uni.uploadFile({//该上传仅为示例,可根据自己业务修改或封装,注意:统一上传可能会导致服务器压力过大
				// 	url: 'moment/moments', //仅为示例，非真实的接口地址
				// 	files:images,//有files时,会忽略filePath和name
				// 	filePath: '',
				// 	name: '',
				// 	formData: {//后台以post方式接收
				// 		'user_id':'1',//自己系统中的用户id
				// 		'text': this.input_content,//moment文字部分
				// 		'longitude':location.longitude,//经度
				// 		'latitude':location.latitude//纬度
				// 	},
				// 	success: (uploadFileRes) => {
				// 		uni.hideLoading();
				// 		uni.showToast({
				// 			icon:'success',
				// 			title:"发布成功"
				// 		})
				// 		uni.navigateBack({//可根据实际情况使用其他路由方式
				// 			delta:1
				// 		});
				// 	},
				// 	fail: (e) => {
				// 		console.log("e: " + JSON.stringify(e));
				// 		uni.hideLoading();
				// 		uni.showToast({
				// 			icon:'none',
				// 			title:"发布失败,请检查网络"
				// 		})
				// 	}
				// });
			},
			
			getLocation(){//h5中可能不支持,自己选择
				return new Promise((resolve, reject) => {
					uni.getLocation({
						type: 'wgs84',
						success: function (res) {
							resolve(res);
						},
						fail: (e) => {  
							reject(e);
						}
					}); 
				} )
			},
			
			close(e){
			    this.imageList.splice(e,1);
			},
			chooseImage: async function() {
				// if (this.imageList.length === 9) {
				// 	let isContinue = await this.isFullImg();
				// 	console.log("是否继续?", isContinue);
				// 	if (!isContinue) {
				// 		return;
				// 	}
				// } 
				uni.chooseVideo({
					// sourceType: sourceType[this.sourceTypeIndex],
					// count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					count: 1,
					sourceType: ['camera','album'],
					success: (res) => { 
						// console.log(res);
						// this.imageList[0] = res.tempFilePath;
						// this.imageList = this.imageList.concat(res.tempFilePath)//非APP平台不支持自定义压缩,暂时没有处理,可通过uni-app上传组件的sizeType属性压缩
						// for(let i = 0;i<this.imageList.length;i++){ 
							this.$http.uploadFile(res.tempFilePath).then(res => {
								this.imageList.push(res.data.path);
								}) 
								.catch(err => {
									uni.showToast({
										icon: 'none',
										title: '系统错误，请稍后再试!'
									})
								})
							// }
					}
				})
			},
			isFullImg: function() {
				// return new Promise((res) => {
				// 	uni.showModal({
				// 		content: "已经有9张图片了,是否清空现有图片？",
				// 		success: (e) => {
				// 			if (e.confirm) {
				// 				this.imageList = [];
				// 				res(true);
				// 			} else {
				// 				res(false)
				// 			}
				// 		},
				// 		fail: () => {
				// 			res(false)
				// 		}
				// 	})
				// })
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			touchStart: function(e) {
				this.startX = e.mp.changedTouches[0].pageX;
			},
			
			touchEnd: function(e) {
				this.endX = e.mp.changedTouches[0].pageX;
				if (this.endX - this.startX > 200) {
					uni.navigateBack();
				}
			}
		}
	}
</script>

<style scoped>
	.footer {
		margin-top: 80upx;
	}
	
	.cell-pd {
		padding: 20upx 30upx;
	}

	.uni-textarea {
		width: auto;
		padding: 20upx 25upx;
		line-height: 1.6;
		height: 150upx;
	}
	.uni-list::before {
		height: 0;
	}
	.uni-list:after {
		height: 0;
	}
	.list-pd {
		margin-top: 0;
	}
	.close-view{
	    text-align: center;
		line-height:30upx;
		height: 35upx;
		width: 35upx;
		background: #ef5350;
		color: #FFFFFF;
		position: absolute;
		top: 1upx;
		right: 1upx;
		font-size: 35upx;
		border-radius: 8upx;
	}
	.page {
		width: 750upx;
		height: 100%;
	}
</style>
