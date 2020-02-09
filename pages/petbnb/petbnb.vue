<template>
	<view class="">
		<view class="pet-box">
			
		</view>
		<view class="">
			<button type="" @click="enterEncyclopedia">宠物百科</button>
		</view>
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
