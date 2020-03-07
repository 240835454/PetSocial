<template>
	<view class="">
		<image src="" mode="" class="rate" :class="'level'+level"></image>
	</view>
</template>

<script>
	export default{
		props: {
			level: {
				type: Number,
				default () {
					return {}
				}
			}
		},
		created(){
			
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang='less'>
	.rate{
		display: inline-block;
		width: 160upx;
		height: 24upx;
		background-repeat: no-repeat;
		background-image: url('https://res.ycw.com/web/images/pets/icon-pets-star.png');
	}
	
	.level1{
		background-position: 0 0;
	}
	.level2{
		background-position: 0 -24upx;
	}
	.level3{
		background-position: 0 -48upx;
	}
	.level4{
		background-position: 0 -72upx;
	}
	.level5{
		background-position: 0 -96upx;
	}
	.level6{
		background-position: 0 -120upx;
	}
	.level7{
		background-position: 0 -144upx;
	}
	.level8{
		background-position: 0 -168upx;
	}
	.level9{
		background-position: 0 -192upx;
	}
	.level10{
		background-position: 0 -216upx;
	}
</style>
