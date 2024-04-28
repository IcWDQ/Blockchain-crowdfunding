<template>
	<view style="display: flex;flex-direction: row;">
		<!-- 管理功能选项栏 -->
		<view style="display: flex;flex-direction: column;width: 220upx;background-color: #001529;">
			<image src="../../static/admin.png" mode="aspectFill" class="admin_pic"></image>
			<view v-for="(item,index) in functionList" :key=index>
				<view style="margin-top: 20upx;padding: 20upx;width: 180upx;display: flex;flex-direction: row;color: #FFFFFF;font-size: 15px;align-items: center;">
					<image :src="item.icon" style="width: 15upx;height: 15upx;margin-right: 5upx;"></image>
					{{item.name}}
					<image src="../../static/arrow.png" class="arrow"></image>
				</view>
				<view v-for="(items,indexs) in item.page" @click="menu_change(items)" :key=indexs :class="menu_id==items.id?'choose_detail':'detail'">
					{{items.name}}
				</view>
			</view>
		</view>
		<!-- 管理功能选项栏end -->
		<!-- 管理具体界面 -->
		<scroll-view scroll-y='true' style="background-color: #F6F8F9;width: 100%;height: 100vh;">
			<view style="box-shadow: -1px -1px 5px #888888;width: 100%;background-color: #FFFFFF;height: 50upx;display: flex;flex-direction: row;align-items: center;font-size: 17px;">
				<image src="../../static/admin1.png" style="width: 20upx;height: 20upx;margin-left: 25upx;"></image>
				<view style="margin-left: 5upx;">
					后台管理
				</view>
				<view style="margin-left: 5upx;display: flex;justify-content: center;align-items: center;">
					<image src="../../static/arrow1.png" class="arrow1"></image>
				</view>
				<view style="margin-left: 5upx;">
					{{name}}
				</view>
				<image src="http://t7.baidu.com/it/u=1880899253,2364657333&fm=193" style="width: 40upx;height: 40upx;border-radius: 50%;margin-left: auto;"></image>
				<view style="color: #6C6E72;font-weight: bold;padding: 0 10upx 0 10upx;">
					admin
				</view>
				<image src="../../static/arrow2.png" class="arrow1" style="margin-right: 10upx;"></image>
			</view>
			<swiper :current='menu_id' disable-touch=true style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;">
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 98vh;">
						<!-- 人员管理id=0 -->
						<person_admin :PageNum='PageNum' :Num='Num' :PersonList='PersonList' style="margin-top: -30upx;width: 100%;height: 90%;display: flex;justify-content: center;align-items: center;"></person_admin>
						<!-- 人员管理end-->
					</scroll-view>
					
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 98vh;">
						<!-- 管理员管理id=1 -->
						<person_admin :PageNum='PageNum' :Num='Num' :PersonList='PersonList' style="margin-top: -30upx;width: 100%;height: 90%;display: flex;justify-content: center;align-items: center;"></person_admin>
						<!-- 管理员管理end-->
					</scroll-view>
					
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 105vh;">
						<!-- 商城商品管理id=2 -->
						<Project :PageNum='PageNum_shop' :pageList='pageList' :Num='Num_shop'  style="margin-top: -30upx;width: 100%;height: 90%;display: flex;justify-content: center;align-items: center;"></Project>
						<!-- 商城商品管理end-->
					</scroll-view>
					
				</swiper-item>
				<swiper-item style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
					<scroll-view scroll-y="true" style="height: 98vh;">
						<!-- 商城商品管理id=3 -->
						<Lcb :PageNum='PageNum_shop' :pageList='lcbList' :Num='Num_shop' :PersonList='lcbList' style="width: 100%;"></Lcb>
						<!-- 商城商品管理end-->
						
					</scroll-view>
					
				</swiper-item>
				
				<swiper-item style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
					<scroll-view scroll-y="true" style="height: 98vh;">
						<!-- 商城商品管理id=3 -->
						<tousu :PageNum='PageNum_shop' :pageList='pageList' :Num='Num_shop' :PersonList='tousuList' style="width: 100%;"></tousu>
						<!-- 商城商品管理end-->
						
					</scroll-view>
					
				</swiper-item>
				
				<swiper-item style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
					<scroll-view scroll-y="true" style="height: 98vh;">
						<!-- 商城商品管理id=3 -->
						<blockchain :PageNum='PageNum_shop' :pageList='chainList' :Num='Num_shop' :PersonList='chainList' style="width: 100%;"></blockchain>
						<!-- 商城商品管理end-->
						
					</scroll-view>
					
				</swiper-item>
				
				<swiper-item style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
					<scroll-view scroll-y="true" style="height: 98vh;">
						<!-- 商城商品管理id=3 -->
						<contract :PageNum='PageNum_shop' :pageList='contractList' :Num='Num_shop' :PersonList='contractList' style="width: 100%;"></contract>
						<!-- 商城商品管理end-->
						
					</scroll-view>
					
				</swiper-item>
			</swiper>
			
		</scroll-view>
		<!-- 管理具体界面end -->
		
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import person_admin from "@/components/admin-components/person_admin.vue"
	import Project from "@/components/admin-components/project.vue"
	import Lcb from "@/components/admin-components/lcb.vue"
	import tousu from "@/components/admin-components/tousu.vue"
	import contract from "@/components/admin-components/contract.vue"
	import blockchain from "@/components/admin-components/blockchain.vue"
	
	export default{
		components: {
			uniPopup,
			person_admin,
			Project,
			Lcb,
			tousu,
			contract,
			blockchain
			
		},
		data(){
			return{
				menu_id:0,
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
				functionList:[
					{
						name:'人员审核',
						icon:'/static/personAdmin.png',
						// id:1,
						open:false,
						page:[
							{
								name:'认证审核',
								id:0
							},
							// {
							// 	name:'admin管理',
							// 	id:1
							// }
						]
					},
					{
						name:'项目管理',
						icon:'/static/shopAdmin.png',
						// id:4,
						open:false,
						page:[
							{
								name:'项目初审',
								id:2
							},
							{
								name:'里程碑审查',
								id:3
							},
							{
								name:'项目投诉',
								id:4
							}
						]
					},
					{
						name:'区块链查看',
						icon:'/static/shopAdmin.png',
						// id:4,
						open:false,
						page:[
							{
								name:'上链记录',
								id:5
							},
							{
								name:'合约记录',
								id:6
							},
						]
					}
				],
				// 人员管理数据
				PersonList:[],
				Num:1,
				PageNum:1,
				// 人员管理数据end
				
				// 商品管理数据
				ShopList:[],
				Num_shop:1,
				PageNum_shop:1,
				// 商品管理数据end
				pageList:[],
				AdminList:[],
				
				RecomList:[],
				contractList:[{'pre_hash':'cccccccccccc','hash': 'qqqqqqqqqqqqq', 'content': '用户xx投资xx2000', 'relevant_personnel': ['用户id: 1','项目id: 233'], 'add_time': '2022-22-22'},
				{'pre_hash':'qqqqqqqqqqqqq','hash': 'xxxxxxxxxxxxx', 'content': '用户xx投资XXX 2000', 'relevant_personnel': ['用户id: 1','项目id: 234'], 'add_time': '2022-22-22'},
				],
				
				chainList:[{'pre_hash':'0','hash': 'aaaaaaaaaaaaaaaaaa', 'content': '用户xx充值2000', 'relevant_personnel': ['用户id: 1','资金托管'], 'add_time': '2022-22-22'},
				{'pre_hash':'aaaaaaaaaaaaaaaaaa','hash': 'bbbbbbbbbbbbbb','content':'用户xxx充值1000', 'relevant_personnel': ['用户id: 2','资金托管'], 'add_time': '2022-22-22'},
				{'pre_hash':'bbbbbbbbbbbbbb','hash': 'cccccccccccc', 'content': '用户xx充值2000', 'relevant_personnel': ['用户id: 1','资金托管'], 'add_time': '2022-22-22'},
				{'pre_hash':'cccccccccccc','hash': 'qqqqqqqqqqqqq', 'content': '用户xx投资xx2000', 'relevant_personnel': ['用户id: 1','项目id: 233'], 'add_time': '2022-22-22'},
				{'pre_hash':'qqqqqqqqqqqqq','hash': 'xxxxxxxxxxxxx', 'content': '用户xx投资XXX 2000', 'relevant_personnel': ['用户id: 1','项目id: 234'], 'add_time': '2022-22-22'},
				{'pre_hash':'xxxxxxxxxxxxx','hash': 'addddddddddddddddddd', 'content': '用户xx充值2000', 'relevant_personnel': ['用户id: 1','资金托管'], 'add_time': '2022-22-22'},]
				,
				
				lcbList: [{'id': 1, 'name': '硬件检测系统', 'lcb_goal':'里程碑目标1：完成硬件设计', 'lcb_amount':'10000','lcb_now':'10000', 'lcb_status':'已完成已放款'},
						  {'id': 1, 'name': '硬件检测系统', 'lcb_goal':'里程碑目标1：完成软件设计', 'lcb_amount':'10000','lcb_now':'10000', 'lcb_status':'已完成未放款'},
						  {'id': 1, 'name': '硬件检测系统', 'lcb_goal':'里程碑目标2：完成软硬件开发', 'lcb_amount':'60000','lcb_now':'2230', 'lcb_status':'正在进行'},
						  {'id': 1, 'name': '硬件检测系统', 'lcb_goal':'里程碑目标3：完成软硬件部署上线', 'lcb_amount':'30000','lcb_now':'0', 'lcb_status':'暂未开始'},
						  {'id': 1, 'name': '硬件检测系统', 'lcb_goal':'里程碑目标4：完成4个大客户销售', 'lcb_amount':'130000','lcb_now':'0', 'lcb_status':'暂未开始'},
						  {'id': 2, 'name': '人脸识别程序', 'lcb_goal':'里程碑目标1：完成小程序开发、上线、部署', 'lcb_amount':'3000','lcb_now':'125', 'lcb_status':'已超时'}
				]
			}
		},
		onLoad() {
			var that = this
			// 获取人员数据
			this.PersonList = [{id: 123312, name:'待审人员',is_valid: '否', info:'qq:1231, wx:12313, address:qeqeqwe, title：dwd', info_file:'http://213123.daw.ad\n https:dawdad', add_time:'2020-20-20'} ,
			{id: 123312, name:'待审人员2',is_valid: '是', info:'qq:1231, wx:12313, address:qeqeqwe, title：dwd', info_file:'http://213123.daw.ad\n https:dawdad', add_time:'2020-20-20'} ]
			this.pageList = [{id:213,status: '未通过', cjz:'姓名：张三 | 职业：教师 | 年入：20W |达瓦安慰哇大王大王大大晚点阿瓦达安慰大王达瓦的阿瓦达安慰的啊晚点啊大 ',xm:'该羡慕是pageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageListpageList',lcb:'里程碑1目标：我哇大王 我我阿达我。金额：30000 。时间：2022-2-1到2023-2-1| 里程碑2目标：大碗大碗的阿瓦达安慰啊 啊的。金额：40000。时间：2022-2-1到2023-2-1| 里程碑3目标：21312大大撒大大哇大。金额：30000。时间：2022-2-1到2023-2-1'},
			{id:213,status:'通过',cjz:'姓名：李四 | 职业：呵呵 | 年入：10W |达瓦安慰的啊晚点啊大 ',xm:'该羡慕是pageListpabucuo',lcb:'里程碑1目标：我哇大王 我我阿达我。金额：30000 。时间：2022-2-1到2023-2-1| 里程碑2目标：大碗大碗的阿瓦达安慰啊 啊的。金额：40000。时间：2022-2-1到2023-2-1| 里程碑3目标：21312大大撒大大哇大。金额：30000。时间：2022-2-1到2023-2-1'}]
			this.tousuList = [{id:1,name:'基于审核的夏季系统', user_name:'18323680105', content:'这个项目是假的我投入了7K打水漂',add_time:'2020-12-12'}]
			// this.PersonList = [{name:'测试人员',is_valid: '日', info:'qq:1231', info_file:'http://213123.daw.addad', add_time:'2020-20-20'} ]
		
			// uni.request({
			// 	url:'https://hn216.api.yesapi.cn/',
			// 	method: "POST",
			// 	data:{
			// 		model_name:'car_person',
			// 		where:'[["user_num", "LIKE","'+that.search_word+'"]]',
			// 		app_key:'0B4163C86181759DD5DE6C761AF719A5',
			// 		service:'App.Table.FreeQuery',
			// 		perpage:10, //每一页12个数据
			// 		page:1, //第几页
			// 		// order: ["id DESC"],
			// 	},					
			// 	success: function (res) {
			// 			// console.log(res.data.data.list)
			// 			that.PersonList = res.data.data.list
			// 			console.log(that.PersonList)
			// 		}
			// 	})
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
				// 获取商品数据
				uni.request({
					url:'https://hn216.api.yesapi.cn/',
					method: "POST",
					data:{
						model_name:'food_info',
						where:'[["food_name", "LIKE","'+that.search_word+'"]]',
						app_key:'0B4163C86181759DD5DE6C761AF719A5',
						service:'App.Table.FreeQuery',
						perpage:5, //每一页12个数据
						page:1, //第几页
						// order: ["id DESC"],
					},					
					success: function (res) {
							// console.log(res.data.data.list)
							that.ShopList = res.data.data.list
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
								that.Num_shop = res.data.data.list.length
								that.PageNum_shop = Math.ceil(that.Num_shop / 5); //向上整除
								if(that.PageNum_shop<=10){
									for(var i = 1;i < 11;i++){
										that.pageList.push(i)
									}
								}else{
									for(var i = 1;i < 7;i++){
										that.pageList.push(i)
									}
									that.pageList.push('...')
									that.pageList.push(that.PageNum_shop)
								}
								
							}
						})
									

		},
		methods:{
			menu_change:function(e){
				var that = this
				that.menu_id = e.id
				that.name = e.name
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
				console.log(that.accout)
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
				that.choose_all_ = false
				that.checkbox = false
				
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
										
										that.checkbox_status =[]
										uni.showToast({
										    icon: 'none',
										    title: '删除成功'
										});
										
										that.refresh()
									}
								})								

				        } else if (res.cancel) {
				            console.log('用户点击取消');
							
							that.checkbox_status =[]
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
				console.log(that.accout)
				// 手机号正则
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.accout))) {
				     uni.showToast({
				        icon: 'none',
				        title: '手机号不正确'
				    });
				    return;
				}else{
					// 密码正则
					if (!(/^\d{6}$/.test(that.password))) {
					    uni.showToast({
					        icon: 'none',
					        title: '密码不是六位数字！'
					    });
					    return;
					}else{
						uni.request({
							url:'https://hn216.api.yesapi.cn/?s=App.Table.CheckCreateOrUpdate',
								data:{
									model_name:'car_person',
									app_key:'0B4163C86181759DD5DE6C761AF719A5',
									service:'App.Table.CheckCreateOrUpdate',
									data:{
										'user_num':that.accout,
										'user_pass':that.password,
										'id':that.person_id
									},
									check_field:"id",
									
								},
								
								success: function (res) {
									console.log('成功')
									console.log(res)
									that.$refs.popup.close()
									uni.showToast({
										title:'修改成功！',
										icon:'none'
									})
									that.refresh()
								}
							})
					} 
				}
				
								

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
			alter:function(e){
				this.$refs.popup.open()
				console.log(e)
				this.password = e.user_pass
				this.accout = e.user_num
				this.add_time = e.add_time
				this.person_id = e.id
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
	.choose_detail{
		padding: 20upx 20upx 20upx 40upx;
		width: 160upx;
		display: flex;
		flex-direction: row;
		color: #FFFFFF;
		font-size: 15px;
		align-items: center;
		background-color: #1890FF;
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
