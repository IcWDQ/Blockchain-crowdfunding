<template>
	<view class="">
		<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="loadMore" style="height: 98vh">

			<view class="jui_bg_fff jui_pad_2432" v-if="list.length">
				<view class=" jui_bor_bottom jui_pad_b20 jui_mar_t20" style="width: 100%;" v-for="(item,index) in list"
					:key="index">
					<view class="jui_flex jui_flex_justify_between jui_flex_items_center" style="text-align: right;">
						<view class="jui_fc_333 jui_fs29 jui_mar_t20">
							数量：{{item.num | numFilter}}
						</view>
						<view class=" jui_fs29 jui_mar_t20  " :class="item.status == '已驳回'?'jui_fc_red':item.status == '待审核'?'':'jui_fc_zhuse'">

							{{item.status}}
						</view>
					</view>
					<!-- <view class="jui_flex jui_flex_justify_between jui_flex_items_center">
						<view class="jui_fs30 jui_mar_t20">
						服务费：{{item.fee}}
					</view>
					<view class="jui_fc_999 jui_fs29 jui_mar_t20">
						{{item.real_num}}
					</view>
					</view> -->
					<view class="jui_flex jui_flex_justify_between jui_flex_items_center">
						<view class="jui_fs30 jui_ellipsis_1 jui_fc_999" style="width: 55%;">
							服务费：{{item.fee    | numFilter}}
						</view>
						<view class="jui_fc_999 jui_fs29 jui_mar_t20 jui_text_right">
							{{item.time }}
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
				tab: [{
						text: '审核中'
					},
					{
						text: '已完成'
					},
					{
						text: '被驳回'
					},

				],
				tabIndex: 0,
				page: 1,
				size: 20,
				hasMore: false,
				list: []
			}
		},
		onShow() {
			this.getFromToken()
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
					page: this.page,
					list_rows: this.size
				}
				this.$api.withdrawal_log(data).then(res => {
					if (this.page == 1) {
						this.list = res.data.data
					} else {
						this.list = [...this.list, ...res.data.data]
					}
					if (res.data.data.length == 0) {
						this.hasMore = false
					} else {
						this.hasMore = true
					}
					console.log(this.list)
				});
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

		}
	}
</script>

<style>
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
		background: #5B08BE;
		border-radius: 4rpx;
	}

	.jui_bor_bottom:last-child {
		border: none !important;
	}
</style>
