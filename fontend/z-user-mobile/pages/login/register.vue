<template>
	<view class="page">
		<view class="jui_h60"></view>
		<view class="tit">
			用户注册
		</view>
		<view class="content">
			<view class="list">
				<input type="text" placeholder="请输入昵称" v-model="name">
			</view>
			<view class="list">
				<input type="number" maxlength="11" placeholder="请输入手机号码" v-model="phoneNumber">
			</view>
<!-- 			<view class="list">
				<input type="text" placeholder="请输入图形验证码" v-model="picCode">
				<image :src="verificationCode" style="width: 200upx;height: 60upx" @tap="codePic()"></image>
			</view> -->
			<view class="list">
				<input type="text" placeholder="短信验证码为123456" v-model="code.y_code">
				<view class="get-code jui_flex jui_flex_justify_end jui_flex_items_center jui_fc_zhuse jui_fs28"
					:disabled="code.status" @tap="getCode">{{ code.text }}</view>
			</view>

			<view class="list">
				<input :type="iptType" placeholder="请输入登录密码" v-model="passwd" class="ipt">
				<image :src="imgSrc" @click="changeType()"></image>
			</view>
			<view class="list">
				<input :type="iptType" placeholder="请输入确认登录密码" v-model="confirm_password" class="ipt">

			</view>
			<!-- <view class="list">
				<input type="number" maxlength="6"  placeholder="请输入六位交易密码" v-model="safe_pwd" class="ipt" />
			</view>
			<view class="list">
				<input type="number" maxlength="6"  placeholder="请输入确认安全交易密码" v-model="confirm_safe_pwd" class="ipt" />
			</view>
			<view class="list">
				<input type="text" placeholder="请输入邀请码" v-model="invi_code" :disabled='status' />
			</view> -->
			<view class="bot" @tap="check">
				<view class=" border jui_mar_r16">
					<image :src="pic"></image>
				</view>
				<view>
					<text class="jui_fc_000">同意</text>
					<text @tap.stop="jump('/pages/login/text')" class="jui_fc_zhuse">
						《众筹链项目投资使用条款》
					</text>
				</view>
			</view>
			<view class="jui_h60">
			</view>
			<view class="">
				<view @tap="register" class="login jui_bor_rad_10 pad jui_text_center   jui_fc_fff  jui_fs30">
					注册
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
					text: '获取验证码',
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
				verificationCode: '', //图形验证码图片,
				verificationNumber: '', //图形验证码,
				FromToken: '',
				picCode: '' //标单验证
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
				title: "注册"
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
				//模板示例部分验证规
				//示例验证码，实际使用中应为请求服务器比对验证码是否正确。
				if (this.name == '') {
					this.$msg('请输入用户名');
					return false;
				}
				if (this.phoneNumber == '' ||  this.phoneNumber.length !=11) {
					this.$msg('请输入正确的手机号');
					return false;
				}
				if (this.code.y_code == '') {
					this.$msg('请输入验证码');
					return false;
				}
				if (!this.passwd || this.passwd.length <=6) {
					this.$msg('请输入6位以上登录密码');
					return false;
				}
				if (!this.confirm_password) {
					this.$msg('请输入确定登录密码');
					return false;
				}
				if (this.passwd != this.confirm_password) {
					this.$msg('两次输入的登录密码不同');
					return false;
				}
				if (this.safe_pwd != this.confirm_safe_pwd) {
					this.$msg('两次输入的交易密码不同');
					return false;
				}
				console.log(this.pic)
				if (this.pic == '/static/imgs/check.png') {
					this.$msg('请同意使用条款');
					return false;
				}
				let data = {
					username: this.name,
					mobile: this.phoneNumber,
					password: this.passwd,
					safe_pwd: this.safe_pwd,
				}
				console.log(data)
				var that = this
				this.$api.user_add(data).then(res => {
					console.log(res)
					if (res.code == 10000) {
						this.$msg('注册成功请登录');
						
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/login/login?m='+that.phoneNumber,
							})
						}, 2000);
						
					}

				})
			},

			getCode() {
				let that = this;
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.phoneNumber)) {
					that.$msg('请填写正确手机号码');
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
				that.code.text = countdown + '秒';
				that.code.status = true;
				let timer = setInterval(() => {
					if (countdown > 0) {
						that.code.text = countdown - 1 + '秒';
						countdown--;
					} else {
						clearInterval(timer);
						that.code.text = '获取验证码';
						that.code.status = false;
					}
				}, 1000);
				// that.$api.GetMobileCode(data).then(res => {
				// 	if (res.code === 1) {
				// 		that.code.text = countdown + '秒';
				// 		that.code.status = true;
				// 		let timer = setInterval(() => {
				// 			if (countdown > 0) {
				// 				that.code.text = countdown - 1 + '秒';
				// 				countdown--;
				// 			} else {
				// 				clearInterval(timer);
				// 				that.code.text = '获取验证码';
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