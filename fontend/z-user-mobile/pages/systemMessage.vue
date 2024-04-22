<template>
	<view class="content">
		<view class="scrollBox">
			<view class="you-scroll" style="min-height: 65%;">
				<view :class="type?'pullDown1':'pullDown'" style="transform: translateY(0px); transition: all 0.3s ease 0s;" :style="">
					<uni-image class="down-icon">
						<image src="/static/img/home/pullDown.jpg" mode="" class="down-icon"></image>
					</uni-image><span>{{pulling}}</span>
				</view>
				<view class="you-scroll-inner" style="transform: translateY(0px); transition: transform 0.3s ease 0s;">
					<scroll-view scroll-y="true" class="scroll-Y" refresher-enabled="true" :refresher-triggered="triggered" @refresherpulling="onPulling" @refresherrefresh="onRefresh"
						@refresherrestore="onRestore" @refresherabort="onAbort" refresher-default-style="none" scroll-with-animation="true" :refresher-threshold="80" refresher-background="#f0f0f0" >
						<view class="you-scroll-content">
							<view class="list" v-for="(item,index) in journalList" :key="index">
								<view class="">
									<view class="time">
										{{item.riqi}}
									</view>
									<view class="detail">
										<view class="item" v-for="(row,i) in item.data.data" :key="i">
											<view class="point">
												<view class="line">

												</view>
												<view class="BUY" v-if="!row.order_type">

												</view>
												<view class="SELL" v-if="row.order_type">

												</view>
												<view class="line">

												</view>
											</view>
											<view class="text">
												<text>{{row.content}}</text>
												<text>{{row.c_time}}</text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<shopro-empty v-if="!journalList.length" :emptyData="emptyData"></shopro-empty>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				emptyData: {
					img: '/static/img/home/empty_goods.png',
					tip: 'No data'
				},
				triggered: false,
				pulling:'Pull down to refresh',
				type:false,
				journalList:[],
				page: 1,
				size: 20,
			}
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh')
			setTimeout(function() {
				uni.stopPullDownRefresh()
				console.log('stopPullDownRefresh')
			}, 1000)
		},
		onLoad() {
			this._freshing = false;
			this.triggered = true;
		},
		onShow() {
			this.journal()
		},
		methods:{
			journal(){
				let data = {
					page: this.page,
					list_rows: this.size
				}
				this.$api.tradeSellLog(data).then(res => {
					if (res.code == 1) {
						this.journalList = res.data;

					}
				});
			},
			// loadMore() {
			// 	if (this.hasMore) {
			// 		this.page++;
			// 		this.log();
			// 	}
			// },
			onPulling(e) {
				this.type = true;
				this.pulling = 'Release to refresh'
				// console.log("onpulling", e);
			},
			onRefresh() {
				this.pulling = 'Loading...'
				this.journal()
				if (this._freshing) return;
				this._freshing = true;
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1000)
			},
			onRestore() {
				this.type = false;
				this.triggered = 'restore'; // Need to reset

			},
			onAbort() {
				this.type = false;
			}
		},

	}
</script>

<style lang="scss">
	.content{
	    overflow: scroll;
	    height: 100%;
	    background-color: #f0f0f0;
	}
	.scrollBox{
	    // height: calc(100vh - 100px);
	    overflow: scroll;
	}
	.you-scroll {
		width: 100%;
		height: 100%;
		// overflow: hidden;
		position: relative;
		// /deep/ .uni-scroll-view-refresher {
		// 	height: 50px !important;
		// }
		.pullDown {
			z-index: 9999999;
			width: 100%;
			height: 40px;
			line-height: 50px;
			text-align: center;
			font-size: 14px;
			overflow: hidden;
			-webkit-transform: translateY(-100%);
			transform: translateY(-100%);
			position: absolute;
			top: -40px;
			left: 0;

			.down-icon{
			    width: 40px;
			    height: 40px;
			    display: inline-block;
			    vertical-align: middle;
			}
			span {
			    white-space: nowrap;
			    overflow: hidden;
			    display: inline-block;
			    vertical-align: middle;
			    color: #000;
			}
		}
		.pullDown1 {
			z-index: 9999999;
			width: 100%;
			height: 80px;
			line-height: 50px;
			text-align: center;
			font-size: 14px;
			overflow: hidden;
			-webkit-transform: translateY(-100%);
			transform: translateY(-100%);
			position: absolute;
			top: 0px;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.down-icon{
			    width: 40px;
			    height: 32px;
			    display: inline-block;
			    vertical-align:inherit;
			}
			span {
			    white-space: nowrap;
			    overflow: hidden;
			    display: inline-block;
			    vertical-align: middle;
			    color: #000;
			}
		}
		.you-scroll-inner {
			width: 100%;
			height: 100%;
			// overflow: hidden;
			position: relative;
		}

		.you-scroll-content {
			overflow: hidden;
			.list .item:first-child > .point .line:first-child {
			    width: 0 !important;
			}
			.list .item:last-child > .point .line:last-child {
			    width: 0 !important;
			}
			.list{
				margin: 30rpx 42rpx;

				.detail{
				    background-color: #fff;
				    padding: 30rpx;
					.item {
					    border-radius: 5px;
						 display: flex;
						 .text {
						     display: flex;
						     flex: 1;
						     flex-wrap: wrap;
						     flex-direction: column;
						 }
						 .text uni-text:nth-child(1) {
						     word-break: break-all;
						     font-size: 13px;
						     padding-top: 7px;
						 }
						 .text uni-text:last-child {
						     padding-bottom: 14rpx;
						     margin-top: 8rpx;
						     font-size: 13px;
						     color: #8d9299;
						 }
						 .point{
						     width: 52rpx;
						     position: relative;
						     margin-right: 30rpx;
							 .line:first-child {
							     position: absolute;
							     height: 50%;
							     background-color: #e3e8ee;
							     width: 1px;
							     top: 0;
							     left: 50%;
							     -webkit-transform: translate(50%);
							     transform: translate(50%);
							 }
							  .dian{
							     position: absolute;
							     top: 50%;
							     left: 50%;
							     -webkit-transform: translate(-50%,-50%);
							     transform: translate(-50%,-50%);
							     width: 26px;
							     height: 26px;
							     background-color: $zhuse;
							     -webkit-border-radius: 50%;
							     border-radius: 50%;
							     z-index: 20;
							 }
							 .SELL{
							     position: absolute;
							     top: 50%;
							     left: 50%;
							     -webkit-transform: translate(-50%,-50%);
							     transform: translate(-50%,-50%);
							     width: 26px;
							     height: 26px;
							     background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAE1klEQVRoQ+2aXWgcVRTH/+dOYgUFUWypxQfBWKXG/Yh9KhZS++LurMEHGwQ12OwkobWl4ENRKTRBpEoffLGlSWajoCI0iGh3tkSFBkUC0rS7aapIoS9qK+ZFVEpIOnPkNi5M427m4941dUmeAnvO//x/98z92DtLaPI/anI+rAH+3zu81kHVDs6Ye+52efGAINrE8DYR018QXGHwdKo49oWqflC+lg5eyuxfNy/m+5nwpMe8CNDPAt4Ug+4F4QAYD9cyQuD3XdcdIqOlQwD7ZYwHzAnweMIpjAeZD/O5MmA527dZEA8z0BmmYOgYxmCyZA+Fjq8TqA5oWsME9KsaqZmvAVIJcHbX3jvdawt/NgTuH9GkYyt5VEqe7cq3uS5dalrA8zmrUzDONC2gBKuY1o8ANjcCkoCphGNvU9FWekRl4fNZa1AQDquYqJdL4G7V7UIZ8FyuN2mw+BLAep2QDIynHLtbVVMZUBoom/leAhVUzfjzXfK2dRTHplQ1tQAuzcX8MYD2qhqS+QQMJBx7RJOWDpkljbJpnSRgl4qiBxxKO/abKhr+XG0dLGfzbxDRIQ3GrniM0XWuGN4yMXJVVU8Z8Fxm93rDMCbASKuaWTbyP1xnr6ejNHZWRVcJsGL2PQfwxyoGVspl4Lpg3pkoFb6OWyM2YNnsKxLYjFs4Sp4HzqWdghMlpxobC7CStT4H4ek4BePmeIyhdMkejJofGXDG7CswuDdqIR3xzDiWKtn7omhFAmzksSysaQa9k3JGXwkbHxpwJmftZsZYWOFGxkV5XEMBXsj0P+gJTx6bVM6bFwE6vgTO8sTzaNxBIGCe2Nj+WGk4cAsJBajhGHbR8Izu9tPD30uo2czAFle4J1UgQfRJsjj6bNAgBQJq+FJ7E1zVkA5IIvQmivZ7K0EGAlbM/GcAdQWNVJ3Pa8LpgiRgMuHYO2IDlk3rBQI+aAScLkiPsCNdtCfreVyxgzOm9S0Dca4M/tU5+Uj652D1f/U5yceTTuHlyIDyyp2xOAfAiNrB5cu4hFs03A3VkZbzutU1fvNDKuyxc4tCPLD11Mi1Wj7rdrCSy+8E01dR4W5sAoS3UkX7NX93PMI+P6BgvOtfWcs56wgxXo1Tj4CtCceejgQ4k8sfZKa3YxacZOaPQOK26p7nnyu+lXlpb2RvgYiej3v9z8CLKcf+MBJgJWedAiMXB7BWTh1ALfIe85F0qfB6NEDT+h3AXVocyLdGvtVOw956sy3i08liIRsasBHvHBoKCP416RTuCw1YyVj3Q+AnXd2TOo0FBOq9pKm5ilbMfDtAF5oWsJzrfYJYfNO0gNNd+bYWza/FbqlH9Ezn4ZZ77vhFngxadXXRv/mrbOq1/DD4j5RTqLni1z/JmJacg+26AOXJ/8bmL6/mFTb1On4mko79VOhVVAZWTMsGkNcF2FAdwtFk0T4YFXA7gNgXrg0FWiYe6ywqNcrZvk+J+Jn/0mzUWgyMpBx7oF7eit8HdVwrRDUcJT7MS9LAK4tbFZIZJ1Ile0/QgAQCSoHvsi9tvF0YPczUo3QTFuQm3OeXmehoqjh6Ikx4KMCq0NnH+1tbN3LGI+8RAXqIGG1hiijFMC+AcIUZV1nwZNQf8EUCVDK6SslrgKs08NrKrnVQ21CuktDfE18WV/o5BhoAAAAASUVORK5CYII=);
							     background-repeat: no-repeat;
							     background-size: contain;
							     z-index: 20;
							 }
							 .BUY {
							     position: absolute;
							     top: 50%;
							     left: 50%;
							     -webkit-transform: translate(-50%,-50%);
							     transform: translate(-50%,-50%);
							     width: 26px;
							     height: 26px;
							     background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAE2ElEQVRoQ+2aXWhcRRTH/2dmkyoIEmhFiw+CsUosiOJTsdDaFz9abXc3QVADRmjQfuzdPhSVQhNEohbdD5rSVKuCFmGTu0m1KlWhQZG8tA9SVETwRWnFgIiK1eydOXI3WVl1N/dj5hoNyVNg5vzn/5sz9865M0tY5n+0zPmwAvh/z/BKBo0zeGKkS3ReliNJa8G8FqBfGPypEPKct2Pv+8b6AQJ2MvhueZW4xDsJfCcYNQK+ZYEZ1rxaCMox48Y2Pl5Tgocl4zaA9tT7aMxCYFylnXEb8OaA1cPrJLwxMDbZMNTQYNCQzuSGTTWNAaVbGANop6mRVvE2IM0AK6NXSFn7OQm4hqbKOEYejYJxcrRberWvli1garywiQWdWbaAPljKLXzJoHWJQBJmVNrZYKJttkQBiPHCEAk6aGKibSyhz3S7MAbsqL5wi2b5AYA1ViEZ4yrr9JlqGgP6BuREYQBEx03NNMeT4g1eX37GVNMKYB3SLY4CeNzUkB/PTIM6mztmQ8sa4HwmixUQek2MMfMBnc0/Y6Lxl5VgSyjlFp9m4ICxHtEFVvolLTCGTP6iqZ55BivlNULq0wTcamrmbzP/BbHur2X3nTXRNQKU1dIDYH7TxEBArEfAFi/jfBR3jNiA0i2dAvjeuANHi+OtKpN/J1rMfO9YgNItvQXwtjgDxo1hzcO6Nz8UNT4yoKyWjoN5IOpAVvozjapsbncUrUiAiZZlIV0To+BlnX0hu4dforJaegTMr4QVTrJflOUaLoOT5eul1n7ZFL/eJEyD6cT8k88Pmh1x0G8iJTbW7t8TuIWEArRRhhHjWS/rPOnzpSaKI0x4wjDLrso42SCNQEBbH7WkebPXm5+uA9r6UCYaUOncq4tBBgJKt3gSwH1BMxXUngwgplXa2RwbUE4UHwLh9SDzYdoTAfQf56aV0crHohmUbukTgI2ODBqDJgUI4IjKOLvaTXJ7wFNHuuTvc7P+V1CYDAX1SRBwVnVefh22Df4aKYOpydIW1vxhkPGw7QkCQgi6vbYjdy4SoHBL+wn8XFiAoH5JAoLxsMo6b0QClNXi22BsDTLesn1hU2dwp3+MQcDNrQAZ+Mx/hgg0Z7L5E3jEy+SfigboFn4E6Mo4gM2bOqbKPULpitC8u3kf1IIOayn6sH3v58abP+E9lXbuCQ9oeOfwj1pxqtyTqqmrmgG9Dvl9A843ZljIf6cyzjXhAd3ytRL6mzjZ82P8pdecnbrOVLnnT6Dm/xfa/Cz7SznumO0uaVpuE53V0nrFfD7uYG0hWwkuLGETOF82EmCqWryDGR+bAIaCtAQXGRCVF7ulFFauxVouV0vLsjkBkTKIMwdT8ocuvzLoMM1iy0xazFzdH+MnlXVavvHblmrCLZ4nYL0NwAakv+ct6NX3RlvaAE6rjHNX+Lfo/F3DywAetWgiMSkiHPLSzv5IgKmp8kZWOvaBa2I0LYRj1aK+jnSLkwC2/5tmo4/Fx1QmP9gubvEvetsvg+juF48IcUkaeGTRqCUtvxTMURlHVdZ5LEgoGNBXqDx/tZCr+gHu/w+Afs1Eh3Q6dzQIzm8PB9hQGhvrkKsv3c3gmwi4AUTdYQYx6qN5DkQXCHQRgqaj/oAvGqCR06UJXgFcmnm3N+pKBu3N5dIo/QGkVQ1XWnG5HAAAAABJRU5ErkJggg==);
							     background-repeat: no-repeat;
							     background-size: contain;
							     z-index: 20;
							 }
							  .line:last-child {
							     position: absolute;
							     height: 50%;
							     background-color: #e3e8ee;
							     width: 1px;
							     left: 50%;
							     bottom: 0px;
							     -webkit-transform: translate(50%);
							     transform: translate(50%);
							 }
						 }
					}
				}
				.time {
				    font-size: 15px;
				    color: #000;
				    margin: 20rpx 0;
				}
			}
		}

	}

</style>
