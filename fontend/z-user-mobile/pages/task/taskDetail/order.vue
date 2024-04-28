<template>
	<view class="">
		<view class="position_top jui_flex jui_flex_justify_between top jui_bg_fff">
			<view class="jui_flex_col_center" v-for="(item,index) in tab" :key="index" @tap="chooseTab(index)">
				<view class="">
					{{item.text}}
				</view>
				<view class="jui_mar_t12" :class="tabIndex==index?'on':''">
				</view>
			</view>
		</view>
		<view class="h50r"></view>
		<view class="">
			<view class="">
				<input type="text" />
			</view>
		</view>
		<uni-collapse>
			<uni-collapse-item title="搜索功能" >
				<view class="pt20r mt20r pb20r pl30r pr30r bg-eee">
					<view class="x-f">
						<view class="bg-ddd pl20r pr20r pt5r pb5r bor-rad10r   mr20r"
							:class="{'bg-zs color-fff':fromData.exchange_id==1 }" @tap.stop="fromData.exchange_id=1">火币
						</view>
						<view class="bg-ddd pl20r pr20r pt5r pb5r bor-rad10r   mr20r"
							:class="{'bg-zs color-fff':fromData.exchange_id==3 }" @tap.stop="fromData.exchange_id=3">币安
						</view>
						<view class="bg-ddd pl20r pr20r pt5r pb5r bor-rad10r   mr20r"
							:class="{'bg-zs color-fff':fromData.exchange_id==4 }" @tap.stop="fromData.exchange_id=4">
							OKEX
						</view>
					</view>
					<!-- <uni-combox label="交易所" :candidates="candidates" placeholder="请选择交易所" ></uni-combox> -->
					<view class="x-f mt20r">
						<view class="bor p5r pl20r pr20r " style="border: #666 solid 1px;">
							<input type="text" v-model="fromData.order_id" placeholder="交易单号" />
						</view>
					</view>
					<view class="x-f mt20r">
						<view class="bor p5r pl20r pr20r " style="border: #666 solid 1px;">
							<input type="text" v-model="fromData.symbol" placeholder="交易对" />
						</view>
					</view>
					<uni-datetime-picker class="mt20r" v-model="datetimerange" type="datetimerange" start="" end=""
						rangeSeparator="至" />
					<button type="primary" class="mt20r" @tap='getAllOrder()'>确认</button>
				</view>
			</uni-collapse-item>
		</uni-collapse>
		<view class="jui_mar_2432" v-for="(item,index) in orderlist" :key="index">
			<view class="jui_flex jui_flex_items_center jui_flex_justify_between">
				<view class="jui_flex jui_flex_items_center ">
					<view :class="!item.order_type?'blue':'red'">
						{{!item.order_type?'买':'卖'}}
					</view>
					<view class="jui_mar_l20 jui_fs32">
						<image style="width: 50rpx;height: 50rpx;" v-if="item.exchange_id===1"
							src="../../../static/imgs/icon_1.jpeg" mode=""></image>
						<image style="width: 50rpx;height: 50rpx;" v-if="item.exchange_id===3"
							src="../../../static/imgs/icon_3.jpeg" mode=""></image>
						<image style="width: 50rpx;height: 50rpx;" v-if="item.exchange_id===4"
							src="../../../static/imgs/icon_4.jpeg" mode=""></image>
					</view>
					<view class="jui_mar_l20 jui_fs32">
						{{item.symbol_name}}
					</view>
					<view class="ml20r color-or ">
						{{item.order_id}}
					</view>
				</view>
				<view class=" "
					:class="item.order_status == 10 ? 'jui_fc_zhuse' :item.order_status == 20?'jui_fc_zhuse':'jui_fc_666'">
					{{item.order_status == 10 ? '交易中' :item.order_status == 20?'交易完成':'交易撤销' }}
				</view>
			</view>
			<view class="jui_bor_bottom jui_pad_b20">
				<view class="jui_flex jui_flex_justify_start jui_flex_items_center jui_mar_t20">
					<view class="" style="width: 25%;">
						<view class="jui_fc_999 ">
							序号
						</view>
						<view class="jui_fc_333  jui_mar_t12">
							第{{item.trade_number}}单
						</view>
					</view>
					<view class="jui_flex_col_center" style="width: 45%;">
						<view class="jui_fc_999 ">
							时间
						</view>
						<view class="col  jui_mar_t12">
							{{item.create_time}}
						</view>
					</view>
					<view class="" style="text-align: right;width: 33%;">
						<view class="jui_fc_999 ">
							盈利
						</view>
						<view class="col  jui_mar_t12">
							{{item.total_profit}}
						</view>
					</view>
				</view>
				<view class="jui_flex jui_flex_justify_start jui_flex_items_center jui_mar_t20">
					<view class="" style="width: 33%;">
						<view class="jui_fc_999 ">
							成交均价
						</view>
						<view class="jui_fc_333  jui_mar_t12">
							{{item.order_price}}
						</view>
					</view>
					<view class="jui_flex_col_center" style="width: 33%;">
						<view class="jui_fc_999 ">
							交易总额
						</view>
						<view class="col  jui_mar_t12">
							{{item.order_amount}}
						</view>
					</view>
					<view class="" style="text-align: right;width: 33%;">
						<view class="jui_fc_999 ">
							成交量
						</view>
						<view class="col  jui_mar_t12">
							{{item.field_amount}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<shopro-empty v-if="!orderlist.length" :isFixed='false' :emptyData="emptyData"></shopro-empty>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				isAll: false,
				emptyData: {
					img: '/static/imgs/home/empty_goods.png',
					tip: '暂无数据~'
				},
				tab: [{
						text: '全部'
					},
					{
						text: '买入交易'
					},
					{
						text: '卖出交易'
					},

				],
				tabIndex: 0,
				id: 0,
				page: 1,
				size: 10,
				order_type: 0,
				orderlist: [],
				FromToken: '',
				fromData: { //搜索功能
					exchange_id: '',
					order_id: '',
					start_time: '',
					over_time: '',
					symbol: '',
					order_type: 0
				},

				candidates: ['火币', '币安', 'OKEX'],
				datetimerange: ['', ''],
			}
		},
		watch: {
			datetimerange(e) {
				this.fromData.start_time = e[0]
				this.fromData.over_time = e[1]
			}
		},
		onLoad(opt) {
			if (opt.id) {
				this.id = opt.id
				this.getFromToken()
			} else {
				this.getAllOrder()
				this.isAll = true
			}
		},
		onShow() {},
		methods: {
			getFromToken() {
				this.$api.getFromToken({
					data: 1
				}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken;
						this.order()
					}
				});
			},
			order() {
				let data = {
					task_id: this.id,
					order_type: this.order_type
				}
				this.$api.getOrderByTaskID(data).then(res => {
					if (res.code == 1) {
						this.orderlist = res.data.data
					}
				});
			},
			getAllOrder() {
				this.$api.getAllOrder(this.fromData).then(res => {
					if (res.code == 1) {
						this.orderlist = res.data.data
					}
				});
			},
			loadMore() {
				if (this.hasMore) {
					this.page++;
					this.order();
				}
			},
			chooseTab(index) {
				this.tabIndex = index
				this.order_type = index;
				this.fromData.order_type = index;
				if (this.isAll) {
					this.getAllOrder()
				} else {
					this.order()
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF !important;
	}

	.red {
		color: $col-red;
		border: 1px solid $col-red;
		width: 48rpx;
		height: 48rpx;
		font-size: 24rpx;
		border-radius: 50%;
		font-weight: 600;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.blue {
		color: $col-light-green;
		border: 1px solid $col-light-green;
		width: 48rpx;
		height: 48rpx;
		font-size: 24rpx;
		border-radius: 50%;
		font-weight: 600;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.position_top {
		border-bottom-left-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
		padding: 20rpx 80rpx;
		position: fixed;
		top: 80rpx;
		width: 100%;
		z-index: 9;
		box-sizing: border-box;
	}

	/*  #ifndef H5 */
	.top {
		top: 0rpx !important;
	}

	/* #endif */
	page {
		height: 101%;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item_H {
		display: inline-block;

		text-align: center;
		font-size: 36rpx;
	}

	.on {
		width: 30rpx;
		height: 10rpx;
		background-color: $zhuse;
		border-radius: 10rpx;
	}

	.exchange_bg {
		background: $zhuse;
		padding-top: 90rpx;

		.box {
			padding: 70rpx 30rpx 0 30rpx;
			flex-wrap: wrap;
		}
	}

	.topPlace {
		width: 100%;
		height: var(--status-bar-height);
		background: $zhuse;

	}
</style>
