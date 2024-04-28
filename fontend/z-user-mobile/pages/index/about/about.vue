<template>
	<view class="">
	<view class="">
		<view class="jui_bg_fff jui_mar_2432 jui_pad_2432 jui_bor_rad_30" >
			<h2 style="text-align: center;">About Us</h2>
			    <h4></h4>
			    <p>We are the FTGP Group 1 !!!</p>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				text:'',
				FromToken:''
			}
		},
		onLoad() {
		},
		onShow() {
			// this.getFromToken();
			
		},
		methods:{
			getFromToken() {
				this.$api.getFromToken({data:1}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken;
						this.about()
						
					}
				});
			},
			about(){
				this.$api.getJobTreaty({FromToken:this.FromToken ,web_type:'web_about'}).then(res => {
					if (res.code == 1) {
						this.text = res.data
						console.log(123456)
					}
				});
			}
		}
	}
</script>

<style>
</style>
