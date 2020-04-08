<template>
	<view class="">
		<view class="total">
			<view class="">
				<image src="../../../../static/money.png" mode="" class="icon"></image>
				<text>
					2020总支出
				</text>
			</view>
			<text class="sumPrice">
				￥{{sum}}
			</text>
		</view>
		<timeline>
			<timelineItem v-for="(item,index) in list" :key="index" :leftTime="item.date">
				<view class="title">
					总支出 ￥{{item.sum}}
				</view>
				<view class="tripItem" v-for="(secItem,secIndex) in item.list" :key="secIndex">
					<view class="tips">
						<view class="icon-box" :style="{'background-color': secItem.color}">
							<image :src="secItem.icon" mode="" class="icon"></image>
						</view>
						{{secItem.name}}￥{{secItem.cost}}
					</view>
				</view>
			</timelineItem>
<!-- 			<timelineItem leftTime='2020-01-02'>
				<view class="tripItem">
					<view class="title">您接收了健康教育内容推送</view>
					<view class="tips">内容：xxxx</view>
				</view>
			</timelineItem>
			<timelineItem leftTime='2020-01-01'>
				<view class="tripItem">
					<view class="title">您接收了健康教育内容推送</view>
					<view class="tips">内容：xxx</view>
				</view>
				<view class="tripItem">
					<view class="title">您接收了健康教育内容推送</view>
					<view class="tips">内容：xxx</view>
				</view>
			</timelineItem> -->
		</timeline>
	</view>
</template>

<script>
	import timeline from '@/components/chenbin-timeline/timeLine.vue'
	import timelineItem from '@/components/chenbin-timeline/timelineItem.vue'
	export default {
		components: {
			timeline,
			timelineItem
		},
		data() {
			return {
				list: [],
				sum: 0
			}
		},
		created(){
			this.getList();
		},
		methods: {
			getList() {
				this.$http.get('/petbnb/getAccountList', {
						date: '2020'
					})
					.then(res => {
						this.list = res.data.list;
						this.sum = res.data.sum;
						function handleList(list){
							let arr = [];
							let newArr = [];
							let price = 0;
							let k = 0;
							let firstDate = list[0].date;
							let handleList = list.map((v)=>{
								if(firstDate == v.date){
									arr.push(v);
									price += v.cost;
									newArr[k] = {
										date: firstDate,
										list: arr,
										sum: price
									}
								}else{
									firstDate = v.date;
									arr = [];
									price = 0;
									arr.push(v);
									price += v.cost;
									newArr[++k] = {
										date: firstDate,
										list: arr,
										sum: price
									}
								}
							});
							return newArr;
						}
						this.list = handleList(this.list);
						console.log(this.list)
					})
			},
		}
	}
</script>

<style lang="less">
	.total{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15upx;
		box-sizing: border-box;
		background-color: #fff;
		border-bottom: 1upx solid #ccc;
		.icon{
			width: 36upx;
			height: 36upx;
		}
	}
	.title {
	    font-size:28rpx;
	    font-family:PingFangSC-Medium,PingFang SC;
	    font-weight:500;
	    color:rgba(51,51,51,1);
	}
    .tripItem {
            height:140rpx;
            padding: 20rpx 30rpx;
            box-sizing: border-box;
            background:rgba(255,255,255,1);
            box-shadow:0px 0px 20px 0px rgba(0,0,0,0.08);
            border-radius:10px;
            margin-bottom: 30rpx;
            .tips {
				display: flex;
				align-items: center;
                font-size:24rpx;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                // color:rgba(153,153,153,1);
                margin-top: 20rpx;
				.icon-box{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 80upx;
					height: 80upx;
					margin-right: 20upx;
					border-radius: 50%;
					.icon{
						width: 48upx;
						height: 48upx;
					}
				}
            }
        }
</style>
