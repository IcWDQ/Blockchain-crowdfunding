<template>
	<view class="">
	<view class="">
		<view class="jui_bg_fff jui_mar_2432 jui_pad_2432 jui_bor_rad_30" >
			 <h2 style="text-align: center; margin-bottom: 20px;">区块链政策声明</h2>
			
			    <!-- 简介 -->
			    <p>本政策旨在阐述我们对区块链技术应用的立场、管理措施及合规要求。</p>
			
			    <!-- 政策范围 -->
			    <h3>适用范围</h3>
			    <p>本政策适用于所有涉及区块链技术开发、应用及服务提供的部门与个人。</p>
			
			    <!-- 政策条款 -->
			    <h3>政策条款</h3>
			    <h4>数据保护</h4>
			    <p>确保通过区块链技术处理的所有数据符合数据保护法规和隐私政策。</p>
			
			    <h4>透明度和可追溯性</h4>
			    <p>提高交易透明度，确保所有区块链操作的可追溯性，以增强监管合作和信任。</p>
			
			    <h4>智能合约执行</h4>
			    <p>确保智能合约的法律效力、执行准确性和结果的不可篡改性。</p>
			
			    <!-- 责任分配 -->
			    <h3>责任分配</h3>
			    <p>明确各参与方在区块链技术实施过程中的职责和义务，包括但不限于技术开发、运营维护、法律合规等方面。</p>
			
			    <!-- 遵守法律 -->
			    <h3>遵守法律</h3>
			    <p>强调必须遵守当地法律法规，以及国际标准和行业最佳实践。</p>
			
			    <!-- 联系信息 -->
			    <h3>联系我们</h3>
			    <p>如有任何疑问，请联系我们的区块链政策负责人。</p>
			    <p>电子邮箱：blockchai@jingjing.com</p>
			    <p>联系电话：+123-456-7890</p>
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
