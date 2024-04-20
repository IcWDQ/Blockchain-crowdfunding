<template>
	<view class="jui_main ">
		<view class="jui_h300">
			<image src="/static/imgs/home/baner1.png" mode="aspectFill" style="width: 100%; height: 200px; border-bottom-left-radius: 40px; border-bottom-right-radius: 40px;"></image>
		</view>
		<view class="jui_h60"></view>
		<view class="jui_font_weight  title jui_pad_l20" style="">
			User login
		</view>
		<view class="jui_h60"></view>
		<view class="jui_pad_2432">
			<input type="number"  value="" placeholder="Please enter your mobile number" class="jui_bor_bottom jui_pad_b20 jui_fs32"
				style="height: 60rpx;" v-model="phoneNumber" />
			<view class="jui_h30"></view>
			<view class="jui_h20"></view>
			<view class="jui_bor_bottom jui_pad_b20 jui_flex jui_flex_justify_between jui_flex_items_center">
				<input :type="iptType" placeholder="Please enter your login password" class="jui_fs32" v-model="passwd"
					style="border: none;outline: none;height: 60rpx;">

				<image :src="imgSrc" class="pwdPic" @click="changeType()"></image>
			</view>
		</view>
		<view class="jui_pad_2432 jui_flex jui_flex_justify_between jui_flex_items_center ">
			<view class="reg" @tap="regi">
				Sign in
			</view>
			<!-- <view class="pwd" @tap="forget">
				Forgot password
			</view> -->
		</view>
		<view class="jui_h60"></view>
		<view class="jui_pad_2432">
			<view @tap="login" class="login jui_bor_rad_10 pad jui_text_center   jui_fc_fff jui_fs30">
				Log in
			</view>
		</view>
	</view>
</template>

<script>
	// const  noView= require('../../static/imgs/home/view.png');
	const view = require('../../static/imgs/home/view_no.png');
	export default {
		data() {
			return {
				iptType: 'password',
				imgSrc: view,
				phoneNumber: '',
				passwd: '',
				noView: '/static/imgs/home/view.png',
				FromToken: '',
				logo:'',
				from: '',
			}
		},
		onLoad(opt) {
			this.from = opt.from
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/login/codeLogin'
			})
		},
		onShow() {
			// this.getFromToken();
			// this.getJobConfig()
		},
		methods: {
			getJobConfig(){
				this.$api.getJobConfig({data:1}).then(res => {
					if (res.code == 1) {
						this.logo = res.data.web_logo;
						// uni.setNavigationBarTitle({
						// 	title: res.data.web_name
						// })
					}
				});
			},
			getFromToken() {
				this.$api.getFromToken({data:1}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken
					}
				});
			},
			login() {
				if (this.phoneNumber == '' && this.phoneNumber.length!=11) {
					this.$msg('Please enter the correct mobile number');
					return false;
				}
				if (this.passwd == '') {
					this.$msg('Please enter your login password');
					return false;
				}
				uni.hideKeyboard();
				let data = {
					mobile: this.phoneNumber,
					password: this.passwd,
					// FromToken: this.FromToken
				};
				uni.setStorageSync('token', 'token');
				uni.setStorageSync('loginInfo', {user_name:'yjk001', user_id: 1, user_token: '123123',is_valid: 0});
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/index/index'
					});
				}, 1000);
				// this.$api.login(data).then(res => {
				// 	if(res.code == 1) {
				// 		this.$msg(res.msg);
				// 		uni.setStorageSync('token', res.token);
				// 		uni.setStorageSync('loginInfo', res.data);
				// 		setTimeout(() => {
				// 			uni.reLaunch({
				// 				url: '/pages/index/index'
				// 			});
				// 		}, 1000);
				// 	}
					
				// });
	
			},
			forget() {
				console.log(13465)
				uni.navigateTo({
					url: '/pages/login/forgetPwd'
				})
			},
			regi() {
				uni.navigateTo({
					url: 'register'
				})
			},
			changeType() {
				// console.log(this.iptType,this.imgSrc)
				var $this = this;
				if ($this.iptType == 'text') {
					$this.iptType = 'password';
					$this.imgSrc = view;
				} else {
					$this.iptType = 'text';
					$this.imgSrc = this.noView;
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF
	}

	.title {
		font-size: 50upx;
		color: #383630;
	}

	input {
		outline: none
	}

	input:focus {
		outline: none;
	}

	.pwdPic {
		height: 50upx;
		width: 50upx;
	}

	.reg {
		font-size: 32upx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #383630;
	}

	.pwd {
		font-size: 28upx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #383630;
	}

	.login {
		background-color: $zhuse;
	}

	.pad {
		padding: 20rpx 0;
	}
</style>
