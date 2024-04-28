<template>
	<view class="">
		<view class="exchange_bg">
			<view class="jui_bg_fff jui_lrtop box   ">
				<view class="">
					<text class="jui_fc_333 jui_fs32 ">{{symbol}}</text>
				</view>
				<view class=" jui_pad_t20">
					<view v-for="(item, index) in selectData" :key="index" class="selectdata-item"
						v-show="!item.is_hide">
						<view class="jui_flex align-center flex-wrap jui_flex1" style="padding: 20upx 0;"
							v-if="item.field.indexOf('ustom') < 0">
							<text style="margin-right: 30upx;">{{item.name}}:</text>
							<view class="jui_flex1"
								v-if="confirmEnding(item.field, 'type') && item.field == 'cover_type'"
								style="font-size: 30upx;">
								<radio-group class="jui_flex jui_flex_items_center" @change="rChange($event, item)">
									<view class="flex jui_flex_wrap" style="">
										<label class="jui_flex align-center" style="margin-right: 10upx;width: 44%;"
											v-for="(i, j) in item.section" :key="j + 'type'">
											<radio :disabled="item.custom == 0" :value="String(j)"
												style="transform: scale(.6);" :checked="item.default == j" />
											<view style="margin-left: 10upx;white-space: nowrap;">{{i}}</view>
										</label>
									</view>
								</radio-group>
							</view>
							<view v-if="confirmEnding(item.field, 'type') && item.field !== 'cover_type'"
								style="font-size: 30upx;">
								<radio-group class="jui_flex jui_flex_items_center" @change="rChange($event, item)">
									<view class="flex" style="overflow-x: scroll;">
										<label class="jui_flex align-center" style="margin-right: 10upx;"
											v-for="(i, j) in item.section" :key="j + 'type'">
											<radio :disabled="item.custom == 0" :value="String(j)"
												style="transform: scale(.6);" :checked="item.default == j" />

											<view style="margin-left: 10upx;white-space: nowrap;">{{i}}</view>
										</label>
									</view>
								</radio-group>
							</view>
							<view v-if="!confirmEnding(item.field, 'type')&& item.field !== 'first_amount'"
								class="jui_flex align-center" style="justify-content: space-between;flex: 1;">
								<input type="text" class="border-input jui_fs30" style="width: 80%;"
									v-model="item.default" :placeholder="`${item.min}-${item.max}`"
									@blur="input(item.field)" />
								<view v-if="item.high_custom" class="jui_fc_zhuse" style="margin-left: 20upx;"
									@tap="open(item,1)">高级</view>
								<view v-else class="">{{typeFormat(item.field)}}</view>
							</view>
							<view v-if="!confirmEnding(item.field, 'type')&& item.field == 'first_amount'"
								class="jui_flex align-center" style="justify-content: space-between;flex: 1;">
								<input type="text" class="border-input jui_fs30" style="width: 80%;"
									v-model="item.default" :placeholder="`${item.min}-${item.max}`"
									@blur="input(item.field)" />
								<view v-if="item.high_custom" class="jui_fc_zhuse" style="margin-left: 20upx;"
									@tap="open(item)">高级</view>
								<view v-else class="">{{typeFormat(item.field)}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="jui_h30"></view>
		<view class="save" @tap="commitData">
			<view class="btn">
				确认
			</view>
		</view>
		<uni-popup ref="pop" type="bottom">
			<view class="pop-box">
				<view class="text-center jui_fc_zhuse" style="margin-bottom: 20upx;">
					高级设置
				</view>
				<scroll-view scroll-y style="max-height: 800upx;">
					<view class="jui_flex justify-between align-center">
						<text class="jui_flex1 text-center">单数</text>
						<text class="jui_flex1 text-center">倍</text>
						<text class="jui_flex1 text-center">比例</text>
						<text class="jui_flex1 text-center">回调</text>
					</view>
					<block v-if="isDataShow=='DataO'">
						<view v-if="i<selectData.order_number.default" class="jui_flex justify-between align-center" style="padding: 20upx 0;"
							v-for="(v, i) in DataO.default" :key="i+'s'">
							<text class="jui_flex1 text-center">第{{i + 1}}单</text>
							<input class="jui_flex1 text-center h60r bor-rad10r mr20r"
								style="border:#d1d1d1 solid 2rpx;" type="number" v-model="v[0]">
							<input class="jui_flex1 text-center h60r bor-rad10r mr20r"
								style="border:#d1d1d1 solid 2rpx;" type="number" v-model="v[1]">
							<input class="jui_flex1 text-center h60r bor-rad10r mr20r"
								style="border:#d1d1d1 solid 2rpx;" type="number" v-model="v[2]">
						</view>
					</block>
					<block v-if="isDataShow=='DataG'">
						<view class="jui_flex justify-between align-center" style="padding: 20upx 0;"
							v-for="(v, i) in DataG.default" :key="i+'s'">
							<text class="jui_flex1 text-center">第{{i + 1}}单</text>
							<input class="jui_flex1 text-center h60r bor-rad10r mr20r"
								style="border:#d1d1d1 solid 2rpx;" type="number" v-model="v[0]">
							<input class="jui_flex1 text-center h60r bor-rad10r mr20r"
								style="border:#d1d1d1 solid 2rpx;" type="number" v-model="v[1]">
							<input class="jui_flex1 text-center h60r bor-rad10r mr20r"
								style="border:#d1d1d1 solid 2rpx;" type="number" v-model="v[2]">
						</view>
					</block>
				</scroll-view>
				<view class="jui_flex align-center justify-center" style="margin-top: 30upx;">
					<text class="jui_fc_zhuse" @tap="$refs.pop.close()">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import vNavigation from '@/components/navigation/navigation.vue'
	export default {
		components: {
			vNavigation
		},
		data() {
			return {
				naviValue: {
					"l": '/static/imgs/home/back.png',
					"c": '新建任务',
					"r": '',
					url: ''
				},
				current: 1, //当前策略id
				data: '',
				selectData: {}, //全部参数
				DataO: {}, //补仓
				DataG: {}, //网格
				isDataShow: '', //高级设置 数据显示 DataO ,DataG
				task_id: '', //提交用
				policy_id: '' //提交用
			}
		},
		//custom是控制用户能不能选   0 不能选 不能修改   1能修改   default是后台设置的默认值，要选中对应的radio或者在text的value里面显示     大小值是在placeholder里面的
		onLoad(opt) {
			this.symbol = opt.name;
			this.type = [];
			this.shixian = [];
			this.pingcang = [];
			this.lideng = [];
			this.getFromToken()
			let saveData = uni.getStorageSync('xgcl')
			this.task_id = saveData.task_id
			this.policy_id = saveData.strategy_id
		},

		methods: {
			input(field) {
				// console.log(field);
				if (field == 'order_number') {
					let data = this.selectData
					if (data.order_number.default == 0 || data.order_number.default == '') {
						return
					}
					let list = data.order_number_custom.default
					list[list.length - 1]
					for (let i = 0; i < data.order_number.default; i++) {
						if (i > (list.length - 1)) {
							list.push(list[list.length - 1])
						}
					}
				}
				// let data = this.selectData
				// /* 补仓 */
				// if (data.order_number.default == 0 || data.order_number.default == '') {
				// 	return
				// }
				// this.DataO.default = []
				// for (let i = 0; i < data.order_number.default; i++) {
				// 	this.DataO.default[i] = []
				// 	if (data.order_number_custom.default[i]) {
				// 		this.DataO.default[i][0] = data.order_number_custom.default[i][0]
				// 		this.DataO.default[i][1] = data.order_number_custom.default[i][1]
				// 		this.DataO.default[i][2] = data.order_number_custom.default[i][2]
				// 	} else {
				// 		if (data.cover_type.default == 0) { //等额
				// 			this.DataO.default[i][0] = data.first_amount.default
				// 		} else if (data.cover_type.default == 1) { //倍投
				// 			this.DataO.default[i][0] = data.first_amount.default * Math.pow(2, i + 1)
				// 		} else if (data.cover_type.default == 2) { //追加
				// 			this.DataO.default[i][0] = data.first_amount.default * 1 + (i + 1) * data.cover_type_amount
				// 				.default * 1
				// 		}
				// 		this.DataO.default[i][1] = data.cover_up_percent.default
				// 		this.DataO.default[i][2] = data.cover_up_callback.default
				// 	}
				// 	if (field == 'cover_up_percent') { //补仓比例
				// 		this.DataO.default[i][1] = data.cover_up_percent.default
				// 	}
				// 	if (field == 'cover_up_callback') { //补仓回调
				// 		this.DataO.default[i][2] = data.cover_up_callback.default
				// 	}
				// 	if (field == 'first_amount') { //首场单数
				// 		if (data.cover_type.default == 0) { //等额
				// 			this.DataO.default[i][0] = data.first_amount.default
				// 		} else if (data.cover_type.default == 1) { //倍投
				// 			this.DataO.default[i][0] = data.first_amount.default * Math.pow(2, i + 1)
				// 		} else if (data.cover_type.default == 2) { //追加
				// 			this.DataO.default[i][0] = data.first_amount.default * 1 + (i + 1) * data.cover_type_amount
				// 				.default * 1
				// 		}
				// 	}
				// }
				// data.order_number_custom.default = this.DataO.default

				// /* 网格 */
				// if (data.grid_number.default == 0 || data.grid_number.default == '') {
				// 	return
				// }
				// this.DataG.default = []
				// for (let i = 0; i < data.grid_number.default; i++) {
				// 	this.DataG.default[i] = []
				// 	if (data.grid_number_custom.default[i]) {
				// 		this.DataG.default[i][0] = data.grid_number_custom.default[i][0]
				// 		this.DataG.default[i][1] = data.grid_number_custom.default[i][1]
				// 		this.DataG.default[i][2] = data.grid_number_custom.default[i][2]
				// 	} else {
				// 		this.DataG.default[i][0] = data.grid_amount.default
				// 		this.DataG.default[i][1] = data.grid_percent.default
				// 		this.DataG.default[i][2] = data.grid_callback.default
				// 	}
				// 	if (field == 'grid_amount') { //网格仓位
				// 		this.DataG.default[i][0] = data.grid_amount.default
				// 	}
				// 	if (field == 'grid_percent') { //网格密度
				// 		this.DataG.default[i][1] = data.grid_percent.default
				// 	}
				// 	if (field == 'grid_callback') { //密度回调
				// 		this.DataG.default[i][2] = data.grid_callback.default
				// 	}
				// }
				// data.grid_number_custom.default = this.DataG.default
			},
			// 根据类型返回数据对应单位
			typeFormat(type) {
				switch (type) {
					case 'first_amount':
						return 'U'
						break;
					case 'is_rebuy':
						return '%'
						break;
					case 'cover_up_percent':
						return '%'
						break;
					case 'cover_up_callback':
						return '%'
						break;
					case 'cover_up_extra':
						return '%'
						break;
					case 'cover_up_reset':
						return '%'
						break;
					case 'stop_profit_percent':
						return '%'
						break;
					case 'stop_profit_callback':
						return '%'
						break;
					case 'grid_density':
						return '%'
						break;
					case 'grid_stop_profit':
						return '%'
						break;
					case 'grid_add_amount':
						return 'USDT'
						break;
					case 'power_number':
						return '单'
						break;
					case 'grid_number':
						return '单'
						break;
					case 'grid_amount':
						return 'U'
						break;
					case 'first_multiple':
						return '倍'
						break;
					case 'order_number':
						return '单'
						break;
					default:
						return '%'
						break;
				}
			},
			rChange(e, item) {
				console.log(e, item)
				this.$set(this.selectData[item.field], 'default', e.detail.value)
				if (item.field == 'cover_type') {
					switch (e.detail.value) {
						case '1':
							if (item.is_hide == 0) {
								this.$set(this.selectData.cover_type_limit, 'is_hide', 0)
								this.$set(this.selectData.cover_type_amount, 'is_hide', 1)
							}
							break;
						case '2':
							if (item.is_hide == 0) {
								this.$set(this.selectData.cover_type_limit, 'is_hide', 1)
								this.$set(this.selectData.cover_type_amount, 'is_hide', 0)
							}
							break;
						default:
							this.$set(this.selectData.cover_type_limit, 'is_hide', 1)
							this.$set(this.selectData.cover_type_amount, 'is_hide', 1)
							break;
					}
				}
				this.input('first_amount')
			},
			confirmEnding(str, target) {
				// 请把你的代码写在这里
				var start = str.length - target.length;
				var arr = str.substr(start, target.length);
				if (arr == target) {
					return true;
				}
				return false;
			},
			open(item) {
				console.log(item);
				if (item.field == 'order_number') {
					console.log('补仓');
					this.isDataShow = 'DataO'
				} else if (item.field == 'grid_number') {
					console.log('网格');
					this.isDataShow = 'DataG'
				}
				this.selectData = {
					...this.selectData
				}
				this.$refs.pop.open()
				return
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
			//创建任务
			commitData() {
				let data = {
					policy_id: this.current,
					symbol: this.symbol,
					id: this.task_id,
				}
				this.selectData.order_number_custom.default.length = this.selectData.order_number.default //只传这么多单
				for (let key in this.selectData) {
					data[key] = this.selectData[key].default
				}
				console.log(data)
				// return
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
				let params = {
					id: this.task_id,
					policy_id: this.policy_id
				}
				this.$api.getPolicy(params).then(res => {
					let arr = [];
					this.data = res.data;
					switch (res.data.cover_type.default) {
						case 1:
							if (res.data.cover_type.is_hide == 0) {
								res.data.cover_type_limit.is_hide = 0
								res.data.cover_type_amount.is_hide = 1
							}
							break;
						case 2:
							if (res.data.cover_type.is_hide == 0) {
								res.data.cover_type_limit.is_hide = 1
								res.data.cover_type_amount.is_hide = 0
							}
							break;
						default:
							res.data.cover_type_limit.is_hide = 1
							res.data.cover_type_amount.is_hide = 1
							break;
					}
					this.selectData = this.data;
					this.current = this.data.id;
					if (this.selectData.order_number_custom.default) {
						this.DataO.default = this.selectData.order_number_custom.default
					}
					if (this.selectData.grid_number_custom.default) {
						this.DataG.default = this.selectData.grid_number_custom.default
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
				// console.log(evt, evt.target.value)
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
					// console.log(this.typeIndex)
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
			//选择策略
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

		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;

		.btn {
			box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.4);
			width: 90%;
			height: 80upx;
			border-radius: 80upx;
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

	.selectdata-item {
		flex: 1;
	}

	.pop-box {
		background-color: #FFFFFF;
		border-radius: 30upx 30upx 0 0;
		padding: 30upx;
	}

	.border-input {
		height: 60upx;
		line-height: 60upx;
		border: 2upx rgba(0, 0, 0, .2) solid;
		padding: 0 20upx;
		font-size: 14upx;
		border-radius: 10upx;
	}
</style>
