<template>
	<view class="">
		123
		<button type="" @click="enterEncyclopedia">宠物百科</button>
	</view>
</template>

<script>
	export default{
		methods:{
			// 进入宠物百科
			enterEncyclopedia(){
				uni.navigateTo({
					url: './encyclopedia/encyclopedia'
				})
			}
		}
	}
</script>

<style>
</style>
