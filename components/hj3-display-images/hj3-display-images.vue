<template>
	<view class="con" :style="{'margin-bottom':btm}">
		<image v-if="picmode" :src="backgroundImage" :style="{height:bgh}" class="back"></image>
		<view v-else="" :style="{height:bgh,'background-color':backgroundColor}" class="back"></view>
		<view class="stage" @touchstart="updateStart" @touchmove="updateMove" @touchend="updateEnd">
			<view class="box" :style="{transform:'rotateY('+ss+'deg)'}" :class="[vtouch&&touching?'':'slow']">
				<view v-for="(img,index) in imagesMap" :key="index" :style="{transform: 'rotateY('+(index*de)+'deg) translateZ('+wi+')'}">
					<image :src="img.src" mode="" @tap="tran(index)" :class="[vertical?'hrect-image':'vrect-image']"></image>
					<view class="title" :style="{'background-color':backcolor,'color':fontcolor,'text-align':titleAlign,top:titleBottom?imgh:'0px'}">{{img.title}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "hj3-display-images",
		props: {
			images: {
				type: Array,
			},
			vertical: {
				type: Boolean,
				default: true
			},
			vtouch: {
				type: Boolean,
				default: true
			},
			autoplay: {
				type: Boolean,
				default: false
			},
			interval: {
				type: Number,
				default: 3000
			},
			clockwise: {
				type: Boolean,
				default: false
			},
			titleBottom: {
				type: Boolean,
				default: false
			},
			backcolor: {
				type: String,
				default: 'rgba(0,0,0,0.2)'
			},
			fontcolor: {
				type: String,
				default: 'black'
			},
			titleAlign: {
				type: String,
				default: 'center'
			},
			background: String
		},
		computed: {
			picmode: function() {
				return !!this.backgroundImage
			},
			de: function() {
				return 360 / this.images.length
			},
			wi: function() {
				return uni.upx2px(350) + 'px';
			},
			btm: function() {
				if (this.vertical) {
					if (this.titleBottom)
						return uni.upx2px(320) + 'px';
					return uni.upx2px(240) + 'px';
				}
				if (this.titleBottom)
					return uni.upx2px(820) + 'px';
				return uni.upx2px(740) + 'px';
			},
			bgh: function() {
				if (this.vertical) {
					if (this.titleBottom)
						return uni.upx2px(620) + 'px';
					return uni.upx2px(540) + 'px';
				}
				if (this.titleBottom)
					return uni.upx2px(1600) + 'px';
				return uni.upx2px(1520) + 'px';
			},
			imgh: function() {
				if (this.vertical) return uni.upx2px(135) + 'px';
				else return uni.upx2px(416) + 'px';
			},
			hasTitle: function() {
				return this.images.some(ele => ele.title)
			},
			imagesMap: function() {
				if (!Array.isArray(this.images)) {
					console.warn('图片输入必须是地址数组，或者是图片对象')
					return []
				}
				var im = []
				this.images.forEach((ele, index) => {
					if (typeof(ele) === 'string')
						im.push({
							src: ele
						})
					else {
						let t = Object.create(null)
						if (!ele.src) {
							console.warn(`第${index}个图片对象缺少src属性`)
						} else {
							im.push({
								src: ele.src,
								title: ele.title || '',
								titleBottom: ele.titleBottom || false,

							})
						}
					}
				})
				return im
			}
		},
		data() {
			return {
				current: 0,
				ss: 0,
				start: null,
				last: null,
				touching: false,
				temp: 0,
				backgroundColor: 'rgba(0,0,0,0)',
				backgroundImage: null
			}
		},
		methods: {
			tran: function(index) {
				let old = this.current
				this.current = index;
				let c = (index - old) * this.de
				if (Math.abs(c) > 180) {
					if (c > 0) c = Math.abs(c) - 360
					else c = 360 - Math.abs(c)
				}
				this.ss += -c;
				this.$emit('itap', index)
			},
			updateStart: function(e) {
				if (this.vtouch) {
					this.touching = true;
					this.start = this.ss;
					this.last = e.touches[0].pageX;
				}
			},
			updateMove: function(e) {
				if (this.vtouch) {
					let np = e.touches[0].pageX;
					let tc = np - this.last;
					this.last = np;
					this.ss += tc;
				}
			},
			updateEnd: function(e) {
				if (this.vtouch) {
					this.touching = false;
					let fc = this.ss - this.start;
					let c = Math.round(fc / this.de);
					let index = (this.current - c) % 8;
					this.current = index > 0 ? index : (8 + index)
					this.ss = this.start + c * this.de;
					this.start = null;
				}
			},
			autoPlay: function() {
				setTimeout(() => {
					if (this.start === null) {
						if (this.clockwise)
							this.ss -= this.de;
						else
							this.ss += this.de;
					}
					this.autoPlay()
				}, this.interval)
			}
		},
		created: function() {
			if (this.images.length < 5 || this.images.length > 10)
				console.warn("图片最好控制在5-9张，可以通过处理images实现")
			if (this.autoplay)
				this.autoPlay()
			if (this.background.slice(0, 3) == 'rgb' || this.background.slice(0, 1) == '#') {
				this.backgroundColor = this.background
			} else {
				this.backgroundImage = this.background
			}
		}
	}
</script>

<style scoped="" lang="scss">
	.con {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		.stage {
			display: block;
			position: absolute;
			perspective: 800upx;
			background-color: blue;
		}

		.back {
			position: absolute;
			width: 100%;
		}

		.box {
			transform-style: preserve-3d;
			position: relative;
			width: 240upx;

			.title {
				position: absolute;
				width: 240upx;
				height: 36upx;
				font-size: 28upx;
			}

			image {
				z-index: 0;
				position: absolute;
				width: 240upx;
				box-shadow: -3upx 5upx 3upx rgba(0, 0, 0, 0.3);
			}

			.vrect-image {
				height: 416upx;
			}

			.hrect-image {
				height: 135upx;
			}
		}

		.slow {
			transition-duration: 1s;
		}
	}
</style>
