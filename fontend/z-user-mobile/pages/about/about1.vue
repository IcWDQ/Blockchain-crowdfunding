<template>
	<view class="">
	<view class="">
		<view class="jui_bg_fff jui_mar_2432 jui_pad_2432 jui_bor_rad_30" >
			<h2 style="text-align: center; margin-bottom: 20px;">《投资协议》</h2>
			    <p>本协议旨在规定投资者与项目方在进行区块链投资时的权利和义务。</p>
			    <h4>定义</h4>
			    <p>在本协议中，除非上下文另有规定，否则以下词语具有以下含义：</p>
			    <ul>
			        <li>"投资者"指同意向项目方投资的人或实体。</li>
			        <li>"项目方"指接受投资者投资的人或实体。</li>
			    </ul>
			    <h4>投资条款</h4>
			    <p>投资者同意向项目方投资X项目，用于该项目的里程碑建设。投资期限为项目期限。</p>
			    <h4>收益分配</h4>
			    <p>项目方应在投资期限结束后，将按照建立时的约定进行分配。</p>
			    <h4>风险提示</h4>
			    <p>投资者应充分了解区块链投资的风险，包括但不限于市场风险、技术风险等。</p>
			    <h4>争议解决</h4>
			    <p>如双方在执行本协议过程中发生争议，应通过友好协商解决；协商不成的，任何一方均有权向有管辖权的法院提起诉讼。</p>
			    <h4>其他条款</h4>
			    <p>本协议自双方签字之日起生效。</p>
			    <h4>签名</h4>
			    <p>投资者：_____________________</p>
			    <p>项目方：_____________________</p>
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
