<template>
	<view class="">
		<view class="p30r bg-zs">
			<view class="bg-fff bor-rad30r p20r">
				<view class="flex ">
					<view class="flex1">项目总数</view>
					<view class="flex1 tc">本月新增</view>
					<view class="flex1 tr">持续进行</view>
				</view>
				<view class="flex mt20r">
					<view class="flex1">{{taskdeatil.total_today_profit||2}}</view>
					<view class="flex1 tc">{{taskdeatil.total_profit||0}}</view>
					<view class="flex1 tr">{{taskdeatil.order_cash_amount||2}}</view>
				</view>
			</view>
		</view>
		<view class="pl36r pr36r pb28r  x-end bg-zs color-fff">
			<view class="mr30r" @tap='exchange_house_id=item.id,balance=item.balance,strategy()'
				v-for="(item,index) in exchange" :key="index" :class="{'f40r fw-w':exchange_house_id==item.id}">
				{{item.name}}
			</view>
			<!-- <view class="mr30r" @tap='exchange_house_id=2' :class="{'f40r fw-w':exchange_house_id==2}">binance</view> -->
		</view>
		<view class="exchange_bg ">
			<view class="jui_bg_fff jui_lrtop box jui_flex  ">
				<view class="x-bc flex-wrap f28r fw-500 color-zs">
					<view @tap="timeOutAll()" class="w214r p25r x-f bor-rad20r mb20r"
						style="background-color: rgba(26, 84, 147, .1);">
						<image src="../../static/imgs/task/tz.png" class="w34r h34r mr16r" mode=""></image>
						<view class="">即将众筹</view>
					</view>
					<view @tap='startTaskAll()' class="w214r p25r x-f bor-rad20r mb20r"
						style="background-color: rgba(26, 84, 147, .1);">
						<image src="../../static/imgs/task/kq.png" class="w34r h34r mr16r" mode=""></image>
						<view class="">正在进行</view>
					</view>
					<!-- <view @tap='changeCircleTypeAll(0)' class="w214r p25r x-f bor-rad20r mb20r"
						style="background-color: rgba(26, 84, 147, .1);">
						<image src="../../static/imgs/task/xh.png" class="w34r h34r mr16r" mode=""></image>
						<view class="">策略循环</view>
					</view>
					<view @tap='changeCircleTypeAll(1)' class="w214r p25r x-f bor-rad20r mb20r"
						style="background-color: rgba(26, 84, 147, .1);">
						<image src="../../static/imgs/task/dc.png" class="w34r h34r mr16r" mode=""></image>
						<view class="">单次策略</view>
					</view> -->
					<view @tap="batchLiquidationAll()" class="w214r p25r x-f bor-rad20r mb20r"
						style="background-color: rgba(126, 184, 147, .1);">
						<image src="../../static/imgs/task/qc.png" class="w34r h34r mr16r" mode=""></image>
						<view class="">众筹失败</view>
					</view>
					<view @tap="closeAll()" class="w214r p25r x-f bor-rad20r mb20r"
						style="background-color: rgba(240, 50, 50, .1);color: green;">
						<image src="../../static/imgs/task/dc.png" class="w34r h34r mr16r" mode=""></image>
						<view class="">项目完成</view>
					</view>
				</view>
				<!-- 项目列表 -->
				<view class="jui_flex jui_mar_t20 " style="width: 100%;flex-wrap: wrap;align-items: center;">
					<scroll-view class="scroll-view_H  jui_bg_f5f bor-rad20r" scroll-x="true">
						<!-- <view class="tabBox  jui_mar_t20 jui_mar_l20 scroll-view-item_H"
							v-for="(item,index) in strategyList" :key="index" :class="tabIndex == index ? 'bor_on' :''"
							@tap="chooseTab(item,index)">
							<view class="jui_flex justify-center jui_flex_items_center pl20r pr20r">
								<view class="jui_flex jui_flex_items_center">
									<view class="jui_fs30">
										{{item.p_name}}
									</view>
								</view>
							</view>
						</view> -->
						<view class="jui_mar_2432" v-for="(item,index) in orderlist" :key="index" style="margin-bottom: 40rpx;">
							<view class="jui_flex jui_flex_items_center jui_flex_justify_between" >
								<view class="jui_flex jui_flex_items_center ">
									<view class="red" >
										项目名称项目名称项目名称项目名称项目名称项目名称
									</view>
									
								</view>
								
								<!-- <view class=" " :class="item.order_status == 10 ? 'jui_fc_zhuse' :item.order_status == 20?'jui_fc_zhuse':'jui_fc_666'">
									{{item.order_status == 10 ? '进行中' :item.order_status == 20?'完成':'撤销' }}
								</view> -->
							</view>
							<view class="jui_mar_l20 jui_fs32 col  jui_mar_t12" style="color: #F03232; display: inline-flex ;">
								众筹总额：120000
								<view class="jui_bg_zhuse jui_fc_fff"
									style="position: absolute;  right: 20rpx; font-size: 34rpx;"
									@tap="submit()">
									查看详情
								</view>
							</view>
							<view class="jui_bor_bottom jui_pad_b20">
								<view class="jui_flex jui_flex_justify_start jui_flex_items_center jui_mar_t20">
									<view class="" style="width: 25%;">
										<view class="jui_fc_999 ">
											里程碑数量
										</view>
										<view class="jui_fc_333  jui_mar_t12">
											2
										</view>
									</view>
									<view class="jui_flex_col_center" style="width: 45%;">
										<view class="jui_fc_999 ">
											创建时间
										</view>
										<view class="col  jui_mar_t12">
											{{item.create_time}}
										</view>
									</view>
									<view class="" style="text-align: right;width: 33%;">
										<view class="jui_fc_999 ">
											状态
										</view>
										<view class="col  jui_mar_t12">
											0 / 2
										</view>
									</view>
								</view>
								<view class="jui_flex jui_flex_justify_start jui_flex_items_center jui_mar_t20">
									<view class="" style="width: 95%;">
										<view class="jui_fc_999 ">
											里程碑1
										</view>
										<view class="jui_fc_333  jui_mar_t12" style="word-wrap: break-word;white-space: pre-wrap; ">
											目标：开发完成XXXX设计完成XXX，金额:40000
										</view>
									</view>
									
								</view>
								<view class="jui_flex jui_flex_justify_start jui_flex_items_center jui_mar_t20">
									
									<view class="" style="width: 95%;">
										<view class="jui_fc_999 ">
											里程碑2
										</view>
										<view class="jui_fc_333  jui_mar_t12" style="word-wrap: break-word;white-space: pre-wrap; ">
											目标：西安的玩打我打我的爱我的安慰带娃带娃带娃带娃 大吾哇完成XXXX设计完成XXX，金额:80000
										</view>
									</view>
									
								</view>
								
							</view>
							<view style="height: 50rpx;"></view>
						</view>
						
					</scroll-view>
				</view>
				
				<view class="none" v-if="!orderlist.length">
					暂无数据
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="input" message="成功消息" :duration="2000" :before-close="true" @close="close1"
				@confirm="confirm" mode="input" :title="i18n.yjbc"
				:placeholder="i18n.Placeholder+i18n.buchang+i18n.number"></uni-popup-dialog>
		</uni-popup>
		<!-- <view class="pf x-bc w100 pl36r pt20r pb20r pr36r l-h1 jui_bg_f5f" style="bottom: var(--window-bottom);">
			<label class="w200r h100 x-f " @tap.stop="check_all()">
				<checkbox :checked="allSel" style="transform: scale(.7);"></checkbox>
				<view class="ml20r">全选</view>
			</label>
			<view class="">当前账户USDT余额：{{balance}}</view>
		</view> -->
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
				// exchange_house_id: 1,
             orderlist:[{hash:'123123dasqwaddassadsadw12312das2qewdswadscwadszc', order_type:'投资', exchange_id:3, symbol_name:'RMB', order_status: 20, trade_number: 33, create_time:'2024-12-12', order_price: 323},
				{hash:'123123dasqwaddassadsadw12312das2qewdswadscwadszc', order_type:'充值', exchange_id:2, symbol_name:'RMB', order_status: 20, trade_number: 33, create_time:'2024-12-12', order_price: 323}],
				tabList: [],
				tabIndex: 0,
				emptyData: {
					img: '/static/imgs/home/empty_goods.png',
					tip: '暂无数据~'
				},
				list: [],
				FromToken: '',
				strategy_id: '', //当前策略id
				strategyList: [], //策略列表
				page: 1,
				list_rows: 20,
				hasMore: false,
				taskdeatil: '',
				strategy_name: '',

				allSel: false,
				isList: '',

				exchange: '', //交易所
				exchange_house_id: '', //交易所id
				balance: ''
			}
		},
		computed: {},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/index/exchange/exchange'
			})
		},
		onReachBottom() {
			if (this.hasMore) {
				this.page++;
				this.taskList();
			}
		},
		onPullDownRefresh() {
			this.page = 1;
			if (uni.getStorageSync('task')) {
				this.tabIndex = uni.getStorageSync('task');
			} else {
				this.tabIndex = 0;
			}
			if (uni.getStorageSync('strategy_id')) {
				this.strategy_id = uni.getStorageSync('strategy_id');
				console.log(this.strategy_id)
			}
			if (uni.getStorageSync('strategy_name')) {
				this.strategy_name = uni.getStorageSync('strategy_name');
				// console.log(this.strategy_name)
			}
			this.list = [];
			this.taskList()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad() {
			// this.exchange_house()
		},
		onShow() {
			// if (uni.getStorageSync('task')) {
			// 	this.tabIndex = uni.getStorageSync('task');
			// } else {
			// 	this.tabIndex = 0;
			// }
			// if (uni.getStorageSync('task')) {
			// 	this.tabIndex = uni.getStorageSync('task');
			// } else {
			// 	this.tabIndex = 0;
			// }
			// if (uni.getStorageSync('strategy_id')) {
			// 	this.strategy_id = uni.getStorageSync('strategy_id');
			// 	console.log(this.strategy_id)
			// }
			// if (uni.getStorageSync('strategy_name')) {
			// 	this.strategy_name = uni.getStorageSync('strategy_name');
			// 	// console.log(this.strategy_name)
			// }
			// // this.page = 1;
			// // this.list = [];
			// this.strategy()
		},
		onUnload() {
			uni.removeStorage({
				key: 'task',
			});
			uni.removeStorage({
				key: 'strategy_id',
			});
			uni.removeStorage({
				key: 'strategy_name',
			});
		},
		methods: {
			submit(){
				uni.navigateTo({
					url: '/pages/task/commodity_details/commodity_details?id=1'
				})
				 
			},
			close1(done) {
				done()
			},
			confirm(done, value) {
				let _this = this;
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
						_this.$msg(res.msg)
						setTimeout(() => {
							_this.list = [];
							_this.page = 1;
							_this.taskList()
						}, 1000)
					}
				});
				done()
			},
			changeCl(item) { //单次 循环
				let _this = this;
				let data = {
					circle_type: item.circle_type == 0 ? 1 : 0,
					id: item.id
				}
				this.$api.changeCircleType(data).then(res => {
					_this.$msg(res.msg)
					if (res.code == 1) {
						setTimeout(() => {
							_this.list = [];
							_this.page = 1;
							_this.taskList()
						}, 1000)
					}
				});
			},
			filterL() {
				let num = 0
				this.isList = ''
				this.list.forEach((item, index) => {
					if (item.checked == true) {
						if (num == 0) {
							this.isList += item.id
						} else {
							this.isList += ',' + item.id
						}
						num++
					}
				})
			},
			//  停止补仓接口
			timeOutAll() {
				this.filterL()
				if (!this.isList) {
					return this.$msg('还未选择')
				}
				let data = {
					task_id: this.isList
				}
				this.$api.timeOutAll(data).then(res => {
					this.$msg(res.msg)
					if (res.code == 1) {
						this.page = 1;
						this.list = [];
						setTimeout(() => {
							this.strategy()
						}, 1000)
					}
				});
			},
			//  开启补仓接口
			startTaskAll() {
				this.filterL()
				if (!this.isList) {
					return this.$msg('还未选择')
				}
				let data = {
					task_id: this.isList
				}
				this.$api.startTaskAll(data).then(res => {
					this.$msg(res.msg)
					if (res.code == 1) {
						this.page = 1;
						setTimeout(() => {
							this.strategy()
						}, 1000)
					}
				});
			},
			//  策略循环接口
			changeCircleTypeAll(circle_type) {
				this.filterL()
				if (!this.isList) {
					return this.$msg('还未选择')
				}
				let data = {
					task_id: this.isList,
					circle_type
				}
				this.$api.changeCircleTypeAll(data).then(res => {
					this.$msg(res.msg)
					if (res.code == 1) {
						this.page = 1;
						setTimeout(() => {
							this.strategy()
						}, 1000)
					}
				});
			},
			//  清仓卖出接口
			batchLiquidationAll() {
				this.filterL()
				if (!this.isList) {
					return this.$msg('还未选择')
				}
				let data = {
					task_id: this.isList
				}
				this.$api.batchLiquidationAll(data).then(res => {
					this.$msg(res.msg)
					if (res.code == 1) {
						this.page = 1;
						setTimeout(() => {
							this.strategy()
						}, 1000)
					}
				});
			},
			//  清仓卖出接口
			closeAll() {
				this.filterL()
				if (!this.isList) {
					return this.$msg('还未选择')
				}
				let data = {
					task_id: this.isList
				}
				this.$api.closeAll(data).then(res => {
					this.$msg(res.msg)
					if (res.code == 1) {
						this.page = 1;
						setTimeout(() => {
							this.strategy()
						}, 1000)
					}
				});
			},
			exchange_house() {
				this.$api.exchange_house().then(res => {
					if (res.code == 1) {
						this.exchange = res.data
						this.exchange_house_id = res.data[0].id
						this.balance = res.data[0].balance
						this.strategy()
					}
				});
			},
			//  单选
			checkOne(item) {
				item.checked = !item.checked;
				console.log(item.checked);
				this.allSel = this.list.every((item, index) => {
					return item.checked
				})
			},
			//全选
			check_all() {
				this.allSel = !this.allSel;
				this.list.forEach(item => {
					item.checked = this.allSel;
				});
			},
			urlClick(index) {
				uni.navigateTo({
					url: `/pages/task/electronic/electronic?index=${index}`
				})
			},
			getFromToken() {
				this.$api.getFromToken({
					data: 1
				}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken;
						this.strategy()
					}
				});
			},
			//获取策略列表
			strategy() {
				this.$api.policy().then(res => {
					console.log('获取策略获取策略', res)
					this.strategyList = res.data;
					console.log('1111111111111111', uni.getStorageSync('strategy_id'))
					if (uni.getStorageSync('strategy_id')) {
						this.strategy_id = uni.getStorageSync('strategy_id')
					} else {
						this.strategy_id = this.strategyList[0].id
					}
					if (uni.getStorageSync('strategy_name')) {
						this.strategy_name = uni.getStorageSync('strategy_name');
					} else {
						this.strategy_name = this.strategyList[0].p_name;
					}
					this.taskList()
				});
			},
			taskList() {
				let data = {
					policy_id: this.strategy_id,
					page: this.page,
					list_rows: this.list_rows,
					exchange_house_id: this.exchange_house_id
				}
				this.$api.getTaskList(data).then(res => {
					if (res.code == 1) {
						this.taskdeatil = res.data;
						res.data.task_arr.data.forEach(item => {
							item['checked'] = false
						})
						if (this.page == 1) {
							this.list = res.data.task_arr.data
						} else {
							this.list = [...this.list, ...res.data.task_arr.data]
						}

						if (res.data.task_arr.data.length == 0) {
							this.hasMore = false
						} else {
							this.hasMore = true
						}
					}
				});
			},
			loadMore() {
				// console.log(13456)
				if (this.hasMore) {
					this.page++;
					this.taskList();
				}
			},
			//交易明晰
			order(item) {
				uni.navigateTo({
					url: '/pages/task/taskDetail/order'
				})
			},
			detail(item) {
				uni.navigateTo({
					url: `/pages/task/taskDetail/taskDetail?id=${item.id}&strategy_name=${this.strategy_name}&strategy_id=${this.strategy_id}`
				})
			},
			chooseTab(item, index) {
				// console.log('indexindexindexindex',index)
				// console.log(uni.getStorageSync('task'))
				this.strategy_name = item.p_name;
				this.tabIndex = index;
				this.strategy_id = item.id;
				this.page = 1;
				this.list = [];
				this.taskList();
				uni.setStorage({
					key: 'task',
					data: index,
				})
				uni.setStorage({
					key: 'strategy_id',
					data: item.id,
				})
				uni.setStorage({
					key: 'strategy_name',
					data: item.p_name,
				})
			},
			// 修改策略
			xgcl(item) {
				let data = {
					name: item.symbol,
					item: JSON.stringify(item),
					task_id: item.id,
					strategy_id: this.strategy_id
				}
				uni.setStorageSync(
					'xgcl', data
				)
				// console.log(data)
				uni.navigateTo({
					url: '/pages/task/newTask/changeTask'
				})
			},
			//暂停买入或开启任务或继续买入
			ztmr(item) {
				if (item.status == 30) {
					let _this = this;
					// 开启
					uni.showModal({
						title: '提示',
						content: '是否开启任务？',
						success: function(res) {
							if (res.confirm) {
								let data = {
									task_id: item.id,
								}
								_this.$api.startTask(data).then(res => {
									if (res.code == 1) {
										_this.$msg(res.msg)
										setTimeout(() => {
											_this.list = [];
											_this.page = 1;
											_this.taskList()
										}, 1000)

									}
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else if (item.status == 10) {

					// 暂停买入
					let _this = this;
					uni.showModal({
						title: '提示',
						content: '是否暂停买入？',
						success: function(res) {
							if (res.confirm) {
								let data = {
									id: item.id,
								}
								_this.$api.timeOut(data).then(res => {
									if (res.code == 1) {
										_this.$msg(res.msg)
										setTimeout(() => {
											_this.list = [];
											_this.page = 1;
											_this.taskList()
										}, 1000)
									}
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});

				} else {
					//继续买入
					let _this = this;
					uni.showModal({
						title: '提示',
						content: '是否继续买入？',
						success: function(res) {
							if (res.confirm) {
								let data = {
									id: item.id,
								}
								_this.$api.startBuy(data).then(res => {
									if (res.code == 1) {
										_this.$msg(res.msg)
										setTimeout(() => {
											_this.list = [];
											_this.page = 1;
											_this.taskList()
										}, 1000)

									}
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}

			},
			//删除任务
			scrw(item) {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '是否删除任务？',
					success: function(res) {
						if (res.confirm) {
							let data = {
								task_id: item.id,
							}
							_this.$api.deleteTask(data).then(res => {
								if (res.code == 1) {
									_this.$msg(res.msg)
									setTimeout(() => {
										_this.list = [];
										_this.page = 1;
										_this.taskList()
									}, 1000)

								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			//关闭任务
			close(item) {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '是否关闭任务？',
					success: function(res) {
						if (res.confirm) {
							let data = {
								task_id: item.id,
							}
							_this.$api.closeTask(data).then(res => {
								if (res.code == 1) {
									_this.$msg(res.msg)
									setTimeout(() => {
										_this.list = [];
										_this.page = 1;
										_this.taskList()
									}, 1000)

								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			//一键平仓
			yjpc(item) {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '是否一键平仓？',
					success: function(res) {
						if (res.confirm) {
							let data = {
								id: item.id,
							}
							_this.$api.batchLiquidation(data).then(res => {
								if (res.code == 1) {
									_this.$msg(res.msg)
									setTimeout(() => {
										_this.list = [];
										_this.page = 1;
										_this.taskList()
									}, 1000)

								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			// chooseTab(index) {
			// 	console.log(index)
			// 	this.tabindex = index;
			// 	if (index == 0) {
			// 		this.current = '10'
			// 	} else if (index == 1) {
			// 		this.current = '20'
			// 	} else if (index == 2) {
			// 		this.current = '30'
			// 	}
			// 	this.list = [];
			// 	this.detailTask = '';
			// 	this.page = 1;
			// 	 this.task()
			// }

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
		height: 100%;
	}

	/deep/ .uni-checkbox-input-checked {
		background-color: $zhuse !important;
	}

	/deep/ .uni-checkbox-input {
		border-radius: 50% !important;
	}


	.purple {
		color: $zhuse;
		border: 1px solid $zhuse;
		border-radius: 8rpx;
		height: 56rpx;
		line-height: 56rpx;
		font-size: 24rpx;
		padding: 0 10rpx;
	}

	.red {
		color: $col-light-red;
		border: 1px solid $col-light-red;
		border-radius: 8rpx;
		height: 56rpx;
		line-height: 56rpx;
		font-size: 24rpx;
		padding: 0 10rpx;
	}

	.agreen {
		color: green;
		border: green solid 1px;

		.ac {
			color: green;
			border: green solid 1px;
		}
	}

	.ayellow {
		color: orange;
		border: orange solid 1px;

		.ac {
			color: orange;
			border: orange solid 1px;
		}
	}

	.ared {
		color: red;
		border: red solid 1px;

		.ac {
			color: red;
			border: red solid 1px;
		}
	}

	.pad_tb {
		padding: 30rpx 10rpx 30rpx 10rpx;
	}

	.col {
		color: $col-light-green;
	}

	.btnList {
		view {
			width: 20%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.tabBox {
		// width: 20%;
		padding: 0 20rpx;
		height: 64rpx;
		// border: 1px solid #737476;
		border-radius: 10rpx;
		margin-bottom: 10rpx;

	}


	.topPlace {
		width: 100%;
		height: var(--status-bar-height);
		background: $zhuse
	}

	.top_box {
		background: $zhuse;
		padding: 40rpx 20rpx;
		padding-top: 60rpx;

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
			padding: 20rpx 30rpx 0 30rpx;
			flex-wrap: wrap;
		}

		.text-line {
			width: 32rpx;
			height: 32rpx;
			border: 1px solid $zhuse;
			color: $zhuse;
			font-size: 22rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.text-rad {
			width: 32rpx;
			height: 32rpx;
			border: 1px solid $zhuse;
			color: $zhuse;
			border-radius: 50%;
			font-size: 22rpx;
			display: flex;
			justify-content: center;
			align-items: center;
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
				// box-shadow: 0px 0px 10px 0px rgba(23,116,237, 0.1);
				color: #FFFFFF;
				border-radius: 16rpx;
				background: $zhuse;
				// box-shadow: 0px 0px 10rpx 0px rgba(91, 8, 190, 0.1);
			}

		}
	}

	.bor_on {
		color: $zhuse;
		background-color: #FFFFFF;

		.text-line {
			width: 32rpx;
			height: 32rpx;
			border: 1px solid #FFFFFF;
			color: #FFFFFF;
			font-size: 22rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.text-rad {
			width: 32rpx;
			height: 32rpx;
			border: 1px solid #FFFFFF;
			color: #FFFFFF;
			border-radius: 50%;
			font-size: 22rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}





	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
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
		line-height: 64rpx;
	}
</style>
