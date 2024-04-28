import global from '@/api/global.js';
const update = {
	checkUpdate(handUpdate) {
		var _this = this;
		var client_type = plus.os.name == "Android" ? 1 : 2;
		var current_version = 0;
		var apiurl = global.baseUrl + "/download/index.php";
		var response = "";
		plus.runtime.getProperty(plus.runtime.appid, function(inf) {
			current_version = inf.version;
			uni.request({
				method: 'POST',
				url: apiurl + '?m=version',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					current_version: current_version,
					client_type: client_type
				},
				success: (ret) => {
					console.log("===", ret);
					response = ret.data;
					if (response.code == 200) {
						var result = response.result;
						plus.nativeUI.confirm("系统检测到更新,是否更新",
							function(e) {
								if (e.index == 0) {
									if (result.pack_url != "") { // pack_url 不为空的时候 直接跳转
										plus.runtime.openURL(result.pack_url);
									}
									if (result.pack_type == 2) { //IOS更新 直接打开下载页面
										plus.runtime.openURL(apiurl);
									} else { // 安卓或WGT更新，下载文件并执行安装
										_this.install(result.pack_file);
									}
								}
							})
					} else {
						if (handUpdate) {
							uni.showToast({
								icon: 'none',
								title: "已是最新版本"
							});
						} else {
							console.log('无更新');
						}
					}
				}
			});
		});
	},
	install(fileUrl) {
		plus.nativeUI.showWaiting("更新中...");
		plus.downloader.createDownload(fileUrl, {
			filename: "_doc/update/"
		}, function(d, status) {
			if (status == 200) {
				plus.runtime.install(d.filename, {
					force: true
				}, function() {
					plus.nativeUI.closeWaiting();
					plus.nativeUI.alert("应用资源更新完成！", function() {
						plus.runtime.restart();
					});
				}, function(e) {
					plus.nativeUI.closeWaiting();
					console.log("安装文件失败[" + e.code + "]：" + e.message);
				});
			} else {
				console.log("下载失败！");
			}
			plus.nativeUI.closeWaiting();
		}).start();
	}
}
export default update
