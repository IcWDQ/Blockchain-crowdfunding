/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */
import tool from '../tool/tool'
import global from './global.js'
export default {
	config: {
		baseUrl: global.baseUrl,
		header: {
			'Content-Type': 'application/json;charset=UTF-8'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		data: {},
		method: "GET",
		dataType: "json",
		/* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		if (!options) {
			options = {}
		}
		let token = uni.getStorageSync('token')
		let requestType = options.url.split('/')
		let typeVal = requestType[requestType.length - 1]
		// console.log(typeVal)
		if (typeVal !== 'userLogin' && typeVal !== 'register' && typeVal !== 'sendSms') {
			this.config.header.Authorization = token
		} else {
			delete this.config.header.Authorization
		}
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method

		return new Promise((resolve, reject) => {
			uni.showLoading()
			let _config = null
			options.complete = (response) => {
				uni.hideLoading()
				let statusCode = response.statusCode
				response.config = _config
				if (process.env.NODE_ENV === 'development') {
					if (statusCode === 200) {
						// console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
					}
				}
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				// 统一的响应日志记录
				// _reslog(response)
				let {
					code,
					msg
				} = response.data
	
				if (response.data.code == 401) {
					tool.msg(msg)
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}, 1000)
					reject(response)
				} else if (code == 0) {
					tool.msg(msg)
					// setTimeout(() => {
					// 	uni.reLaunch({
					// 		url: '/pages/login/login'
					// 	})
					// }, 1000)
					resolve(response.data)
					// reject(response)
				} else {
					resolve(response.data)
				}
			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}

			uni.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}