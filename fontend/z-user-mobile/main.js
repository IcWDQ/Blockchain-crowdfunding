import Vue from 'vue'
import App from './App'
import api from '@/api'
import tool from '@/tool/tool'
import global from './api/global.js'
/* v18n多语言处理 */
import i18n from '@/language/index.js'

Vue.config.productionTip = false

import vNavigation from '@/components/navigation/navigation.vue'

Vue.prototype.$api = api
Vue.prototype.$msg = tool.msg
Vue.prototype.$tool = tool
Vue.prototype.global = global

// import fastClick from 'fastclick'
// fastClick.attach(document.body);
/* 跳转事件 */
Vue.prototype.jump = function(url){
	uni.navigateTo({
		url:url
	})
}
Vue.prototype.sjump = function(url){
	uni.switchTab({
		url:url
	})
}
/* 全局混入 */
Vue.mixin({
	computed: {
		i18n() {
			return this.$t('global');
		}
	},
})
App.mpType = 'app'

const app = new Vue({
	i18n,
	...App
})
app.$mount()
