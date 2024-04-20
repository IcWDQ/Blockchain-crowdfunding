<template>
	<view class="page">
		<view class="jui_h60"></view>
		<view class="tit">
			User registration
		</view>
		<view class="content">
			<view class="list">
				<input type="text" placeholder="Please enter a nickname" v-model="name">
			</view>
			<view class="list">
				<input type="number" maxlength="11" placeholder="Please enter your mobile number" v-model="phoneNumber">
			</view>
<!-- 			<view class="list">
				<input type="text" placeholder="Please enter the graphic verification code" v-model="picCode">
				<image :src="verificationCode" style="width: 200upx;height: 60upx" @tap="codePic()"></image>
			</view> -->
			<view class="list">
				<input type="text" placeholder="The SMS verification code is 123456" v-model="code.y_code">
				<view class="get-code jui_flex jui_flex_justify_end jui_flex_items_center jui_fc_zhuse jui_fs28"
					:disabled="code.status" @tap="getCode">{{ code.text }}</view>
			</view>

			<view class="list">
				<input :type="iptType" placeholder="Please enter your login password" v-model="passwd" class="ipt">
				<image :src="imgSrc" @click="changeType()"></image>
			</view>
			<view class="list">
				<input :type="iptType" placeholder="Please enter your login password" v-model="confirm_password" class="ipt">

			</view>
			<view class="list">
				<input type="number" maxlength="6"  placeholder="Please enter a six-digit trading password" v-model="safe_pwd" class="ipt" />
			</view>
			<view class="list">
				<input type="number" maxlength="6"  placeholder="Please enter your secure transaction password" v-model="confirm_safe_pwd" class="ipt" />
			</view>
			<view class="list">
				<input type="text" placeholder="Please enter the invitation code" v-model="invi_code" :disabled='status' />
			</view>
			<view class="bot" @tap="check">
				<view class=" border jui_mar_r16">
					<image :src="pic"></image>
				</view>
				<view>
					<text class="jui_fc_000">agree</text>
					<text @tap.stop="jump('/pages/login/text')" class="jui_fc_zhuse">
						《Terms of Use for Crowdfunding Chain Project Investment》
					</text>
				</view>
			</view>
			<view class="jui_h60">
			</view>
			<view class="">
				<view @tap="register" class="login jui_bor_rad_10 pad jui_text_center   jui_fc_fff  jui_fs30">
					Sign in
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import global from '../../api/global.js'
	// import tfggVerify from '@/components/tfgg-verify/tfgg-verify'
	// const view = require('../../static/img/view.png');
	const view = require('../../static/imgs/home/view_no.png');
	export default {
		// components: {
		// 	tfggVerify
		// },
		data() {
			return {
				iptType: 'password',
				imgSrc: view,
				noView: '/static/imgs/home/view.png',
				code: {
					text: 'Get verification code',
					status: false,
					y_code: ''
				},
				phoneNumber: '',
				passwd: '',
				confirm_password: '',
				safe_pwd: '',
				confirm_safe_pwd: '',
				invi_code: '',
				status: false,
				pic: '/static/imgs/checked.png',
				name: '',
				verificationCode: '', //Graphic captcha picture,
				verificationNumber: '', //Graphic verification code,
				FromToken: '',
				picCode: '' //Bid verification
			}
		},
		onLoad(option) {
			// console.log(global.baseUrl)
			let local = this.getRequestParameters(location.href);
			this.invi_code = local.invite_code;
			if (this.invi_code) {
				this.status = true;
			}
			uni.setNavigationBarTitle({
				title: "Sign in"
			})
		},
		onShow() {
			// this.getFromToken();
			// this.codePic()
		},
		methods: {
			agree() {
				console.log(1)
				uni.navigateTo({
					url: '/pages/login/text'
				})
			},
			//图形验证码
			codePic() {
				this.$api.getImgCode({
					data: 1
				}).then(res => {
					if (res.code == 1) {
						this.verificationCode = res.data.data;
						this.verificationNumber = res.data.uuid
					}
				});
			},
			getFromToken() {
				this.$api.getFromToken({
					data: 1
				}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken;

					}
				});
			},
			getRequestParameters(locationhref) {
				let href = locationhref || '';
				let theRequest = new Object();
				let str = href.split('?')[1];
				if (str != undefined) {
					let strs = str.split('&');
					for (let i = 0; i < strs.length; i++) {
						theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
					}
				}
				return theRequest;
			},
			back() {
				uni.navigateTo({
					url: 'login'
				})
			},
			check() {
				if (this.pic == '/static/imgs/checked.png') {
					this.pic = '/static/imgs/check.png'
				} else {
					this.pic = '/static/imgs/checked.png'
				}
			},
			terms() {
				uni.navigateTo({
					url: '/pages/login/terms'
				})
			},
			changeType() {
				var $this = this;
				if ($this.iptType == 'text') {
					$this.iptType = 'password';
					$this.imgSrc = view;
				} else {
					$this.iptType = 'text';
					$this.imgSrc = this.noView;
				}
			},
			register() {

				uni.hideKeyboard()
				//Template sample section validation gauge
				//The verification code is an example. In actual use, 
				//the server should check whether the verification code is correct.
				if (this.name == '') {
					this.$msg('Please enter your username');
					return false;
				}
				if (this.phoneNumber == '') {
					this.$msg('Please enter your phone number');
					return false;
				}
				if (this.code.y_code == '') {
					this.$msg('Please enter the verification code');
					return false;
				}
				if (!this.passwd) {
					this.$msg('Please enter your login password');
					return false;
				}
				if (!this.confirm_password) {
					this.$msg('Please enter Confirm login password');
					return false;
				}
				if (!this.safe_pwd) {
					this.$msg('Please enter your trading password');
					return false;
				}
				if (!this.confirm_safe_pwd) {
					this.$msg('Please enter the confirm trading password');
					return false;
				}
				if (!this.invi_code) {
					this.$msg('Please enter the invitation code');
					return false;
				}
				console.log(this.pic)
				if (this.pic == '/static/imgs/check.png') {
					this.$msg('Please agree to the terms of use');
					return false;
				}
				let data = {
					username: this.name,
					mobile: this.phoneNumber,
					mobile_code: this.code.y_code,
					password: this.passwd,
					password2: this.confirm_password,
					safe_pwd: this.safe_pwd,
					safe_pwd2: this.confirm_safe_pwd,
					invite_code: this.invi_code,
					FromToken: this.FromToken
				}
				console.log(data)
				this.$api.register(data).then(res => {
					if (res.code == 1) {
						this.$msg(res.msg);
						if (this.invi_code) {
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/login/webwiew'
								})
							}, 800);
						} else {
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/login/login'
								})
							}, 800);
						}
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
					FromToken: that.FromToken,
					uuid: that.verificationNumber,
					send_type: 1
				};
				that.code.text = countdown + 'seconds';
				that.code.status = true;
				let timer = setInterval(() => {
					if (countdown > 0) {
						that.code.text = countdown - 1 + 'seconds';
						countdown--;
					} else {
						clearInterval(timer);
						that.code.text = 'Get verification code';
						that.code.status = false;
					}
				}, 1000);
				// that.$api.GetMobileCode(data).then(res => {
				// 	if (res.code === 1) {
				// 		that.code.text = countdown + 'seconds';
				// 		that.code.status = true;
				// 		let timer = setInterval(() => {
				// 			if (countdown > 0) {
				// 				that.code.text = countdown - 1 + 'seconds';
				// 				countdown--;
				// 			} else {
				// 				clearInterval(timer);
				// 				that.code.text = 'Get verification cod';
				// 				that.code.status = false;
				// 			}
				// 		}, 1000);
				// 	} else {
				// 		that.code.status = false;
				// 	}
				// });
			},

		}
	}
</script>

<style lang="scss" scoped>
	page {
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

			.ipt {
				border: none;
				outline: none;
				font-size: 32upx
			}

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
				color: #46C46D;
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

	::-webkit-input-placeholder {
		color: #DBDCDF;
		font-size: 32rpx;
	}

	.border {
		height: 28rpx;
		width: 28rpx;
		border-radius: 50%;
	}

	.login {
		background-color: $zhuse;
	}

	.pad {
		padding: 20rpx 0;
	}
</style>
