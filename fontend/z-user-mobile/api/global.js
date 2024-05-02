var baseUrl = ""

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'production') {
	/* Production environment */
	// baseUrl = "http://127.0.0.1:10040/"
	baseUrl = "http://124.222.186.235:10040/"
} else {
	/* Development environment */
	// baseUrl = "http://127.0.0.1:10040/"
	baseUrl = "http://124.222.186.235:10040/"
}

export default {
	baseUrl
}
