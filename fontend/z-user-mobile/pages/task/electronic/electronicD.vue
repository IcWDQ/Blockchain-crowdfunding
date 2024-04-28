<template>
	<view class="bg-zs">
		<view class="bg-fff bor-rad45r p40r bor-rad-b0">
			<view class="bor-b pt30r pb30r" v-for="(item,index) in data" :key='index'>
				<view class=" fw-w f32r color-000">{{item.symbol}}</view>
				<view class="x-bc mt20r">
					<view class="flex1">时间</view>
					<view class="flex1 tc">状态</view>
					<view class="flex1 tr">盈利</view>
				</view>
				<view class="x-bc mt20r">
					<view class="flex1">{{item.finish_time}}</view>
					<view class="flex1 tc">已完成</view>
					<view class="flex1 tr">{{item.total_profit}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: ''
			}
		},
		onLoad(e) {
			this.getDayProfit(e.time)
			uni.setNavigationBarTitle({
				title: e.time
			})
		},
		methods: {
			getDayProfit(search_time) {
				let data = {
					page: 1,
					data_list: 9999,
					search_time
				}
				this.$api.getDayProfit(data).then(res => {
					if (res.code == 1) {
						this.data = res.data.data
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}
</style>
