<template>
	<view class="p72r tc">
		<view class="x-c pt pt80r">
			<image src="/static/imgs/123456.png" @tap='onChooseImg' class="w280r h208r " mode="">
			</image>
		</view>
		<view class="pt140r bor-b pb36r">
			<view class="fw-w">在线留言</view>
			<input type="text" v-model="fromData.msg" class="mt30r" placeholder="请输入您要留言的内容" />
		</view>
		<button class="x-c color-fff bg-zs mt100r" @tap="setMsg">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fromData: {
					type: 2, //1留言反馈  2联系客服
					msg: ''
				}
			};
		},
		onLoad() {},
		onShow() {

		},
		methods: {
			setMsg() {
				this.$api.setMsg(this.fromData).then(res => {
					if (res.code == 1) {
						this.$msg(res.msg)
						setTimeout(function() {
							uni.navigateBack();
						}, 1000)
					}
				})
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
</style>
