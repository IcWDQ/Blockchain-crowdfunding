<template name='person_admin'>
	<view>
		<view style="width: 100%;height: 90%;display: flex;justify-content: center;align-items: center;">
			<view style="width: 96%;height: 95%;background-color: #FFFFFF;box-shadow: 1px 1px 5px #C0C0C0;padding-top: 20upx;">
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
						<checkbox :checked="choose_all_" @click="choose_all" style="transform:scale(0.7);width: 5%;"/>
						<view style="width: 5%;">
							账号
						</view>
						<view style="width: 5%;">
							资产
						</view>
						<view style="width: 20%;">
							是否通过认证
						</view>
						<view style="width: 20%;">
							认证信息（认证信息全部在这里）
						</view>
						<view style="width: 20%;">
							认证资料（认证信息各种文件）
						</view>
						<view style="width: 10%;">
							创建时间
						</view>
						<view style="width: 20%;">
							操作
						</view>
					</view>
					<checkbox-group @change="checkbox_change" style="width: 90%;display: flex;flex-direction: column;justify-content: center;align-items: center;">
					<view v-for="(item,index) in PersonList" :key=index class="list_detail" style="">
						<checkbox :value="item.id.toString()" :checked='checkbox' style="transform:scale(0.7);width: 5%;"/>
						<view style="width: 8%;">
							{{item.name}} 
						</view>
						<view style="width: 2%;">
							{{item.zichan || 0}} 
						</view>
						<view style="width: 20%;">
							{{item.is_valid}}
						</view>
						<view style="width: 20%;">
							{{item.info}}
						</view>
						<view style="width: 20%;">
							{{item.info_file}}
						</view>
						<view style="width: 10%;">
							{{item.add_time}}
						</view>
						<view style="width: 20%;display: flex;flex-direction: row;">
							<view v-if="item.is_valid=='否'" @click="alter(item)" class="alter" style="">
								审核
							</view>
							<view v-if="item.is_valid=='是'"  class="alter" style=" color: brown;">
								已审核
							</view>
							<view @click="download(item)" class="delete" style="">
								下载资料
							</view>
							<!-- <view @click="delete_detail(item)" class="delete" style="">
								删除
							</view> -->
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
							<view @click="change_page(items)" v-for="(items,indexs) in PageNum" :key=indexs :class="NowPage==items?'page':'nopage'">
								{{items}}
							</view>
							<image @click="page_add" src="../../static/right.png" class="right"></image>
						</view>
					</view>
				</view>
				<!-- 数据列表end -->
			</view>
		</view>
		<!-- 编辑遮罩层 -->
		<uni-popup ref="popup" type="center">
		    <view style="width: 500upx;display: flex;background-color: #FFFFFF;flex-direction: column;box-shadow: 1px 1px 1px #808080;border-radius: 2upx;">
		        <view style="border-bottom: 1px solid #DCDFE6;font-size: 18px;display: flex;flex-direction: row;padding: 20upx;width: 460upx;align-items: center;">
					<view>
						创建者审核
					</view>
					<image class='alter_sure' @tap="close" src="../../static/close.png" style="margin-left: auto;height: 15upx;width: 15upx;padding: 5upx;"></image>
				</view>
		        <view style="border-bottom: 1px solid #DCDFE6;color: #606266;font-size: 15px;width: 440upx;padding: 30upx;display: flex;flex-direction: column;justify-content: center;align-items: center;">
					
					<view style="width: 360upx;padding: 15upx;display: flex;flex-direction: row;align-items: center;">
						<view style="color: red;">
							*已完成资料审核并同意该账号在系统中创建众筹项目*
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
		<!-- end -->
		<!-- 添加遮罩层 -->
		<uni-popup ref="popup1" type="center">
		    <view style="width: 500upx;display: flex;background-color: #FFFFFF;flex-direction: column;box-shadow: 1px 1px 1px #808080;border-radius: 2upx;">
		        <view style="border-bottom: 1px solid #DCDFE6;font-size: 18px;display: flex;flex-direction: row;padding: 20upx;width: 460upx;align-items: center;">
					<view>
						添加
					</view>
					<image class="alter_sure" @tap="add_cancel" src="../../static/close.png" style="margin-left: auto;height: 15upx;width: 15upx;"></image>
				</view>
		        <view style="border-bottom: 1px solid #DCDFE6;color: #606266;font-size: 15px;width: 440upx;padding: 30upx;display: flex;flex-direction: column;justify-content: center;align-items: center;padding: 5upx;">
					
					<view style="width: 360upx;padding: 15upx;display: flex;flex-direction: row;align-items: center;">
						<view style="color: red;">
							*
						</view>
						账号
						<input v-model="add_accout" @click='confirm2' :class="input_confirm==2?'input_confirm':'input_account'" class="" style="" />
					</view>
					<view style="width: 360upx;padding: 15upx;display: flex;flex-direction: row;align-items: center;">
						<view  style="color: red;">
							*
						</view>
						密码
						<input v-model="add_password" @click='confirm3' class="" :class="input_confirm==3?'input_confirm':'input_account'" style="" />
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
				c_id: '',
				c_name:'',
				c_info: '',
				
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
				name:'认证审核',
				
			}
		},
		 // 此处定义传入的数据
		props: {
		    PersonList: {
		        type: Array,
		        value: []
		    },
			Num: {
			    type: Number,
			    value: null
			},
			PageNum: {
			    type: Number,
			    value: null
			}
		},
		
		methods:{
			download(item){
				var that = this
				// 在按钮的点击事件处理函数中执行以下代码
				uni.downloadFile({
				    url: 'https://dcdn.thecover.cn/cloud/YfmwacnLnh', // 文件的URL地址
				    success: (data) => {
				        if (data.statusCode === 200) {
				            // 文件保存到本地
							var oA = document.createElement("a");
							oA.download = item.name+'的文件.jpg'; // 设置下载的文件名
							oA.href = data.tempFilePath; //临时路径再保存到本地
							document.body.appendChild(oA);
							oA.click();
							oA.remove();
						
				            uni.showModal({
				            	content:'下载成功',
				            	showCancel: false,
				            })
				        } else {
				            // 下载失败，可以在此处添加错误处理
				           uni.showModal({
				           	content:'下载失败',
				           	showCancel: false,
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
							model_name:'car_person',
							where:'[["user_num", "LIKE","'+that.search_word+'"]]',
							app_key:'0B4163C86181759DD5DE6C761AF719A5',
							service:'App.Table.FreeQuery',
							perpage:10, //每一页12个数据
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
						model_name:'car_person',
						where:'[["user_num", "LIKE","'+that.search_word+'"]]',
						app_key:'0B4163C86181759DD5DE6C761AF719A5',
						service:'App.Table.FreeQuery',
						perpage:10000, //每一页12个数据
						
					},					
					success: function (res) {
							that.Num = res.data.data.list.length
							that.PageNum = Math.ceil(that.Num / 10); //向上整除
							console.log(that.PageNum)
						}
					})
			},
			add_sure:function(){
				var that = this
				console.log(that.c_id)
				// 手机号正则
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.add_accout))) {
				     uni.showToast({
				        icon: 'none',
				        title: '手机号不正确'
				    });
				    return;
				}else{
					// 密码正则
					if (!(/^\d{6}$/.test(that.add_password))) {
					    uni.showToast({
					        icon: 'none',
					        title: '密码不是六位数字！'
					    });
					    return;
					}else{
						uni.request({
							url:'https://hn216.api.yesapi.cn/?s=App.Table.CheckCreate',
								data:{
									model_name:'car_person',
									app_key:'0B4163C86181759DD5DE6C761AF719A5',
									service:'App.Table.CheckCreate',
									data:{
										'user_num':that.add_accout,
										'user_pass':that.add_password,
									},
									check_field:"user_num",
								},
								
								success: function (res) {
									console.log('成功')
									console.log(res)
									that.add_accout = ''
									that.add_password = ''
									that.$refs.popup1.close()
									uni.showToast({
										title:'添加成功！',
										icon:'none'
									})
									that.refresh()
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
														model_name:'car_person',
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
													model_name:'car_person',
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
				    content: '确定要删除吗？',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							
							uni.request({
								url:'https://hn216.api.yesapi.cn/?s=App.Table.FreeDelete',
									method: "POST",
									data:{
										model_name:'car_person',
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
						model_name:'car_person',
						where:'[["user_num", "LIKE","'+that.search_word+'"]]',
						app_key:'0B4163C86181759DD5DE6C761AF719A5',
						service:'App.Table.FreeQuery',
						perpage:10, //每一页12个数据
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
						model_name:'car_person',
						where:'[["user_num", "LIKE","'+that.search_word+'"]]',
						app_key:'0B4163C86181759DD5DE6C761AF719A5',
						service:'App.Table.FreeQuery',
						perpage:10000, //每一页12个数据
						
					},					
					success: function (res) {
							that.Num = res.data.data.list.length
							that.PageNum = Math.ceil(that.Num / 10); //向上整除
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
				// 手机号正则
				uni.showModal({
					title:'请再次检查！',
					content: '用户ID: '+ this.c_id +'\n' + '用户名: '+ this.c_name +'\n' + '用户信息: ' + this.c_info,
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
			alter:function(item){
				this.$refs.popup.open()
				console.log(item)
				this.c_id = item.id
				this.c_name = item.name
				this.c_info = item.info
			},
			
			change_page:function(e){
				console.log(e)
				var that = this
				that.NowPage = e
				that.checkbox = false
				that.checkbox_status =[]
				uni.request({
					url:'https://hn216.api.yesapi.cn/',
					method: "POST",
					data:{
						model_name:'car_person',
						where:'[["user_num", "LIKE","'+that.search_word+'"]]',
						app_key:'0B4163C86181759DD5DE6C761AF719A5',
						service:'App.Table.FreeQuery',
						perpage:10, //每一页12个数据
						page:e, //第几页
						// order: ["id DESC"],
					},					
					success: function (res) {
							// console.log(res.data.data.list)
							that.PersonList = res.data.data.list
							console.log(that.PersonList)
						}
					})
			},
			page_delete:function(){
				var that = this
				if(that.NowPage<=1){
					console.log('不合格')
					alert('已经是首页了！')
				}else{
					that.NowPage = that.NowPage-1
					uni.request({
						url:'https://hn216.api.yesapi.cn/',
						method: "POST",
						data:{
							model_name:'car_person',
							where:'[["user_num", "LIKE","'+that.search_word+'"]]',
							app_key:'0B4163C86181759DD5DE6C761AF719A5',
							service:'App.Table.FreeQuery',
							perpage:10, //每一页12个数据
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
					uni.request({
						url:'https://hn216.api.yesapi.cn/',
						method: "POST",
						data:{
							model_name:'car_person',
							where:'[["user_num", "LIKE","'+that.search_word+'"]]',
							app_key:'0B4163C86181759DD5DE6C761AF719A5',
							service:'App.Table.FreeQuery',
							perpage:10, //每一页12个数据
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
	.alter_sure:hover{
		border: 1upx solid #C8C7CC;
	}
	.alter_sure{
		margin-left: auto;height: 15upx;width: 15upx;padding: 5upx;
		border: 1px solid #FFFFFF;}
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
</style>
