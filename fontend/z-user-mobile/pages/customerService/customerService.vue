<template>
	<view class="faq-box jui_mar_t20">
		<scroll-view class="scroll-box" scroll-y="true" @scrolltolower="loadMore" style="height: 98vh;">
			<view class="problem-item" v-for="(item, index) in faqList" :key="index" @tap="goDeail(item)">
				<view class="x-bc title-box jui_flex jui_flex_justify_between jui_flex_items_center">
					<view class="x-f jui_flex "  style="width: 100%;">
						<view class="tag-box x-c ">
							<text class="serial ">{{ index + 1 }}</text>
							<!-- <text class="triangle"></text> -->
						</view>
						<!-- {{item.content_label}} -->
						<view class="title jui_ellipsis_2"  v-html="item.content_label" style="width: 90%;"></view>
					</view>
					<!-- <text class="cuIcon-unfold " :class="{ 'cuicon-active': item.checked }"></text> -->
				</view>
				<!-- <view class="detail" v-if="item.checked"> {{decodeURIComponent (item.content_label)}}</view> -->
			</view>
			<shopro-empty v-if="!faqList.length" :emptyData="emptyData"></shopro-empty>
		</scroll-view>
	</view>
</template>

<script>
import Base64 from '../../tool/base64.js';

export default {
	data() {
		return {
			emptyData: {
				img: '/static/imgs/home/empty_goods.png',
				tip: 'No data so far'
			},
			faqList: [],
			loadStatus: '', //loading,over
			page: 1,
			hasMore: false,
		};
	},
	onLoad() {
		
		// let num = base64.encode('123:456')//code MTIzOjQ1Ng==
		// let num1 = base64.decode(num)//encode '123:456'
		// let num2 = num1.split(":")[1] //Intercepts the string after the colon  '456'
		// console.log(num , num1,num2)
	},
	onShow() {
		this.getFaqList();
		// this.getFromToken()
	},
	methods: {
		goDeail(item){
			uni.navigateTo({
				url:`/pages/customerService/serviceDeatil?id=${item.id}`
			})
		},
		getFromToken() {
			this.$api.getFromToken({data:1}).then(res => {
				if (res.code == 1) {
					this.FromToken = res.FromToken;
					this.getFaqList();
				}
			});
		},
		// common probem list
		getFaqList() {
			let that = this;
			var data = {
				FromToken:this.FromToken,
				page: that.page,
				list_rows: 20
			};
			this.$api.article(data).then(res => {
				if(res.code == 1){
					if(that.page == 1){
						let base64 = new Base64();
						that.faqList = res.data.data;
						that.faqList.map((item)=>{
							item.content_label =  base64.decode(item.content_label)
						})
						
					}else {
						let base64 = new Base64();
						res.data.data.map((item)=>{
							item.content_label =  base64.decode(item.content_label)
						})
						that.faqList = [...that.faqList, ...res.data.data];
					}
					if (res.data.data.length != 0) {
							that.loadStatus = '';
							that.hasMore = true;
						} else {
							that.hasMore = false;
							that.loadStatus = 'over';
						}
				}
				// if (res.code == 1) {
				// 	res.data.forEach((faq, index) => {
				// 		faq.indexNum = (index + 1).toString().padStart(2, '0');
				// 	});
				// 	that.faqList = [...that.faqList, ...res.data];
				// 	// console.log(that.faqList)
				// 	if (res.data.length != 0) {
				// 		that.loadStatus = '';
				// 		that.hasMore = true;
				// 	} else {
				// 		that.hasMore = false;
				// 		that.loadStatus = 'over';
				// 	}
				// }
			});
		},
		// load more data
		loadMore() {
			if (this.hasMore) {
				this.page += 1;
				this.getFaqList();
			}
		},
		
	},

};
</script>

<style lang="scss">
page {
	background: #fff;
}
.faq-box {
	// background: $zhuse;
	.problem-item {
		padding:  20rpx;
		border-bottom: 1rpx solid rgba(#dfdfdf, 0.5);
		.title-box {
			height: 98rpx;
		}
		.detail {
			width: 631rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(99, 99, 99, 1.0);
			line-height: 48rpx;
			padding-left: 40rpx;
			padding-bottom: 40rpx;
		}
		.tag-box {
			margin-right: 20rpx;
			// width: 50rpx;
			height: 44rpx;
			padding: 4rpx 20rpx;
			background: $zhuse;
			border-radius: 6rpx;
			position: relative;
			z-index: 6;
			display: flex;
			justify-content: center;
			align-items: center;
			.serial {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #fff;
				line-height: 24rpx;
			}
			.triangle {
				position: absolute;
				z-index: 5;
				width: 10rpx;
				height: 10rpx;
				background: $zhuse;
				transform: rotate(45deg);
				bottom: -4rpx;
			}
		}
		.detail-box {
			flex: 1;
			width: 80%;
			.title {
				width: 80%;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}
		}

		.cuIcon-unfold {
			transition: all ease-in-out 0.2s;
		}
		.cuicon-active {
			transform: rotate(180deg);
			transition: all ease-in-out 0.2s;
		}
	}
}
</style>
