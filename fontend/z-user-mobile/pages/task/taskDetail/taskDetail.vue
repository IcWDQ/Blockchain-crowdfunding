<template>
	<view class="">
		<view class=" bg-zs  color-fff p30r">
			<view class="jui_flex jui_flex_items_center jui_flex_justify_between">
				<view class="jui_flex">
					<view class="">
						<text class=" jui_fs32">{{taskDetail.symbol_name}}</text>
						<!-- <text class="jui_fc_999 jui_fs26">/{{taskDetail.symbol.split('/')[1]}}</text> -->
					</view>
					<view class="jui_flex jui_flex_items_center jui_flex_justify_center jui_bor_rad_15 on">
						<view class="">
							{{strategy_name}}
						</view>
					</view>
				</view>
				<view class="jui_flex jui_flex_items_center jui_flex_justify_center jui_bor_rad_15 onn">
					<view class="jui_font_weight">
						{{taskDetail.circle_type?'单次策略':'循环策略'}}
					</view>
				</view>
			</view>
			<view class=" jui_pad_b20 mt40r">
				<!-- <view class="x-bc mt24r f24r color-eee">
					<view class="flex1">持仓金额(USDT)</view>
					<view class="flex1 tc">持仓均价</view>
					<view class="flex1 tr">补仓次数</view>
				</view>
				<view class="x-bc mt24r f28r">
					<view class="flex1">{{taskDetail.total_interest}}</view>
					<view class="flex1 tc">{{taskDetail.average_price}}</view>
					<view class="flex1 tr"> </view>
				</view>
				<view class="x-bc mt32r f24r color-eee">
					<view class="flex1">持仓数量(AAVE)</view>
					<view class="flex1 tc">当前盈亏</view>
					<view class="flex1 tr">盈亏百分比</view>
				</view>
				<view class="x-bc mt24r f28r">
					<view class="flex1">{{taskDetail.open_interest}}</view>
					<view class="flex1 tc">{{taskDetail.current_profit}}</view>
					<view class="flex1 tr">{{taskDetail.percent}}</view>
				</view> -->
				<view class="jui_flex jui_flex_justify_start jui_flex_items_center jui_mar_t20">
					<view class="" style="width: 30%;">
						<view class=" jui_fs30">
							持仓总额
						</view>
						<view class=" jui_fs30 jui_mar_t12">
							{{taskDetail.total_interest}}
						</view>
					</view>
					<view class="jui_flex_col_center" style="width: 40%;">
						<view class=" jui_fs30">
							持仓量
						</view>
						<view class=" jui_fs30 jui_mar_t12">
							{{taskDetail.open_interest}}
						</view>
					</view>
					<view class="" style="text-align: right;width: 30%;">
						<view class=" jui_fs30">
							持仓均价
						</view>
						<view class=" jui_fs30 jui_mar_t12">
							{{taskDetail.average_price}}
						</view>
					</view>
				</view>
				<view class="jui_flex jui_flex_justify_start jui_flex_items_center jui_mar_t20">
					<view class="" style="width: 30%;">
						<view class=" jui_fs30">
							当前价格
						</view>
						<view class=" jui_fs30 jui_mar_t12">
							{{taskDetail.current_price}}

						</view>
					</view>
					<view class="jui_flex_col_center" style="width: 40%;">
						<view class=" jui_fs30">
							当前盈利
						</view>
						<view class=" jui_fs30 jui_mar_t12">
							{{taskDetail.grid_profit}}
						</view>
					</view>
					<view class="" style="text-align: right;width: 30%;">
						<view class=" jui_fs30">
							交易次数
						</view>
						<view class=" jui_fs30 jui_mar_t12">
							{{taskDetail.trade_number}}
						</view>
					</view>
				</view>
				<view class="jui_flex jui_flex_justify_start jui_flex_items_center jui_mar_t20">
					<view class="" style="width: 30%;">
						<view class=" jui_fs30">
							总收益
						</view>
						<view class=" jui_fs30 jui_mar_t12">
							{{taskDetail.total_profit}}
						</view>
					</view>
					<view class="jui_flex_col_center" style="width: 40%;">
						<view class=" jui_fs30">
							盈亏幅
						</view>
						<view class=" jui_fs30 jui_mar_t12">
							{{taskDetail.percent}}
						</view>
					</view>
					<view class="" style="text-align: right;width: 30%;">
						<view class=" jui_fs30">
							当前盈亏
						</view>
						<view class=" jui_fs30 jui_mar_t12">
							{{taskDetail.current_profit}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="exchange_bg">
			<view class="jui_bg_fff jui_lrtop box   ">
				<view class="">
					<!-- <view class="jui_fs34 jui_font_weight">
						策略参数
					</view> -->
					<view class="jui_fs30 jui_font_weight jui_mar_b20  jui_mar_t20 justify-between jui_flex">
						<text>策略参数</text>
					</view>
					<view class="jui_flex jui_flex_items_center cs_Box">
						<view class="mar_tb" v-if="taskDetail.first_amount">
							<text class="jui_fs30 jui_fc_999">首单额度</text>
							<text
								class="jui_fs30 jui_fc_333 jui_font_w600 jui_mar_l16">{{taskDetail.first_amount}}</text>
						</view>
						<view class="mar_tb" v-if="taskDetail.order_number">
							<text class="jui_fs30 jui_fc_999">计划做单</text>
							<text class="jui_fs30  jui_mar_l16 jui_font_w600">{{taskDetail.order_number}}</text>
						</view>
						<view class="mar_tb">
							<text class="jui_fs30 jui_fc_999">开仓倍数</text>
							<text
								class="jui_fs30 jui_fc_333 jui_font_w600 jui_mar_l16">{{taskDetail.first_multiple>0?taskDetail.first_multiple:'不加倍'}}</text>
						</view>
						<view class="mar_tb">
							<text class="jui_fs30 jui_fc_999">底部网格</text>
							<text
								class="jui_fs30 jui_fc_333 jui_font_w600 jui_mar_l16">{{taskDetail.grid_number>0?taskDetail.grid_number:'无'}}</text>
						</view>

						<!-- <view class="mar_tb"  v-if="taskDetail.cover_up_percent">
								<text class="jui_fs30 jui_fc_999">补仓比例</text>
								<text class="jui_fs30 jui_fc_zhuse jui_mar_l16">{{taskDetail.cover_up_percent}}%</text>
							</view>
							<view class="mar_tb"  v-if="taskDetail.cover_up_extra">
								<text class="jui_fs30 jui_fc_999">补仓增幅</text>
								<text class="jui_fs30 jui_fc_zhuse jui_mar_l16">{{taskDetail.cover_up_extra}}%</text>
							</view>
							<view class="mar_tb"  v-if="taskDetail.stop_profit_percent">
								<text class="jui_fs30 jui_fc_999">止盈比例</text>
								<text
									class="jui_fs30 jui_fc_zhuse jui_mar_l16">{{taskDetail.stop_profit_percent}}%</text>
							</view>
							<view class="mar_tb"  v-if="taskDetail.cover_up_reset">
								<text class="jui_fs30 jui_fc_999">补仓复位</text>
								<text class="jui_fs30 jui_fc_zhuse jui_mar_l16">{{taskDetail.cover_up_reset}}%</text>
							</view>
							<view class="mar_tb"  v-if="taskDetail.stop_profit_percent">
								<text class="jui_fs30 jui_fc_999">回调比例</text>
								<text
									class="jui_fs30 jui_fc_zhuse jui_mar_l16">{{taskDetail.cover_up_callback}}%</text>
							</view>
							<view class="mar_tb"  v-if="taskDetail.stop_profit_callback">
								<text class="jui_fs30 jui_fc_999"> 止盈回调</text>
								<text class="jui_fs30 jui_fc_zhuse jui_mar_l16">{{taskDetail.stop_profit_callback}}%</text>
							</view> -->
					</view>
					<!-- <view class="jui_mar_t12" >
							<text class="jui_fs30 jui_fc_999">补仓方式</text>
							<text class="jui_fs30 jui_fc_zhuse jui_mar_l16" >等额补仓</text>
							<text class="jui_fs30 jui_fc_zhuse jui_mar_l16" v-if="taskDetail.cover_up_type=='30'">倍数补仓</text>
							<text class="jui_fs30 jui_fc_zhuse jui_mar_l16" v-if="taskDetail.cover_up_type=='40'">自定义补仓</text>
						</view> -->
				</view>
				<view class="jui_bor_bottom jui_pad_b20">
					<view class="jui_fs30 jui_font_weight jui_mar_b20  jui_mar_t20 justify-between jui_flex">
						<text>补仓状态</text>

					</view>
					<view class="jui_flex jui_flex_items_center cs_Box" style="width: 100%;">
						<view class="mar_tb" style="width: 50%;">
							<text class="jui_fs30 jui_fc_999">监听状态</text>
							<text
								class="jui_fs30 jui_fc_333 jui_mar_l16 jui_fc_999">{{taskDetail.redis_buy_status==1 ? '监听中' : '未监听'}}</text>
						</view>
						<view class="mar_tb" style="width: 50%;">
							<text class="jui_fs30 jui_fc_999">基准价格</text>
							<text class="jui_fs30 jui_mar_l16 jui_fc_zhuse">{{taskDetail.redis_buy_base_price}}</text>
						</view>
						<view class="mar_tb" style="width: 50%;">
							<text class="jui_fs30 jui_fc_999">补仓价格</text>
							<text class="jui_fs30 jui_mar_l16 jui_fc_zhuse">{{taskDetail.redis_buy_price}}</text>
						</view>
						<view class="mar_tb" style="width: 50%;">
							<text class="jui_fs30 jui_fc_999">补仓金额</text>
							<text class="jui_fs30 jui_fc_zhuse jui_mar_l16">{{taskDetail.redis_buy_amount}}</text>
						</view>
						<view class="mar_tb" v-if="taskDetail.redis_buy_percent">
							<text class="jui_fs30 jui_fc_999">补仓比例</text>
							<text class="jui_fs30 jui_fc_zhuse jui_mar_l16">{{taskDetail.redis_buy_percent}}%</text>
						</view>
						<view class="mar_tb" v-if="taskDetail.redis_buy_callback">
							<text class="jui_fs30 jui_fc_999">回调比例</text>
							<text class="jui_fs30 jui_fc_zhuse jui_mar_l16">{{taskDetail.redis_buy_callback}}%</text>
						</view>

					</view>
				</view>
				<view class="jui_bor_bottom jui_pad_b20" style="width: 100%;">
					<view class="jui_fs30 jui_font_weight jui_mar_b20 justify-between jui_flex jui_mar_t20">
						<text>平仓状态</text>
					</view>
					<view class="jui_flex jui_flex_items_center cs_Box" style="width: 100%;">
						<view class="mar_tb" style="width: 50%;">
							<text class="jui_fs30 jui_fc_999">监听状态</text>
							<text
								class="jui_fs30 jui_fc_333  jui_mar_l16 jui_fc_999">{{taskDetail.redis_sell_status==1 ? '监听中' : '未监听'}}</text>
						</view>
						<view class="mar_tb" style="width: 50%;">
							<text class="jui_fs30 jui_fc_999">基准价格</text>
							<text class="jui_fs30 jui_mar_l16 jui_fc_zhuse">{{taskDetail.redis_sell_base_price}}</text>
						</view>
						<view class="mar_tb" style="width: 50%;">
							<text class="jui_fs30 jui_fc_999">平仓价格</text>
							<text class="jui_fs30 jui_fc_zhuse jui_mar_l16">{{taskDetail.redis_sell_price}}</text>
						</view>
						<view class="mar_tb" style="width: 50%;">
							<text class="jui_fs30 jui_fc_999">平仓数量</text>
							<text class="jui_fs30 jui_fc_zhuse jui_mar_l16">{{taskDetail.redis_sell_amount}}</text>
						</view>
						<view class="mar_tb" v-if="taskDetail.redis_sell_percent">
							<text class="jui_fs30 jui_fc_999">止盈比例</text>
							<text class="jui_fs30 jui_fc_zhuse jui_mar_l16">{{taskDetail.redis_sell_percent}}%</text>
						</view>
						<view class="mar_tb" v-if="taskDetail.redis_sell_callback">
							<text class="jui_fs30 jui_fc_999">止盈回调</text>
							<text class="jui_fs30 jui_fc_zhuse jui_mar_l16">{{taskDetail.redis_sell_callback}}%</text>
						</view>
					</view>
				</view>


				<view class="jui_footer jui_flex ">
					<view class="btn" @tap="yjbc()">
						一键补仓
					</view>
					<view class="btn" @tap="xgcl()" v-if="taskDetail.status == 30">
						修改策略
					</view>
					<view class="btn" style="" @tap="yjpc()">
						全部平仓
					</view>
					<view class="btn" @tap="changeCl">
						{{taskDetail.circle_type?'策略循环':'单次策略'}}
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="input" message="成功消息" :duration="2000" :before-close="true" @close="close"
				@confirm="confirm" mode="input" title="一键补仓" placeholder="请输入补仓数量"></uni-popup-dialog>
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
				naviValue: {
					"l": '/static/imgs/home/back.png',
					"c": '任务详情',
					"r": '交易记录',
					url: `/pages/task/taskDetail/order`
				},
				taskDetail: '',
				id: '', //任务id
				FromToken: '',
				strategy_id: '', //当前策略id
			}
		},
		onLoad(opt) {
			this.strategy_name = opt.strategy_name;

			this.id = opt.id;
			this.strategy_id = opt.strategy_id

		},
		onShow() {
			this.getFromToken()
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: `/pages/task/taskDetail/order?id=${this.id}`
			})
		},
		methods: {
			getFromToken() {
				this.$api.getFromToken({
					data: 1
				}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken;
						this.taskdetail()
					}
				});
			},
			changeCl() {
				let data = {
					circle_type: this.taskDetail.circle_type == 0 ? 1 : 0,
					id: this.id
				}
				this.$api.changeCircleType(data).then(res => {
					if (res.code == 1) {
						this.$msg(res.msg);
						setTimeout(() => {
							this.taskdetail()
						}, 1000)

					}
				});
			},
			xgcl() {
				let data = {
					name: this.taskDetail.symbol,
					item: this.taskDetail,
					task_id: this.id,
					strategy_id: this.strategy_id,
				}
				uni.setStorage({
					key: 'xgcl',
					data: data
				})
				uni.navigateTo({
					url: `/pages/task/newTask/changeTask`
				})
			},
			yjpc(item) {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '是否一键平仓？',
					success: function(res) {
						if (res.confirm) {
							let data = {
								id: _this.id,
							}
							_this.$api.batchLiquidation(data).then(res => {
								if (res.code == 1) {
									_this.$msg(res.msg)
									setTimeout(() => {
										uni.navigateBack()
									}, 1000)

								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			close(done) {
				done()
			},
			yjbc() {
				//一键补仓
				this.$refs.popup.open()
			},
			confirm(done, value) {
				//一键补仓
				// 输入框的值
				console.log(value)
				if (!value) {
					this.$msg('请填写补仓数量')
					return false;
					done()
				}
				if (value < 5) {
					this.$msg('补仓数量最小为5')
					return false;
					done()
				}
				let data = {
					id: this.id,
					amount: value
				}
				this.$api.coverUpTask(data).then(res => {
					if (res.code == 1) {
						this.$msg(res.msg);
						if (res.code == 1) {
							setTimeout(() => {
								this.taskdetail()
							}, 1000)
						}
					}
				});
				done()
			},
			taskdetail() {
				let data = {
					id: this.id,
				}
				this.$api.getTaskDetail(data).then(res => {
					if (res.code == 1) {
						this.taskDetail = res.data
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	body {
		background: #FFFFFF !important;
	}

	page {
		background: #FFFFFF !important;
	}

	.col {
		color: #12C382;
	}

	.marl {
		margin-left: 80rpx;
	}

	.mar_tb {
		width: 50%;
		margin: 14rpx 0;
	}

	.cs_Box {
		display: flex;
		flex-wrap: wrap;
	}

	.jui_footer {
		bottom: 20rpx;
		// background-color: ;
		justify-content: space-around;
	}

	.btn {
		width: 24%;
		background-color: $zhuse;
		height: 80rpx;
		border-radius: 20rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
	}

	.exchange_bg {
		background: $zhuse;
		// padding-top: 90rpx;

		.box {
			padding: 50rpx 30rpx 150rpx 30rpx;
			flex-wrap: wrap;
		}
	}

	.topPlace {
		width: 100%;
		height: var(--status-bar-height);
		background: $zhuse;

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
		color: #FBF3FF;
		border: 2rpx solid #FFFFFF;
		width: 148rpx;
		height: 44rpx;
		font-size: 24rpx;
		margin-left: 40rpx;
	}
</style>
