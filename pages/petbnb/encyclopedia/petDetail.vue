<template>
	<view class="">
		<view class="item">
			<text class='title'>基本资料</text>
			<view class="avatar-box">
				<image :src="info.showImage" mode="aspectFill" class='avatar'></image>
			</view>
			<view class="baseData">
				<text class='baseData_item'>中文名： {{info.name}}</text>
				<text v-for="(item,index) in info.baseData" :key='index' class='baseData_item' v-text="item.name+'：'+item.value+(item.unit != undefined ? item.unit : '')"></text>
				<text class="baseData_item">体型：{{info.bodyType}}</text>
				<text class="baseData_item">毛长：{{info.woolLength}}</text>
			</view>
		</view>
		<view class="item">
			<text class='title'>详细特征</text>
			<view class="avatar-box">
				<image :src="info.showImage" mode="aspectFill" class='avatar'></image>
			</view>
			<view class="baseData">
				<view v-for="(item,index) in info.detail" :key='index' class='baseData_item'>
					<text class='baseData_name'>{{item.name}}：</text>
					<rate :level='item.value' v-if="item.value != ''"></rate>
				</view>
			</view>
		</view> 
	</view>
</template>

<script>
	import rate from '../../../components/rate.vue'
	export default{
		data (){
			return {
				id: '',
				info:{
					showImage: '',
					baseData: '',
					name: ''
				}
			}
		},
		onLoad(options){
			this.id = options.id
			this.getList();
		},
		methods:{
			getList(){
				this.$http.get('/petbnb/encyclopedia/petDetail?petBreedId='+this.id)
				.then(res=>{
					this.info.baseData = JSON.parse(res.data.baseData);
					this.info.showImage = res.data.showImage;
					this.info.name = res.data.name;
					this.info.bodyType = res.data.bodyType;
					this.info.detail = JSON.parse(res.data.detail);
					this.info.woolLength = res.data.woolLength;
					uni.setNavigationBarTitle({
						title: this.info.name
					})
				})
				.error(err=>{
					
				}) 
			}
		},
		components:{
			rate
		}
	}
</script>

<style lang="less">
	.item{
		padding-bottom: 60rpx;
		.title{
			position: relative;
			display: block;
			padding: 10rpx 40rpx;
			color: #b3b0b5;
			background-color: #f6f6f6;
			&::after{
				position: absolute;
				left: 20rpx;
				top: 50%;
				transform: translateY(-50%);
				content: '';
				width: 5rpx;
				height: 25rpx;
				border-radius: 5rpx;
				background-color: #b3b0b5;
			}
		}
		.avatar-box{
			padding: 40rpx 0 20rpx;
			text-align: center;
			.avatar{
				width: 300rpx;
				height: 300rpx;
			}
		}
		.baseData{
			.baseData_item{
				display: flex;
				padding: 5rpx 20rpx;
				.baseData_name{
					min-width: 160rpx;
				}
			}
		}
	}
</style>
