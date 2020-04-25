<template>
	<view class="page"><view class="" v-html="info"></view></view>
</template>

<script>
export default {
	data() {
		return {
			info: ''
		};
	},
	onLoad(options) {
		this.$http
			.get('/petbnb/article/getArticleDetail', {
				id: options.id
			})
			.then(res => {
				this.info = res.data[0].detail;
			});
	},
	methods: {}
};
</script>

<style lang="less"> 
.page {
	padding: 30upx 10upx;
	box-sizing: border-box;
}
</style>
