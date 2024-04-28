<template>
	<view class="container">
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<view class="top">
				<!-- #ifdef APP-PLUS -->
				<view class="topPlace"></view>
				<!-- #endif -->
				<view class="search">
					<view class="c">
						<text>InnoFund</text>
					</view>
				</view>
			</view>
			<view class="bot">
				<!-- 标题栏和状态栏占位符 -->
				<view class="titleNview-placing"></view>
				<!-- 背景色区域 -->
				<view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view>
				<view class="jui_h100"></view>
				<view class="jui_h20"></view>
				<!-- #ifdef APP-PLUS -->
				<view class="" style="height: 80rpx;">
				</view>
				<!-- #endif -->
				<swiper class="carousel " autoplay circular>
					<swiper-item v-for="(item, index) in banner" :key="index"
						class="carousel-item jui_bg_f5f bor-rad10r">
						<image :src="item.b_pic"  />
					</swiper-item>
				</swiper>
				<view class="jui_h20"></view>
			</view>
		</view>

		<!-- 分类 -->
		<view class="pl36r pr36r pt10r flex-wrap x-bc ">
			<view class="bg-fff w214r h214r y-f pt56r mb20r" v-for="(item,index) in List" :key="index"
				@tap="goUrl(item.s_url,item.s_url_type)" style="border-radius: 0rpx 40rpx 40rpx 40rpx;">
				<image :src="item.s_icon" class="w72r h72r " mode=""></image>
				<view class="mt30r f24r color-999">
					{{item.s_name}}
				</view>
			</view>
		</view>
		<!-- 分类end -->

		<!-- 授权 -->
		<view class="pl36r pr36r pt20r p20r" @tap="jump('/pages/index/empower/empower')">
			<image src="/static/imgs/home/api.png" class="w678r h136r" mode=""></image>
		</view>
		<!-- 行情 -->
		<view class="quotation">
			<view class="top bor-b pb20r">
				<view class="jui_mar_l20 fw-w">
					Recommended project
				</view>
			</view>
			<view class="x-bc pl36r pr36r pt10r pb10r color-999">
				<view style="width: 30%;">Project Name</view>
				<view>Current Funds</view>
				<!-- <view>进度</view> -->
				<view>Overall Progress</view>
			</view>
			<view  @tap="goUrl('/pages/task/commodity_details/commodity_details?id=1',1)" class="bor-b  x-bc pt20r pb20r pl36r pr36r" style="justify-content: start;" v-for="(item,index) in quotesList" :key="index">
				<view >
					<view class="jui_fc_333 jui_fs30 fw-w x-f"  style="width: 320rpx;">
						<!-- <image :src="item.logo||'/static/logo.png'" class="w40r h40r mr20r" mode="aspectFit"></image> -->
						<text>{{item.name}}</text>
					</view>
					<view v-if="item.type" class="jui_fc_999  jui_fs28" style="white-space:nowrap;">
						{{item.type}}
					</view>
				</view>
				<view class=" jui_fc_333" style="width: 300rpx;">
					<view class="jui_fc_33 jui_fs30 fw-w">{{item.jindu}}</view>
					<view class="jui_fc_999 jui_fs28">{{item.price}}</view>
				</view>
				
				<view class="bg_btn jui_font_weight" v-if="item.percent > 0">
					{{item.percent?item.percent:0.00}}%
				</view>
				<view class="bg_btn- jui_font_weight" v-else>
					{{item.percent?item.percent:0.00}}%
				</view>
			</view>
			<view class="none" v-if="!quotesList.length">
				{{i18n.zwsj}}
			</view>
		</view>
		<!-- 行情end-->
		<uni-popup ref="popup" type="center">
			<view class="bg-fff p30r tc bor-rad10r w566r">
				<view class="">{{msg}}</view>
				<view @tap="$refs.popup.close()" class="bg-zs color-fff  h68r bor-rad10r mt30r x-c">确认</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: uni.getStorageSync('config').warn_money,
				emptyData: {
					img: '/static/imgs/home/empty_goods.png',
					tip: 'No data~'
				},
				banner: [
					{b_pic:'/static/imgs/home/baner1.png'},
					{b_pic:'/static/imgs/home/baner2.png'},
					{b_pic:'/static/imgs/home/baner3.png'}
				],
				swiperCurrent: 0,
				swiperLength: 0,
				List: [
					{
						s_icon: '/static/imgs/my/zc.png',
						s_name: 'My Assets',
						s_url: '/pages/wallet/wallet2',
						s_url_type: 1
					},
					{
						s_icon: '/static/imgs/home/index_c1.png',
						s_name: 'My Projects',
						s_url: '/pages/task/electronic/electronic',
						s_url_type: 1
					},
					{
						s_icon: '/static/imgs/home/index_c2.png',
						s_name: 'My Blocks',
						s_url: '/pages/task/taskDetail/orderAll',
						s_url_type: 1
					},

				],
				quotesList: [{name:'Project 1', type: 'Software', jindu: '2 / 5', price: '3000/10000', percent:'30'},
				{name:'Project 2', type: 'Hardware', jindu: '0 / 5', price: '858/20000', percent:'4.3'},
				{name:'Project 3', type: 'Electronics', jindu: '0 / 1', price: '0/30000', percent:'0'}],
				Notice: ['04-24 12:15 User001 has posted a new crowdfunding project'],
				userInfo: '',
				FromToken: '',
				tabbarList: [],
				quotesHead: []
			}
		},
		onLoad() {
			let that = this
			console.log(this.i18n.home);
		},
		destroyed() {
			uni.$off('page-popup')
		},
		onShow() {
			this.tabbarList = [];
			// this.user()
			// this.getLastQuotes()
		},
		methods: {
			goUrl(url, type) {
				console.log(url, type);
				if (type == 1) {
					var data = uni.getStorageSync('loginInfo');
					console.log(data)
					if(data==''){
						this.jump('/pages/login/login')
					}else{
						this.jump(url)
					}
					
				}
				if (type == 0) {
					// #ifdef H5
					console.log('h5');
					window.location.href = url
					// #endif
					// #ifndef H5
					plus.runtime.openURL(url)
					// #endif
				}
			},
			getFromToken() {
				this.$api.getFromToken({
					data: 1
				}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken;
						this.user()
						this.getLastQuotes()
					}
				});
			},
			Logout() {
				let _this = this;
				uni.removeStorage({
					key: 'token',
					success: function(res) {
						_this.$msg(_this.i18n.exit + _this.i18n.succeed)
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}, 800)

					}
				});
			},
			user() {
				// let data = {
				// 	FromToken: this.FromToken,
				// 	uid: uni.getStorageSync('loginInfo').id,
				// }
				// this.$api.Center(data).then(res => {
				// 	this.userInfo = res.data.user_info
				// 	if (res.data.user_info.is_msg == 1) {
				// 		this.$refs.popup.open()
				// 	}
				// 	uni.setStorage({
				// 		key: 'userInfo',
				// 		data: res.data.user_info
				// 	})
				// });
			},
			getLastQuotes() {
				let data = {
					FromToken: this.FromToken
				}
				this.$api.getLastQuotes().then(res => {
					this.quotesList = res.data
					this.quotesHead = this.quotesList.slice(0, 3)
				});

			},
			goInfo() {
				uni.navigateTo({
					url: '/pages/index/set/info'
				})
			},
			jump(item) {
				uni.navigateTo({
					url: item
				})
			},
			goCenterList(item) {
				this.$refs.popupRef.close();
				uni.navigateTo({
					url: item
				})

			},
			goCommunity(item) {
				if (item.s_url_type) {
					//跳转外部链接
					uni.navigateTo({
						url: `/pages/index/webview/externalLinks?url=${item.s_url}`
					})
				} else {
					//跳转内部链接
					uni.navigateTo({
						url: item.s_url
					})
				}
			},
			showCenter() {
				// this.user()
				this.$refs.popupRef.show();
			},
			close() {

			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F5F5 !important;
	}

	.quotation {
		width: 100%;
		margin: 0 auto;
		background: #FFFFFF;
		padding: 40rpx 0;
		border-radius: 20rpx;

		.top {
			display: flex;
			align-items: center;
		}


		.bg_btn- {
			background-color: $col-red;
			padding: 10rpx 20rpx;
			border-radius: 8rpx;
			color: #FFFFFF;
			min-width: 120rpx;
			text-align: center;
		}

		.bg_btn {
			background-color: $col-green;
			padding: 10rpx 20rpx;
			border-radius: 8rpx;
			color: #FFFFFF;
			min-width: 120rpx;
			text-align: center;
		}
	}





	.i_data {
		margin-bottom: 20rpx;
		color: #333333;

		.green {
			color: $col-green;
		}

		.red {
			color: $col-red;
		}

		.i_coms {
			width: 206rpx;
			height: 206rpx;
			background: #FFFFFF;
			border-radius: 16px;

			.i_head {
				color: #FFFFFF;
				text-align: center;
				background: $zhuse;
				border-radius: 16px 16px 16px 16px;
				padding: 10rpx 0;
			}

			.i_center {
				text-align: center;
				margin: 20rpx auto;
			}
		}

		.i_com {
			width: 328rpx;
			height: 168rpx;
			padding-top: 32rpx;
			padding-left: 32rpx;
			line-height: 50rpx;
			// background: url(../../static/imgs/home/d_bg.png) no-repeat;
			background-size: 100% 100%;
		}
	}

	.notice {
		height: 80rpx;
		// width: 95%;
		margin: 20rpx 36rpx;
		padding: 0 20rpx;
		display: flex;
		font-size: 28rpx;
		align-items: center;
		background-color: #FFFFFF;
		border-radius: 20rpx;

		.notice_swiper {
			height: 100%;
			width: 100%;

			.notice_swiper_item {

				margin-left: 10rpx;
				display: flex;
				align-items: center;
			}

		}

		image {
			height: 30rpx;
			width: 29rpx;
			// margin-right: 6rpx;
		}
	}

	.topPlace {
		width: 100%;
		height: var(--status-bar-height);
		// background: $zhuse;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	/* 头部 轮播图 */
	.carousel-section {
		position: relative;

		// padding-top:var(--status-bar-height);
		.top {
			position: fixed;
			// top: var(--status-bar-height);
			width: 100%;
			padding: 14upx 36upx;
			background: $zhuse;
			z-index: 99;
			// #ifdef MP-WEIXIN
			padding-top: 50upx;
			padding-right: 28%;
			// #endif
		}

		.search {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.l {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;

				image {
					width: 64upx;
					height: 64upx;
					border-radius: 16px;
					display: block;
				}

				text {
					font-size: 16upx;
					color: #fff;
					display: block;
				}
			}

			.c {
				height: 60upx;
				display: flex;
				align-items: center;

				text {
					font-size: 36upx;
					color: #fff;
					font-weight: 500;
				}
			}

			.r {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;

				image {
					width: 40upx;
					height: 40upx;
					display: block;
					// margin-bottom: 6upx;
				}

				text {
					font-size: 16upx;
					color: #fff;
					display: block;
				}
			}
		}

		position: relative;

		// padding-top: 10px;
		.bot {
			position: relative;
		}

		.titleNview-placing {
			position: absolute;
			height: 250rpx;
			background: $zhuse;
			width: 100%;
			// border-radius: 0px 0px 40rpx 40rpx;
			border-bottom-left-radius: 50% 40rpx;
			border-bottom-right-radius: 50% 40rpx;
		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}

	.carousel {
		// width: 100%;
		height: 350upx;
		padding: 0 36upx;
		position: relative;
		z-index: 9;

		.carousel-item {
			width: 100%;
			height: 100%;
			// padding: 0 28upx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}

	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}

	.pop1 /deep/ .popup-content {
		z-index: 999999999;
		position: fixed;
		top: 0;
		bottom: 0;
		width: 600upx;
		background-color: #FFFFFF;
	}

	.pop {
		padding-top: 40rpx;

	}

	.top {
		padding-left: 20rpx;
	}

	.pic {

		width: 92rpx;
		height: 92rpx;
		border-radius: 16rpx;
		margin-right: 20rpx;
	}

	.right {
		height: 24rpx;
		width: 14rpx;
		margin-left: 60rpx;
	}

	.bi {
		width: 92%;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
	}

	.cb {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 210rpx;
		height: 88rpx;
		background-color: rgba($color: $zhuse, $alpha: 0.09);
		border-radius: 16rpx;

		text {
			color: $zhuse;
		}
	}

	.tb {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 210rpx;
		height: 88rpx;
		border-radius: 16rpx;
		background-color: rgba($color: $zhuse, $alpha: 0.09);

		text {
			color: $zhuse;
		}
	}

	.list_box {
		width: 90%;
		margin: 0 auto;
		display: flex;
		align-items: center;
		margin: 40rpx 30rpx;
	}

	.user_place {

		/*  #ifndef H5 */
		height: 120rpx;
		/* #endif */
	}

	.Logout {
		position: fixed;
		bottom: 30rpx;
		width: 90%;
		margin-left: 5%;
		background: #EEEEEE;
		border-radius: 16rpx;
		height: 78rpx;
		line-height: 78rpx;
		text-align: center;
		color: #999999;
	}
</style>
