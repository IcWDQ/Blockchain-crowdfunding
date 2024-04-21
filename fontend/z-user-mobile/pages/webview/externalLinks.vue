<template>
	<view class="">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				url:''
			}
		},
		onLoad(opt) {
			this.url = opt.url;
			console.log(this.url)
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
