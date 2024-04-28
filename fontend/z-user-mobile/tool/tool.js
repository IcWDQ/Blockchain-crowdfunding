const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const h5Copy = function(content) {
	if (!document.queryCommandSupported('copy')) {
		// 不支持
		return false
	}
	let textarea = document.createElement("textarea")
	textarea.value = content
	textarea.readOnly = "readOnly"
	document.body.appendChild(textarea)
	textarea.select() // 选择对象
	textarea.setSelectionRange(0, content.length) //核心
	let result = document.execCommand("copy") // 执行浏览器复制命令
	textarea.remove()
	return result
}

const copy = (e) => {
	// #ifdef H5
	typeof(e) == 'number' ? e = JSON.stringify(e): '' //处理数字
	const result = h5Copy(e)
	msg(result ? '复制成功' : '复制失败')
	// #endif
	// #ifndef H5
	uni.setClipboardData({
		data: e,
		success: function() {
			msg('复制成功')
		}
	});
	// #endif
}

/// 双击
let clickNum = 0
const dblclick = (fn) => {
	clickNum++
	setTimeout(() => {
		if (clickNum >= 2) {
			console.log(clickNum)
			fn()
		}
		clickNum = 0
	}, 250)
}

const urlToBase64 = (url) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: 'GET',
			responseType: 'arraybuffer',
			success: res => {
				let base64 = uni.arrayBufferToBase64(res.data); //把arraybuffer转成base64
				// base64 = 'data:image/jpeg;base64,' + base64 //不加上这串字符，在页面无法显示的
				resolve(base64)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

const getQueryVariable = (key, url) => {
	var query = url.split('?')[1];
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == key) {
			return pair[1];
		}
	}
	return (false);
}

const jump = function(url) {
	uni.navigateTo({
		url: url
	})
}
const sjump = function(url) {
	uni.switchTab({
		url: url
	})
}
const navBack = function(delta=1) {
	uni.navigateBack({
		delta
	})
}
const reUrl = function(url) {
	uni.reLaunch({
		url: url
	})
}
export default {
	msg,
	copy,
	getQueryVariable,
	urlToBase64,
	dblclick,
	jump,
	sjump,
	navBack,
	reUrl
}
