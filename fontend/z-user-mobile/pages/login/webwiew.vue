<template>
	<view class="">
		<web-view :src="baseUrl"></web-view>
	</view>
</template>

<script>
	import global from '../../api/global.js'
	export default {
		data(){
			return{
				baseUrl:''
			}
		},
		onLoad() {
			this.baseUrl = global.baseUrl+'download/'
			console.log(this.baseUrl)
		}
	}
	
</script>

<style>
</style>
