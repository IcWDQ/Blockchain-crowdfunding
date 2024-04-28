<template>
	<view class="bg-zs">
		<view class="bor-rad30r bg-fff p36r pt46r bor-rad-b0">
			<view class="f32r fw-w">Promotional video</view>
			<view class="w678r h320r mt36r">
				<video class="w100 h100 bor-rad20r" :src="data.mp4" :poster='data.web_logo'>

				</video>
			</view>
			<view class="f32r fw-w mt40r">News</view>
			<view class="">
				<view @tap="jump('/pages/index/news/newsDetail?id='+item.id)" class="x-f bor-b pt25r pb25r" v-for="(item,index) in list" :key='index'>
					<image :src="item.n_img" class="w226r h146r mr20r bor-rad20r" mode=""></image>
					<view class="flex1 als-s y-b">
						<view class="">{{item.n_title}}</view>
						<view class="x-bc color-999 f24r">
							<view class=""></view>
							<view class="">{{item.n_time}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: '',
				list: ''
			};
		},
		onLoad() {
			this.getJobConfig()
			this.getLastNotice()
		},
		methods: {
			getJobConfig() {
				this.$api.getJobConfig().then(res => {
					if (res.code == 1) {
						this.data = res.data
					}
				})
			},
			getLastNotice() {
				let data = {
					status: 1
				}
				this.$api.getLastNotice(data).then(res => {
					if (res.code == 1) {
						this.list = res.data.data
					}
				})
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
</style>
