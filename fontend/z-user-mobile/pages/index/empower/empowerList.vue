<template>
	<view class="">
		<view class="exchange_bg">
			<view class="jui_bg_f5f jui_lrtop box jui_flex jui_flex_justify_between " >
				<view class="list_box" v-for="(item,index) in list" :key="index" @tap="detail(item,index)">
					<view class="jui_flex">
						<image :src="item.image" style="height: 36rpx;width: 36rpx;" mode=""></image>
						<view class="jui_mar_l20">
							{{item.name}}
						</view>
					</view>
					<image src="/static/imgs/home/right.png" style="height: 24rpx;width: 14rpx;" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				list:[]
			}
		},
		onLoad() {
			this.exchange()
		},
		methods:{
			exchange(){
				let data = {
					FromToken:this.FromToken,
				}
				this.$api.exchange_house(data).then(res => {
					this.list = res.data
				});
			},
			detail(item){
				uni.navigateTo({
					url:`/pages/index/empower/empower?name=${item.name}&id=${item.id}&image=${item.image}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.exchange_bg {
		background:$zhuse;
		// padding-top: 90rpx;
		.box {
			padding: 50rpx 30rpx 0 30rpx;
			flex-wrap: wrap;
		}
	}
	.list_box {
		background-color: #FFFFFF;
		width: 678rpx;
		height: 102rpx;
		background: #FFFFFF;
		border-radius: 30rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		margin-bottom: 20rpx;
	}
</style>
