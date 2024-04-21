<template>
	<view class="">
		<view class="exchange_bg">
			<view class="jui_bg_f5f jui_lrtop box jui_flex jui_flex_justify_between " v-if="show">
				<!-- <view class="jui_fs29">
					1.获取到{{this.exchange_house_id==1?'火币':this.exchange_house_id==3?'币安':'OKEX'}}的{{this.exchange_house_id==1?'ACCESS_KEY':this.exchange_house_id==3?'API_KEY':'API_KEY'}}  用于同步持仓和交易数据
				</view>
				<view class="jui_fs29 jui_mar_t8">
					2.输入或复制粘贴你的ACCESS_KEY
				</view> -->
				<view class="jui_bg_fff jui_pad_2432 jui_mar_t20" style="width: 100%;">
					<!-- <view class="jui_flex  jui_flex_items_center justify-between jui_bor_bottom jui_pad_b20">
						<text style="width: 25%;">{{this.exchange_house_id==1?'ACCESS_KEY':this.exchange_house_id==3?'API_KEY':'API_KEY'}}：</text>
						<input type="text" value="" :placeholder="text" v-model="access_key" style="width: 70%;"/>
					</view>
					<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20 jui_bor_bottom jui_pad_b20">
						<text style="width: 25%;">SECRET_KEY：</text>
						<input type="text" value="" placeholder="请输入输入或粘贴SECRET_KEY内容" v-model="secret_key" style="width: 70%;"/>
					</view> -->
					<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20 jui_bor_bottom jui_pad_b20">
						<text style="width: 25%;">姓名：</text>
						<input type="text" maxlength="8" v-model='info.name' placeholder="请输入姓名"  style="width: 70%;"/>
					</view>
					<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20 jui_bor_bottom jui_pad_b20">
						<text style="width: 25%;">身份证：</text>
						<input type="idcard" v-model='info.id_card' placeholder="请输入18位身份证"  style="width: 70%;"/>
					</view>
					<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20 jui_bor_bottom jui_pad_b20">
						<text style="width: 25%;">职业：</text>
						<input type="text" maxlength="8" v-model='info.career' placeholder="请输入职业"  style="width: 70%;"/>
					</view>
					<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20 jui_bor_bottom jui_pad_b20">
						<text style="width: 25%;">所在地区：</text>
						<input type="text" maxlength="8" v-model='info.area' placeholder="请输入所在地区"  style="width: 70%;"/>
					</view>
					<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20 jui_bor_bottom jui_pad_b20">
						<text style="width: 25%;">手机：</text>
						<input type="number" maxlength="11" v-model='info.mobile' placeholder="请输入联系方式"  style="width: 70%;"/>
					</view>
					<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20 jui_bor_bottom jui_pad_b20">
						<text style="width: 25%;">最高学历：</text>
						<input type="text" maxlength="8" v-model='info.degree' placeholder="请输入学历"  style="width: 70%;"/>
					</view>
					<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20 jui_bor_bottom jui_pad_b20">
						<text style="width: 25%;">毕业院校：</text>
						<input type="text" maxlength="8" v-model='info.school' placeholder="请输入毕业院校"  style="width: 70%;"/>
					</view>
					<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20 jui_bor_bottom jui_pad_b20">
						<text style="width: 25%;">个人介绍：</text>
						<input type="text" maxlength="8" v-model='info.info' placeholder="请输入个人"  style="width: 70%;"/>
					</view>
					<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20 jui_bor_bottom jui_pad_b20">
						<text style="width: 25%;">微信：</text>
						<input type="text" maxlength="8" v-model='info.wx' placeholder="请输入微信"  style="width: 70%;"/>
					</view>
					<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20 jui_bor_bottom jui_pad_b20">
						<text style="width: 25%;">WhatsApp：</text>
						<input type="text" maxlength="8" v-model='info.whatsapp' placeholder="请输入QQ"  style="width: 70%;"/>
					</view>
					<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20 jui_bor_bottom jui_pad_b20">
						<text style="width: 25%;">email：</text>
						<input type="text" maxlength="8" v-model='info.email' placeholder="请输入邮箱"  style="width: 70%;"/>
					</view>
					<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20 jui_bor_bottom jui_pad_b20">
						<text style="width: 25%;">联系地址：</text>
						<input type="text" maxlength="8" v-model='info.address' placeholder="请输入联系地址"  style="width: 70%;"/>
					</view>
					<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20 jui_bor_bottom jui_pad_b20">
						<text style="width: 25%;">工作单位：</text>
						<input type="text" maxlength="8" v-model='info.work_address' placeholder="请输入工作单位"  style="width: 70%;"/>
					</view>
					<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20 jui_bor_bottom jui_pad_b20">
						<text style="width: 35%;">相关资料上传：</text>
						<uni-file-picker  ref="files" :auto-upload="false"/>
								<button @click="upload">上传文件</button>
					</view>
					<view class="jui_flex  jui_flex_items_center justify-between jui_pad_t20" v-if="exchange_house_id == 4">
						<text style="width: 25%;">密码：</text>
						<input type="password" value="" placeholder="请输入输入密码" v-model="pass_phrase" style="width: 70%;"/>
					</view>
				</view>
				<view class="jui_h80">	</view>
				<view class="zhuse  shouquan" @tap='empowerApi'>
					发起授权认证
				</view>
			</view>
			<view class="jui_bg_f5f jui_lrtop jui_pad_2432 jui_flex jui_flex_justify_between  jui_flex_items_center" v-else>
				<view class="jui_flex jui_flex_justify_between  jui_flex_items_center jui_mar_t20">
					<image :src="image" style="height: 150rpx;width: 20rpx;border-radius: 50%;" mode=""></image>
					<view class="jui_mar_l20">
						(正在授权审核或已审核完成，请等待或联系客服)
					</view>
				</view>
				
			</view>
		</view>
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
				x:"",
				access_key:'',
				secret_key:'',
				show: 1,
				exchange_house_id:'',
				text:'',
				image:'',
				pass_phrase:'',
				userInfo:'',
				info:{},
				files:[],
			}
		},
		onShow() {
			if(!uni.getStorageSync('loginInfo').user_id){
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return
			}
			this.getFromToken()
			
		},
		onLoad(opt) {
			// this.user()
			this.exchange_house_id = opt.id;
			this.image = opt.image
			
			uni.setNavigationBarTitle({
				title:opt.name
			})
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'/pages/index/webview/course'
			})
		},
		methods: {
			upload(){
							this.$refs.files.upload()
						},
			getFromToken() {
				var that = this
				this.$api.getMoney({user_id:uni.getStorageSync('loginInfo').user_id}).then(res => {
					if (res.code == 10000) {
						if(res.data.is_valid == 0){
							that.show = 1
						}else{
							that.show = 0
						}
					
					}
				});
			},
			change(){
				this.show = true;
			},
			del(){
				let data = {
					exchange_house_id:this.exchange_house_id,
				}
				this.$api.deleteApiAuth(data).then(res => {
					this.$msg(res.msg);
					setTimeout(() => {
						uni.navigateBack()
					}, 1000);
				});
			},
			empowerApi() {
				var that = this
				var len = Object.keys(this.info).length
				if(len <=8){
					uni.showToast({
						icon: 'none',
						title:'请填写更多内容以便于认证',
						duration:1000,
					})
					return
				}
				uni.showModal({
					content:'请确认您的材料及内容是否填写完整！！',
					success() {
						that.$api.user_auth({info: that.info, files:that.files,user_id: uni.getStorageSync('loginInfo').user_id}).then(res => {
							that.$msg(res.msg);
							if(res.code == 10000){
								setTimeout(() => {
									// uni.navigateBack();
									uni.switchTab({
										url:'/pages/task/task'
									})
								}, 1000);
							}
						});
					}
				})
				
				
				}
		}
	}
</script>

<style lang="scss">
	.exchange_bg {
		background:$zhuse;
		// padding-top: 90rpx;
		.box {
			padding: 50rpx 30rpx 0 30rpx;
			flex-wrap: wrap;
		}
	}
	.zhuse {
		background-color: $zhuse;
	}
	input {
		width: 70%;
	}
	.input-placeholder,.pl-input{color: #999;
font-size: 24rpx;}
	.shouquan {
		width: 678rpx;
		height: 82rpx;
		background: $zhuse;
		border-radius: 20rpx;
		line-height: 82rpx;
		text-align: center;
		color: #FFFFFF;
	}
	.btn {
		width: 150rpx;
		height: 60rpx;
		background-color:$zhuse;
		color: #FFFFFF;
		margin-right: 10rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
