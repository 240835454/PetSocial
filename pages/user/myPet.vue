<template>
	<view class="">
		<view class="" v-for="(item,index) in petList" :key="index" class="item">
			<image :src="api + item.avatar" mode="aspectFill" class="item-img"></image>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				petList: [],
				api: this.$API
			}
		},
		onLoad(){
			this.getPetList();
		},
		methods:{
			// 获取用户宠物列表
			getPetList() {
				this.$http.get('/petbnb/getPetList')
					.then(res => {
						if (res.code === 1) {
							this.petList = res.data.list;
						}
					})
					.catch(err => {
			 
					})
			},
		}
	}
</script>

<style lang="less">
	.item{
		.item-img{
			width: 120upx;
			height: 120upx;
			border-radius: 50%;
		}
	}
</style>
