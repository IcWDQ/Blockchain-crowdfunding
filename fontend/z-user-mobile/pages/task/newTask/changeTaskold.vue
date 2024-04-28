<template>
	<view class="">
		<!-- #ifdef APP-PLUS -->
		<!-- <view class="topPlace"></view> -->
		<!-- #endif -->
		<!-- <v-navigation :value="naviValue"></v-navigation> -->

		<!--  -->
		<view class="exchange_bg">
			<view class="jui_bg_fff jui_lrtop box   ">
				<view class="">
					<text class="jui_fc_333 jui_fs32 ">{{symbol}}</text>
					<!-- <text class="jui_fc_999 jui_fs26">/{{symbol.split('/')[1]}}</text> -->
				</view>
				<view class=" jui_pad_t20">
					<!-- 交易类型 -->
					<view class="jui_flex jui_flex_items_center jui_mar_t20 jui_flex_justify_between"
						v-if="currentStrategy.p_content?currentStrategy.p_content.trade_type.name:''">
						<view class="jui_flex jui_flex_items_center" style="width: 95%;">
							<view class="jui_fs29 jui_fc_333">
								{{currentStrategy.p_content.trade_type.name}}：
							</view>
							<view class="">
								<radio-group @change="radioChangeTypeShixian" class="jui_flex">
									<label class="uni-list-cell uni-list-cell-pd  scroll-view-item_H"
										v-for="(item, index) in shixian" :key="item.value">
										<view class="jui_flex jui_flex_items_center">
											<view>
												<radio :value="String(index)" :checked="shixianNum == index"
													:color="color" style="transform:scale(0.6)" />
											</view>
											<view class="jui_fs26">{{item.name}}</view>
										</view>
									</label>
								</radio-group>
							</view>
						</view>

						<!-- <view class="jui_fs29 jui_fc_333">
							单
						</view> -->
					</view>
					<!-- 平仓方式-->
					<view class="jui_flex jui_flex_items_center jui_mar_t20 jui_flex_justify_between"
						v-if="currentStrategy.p_content?currentStrategy.p_content.sell_type.name:''">
						<view class="jui_flex jui_flex_items_center" style="width: 95%;">
							<view class="jui_fs29 jui_fc_333">
								{{currentStrategy.p_content.sell_type.name}}：
							</view>
							<radio-group @change="radioChangeTypePingcang" class="jui_flex">
								<label class="uni-list-cell uni-list-cell-pd  scroll-view-item_H"
									v-for="(item, index) in pingcang" :key="item.value">
									<view class="jui_flex jui_flex_items_center">
										<view>
											<radio :value="String(index)" :checked="pingcangNum == index" :color="color"
												style="transform:scale(0.6)" />
										</view>
										<view class="jui_fs26">{{item.name}}</view>
									</view>
								</label>
							</radio-group>
						</view>
					</view>
					<!-- 任务补仓 -->
					<view class="jui_flex jui_flex_items_center jui_mar_t20 jui_flex_justify_between"
						v-if="currentStrategy.p_content?currentStrategy.p_content.buy_type.name:''">
						<view class="jui_flex jui_flex_items_center" style="width: 95%;">
							<view class="jui_fs29 jui_fc_333">
								{{currentStrategy.p_content.buy_type.name}}：
							</view>
							<radio-group @change="radioChangeTypeLideng" class="jui_flex">
								<label class="uni-list-cell uni-list-cell-pd  scroll-view-item_H"
									v-for="(item, index) in lideng" :key="item.value">
									<view class="jui_flex jui_flex_items_center">
										<view>
											<radio :value="String(index)" :checked="lidengNum == index" :color="color"
												style="transform:scale(0.6)" />
										</view>
										<view class="jui_fs26">{{item.name}}</view>
									</view>
								</label>
							</radio-group>
						</view>
					</view>
					<!-- 首单额度 -->
					<view class="jui_flex jui_flex_items_center jui_mar_t20 jui_flex_justify_between"
						v-if="currentStrategy.p_content?currentStrategy.p_content.first_amount.name:''">
						<view class="jui_flex jui_flex_items_center" style="width: 95%;">
							<view class="jui_fs29 jui_fc_333">
								{{currentStrategy.p_content.first_amount.name}}：
							</view>
							<input type="text"
								:placeholder="currentStrategy.p_content.first_amount.custom==1?currentStrategy.p_content.first_amount.min + ' - '+ currentStrategy.p_content.first_amount.max + '区间':currentStrategy.p_content.first_amount.default"
								class="ipt_long " v-model="first_amount"
								:disabled="currentStrategy.p_content.order_number.custom==0?'disabled':false ">
						</view>
						<view class="jui_fs29 jui_fc_333">
							U
						</view>
					</view>
					<!-- 做单数量 -->
					<view class="jui_flex jui_flex_items_center jui_mar_t20 jui_flex_justify_between"
						v-if="currentStrategy.p_content?currentStrategy.p_content.order_number.name:''">
						<view class="jui_flex jui_flex_items_center" style="width: 95%;">
							<view class="jui_fs29 jui_fc_333">
								{{currentStrategy.p_content.order_number.name}}：
							</view>
							<input type="text"
								:placeholder="currentStrategy.p_content.order_number.custom==1?currentStrategy.p_content.order_number.min + ' - '+ currentStrategy.p_content.order_number.max + '区间':currentStrategy.p_content.order_number.default"
								class="ipt_long "
								:disabled="currentStrategy.p_content.order_number.custom==0?true:false "
								v-model="order_number">
						</view>
						<view class="jui_fs29 jui_fc_333">
							单
						</view>
					</view>
					<view class="jui_flex jui_flex_items_center jui_mar_t20 jui_flex_justify_between"
						v-if="currentStrategy.p_content?currentStrategy.p_content.cover_type.name:''">
						<view class="jui_flex jui_flex_items_center" style="width: 95%;">
							<view class="jui_fs29 jui_fc_333">
								{{currentStrategy.p_content.cover_type.name}}：
							</view>
							<view class="">
								<radio-group @change="radioChangeType" class="jui_flex">
									<label class="uni-list-cell uni-list-cell-pd  scroll-view-item_H"
										v-for="(item, index) in type" :key="item.value">
										<view class="jui_flex jui_flex_items_center">
											<view>
												<radio :value="String(index)" :checked="typeIndex == index"
													:color="color" style="transform:scale(0.6)" />
											</view>
											<view class="jui_fs26">{{item.name}}</view>
										</view>
									</label>
								</radio-group>
							</view>
						</view>
					</view>
					<view class="jui_flex jui_flex_items_center jui_mar_t20 jui_flex_justify_between"
						v-if="bucangChuan == 1">
						<!-- 倍投 -->
						<view class="jui_flex jui_flex_items_center" style="width: 95%;">
							<view class="jui_fs29 jui_fc_333">
								<!-- {{currentStrategy.p_content.cover_type.amount.name}}： -->
								倍投上限：
							</view>
							<input type="text"
								:placeholder="currentStrategy.p_content.cover_type.limit.custom==1?currentStrategy.p_content.cover_type.limit.min + ' - '+ currentStrategy.p_content.cover_type.limit.max + '区间':currentStrategy.p_content.cover_type.limit.default"
								class="ipt_short " v-model="cover_type_limit"
								:disabled="currentStrategy.p_content.cover_type.limit.custom==0?'disabled':false ">
						</view>
					</view>
					<view class="jui_flex jui_flex_items_center jui_mar_t20 jui_flex_justify_between"
						v-if="bucangChuan == 2">
						<!-- 加仓金额 -->
						<view class="jui_flex jui_flex_items_center" style="width: 95%;">
							<view class="jui_fs29 jui_fc_333">
								<!-- {{currentStrategy.p_content.cover_type.amount.name}}： -->
								加仓金额：
							</view>
							<input type="text"
								:placeholder="currentStrategy.p_content.cover_type.amount.custom==1?currentStrategy.p_content.cover_type.amount.min + ' - '+ currentStrategy.p_content.cover_type.amount.max + '区间':currentStrategy.p_content.cover_type.amount.default"
								class="ipt_long " v-model="cover_type_amount"
								:disabled="currentStrategy.p_content.cover_type.amount.custom==0?'disabled':false ">
						</view>
						<view class="jui_fs29 jui_fc_333 jui_mar_r12">
							USDT
						</view>
					</view>
					<!-- 止盈比例 -->
					<view class="jui_flex jui_flex_items_center jui_mar_t20 jui_flex_justify_between"
						v-if="currentStrategy.p_content?currentStrategy.p_content.stop_profit_percent.name:''">
						<view class="jui_flex jui_flex_items_center" style="width: 95%;">
							<view class="jui_fs29 jui_fc_333">
								{{currentStrategy.p_content.stop_profit_percent.name}}：
							</view>
							<input type="text"
								:placeholder="currentStrategy.p_content.stop_profit_percent.custom==1?currentStrategy.p_content.stop_profit_percent.min + ' - '+ currentStrategy.p_content.stop_profit_percent.max + '区间':currentStrategy.p_content.stop_profit_percent.default"
								class="ipt_short " v-model="stop_profit_percent"
								:disabled="currentStrategy.p_content.stop_profit_percent.custom==0?'disabled':false ">
						</view>
						<view class="jui_fs29 jui_fc_333 jui_mar_r12">
							%
						</view>
					</view>
					<!-- 补仓比例 -->
					<view class="jui_flex jui_flex_items_center jui_mar_t20 jui_flex_justify_between"
						v-if="currentStrategy.p_content?currentStrategy.p_content.cover_up_percent.name:''">
						<view class="jui_flex jui_flex_items_center" style="width: 95%;">
							<view class="jui_fs29 jui_fc_333">
								{{currentStrategy.p_content.cover_up_percent.name}}：
							</view>
							<input type="text"
								:placeholder="currentStrategy.p_content.cover_up_percent.custom==1?currentStrategy.p_content.cover_up_percent.min + ' - '+ currentStrategy.p_content.cover_up_percent.max + '区间':currentStrategy.p_content.cover_up_percent.default"
								class="ipt_long " v-model="cover_up_percent"
								:disabled="currentStrategy.p_content.cover_up_percent.custom==0?'disabled':false ">
						</view>
						<view class="jui_fs29 jui_fc_333">
							%
						</view>
					</view>
					<!-- 补仓增幅 -->
					<view class="jui_flex jui_flex_items_center jui_mar_t20 jui_flex_justify_between"
						v-if="currentStrategy.p_content?currentStrategy.p_content.cover_up_extra.name:''">
						<view class="jui_flex jui_flex_items_center" style="width: 75%;">
							<view class="jui_fs29 jui_fc_333">
								{{currentStrategy.p_content.cover_up_extra.name}}：
							</view>
							<input type="text"
								:placeholder="currentStrategy.p_content.cover_up_extra.custom==1?currentStrategy.p_content.cover_up_extra.min + ' - '+ currentStrategy.p_content.cover_up_extra.max + '区间':currentStrategy.p_content.cover_up_extra.default"
								:disabled="currentStrategy.p_content.cover_up_extra.custom==0?'disabled':false "
								class="ipt_short " v-model="cover_up_extra">
						</view>
						<view class="jui_fs29 jui_fc_333 jui_mar_r12">
							%
						</view>
						<view class="jui_fc_zhuse" @tap="bucangzengfu()">
							查看说明
						</view>
					</view>
					<!-- 补仓复位 -->
					<view class="jui_flex jui_flex_items_center jui_mar_t20 jui_flex_justify_between"
						v-if="currentStrategy.p_content?currentStrategy.p_content.cover_up_reset.name:''">
						<view class="jui_flex jui_flex_items_center" style="width: 75%;">
							<view class="jui_fs29 jui_fc_333">
								{{currentStrategy.p_content.cover_up_reset.name}}：
							</view>
							<input type="text"
								:placeholder="currentStrategy.p_content.cover_up_reset.custom==1?currentStrategy.p_content.cover_up_reset.min + ' - '+ currentStrategy.p_content.cover_up_reset.max + '区间':currentStrategy.p_content.cover_up_reset.default"
								:disabled="currentStrategy.p_content.cover_up_reset.custom==0?'disabled':false "
								class="ipt_short " v-model="cover_up_reset">
						</view>
						<view class="jui_fs29 jui_fc_333 jui_mar_r12">
							%
						</view>
						<view class="jui_fc_zhuse" @tap="bucangfuwei()()">
							查看说明
						</view>
					</view>
					<!-- 补仓回调 -->
					<view class="jui_flex jui_flex_items_center jui_mar_t20 jui_flex_justify_between"
						v-if="currentStrategy.p_content?currentStrategy.p_content.cover_up_callback.name:''">
						<view class="jui_flex jui_flex_items_center" style="width: 95%;">
							<view class="jui_fs29 jui_fc_333">
								{{currentStrategy.p_content.cover_up_callback.name}}：
							</view>
							<input type="text"
								:placeholder="currentStrategy.p_content.cover_up_callback.custom==1?currentStrategy.p_content.cover_up_callback.min + ' - '+ currentStrategy.p_content.cover_up_callback.max + '区间':currentStrategy.p_content.cover_up_callback.default"
								:disabled="currentStrategy.p_content.cover_up_callback.custom==0?'disabled':false "
								class="ipt_long " v-model="cover_up_callback">
						</view>
						<view class="jui_fs29 jui_fc_333 jui_mar_r12">
							%
						</view>

					</view>
					<!-- 止盈回调 -->
					<view class="jui_flex jui_flex_items_center jui_mar_t20 jui_flex_justify_between"
						v-if="currentStrategy.p_content?currentStrategy.p_content.stop_profit_callback.name:''">
						<view class="jui_flex jui_flex_items_center" style="width: 95%;">
							<view class="jui_fs29 jui_fc_333">
								{{currentStrategy.p_content.stop_profit_callback.name}}：
							</view>
							<input type="text"
								:placeholder="currentStrategy.p_content.stop_profit_callback.custom==1?currentStrategy.p_content.stop_profit_callback.min + ' - '+ currentStrategy.p_content.stop_profit_callback.max + '区间':currentStrategy.p_content.stop_profit_callback.default"
								:disabled="currentStrategy.p_content.stop_profit_callback.custom==0?'disabled':false "
								class="ipt_long " v-model="stop_profit_callback">
						</view>
						<view class="jui_fs29 jui_fc_333 jui_mar_r12">
							%
						</view>

					</view>
					<!-- <view class="jui_mar_t20 jui_fc_999 jui_fs28" v-if="current==20||current==40||current==30||current==10">
						建仓后，一直下跌不会买入，当价格回调到您的回调指标才买入。回调比例请在0.1-5之间设置
					</view> -->
					<!-- "止损比例 -->
					<view class="jui_flex jui_flex_items_center jui_mar_t20 jui_flex_justify_between"
						v-if="currentStrategy.p_content?currentStrategy.p_content.stop_loss_percent.name:''">
						<view class="jui_flex jui_flex_items_center" style="width: 95%;">
							<view class="jui_fs29 jui_fc_333">
								{{currentStrategy.p_content.stop_loss_percent.name}}：
							</view>
							<input type="text"
								:placeholder="currentStrategy.p_content.stop_loss_percent.custom==1?currentStrategy.p_content.stop_loss_percent.min + ' - '+ currentStrategy.p_content.stop_loss_percent.max + '区间':currentStrategy.p_content.stop_loss_percent.default"
								:disabled="currentStrategy.p_content.stop_loss_percent.custom==0?'disabled':false "
								class="ipt_long " v-model="stop_loss_percent">
						</view>
						<view class="jui_fs29 jui_fc_333 jui_mar_r12">
							%
						</view>
					</view>
				</view>

				<view class="jui_h100"></view>
				<view class="jui_h60"></view>

			</view>
		</view>
		<view class="jui_h100">

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
				naviValue: {
					"l": '/static/imgs/home/back.png',
					"c": '修改任务',
					"r": '',
					url: ''
				},
				current: 1, //当前策略id
				type: [],
				trade_type: '', //交易类型
				sell_type: '', //"平仓方式"
				buy_type: '', //任务补仓
				first_amount: '', //"首单额度"
				order_number: '', //"做单数量"
				cover_type: '', //"补仓类型"
				cover_type_amount: '', //"加仓金额"
				cover_type_limit: '', //""倍投上限""
				stop_profit_percent: '', //"止盈比例"
				cover_up_percent: '', //"补仓比例"
				cover_up_extra: '', //"补仓增幅"
				cover_up_callback: '', //"补仓回调"
				cover_up_reset: '', //补仓复位
				stop_profit_callback: '', //"止盈回调"
				stop_loss_percent: '', //"止损比例"
				symbol: '', //选择交易对名字
				FromToken: '',
				taskDeail: '', //所有策略详情
				currentStrategy: '', //当前策略详情
				typeIndex: 0, //选择补仓类型
				bucangChuan: 0,
				item: '', //当前任务详情
				task_id: '',
				shixian: [], //市价还是现价radio 交易类型
				shixianNum: 0, //选择de市价还是限价
				shixianChuan: '',
				pingcang: [], //逐仓全仓radio  平仓方式
				pingcangNum: 0, //选择de是逐仓全仓
				pingcangChuan: '',
				lideng: [], //立即等待radio   任务补仓
				lidengNum: 0, //选择de是立即等待
				lidengChuan: '',
				color: '#5A08BC'
			}
		},
		onShow() {
			this.type = [];
			this.shixian = [];
			this.pingcang = [];
			this.lideng = [];
			this.getFromToken()
		},
		onLoad(opt) {
			let _this = this;
			uni.getStorage({
				key: 'xgcl',
				success(ret) {
					_this.symbol = ret.data.name;
					_this.current = ret.data.strategy_id;
					_this.task_id = ret.data.task_id;
					_this.item = JSON.parse(ret.data.item)
					// console.log(ret.data.item)
					_this.trade_type = _this.item.trade_type;
					_this.sell_type = _this.item.sell_type;
					_this.buy_type = _this.item.buy_type;
					_this.first_amount = _this.item.first_amount;
					_this.order_number = _this.item.order_number;
					_this.cover_type = _this.item.cover_type;
					_this.cover_type_amount = _this.item.cover_type_amount;
					_this.cover_type_limit = _this.item.cover_type_limit;
					_this.stop_profit_percent = _this.item.stop_profit_percent;
					_this.cover_up_percent = _this.item.cover_up_percent;
					_this.cover_up_extra = _this.item.cover_up_extra;
					_this.cover_up_callback = _this.item.cover_up_callback;
					_this.cover_up_reset = _this.item.cover_up_reset;
					_this.stop_profit_callback = _this.item.stop_profit_callback;
					_this.stop_loss_percent = _this.item.stop_loss_percent;
					_this.shixianChuan = _this.item.trade_type;

					_this.pingcangChuan = _this.item.sell_type;

					_this.lidengChuan = _this.item.buy_type;

					_this.bucangChuan = _this.item.cover_type;


					_this.strategy()
				}
			})

		},

		methods: {
			getFromToken() {
				this.$api.getFromToken({
					data: 1
				}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken;


					}
				});
			},
			bucangfuwei() {
				uni.showModal({
					title: '复位补仓比例说明',
					content: '补仓复位是当本单卖出后，补仓比例.恢复的初始比例，如您设置的是1%，当本单卖出后，补仓比例即自动变为1%。',
					// showCancel:false,
					cancelText: '关闭',
					confirmColor: '#5B08BE',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			bucangzengfu() {
				uni.showModal({
					title: '补仓增幅说明',
					content: '补仓增幅是指每一单补仓后“补仓 比例”的变动幅度，比如你设置了补仓比例为1%，补仓增幅为1%。第一单立即买入 第二单补仓比例为1% 第三单补仓比例为2%  第四单补仓比例为3% ...',
					// showCancel:false,
					cancelText: '关闭',
					confirmColor: '#5B08BE',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//修改任务
			commitData() {

				if (!this.currentStrategy.p_content.first_amount.custom) {
					this.first_amount = this.currentStrategy.p_content.first_amount.default;

				} else {
					console.log(this.first_amount, this.currentStrategy.p_content.first_amount.min, this.currentStrategy
						.p_content.first_amount.max)
					if (this.first_amount - 0 < this.currentStrategy.p_content.first_amount.min - 0 || this.first_amount -
						0 > this.currentStrategy.p_content.first_amount.max - 0) {
						console.log(12346)
						this.$msg('请输入正确首单额度区间');
						return false;
					}

				}
				if (!this.currentStrategy.p_content.order_number.custom) {
					this.order_number = this.currentStrategy.p_content.order_number.default
				} else {
					if (this.order_number - 0 < this.currentStrategy.p_content.order_number.min - 0 || this.order_number -
						0 > this.currentStrategy.p_content.order_number.max - 0) {
						this.$msg('请输入正确做单数量区间');
						return false;
					}
				}
				if (!this.currentStrategy.p_content.stop_profit_percent.custom) {
					this.stop_profit_percent = this.currentStrategy.p_content.stop_profit_percent.default
				} else {
					if (this.stop_profit_percent - 0 < this.currentStrategy.p_content.stop_profit_percent.min - 0 || this
						.stop_profit_percent - 0 > this.currentStrategy.p_content.stop_profit_percent.max - 0) {
						this.$msg('请输入正确止盈比例区间');
						return false;
					}
				}
				if (!this.currentStrategy.p_content.cover_up_percent.custom) {
					this.cover_up_percent = this.currentStrategy.p_content.cover_up_percent.default
				} else {
					if (this.cover_up_percent - 0 < this.currentStrategy.p_content.cover_up_percent.min - 0 || this
						.cover_up_percent - 0 > this.currentStrategy.p_content.cover_up_percent.max - 0) {
						this.$msg('请输入正确补仓比例区间');
						return false;
					}
				}
				if (!this.currentStrategy.p_content.cover_up_extra.custom) {
					this.cover_up_extra = this.currentStrategy.p_content.cover_up_extra.default
				} else {
					if (this.cover_up_extra - 0 < this.currentStrategy.p_content.cover_up_extra.min - 0 || this
						.cover_up_extra - 0 > this.currentStrategy.p_content.cover_up_extra.max - 0) {
						this.$msg('请输入正确补仓增幅区间');
						return false;
					}
				}
				if (!this.currentStrategy.p_content.cover_up_reset.custom) {
					this.cover_up_reset = this.currentStrategy.p_content.cover_up_reset.default
				} else {
					if (this.cover_up_reset - 0 < this.currentStrategy.p_content.cover_up_reset.min - 0 || this
						.cover_up_reset - 0 > this.currentStrategy.p_content.cover_up_reset.max - 0) {
						this.$msg('请输入正确补仓复位区间');
						return false;
					}
				}
				if (!this.currentStrategy.p_content.cover_up_callback.custom) {
					this.cover_up_callback = this.currentStrategy.p_content.cover_up_callback.default
				} else {
					if (this.cover_up_callback - 0 < this.currentStrategy.p_content.cover_up_callback.min - 0 || this
						.cover_up_callback - 0 > this.currentStrategy.p_content.cover_up_callback.max - 0) {
						this.$msg('请输入正确补仓回调区间');
						return false;
					}
				}
				if (!this.currentStrategy.p_content.stop_profit_callback.custom) {
					this.stop_profit_callback = this.currentStrategy.p_content.stop_profit_callback.default
				} else {
					if (this.stop_profit_callback - 0 < this.currentStrategy.p_content.stop_profit_callback.min - 0 || this
						.stop_profit_callback - 0 > this.currentStrategy.p_content.stop_profit_callback.max - 0) {
						this.$msg('请输入正确止盈回调区间');
						return false;
					}
				}
				if (!this.currentStrategy.p_content.stop_loss_percent.custom) {
					this.stop_loss_percent = this.currentStrategy.p_content.stop_loss_percent.default
				} else {
					if (this.stop_loss_percent - 0 < this.currentStrategy.p_content.stop_loss_percent.min - 0 || this
						.stop_loss_percent - 0 > this.currentStrategy.p_content.stop_loss_percent.max - 0) {
						this.$msg('请输入正确止损比例区间');
						return false;
					}
				}
				let data = {
					id: this.task_id,
					symbol: this.symbol,
					trade_type: this.shixianChuan,
					sell_type: this.pingcangChuan,
					buy_type: this.lidengChuan,
					first_amount: this.first_amount,
					order_number: this.order_number,
					cover_type: this.bucangChuan,
					stop_profit_percent: this.stop_profit_percent,
					cover_up_percent: this.cover_up_percent,
					cover_up_extra: this.cover_up_extra,
					cover_up_callback: this.cover_up_callback,
					cover_up_reset: this.cover_up_reset,
					stop_profit_callback: this.stop_profit_callback,
					stop_loss_percent: this.stop_loss_percent
				}
				if (this.bucangChuan == 1) {
					data.cover_type_limit = this.cover_type_limit;
					if (this.cover_type_limit == '') {
						this.$msg('请输入倍投上限');
						return false;
					}
					if (this.currentStrategy.p_content.cover_type.limit.custom) {
						if (this.cover_type_limit - 0 < this.currentStrategy.p_content.cover_type.limit.min - 0 || this
							.cover_type - 0 > this.currentStrategy.p_content.cover_type.limit.max - 0) {
							this.$msg('请输入正确倍投上限');
							return false;
						}
					}
				}
				if (this.bucangChuan == 2) {
					data.cover_type_amount = this.cover_type_amount;
					if (this.cover_type_amount == '') {
						this.$msg('请输入加仓金额');
						return false;
					}
					if (this.currentStrategy.p_content.cover_type.amount.custom) {
						if (this.cover_type_amount - 0 < this.currentStrategy.p_content.cover_type.amount.min - 0 || this
							.cover_type - 0 > this.currentStrategy.p_content.cover_type.amount.max - 0) {
							this.$msg('请输入正确加仓金额区间');
							return false;
						}
					}
				}
				this.$api.editTask(data).then(res => {
					if (res.code == 1) {
						this.$msg(res.msg)
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/task/task'
							})
						}, 1000)
					}
				});
			},
			strategy() {
				this.$api.policy().then(res => {
					let arr = [];
					this.taskDeail = res.data;
					this.taskDeail.forEach((item) => {
						if (this.current == item.id) {
							this.currentStrategy = item;
						}
					})
					// console.log(this.currentStrategy);
					//交易类型
					// custom 1 客户可选
					// custom 0  客户不能选择 判断default为0 显示市价 为显示限价
					if (this.currentStrategy.p_content.trade_type.custom == 0) {
						if (this.currentStrategy.p_content.trade_type.default == 0) {
							this.shixian.push({
								name: '市价'
							});
							this.shixianChuan = 0;
						}
						if (this.currentStrategy.p_content.trade_type.default == 1) {
							this.shixian.push({
								name: '限价'
							});
							this.shixianChuan = 1;
						}
					} else {
						//custom 为 1
						this.shixian.push({
							name: '市价'
						});
						this.shixian.push({
							name: '限价'
						});
						if (this.item.trade_type == 1) {
							this.shixianNum = 1;
						}
					}
					// console.log(this.shixian,123)
					//平仓方式
					// custom 1 客户可选
					// custom 0  客户不能选择 判断default为0 显示逐仓 为显示全仓
					if (this.currentStrategy.p_content.sell_type.custom == 0) {
						if (this.currentStrategy.p_content.sell_type.default == 0) {
							this.pingcang.push({
								name: '逐仓'
							});
							this.pingcangChuan = 0;
						}
						if (this.currentStrategy.p_content.sell_type.default == 1) {
							this.pingcang.push({
								name: '全仓'
							});
							this.pingcangChuan = 1;
						}

					} else {
						//custom 为 1
						this.pingcang.push({
							name: '逐仓'
						});
						this.pingcang.push({
							name: '全仓'
						});
						if (this.item.sell_type == 1) {
							this.pingcangNum = 1;
						}
					}
					//任务补仓
					// custom 1 客户可选
					// custom 0  客户不能选择 判断default为0 显示立即 为显示等待
					if (this.currentStrategy.p_content.buy_type.custom == 0) {
						if (this.currentStrategy.p_content.buy_type.default == 0) {
							this.lideng.push({
								name: '立即'
							});
							this.lidengChuan = 0;
						}
						if (this.currentStrategy.p_content.buy_type.default == 1) {
							this.lideng.push({
								name: '等待'
							});
							this.lidengChuan = 1;
						}
					} else {
						//custom 为 1
						this.lideng.push({
							name: '立即'
						});
						this.lideng.push({
							name: '等待'
						});
						if (this.item.buy_type == 1) {
							this.lidengNum = 1;
						}
					}
					//type[]补仓类型
					//custom为0只显示等额字段     custom为1 补仓类型三个值可选 ，选择等额只需传cover_type一个字段值为default，custom为1且default为1 显示倍投字段，添加一个"cover_type_limit"字段，custom为1且default为2 显示追加字段，添加一个""cover_type_amount""字段
					if (this.currentStrategy.p_content.cover_type.custom == 0) {
						if (this.currentStrategy.p_content.cover_type.default == 0) {
							this.type.push({
								name: '等额'
							});
							this.cover_type = 0;
						}
						if (this.currentStrategy.p_content.cover_type.default == 1) {
							this.type.push({
								name: '倍投'
							});
							this.bucangChuan = 1;
							this.cover_type = 1;

							console.log(this.typeIndex)
						}
						if (this.currentStrategy.p_content.cover_type.default == 2) {
							this.type.push({
								name: '追加'
							});
							this.bucangChuan = 2;
							this.cover_type = 2;
						}
					}
					console.log(123456)
					if (this.currentStrategy.p_content.cover_type.custom == 1) {
						console.log(123456)
						this.type.push({
							name: '等额'
						});
						this.currentStrategy.p_content.cover_type.limit.name = '倍投'
						this.type.push(this.currentStrategy.p_content.cover_type.limit);
						this.currentStrategy.p_content.cover_type.amount.name = '追加'
						this.type.push(this.currentStrategy.p_content.cover_type.amount);
						if (this.item.cover_type == 1) {
							this.typeIndex = 1;
							this.cover_type_limit = this.item.cover_type_limit
						}
						if (this.item.cover_type == 2) {
							this.typeIndex = 2;
							this.cover_type_amount = this.item.cover_type_amount
						}
					}

				});
			},
			detail() {
				uni.navigateTo({
					url: '/pages/task/taskDetail/taskDetail'
				})
			},
			//选择补仓类型
			radioChangeType(evt) {
				console.log(evt, evt.target.value)
				for (let i = 0; i < this.type.length; i++) {
					this.typeIndex = evt.target.value;
					if (this.typeIndex == 0) {
						this.bucangChuan = 0
					}
					if (this.typeIndex == 1) {
						this.bucangChuan = 1
					}
					if (this.typeIndex == 2) {
						this.bucangChuan = 2
					}
					console.log(this.typeIndex)
				}
			},
			radioChangeTypeShixian(evt) {
				//选择市价还是限价
				for (let i = 0; i < this.type.length; i++) {
					this.shixianNum = evt.target.value;
					this.shixianChuan = evt.target.value;
					console.log(this.shixianNum)
				}
			},
			//选择平仓方式
			radioChangeTypePingcang(evt) {
				for (let i = 0; i < this.type.length; i++) {
					this.pingcangNum = evt.target.value;
					this.pingcangChuan = evt.target.value;
					console.log(this.pingcangNum)
				}
			},
			//选择任务补仓  立即或等待
			radioChangeTypeLideng(evt) {
				for (let i = 0; i < this.type.length; i++) {
					this.lidengNum = evt.target.value;
					this.lidengChuan = evt.target.value;
					console.log(this.lidengNum)
				}
			},

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.col {
		color: #12C382;
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
		width: 71%;
		height: 76rpx;
		border-radius: 16rpx;
		border: 1px solid #C1C0C9;
		margin-right: 18rpx;
		padding-left: 20rpx;

		.input-placeholder {
			font-size: 28rpx;
			color: #333333;

		}
	}

	.ipt_short {
		width: 67%;
		height: 76rpx;
		border-radius: 16rpx;
		border: 1px solid #C1C0C9;
		margin-right: 18rpx;
		padding-left: 20rpx;

		.input-placeholder {
			font-size: 28rpx;
			color: #333333;
			// padding-left: 20rpx;
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
			background-color: #F5E0FF;

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
