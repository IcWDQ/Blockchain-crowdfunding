import http from './interface'
const apiList = {
	
	//注册
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
	
	//获取任务列表
	getTaskList: (data) => {
		return http.request({
			url: 'api/task/get_task_main',
			method: 'POST',
			data
		})
	},
	
	//各状态任务列表
	getTaskOne: (data) => {
		return http.request({
			url: 'api/task/get_task_list',
			method: 'POST',
			data
		})
	},
	
	//新闻列表
	getNews: (data) => {
		return http.request({
			url: 'api/task/get_news',
			method: 'POST',
			data
		})
	},
	//列表
	getIndexTask: (data) => {
		return http.request({
			url: 'api/task/get_index_tasks',
			method: 'POST',
			data
		})
	},
	//投资项目
	task_touzi: (data) => {
		return http.request({
			url: 'api/task/task_touzi',
			method: 'POST',
			data
		})
	},
	
	
	
	
}
export default apiList