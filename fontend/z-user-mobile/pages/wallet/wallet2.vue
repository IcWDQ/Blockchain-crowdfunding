<template>
	<view class="">
		<!-- <scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="loadMore" style="height: 98vh"> -->
		<view class="wallet_bg">
			<view class="top_box jui_bg_fff jui_mar_2432 jui_flex_col_center">
				<view class="jui_h80">

				</view>
				<view class="">
					Assets in Total
				</view>
				<view class="jui_h30">

				</view>
				<view class="" >
					<text class="jui_fs26">￥</text>
					<text
						class="jui_fs34 jui_fc_333">{{userinfo.money}}</text>
				</view>
				<view class="jui_h60">

				</view>
				<view class="jui_flex jui_flex_items_center jui_flex_justify_between" style="width: 85%;">
					<view class="jui_flex box" @tap="goPage('/pages/wallet/recharge')">
						<view class="">
							Recharge
						</view>
						<image src="/static/imgs/home/cb.png" style="height: 40rpx;width: 54rpx;" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="place"></view>
		<view class="jui_mar_2432">
			<view class="jui_bg_f5f jui_pad_2432 jui_bor_rad_15" @tap="jump('/pages/wallet/balance')">
				<view class="jui_h30">
				</view>
				<view class="jui_flex jui_flex_justify_between jui_flex_items_center">
					<view class="">
						<text class="jui_fc_333">Flexable assets</text>
						<!-- <text>(U)</text> -->
					</view>
				</view>
				<view class="jui_h30">
				</view>
				<view class="jui_flex">
					<view class="jui_fc_999 " style="width: 50%;">
						Usable
					</view>
					<!-- <view class=" jui_fc_999 ">
						冻结
					</view> -->
				</view>
				<view class="jui_flex">
					<view class="jui_mar_t12" style="width: 50%;" >
						{{userinfo.money}}
					</view>
					<!-- <view class="jui_mar_t12" >
						0
					</view> -->
				</view>
				<view class="jui_h30">

				</view>
			</view>
		</view>
		<view class="jui_mar_2432" @tap="jump('/pages/wallet/jifen')">
			<view class="jui_bg_f5f jui_pad_2432 jui_bor_rad_15">
				<view class="jui_h30">

				</view>
				<view class="jui_flex  jui_flex_items_center">
					<view class="" style="width: 50%;">
						<text class="jui_fc_333">Invested assets</text>
					</view>
				</view>
				<view class="jui_h30">

				</view>

				<view class="jui_flex">
					<view class="jui_mar_t12" style="width: 50%;">
						{{userinfo.use_money}}
					</view>
					<!-- <view class="jui_mar_t12" >
						0
					</view> -->
				</view>
				<view class="jui_h30"></view>
			</view>
		</view>
		<view class="jui_mar_2432" @tap="jump('/pages/wallet/jifen?type=USDT_NO')">
			<view class="jui_bg_f5f jui_pad_2432 jui_bor_rad_15">
				<view class="jui_h30"></view>
				<view class="jui_flex  jui_flex_items_center">
					<view class="" style="width: 80%;">
						<text class="jui_fc_333">Credit score</text>
					</view>
				</view>
				<view class="jui_h30"></view>
				<view class="x-bc l-h2" >
					<view class="flex1">
						<view class="">{{userinfo.score}}</view>
					</view>
					<!-- <view class="flex1 tc">
						<view class="">区块链信用分</view>
						<view class="">55</view>
					</view> -->
					<view class="flex1 x-bc ">
						<view class=""></view>
						<!-- <view class="bg-zs f24r pl20r pr20r pt5r pb5r bor-rad10r fw-w color-fff" @tap.stop="Withdraw()">解仓</view> -->
					</view>
				</view>
				<view class="jui_h30"></view>
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="input" message="成功消息" :duration="2000" :before-close="true" @close="close"
				@confirm="confirm" mode="input" title="续费" placeholder="请输入数量"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import vNavigation from '@/components/navigation/navigation.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			vNavigation,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				userInfo: '',
				emptyData: {
					img: '/static/imgs/home/empty_goods.png',
					tip: '暂无数据~'
				},
				myAssets: '',
				list: [],
				FromToken: '',
				tablist: [{
						name: '全部',
					},
					{
						name: '转入',
					},
					{
						name: '转出',
					},
				],
				tabIndex: 0,
				type: 'USDT',
				walletCredit: ''
			}
		},
		onShow() {
			this.userinfo = uni.getStorageSync('loginInfo')
			console.log('==================')
			console.log(uni.getStorageSync('loginInfo'))
			console.log(this.userinfo)
			
			if(!uni.getStorageSync('loginInfo').user_id){
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return
			}
			this.list = [];
			// this.WalletCredit()
			// this.getFromToken()
		},
		methods: {
			Withdraw() {
				this.$api.Withdraw().then(res => {
					this.$msg(res.msg);
					if (res.code == 1) {}
				});
			},
			close(done) {
				done()
			},
			xufei() {
				//一键补仓
				this.$refs.popup.open()
			},
			confirm(done, value) {
				//一键补仓
				// 输入框的值
				console.log(value)
				if (!value) {
					this.$msg('请填写数量')
					return false;
					done()
				}
				let data = {
					// id: this.id,
					amount: value
				}

				done()
			},
			getFromToken() {
				this.$api.getFromToken({
					data: 1
				}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken;
						// this.log();
						this.WalletCredit()
					}
				});
			},
			WalletCredit() {
				var that = this 
				this.$api.getMoney({user_id: this.userinfo.user_id
				}).then(res => {
					if (res.code == 10000) {
						that.$nextTick(function() {
							console.log(123123)
							uni.setStorageSync('loginInfo',res.data)
							});
						that.userinfo = res.data
						
					}
				});
			},
			loadMore() {
				if (this.hasMore) {
					this.page++;
					this.log();
				}
			},
			log() {
				let data = {
					page: this.page,
					list_rows: this.size,
					type: this.type
				}
				this.$api.credit_log(data).then(res => {
					if (this.page == 1) {
						// this.list = res.data.data
					} else {
						// this.list = [...this.list, ...res.data.data]
					}
					this.myAssets = res.data;
					console.log(this.myAssets)
					if (res.data.data.length == 0) {
						this.hasMore = false
					} else {
						this.hasMore = true
					}
					// console.log(this.list)
				});
			},
			chooseTab(index) {
				this.page = 1;
				this.list = [];
				this.tabIndex = index;
				if (index == 0) {
					this.type = 'USDT'
				}
				if (index == 1) {
					this.type = 0
				}
				if (index == 2) {
					this.type = 1
				}
				this.log();
			},
			jump(item) {
				uni.navigateTo({
					url: item
				})
			},
			// money() {
			// 	this.$api.getMyAssets().then(res => {
			// 		this.myAssets = res.data
			// 	});
			// },
			buy() {
				uni.navigateTo({
					url: '/pages/index/setMeal/setMeal'
				})
			},
			goPage(item) {
				uni.navigateTo({
					url: item
				})
			}
		},
		filters: {
			formatDate: function(value) {
				var date = new Date();
				//date.setTime(value);
				var month = date.getMonth() + 1;
				var hours = date.getHours();
				if (hours < 10)
					hours = "0" + hours;
				var minutes = date.getMinutes();
				if (minutes < 10)
					minutes = "0" + minutes;
				var time = date.getFullYear() + "-" + month + "-" + date.getDate() +
					" " + hours + ":" + minutes;
				return time;
			},
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

	.shopro-empty {
		top: 65%;
	}

	.topPlace {
		width: 100%;
		height: var(--status-bar-height);
		background: $zhuse;

	}

	.onn {
		width: 38rpx;
		height: 8rpx;
		background: $zhuse;
		border-radius: 4rpx;
	}

	.place {
		height: 260rpx;
	}

	.wallet_bg {
		height: 140rpx;
		background: $zhuse;
		// border-radius: 0px 0px 100rpx 100rpx;
		position: relative;

		.top_box {
			position: absolute;
			top: 20rpx;
			width: 698rpx;
			height: 340rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 20rpx 0px rgba(0, 0, 0, 0.1);
			border-radius: 32rpx;
		}
	}

	.box {
		width: 43%;
		height: 88rpx;
		border-radius: 16rpx;
		background-color: rgba($color: $zhuse, $alpha: 0.15);
		justify-content: space-around;
		align-items: center;
	}
</style>
