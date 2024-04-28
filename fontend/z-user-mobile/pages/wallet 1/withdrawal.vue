<template>
	<view class="">
		<view class="exchange_bg">
			<view class="jui_bg_fff jui_lrtop box   ">
				<view class="top_list jui_flex  jui_flex_items_center ">
					<view class="jui_flex jui_flex_items_center jui_pad_1216 jui_bor_rad_15 jui_mar_r20"
						v-for="(item,index) in list" :key="index" :class="tabindex == index ? 'on' : 'off'">
						<view class="jui_fs28">
							{{item.name}}
						</view>
					</view>
				</view>
				<view class="jui_mar_t20 jui_fs28">
					提币地址
				</view>
				<view class="jui_mar_t20 jui_bor_bottom jui_pad_b20 ">
					<input type="text" value="" placeholder="请输入或长按粘贴地址" v-model="tibi.address" />
				</view>
				<view class="jui_mar_t20 jui_fs28">
					数量
				</view>
				<view
					class="jui_mar_t20 jui_bor_bottom jui_pad_b20  jui_flex jui_flex_justify_between jui_flex_items_center">
					<input type="number" value="" placeholder="请输入数量" v-model="tibi.num" />
					<view class="jui_fs32">
						USDT(TRC20)
					</view>
				</view>
				<view class="jui_flex jui_flex_justify_between jui_flex_items_center">
					<view class="jui_fc_999 jui_fs26">
						可用 {{available | numFilter}}USDT
					</view>
					<view class="zhusecol jui_fs26" @tap="all()">
						全部
					</view>
				</view>
				<view class="jui_mar_t20 jui_fs28">
					手续费({{withdraw_percent }}USDT)
				</view>
				<view
					class="jui_mar_t20 jui_bor_bottom jui_pad_b20  jui_flex jui_flex_justify_between jui_flex_items_center">
					<input type="text" disabled="disabled" :placeholder="withdraw_percent+'USDT'" />
					<view class="jui_fs32">
						USDT(TRC20)
					</view>
				</view>
				<view class="jui_mar_t20 jui_fs28">
					到账数量
				</view>
				<view
					class="jui_mar_t20 jui_bor_bottom jui_pad_b20  jui_flex jui_flex_justify_between jui_flex_items_center">
					<input type="text" value="" :placeholder="money!='NaN'?money:'0.00'" disabled="disabled" />
					<view class="jui_fs32">
						USDT(TRC20)
					</view>
				</view>

			</view>
		</view>
		<view class="jui_pad_2432" v-if="content">
			注意事项：
		</view>
		<view class="jui_pad_2432">
			<jyf-parser :html="content" ref="article"></jyf-parser>
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
						name: 'TRC20',

					},

				],
				tabindex: 0,
				content: '',
				tibi: {
					address: '',
					num: '',
					type: 'USDT',
				},
				withdraw_percent: '',
				allMoney: '',
				available: ''
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/wallet/withdrawalLog'
			})
		},
		onShow() {
			this.getFromToken()
		},
		onLoad(opt) {
			// this.available  = uni.getStorageSync('userInfo').money;
		},
		computed: {
			sxf() {
				this.sxfNum = parseFloat(this.tibi.num * (this.withdraw_percent / 100)).toFixed(2)
				return parseFloat(this.tibi.num * (this.withdraw_percent / 100)).toFixed(2)
			},
			money() {
				let num = parseFloat(this.tibi.num - this.withdraw_percent).toFixed(2)
				num = num <= 0 ? '0.00' : num
				return num
			}
		},
		methods: {
			getFromToken() {
				this.$api.getFromToken({
					data: 1
				}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken;
						this.getJobConfig();
						this.user();
					}
				});
			},
			user() {
				let data = {
					FromToken: this.fromToken,
					uid: uni.getStorageSync('loginInfo').id,
				}
				this.$api.Center(data).then(res => {
					this.available = res.data.usdt
					uni.setStorage({
						key: 'userInfo',
						data: res.data.user_info
					})
				});
			},
			getJobConfig() {
				this.$api.getJobConfig({
					data: 1
				}).then(res => {
					if (res.code == 1) {
						this.withdraw_percent = res.data.withdrawal_rate;
						this.content = res.data.withdraw_notice;
					}
				});
			},
			all() {
				this.tibi.num = this.available;
			},
			info() {
				this.$api.getWithdrawInfo().then(res => {
					this.withdrawInfo = res.data
				});
			},
			commitData() {
				if (!this.tibi.address) {
					this.$msg('请输入提币地址');
					return false;
				}
				if (!this.tibi.num) {
					this.$msg('请输入提币数量');
					return false;
				}
				this.tibi.FromToken = this.FromToken;
				this.$api.withdrawal(this.tibi).then(res => {
					if (res.code == 1) {
						this.$msg(res.msg);
						setTimeout(() => {
							uni.navigateBack()
						}, 1000);
					}

				});
			},
			text() {
				this.$api.getWithdrawNotice().then(res => {
					this.content = res.data
				});
			},
			detail() {
				uni.navigateTo({
					url: '/pages/task/taskDetail/taskDetail'
				})
			},
			radioChangeType() {
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

	.zhusecol {
		color: $zhuse;
	}

	.col {
		color: #12C382;
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
		background: $zhuse;
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
		background: $zhuse;

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
			background-color: rgba($color: $zhuse, $alpha: 0.09);

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
				background-color: #EFE7F9;
				// padding: 50rpx 0 20rpx 30rpx ;
				color: $zhuse;
				border-radius: 32rpx;
				box-shadow: 0px 0px 10rpx 0px rgba(91, 8, 190, 0.1);
			}

		}
	}

	.purple {
		color: #5B08BE;
		border: 1px solid #5B08BE;
		border-radius: 8rpx;
		height: 56rpx;
		line-height: 56rpx;
		font-size: 24rpx;
		padding: 0 10rpx;
	}

	.red {
		color: $col-red;
		border: 1px solid $col-red;
		border-radius: 8rpx;
		height: 56rpx;
		line-height: 56rpx;
		font-size: 24rpx;
		padding: 0 10rpx;
	}
</style>
