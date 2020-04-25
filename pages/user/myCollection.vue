<template>
	<view class="">
		<view class="item" v-for="(item, index) in likeList" :key="index">
			<view class=""><image src="" mode=""></image></view>
			<view class="item-box">
				<image :src="api + item.avatar" mode="aspectFill" class="avatar"></image>
				<text class="name">{{ item.name }}</text>
				<text class="time">{{ getDate('yyyy-mm-dd',item.timestamp) }}</text>
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
			});
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
			console.log(str);
			var oDate = new Date(),
				oYear = oDate.getFullYear(str),
				oMonth = oDate.getMonth(str) + 1,
				oDay = oDate.getDate(str),
				oHour = oDate.getHours(str),
				oMin = oDate.getMinutes(str), 
				oSec = oDate.getSeconds(str);  
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
