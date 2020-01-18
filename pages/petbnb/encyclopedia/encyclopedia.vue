<template>
	<view class="content">
		<template v-for="(item,index) in list">
			<view :key='item.id' class='item' @click='enterType(item.id,item.name)'>
				<image :src="item.icon" mode="aspectFit" class="icon"></image>
				<text>{{item.name}}</text>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						id: 1,
						name: '狗狗',
						icon: '../../../static/dog.png'
					},
					{
						id: 2,
						name: '猫猫',
						icon: '../../../static/cat.png'
					},
					{
						id: 3,
						name: '兔子',
						icon: '../../../static/rabbit.png'
					},
					{
						id: 4,
						name: '鼠类',
						icon: '../../../static/mouse.png'
					}, {
						id: 6,
						name: '宠物鸟',
						icon: '../../../static/bird.png'
					}, {
						id: 7,
						name: '宠物龟',
						icon: '../../../static/turtle.png'
					}, {
						id: 8,
						name: '宠物鱼',
						icon: '../../../static/fish.png'
					}, {
						id: 5,
						name: '其它',
						icon: '../../../static/lizard.png'
					},
				]
			}
		},
		methods: {
			enterType(id, name) {
				uni.navigateTo({
					url: './petTypeList?id=' + id + '&name=' + name + '品种'
				})
			}
		}
	}
</script>

<style lang="less">
	.content {
		.item {
			display: flex;
			align-items: center;
			padding: 20upx;
			border-bottom: 1upx solid #f5f5f5;

			.icon {
				width: 64upx;
				height: 64upx;
				margin-right: 20upx;
				border-radius: 50%;
			}
		}
		.input{
			padding: 20rpx 0;
			border: 1rpx solid #808080;
		}
	}
</style>
