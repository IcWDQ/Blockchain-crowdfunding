<template>
	<view class="">
		<view class="exchange_bg">
			<view class="jui_bg_fff jui_lrtop box   ">
				
				<view class="jui_mar_t20 jui_fs28">
					接收账号
				</view>
				<view class="jui_mar_t20 jui_bor_bottom jui_pad_b20 ">
					<input type="text" value="" placeholder="请输入接收人手机号" v-model="huzhuan.mobile"/>
				</view>
				<view class="jui_mar_t20 jui_fs28">
					转出数量
				</view>
				<view class="jui_mar_t20 jui_bor_bottom jui_pad_b20  jui_flex jui_flex_justify_between jui_flex_items_center">
					<input type="text" value="" placeholder="请输入数量" v-model="huzhuan.num"/>
					<view class="jui_fs32">
						USDT
					</view>
				</view>
				<view class="jui_flex jui_flex_justify_between jui_flex_items_center">
					<view class="jui_fc_999 jui_fs26">
						可用{{totalCredit | numFilter}}USDT
					</view>
					<view class="jui_fc_pur jui_fs26" @tap="all">
						全部
					</view>
				</view>
				<view class="jui_mar_t20 jui_fs28">
					手续费({{mutual_transfer_rate }}%)
				</view>
				<view class="jui_mar_t20 jui_bor_bottom jui_pad_b20  jui_flex jui_flex_justify_between jui_flex_items_center">
					<input type="text" value="" disabled="disabled" :placeholder="sxf" />
					<view class="jui_fs32">
						USDT
					</view>
				</view>
				<view class="jui_mar_t20 jui_fs28">
					支付密码
				</view>
				<view class="jui_mar_t20 jui_bor_bottom jui_pad_b20 ">
					<input type="password" value="" placeholder="请输入支付密码" v-model="huzhuan.safe_pwd"/>
				</view>
				<view class="jui_mar_t20 jui_fs28">
					图形验证码
				</view>
				<view class="list flex justify-between self-center jui_mar_t20">
					<input type="text" placeholder="请输入图形验证码" v-model="picCode">
					<image :src="verificationCode" style="width: 200upx;height: 60upx" @tap="codePic()"></image>
				</view>
				<view class="jui_mar_t20 jui_fs28">
					验证码
				</view>
				<view class="jui_mar_t20 jui_bor_bottom jui_pad_b20  jui_flex jui_flex_justify_between jui_flex_items_center">
					<input type="text" value="" placeholder="请输入验证码" v-model="huzhuan.mobile_code"/>
					<button class="cu-btn code-btn jui_bg_fff jui_fc_zhuse" :disabled="code.status" @tap="getCode" style="font-size: 28rpx;text-align: right;width: auto;">{{ code.text }}</button>
				</view>
			</view>
		</view>
		
		<view class="jui_h100">
			
		</view>
		<view class="jui_h30">
			
		</view>
		<view class="save" @tap="commitData">
			<view class="btn">
				确认
			</view>
		</view>
		<!--  -->
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
				list: [{
						name: 'TRC2.0',	
					},	
				],
				tabindex: 0,
				huzhuan:{
					mobile:'',
					type:'USDT',
					num:'',
					safe_pwd:'',
					mobile_code:''
				},
				userInfo:'',
				code: {
					text: '获取验证码',
					status: false,
					y_code: ''
				},
				verificationCode:'',
				verificationNumber:'',
				picCode:'',
				mutual_transfer_rate:'',//手续费
				totalCredit:'',//可用余额
			}
		},
		
		onLoad(opt) {
			this.totalCredit = opt.totalCredit
			let _this = this;
			uni.getStorage({
			    key: 'userInfo',
			    success: function (res) {
			        console.log(res.data);
					_this.userInfo = res.data
			    }
			});
		},
		onShow() {
			
			this.getFromToken()
		},
		computed:{
			sxf(){
				this.sxfNum = parseFloat(this.huzhuan.num * (this.mutual_transfer_rate / 100)  ).toFixed(2)
				return parseFloat(this.huzhuan.num *  (this.mutual_transfer_rate / 100) ).toFixed(2)
			},
		},
		methods: {
			getFromToken() {
				this.$api.getFromToken({
					data: 1
				}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken;
						this.codePic();
						this.getJobConfig()
					}
				});
			},
			getJobConfig(){
				this.$api.getJobConfig({data:1}).then(res => {
					if (res.code == 1) {
						this.mutual_transfer_rate = res.data.mutual_transfer_rate ;
					}
				});
			},
			//图形验证码
			codePic() {
				this.$api.getImgCode({data:1}).then(res => {
					if (res.code == 1) {
						this.verificationCode = res.data.data;
						this.verificationNumber = res.data.uuid
					}
				});
			},
			//验证码
			getCode() {
				let that = this;
				let countdown = 60;
				that.code.status = true;
				var data = {
					FromToken:this.FromToken,
					mobile:uni.getStorageSync('loginInfo').mobile,
					uid: uni.getStorageSync('loginInfo').id,
					uuid:this.verificationNumber,
					image_code:this.picCode,
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
								that.code.text = '获取验证码';
								that.code.status = false;
							}
						}, 1000);
					} else {
						that.code.status = false;
					}
				});
			},
			all(){
				this.huzhuan.num = this.totalCredit
			},
			commitData(){
				this.$api.mutual_transfer(this.huzhuan).then(res => {
					if (res.code == 1) {
						this.$msg(res.msg)
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					
					}
				});
			},
			detail() {
				uni.navigateTo({
					url: '/pages/task/taskDetail/taskDetail'
				})
			},
			radioChangeType(){
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.typeCurrent = i;
						break;
					}
				}
			},
			radioChange(evt) {
				console.log(evt.detail.value)
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			}
		},
		filters: {
			numFilter(value) {
				let realVal = ''
				if (!isNaN(value) && value !== '') {
					// 截取当前数据到小数点后三位
					let tempVal = parseFloat(value).toFixed(3)
					realVal = tempVal.substring(0, tempVal.length - 1)
				} else {
					realVal = '--'
				}
				return realVal
			}
		
		
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
	
	.col {
		color:$col-green;
	}
	.input-placeholder {
		color: #C1C0C9;
		font-size: 32rpx;
	}
	.save {
		view {
			display: flex;
		}
	
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;
	
		.btn {
			box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.4);
			width: 90%;
			height: 80upx;
			border-radius: 20upx;
			background-color: $zhuse;
			color: #fff;
			justify-content: center;
			align-items: center;
	
			.icon {
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
			}
	
			font-size: 30upx;
		}
	}
	.ipt_long {
		width: 75%;
		height: 76rpx;
		border-radius: 16rpx;
		border: 1px solid #C1C0C9;
		margin-right: 18rpx;

		.input-placeholder {
			font-size: 28rpx;
			color: #333333;
			padding-left: 20rpx;
		}
	}

	.ipt_short {
		width: 70%;
		height: 76rpx;
		border-radius: 16rpx;
		border: 1px solid #C1C0C9;
		margin-right: 10rpx;

		.input-placeholder {
			font-size: 28rpx;
			color: #333333;
			padding-left: 20rpx;
		}
	}

	.text-line {
		width: 28rpx;
		height: 28rpx;
		border: 1px solid $zhuse;
		color: $zhuse;
		font-size: 22rpx;
		text-align: center;
		line-height: 28rpx;
	}

	.text-rad {
		width: 28rpx;
		height: 28rpx;
		border: 1px solid $zhuse;
		color: $zhuse;
		border-radius: 50%;
		font-size: 22rpx;
		text-align: center;
		line-height: 28rpx;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 90%;
	}

	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.scroll-view-item_H {
		display: inline-block;

		text-align: center;
		font-size: 36rpx;
	}

	.topPlace {
		width: 100%;
		height: var(--status-bar-height);
		background: $zhuse;

	}

	.top_box {
		background:$zhuse;
		padding: 40rpx 20rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;

		view {
			color: #FFFFFF;
			font-size: 48rpx;
		}

	}

	.exchange_bg {
		background:  $zhuse;
		// padding-top: 90rpx;
		.box {
			padding: 50rpx 30rpx 0 30rpx;
			flex-wrap: wrap;
		}

		.text-line {
			width: 28rpx;
			height: 28rpx;
			border: 1px solid $zhuse;
			color: $zhuse;
			font-size: 22rpx;
			text-align: center;
			line-height: 28rpx;
		}

		.text-rad {
			width: 28rpx;
			height: 28rpx;
			border: 1px solid $zhuse;
			color: $zhuse;
			border-radius: 50%;
			font-size: 22rpx;
			text-align: center;
			line-height: 28rpx;
		}

		.on {
			color: $zhuse;
			background-color:$col-light-purple;

		}

		.off {
			background-color: #F5F5F5;
		}

		.top_list {
			width: 100%;
		}

		.yingli_box {
			width: 100%;
			margin-top: 30rpx;

			.left,
			.right {

				width: 322rpx;
				height: 144rpx;
				background-color: $col-light-purple;
				// padding: 50rpx 0 20rpx 30rpx ;
				color: $zhuse;
				border-radius: 32rpx;
				box-shadow: 0px 0px 10rpx 0px rgba(91, 8, 190, 0.1);
			}

		}
	}

	.purple {
		color: $zhuse;
		border: 1px solid $zhuse;
		border-radius: 8rpx;
		height: 56rpx;
		line-height: 56rpx;
		font-size: 24rpx;
		padding: 0 10rpx;
	}

	.red {
		color: $col-red;
		border: 1px solid  $col-red;
		border-radius: 8rpx;
		height: 56rpx;
		line-height: 56rpx;
		font-size: 24rpx;
		padding: 0 10rpx;
	}
	.jui_fc_pur {
		color: $zhuse;
	}
</style>
