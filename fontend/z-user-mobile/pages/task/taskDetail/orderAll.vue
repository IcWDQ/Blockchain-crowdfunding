<template>
	<view class="">
		<!-- <scroll-view  scroll-y="true" class="scroll-Y" @scrolltolower="loadMore" style="height: 98vh;"> -->
			<view class="position_top jui_flex jui_flex_justify_between top jui_bg_fff">
				<view class="jui_flex_col_center" v-for="(item,index) in tab" :key="index" @tap="chooseTab(index)">
					<view class="">
						{{item.text}}
					</view>
					<view class="jui_mar_t12" :class="tabIndex==index?'on':''">
			
					</view>
				</view>
			</view>
			<view class="jui_h100"></view>
			<view class="jui_h30"></view>
			<view class="jui_mar_2432" v-for="(item,index) in orderlist" :key="index">
				<view class="jui_flex jui_flex_items_center jui_flex_justify_between" >
					<view class="jui_flex jui_flex_items_center ">
						<view :class="!item.order_type?'blue':'red'" >
							{{item.order_type==='投资'?'投':'充'}}
						</view>
						<!-- <view class="jui_mar_l20 jui_fs32">
							<image style="width: 50rpx;height: 50rpx;" v-if="item.exchange_id===1" src="../../../static/imgs/icon_1.jpeg" mode=""></image>
							<image style="width: 50rpx;height: 50rpx;" v-if="item.exchange_id===3" src="../../../static/imgs/icon_3.jpeg" mode=""></image>
							<image style="width: 50rpx;height: 50rpx;" v-if="item.exchange_id===4" src="../../../static/imgs/icon_4.jpeg" mode=""></image>
						</view> -->
						<view class="jui_mar_l20 jui_fs32">
							{{item.order_price}} {{item.symbol_name}}
						</view>
						<!-- <view class="jui_fc_999 jui_fs24">
							/USDT
						</view> -->
					</view>
					<!-- <view class=" " :class="item.order_status == 10 ? 'jui_fc_zhuse' :item.order_status == 20?'jui_fc_zhuse':'jui_fc_666'">
						{{item.order_status == 10 ? '进行中' :item.order_status == 20?'完成':'撤销' }}
					</view> -->
				</view>
				<view class="jui_bor_bottom jui_pad_b20">
					<view class="jui_flex jui_flex_justify_start jui_flex_items_center jui_mar_t20">
						<view class="" style="width: 25%;">
							<view class="jui_fc_999 ">
								block_index
							</view>
							<view class="jui_fc_333  jui_mar_t12">
								NO.{{item.index}}
							</view>
						</view>
						<view class="jui_flex_col_center" style="width: 45%;">
							<view class="jui_fc_999 ">
								create_time
							</view>
							<view class="col  jui_mar_t12">
								{{item.create_time}}
							</view>
						</view>
						<view class="" style="text-align: right;width: 33%;">
							<view class="jui_fc_999 ">
								status
							</view>
							<view class="col  jui_mar_t12">
								over
							</view>
						</view>
					</view>
					<view class="jui_flex jui_flex_justify_start jui_flex_items_center jui_mar_t20">
						<view class="" style="width: 80%;">
							<view class="jui_fc_999 ">
								hash
							</view>
							<view class="jui_fc_333  jui_mar_t12" style="word-wrap: break-word; ">
								{{item.hash}}
							</view>
						</view>
						<!-- <view class="jui_flex_col_center" style="width: 33%;">
							<view class="jui_fc_999 ">
								交易总额
							</view>
							<view class="col  jui_mar_t12">
								{{item.order_amount}}
							</view>
						</view>
						<view class="" style="text-align: right;width: 33%;">
							<view class="jui_fc_999 " >
								成交量
							</view>
							<view class="col  jui_mar_t12">
								{{item.field_amount}}
							</view>
						</view> -->
					</view>
					<view class="jui_flex jui_flex_justify_start jui_flex_items_center jui_mar_t20">
						<view class="" style="width: 80%;">
							<view class="jui_fc_999 ">
								pre_hash
							</view>
							<view class="jui_fc_333  jui_mar_t12" style="word-wrap: break-word; ">
								{{item.previous_hash}}
							</view>
						</view>
						
					</view>
					<view class="jui_flex jui_flex_justify_start jui_flex_items_center jui_mar_t20">
						
						<view class="" style="width: 80%;">
							<view class="jui_fc_999 ">
								content
							</view>
							<view class="jui_fc_333  jui_mar_t12" style="word-wrap: break-word; ">
								{{item.data.content}}
							</view>
						</view>
						
					</view>
					<view class="jui_flex jui_flex_justify_start jui_flex_items_center jui_mar_t20">
						
						<view class="" style="width: 30%;">
							<view class="jui_fc_999 ">
								amount
							</view>
							<view class="jui_fc_333  jui_mar_t12" style="word-wrap: break-word; ">
								{{item.data.money}}
							</view>
						</view>
						
						<view class="" style="width: 20%;">
							<view class="jui_fc_999 ">
								task_id
							</view>
							<view class="jui_fc_333  jui_mar_t12" style="word-wrap: break-word; ">
								{{item.data.task_id}}
							</view>
						</view>
						<view class="" style="width: 50%;">
							<view class="jui_fc_999 ">
								user_mobile
							</view>
							<view class="jui_fc_333  jui_mar_t12" style="word-wrap: break-word; ">
								{{item.data.mobile}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<shopro-empty v-if="!orderlist" :emptyData="emptyData"></shopro-empty>
		<!-- </scroll-view> -->
	</view>
</template>

<script>
	
	export default {
		
		data(){
			return {
				emptyData: {
					img: '/static/imgs/home/empty_goods.png',
					tip: '暂无数据~'
				},
				tab: [{
						text: '全部'
					},
					// {
					// 	text: '充值上链'
					// },
					// {
					// 	text: '投资上链'
					// },
					
				],
				tabIndex:0,
				id:'',
				page:1,
				size:10,
				order_type:0,
				orderlist:[],
				FromToken:''
			}
		},
		onLoad(opt) {
			this.id = opt.id
		},
		onShow() {
			// this.getFromToken()
			this.order()
		},
		methods:{
			getFromToken() {
				this.$api.getFromToken({data:1}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken;
						this.order()
					}
				});
			},
			order(){
				let data = {
					
					user_id:uni.getStorageSync('loginInfo').user_id,
				}
				var that = this
				// this.orderlist=[{hash:'123123dasqwaddassadsadw12312das2qewdswadscwadszc', order_type:'投资', exchange_id:3, symbol_name:'RMB', order_status: 20, trade_number: 33, create_time:'2024-12-12', order_price: 323},
				// {hash:'123123dasqwaddassadsadw12312das2qewdswadscwadszc', order_type:'充值', exchange_id:2, symbol_name:'RMB', order_status: 20, trade_number: 33, create_time:'2024-12-12', order_price: 323}]
				this.$api.getAllBlock(data).then(res => {
					if (res.code == 10000) {
						that.$nextTick(function() {
							that.orderlist = res.data
							});
					
						
					}
				});
			},
			loadMore(){
				if(this.hasMore){
					this.page ++ ;
					this.order();
				}
			},
			chooseTab(index){
				this.tabIndex = index
				this.order_type = index;
				this.orderlist = [];
				this.page = 1;
				this.order()
			},
			
		},
		onReachBottom() {
			this.loadMore()
		}
	}
</script>

<style lang="scss" >
	page {
		background: #FFFFFF !important;
	}
	.red {
		color:$col-red;
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
		color:$col-light-green;
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
	.position_top{
		border-bottom-left-radius: 30rpx;border-bottom-right-radius: 30rpx;padding: 20rpx 80rpx;position: fixed;top: 80rpx;width: 100%;z-index: 1000;box-sizing: border-box;
	}
	/*  #ifndef H5 */
	.top {
		top:0rpx !important;
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
