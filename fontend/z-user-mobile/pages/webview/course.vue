<template>
	<view class="">
		<view class="" style="width: 100%; font-size: 32rpx;">
			<view class="jui_mar_t20 jui_pad_t20" id="abc" style="width: 95%;margin: 0 auto;">
				<jyf-parser :html="text" ref="article"></jyf-parser>
				<!-- <image src="../../../static/imgs/home/s2.jpg" style="height: 900rpx;" mode=""></image> -->
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				text:''
			}
		},
		onLoad() {
			this.terms()
		},
		methods:{
			terms(){
				this.$api.bind().then(res => {
					// console.log(res)
					this.text = res.data
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}
	.jui_main {
		
		margin:20rpx 20rpx;
	}
</style>
