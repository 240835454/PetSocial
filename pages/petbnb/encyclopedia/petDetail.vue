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
		<view class="item" v-if="info.baseInfo">
			<text class='title'>发展起源</text>
			<rich-text :nodes="info.baseInfo"></rich-text>
		</view>
		<view class="item" v-if="info.breedInfoOne">
			<text class='title'>形态特征及鉴别</text>
			<rich-text :nodes="info.breedInfoOne"></rich-text>
		</view>
		<view class="item" v-if="info.breedInfoTwo">
			<text class='title'>性格特点</text>
			<rich-text :nodes="info.breedInfoTwo"></rich-text>
		</view>
		<view class="item" v-if="info.breedInfoThree">
			<text class='title'>生活习性</text>
			<rich-text :nodes="info.breedInfoThree"></rich-text>
		</view>
		<view class="item" v-if="info.feedInfoOne">
			<text class='title'>饮食知识</text>
			<rich-text :nodes="info.feedInfoOne"></rich-text>
		</view>
		<view class="item" v-if="info.feedInfoTwo">
			<text class='title'>养护知识</text>
			<rich-text :nodes="info.feedInfoTwo"></rich-text>
		</view>
		<view class="item" v-if="info.feedInfoThree">
			<text class='title'>美容知识</text>
			<rich-text :nodes="info.feedInfoThree"></rich-text>
		</view>
		<view class="item" v-if="info.attentionInfoOne">
			<text class='title'>相关疾病</text>
			<rich-text :nodes="info.attentionInfoOne"></rich-text>
		</view>
		<view class="item" v-if="info.attentionInfoTwo">
			<text class='title'>常见问题</text>
			<rich-text :nodes="info.attentionInfoTwo"></rich-text>
		</view>
	</view>
</template>

<script>
	import rate from '../../../components/rate.vue'
	export default {
		data() {
			return {
				id: '',
				info: {
					showImage: '',
					baseData: '',
					name: '',
					baseInfo: '',
					breedInfoOne: '',
					breedInfoTwo: '',
					breedInfoThree: '',
					feedInfoOne: '',
					feedInfoTwo: '',
					feedInfoThree: '',
					attentionInfoOne: '',
					attentionInfoTwo: ''
				}
			}
		},
		onLoad(options) {
			this.id = options.id
			uni.showToast({
				icon: 'loading',
				title: '正在加载',
				duration: 500
			})
			setTimeout(this.getList(),500)
			// this.getList();
		},
		methods: {
			getList() {
				this.$http.get('/petbnb/encyclopedia/petDetail?petBreedId=' + this.id)
					.then(res => {
						this.info.baseData = JSON.parse(res.data.baseData);
						this.info.showImage = res.data.showImage;
						this.info.name = res.data.name;
						this.info.bodyType = res.data.bodyType;
						this.info.detail = JSON.parse(res.data.detail);
						this.info.woolLength = res.data.woolLength;
						this.info.baseInfo = JSON.parse(res.data.baseInfo)['发展起源'];
						this.info.breedInfoOne = JSON.parse(res.data.breedInfo)['形态特征及鉴别'];
						this.info.breedInfoTwo = JSON.parse(res.data.breedInfo)['性格特点'];
						this.info.breedInfoThree = JSON.parse(res.data.breedInfo)['生活习性'];
						this.info.feedInfoOne = JSON.parse(res.data.feedInfo)['饮食知识'];
						this.info.feedInfoTwo = JSON.parse(res.data.feedInfo)['养护知识'];
						this.info.feedInfoThree = JSON.parse(res.data.feedInfo)['美容知识'];
						this.info.attentionInfoOne = JSON.parse(res.data.attentionInfo)['相关疾病'];
						this.info.attentionInfoTwo = JSON.parse(res.data.attentionInfo)['常见问题'];
						uni.setNavigationBarTitle({
							title: this.info.name
						})
					})
					.error(err => {

					})
			}
		},
		components: {
			rate
		}
	}
</script>

<style lang="less">
	.item {
		padding-bottom: 60rpx;

		.title {
			position: relative;
			display: block;
			padding: 10rpx 40rpx;
			margin-bottom: 20rpx;
			color: #b3b0b5;
			background-color: #f6f6f6;

			&::after {
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

		.avatar-box {
			padding: 40rpx 0 20rpx;
			text-align: center;

			.avatar {
				width: 300rpx;
				height: 300rpx;
			}
		}

		.baseData {
			.baseData_item {
				display: flex;
				padding: 5rpx 20rpx;

				.baseData_name {
					min-width: 160rpx;
				}
			}
		}
	}
</style>
