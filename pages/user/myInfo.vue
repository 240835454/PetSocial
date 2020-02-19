<template>
	<view class="page">
		<view class="content">
			<view class="item">
				<text class='name'>姓名</text>
				<input type="text" v-model='name' class='input-box' placeholder-class="phcolor" placeholder="请输入姓名"
				 maxlength="10" />
			</view>
			<view class="item">
				<text class='name'>性别</text>
				<picker mode="selector" :range="genderArr" @change="pickGender" range-key="value">
					<input type="text" v-model='gender' class='input-box select-icon' placeholder-class="phcolor" disabled placeholder="请选择性别"
					 maxlength="5" />
				</picker>
			</view>
			<view class="item">
				<text class='name'>地区</text>
				<picker mode="region" @change="pickRegion">
					<input type="text" v-model='region' class='input-box select-icon' placeholder-class="phcolor" disabled placeholder="请选择地区" />
				</picker>
			</view>
			<view class="footer">
				<text class='commit' @click='setUserInfo'>确定修改</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				genderArr: [{
					id: 0,
					value: '男'
				}, {
					id: 1,
					value: '女'
				}],
				name: '',
				gender: '',
				genderIndex: '',
				region: ''
			}
		},
		onLoad(){
			this.getUserInfo();
		},
		methods: {
			getUserInfo(){
				this.$http.get('/User/userInfo').then(res=>{
					this.name = res.data.name;
					this.gender = this.genderArr[res.data.gender].value;
					this.genderIndex = res.data.gender;
					this.region = res.data.region;
				})
			},
			// 选择性别
			pickGender(e) {
				this.gender = this.genderArr[e.detail.value].value;
				this.genderIndex = e.detail.value;
			},
			// 选择地区
			pickRegion(e){
				if(e.detail.value[0] == e.detail.value[1]){
					this.region = e.detail.value[1];
				}else{
					this.region = e.detail.value[0]+" "+e.detail.value[1]
				}
			},
			setUserInfo() {
				if (this.name != '' && this.gender != '' && this.region != '') {
					this.$http.post('/User/changeUserInfo', {
							name: this.name,
							gender: this.genderIndex,
							region: this.region
						})
						.then(res => {
							if (res.code == 1) {
								uni.showToast({
									icon: 'success',
									title: res.message,
									success: res=>{
										setTimeout(()=>{
											uni.navigateBack({
												delta: -1
											})
										},1000)
									}
								})
							}
						})
						.catch(err => {
							uni.showToast({
								icon: 'none',
								title: '系统错误，请稍后再试!'
							})
						})
				}else{
					uni.showToast({
						icon: 'none',
						title: '请将信息填写完整!'
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.content {
		padding: 20rpx;
		font-family: PingFang-SC-Medium;

		.item {
			color: #80899c;

			.input-box {
				height: 70rpx;
				padding-left: 20rpx;
				margin: 20rpx 0;
				border: 2rpx solid #e0e4ee;
				font-size: 30rpx;
			}
		}
	}
</style>
