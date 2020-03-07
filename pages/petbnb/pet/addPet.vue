<template>
	<view class="content">
		<view class="box">
			<image src="../../../static/camera.png" class="icon" mode=""></image>
			<view class="item">
				<text>宠物名称</text>
				<input type="text" value="" placeholder="设置宠物名称" placeholder-style='text-align:right' class="input-box"/>
			</view>
			<view class="item">
				<text>宠物性别</text>
				<input type="text" value="" placeholder="选择宠物性别" placeholder-style='text-align:right' class="input-box"/>
			</view>
			<view class="item">
				<text>宠物品种</text>
				<input type="text" value="" placeholder="选择宠物品种" placeholder-style='text-align:right' class="input-box"/>
			</view>
			<view class="item">
				<text>宠物生日</text>
				<input type="text" value="" placeholder="选择宠物生日" placeholder-style='text-align:right' class="input-box"/>
			</view>
			<view class="item">
				<text>绝育状态</text>
				<input type="text" value="" placeholder="绝育状态" placeholder-style='text-align:right' class="input-box"/>
			</view>
			<view class="footer">
				<text class="button">保存</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		
	}
</script>

<style lang="less">
	page{
		background-color: #f9f9f9;
	}
	
	.box{
		text-align: center;
		.icon{
			width: 120upx;
			height: 120upx;
			margin: 50upx 0 30upx;
			border: 1upx solid rgba(224,224,224,0.5);
			padding: 15upx;
			border-radius: 50%;
			z-index: 10;
		}
		.item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20upx;
			background-color: #fff;
			border-bottom: 1upx solid #f6f6f6;
			&:last-child{
				border-bottom: none;
			}
			.input-box{
				text-align: right;
			}
		}
		.footer{
			.button{
				display: inline-block;
				padding: 15upx 300upx;
				background-color: #F2473D;
				border-radius: 20upx;
				color: #fff;
			}
		}
	}
</style>
