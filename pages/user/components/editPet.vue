<template>
	<view class="content">
		<view class="box">
			<image :src="info.avatar === '' ? '../../../static/camera.png' : api + info.avatar" class="icon" mode="" @click='changeAvatar'></image>
			<view class="item">
				<text>宠物名称</text>
				<input type="text" :value="info.name"  @input="petName" placeholder="设置宠物名称" placeholder-style='text-align:right' class="input-box" />
			</view>
			<view class="item">
				<text>宠物性别</text>
				<picker mode="" :range="genderArray" mode="selector" @change="petGender" range-key="name"> 
					<input type="text" disabled="true" :value="gender" placeholder="选择宠物性别" placeholder-style='text-align:right'
					 class="input-box" />
				</picker>
			</view>
			<view class="item">
				<text>宠物品种</text>
				<input type="text" :value="info.breed" disabled="true" @click="petBreed" placeholder="选择宠物品种" placeholder-style='text-align:right'
				 class="input-box" />
			</view>
			<view class="item">
				<text>宠物生日</text>
				<picker mode="" mode="date" @change="petBirthDay">
					<input type="text" :value="info.birthDay" disabled="true" placeholder="选择宠物生日" placeholder-style='text-align:right'
					 class="input-box" />
				</picker>
			</view>
			<view class="item">
				<text>绝育状态</text>
				<picker mode="selector" :range="stateArray" @change="petState">
					<input type="text" :value="info.state" placeholder="绝育状态" disabled="true" placeholder-style='text-align:right'
					 class="input-box" />
				</picker>
			</view>
			<view class="footer">
				<text class="button" @click="updatePet">保存</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					uid: '',
					name: '',
					gender: '',
					birthDay: '',
					avatar: '',
					breed: '',
					state: ''
				},
				gender: '',
				genderArray: [{
					id: 1,
					name: '雄',
				}, {
					id: 2,
					name: '雌'
				}],
				stateArray: [
					'已绝育', '未绝育'
				],
				api: this.$API
			}
		},
		onLoad(options){
			this.$http.get('/petbnb/getPetDetail',{
				pid: options.pid
			})
			.then(res => {
				this.info = res.data;
				this.info.gender == 1 ? this.gender = "雄" : this.gender = "雌"
			})
		},
		onShow(options) {
			let page = getCurrentPages();
			this.info.breed = page[2].$vm.breed;
		},
		methods: {
			updatePet() {
				if (this.info.name !== '' && this.info.gender !== '' && this.info.birthDay !== '' && this.info.avatar !== '' &&
					this.info.breed !== '' && this.info.state !== '') {
					this.$http.post('/petbnb/updatePetDetail', {
							...this.info
						})
						.then(res => {
							if (res.code === 1) {
								uni.showToast({
									title: res.message,
									icon: 'success'
								})
								setTimeout(()=>{
									uni.navigateBack({
										delta: 1
									})
								},1000)
							}
						})
						.catch(err => {

						})
				} else {
					uni.showToast({
						title: '请将信息填写完整',
						icon: 'none'
					})
				}
			},
			// 宠物头像
			changeAvatar() {
				let that = this;
				uni.chooseImage({
					count: 1,
					success: res => {
						this.$http.uploadFile(res.tempFilePaths[0]).then(res => {
								that.info.avatar = res.data.path;
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
			// 宠物姓名
			petName(e) {
				this.info.name = e.detail.value;
			},
			// 宠物性别
			petGender(e) {
				this.gender = this.genderArray[e.detail.value].name;
				this.info.gender = this.genderArray[e.detail.value].id;
			},
			// 宠物品种
			petBreed() {
				uni.navigateTo({
					url: '../../petbnb/encyclopedia/encyclopedia'
				})
			},
			// 宠物生日
			petBirthDay(e) {
				this.info.birthDay = e.detail.value;
			},
			// 宠物绝育状态
			petState(e) {
				this.info.state = this.stateArray[e.detail.value];
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f9f9f9;
	}

	.box {
		text-align: center;

		.icon {
			width: 120upx;
			height: 120upx;
			margin: 50upx 0 30upx;
			// border: 1upx solid rgba(224, 224, 224, 0.5);
			// padding: 15upx;
			border-radius: 50%;
			z-index: 10;
		}

		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20upx;
			background-color: #fff;
			border-bottom: 1upx solid #f6f6f6;
			position: relative;

			&:last-child {
				border-bottom: none;
			}

			.input-box {
				padding-right: 40upx;
				text-align: right;
			}

			&:not(:first-of-type) {
				&::after {
					content: " ";
					border: solid #e5e5e5;
					border-width: 3rpx 3rpx 0 0;
					top: 50%;
					transform: translateY(-50%);
					right: 20rpx;
					position: absolute;
					width: 18rpx;
					height: 18rpx;
					-webkit-transform: translateY(-50%) rotate(45deg);
					transform: translateY(-50%) rotate(45deg);
				}
			}
		}

		.footer {
			.button {
				display: inline-block;
				padding: 15upx 300upx;
				background-color: #F2473D;
				border-radius: 20upx;
				color: #fff;
			}
		}
	}
</style>
