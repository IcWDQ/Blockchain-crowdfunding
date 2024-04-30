<template>
	<view class="jui_flex_col_center">
		<view class=" jui_fc_999 jui_mar_t20">
			{{time}}
		</view>
		<jyf-parser :html="article" ref="article" class="jui_pad_2432 "></jyf-parser>
		
	</view>
	</view>
	
</template>

<script>
	import Base64 from '../../tool/base64.js';
	export default {
		data(){
			return {
				article:'',
				time:''
			}
		},
		onLoad(opt) {
			this.id = opt.id
		},
		onShow() {
			this.getFromToken()
		},
		methods:{
			getFromToken() {
				this.$api.getFromToken({data:1}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken;
						this.detail();
					}
				});
			},
			detail(){
				var data = {
					FromToken:this.FromToken,
					id:this.id,
				};
				this.$api.articleDeatil(data).then(res => {
					if (res.code == 1) {
						let base64 = new Base64();
						this.time = res.data.create_time
						this.article =  base64.decode(res.data.content);
						
					}
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}
</style>
