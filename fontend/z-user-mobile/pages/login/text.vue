<template>
	<view class="p30r bg-fff">
		<!-- <view class="" style="width: 100%; font-size: 32rpx;">
			<view class="jui_mar_t20 jui_pad_t20" id="abc" style="width: 95%;margin: 0 auto;">
				<jyf-parser :html="goodsDetails.content" ref="article"></jyf-parser>
			</view>
		</view> -->
		<h2 style="text-align: center;">《Terms of use of the crowdfunding chain project investment platform》</h2>
		    <ol>
		        <li>
		            <h3>Definition</h3>
		            <p>In this Agreement, the following terms have the following meaning：</p>
		            <ul>
		                <li>“Investor "means an investor who participates in a crowdfunding chain project；</li>
		                <li>“Project Sponsor "refers to a company or individual who initiates a crowdfunding chain project；</li>
		                <li>“Crowdfunding chain platform "means an online platform that provides investment services for crowdfunding chain projects.</li>
		            </ul>
		        </li>
		        <li>
		            <h3>投资条件</h3>
		            <p>投资者在参与众筹链项目投资前，应满足以下条件：</p>
		            <ul>
		                <li>年满18周岁，具备完全民事行为能力；</li>
		                <li>了解并同意本协议的所有内容；</li>
		                <li>具备一定的投资经验和风险承受能力。</li>
		            </ul>
		        </li>
		        <li>
		            <h3>投资流程</h3>
		            <p>投资者参与众筹链项目投资的流程如下：</p>
		            <ol>
		                <li>注册并登录众筹链平台；</li>
		                <li>选择感兴趣的众筹链项目；</li>
		                <li>阅读项目详情，了解项目背景、预期收益等信息；</li>
		                <li>根据个人投资意愿和风险承受能力，选择合适的投资金额；</li>
		                <li>支付投资款项；</li>
		                <li>等待项目上线，获取投资收益。</li>
		            </ol>
		        </li>
		        <li>
		            <h3>投资收益与风险</h3>
		            <p>投资者在参与众筹链项目投资时，应充分了解项目的预期收益和潜在风险，自行承担投资风险。</p>
		        </li>
		        <li>
		            <h3>项目上线与退款</h3>
		            <p>项目发起人在规定时间内完成项目上线后，投资者将按照约定的投资比例获得相应的投资收益。如项目未能按时上线，投资者可申请退款。</p>
		        </li>
		        <li>
		            <h3>争议解决</h3>
		            <p>本协议的解释权归众筹链平台所有。如双方在履行本协议过程中发生争议，应首先友好协商解决；协商不成的，任何一方均有权向有管辖权的人民法院提起诉讼。</p>
		        </li>
		    </ol>
		<view v-html="text"></view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				text:uni.getStorageSync('config').web_user_treaty	
			}
		},
		onLoad() {
			// this.terms()
		},
		methods:{
			
		}
	}
</script>

<style>
	.jui_main {
		margin:20rpx 20rpx;
	}
</style>
