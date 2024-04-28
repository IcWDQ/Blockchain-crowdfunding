<template>
	<view class="">
		<view class="wallet_bg">
			<view class="top_box jui_bg_fff jui_mar_2432 jui_flex_col_center">
				<view class="jui_h30">

				</view>
				<view class="top_list jui_flex  jui_flex_items_center jui_pad_l20 jui_mar_l20">
					<view class="jui_flex jui_flex_items_center jui_pad_1216 jui_bor_rad_15 jui_mar_r20" v-for="(item,index) in list"
					 :key="index" :class="tabindex == index ? 'on' : 'off'" @tap="chooseTab(index)">
						<view class="">
							{{item.name}}
						</view>

					</view>
				</view>
				<view class="jui_h60"></view>
				<!-- <image src="/static/imgs/home/ba_bg.png" style="width: 284rpx;height: 284rpx;" mode=""></image> -->
				<!-- <tki-qrcode v-if="ifShow" cid="qrcode2" ref="qrcode2" :val='url' :size="size" :onval="onval" :loadMake="loadMake"
				 :usingComponents="true" @result="qrR" />
				<view class="jui_h30"></view>
				<view class="on jui_pad_2432 jui_bor_rad_10 jui_fs28" @tap="savePic">
					保存二维码
				</view>
				<view class="jui_h30"></view>
				<view class="jui_fc_999 jui_fs26" >
					收款地址
				</view>
				<view class="jui_h30"></view>
				<view class="jui_fc_999 jui_fs26">
					{{wallet.address}}
				</view>
				<view class="jui_h30"></view>
				<view class="copy" style="" @tap="copy">
					复制地址
				</view> -->
				<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20" >
					<text style="width: 30%;">充值金额：</text>
					<input type="number" maxlength="6" value="" placeholder="请输入金额" v-model="pass_phrase" style="width: 70%;"/>
				</view>
				<view class="zhuse  shouquan" @tap='chongzhi'>
					充值
				</view>
			</view>
			
		</view>

		<view class="" style="height: 560rpx;">

		</view>
		<view class="jui_pad_2432" v-if="content">
			注意事项：
		</view>
		<view class="jui_pad_2432">
			<jyf-parser :html="content" ref="article"></jyf-parser>
			<!-- {{content}} -->
		</view>


	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import vNavigation from '@/components/navigation/navigation.vue'
	import h5Copy from '@/common/junyi-h5-copy/junyi-h5-copy.js'
	export default {
		components: {
			vNavigation,
			tkiQrcode
		},
		data() {
			return {
				naviValue: {
					"l": '/static/imgs/home/back.png',
					"c": 'USDT充币',
					"r": '充值记录',
					url: '/pages/wallet/rechargeLog'
				},
				list: [{
						name: '虚拟充值',
					},
					// {
					// 	name: 'ERC20',
					// },
				],
				tabindex: 0,
				content:'',
				FromToken:'',
				wallet:'',
				ifShow: true,
				val: '1', // 要生成的二维码值
				size: 300, // 二维码大小
				unit: 'upx', // 单位
				background: '#b4e9e2', // 背景色
				foreground: '#309286', // 前景色
				pdground: '#32dbc6', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: false, // 组件加载完成后自动生成二维码
				src: '' ,// 二
				url:''
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'/pages/wallet/rechargeLog'
			})
		},
		onShow() {
			// this.getFromToken()
		},	
		methods: {
			
			getFromToken(){
				this.$api.getFromToken({data:1}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken;
						this.address();
						this.getJobConfig()
					}
				});
			},
			getJobConfig(){
				this.$api.getJobConfig({data:1}).then(res => {
					if (res.code == 1) {
						this.content = res.data.recharge_notice ;
					}
				});
			},
			address(){
				let data = {
					type:'trc',
					FromToken:this.FromToken
				}
				this.$api.getWallet(data).then(res => {
					if (res.code == 1) {
						this.wallet = res.data.wallet;
						this.url = res.data.wallet.address;
						// this.url = 'kjhgfdsytreytr';
						this.val = this.url;
						this.$refs.qrcode2._makeCode();
					}
				});
				
			},
			text(){
				this.$api.getRechargeNotice().then(res => {
					this.content = res.data
				});
			},
			chooseTab(index){
				if(index == 1){
					this.$msg('暂未开通')
				}else {
					this.tabindex = index;
				}
			},
			qrR(res) {
				this.src = res
				console.log(res)
			},
			clearQrcode() {
				this.$refs.qrcode._clearCode()
				this.val = ''
			},
			ifQrcode() {
				this.ifShow = !this.ifShow
			},
			copy(){
				console.log(132456)
				var conCopy = this.wallet.address
				// #ifdef H5
				 let content = conCopy // 复制内容，必须字符串，数字需要转换为字符串
				       const result = h5Copy(content)
				       if (result === false) {
				         this.$msg('复制失败，请重试');
				       } else {
				        this.$msg('复制成功');
				       }
				// #endif
				uni.setClipboardData({
					data: conCopy,
					success: () => {
						this.$msg('复制成功');
					},
					fail: () => {
						this.$msg('复制失败，请重试');
					}
				});
			},
			savePic(){
				this.$refs.qrcode2._saveCode();
				// uni.downloadFile({
				// 	url: this.rechargeAddress.recharge_code,
				// 	success: res => {
				// 		console.log(res)
				// 		if (res.statusCode == 200) {
				// 			uni.saveImageToPhotosAlbum({
				// 				filePath: res.tempFilePath,
				// 				success: (res) => {
				// 					console.log(res)
				// 					uni.showToast({
				// 						icon: 'success'
				// 					})
				// 				},
				// 				fail: () => {
				
				// 				}
				// 			})
				// 		}
				// 	}
				// })
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.copy {
		height: 56rpx;
		border-radius: 8px;
		background-color: rgba($color: #000000, $alpha: 0.09);
		font-size: 26rpx;
		width: 156rpx;
		text-align: center;
		line-height: 56rpx;
	}

	.top_list {
		width: 100%;
	}

	.on {
		color: $zhuse;
		background-color: rgba($color: $zhuse, $alpha: 0.09);

	}

	.off {
		background-color: #F5F5F5;
	}

	.topPlace {
		width: 100%;
		height: var(--status-bar-height);
		background: $zhuse;

	}

	.wallet_bg {
		height: 200rpx;
		background:$zhuse;
		// border-radius: 0px 0px 100rpx 100rpx;
		position: relative;

		.top_box {
			position: absolute;
			top: 20rpx;
			width: 698rpx;
			height: 782rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 20rpx 0px rgba(0, 0, 0, 0.1);
			border-radius: 32rpx;
		}
	}

	.box {
		width: 258rpx;
		height: 88rpx;
		border-radius: 16rpx;
		background-color: rgba($color: #5B08BE, $alpha: 0.09);
		justify-content: space-around;
		align-items: center;
	}
	.shouquan {
		margin-top: 50px;
		width: 50%;
		height: 82rpx;
		background: $zhuse;
		border-radius: 20rpx;
		line-height: 82rpx;
		text-align: center;
		color: #FFFFFF;
	}
</style>
