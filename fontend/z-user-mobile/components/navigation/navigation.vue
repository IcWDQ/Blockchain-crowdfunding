<template>
	<view class="top">
		<view class="search">
			<view class="l" @tap="back()">
				<image :src="value.l" mode=""></image>
			</view>
			<view class="c">
				<text>{{value.c}}</text>
			</view>
			<view class="r" @tap="goRight(value.url)">
				<text>{{value.r}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'v-navigation',
		data(){
			return {
				
			}
		},
		props: {
			value: {},
		},
		methods:{
			back(){
				uni.navigateBack()
			},
			goRight(item){
				console.log(item)
				uni.navigateTo({
					url:item
				})
			}
		}
	}
</script>

<style lang="scss">
	.top {
		position: absolute;
		width: 100%;
		z-index: 1;
		padding: 14upx 20upx;
		background:$zhuse;
		// #ifdef MP-WEIXIN
		padding-top: 50upx;
		padding-right: 28%;
		// #endif
		box-sizing: border-box;
	}
	.search {
		display: flex;
		align-items: center;
		justify-content: space-between;
	
		.l {
			width: 33%;
			display: flex;
			flex-direction: column;
			// align-items: center;
			text-align: center;
			image {
				width: 56upx;
				height: 32upx;
				border-radius: 16px;
				display: block;
			}
	
			text {
				font-size: 16upx;
				color: #fff;
				display: block;
			}
		}
	
		.c {
			width: 33%;
			height: 60upx;
			display: flex;
			align-items: center;
			text-align: center;
			justify-content: center;
			text {
				font-size: 36upx;
				color: #fff;
				font-weight: 500;
			}
		}
	
		.r {
			width: 33%;
			display: flex;
			align-items: center;
			text-align: right;
			justify-content:flex-end ;
			image {
				width: 40upx;
				height: 40upx;
				display: block;
				// margin-bottom: 6upx;
			}
	
			text {
				font-size: 28rpx;
				color: #fff;
				display: block;
			}
		}
	}
</style>
