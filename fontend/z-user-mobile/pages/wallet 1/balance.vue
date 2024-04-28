<template>
	<scroll-view  scroll-y="true" class="scroll-Y" @scrolltolower="loadMore" style="height: 98vh">
	<view class="">
		<view class="top_box">
			<view class="">
				<view class="jui_fs30">
					总余额
				</view>
				<view class="jui_mar_t14">
					{{myAssets.totalCredit}}
				</view>
			</view>
		</view>
		<view class="exchange_bg">
			<view class="jui_bg_fff jui_lrtop box jui_flex jui_flex_justify_between " style="padding-bottom: 180rpx;">
				<view class="top_list jui_flex jui_flex_justify_between ">
					<view class="jui_flex_col_center jui_mar_r20  jui_pad_1216 jui_bor_rad_15" v-for="(item,index) in tablist" :key="index" :class="tabIndex == index ? 'on' : ''" @tap="chooseTab(index)">
						<view class="jui_mar_l20">
							{{item.name}}
						</view>
						<view class="jui_mar_t12" :class="tabIndex==index?'onn':''">
						</view>
					</view>
				</view>
				<view class="jui_h30">
					
				</view>
				<view class="jui_bg_fff " v-if="list.length" style="width: 100%;">
					<view class=" jui_bor_bottom jui_pad_b20 " style="width: 100%;" v-for="(item,index) in list"
						:key="index">
						<view class="jui_flex jui_flex_justify_between jui_flex_items_center" style="text-align: right;">
							<view class="jui_fc_333 jui_fs29 jui_mar_t20">
								{{item.info}}
							</view>
							<view class=" jui_fs29 jui_mar_t20">
				
								{{item.num}}
							</view>
						</view>
						<view class="jui_flex jui_flex_justify_between jui_flex_items_center jui_mar_t16">
							<view class="jui_fs30 jui_ellipsis_1 jui_fc_999" style="width: 55%;">
								{{item.time}}
							</view>
						</view>
					</view>
				</view> 
				<shopro-empty v-if="!list.length" :emptyData="emptyData"></shopro-empty>
				<view class="jui_footer jui_flex jui_flex_items_center jui_pad_t12" >
					<view class="jui_flex_col_center" v-for="(item,index) in bottom" :key="index" style="width: 33%;padding-bottom: 30rpx;" @tap="goDet(item.image)">
						<image :src="item.url" style="height: 64rpx;width: 64rpx;" mode=""></image>
						<view class="jui_mar_t12">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	</scroll-view>
</template>

<script>
	export default {
		data(){
			return{
				emptyData: {
					img: '/static/imgs/home/empty_goods.png',
					tip: '暂无数据~'
				},
				tablist:[
					{
						name:'全部',
					},
					{
						name:'转入',
					},
					{
						name:'转出',
					},
				],
				tabIndex:0,
				bottom:[
					{
						name:'充值',
						url:'/static/imgs/wallet/cz.png',
						image:'/pages/wallet/recharge'
					},
					{
						name:'提币',
						url:'/static/imgs/wallet/tb.png',
						image:'/pages/wallet/withdrawal'
					},
					{
						name:'互转',
						url:'/static/imgs/wallet/hz.png',
						image:'/pages/wallet/huzhuan'
					}
				],
				page:1,
				size:20,
				list:[],
				myAssets:'',
				hasMore:false,
				type:'USDT'
			}
		},
		onLoad() {
			// this.assets()
		},
		onShow() {
			this.list = [];
			this.getFromToken()
		},
		methods:{
			getFromToken() {
				this.$api.getFromToken({
					data: 1
				}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken;
						this.assets();
					
					}
				});
			},
			loadMore(){
				if(this.hasMore){
					this.page ++ ;
					this.assets();
				}
			},
			assets(){
				let data = {
					page: this.page,
					list_rows: this.size,
					type:'USDT'
				}
				if(this.tabIndex == 1){
					data.status = 0
				}
				if(this.tabIndex == 2){
					data.status = 1
				}
				this.$api.credit_log(data).then(res => {
					if (this.page == 1) {
						this.list = res.data.data
					} else {
						this.list = [...this.list, ...res.data.data]
					}
					this.myAssets = res.data;
					// console.log(this.myAssets )
					if (res.data.data.length == 0) {
						this.hasMore = false
					} else {
						this.hasMore = true
					}
					// console.log(this.list)
				});
			},
			goDet(item){
				if(item == '/pages/wallet/huzhuan'){
					uni.navigateTo({
						url:`/pages/wallet/huzhuan?totalCredit=${this.myAssets.totalCredit}`
					})
				}else {
					uni.navigateTo({
						url:item
					})
				}
				
			},
			chooseTab(index) {
				this.page = 1;
				this.list = [];
				this.tabIndex = index;
				if(index == 0){
					this.type = 'USDT'
				}
				if(index == 1){
					this.type = 0
				}
				if(index == 2){
					this.type = 1
				}
				this.assets();
			},
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
			}
		
		},
	}
</script>

<style lang="scss">
	page {background-color: #FFFFFF;}
	.top_box {
		background:$zhuse;
		padding: 40rpx 20rpx;
		padding-left: 50rpx;
		display: flex;
		justify-content:start;
		align-items: center;
		view{
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
		.on {
			font-weight: 600;
			
		}
		.top_list {
			width: 70%;
			margin: 0 auto;
		}
		
	}
	.onn {
		width: 38rpx;
		height: 8rpx;
		background: $zhuse;
		border-radius: 4rpx;
	}
</style>
