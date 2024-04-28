<template>
	<view class="">
		<view class="jui_pad_2432 bgf">
			<view class="jui_flex jui_flex_items_center jui_bor_bottom jui_pad_b20">
				<view class="jui_flex justify-center jui_flex_items_center jui_fc_fff bg-zs w52r h52r"
					style="border-radius: 3px;">$
				</view>
				<view class="jui_mar_l20">
					<text>{{symbol.symbol_name}}</text>
					<text></text>
				</view>
			</view>
			<view class="   jui_mar_t20 jui_pad_t20">
				<view style="white-space: nowrap;">
					{{i18n.slg}}
				</view>
				<view class="task-header" style="overflow-x: scroll;">
					<radio-group class="jui_flex jui_mar_t20 jui_pad_t20 jui_flex_items_center">
						<!-- <view style="margin-right: 30upx;white-space: nowrap;">策略</view> -->
						<view class="flex" style="font-size: 30upx;">
							<label v-for="(item, index) in data" :key="index" @tap="seleteTask(item)"
								style="background-color:#F5F6F8;padding: 10rpx 20rpx;margin-right: 20rpx;border-radius: 3px;color:#B7B6C2;"
								class="jui_flex jui_flex_center " :class="item.id == current?'on':''">
								<radio :value="String(item.id)" style="transform: scale(0);height: 0;width: 0;"
									:checked="item.id == current" />
								<view class="x-f l-h1" style="white-space: nowrap;">
									<text>{{item.p_name}}</text>
									<text v-if="item.p_content.trade_type.default==0" class="bor-rad50 ml20r"
										style="border: solid 1px #000000; padding: 4rpx;"
										:style="item.id == current ? 'border: solid 1px #ffffff;' :''">市</text>
									<text v-if="item.p_content.trade_type.default==1" class="bor-rad50 ml20r"
										style="border: solid 1px #000000; padding: 4rpx;"
										:style="item.id == current ? 'border: solid 1px #ffffff;' :''">限</text>
								</view>
							</label>
						</view>
					</radio-group>
				</view>
			</view>
			<view class=" jui_pad_t20">
				<view v-for="(item, index) in selectData" :key="index" class="selectdata-item" v-show="!item.is_hide">
					<view class="jui_flex align-center jui_flex1" style="padding: 20upx 0;"
						v-if="item.field.indexOf('ustom') < 0">
						<text style="margin-right: 30upx;width: 130upx;white-space: nowrap;">{{item.name}}:</text>
						<view class="jui_flex1" v-if="confirmEnding(item.field, 'type') && item.field == 'cover_type'"
							style="font-size: 30upx;">
							<radio-group class="jui_flex jui_flex_items_center" @change="rChange($event, item)">
								<view class="flex jui_flex_wrap" style="">
									<label class="jui_flex align-center"
										style="background-color:#F5F6F8;padding: 10rpx 20rpx;margin-right: 20rpx;border-radius: 3px;color:#B7B6C2;"
										:class="item.default == j?'on':''" v-for="(i, j) in item.section"
										:key="j + 'type'">
										<radio :disabled="item.custom == 0" :value="String(j)"
											style="transform: scale(0);height: 0;width: 0;"
											:checked="item.default == j" />
										<view style="margin-left: 10upx;white-space: nowrap;">{{i}}</view>
									</label>
								</view>
							</radio-group>
						</view>
						<view class="jui_flex1" v-if="confirmEnding(item.field, 'type') && item.field !== 'cover_type'"
							style="font-size: 30upx;">
							<radio-group class="jui_flex jui_flex_items_center" @change="rChange($event, item)">
								<view class="flex jui_flex_wrap" style="">
									<label class="jui_flex align-center"
										style="background-color:#F5F6F8;padding: 10rpx 20rpx;margin-right: 20rpx;border-radius: 3px;color:#B7B6C2;"
										:class="item.default == j?'on':''" v-for="(i, j) in item.section"
										:key="j + 'type'">
										<radio :disabled="item.custom == 0" :value="String(j)"
											style="transform: scale(0);height: 0;width: 0;"
											:checked="item.default == j" />
										<view style="margin-left: 10upx;white-space: nowrap;">{{i}}</view>
									</label>
								</view>
							</radio-group>
						</view>
						<view v-if="!confirmEnding(item.field, 'type')" class="jui_flex align-center"
							style="justify-content: space-between;flex: 1;">
							<input type="text" class="border-input jui_fs30" style="width: 80%;" v-model="item.default"
								:placeholder="`${item.min}-${item.max}`" v-if="item.field !== 'order_number'"
								@blur="input(item.field)" />
							<input type="text" class="border-input jui_fs30" style="width: 80%;" v-model="item.default"
								:placeholder="`${item.min}-${item.max}`" v-if="item.field == 'order_number'"
								@blur="input(item.field)" />
							<view v-if="item.high_custom" class="jui_fc_zhuse" style="margin-left: 20upx;"
								@tap="open(item)">
								{{i18n.gaoji}}
							</view>
							<view v-else class="">{{typeFormat(item.field)}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="jui_h30"></view>
			<view class="save" @tap="submit" v-if="data.length > 0">
				<view class="btn">
					{{i18n.affirm}}
				</view>
			</view>
			<uni-popup ref="pop" type="bottom">
				<view class="pop-box">
					<view class="text-center jui_fc_zhuse" style="margin-bottom: 20upx;">
						高级设置
					</view>
					<scroll-view scroll-y style="max-height: 800upx;">
						<view class="jui_flex justify-between align-center">
							<text class="text-center" style="width: 140upx;">单数</text>
							<text class="jui_flex1 text-center" style="margin-right: 30upx;">倍</text>
							<text class="jui_flex1 text-center" style="margin-right: 40upx;">比例</text>
							<text class="jui_flex1 text-center">回调</text>
						</view>
						<block v-if="isDataShow=='DataO'">
							<view v-if="i<selectData.order_number.default" class="jui_flex justify-between align-center"
								style="padding: 20upx 0;" v-for="(v, i) in DataO.default" :key="i+'s'">
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
							<view v-if="i<selectData.grid_number.default" class="jui_flex justify-between align-center"
								style="padding: 20upx 0;" v-for="(v, i) in DataG.default" :key="i+'s'">
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
						<text class="jui_fc_zhuse" @tap="$refs.pop.close()">{{i18n.affirm}}</text>
					</view>
				</view>
			</uni-popup>
		</view>
		<view class="tipsTK " v-if="show">
			<view class="tkBox1 jui_pad_2432" style="width: 95%;overflow: scroll;position: absolute;">
				<view class="jui_flex justify-between jui_pad_2432">
					<view class=""></view>
					<view class="">
						{{i18n.ylgk}}
					</view>
					<view class="jui_fc_999" @tap="close()">
						x
					</view>
				</view>
				<view class="" style="height: 600rpx;overflow: scroll;padding-bottom: 80rpx;">
					<view class="jui_flex justify-between jui_fc_999 align-center"
						style="padding: 20upx 0;background-color: #EBEFF7;">
						<text class="jui_flex1 jui_fs28 text-center jui_mar_l12">{{i18n.touru+i18n.number}}</text>
						<view class="jui_flex1 text-center border-input jui_fs28 ">
							{{i18n.touru+i18n.jine}}
						</view>
						<view class="jui_flex1 text-center border-input jui_fs28 ">
							{{i18n.all+i18n.jine}}
						</view>
						<view class="jui_flex1 text-center border-input jui_fs28 jui_mar_r12">
							{{i18n.bili}}(%)
						</view>
						<view class="jui_flex1 text-center border-input jui_fs28 jui_mar_r12">
							{{i18n.ylgk}}(%)
						</view>
					</view>
					<view class="jui_flex justify-between align-center" style="padding: 20upx 0;"
						v-for="(v, i) in popSetData.default" :key="i+'s'">
						<text class=" text-center jui_fc_fff jui_bg_zhuse"
							style="margin-left: 5%;padding: 0 20rpx;">{{i + 1}}</text>
						<view class="jui_flex1 text-center border-input jui_fs30">
							{{v[0]}}
						</view>
						<view class="jui_flex1 text-center border-input jui_fs30">
							{{v[3]||0}}
						</view>
						<view class="jui_flex1 jui_mar_r16 text-center border-input jui_fs30">
							{{v[4]*100|numFilter}}%
						</view>
						<view class="jui_flex1 text-center border-input jui_fs30">
							{{v[1]}}%
						</view>
					</view>
					<view class="jui_bg_zhuse jui_fc_fff"
						style="height: 78rpx;line-height: 78rpx;width: 90%;margin: 0 auto;border-radius: 50rpx;position: absolute;bottom: 10rpx;left: 5%;"
						@tap="submit()">
						{{i18n.affirm}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import vNavigation from '@/components/navigation/navigation.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			vNavigation,
			uniPopup
		},
		data() {
			return {
				naviValue: {
					"l": '/static/imgs/home/back1.png',
					"c": '添加交易',
					"r": '',
					url: ''
				},
				symbol: '',
				data: [],
				selectData: {},
				DataO: {}, //补仓
				DataG: {}, //网格
				isDataShow: '', //高级设置 数据显示 DataO ,DataG
				popSetData: {},
				exchange_house_id: '',
				show: false,
				cover_up_percent: ''
			}
		},
		onLoad(opt) {
			this.exchange_house_id = opt.exchange_house_id
			this.symbol = opt;
			this.strategy()
		},
		methods: {
			submit() {
				let data = {
					policy_id: this.current,
					symbol: this.symbol,
					exchange_house_id: this.exchange_house_id
				}
				this.selectData.order_number_custom.default.length = this.selectData.order_number.default //只传这么多单
				this.selectData.grid_number_custom.default.length = this.selectData.grid_number.default //只传这么多单
				for (let key in this.selectData) {
					data[key] = this.selectData[key].default
				}
				if (this.selectData.grid_number.high_custom == 0) {
					data.grid_number_custom = ''
				}
				if (this.selectData.order_number.high_custom == 0) {
					console.log("order_number_custom")
					data.order_number_custom = ''
				}
				this.$api.create(data).then(res => {
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
			input(field) {
				console.log(field);
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
				if (field == 'grid_number') {
					let data = this.selectData
					if (data.grid_number.default == 0 || data.grid_number.default == '') {
						return
					}
					let list = data.grid_number_custom.default
					list[list.length - 1]
					for (let i = 0; i < data.grid_number.default; i++) {
						if (i > (list.length - 1)) {
							list.push(list[list.length - 1])
						}
					}
				}
				return
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
			default () {
				let data = this.selectData
				/* 补仓 */
				if (data.order_number.default == 0 || data.order_number.default == '') {}
				this.DataO.default = []
				for (let i = 0; i < data.order_number.default; i++) {
					this.DataO.default[i] = []
					this.DataO.default[i][1] = data.cover_up_percent.default
					this.DataO.default[i][2] = data.cover_up_callback.default
					if (data.cover_type.default == 0) { //等额
						this.DataO.default[i][0] = data.first_amount.default
					} else if (data.cover_type.default == 1) { //倍投
						this.DataO.default[i][0] = data.first_amount.default * Math.pow(2, i + 1)
					} else if (data.cover_type.default == 2) { //追加
						this.DataO.default[i][0] = data.first_amount.default * 1 + (i + 1) * data.cover_type_amount
							.default * 1
					}
				}
				data.order_number_custom.default = this.DataO.default
				/* 网格 */
				if (data.grid_number.default == 0 || data.grid_number.default == '') {
					return
				}
				this.DataG.default = []
				for (let i = 0; i < data.grid_number.default; i++) {
					this.DataG.default[i] = []
					this.DataG.default[i][0] = data.grid_amount.default
					this.DataG.default[i][1] = data.grid_percent.default
					this.DataG.default[i][2] = data.grid_callback.default
				}
				data.grid_number_custom.default = this.DataG.default
			},
			close() {
				this.show = false;
			},
			open(item) {
				// console.log(item);
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
			},
			// 根据类型返回数据对应单位
			typeFormat(type) {
				switch (type) {
					case 'first_amount':
						return 'U'
						break;
					case 'grid_add_amount':
						return 'USDT'
						break;
					case 'power_number':
						return this.i18n.dan
						break;
					case 'grid_number':
						return this.i18n.dan
						break;
					case 'grid_amount':
						return 'U'
						break;
					case 'first_multiple':
						return this.i18n.bei
						break;
					case 'order_number':
						return this.i18n.dan
						break;
					case 'cover_type_limit':
						return 'U'
						break;
					case 'cover_type_amount':
						return 'U'
						break;
					default:
						return '%'
						break;
				}
			},
			rChange(e, item) { //倍投 ...
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

			commitData() {
				let _this = this;
				this.popSetData.default.map((item, index) => {
					let num = 0
					_this.popSetData.default.forEach((item, index) => {
						num = num + Number(item[0])
					})
					item[3] = (num)
					item[4] = (item[0] / num)
				})
				// this.opoOpen(this.selectData.order_number, 0)
				this.show = true;
			},
			seleteTask(item) {
				this.current = item.id
				switch (item.p_content.cover_type.default) {
					case '1':
						if (item.p_content.cover_type.is_hide == 0) {
							item.p_content.cover_type_limit.is_hide = 0
							item.p_content.cover_type_amount.is_hide = 1
						}
						break;
					case '2':
						if (item.p_content.cover_type.is_hide == 0) {
							item.p_content.cover_type_limit.is_hide = 1
							item.p_content.cover_type_amount.is_hide = 0
						}
						break;
					default:
						item.p_content.cover_type_limit.is_hide = 1
						item.p_content.cover_type_amount.is_hide = 1
						break;
				}
				this.selectData = item.p_content;
				this.cover_up_percent = this.selectData.cover_up_percent.default
				let data = this.selectData
				if (this.selectData.order_number_custom.default) {
					this.DataO.default = this.selectData.order_number_custom.default
				} else {
					/* 补仓 */
					if (data.order_number.default == 0 || data.order_number.default == '') {}
					this.DataO.default = []
					for (let i = 0; i < data.order_number.default; i++) {
						this.DataO.default[i] = []
						this.DataO.default[i][1] = data.cover_up_percent.default
						this.DataO.default[i][2] = data.cover_up_callback.default
						if (data.cover_type.default == 0) { //等额
							this.DataO.default[i][0] = data.first_amount.default
						} else if (data.cover_type.default == 1) { //倍投
							this.DataO.default[i][0] = data.first_amount.default * Math.pow(2, i + 1)
						} else if (data.cover_type.default == 2) { //追加
							this.DataO.default[i][0] = data.first_amount.default * 1 + (i + 1) * data.cover_type_amount
								.default * 1
						}
					}
					data.order_number_custom.default = this.DataO.default
				}
				if (this.selectData.grid_number_custom.default) {
					this.DataG.default = this.selectData.grid_number_custom.default
				} else {
					/* 网格 */
					if (data.grid_number.default == 0 || data.grid_number.default == '') {
						return
					}
					this.DataG.default = []
					for (let i = 0; i < data.grid_number.default; i++) {
						this.DataG.default[i] = []
						this.DataG.default[i][0] = data.grid_amount.default
						this.DataG.default[i][1] = data.grid_percent.default
						this.DataG.default[i][2] = data.grid_callback.default
					}
					data.grid_number_custom.default = this.DataG.default
				}
			},
			strategy() {
				this.$api.policy().then(res => {
					let arr = [];
					this.data = res.data;
					this.seleteTask(this.data[0])
				});
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
		},
		filters: {
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
		background-color: #FFFFFF;
	}

	.on {
		background-color: $zhuse !important;
		color: #FFFFFF !important;
	}

	.tipsTK {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		text-align: center;
		z-index: 999;
		background-color: rgba(0, 0, 0, .3);

		.tkBox1 {
			.tkTitle {
				font-weight: 700;
				font-size: 19px !important;

				padding: 20px 0 !important;
			}

			border-radius: 5px;
			background-color: #fff;
			position: absolute;
			left: 0;
			right: 0;
			margin: auto;
			top: 0;
			bottom: 0;
			height: max-content;
			overflow: hidden;

			.tkCenter {
				font-size: 14px;
				color: #000;
				margin: 31px 0;
				margin-top: 0;
				padding: 0 15px;

				uni-view {
					display: flex;
					align-items: center;
					padding: 15px 0;

					uni-text {
						color: #000;
						font-size: 15px;
						margin-right: 10px;
					}

					uni-input {
						font-size: 14px;
						color: #000;
						text-align: left;
					}
				}
			}
		}


		.boxbox {
			position: absolute;
			bottom: 0;
			height: 200rpx;
			width: 100%;
		}
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

	.selectdata-item {
		flex: 1;
	}

	.pop-box {
		background-color: #FFFFFF;
		border-radius: 30upx 30upx 0 0;
		padding: 30upx;
	}
</style>
