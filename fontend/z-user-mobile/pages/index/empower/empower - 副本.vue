<template>
	<view class="">
		<view class="exchange_bg">
			<view class="jui_bg_f5f jui_lrtop box jui_flex jui_flex_justify_between " v-if="show">
				<view class="jui_fs29">
					1.获取到{{this.exchange_house_id==1?'火币':this.exchange_house_id==3?'币安':'OKEX'}}的{{this.exchange_house_id==1?'ACCESS_KEY':this.exchange_house_id==3?'API_KEY':'API_KEY'}}  用于同步持仓和交易数据
				</view>
				<view class="jui_fs29 jui_mar_t8">
					2.输入或复制粘贴你的ACCESS_KEY
				</view>
				<view class="jui_bg_fff jui_pad_2432 jui_mar_t20" style="width: 100%;">
					<view class="jui_flex  jui_flex_items_center justify-between jui_bor_bottom jui_pad_b20">
						<text style="width: 25%;">{{this.exchange_house_id==1?'ACCESS_KEY':this.exchange_house_id==3?'API_KEY':'API_KEY'}}：</text>
						<input type="text" value="" :placeholder="text" v-model="access_key" style="width: 70%;"/>
					</view>
					<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20 jui_bor_bottom jui_pad_b20">
						<text style="width: 25%;">SECRET_KEY：</text>
						<input type="text" value="" placeholder="请输入输入或粘贴SECRET_KEY内容" v-model="secret_key" style="width: 70%;"/>
					</view>
					<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20" v-if="exchange_house_id == 4">
						<text style="width: 25%;">密码：</text>
						<input type="password" value="" placeholder="请输入输入密码" v-model="pass_phrase" style="width: 70%;"/>
					</view>
				</view>
				<view class="jui_h80">	</view>
				<view class="zhuse  shouquan" @tap='empowerApi'>
					立即授权
				</view>
			</view>
			<view class="jui_bg_f5f jui_lrtop jui_pad_2432 jui_flex jui_flex_justify_between  jui_flex_items_center" v-else>
				<view class="jui_flex jui_flex_justify_between  jui_flex_items_center jui_mar_t20">
					<image :src="image" style="height: 50rpx;width: 50rpx;border-radius: 50%;" mode=""></image>
					<view class="jui_mar_l20">
						{{this.exchange_house_id==1?'火币':this.exchange_house_id==3?'币安':this.exchange_house_id==4?'OKEX':'中币'}}(已授权)
					</view>
				</view>
				<view class="jui_flex jui_flex_justify_between  jui_flex_items_center jui_mar_t20">
					<view class="btn" @tap="change">
						修改
					</view>
					<view class="btn" @tap="del()">
						删除
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import vNavigation from '@/components/navigation/navigation.vue'
	export default {
		components: {
			vNavigation
		},
		data() {
			return {
				naviValue: {
					"l": '/static/imgs/home/back.png',
					"c": '火币',
					"r": '查看教程',
					url:'/pages/index/webview/course'
				},
				access_key:'',
				secret_key:'',
				show:false,
				exchange_house_id:'',
				text:'',
				image:'',
				pass_phrase:'',
				userInfo:''
			}
		},
		onShow() {
			
			this.getFromToken()
			
		},
		onLoad(opt) {
			this.user()
			this.exchange_house_id = opt.id;
			this.image = opt.image
			
			uni.setNavigationBarTitle({
				title:opt.name
			})
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'/pages/index/webview/course'
			})
		},
		methods: {
			user() {
				let data = {
					FromToken: this.fromToken,
					uid: uni.getStorageSync('loginInfo').id,
				}
				this.$api.Center(data).then(res => {
					this.userInfo = res.data.user_info;
					if(this.exchange_house_id == 1){
						if(this.userInfo.access_key || this.userInfo.secret_key){
							this.show = false;
						}else {
							this.show = true;
						}
						this.text = '请输入或粘贴ACCESS_KEY内容'
						
					}
					if(this.exchange_house_id == 3 ){
						if(this.userInfo.ba_apikey || this.userInfo.ba_secretkey){
							this.show = false;
						}else {
							this.show = true;
						}
						this.text = '请输入或粘贴API_KEY内容'
					}
					if(this.exchange_house_id == 4 ){
						if(this.userInfo.ok_apikey || this.userInfo.ok_secretkey){
							this.show = false;
						}else {
							this.show = true;
						}
						this.text = '请输入或粘贴API_KEY内容'
					}
					uni.setStorage({
						key: 'userInfo',
						data: res.data.user_info
					})
				});
			},
			getFromToken() {
				this.$api.getFromToken({data:1}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken;
					
					}
				});
			},
			change(){
				this.show = true;
			},
			del(){
				let data = {
					exchange_house_id:this.exchange_house_id,
				}
				this.$api.deleteApiAuth(data).then(res => {
					this.$msg(res.msg);
					setTimeout(() => {
						uni.navigateBack()
					}, 1000);
				});
			},
			empowerApi() {
				console.log(123456)
				let data = {}
				if(this.exchange_house_id == 1){
					data = {
						access_key:this.access_key,
						secret_key:this.secret_key,
						exchange_house_id:this.exchange_house_id,
					}
					this.$api.auth(data).then(res => {
						this.$msg(res.msg);
						if(res.code == 1){
							setTimeout(() => {
								// uni.navigateBack();
								uni.switchTab({
									url:'/pages/task/task'
								})
							}, 1000);
						}
					});
				}
				if(this.exchange_house_id == 3){
					data = {
						api_key:this.access_key,
						secret_key:this.secret_key,
						exchange_house_id:this.exchange_house_id,
					}
					this.$api.auth_binance(data).then(res => {
						this.$msg(res.msg);
						if(res.code == 1){
							setTimeout(() => {
								uni.switchTab({
									url:'/pages/task/task'
								})
							}, 1000);
						}
					});
				}
				if(this.exchange_house_id == 4){
					data = {
						api_key:this.access_key,
						secret_key:this.secret_key,
						pass_phrase:this.pass_phrase,
						exchange_house_id:this.exchange_house_id,
					}
					this.$api.auth_okex(data).then(res => {
						this.$msg(res.msg);
						if(res.code == 1){
							setTimeout(() => {
								uni.switchTab({
									url:'/pages/task/task'
								})
							}, 1000);
						}
					});
				}
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
	.zhuse {
		background-color: $zhuse;
	}
	input {
		width: 70%;
	}
	.input-placeholder,.pl-input{color: #999;
font-size: 24rpx;}
	.shouquan {
		width: 678rpx;
		height: 82rpx;
		background: $zhuse;
		border-radius: 20rpx;
		line-height: 82rpx;
		text-align: center;
		color: #FFFFFF;
	}
	.btn {
		width: 150rpx;
		height: 60rpx;
		background-color:$zhuse;
		color: #FFFFFF;
		margin-right: 10rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
