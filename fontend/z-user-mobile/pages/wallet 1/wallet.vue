<template>
	<view class="">
		<!-- <scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="loadMore" style="height: 98vh"> -->
		<view class="p36r pb100r bg-zs x-bc color-fff" >
			<view class="x-f">
				<image src="/static/imgs/home/xb.png" class="w136r h136r bor-rad50 mr30r" mode="aspectFill"></image>
				<view class="als-s flex1 y-a ">
					<view class="  x-f">
						<view v-if="show">
							<view class="f36r w250r">{{userInfo.user_name}}</view>
							<view v-if="is_valid==1" @tap.stop class="bg-fff f24r pl20r pr20r pt5r pb5r bor-rad10r fw-w color-zs">已认证
							</view>
							<view v-else class="bg-fff f24r pl20r pr20r pt5r pb5r bor-rad10r fw-w color-zs" style="width: 60px;"
								@tap.stop="$refs.popup.open()">去认证</view>
						</view>
						<view v-else >
							<view class="f36r w250r" @tap="gologin">请登录</view>
						</view>
					</view>
					<!-- <view class="f24r x-f">
						<view class="">{{userInfo.level_name}}</view>
						<view class="h24r ml16r mr16r w4r bg-fff"></view>
						<view class="x-f" @tap.stop="$tool.copy(userInfo.invite_code)">
							<view class="">推荐码：{{userInfo.invite_code}}</view>
							<image src="../../static/imgs/home/copy.png" class="w24r h24r" mode=""></image>
						</view>
					</view> -->
				</view>
			</view>
			<view class="cuIcon-right"></view>
		</view>
		<view v-show="show" class="bor-rad30r jui_bg_f5f pt38r" style="margin-top: -50rpx;">
<!-- 			<view class="list_box jui_flex jui_flex_justify_between" @tap="$refs.popup.open()">
				<view class="jui_flex">
					<image src="/static/imgs/my/nav1.png" mode="" style="width:36rpx;height:36rpx;margin:0 20rpx;">
					</image>
					<view>USDT手续费余额</view>
				</view>
				<view class="cuIcon-right"></view>
			</view> -->
			<!-- <view class="list_box jui_flex jui_flex_justify_between" @tap="$refs.popup2.open()">
				<view class="jui_flex">
					<image src="/static/imgs/my/nav2.png" mode="" style="width:36rpx;height:36rpx;margin:0 20rpx;">
					</image>
					<view>提醒额度</view>
				</view>
				<view class="cuIcon-right"></view>
			</view> -->
			<view v-for="(item,index) in centerList" :key="index" class="list_box jui_flex jui_flex_justify_between"
				@tap="goCenterList(item.url)">
				<view class="jui_flex">
					<image :src="item.icon" mode="" style="width:36rpx;height:36rpx;margin:0 20rpx;"></image>
					<view>{{item.text}}</view>
				</view>
				<view class="cuIcon-right"></view>
			</view>
			<view class="list_boxs" @tap="goCenterList('/pages/login/login')">
				退出登录
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="bg-fff bor-rad10r w566r">
				<view class="p36r bor-b fw-w l-h1">审核认证</view>
				<view class="p36r ">
					<view class="" style="text-align: center;">
						<text>审核认证需要填写部分较为隐私资料</text></br>
						<text class="color-or" >请提前准备相关资料！</text>
						<!-- <text class="">以上，并且锁定期{{activation_day}}天，{{activation_day}}天后可提现。</text> -->
					</view>
					<view class="bg-zs color-fff x-c h68r bor-rad10r mt30r" @tap="renew()">去认证</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup2" type="center">
			<view class="bg-fff bor-rad10r w566r">
				<view class="p36r bor-b fw-w">设置手续费最低</view>
				<view class="p36r ">
					<view class="p20r " style="background: rgba(26, 84, 147, 0.06)">
						<input type="text" class="f26r" v-model="fee" placeholder="请输入最低手续费" />
					</view>
					<view class="x-bc">
						<view @tap="$refs.popup2.close()" class="bg-eee  x-c h68r bor-rad10r mt30r w214r">取消</view>
						<view @tap="SetUserInfo()" class="bg-zs color-fff x-c h68r bor-rad10r mt30r w214r">确认</view>
					</view>
				</view>
			</view>
		</uni-popup>
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
				show: true,
				fee: uni.getStorageSync('userInfo').small_money, //设置手续费最低
				is_valid: uni.getStorageSync('userInfo').is_valid, //激活状态
				activation: uni.getStorageSync('config').activation, //激活所需金额
				activation_day: uni.getStorageSync('config').activation_day, //激活锁仓时间
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
				walletCredit: '',
				userInfo: '',
				centerList: [
					// {
					// 	icon: '/static/imgs/my/nav3.png',
					// 	text: '我要推广',
					// 	url: '/pages/index/invite/invite'
					// },
					// {
					// 	icon: '/static/imgs/my/nav4.png',
					// 	text: '客服中心',
					// 	url: '/pages/index/kefu/kefu'
					// },
					{
						icon: '/static/imgs/my/nav4.png',
						text: '在线留言',
						url: '/pages/wallet/kefu'
					},
					{
						icon: '/static/imgs/my/nav1.png',
						text: '安全设置',
						url: '/pages/index/set/set'
					},
					{
						icon: '/static/imgs/my/nav5.png',
						text: '关于我们',
						url: '/pages/index/about/about'
					},
					{
						icon: '/static/imgs/my/nav5.png',
						text: '投资协议',
						url: '/pages/index/about/about1'
					},
					{
						icon: '/static/imgs/my/nav5.png',
						text: '相关政策',
						url: '/pages/index/about/about2'
					},
					// {
					// 	icon: '/static/imgs/my/nav5.png',
					// 	text: '模拟交易',
					// 	url: '/pages/taskV/task'
					// },
				],
			}
		},
		onShow() {
			if (uni.getStorageSync('loginInfo').user_id==undefined) {
				this.show = false
			}
			// this.fee=uni.getStorageSync('userInfo').small_money
			this.list = [];
			// this.WalletCredit()
			this.user()
			// this.getFromToken()
		},
		methods: {
			gologin(){
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return
			},
			renew() {
				uni.navigateTo({
					url: '/pages/index/empower/empower'
				})
				return
			},
			SetUserInfo() {
				if (!this.fee) {
					return this.$msg('请输入最低手续费')
				}
				let data = {
					small_money: this.fee
				}
				this.$api.SetUserInfo(data).then(res => {
					this.$msg(res.msg)
					if (res.code == 1) {
						this.$refs.popup2.close()
					}
				});
			},
			user() {
				// console.log(3)
				let data = {
					FromToken: this.FromToken,
					uid: uni.getStorageSync('loginInfo').id,
				}
				this.userInfo = uni.getStorageSync('loginInfo')
				// this.$api.Center(data).then(res => {
				// 	this.userInfo = res.data.user_info
				// 	uni.setStorage({
				// 		key: 'userInfo',
				// 		data: res.data.user_info
				// 	})
				// });
			},
			goInfo() {
				uni.navigateTo({
					url: '/pages/index/set/info'
				})
			},
			goCenterList(item) {
				// this.$refs.popupRef.close();
				if (item === '/pages/login/login') {
					uni.clearStorageSync()
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return
				}
				uni.navigateTo({
					url: item
				})

			},
			close() {

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

				this.$api.getWalletCredit({
					typeAll: ['USDT', 'DUSDT'],
					FromToken: this.FromToken
				}).then(res => {
					if (res.code == 1) {
						this.walletCredit = res.data
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
		background: #F5F5F5;
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

	.list_box {
		width: 678rpx;
		height: 102rpx;
		background: #FFFFFF;
		margin: 30rpx auto;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		border-radius: 30rpx;

	}

	.list_boxs {
		width: 678rpx;
		height: 80rpx;
		background: $zhuse;
		color: #FFFFFF;
		margin: 20rpx auto;
		padding: 0 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 30rpx;
		font-size: 30rpx;
	}

	.place {
		height: 220rpx;
	}

	.wallet_bg {
		height: 300rpx;
		background: $zhuse;

		.top_box {
			position: absolute;
			top: 20rpx;

			.t_person {
				width: 698rpx;
				margin: 0 auto;
				align-items: center;
				justify-content: space-between;

				.xufei {
					width: 168rpx;
					height: 56rpx;
					border-radius: 32rpx;
					border: 2rpx solid #FFFFFF;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;

				}

				.pic {
					width: 136rpx;
					height: 136rpx;
					border-radius: 100rpx;
					margin-right: 36rpx;
				}

				.t_info {
					.t_name {
						font-size: 36rpx;
						margin-bottom: 16rpx;
					}

					.t_vip {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 124rpx;
						height: 48rpx;
						background: rgba(255, 255, 255, 0.2);
						border-radius: 8rpx;
						color: #FFFFFF;
						font-size: 24rpx;

					}
				}
			}

			.t_right {
				.r_img {
					width: 24rpx;
					height: 34rpx;
				}
			}

			.top_hei {
				width: 698rpx;
				height: 340rpx;
				background: #FFFFFF;
				box-shadow: 0px 0px 20rpx 0px rgba(0, 0, 0, 0.1);
				border-radius: 32rpx;
				padding: 0 40rpx;

				.activate {
					width: 120rpx;
					height: 48rpx;
					background: $zhuse;
					border-radius: 8rpx;
					color: #FFFFFF;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}

	.box {
		width: 258rpx;
		height: 88rpx;
		border-radius: 16rpx;
		background-color: rgba($color: $zhuse, $alpha: 0.09);
		justify-content: space-around;
		align-items: center;
		color: $zhuse;
	}
</style>
