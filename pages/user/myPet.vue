<template>
	<view class="">
		<view class="" v-for="(item, index) in petList" :key="index" class="item" @click="getEditPet(item)">
			<image :src="api + item.avatar" mode="aspectFill" class="item-img"></image>
			<view class="item-box">
				<view class="item-info">
					<view class="top">
						<text>{{ item.name }}</text>
						<image src="../../static/nan.png" mode="" class="icon_level" v-if="item.gender == 1"></image>
						<image src="../../static/nv.png" mode="" class="icon_level" v-if="item.gender == 2"></image>
					</view>
					<view class="bottom">
						<text class="breed">{{ item.breed }}</text>
						<!-- <text>{{item.birthDay}}</text> -->
					</view>
				</view>
			</view>
		</view>
		<view class="addPet" @click="getAddPet">
			<text>添加宠物</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			petList: [],
			api: this.$API
		};
	},
	onLoad() {
		this.getPetList();
	},
	onShow(){
		this.getPetList();
	},
	methods: {
		// 获取用户宠物列表
		getPetList() {
			this.$http
				.get('/petbnb/getPetList')
				.then(res => {
					if (res.code === 1) {
						this.petList = res.data.list;
					}
				})
				.catch(err => {});
		},
		getAddPet(){
			uni.navigateTo({
				url: '../petbnb/pet/addPet'
			})
		},
		getEditPet(item){
			uni.navigateTo({
				url: './components/editPet?pid='+item.pid
			})
		}
	}
};
</script>

<style lang="less">
.item {
	display: flex;
	align-items: center;
	padding: 10upx 20upx;
	border-bottom: 1upx solid #6666;
	position: relative;
	&::after {
		content: ' ';
		border: solid #e5e5e5;
		border-width: 3rpx 3rpx 0 0;
		top: 50%;
		transform: translateY(-50%);
		right: 30rpx;
		position: absolute;
		width: 18rpx;
		height: 18rpx;
		-webkit-transform: translateY(-50%) rotate(45deg);
		transform: translateY(-50%) rotate(45deg);
	}
	.item-img {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		margin-right: 15upx;
	}
	.item-box {
		.item-info {
			.top {
				display: flex;
				align-items: center;
				.icon_level {
					width: 36upx;
					height: 36upx;
					margin-top: 5upx;
					padding-right: 20upx;
				}
			}
			.bottom {
				.breed {
					display: inline-block;
					padding: 2upx 5upx;
					font-size: 18upx;
					border: 1upx solid #ccc;
					border-radius: 10upx;
				}
			}
		}
	}
}
.addPet{
	display: flex;
	align-items: center;
	justify-content: center;
	height: 121upx;
	border-bottom: 1upx solid #6666;
	color: grey;
}
</style>
