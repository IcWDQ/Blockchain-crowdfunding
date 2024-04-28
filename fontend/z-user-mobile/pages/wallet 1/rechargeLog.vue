<template>
	<view class="">
		<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="loadMore" style="height: 98vh">
			<view class="jui_flex jui_flex_justify_between top jui_bg_fff"
				style="padding: 20rpx 120rpx;position: fixed;top: 80rpx;width: 100%;z-index: 1000;padding-bottom: 14rpx;">
				<view class="jui_flex_col_center" v-for="(item,index) in tab" :key="index" @tap="chooseTab(item,index)">
					<view class="">
						{{item.text}}
					</view>
					<view class="jui_mar_t12" :class="tabIndex==index?'on':''">

					</view>
				</view>
			</view>
			<view class="jui_h60"></view><view class="jui_h60 jui_bg_f5f"></view>
			<view class="jui_bg_fff jui_pad_2432" v-if="list.length">
				<view
					class="jui_flex jui_flex_justify_between jui_flex_items_center jui_bor_bottom jui_pad_b20 jui_mar_t20"
					style="width: 100%;" v-for="(item,index) in list" :key="index">
					<view class=""  style="width: 80%;">
						<view class="jui_fs30 jui_ellipsis_1">
							地址：{{item.orderId}}
						</view>
						<view class="jui_fc_999 jui_fs29 jui_mar_t20">
							通道：TRC20
						</view>
					</view>
					<view class="" style="text-align: right;">
						<view class="jui_fc_333 jui_fs29">
							数量：{{item.money}}
						</view>
						<!-- <view class=" jui_fs29 jui_mar_t20" :class="item.status == 0 ? 'jui_fc_999' : 'jui_fc_zhuse'">
							{{item.status == 0 ? '未到账' : '已到账'}}
						</view> -->
						<view  class=" jui_fs29 jui_mar_t20 jui_fc_999" v-if="item.status == 0">
							待支付
						</view>
						<view  class=" jui_fs29 jui_mar_t20 jui_fc_999" v-if="item.status == 1">
							待确认
						</view>
						<view  class=" jui_fs29 jui_mar_t20 jui_fc_zhuse" v-if="item.status == 2">
							成功
						</view>
						<view  class=" jui_fs29 jui_mar_t20 jui_fc_red" v-if="item.status == 3">
							失败
						</view>
					</view>
				</view>
			</view>
			<shopro-empty v-if="!list.length" :emptyData="emptyData"></shopro-empty>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				emptyData: {
					img: '/static/imgs/home/empty_goods.png',
					tip: '暂无数据~'
				},
				tab: [
					// {
					// 	text: '待支付'
					// },
					{
						text: '待确认'
					},
					{
						text: '成功'
					},
					{
						text: '失败'
					},
				],
				tabIndex: 0,
				page: 1,
				size: 20,
				hasMore: false,
				list: [],
				staus: 1,
				FromToken:''
			}
		},
		onShow() {
			this.getFromToken();
		},
		methods: {
			getFromToken() {
				this.$api.getFromToken({
					data: 1
				}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken;
						this.log()
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
					// page:this.page,
					// size:this.size
					staus: this.staus,
					FromToken:this.FromToken
				}
				this.$api.rechargeLog(data).then(res => {
					this.list = res.data.data
					// this.list = [...this.list, ...res.data.data]
					// if (res.data.data.length == 0) {
					// 	this.hasMore = false
					// } else {
					// 	this.hasMore = true
					// }
					console.log(this.list)
				});
			},
			chooseTab(item, index) {
				// this.page = 1,
				this.tabIndex = index;
				this.staus = index + 1;
				this.list = [];
				this.log()
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
		height: 100%;
	}

	/*  #ifndef H5 */
	.top {
		top: 0rpx !important;
	}

	/* #endif */
	.on {
		width: 38rpx;
		height: 8rpx;
		background: $zhuse;
		border-radius: 4rpx;
	}
	
	.jui_bor_bottom:last-child {
		border-bottom: none !important;
	}
</style>
