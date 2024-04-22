<template name='person_admin'>
	<view>
		<view style="width: 100%;height: 97%;display: flex;justify-content: center;align-items: center;">
			<view style="margin-top: 40upx;width: 96%;height: 95%;background-color: #FFFFFF;box-shadow: 1px 1px 5px #C0C0C0;padding-top: 20upx;">
				<view style="width: 90%;padding: 30upx;display: flex;flex-direction: row;justify-content: center;align-items: center;border-bottom: 1px solid #EBEEF5;">
						<view style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 25%;">
							<view style="display: flex;flex-direction: row;padding: 10upx;align-items: center;">
								<view class="num" style="font-size: 55px;margin-right: 15upx;font-weight: 500;">
									2
								</view>
								<view style="font-size: 30px;color: #999999;">
									个
								</view>
							</view>
							<view style="font-size: 15px;font-weight: 550;">
								里程碑总数
							</view>
						</view>
						<view style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 25%;">
							<view style="display: flex;flex-direction: row;padding: 10upx;align-items: center;">
								<view class="num" style="font-size: 55px;margin-right: 15upx;font-weight: 500;">
									0
								</view>
								<view style="font-size: 30px;color: #999999;">
									个
								</view>
							</view>
							<view style="font-size: 15px;font-weight: 550;">
								待审里程碑
							</view>
						</view>
						<view style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 25%;">
							<view style="display: flex;flex-direction: row;padding: 10upx;align-items: center;">
								<view class="num" style="font-size: 55px;margin-right: 15upx;font-weight: 500;">
									0
								</view>
								<view style="font-size: 30px;color: #999999;">
									个
								</view>
							</view>
							<view style="font-size: 15px;font-weight: 550;">
								已驳回
							</view>
						</view>
				</view>
				
				<!-- 添加删除 -->
				
				<view style="width: 100%;display: flex;flex-direction: row;font-size: 14px;">
					<view style="padding: 20upx;display: flex;flex-direction: row;width: 100%;">
						<!-- <view @click="add_data" class="add_color" style="padding: 5upx 10upx 5upx 10upx;color: #FFFFFF;border-radius: 3upx;display: flex;justify-content: center;align-items: center;">
							<image src="../../static/add.png" style="width: 10upx;height: 10upx;margin-right: 5upx;"></image>
							添加
						</view>
						<view @click="delete_all" class="back_color" style="padding: 5upx 10upx 5upx 10upx;color: #FFFFFF;margin-left: 10upx;border-radius: 3upx;display: flex;justify-content: center;align-items: center;">
							<image src="../../static/delete.png" style="width: 12upx;height: 12upx;margin-right: 5upx;"></image>
							批量删除
						</view>
						<input v-model="search_word" style="padding: 5upx 10upx 5upx 10upx;border: 1px solid #C0C0C0;margin-left: auto;"/>
						<view @click="search" class="add_color" style="padding: 5upx 15upx 5upx 15upx;color: #FFFFFF;border-radius: 3upx;margin-left: 15upx;display: flex;justify-content: center;align-items: center;">
							<image src="../../static/search.png" style="width: 15upx;height: 15upx;margin-right: 5upx;"></image>
							查询
						</view> -->
					</view>
				</view>
				<!-- 添加删除end -->
				<!-- 数据列表 -->
				<view style="color: #606270;display: flex;width: 100%;justify-content: center;font-size: 15px;flex-direction: column;align-items: center;">
					<view style="border-bottom: 1px solid #EBEEF5;display: flex;flex-direction: row;width: 90%;background-color: #F5F7FA;padding: 10upx;">
						<!-- <checkbox :checked="choose_all_" @click="choose_all" style="transform:scale(0.7);width: 5%;"/> -->
						<view style="width: 5%;">
							项目ID
						</view>
						<view style="width: 15%;">
							项目名称 
						</view>
						<view style="width: 20%;">
							里程碑目标
						</view>
						<view style="width: 15%;">
							里程碑金额
						</view>
						<view style="width: 15%;">
							已筹集金额
						</view>
						<view style="width: 10%;">
							里程碑状态
						</view>
						
						<view style="width: 20%;">
							操作
						</view>
					</view>
					<checkbox-group @change="checkbox_change" style="width: 90%;display: flex;flex-direction: column;justify-content: center;align-items: center;">
						<view v-for="(item,index) in pageList" :key=index class="list_detail" style="display: flex;justify-content: center;max-height: 300rpx;align-items: center;">
						<!-- <checkbox :value="item.id.toString()" :checked='checkbox' style="transform:scale(0.7);width: 5%;"/> -->
						<view style="width: 5%;">
							{{item.id}} 
						</view>
						<view style="width: 15%;">
							{{item.name}} 
						</view>
						<view style="width: 20%;">
							{{item.lcb_goal}} 
						</view>
						<!-- <view style="width: 23%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;margin-right: 1%;"> -->
						<view style="width: 15%;word-wrap: break-word; margin-left: 10px; ">
							{{item.lcb_amount}}
						</view>
						<view style="width: 15%;">
							{{item.lcb_now}}
						</view> 
						<view style="width: 10%;">
							{{item.lcb_status}}
						</view>
						<view style="width: 20%;display: flex;flex-direction: row;">
							
							<view class="alter" style=" margin-left: 5px;">
								查看资料
							</view>
							<view v-if="item.lcb_status=='已完成未放款'" class="alter" style=" margin-left: 5px">
								审核放款
							</view>
							<view v-else-if="item.lcb_status=='已完成已放款'" class="alter" style=" margin-left: 5px ;color: red;">
								已放款
							</view>
							<view v-else-if="item.lcb_status=='正在进行'" class="alter" style=" margin-left: 5px">
								暂停里程
							</view>
							<view v-else-if="item.lcb_status=='暂未开始'" class="alter" style=" margin-left: 5px">
								开始里程
							</view>
							<view v-else-if="item.lcb_status=='已超时'" class="alter" style=" margin-left: 5px;color: rebeccapurple;">
								已超时
							</view>
						</view>
					</view>
					</checkbox-group>
					<view style="display: flex;flex-direction: row;justify-content: center;align-items: center;margin-top: 20upx;">
						<view>
							共 {{Num}} 条 
						</view>
						<view style="padding: 5upx 20upx 5upx 20upx;margin-left: 20upx;border: 1px solid #DCDFE6;">
							10条/页
						</view>
						<view style="margin-left: 20upx;display: flex;flex-direction: row;justify-content: center;align-items: center;">
							<image @click="page_delete" src="../../static/left.png" class="left"></image>
							<view @click="change_page(items)" v-for="(items,indexs) in pageList" :key=indexs :class="NowPage==items?'page':'nopage'">
								{{indexs}}
							</view>
							<image @click="page_add" src="../../static/right.png" class="right"></image>
						</view>
					</view>
				</view>
				<!-- 数据列表end -->
			</view>
		</view>
		<!-- 编辑遮罩层
		<uni-popup ref="popup" type="center">
		    <view style="width: 500upx;display: flex;background-color: #FFFFFF;flex-direction: column;box-shadow: 1px 1px 1px #808080;border-radius: 2upx;">
		        <view style="border-bottom: 1px solid #DCDFE6;font-size: 18px;display: flex;flex-direction: row;padding: 20upx;width: 460upx;align-items: center;">
					<view>
						项目初审
					</view>
					<image class='alter_sure' @tap="close" src="../../static/close.png" style="margin-left: auto;height: 15upx;width: 15upx;padding: 5upx;"></image>
				</view>
		        <view style="border-bottom: 1px solid #DCDFE6;color: #606266;font-size: 15px;width: 440upx;padding: 30upx;display: flex;flex-direction: column;justify-content: center;align-items: center;">
					
					<view style="width: 360upx;padding: 15upx;display: flex;flex-direction: row;align-items: center;">
						<view style="color: red;">
							*已完成项目审核并同意该项目启动第一个里程碑*
						</view>
						
					</view>
					
				</view>
				<view style="width: 100%;display: flex;align-items: center;font-size: 12px;color: #FFFFFF;">
					<view style="width: 60%;display: flex;flex-direction: row;align-items: center;padding: 15upx;">
						<view @click="alter_cancel" style="margin-left: auto;padding: 8upx 15upx 8upx 15upx;color: #606266;border: 1px solid #DCDFE6;">
							取 消
						</view>
						<view @click="alter_sure" style="margin-left: 18upx;padding: 8upx 15upx 8upx 15upx;background-color:#1890FF">
							确 定
						</view>
					</view>
				</view>
		    </view>     
		</uni-popup>
		<uni-popup ref="popup4" type="center">
		    <view style="width: 500upx;display: flex;background-color: #FFFFFF;flex-direction: column;box-shadow: 1px 1px 1px #808080;border-radius: 2upx;">
		        <view style="border-bottom: 1px solid #DCDFE6;font-size: 18px;display: flex;flex-direction: row;padding: 20upx;width: 460upx;align-items: center;">
					<view>
						编辑
					</view>
					<image @tap="close" src="../../static/close.png" class="alter_sure" style=""></image>
				</view>
		        <view style="border-bottom: 1px solid #DCDFE6;color: #606266;font-size: 15px;width: 440upx;padding: 30upx;display: flex;flex-direction: column;justify-content: center;align-items: center;">
		        	
		        	<view style="width: 360upx;padding: 15upx;display: flex;flex-direction: row;align-items: center;">
		        		<view style="color: red;">
		        			*
		        		</view>
		        		菜名
		        		<input :value="add_name" v-model="add_name" @click='confirm5' :class="input_confirm==5?'input_confirm':'input_account'" class="" style="" />
		        	</view>
		        	<view style="width: 360upx;padding: 15upx;display: flex;flex-direction: row;align-items: center;">
		        		<view  style="color: red;">
		        			*
		        		</view>
		        		图片
		        		<image @click="add_image" :src="add_pic" :class="input_confirm==6?'input_confirm_image':'input_image'"></image>
		        	</view>
		        	<view style="width: 360upx;padding: 15upx;display: flex;flex-direction: row;align-items: center;">
		        		<view  style="color: red;">
		        			*
		        		</view>
		        		原料
		        		<textarea :value="add_raw" v-model="add_raw" @click='confirm7' class="" :class="input_confirm==7?'input_confirm':'input_account'" style="" />
		        	</view>
		        	<view style="width: 360upx;padding: 15upx;display: flex;flex-direction: row;align-items: center;">
		        		<view  style="color: red;">
		        			*
		        		</view>
		        		种类
		        		<input :value="add_type" v-model="add_type" @click='confirm8' class="" :class="input_confirm==8?'input_confirm':'input_account'" style="" />
		        	</view>
		        	<view style="width: 360upx;padding: 15upx;display: flex;flex-direction: row;align-items: center;">
		        		<view  style="color: red;">
		        			*
		        		</view>
		        		价格
		        		<input :value="add_price" v-model="add_price" @click='confirm9' class="" :class="input_confirm==9?'input_confirm':'input_account'" style="" />
		        	</view>
		        </view>
				<view style="width: 100%;display: flex;align-items: center;font-size: 12px;color: #FFFFFF;">
					<view style="width: 95%;display: flex;flex-direction: row;align-items: center;padding: 15upx;">
						<view @click="alter_cancel" style="margin-left: auto;padding: 8upx 15upx 8upx 15upx;color: #606266;border: 1px solid #DCDFE6;">
							取 消
						</view>
						<view @click="alter_sure" style="margin-left: 18upx;padding: 8upx 15upx 8upx 15upx;background-color:#1890FF">
							确 定
						</view>
					</view>
				</view>
		    </view>     
		</uni-popup>
		<!-- end -->
		<!-- 添加遮罩层 -->
		<uni-popup ref="popup1" type="center">
		    <view style="width: 500upx;display: flex;background-color: #FFFFFF;flex-direction: column;box-shadow: 1px 1px 1px #808080;border-radius: 2upx;">
		        <view style="border-bottom: 1px solid #DCDFE6;font-size: 18px;display: flex;flex-direction: row;padding: 20upx;width: 460upx;align-items: center;">
					<view>
						添加
					</view>
					<image mode="aspectFill" class="alter_sure" @tap="add_cancel" src="../../static/close.png" style="margin-left: auto;height: 15upx;width: 15upx;padding: 5upx;"></image>
				</view>
		        <view style="border-bottom: 1px solid #DCDFE6;color: #606266;font-size: 15px;width: 440upx;padding: 30upx;display: flex;flex-direction: column;justify-content: center;align-items: center;">
					
					<view style="width: 360upx;padding: 15upx;display: flex;flex-direction: row;align-items: center;">
						<view style="color: red;">
							*
						</view>
						菜名
						<input v-model="add_name" @click='confirm5' :class="input_confirm==5?'input_confirm':'input_account'" class="" style="" />
					</view>
					<view style="width: 360upx;padding: 15upx;display: flex;flex-direction: row;align-items: center;">
						<view  style="color: red;">
							*
						</view>
						图片
						<image @click="add_image" :src="add_pic" :class="input_confirm==6?'input_confirm_image':'input_image'"></image>
					</view>
					<view style="width: 360upx;padding: 15upx;display: flex;flex-direction: row;align-items: center;">
						<view  style="color: red;">
							*
						</view>
						原料
						<input v-model="add_raw" @click='confirm7' class="" :class="input_confirm==7?'input_confirm':'input_account'" style="" />
					</view>
					<view style="width: 360upx;padding: 15upx;display: flex;flex-direction: row;align-items: center;">
						<view  style="color: red;">
							*
						</view>
						种类
						<input v-model="add_type" @click='confirm8' class="" :class="input_confirm==8?'input_confirm':'input_account'" style="" />
					</view>
					<view style="width: 360upx;padding: 15upx;display: flex;flex-direction: row;align-items: center;">
						<view  style="color: red;">
							*
						</view>
						价格
						<input v-model="add_price" @click='confirm9' class="" :class="input_confirm==9?'input_confirm':'input_account'" style="" />
					</view>
				</view>
				<view style="width: 100%;display: flex;align-items: center;font-size: 12px;color: #FFFFFF;">
					<view style="width: 95%;display: flex;flex-direction: row;align-items: center;padding: 15upx;">
						<view @click="add_cancel" style="margin-left: auto;padding: 8upx 15upx 8upx 15upx;color: #606266;border: 1px solid #DCDFE6;">
							取 消
						</view>
						<view @click="add_sure" style="margin-left: 18upx;padding: 8upx 15upx 8upx 15upx;background-color:#1890FF">
							确 定
						</view>
					</view>
				</view>
		    </view>
		</uni-popup>
		<!-- end -->
	</view>
	
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default{
		name:'admin_person',
		components: {
			uniPopup
		},
		data(){
			return{
				c_lcb: '',
				c_id: '',
				// 添加的菜品内容
				add_name:'',
				add_raw:'',
				add_type:'',
				add_price:'',
				// 添加图片
				add_pic:'http://cd7.yesapi.net/0B4163C86181759DD5DE6C761AF719A5_20200719144322_4f6d7c84144913a990f9532d76df3ace.png',
				add_pic_url:'',
				
				search_word:'',
				add_accout:'',
				add_password:'',
				choose_all_:false,
				checkbox_status:[],
				checkbox:false,
				accout:'',
				password:'',
				person_id:1,
				add_time:'',
				input_confirm:-1,
				NowPage:1,
				name:'人员管理',
				functionList:[
					{
						name:'人员管理',
						icon:'/static/personAdmin.png',
						id:1,
						open:false,
						page:[
							{
								name:'用户管理',
								id:2
							},
							{
								name:'admin管理',
								id:3
							}
						]
					},
					{
						name:'商城管理',
						icon:'/static/shopAdmin.png',
						id:4,
						open:false,
						page:[
							{
								name:'商城列表',
								id:5
							},
							{
								name:'推荐管理',
								id:6
							}
						]
					}
				],
				
				AdminList:[],
				ShopList:[],
				RecomList:[],
				
			}
		},
		 // 此处定义传入的数据
		props: {
		    PersonList: {
		        type: Array,
		        value: null
		    },
			Num: {
			    type: Number,
			    value: null
			},
			PageNum: {
			    type: Number,
			    value: null
			},
			pageList: {
			    type: Array,
			    value: null
			},
		},
		
		methods:{
			add_image:function(){
						var that = this
						that.input_confirm = 6
						uni.chooseImage({
						    count: 1, //默认9
						    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
						    sourceType: ['album', 'camera'], //从相册选择
						    success: function (res) {
								//image变base64
								var path =res.tempFilePaths[0];//url链接
								var img = path;//imgurl 就是你的图片路径  
								console.log(img)
								that.add_pic = img
								function getBase64Image(img) {  
								     var canvas = document.createElement("canvas");  
								     canvas.width = img.width;  
								     canvas.height = img.height;  
								     var ctx = canvas.getContext("2d");  
								     ctx.drawImage(img, 0, 0, img.width, img.height);  
								     var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();  
								     var dataURL = canvas.toDataURL("image/"+ext);  
								     return dataURL;  
								}  
								var image = new Image();  
								image.src = img;  
								image.onload = function(){  
								var base64 = getBase64Image(image);  
								console.log(base64)
								base64 = base64.replace('data:image/png;base64,','')
								uni.request({				  	
									url:'https://hn216.api.yesapi.cn/?s=App.CDN.UploadImgByBase64',
									method: "POST",
									header: {
										// 'content-type':'application/json;charset=utf-8'
									},
									data:{
										app_key:'0B4163C86181759DD5DE6C761AF719A5',
										service:'App.CDN.UploadImgByBase64',
										file:'data:image/jpg;base64,'+base64,
										file_name:'image',
										// file_type:'图片'
									},
									success: function (res) {
										console.log(res)
										
										if(res.statusCode == 200){
											that.add_pic_url = res.data.data.url
											console.log(that.add_pic_url)
											alert('图片上传成功！')
											
										}else{
											uni.showToast({
												title:'图片上传错误，换张图片试试！',
												icon:'none'
											})
											alert('图片上传错误，换张图片试试！')
										}
									}
								})
								} 
						    }
						});
				
			},
			search:function(){
				var that = this
				uni.request({
					url:'https://hn216.api.yesapi.cn/',
						method: "POST",
						header: {
						},
						data:{
							model_name:'food_info',
							where:'[["food_name", "LIKE","'+that.search_word+'"]]',
							app_key:'0B4163C86181759DD5DE6C761AF719A5',
							service:'App.Table.FreeQuery',
							perpage:5, //每一页12个数据
							page:1 //第几页
						},
						
						success: function (res) {
							console.log(res)
							that.PersonList = res.data.data.list
							console.log(that.PersonList)
						}
					})					
				uni.request({
					url:'https://hn216.api.yesapi.cn/',
					method: "POST",
					data:{
						model_name:'food_info',
						where:'[["food_name", "LIKE","'+that.search_word+'"]]',
						app_key:'0B4163C86181759DD5DE6C761AF719A5',
						service:'App.Table.FreeQuery',
						perpage:10000, //每一页12个数据
						
					},					
					success: function (res) {
							that.Num = res.data.data.list.length
							that.PageNum = Math.ceil(that.Num / 5); //向上整除
							console.log(that.PageNum)
						}
					})
			},
			add_sure:function(){
				var that = this
				
				function isNumber(value) {         //验证是否为数字
				    var patrn = /^(-)?\d+(\.\d+)?$/;
				    if (patrn.exec(value) == null || value == "") {
				        return false
				    } else {
				        return true
				    }
				}
				if(that.add_name == '' || that.add_price == '' || that.add_raw == '' || that.add_type == '' || that.add_pic_url == ''){
					uni.showToast({
						title:"信息输入不完整！",
						icon:'none'
					})
				}else{
					if(!isNumber(that.add_price)){
						uni.showToast({
							title:"商品价格必须是数字！",
							icon:'none'
						})
					}else{
						uni.request({
									url:'https://hn216.api.yesapi.cn/?s=App.Table.CheckCreate',
										data:{
											model_name:'food_info',
											app_key:'0B4163C86181759DD5DE6C761AF719A5',
											service:'App.Table.CheckCreate',
											data:{
												'food_name':that.add_name,
												'food_image':that.add_pic_url,
												'food_material':that.add_raw,
												'food_class':that.add_type,
												'food_price':that.add_price,
											},
											check_field:"food_name",
										},
										
										success: function (res) {
											console.log(res.data.data.err_code)
											if(res.data.data.err_code == 0){
												that.$refs.popup1.close()
												uni.showToast({
													title:'添加成功！',
													icon:'none'
												})
												that.refresh()
											}else{
												if(res.data.data.err_code == 3){
													uni.showToast({
														title:'商品名称已存在！',
														icon:'none'
													})
												}else{
													uni.showToast({
														title:'出现未知错误！请重试',
														icon:'none'
													})
												}
											}
											
										}
									})
					}
				}
				
			},
			add_cancel:function(){
				this.$refs.popup1.close()
			},
			add_data:function(){
				this.$refs.popup1.open()
				this.add_pic = 'http://cd7.yesapi.net/0B4163C86181759DD5DE6C761AF719A5_20200719144322_4f6d7c84144913a990f9532d76df3ace.png'
				this.add_pic_url = ''
				this.add_name = ''
				this.add_price = ''
				this.add_raw = ''
				this.add_type = ''
				this.input_confirm = -1
			},
			// cancel_choose:function(){
			// 	var that = this
				
			// 	that.choose_all_ = false
			// 	that.checkbox = false
			// 	console.log(that.choose_all_)
			// },
			delete_all:function(){
				var that = this
				
				if(that.checkbox_status.length==0&&that.checkbox==false){
					uni.showToast({
						title:'未选中任何行',
						icon:'none'
					})
				}else{
					uni.showModal({
					    content: '确定要删除吗？',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								console.log(that.checkbox_status)
								if(that.checkbox_status.length == 0){
									console.log(1)
									console.log(that.PersonList)
									console.log(that.checkbox)
									if(that.checkbox == true){
										console.log(2)
										
										for(var i = 0;i<that.PersonList.length;i++){
											console.log(that.PersonList[i].id)
											uni.request({
												url:'https://hn216.api.yesapi.cn/?s=App.Table.FreeDelete',
													method: "POST",
													data:{
														model_name:'food_info',
														app_key:'0B4163C86181759DD5DE6C761AF719A5',
														service:'App.Table.FreeDelete',
														where:'[["id", "=","'+that.PersonList[i].id+'"]]',
													},
													success: function (res) {
														console.log(res)
														that.refresh()
													}
												})
										}
										uni.showToast({
										    icon: 'none',
										    title: '删除成功'
										});
										that.refresh()
										that.checkbox = false
									}
								}else{
									for(var i = 0;i<that.checkbox_status.length;i++){
										uni.request({
											url:'https://hn216.api.yesapi.cn/?s=App.Table.FreeDelete',
												method: "POST",
												data:{
													model_name:'food_info',
													app_key:'0B4163C86181759DD5DE6C761AF719A5',
													service:'App.Table.FreeDelete',
													where:'[["id", "=","'+that.checkbox_status[i]+'"]]',
												},
												success: function (res) {
													that.refresh()
												}
											})
									}
									that.checkbox = false
									uni.showToast({
									    icon: 'none',
									    title: '删除成功'
									});
									
								}
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
				
				
			},
			checkbox_change:function(e){
				this.checkbox_status=e.detail.value
				console.log(this.checkbox_status)
				
				
			},
			choose_all:function(){
				if(this.checkbox == false){
					this.checkbox = true
					this.choose_all_ = true
					this.checkbox_status =[]
					console.log(this.checkbox)
				}else{
					this.checkbox = false
					this.choose_all_ = false
					this.checkbox_status =[]
					console.log(this.checkbox)
				}
			},
			delete_detail:function(e){
				var that = this
				uni.showModal({
				    content: '确定要驳回吗？',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							
							uni.request({
								url:'https://hn216.api.yesapi.cn/?s=App.Table.FreeDelete',
									method: "POST",
									data:{
										model_name:'food_info',
										app_key:'0B4163C86181759DD5DE6C761AF719A5',
										service:'App.Table.FreeDelete',
										where:'[["id", "=","'+e.id+'"]]',
									},
									success: function (res) {
										console.log(res)
										uni.showToast({
										    icon: 'none',
										    title: '删除成功'
										});
										
										that.refresh()
									}
								})								

				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			refresh(){
				
				console.log(this.checkbox)
			
				var that = this
				
				uni.request({
					url:'https://hn216.api.yesapi.cn/',
					method: "POST",
					data:{
						model_name:'food_info',
						where:'[["food_name", "LIKE","'+that.search_word+'"]]',
						app_key:'0B4163C86181759DD5DE6C761AF719A5',
						service:'App.Table.FreeQuery',
						perpage:5, //每一页12个数据
						page:that.NowPage, //第几页
						// order: ["id DESC"],
					},					
					success: function (res) {
							// console.log(res.data.data.list)
							that.PersonList = res.data.data.list
						}
					})
				uni.request({
					url:'https://hn216.api.yesapi.cn/',
					method: "POST",
					data:{
						model_name:'food_info',
						where:'[["food_name", "LIKE","'+that.search_word+'"]]',
						app_key:'0B4163C86181759DD5DE6C761AF719A5',
						service:'App.Table.FreeQuery',
						perpage:10000, //每一页12个数据
						
					},					
					success: function (res) {
							that.Num = res.data.data.list.length
							that.PageNum = Math.ceil(that.Num / 5); //向上整除
							console.log(that.PageNum)
						}
					})
			},
			alter_cancel(){
				this.$refs.popup.close()
			},
			alter_sure(){
					var that = this
					console.log(that.c_id)
					uni.showModal({
						title:'请确认',
						content: '项目里程碑: '+ this.c_lcb ,
						confirmText: '确认通过',
						cancelText: '取消操作',
						success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
								that.$refs.popup.close()
							}
					})
					
				
			},
			close(){
				this.$refs.popup.close()
			},
			confirm0(){
				this.input_confirm = 0
				console.log(this.input_confirm)
			},
			confirm1(){
				this.input_confirm = 1
				console.log(this.input_confirm)
			},
			confirm2(){
				this.input_confirm = 2
				console.log(this.input_confirm)
			},
			confirm3(){
				this.input_confirm = 3
				console.log(this.input_confirm)
			},
			confirm4(){
				this.input_confirm = 4
				console.log(this.input_confirm)
			},
			confirm5(){
				this.input_confirm = 5
				console.log(this.input_confirm)
			},
			confirm7(){
				this.input_confirm = 7
				console.log(this.input_confirm)
			},
			confirm8(){
				this.input_confirm = 8
				console.log(this.input_confirm)
			},
			confirm9(){
				this.input_confirm = 9
				console.log(this.input_confirm)
			},
			
			alter:function(e){
				this.$refs.popup.open()
				console.log(e)
				this.c_id = e.id
				this.c_lcb = e.lcb
			},
			
			change_page:function(e){
				console.log(e)
				var that = this
				if(e != '...'){
					that.NowPage = e
					that.checkbox = false
					that.checkbox_status =[]
					if(e >= 4&&e <= that.PageNum-3){
						that.pageList=[]
						that.pageList.push(1)
						that.pageList.push('...')
						for(var i = e-2;i<e+3;i++){
							that.pageList.push(i)
						}
						that.pageList.push('...')
						that.pageList.push(that.PageNum)
					}else{
						if(e<4){
							that.pageList=[]
							for(var i = 1;i < 7;i++){
								that.pageList.push(i)
							}
							that.pageList.push('...')
							that.pageList.push(that.PageNum)
						}else{
							that.pageList=[]
							that.pageList.push(1)
							that.pageList.push('...')
							for(var i = that.PageNum-5;i < that.PageNum+1;i++){
								that.pageList.push(i)
							}
						}
					}
					uni.request({
						url:'https://hn216.api.yesapi.cn/',
						method: "POST",
						data:{
							model_name:'food_info',
							where:'[["food_name", "LIKE","'+that.search_word+'"]]',
							app_key:'0B4163C86181759DD5DE6C761AF719A5',
							service:'App.Table.FreeQuery',
							perpage:5, //每一页12个数据
							page:e, //第几页
							// order: ["id DESC"],
						},					
						success: function (res) {
								// console.log(res.data.data.list)
								that.PersonList = res.data.data.list
								console.log(that.PersonList)
							}
						})
				}
				
			},
			page_delete:function(){
				var that = this
				if(that.NowPage<=1){
					alert('已经是首页了！')
				}else{
					that.NowPage = that.NowPage-1
					if(that.NowPage >= 4&&that.NowPage <= that.PageNum-3){
						that.pageList=[]
						that.pageList.push(1)
						that.pageList.push('...')
						for(var i = that.NowPage-2;i<that.NowPage+3;i++){
							that.pageList.push(i)
						}
						that.pageList.push('...')
						that.pageList.push(that.PageNum)
					}else{
						if(that.NowPage<4){
							that.pageList=[]
							for(var i = 1;i < 7;i++){
								that.pageList.push(i)
							}
							that.pageList.push('...')
							that.pageList.push(that.PageNum)
						}else{
							that.pageList=[]
							that.pageList.push(1)
							that.pageList.push('...')
							for(var i = that.PageNum-5;i < that.PageNum+1;i++){
								that.pageList.push(i)
							}
						}
					}
					uni.request({
						url:'https://hn216.api.yesapi.cn/',
						method: "POST",
						data:{
							model_name:'food_info',
							where:'[["food_name", "LIKE","'+that.search_word+'"]]',
							app_key:'0B4163C86181759DD5DE6C761AF719A5',
							service:'App.Table.FreeQuery',
							perpage:5, //每一页12个数据
							page:that.NowPage, //第几页
							// order: ["id DESC"],
						},					
						success: function (res) {
								// console.log(res.data.data.list)
								that.PersonList = res.data.data.list
								console.log(that.PersonList)
							}
						})
				}
			},
			page_add:function(){
				var that = this
				if(that.NowPage>=that.PageNum){
					console.log('不合格')
					alert('已经是尾页了！')
				}else{
					that.NowPage = that.NowPage+1
					if(that.NowPage >= 4&&that.NowPage <= that.PageNum-3){
						that.pageList=[]
						that.pageList.push(1)
						that.pageList.push('...')
						for(var i = that.NowPage-2;i<that.NowPage+3;i++){
							that.pageList.push(i)
						}
						that.pageList.push('...')
						that.pageList.push(that.PageNum)
					}else{
						if(that.NowPage<4){
							that.pageList=[]
							for(var i = 1;i < 7;i++){
								that.pageList.push(i)
							}
							that.pageList.push('...')
							that.pageList.push(that.PageNum)
						}else{
							that.pageList=[]
							that.pageList.push(1)
							that.pageList.push('...')
							for(var i = that.PageNum-5;i < that.PageNum+1;i++){
								that.pageList.push(i)
							}
						}
					}
					uni.request({
						url:'https://hn216.api.yesapi.cn/',
						method: "POST",
						data:{
							model_name:'food_info',
							where:'[["food_name", "LIKE","'+that.search_word+'"]]',
							app_key:'0B4163C86181759DD5DE6C761AF719A5',
							service:'App.Table.FreeQuery',
							perpage:5, //每一页12个数据
							page:that.NowPage, //第几页
							// order: ["id DESC"],
						},					
						success: function (res) {
								// console.log(res.data.data.list)
								that.PersonList = res.data.data.list
								console.log(that.PersonList)
							}
						})
				}
			}
				
		}
	}
</script>

<style>
	.input_image{
		height: 100upx;
		width: 100upx;
		margin-left: 20upx;
		border: 1px solid #DCDFE6;
	}
	.input_confirm_image{
		height: 100upx;
		width: 100upx;
		margin-left: 20upx;
		border: 1px solid #1890FF;
	}
	.input_image:hover{
		border: 1px solid #C8C7CC;
	}
	.alter_sure{
		margin-left: auto;height: 15upx;width: 15upx;padding: 5upx;
		border: 1px solid #FFFFFF;
	}
	.alter_sure:hover{
		border: 1px solid #C8C7CC;
	}
	.add_color{
		background-color: #1890FF;
		
	}
	.add_color:hover{
		background-color: #46A6FF;
	}
	.admin_pic{
		width: 180upx;
		height: 50upx;
		padding: 20upx;
	}
	.admin_pic:hover{
		background-color: #2C405A;
	}
	.arrow{
		height: 20upx;
		width: 20upx;
		
		margin-left: auto;
	}
	.arrow1{
		height: 18upx;
		width: 18upx;
		
	}
	.detail{
		padding: 20upx 20upx 20upx 40upx;
		width: 160upx;
		display: flex;
		flex-direction: row;
		color: #FFFFFF;
		font-size: 15px;
		align-items: center;
		
	}
	.detail:hover{
		background-color: #1890FF;
	}
	.list_detail{
		border-bottom: 1px solid #EBEEF5;display: flex;flex-direction: row;width: 100%;padding: 10upx;
	}
	.list_detail:hover{
		background-color: #F5F7FA;
	}
	.alter{
		color: #1890FF;
	}
	.alter:hover{
		text-decoration: underline;
		color: #DD524D;
	}
	.delete{
		color: #1890FF;margin-left: 10upx;
	}
	.delete:hover{
		text-decoration: underline;
		color: #DD524D;
	}
	.left{
		background-color: #F4F4F5;
		width: 15upx;
		height: 15upx;
		padding: 10upx;
	}
	.page{
		color: #FFFFFF;
		background-color: #1890FF;
		width: 32upx;
		height: 32upx;
		font-size: 15px;
		border-radius: 3upx;
		text-align: center;
		justify-content: center;
		display: flex;
		align-items: center;
		margin-left: 10upx;
	}
	.nopage{
		color: #FFFFFF;
		background-color: #F4F4F5;
		width: 32upx;
		height: 32upx;
		font-size: 15px;
		border-radius: 3upx;
		text-align: center;
		justify-content: center;
		display: flex;
		align-items: center;
		margin-left: 10upx;
		color: #606270;
	}
	.right{
		margin-left: 10upx;
		background-color: #F4F4F5;
		width: 15upx;
		height: 15upx;
		padding: 10upx;
	}
	.input_account{
		padding: 5upx 15upx 5upx 15upx;border: 1px solid #DCDFE6;width: 250upx;font-size: 13px;margin-left: 20upx;
	}
	.input_account:hover{
		border: 1px solid #C8C7CC;
	}
	.input_account1{
		padding: 5upx 15upx 5upx 15upx;border: 1px solid #DCDFE6;width: 227upx;font-size: 13px;margin-left: 20upx;
	}
	.input_confirm{
		border: 1px solid #1890FF;
		padding: 5upx 15upx 5upx 15upx;width: 250upx;font-size: 13px;margin-left: 20upx;
	}
	
	.back_color{
		background-color: #FF4D4F;
	}
	.back_color:hover{
		background-color: #FF7172;
	}
	.show_image{
		width: 50%;height: 100upx;
	}
	.show_image:hover{
		transform: scale(1.3);
	}
</style>
