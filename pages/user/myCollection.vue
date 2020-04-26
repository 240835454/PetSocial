<template>
	<view class="">
		<view class="item" v-for="(item, index) in likeList" :key="index" @click="lookDetail(item.post_id)">
			<view class="item-logo">
				<image :src="api + item.post_content.images[0]" mode="aspectFill" class="logo" v-if="item.post_content.images && item.post_content.images.length !== 0"></image>
				<text class="text">{{item.post_content.text}}</text>
				<!-- <image :src="api + item.post_content.images[0]" mode="aspectFill" class="logo" v-if="item.post_content.images"></image> -->
				<video :src="api + item.post_content.video[0]" class="logo" controls v-if="item.post_content.video && item.post_content.video.length !== 0"></video>
			</view>
			<view class="item-box">
				<image :src="api + item.post_avatar" mode="aspectFill" class="avatar"></image> 
				<text class="name">{{ item.post_name }}</text>
				<text class="time">{{ getDate('yyyy-mm-dd',item.post_timestamp) }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: {},
			api: this.$API,
			likeList: []
		};
	},
	onLoad() {
		this.getLikes();
	},
	methods: {
		getLikes() {
			this.$http.get('/User/myCollection').then(res => {
				this.likeList = res.data.list;
				for(let i of this.likeList){
					i.post_content = JSON.parse(i.post_content)
				} 
			});
		},
		lookDetail(id){
			uni.navigateTo({
				url: 'components/likeDetail?id='+id 
			})
		},
		//补0操作
		getzf(num) { 
			if (parseInt(num) < 10) {
				num = '0' + num;
			}
			return num;
		},

		//转换年月日方法
		getDate(format, str) {
			let oDate = new Date(parseInt(str)),
				oYear = oDate.getFullYear(),
				oMonth = oDate.getMonth() + 1,
				oDay = oDate.getDate(),
				oHour = oDate.getHours(),
				oMin = oDate.getMinutes(), 
				oSec = oDate.getSeconds();  
			let oTime = '';
			if (format == 'yyyy-mm-dd') {
				oTime = oYear + '-' + this.getzf(oMonth) + '-' + this.getzf(oDay) + ' ' + this.getzf(oHour) + ':' + this.getzf(oMin) + ':' + this.getzf(oSec); //最后拼接时间
			} else if (format == 'yyyyMMddHHmm') {
				// oTime = oYear +'/'+ getzf(oMonth) +'/'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSec);//最后拼接时间
				oTime = oYear + '' + this.getzf(oMonth) + '' + this.getzf(oDay) + '' + this.getzf(oHour) + '' + this.getzf(oMin) + '' + this.getzf(oSec); //最后拼接时间
			}
			return oTime;
		}
	}
};
</script>

<style lang="less">
page {
	padding: 20upx;
	box-sizing: border-box;
	background-color: #f8f8f8;
}
.item {
	padding: 30upx;
	background-color: #fff;
	border-radius: 10upx;
	margin-bottom: 20upx;
	.item-logo{
		display: flex;
		margin-bottom: 20upx;
		.logo{
			width: 160upx;
			height: 160upx;
			margin-right: 20upx;
		}
		.text{
			display: block;
			padding: 5upx 0;
		}
	}
	.item-box {
		display: flex;
		align-items: center;
		font-size: 24upx;
		.avatar {
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
		}
		.name {
			display: inline-block;
			margin: 0 20upx;
		}
	}
}
</style>
