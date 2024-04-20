<template>
	<view class="page">
		<view class="jui_h60">
		</view>
		<view class="tit">
			Retrieve password
		</view>
		<view class="content">
			<view class="list">
				<input type="text" placeholder="Please enter your mobile number" v-model="phoneNumber">
				
			</view>
			<view class="list">
				<input type="text" placeholder="Please enter the graphic verification code" v-model="picCode">
				<image :src="verificationCode"  style="width: 200upx;height: 60upx" @tap="codePic()"></image>
			</view>
			<view class="list">
				<input type="text" placeholder="Please enter the verification code" v-model="mobile_code">
				<view  class="get-code jui_flex jui_flex_justify_end jui_flex_items_center jui_fc_zhuse jui_fs28" :disabled="code.status" @tap="getCode">{{ code.text }}</view>
			</view>
			
			<view class="list">
				<input type="password" placeholder="Please enter your login password" v-model="pwd">
				
			</view>
			<view class="list">
				<input type="password" placeholder="Please enter your login password again" v-model="pwd1">
			</view>
			<view class="jui_h100">

			</view>
			<view class="">
				<view @tap="login" class="login jui_bor_rad_10 pad jui_text_center   jui_fc_fff  jui_fs30">
					登录
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: {
					text: 'Get verification code',
					status: false,
					y_code: ''
				},
				phoneNumber: '',
				mobile_code: '',
				picCode:'',
				pwd: '',
				pwd1: '',
				FromToken:'',
				verificationCode:'',
				verificationNumber:''
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getFromToken();
			this.codePic()
		},
		methods: {
			//Graphic verification code
			codePic(){
				this.$api.getImgCode({data:1}).then(res => {
					if (res.code == 1) {
						this.verificationCode = res.data.data;
						this.verificationNumber = res.data.uuid
					}
				});
			},
			getFromToken() {
				this.$api.getFromToken({data:1}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken;	
					}
				});
			},
			back() {
				uni.navigateTo({
					url: 'login'
				})
			},
			login() {
				console.log(123)
				if (this.phoneNumber == '') {
					this.$msg('Please enter your phone number');
					return false;
				}
				if (this.mobile_code == '') {
					this.$msg('Please enter the verification code');
					return false;
				}
				if (this.pwd == '') {
					this.$msg('Please enter password');
					return false;
				}
				if (this.pwd1 == '') {
					this.$msg('Enter confirmation password');
					return false;
				}
					let data = {
						mobile: this.phoneNumber,
						mobile_code: this.mobile_code,
						password: this.pwd,
						password2: this.pwd1,
						FromToken:this.FromToken
					}
					console.log(data)
					this.$api.forgetPassWord(data).then(res => {
						console.log(res)
						if (res.code == 1) {
							this.$msg(res.msg);
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/login/login'
								})
							}, 800);
	
						}
	
					})
				
	
			},
		getCode() {
			let that = this;
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.phoneNumber)) {
				that.$msg('Please fill in the correct mobile phone number');
				return false;
			}
			let countdown = 60;
			that.code.status = true;
			var data = { 
				mobile: that.phoneNumber,
				FromToken:that.FromToken,
				uuid:that.verificationNumber,
				image_code:that.picCode,
				send_type:2
			};
			that.$api.GetMobileCode(data).then(res => {
				if (res.code === 1) {
					that.code.text = countdown + '秒';
					that.code.status = true;
					let timer = setInterval(() => {
						if (countdown > 0) {
							that.code.text = countdown - 1 + '秒';
							countdown--;
						} else {
							clearInterval(timer);
							that.code.text = 'Get verification code';
							that.code.status = false;
						}
					}, 1000);
				} else {
					that.code.status = false;
				}
			});
		},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #FFFFFF;
	}
	.page {
		padding: 0 30upx;
		overflow: hidden;
	}

	.tit {
		font-size: 50upx;
		color: #383630;
		margin-top: 30upx;
		font-weight: 600;
	}

	.content {
		margin-top: 40upx;
		// padding: 0 30upx;

		.list {
			width: 100%;
			height: 100upx;
			border-bottom: 1upx solid #DEDEDE;
			font-size: 40upx;
			margin-bottom: 30upx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.input-placeholder {
				color: #DBDCDF;
				font-size: 32upx;
			}

			input {
				height: 100%;
				font-size: 32upx !important;
				color: #333;
				flex: 1;
			}

			image {
				width: 44upx;
				height: 44upx;
			}

			view {
				width: 180upx;
				height: 66upx;

				font-size: 28upx;
				// background: $theme-color;
				border-radius: 50upx;
				text-align: center;
				line-height: 66upx;
			}
		}

		.bot {
			margin-top: 20upx;
			display: flex;
			align-items: center;
			font-size: 26upx;
			color: #333;

			text {
				color: #0091FF;
			}

			image {
				width: 28upx;
				height: 28upx;
				margin-right: 16upx;
			}
		}

		.btn {
			width: 70%;
			height: 80upx;
			font-size: 32upx;
			text-align: center;
			line-height: 80upx;
			color: #fff;
			// background: $theme-color;
			margin: 60upx auto;
			border-radius: 50upx;
		}
	}
	.login {
		background-color: $zhuse;
	}
	.pad {
		padding: 20rpx 0;
	}
</style>
