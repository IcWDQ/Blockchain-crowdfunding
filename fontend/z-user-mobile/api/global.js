var baseUrl = ""

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'production') {
	/* 生产环境 */
	// baseUrl = "http://127.0.0.1:10040/"
	baseUrl = "http://124.222.186.235:10040/"
} else {
	/* 开发环境 */
	// baseUrl = "http://127.0.0.1:10040/"
	baseUrl = "http://124.222.186.235:10040/"
}

export default {
	baseUrl
}
