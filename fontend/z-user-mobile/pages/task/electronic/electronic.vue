<template>
	<scroll-view  scroll-y="true" class="scroll-Y" @scrolltolower="loadMore" style="height: 98vh">
	<view class="">
		<!-- <v-navigation :value="naviValue"></v-navigation> -->
		<!-- 盈利额 -->
		<view class="top_box">
			<view class="" >
				<view class="jui_fs30" >
					我投资的项目：
				</view>
				<view class="jui_mar_t14" style="">
					0 个
				</view>
			</view>
			<view class="">
				<view class="jui_fs30">
					我创建的项目：
				</view>
				<view class="jui_mar_t14">
					2 个
				</view>
			</view>
		</view>
		<!-- 盈利额end -->
		<view class="exchange_bg">
			<view class="jui_bg_fff jui_lrtop box jui_flex jui_flex_justify_between ">
				<view class="jui_flex">
						<view class="jui_flex_col_center jui_mar_r16" v-for="(item,index) in tab" :key="index" @tap="chooseTab(item,index)">
							<view class="">
								{{item.text}}
							</view>
							<view class="jui_mar_t12" :class="tabIndex==index?'on':''">	
							</view>
						</view>
				</view> 
				<view class="jui_h30"></view>
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
									项目名称：<view class="red"  style="color: red;">
										
										基于区块链的里程碑式众筹平台
									</view>
									
								</view>
								
								<!-- <view class=" " :class="item.order_status == 10 ? 'jui_fc_zhuse' :item.order_status == 20?'jui_fc_zhuse':'jui_fc_666'">
									{{item.order_status == 10 ? '进行中' :item.order_status == 20?'完成':'撤销' }}
								</view> -->
							</view>
							众筹总额：<view class="jui_mar_l20 jui_fs32 col  jui_mar_t12" style="display: inline-flex ; color: red;">
								120000
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
									<view class="" style="width: 80%;">
										<view class="jui_fc_999 ">
											里程碑1
										</view>
										<view class="jui_fc_333  jui_mar_t12" style="word-wrap: break-word; ">
											目标：开发完成XXXX设计完成XXX，金额:40000
										</view>
									</view>
									
								</view>
								<view class="jui_flex jui_flex_justify_start jui_flex_items_center jui_mar_t20">
									
									<view class="" style="width: 80%;">
										<view class="jui_fc_999 ">
											里程碑2
										</view>
										<view class="jui_fc_333  jui_mar_t12" style="word-wrap: break-word; ">
											目标：西安的玩打我打我的爱我的安慰带娃带娃带娃带娃 大吾哇完成XXXX设计完成XXX，金额:80000
										</view>
									</view>
									
								</view>
								
							</view>
							<view class="jui_bg_zhuse jui_fc_fff"
								style="position: absolute;  right: 20rpx; font-size: 34rpx; "
								@tap="tijiao()">
								提交材料
							</view>
							<view style="height: 50rpx;"></view>
						</view>
						
					</scroll-view>
				</view>
				
				<view class="none" v-if="!orderlist.length" >
					暂无数据
				</view>
			</view>
		</view>
	</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				tab:[
					{text:'我创建的'},
					{text:'我投资的'}
				],
				tabIndex:0,
				type:0,
				page:1,
				total:'',
				list:[],
				orderlist:[{hash:'123123dasqwaddassadsadw12312das2qewdswadscwadszc', order_type:'投资', exchange_id:3, symbol_name:'RMB', order_status: 20, trade_number: 33, create_time:'2024-12-12', order_price: 323},
								{hash:'123123dasqwaddassadsadw12312das2qewdswadscwadszc', order_type:'充值', exchange_id:2, symbol_name:'RMB', order_status: 20, trade_number: 33, create_time:'2024-12-12', order_price: 323}],
								
			}
		},
		onLoad(options) {
			console.log('11111111111111111',options)
			if(options.index){
				this.tabIndex=options.index
			}
			
			// this.electlist()
		},
		methods: {
			submit(){
				uni.navigateTo({
					url: '/pages/task/commodity_details/commodity_details?id=1'
				})
				 
			},
			loadMore(){
				if(this.hasMore){
					this.page ++ ;
					this.electlist();
				}
			},
			electlist(){
				let data = {
					page:this.page,
					data_list:20,
					// type:this.type
				}
				this.$api.getBill(data).then(res => {
						this.total = res.data;
						if(this.tabIndex == 0){
							this.list = [...this.list, ...res.data.today_data_list.data];
							if (res.data.today_data_list.data.length == 0) {
								this.hasMore = false
							} else {
								this.hasMore = true
							}
						}else {
							this.list = [...this.list, ...res.data.total_data_list.data]
							if (res.data.total_data_list.data.length == 0) {
								this.hasMore = false
							} else {
								this.hasMore = true
							}
						}
						
						
				});
			},
			chooseTab(item, index) {
				this.page = 1;
				this.list = [];
				this.tabIndex = index;
				this.type = index;
				// this.electlist();
				
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
	.top_box {
		background: $zhuse;
		padding: 60rpx 20rpx;
		// padding-top: 60rpx;

		display: flex;
		justify-content: space-around;
		align-items: center;

		view {
			color: #FFFFFF;
			font-size: 48rpx;
		}

	}
	.exchange_bg {
		background:$zhuse;
	
		// padding-top: 90rpx;
		.box {
			padding: 50rpx 30rpx 0 30rpx;
			flex-wrap: wrap;
		}
	}
	.on {
		width: 48rpx;
		height: 12rpx;
		background-color: $zhuse;
		border-radius: 6rpx;
		
	}
</style>
