<template>
	<view class="jui_main ">
		<view class="jui_h100">		
		</view>
		<view class="jui_h60">		
		</view>
		<view class="jui_font_weight  title jui_pad_l20" style="">
			Verification code login
		</view>
		<view class="jui_h60">
		</view>
		<view class="jui_pad_2432">
			<view class="list">
				<input type="text" value="" placeholder="Please enter your mobile number" class="  jui_fs32" style="height: 60rpx;" v-model="phoneNumber"/>
			</view>
			
			<view class="list">
				<input type="text" placeholder="Please enter the verification code" v-model="code" >
				<view class="get-code jui_flex jui_flex_justify_end jui_flex_items_center jui_fc_zhuse   jui_fs28 " @click.stop="getCodeisWaiting&&getCode()">{{getCodeText}}</view>
			</view>
		</view>

		<view class="jui_h60">
			
		</view>
		<view class="jui_pad_2432">
			<view  @tap="login" class="login jui_bor_rad_40 pad jui_text_center   jui_fc_fff jui_fs30">
				Log in
			</view>
		</view>
		<!-- <view class="jui_pad_2432" @tap="changeLang">
			{{$i18n.locale == 'zh' ? 'fayu' : 'Simplified Chinese'}}
		</view> -->
	</view>
</template>

<script>
	// const  noView= require('../../static/imgs/home/view.png');
	const view = require('../../static/imgs/home/view_no.png');
	export default {
		data(){
			return{
				iptType:'password',
				imgSrc:view,
				phoneNumber:'',
				passwd:'',
				noView:'/static/imgs/home/view.png',
				getCodeText: 'Get verification code',
				getCodeisWaiting: true,
				code:''
			}
		},
		onLoad() {
			
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'/pages/login/codeLogin'
			})
		},
		methods:{
			
			login() {
				if(this.phoneNumber == ''){
					this.$msg('Please enter your mobile number');
					return false;
				}
				if(this.code == ''){
					this.$msg('Please enter the verification code');
					return false;
				}
				uni.hideKeyboard();
				//Verify mobile phone number
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber)) {
					uni.showToast({ title: 'Please fill in the correct mobile phone number', icon: 'none' });
					return false;
				}
			
				let data = {
					mobile: this.phoneNumber,
					code: this.code
				};
				this.$api.userRegister(data).then(res => {
					this.$msg(res.msg);
					uni.setStorageSync('token', res.data.token);
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/home/home'
						});
					}, 1500);
				});
			},
			getCode() {
				// uni.hideKeyboard()
				// if (this.getCodeisWaiting) {
				// 	return;
				// }
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))) {
					uni.showToast({
						title: 'Please fill in the correct mobile phone number',
						icon: "none"
					});
					this.getCodeText = "Get verification code"
					return false;
				}
				this.getCodeisWaiting = false;
				// this.getCodeBtnColor = "rgba(255,255,255,0.5)";
				let data = {
					mobile: this.phoneNumber,
					event: 'mobile_login'
				}
				console.log(this.phoneNumber)
				this.$api.Send(data).then(res => {
			
					console.log(res)
					this.$msg(res.msg)
					if (res.code == 1) {
						this.getCodeText = "Be being sent..."
						this.setTimer();
					}
				})
			},
			setTimer() {
				let holdTime = 60;
				this.getCodeText = "reacquire(60)"
				this.Timer = setInterval(() => {
					if (holdTime <= 0) {
						this.getCodeisWaiting = true;
						this.getCodeBtnColor = "#ffffff";
						this.getCodeText = "Get verification code"
						clearInterval(this.Timer);
						return;
					}
					this.getCodeText = "reacquire(" + holdTime + ")"
					holdTime--;
				}, 1000)
			},
			changeType(){
				// console.log(this.iptType,this.imgSrc)
				var $this = this;
				if($this.iptType == 'text'){
					$this.iptType ='password';
					$this.imgSrc = view;
				}else{
					$this.iptType ='text';
					$this.imgSrc =  this.noView;
				}
			}
		}
	}
</script>

<style lang="scss">
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
	page{
		background-color: #FFFFFF
	}
	.title {
		font-size: 50upx;
		color: #383630;
	}
	input{ outline:none }
	input:focus { outline: none; }
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
