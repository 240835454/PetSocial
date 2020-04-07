<template>
	<view class="">
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="item.id">
				<view class="item-icon" :style="{'background-color': item.color}">
					<image :src="item.icon" mode="" class="icon"></image>
				</view>
				<text class="name">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						id: 1,
						name: '通用',
						color: 'rgb(226,107,127)',
						icon: require('../../../static/account_1.png')
					},
					{
						id: 2,
						name: '美容造型',
						color: 'rgb(240,124,163)',
						icon: require('../../../static/account_2.png')
					}, {
						id: 3,
						name: '医疗',
						color: 'rgb(240,149,89)',
						icon: require('../../../static/account_3.png')
					}, {
						id: 4,
						name: '摄影',
						color: 'rgb(244,215,62)',
						icon: require('../../../static/account_4.png')
					}, {
						id: 5,
						name: '训练',
						color: 'rgb(115,195,248)',
						icon: require('../../../static/account_5.png')
					},
					{
						id: 6,
						name: '寄养',
						color: 'rgb(114,205,206)',
						icon: require('../../../static/account_6.png')
					},
					{
						id: 7,
						name: '宠物食品',
						color: 'rgb(94,194,170)',
						icon: require('../../../static/account_7.png')
					}, {
						id: 8,
						name: '营养护理',
						color: 'rgb(169,202,94)',
						icon: require('../../../static/account_8.png')
					}, {
						id: 9,
						name: '洗浴用品',
						color: 'rgb(98,133,242)',
						icon: require('../../../static/account_9.png')
					}, {
						id: 10,
						name: '食具',
						color: 'rgb(124,103,244)',
						icon: require('../../../static/account_10.png')
					},
					{
						id: 11,
						name: '服饰',
						color: 'rgb(180,117,242)',
						icon: require('../../../static/account_11.png')
					}, {
						id: 12,
						name: '玩具',
						color: 'rgb(238,119,88)',
						icon: require('../../../static/account_12.png')
					}, 
					{
						id: 13,
						name: '宠物用品',
						color: 'rgb(236,127,122)',
						icon: require('../../../static/account_13.png')
					}, {
						id: 14,
						name: '环境清洁', 
						color: 'rgb(241,184,193)',
						icon: require('../../../static/account_14.png')
					},
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="less">
	.list {
		display: flex;
		// justify-content: center;
		flex-wrap: wrap;
		padding: 40upx 20upx;
		box-sizing: border-box;

		.item {
			width: 16.6%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 30upx;
			font-size: 20upx; 
			.item-icon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
				.icon{
					width: 48upx;
					height: 48upx;
				}
			}
			.name{
				display: block;
				margin-top: 5upx;
			}
		}
	}
</style>
