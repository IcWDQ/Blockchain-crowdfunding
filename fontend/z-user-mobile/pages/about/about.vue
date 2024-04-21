<template>
	<view class="">
	<view class="">
		<view class="jui_bg_fff jui_mar_2432 jui_pad_2432 jui_bor_rad_30" >
			<h2 style="text-align: center;">关于我们 </h2>
			    <h4>一、简介</h4>
			    <p>   欢迎来到我们的区块链众筹平台！我们是一个专注于利用区块链技术为各类项目提供资金支持的平台。我们的目标是通过区块链技术的去中心化、透明和安全特性，为投资者和项目发起人提供一个公平、高效的众筹环境。</p>
			    </br>
				<h4>二、我们的使命</h4>
			    <p>我们的使命是通过区块链技术降低众筹项目的门槛，让更多人能够参与到创新项目中来。我们相信，区块链技术能够改变传统金融体系的局限，为全球范围内的创新项目提供更多的可能性。</p>
			    </br>
				<h4>三、我们的愿景</h4>
			    <p>我们的愿景是成为全球最受欢迎、最具影响力的区块链众筹平台。我们希望能够帮助更多的创新项目成功启动，为投资者提供丰厚的回报，同时推动区块链技术在金融领域的广泛应用。</p>
			    </br>
				<h4>四、我们的特点</h4>
			    <ul>
			        <li>去中心化：我们的平台基于区块链技术，实现了资金和信息的去中心化管理，确保了公平和透明。</li>
			        <li>安全性：区块链技术的加密特性保证了用户信息和资金的安全，防止了黑客攻击和数据泄露。</li>
			        <li>透明性：所有众筹项目的信息和资金流动都记录在区块链上，投资者可以随时查看和监督项目的进展。</li>
			        <li>低成本：相比传统金融机构，我们的平台费用更低，让更多资金投入到实际项目中。</li>
			        <li>全球化：我们的平台面向全球用户，为各类创新项目提供国际化的资金支持。</li>
			    </ul>
				</br>
			    <h4>加入我们</h4>
			    <p>无论您是项目发起人还是投资者，我们都欢迎您加入我们的平台。让我们一起推动区块链技术的发展，为全球创新项目助力！</p>
				</br>
				<p>财富热线 138888888888 易经理</p>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				text:'',
				FromToken:''
			}
		},
		onLoad() {
		},
		onShow() {
			// this.getFromToken();
			
		},
		methods:{
			getFromToken() {
				this.$api.getFromToken({data:1}).then(res => {
					if (res.code == 1) {
						this.FromToken = res.FromToken;
						this.about()
						
					}
				});
			},
			about(){
				this.$api.getJobTreaty({FromToken:this.FromToken ,web_type:'web_about'}).then(res => {
					if (res.code == 1) {
						this.text = res.data
						console.log(123456)
					}
				});
			}
		}
	}
</script>

<style>
</style>
