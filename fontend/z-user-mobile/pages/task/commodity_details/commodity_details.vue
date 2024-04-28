<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view class="YmContent">
			<view class="commodity_details_1" style="height: 2600rpx;">
				<!-- <image v-on:click="commodity_details_2_2_click()"  src="/static/commodity_details/images/commodity_details_2_2.jpg" mode="scaleToFill" border="0"    class="commodity_details_2"></image> -->
				<h2 style="font-size: 34px; text-align: center;">小程序人脸融合系统</h2>
				<view class="commodity_details_3">
					<!-- <image v-on:click="commodity_details_13_13_click()"  src="/static/commodity_details/images/commodity_details_13_13.jpg" mode="scaleToFill" border="0"    class="commodity_details_13"></image> -->
					
					<text decode="true" class="commodity_details_15">总金额</text>
					<text decode="true" class="commodity_details_14">20000 RMB</text>
				</view>
				<view class="commodity_details_4">
				</view>
				<text decode="true" class="commodity_details_5">项目详情</text>
				<text decode="true" class="commodity_details_6" style="max-height: 600px; overflow: hidden;">小程序人脸融合系统是一种基于人工智能技术的图像处理工具，可以将两张人脸照片进行融合，生成全新的人脸图像。用户只需上传两张照片，系统会自动识别人脸特征并进行融合，操作简单快捷。此技术可应用于娱乐、艺术创作等领域，为用户提供全新的视觉体验。小程序人脸融合系统是一种基于人工智能技术的图像处理工具，可以将两张人脸照片进行融合，生成全新的人脸图像。用户只需上传两张照片，系统会自动识别人脸特征并进行融合，操作简单快捷。此技术可应用于娱乐、艺术创作等领域，为用户提供全新的视觉体验。小程序人脸融合系统是一种基于人工智能技术的图像处理工具，可以将两张人脸照片进行融合，生成全新的人脸图像。用户只需上传两张照片，系统会自动识别人脸特征并进行融合，操作简单快捷。此技术可应用于娱乐、艺术创作等领域，为用户提供全新的视觉体验。</text>
				<text decode="true" class="commodity_details_5" >项目里程碑</text>
				<text decode="true" class="commodity_details_6" style="height: 500rpx;">1、目标：启动资金。金额：3000。状态：已启动。进度：1200/3000;\n 2、目标：开发。金额：10000。状态：未启动。进度：0/10000\n  3、目标：上线。金额：7000。状态：未启动。进度：0/7000</text>
				<text decode="true" class="commodity_details_7" style="width: 200rpx;">奖励详细说明</text>
				<text decode="true" class="commodity_details_8">1.里程碑1奖励：10%股权，按百分比分配;\n	2.里程碑2奖励：30%股权，按百分比分配;\n	3.里程碑3奖励：20%股权，按百分比分配;</text>
				<text decode="true" class="commodity_details_5" style="width: 300rpx;">项目创建者详情</text>
				<text decode="true" class="commodity_details_6" style="max-height: 600px; overflow: hidden;">姓名：XX\n 职业：XX \n 介绍：XXX\n</text>
				
				<text decode="true" class="commodity_details_9">点击投资即代表您已阅读并同意《投资协议》</text>
				<view class="commodity_details_10">
					<image v-on:click="commodity_details_11_11_click()"  src="/static/commodity_details/images/commodity_details_11_11.jpg" mode="scaleToFill" border="0"    class="commodity_details_11"></image>
					<text decode="true" class="commodity_details_12" >点击投资</text>
				</view>
			</view>
		

		<view class="loading">{{loadingText}}</view>
		<view class="ymBbottom"></view>
		<uni-popup ref="popup" type="center">
			<view class="bg-fff bor-rad10r w566r">
				<view class="p36r bor-b fw-w l-h1">投诉该项目</view>
				<view class="p36r ">
					<view class="" style="text-align: center;">
						<input placeholder="请输入投诉内容"></input></br>
						<!-- <text class="color-or" >请提前准备相关资料！</text> -->
						<!-- <text class="">以上，并且锁定期{{activation_day}}天，{{activation_day}}天后可提现。</text> -->
					</view>
					<view class="bg-zs color-fff x-c h68r bor-rad10r mt30r" @tap="tousu()">投诉</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
		data() {
			return {
				loadingText: '',
 
				page:0,//当前分页页码
				apiUrl:'https://www.ymznkf.com/wx_server',//后端接口地址
				id:'',//传值使用,方便存在本地的locakStorage  
				del_id:''//方便存在本地的locakStorage  
			}
		},
		components:{

		},
		onNavigationBarButtonTap(e) {

			if(e.text =='投诉'){
				this.$refs.popup.open()
			}
			if(e.text =='交流'){
				uni.navigateTo({
					url: '/pages/index/card/uni-comment'
				})
			}
		},
		onLoad(options) {
			var _self = this;
			
			//检查是否登录参考代码,需要用的时候，可以把注释取掉
			//if(this.checkLogin()==false){
			//	return;
			//}
			
			//this.getLaction();//得到gps

			this.page=0;

			//检测有没有传入id参数
			if (options.id != null && options.id !=""){
				this.id=options.id;
			}   
			//执行初始化,需要用的时候，可以把注释取掉
			//this.Refresh("init");

		},
		onShow() {
			console.log("on show");
			//if(this.checkLogin()==false){
			//	return;
			//}

			//执行初始化,需要用的时候，可以把注释取掉
			//this.Refresh("init");
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.Refresh();
		},
		methods: {
			tousu(){
				this.$refs.popup.close();
				uni.showToast({
					duration:1000,
					title:'已收到您的投诉，谢谢！',
					icon: 'none'
				})
			},
			/**
			* commodity_details_2_2处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			commodity_details_2_2_click:function(event){
			
			},
			
			/**
			* commodity_details_11_11处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			commodity_details_11_11_click:function(event){
			
			},
			
			/**
			* commodity_details_13_13处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			commodity_details_13_13_click:function(event){
			
			},
			
			

			//刷新数据
			Refresh:function(_action) {
			
				uni.showLoading();
				
				//提交到服务器
				var that = this
				var url=that.apiUrl+'{server_code_file_path}';
				console.log(url);
				uni.request({
				url: url,//后端接口地址，需要改成自己的接口地址
				data: {
					action: _action,//上传动作，如按钮点击会产生click动作，分页也会产生，在后端根据具体的动作来判断事件
					uid: that.getUid(),//上传用户id,在登录中获得
					//上传页面中的变量
					//定义变量---start
					
					//定义变量---end
					id: that.id,//上传id值，后端可以根据此值来操作当前id
					del_id: that.del_id,//在列表中删除按钮选中时，上传到有后端，进行删除操作
					page:that.page
				},
				method: 'GET',
				success: function (res) {//后端返回数据

					// 隐藏导航栏加载框  
					uni.hideNavigationBarLoading();
					// 停止下拉动作  
					uni.stopPullDownRefresh();  

					// 隐藏加载框  
					uni.hideLoading();  

					var tmp = res.data;

					//初始化，对页面上的控件进行赋值操作
					if(_action=="init"){

					}





					//如果后端有返回消息，则弹出消息提示
					if (tmp.message != null && tmp.message != "") {
						uni.showToast({
						title: tmp.message,
						icon: 'none',
						duration: 2000
						})
					}



					//如果后端有返回页码，则更改当前页码
					if(tmp.page!=null && tmp.page!=""){
						page=tmp.page;
					}					

				},
				fail: function (res) {
					uni.showToast({
						title: "服务器访问失败",
						icon: 'none',
						duration: 2000
					})
					console.log(res.data);
					console.log('is failed')
				}
				})
			},
		}
	}

</script>

<style lang="scss" scoped>
   @import './commodity_details.scss'
</style>