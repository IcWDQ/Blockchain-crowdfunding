import http from './interface'
const apiList = {
	
	//register
	user_add: (data) => {
		return http.request({
			url: 'api/user/register',
			method: 'POST',
			data
		})
	},
	// 登录
	login: (data) => {
		return http.request({
			url: 'api/user/login',
			method: 'POST',
			data
		})
	},
	//获取我的资产
	getMoney: (data) => {
		return http.request({
			url: 'api/user/money',
			method: 'POST',
			data
		})
	},
	
	//充值
	addMoney: (data) => {
		return http.request({
			url: 'api/user/add_money',
			method: 'POST',
			data
		})
	},
	// 我的区块
	getAllBlock: (data) => {
		return http.request({
			url: 'api/user/user_block',
			method: 'POST',
			data
		})
	},
	// 为认证用户认证
	user_auth: (data) => {
		return http.request({
			url: 'api/user/user_auth',
			method: 'POST',
			data
		})
	},
	
	
	// 添加项目
	add_task: (data) => {
		return http.request({
			url: 'api/task/add_task',
			method: 'POST',
			data
		})
	},
	
	// 我的项目
	get_my_task: (data) => {
		return http.request({
			url: 'api/task/get_my_task',
			method: 'POST',
			data
		})
	},
	
	// 项目详情
	get_task_detail: (data) => {
		return http.request({
			url: 'api/task/get_task_detail',
			method: 'POST',
			data
		})
	},
	
	// 项目交流评论
	get_task_commet: (data) => {
		return http.request({
			url: 'api/task/get_comment',
			method: 'POST',
			data
		})
	},
	
	// 添加评论
	add_task_commet: (data) => {
		return http.request({
			url: 'api/task/add_comment',
			method: 'POST',
			data
		})
	},
	
	// 添加投诉
	add_task_tousu: (data) => {
		return http.request({
			url: 'api/task/add_tousu',
			method: 'POST',
			data
		})
	},
	
	//停止补仓接口
	timeOutAll: (data) => {
		return http.request({
			url: 'index.php/task/task_all/timeOut',
			method: 'POST',
			data
		})
	},
	//开启补仓接口
	setMsg: (data) => {
		return http.request({
			url: 'index.php/members/msg/setMsg',
			method: 'POST',
			data
		})
	},
	//开启补仓接口
	startTaskAll: (data) => {
		return http.request({
			url: 'index.php/task/task_all/startTask',
			method: 'POST',
			data
		})
	},
	//策略循环接口
	changeCircleTypeAll: (data) => {
		return http.request({
			url: 'index.php/task/task_all/changeCircleType',
			method: 'POST',
			data
		})
	},
	//清仓卖出接口
	batchLiquidationAll: (data) => {
		return http.request({
			url: 'index.php/task/task_all/batchLiquidation',
			method: 'POST',
			data
		})
	},
	//完全停止接口
	closeAll: (data) => {
		return http.request({
			url: 'index.php/task/task_all/close',
			method: 'POST',
			data
		})
	},

	//解仓接口
	Withdraw: (data) => {
		return http.request({
			url: 'index.php/members/user/Withdraw',
			method: 'POST',
			data
		})
	},
	//激活账户
	renew: (data) => {
		return http.request({
			url: 'index.php/members/user/renew',
			method: 'POST',
			data
		})
	},
	//累计盈利每个记录的详情
	getDayProfit: (data) => {
		return http.request({
			url: 'index.php/task/trade_order/getDayProfit',
			method: 'POST',
			data
		})
	},
	//配置接口
	getJobConfig: (data) => {
		return http.request({
			url: 'index.php/members/task/getJobConfig',
			method: 'POST',
			data
		})
	},
	//设置手续费最低
	SetUserInfo: (data) => {
		return http.request({
			url: 'index.php/members/user/SetUserInfo',
			method: 'POST',
			data
		})
	},
	/* =============================== */
	//标单验证
	getFromToken: (data) => {
		return http.request({
			url: 'index.php/members/task/getFromToken',
			method: 'POST',
			data
		})
	},
	//排行榜
	rank: (data) => {
		return http.request({
			url: 'index.php/members/task/rank',
			method: 'POST',
			data
		})
	},
	//删除授权
	deleteApiAuth: (data) => {
		return http.request({
			url: 'index.php/task/api_auth/deleteApiAuth',
			method: 'POST',
			data
		})
	},
	//获取系统参数
	coverUpTask: (data) => {
		return http.request({
			url: 'index.php/task/task/coverUpTask',
			method: 'POST',
			data
		})
	},
	//获取系统参数
	getJobConfig: (data) => {
		return http.request({
			url: 'index.php/members/task/getJobConfig',
			method: 'POST',
			data
		})
	},
	//绑定 API 教程的接口
	bind: (data) => {
		return http.request({
			url: 'index.php/members/task/help_bind',
			method: 'POST',
			data
		})
	},
	//手机号验证码登录
	userRegister: (data) => {
		return http.request({
			url: 'index.php/user/mobilelogin',
			method: 'POST',
			data
		})
	},
	// 获取验证码
	getCode: (data) => {
		return http.request({
			url: 'index.php/index.php/index/login/sendSms',
			method: 'POST',
			data
		})
	},
	//我的订单
	getMyMeal: (data) => {
		return http.request({
			url: 'index.php/meal/index/getMyMeal',
			method: 'POST',
			data
		})
	},
	//策略循环  1= 单次循环
	changeCircleType: (data) => {
		return http.request({
			url: 'index.php/task/task/changeCircleType',
			method: 'POST',
			data
		})
	},
	// 图形验证码
	getImgCode: (data) => {
		return http.request({
			url: 'index.php/members/task/getImgCode',
			method: 'POST',
			data
		})
	},
	// 协议接口
	getJobTreaty: (data) => {
		return http.request({
			url: 'index.php/members/task/getJobTreaty',
			method: 'POST',
			data
		})
	},
	// 注册
	register: (data) => {
		return http.request({
			url: 'index.php/members/login/register',
			method: 'POST',
			data
		})
	},
	// 退出登录
	logout: (data) => {
		return http.request({
			url: 'index.php/user/logout',
			method: 'GET',
			data
		})
	},
	
	// 忘记登录密码
	forgetPass: (data) => {
		return http.request({
			url: 'index.php/index.php/index/login/forgetPass',
			method: 'POST',
			data
		})
	},
	// 重置或修改密码
	forgetPassWord: (data) => {
		return http.request({
			url: 'index.php/members/login/forgetPassWord',
			method: 'POST',
			data
		})
	},
	// 发送短信
	GetMobileCode: (data) => {
		return http.request({
			url: 'index.php/members/login/GetMobileCode',
			method: 'POST',
			data
		})
	},
	// 设置支付密码
	setpaypwd: (data) => {
		return http.request({
			url: 'index.php/user/setpaypwd',
			method: 'POST',
			data
		})
	},
	// 忘记支付密码
	revisePayPassword: (data) => {
		return http.request({
			url: 'index.php/members/user/revisePayPassword',
			method: 'POST',
			data
		})
	},
	// 修改交易密码
	editpaypwd: (data) => {
		return http.request({
			url: 'index.php/user/editpaypwd',
			method: 'POST',
			data
		})
	},
	uploadImg: (data) => {
		return http.request({
			url: 'index.php/index.php/index/login/post_upload_one',
			method: 'POST',
			data
		})
	},
	//修改会员信息
	profile: (data) => {
		return http.request({
			url: 'index.php/user/profile',
			method: 'POST',
			data
		})
	},
	// 系统消息
	news: (data) => {
		return http.request({
			url: 'index.php/index.php/index/user/question',
			method: 'POST',
			data
		})
	},
	// 获取会员信息
	Center: (data) => {
		return http.request({
			url: 'index.php/members/user/Center',
			method: 'POST',
			data
		})
	},

	// 获取首页轮播图
	bannerData: (data) => {
		return http.request({
			url: 'index.php/index/index/bannerData',
			method: 'POST',
			data
		})
	},
	// 获取首页导航参数
	styleCateData: (data) => {
		return http.request({
			url: 'index.php/index/index/styleCateData',
			method: 'POST',
			data
		})
	},
	//邀请好友
	inviteUserPoster: (data) => {
		return http.request({
			url: 'index.php/members/user/inviteUserPoster',
			method: 'POST',
			data
		})
	},
	//绑定API教程
	helpBind: (data) => {
		return http.request({
			url: 'index.php/help/helpBind',
			method: 'GET',
			data
		})
	},
	// OkEx授权
	auth_okex: (data) => {
		return http.request({
			url: 'index.php/task/api_auth/auth_okex',
			method: 'POST',
			data
		})
	},
	// 币安授权授权
	auth_binance: (data) => {
		return http.request({
			url: 'index.php/task/api_auth/auth_binance',
			method: 'POST',
			data
		})
	},
	// api授权
	auth: (data) => {
		return http.request({
			url: 'index.php/task/api_auth/auth',
			method: 'POST',
			data
		})
	},
	//获取套餐
	getMeal: (data) => {
		return http.request({
			url: 'index.php/meal/index/getMeal',
			method: 'POST',
			data
		})
	},
	//购买套餐
	buyMeal: (data) => {
		return http.request({
			url: 'index.php/meal/index/buy',
			method: 'POST',
			data
		})
	},
	getMeal: (data) => {
		return http.request({
			url: 'index.php/meal/index/getMeal',
			method: 'POST',
			data
		})
	},
	//获取最新行情
	getLastQuotes: (data) => {
		return http.request({
			url: 'index.php/task/symbol/getLastQuotes',
			method: 'POST',
			data
		})
	},

	//获取推荐的币以及搜索的币
	getSymbolByHouseID: (data) => {
		return http.request({
			url: 'index.php/task/symbol/getSymbolByHouseID',
			method: 'POST',
			data
		})
	},
	//获取平台
	exchange_house: (data) => {
		return http.request({
			url: 'index.php/task/exchange_house/index',
			method: 'POST',
			data
		})
	},
	//关键词搜索交易对
	getSymbolByKeywords: (data) => {
		return http.request({
			url: 'index.php/task/symbol/getSymbolByKeywords',
			method: 'POST',
			data
		})
	},
	//获取策略
	policy: (data) => {
		return http.request({
			url: 'index.php/task/policy/index',
			method: 'POST',
			data
		})
	},
	//创建任务
	getPolicy: (data) => {
		return http.request({
			url: 'index.php/task/task/getPolicy',
			method: 'POST',
			data
		})
	},
	//创建任务
	create: (data) => {
		return http.request({
			url: 'index.php/task/task/create',
			method: 'POST',
			data
		})
	},
	//修改策略
	editTask: (data) => {
		return http.request({
			url: 'index.php/task/task/editTask',
			method: 'POST',
			data
		})
	},
	//获取任务列表
	getTaskList: (data) => {
		return http.request({
			url: 'index.php/task/task/getTaskList',
			method: 'POST',
			data
		})
	},
	//获取任务详情
	getTaskDetail: (data) => {
		return http.request({
			url: 'index.php/task/task/getTaskDetail',
			method: 'POST',
			data
		})
	},
	// 根据任务获取订单列表
	getOrderByTaskID: (data) => {
		return http.request({
			url: 'index.php/task/trade_order/getOrderByTaskID',
			method: 'POST',
			data
		})
	},
	// 根据任务获取订单列表
	getAllOrder: (data) => {
		return http.request({
			url: 'index.php/task/trade_order/getAllOrder',
			method: 'POST',
			data
		})
	},
	//暂停任务
	timeOut: (data) => {
		return http.request({
			url: 'index.php/task/task/timeOut',
			method: 'POST',
			data
		})
	},
	//继续买入
	startBuy: (data) => {
		return http.request({
			url: 'index.php/task/task/startBuy',
			method: 'POST',
			data
		})
	},
	//开启任务
	startTask: (data) => {
		return http.request({
			url: 'index.php/task/task/startTask',
			method: 'POST',
			data
		})
	},
	//删除任务
	deleteTask: (data) => {
		return http.request({
			url: 'index.php/task/task/deleteTask',
			method: 'POST',
			data
		})
	},
	//关闭任务
	closeTask: (data) => {
		return http.request({
			url: 'index.php/task/task/close',
			method: 'POST',
			data
		})
	},
	//一键平仓
	batchLiquidation: (data) => {
		return http.request({
			url: 'index.php/task/task/batchLiquidation',
			method: 'POST',
			data
		})
	},

	//获取订单列表
	getOrderByPage: (data) => {
		return http.request({
			url: 'index.php/trade_order/getOrderByPage',
			method: 'GET',
			data
		})
	},
	//我的体验卡
	getMyCard: (data) => {
		return http.request({
			url: 'index.php/meal/card/getMyCard',
			method: 'POST',
			data
		})
	},
	//赠送体验卡
	give: (data) => {
		return http.request({
			url: 'index.php/meal/card/give',
			method: 'POST',
			data
		})
	},
	//使用体验卡
	use: (data) => {
		return http.request({
			url: 'index.php/meal/card/use',
			method: 'POST',
			data
		})
	},
	//我的社区
	getPushOrTeamUser: (data) => {
		return http.request({
			url: 'index.php/members/user/getPushOrTeamUser',
			method: 'POST',
			data
		})
	},
	//获取消息列表
	getMessage: (data) => {
		return http.request({
			url: 'index.php/message/getMessage',
			method: 'GET',
			data
		})
	},
	//获取消息详情
	getMessageDetail: (data) => {
		return http.request({
			url: 'index.php/message/getMessageDetail',
			method: 'GET',
			data
		})
	},
	//充值记录
	rechargeLog: (data) => {
		return http.request({
			url: 'index.php/wallet/index/rechargeLog',
			method: 'POST',
			data
		})
	},
	//获取提币记录
	withdrawal_log: (data) => {
		return http.request({
			url: 'index.php/wallet/index/withdrawal_log',
			method: 'POST',
			data
		})
	},
	//流水记录
	credit_log: (data) => {
		return http.request({
			url: 'index.php/members/user/credit_log',
			method: 'POST',
			data
		})
	},
	//获取充币温馨提示
	getRechargeNotice: (data) => {
		return http.request({
			url: 'index.php/common/getRechargeNotice',
			method: 'GET',
			data
		})
	},
	//获取提币温馨提示
	getWithdrawNotice: (data) => {
		return http.request({
			url: 'index.php/common/getWithdrawNotice',
			method: 'GET',
			data
		})
	},
	// 获取最新公告
	getLastNotice: (data) => {
		return http.request({
			url: 'index.php/members/index/getLastNotice',
			method: 'POST',
			data
		})
	},
	//获取公告详情
	getNoticeDetail: (data) => {
		return http.request({
			url: 'index.php/members/index/getNoticeDetail',
			method: 'POST',
			data
		})
	},
	//获取公告详情
	getNoticeList: (data) => {
		return http.request({
			url: 'index.php/members/index/getNoticeList',
			method: 'POST',
			data
		})
	},
	//资讯列表
	article: (data) => {
		return http.request({
			url: 'index.php/members/article/index',
			method: 'POST',
			data
		})
	},
	//资讯列表
	articleDeatil: (data) => {
		return http.request({
			url: 'index.php/members/article/detail',
			method: 'POST',
			data
		})
	},
	//获取客服内容
	getHelp: (data) => {
		return http.request({
			url: 'index.php/help/getHelp',
			method: 'POST',
			data
		})
	},
	//提币
	withdrawal: (data) => {
		return http.request({
			url: 'index.php/wallet/index/withdrawal',
			method: 'POST',
			data
		})
	},
	//获取钱包地址
	getWallet: (data) => {
		return http.request({
			url: 'index.php/wallet/index/getWallet',
			method: 'POST',
			data
		})
	},
	//获取提币的相关配置信息
	getWithdrawInfo: (data) => {
		return http.request({
			url: 'index.php/withdraw_log/getWithdrawInfo',
			method: 'POST',
			data
		})
	},
	//互转
	mutual_transfer: (data) => {
		return http.request({
			url: 'index.php/wallet/index/mutual_transfer',
			method: 'POST',
			data
		})
	},
	//获取我的资产
	getWalletCredit: (data) => {
		return http.request({
			url: 'index.php/wallet/index/getWalletCredit',
			method: 'POST',
			data
		})
	},
	//获取我的资产
	getMyAssets: (data) => {
		return http.request({
			url: 'index.php/user/getMyAssets',
			method: 'POST',
			data
		})
	},
	//修改用户信息
	SetUserInfo: (data) => {
		return http.request({
			url: 'index.php/members/user/SetUserInfo',
			method: 'POST',
			data
		})
	},
	//忘记登录密码
	revisePassword: (data) => {
		return http.request({
			url: 'index.php/members/user/revisePassword',
			method: 'POST',
			data
		})
	},

	//海报的二维码
	createPoster: (data) => {
		return http.request({
			url: 'index.php/user/createPoster',
			method: 'GET',
			data
		})
	},
	// 电子账单
	getBill: (data) => {
		return http.request({
			url: 'index.php/members/user/getBill',
			method: 'POST',
			data
		})
	},
	// 玩法指南
	help: (data) => {
		return http.request({
			url: 'index.php/task/help/index',
			method: 'POST',
			data
		})
	},
	//日志
	tradeSellLog: (data) => {
		return http.request({
			url: 'index.php/task/task/tradeSellLog',
			method: 'POST',
			data
		})
	},
	// getAllOrder
}
export default apiList
