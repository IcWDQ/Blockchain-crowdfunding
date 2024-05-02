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
		            <h3>Investment terms</h3>
		            <p>Investors should meet the following conditions before investing in crowdfunding chain projects：</p>
		            <ul>
		                <li>At least 18 years old, with full capacity for civil conduct；</li>
		                <li>Understand and agree to all contents of this agreement；</li>
		                <li>Have certain investment experience and risk tolerance.</li>
		            </ul>
		        </li>
		        <li>
		            <h3>Investment process</h3>
		            <p>The process for investors to participate in crowdfunding chain project investment is as follows:</p>
		            <ol>
		                <li>Register and log in to the crowdfunding chain platform;</li>
		                <li>Select the crowdfunding chain project you are interested in;</li>
		                <li>Read the project details, understand the project background, expected benefits and other information;</li>
		                <li>Choose the appropriate investment amount according to personal investment willingness and risk tolerance;</li>
		                <li>Payment of investment;</li>
		                <li>Wait for the project to go online and get the investment income.</li>
		            </ol>
		        </li>
		        <li>
		            <h3>Investment returns and risks</h3>
		            <p>When investing in crowdfunding chain projects, investors should fully understand the expected returns and potential risks of the projects and bear the investment risks themselves.</p>
		        </li>
		        <li>
		            <h3>Project online and refund</h3>
		            <p>After the project sponsor completes the project online within the specified time, the investor will receive the corresponding investment income in accordance with the agreed investment proportion. If the project does not come online on time, investors can apply for a refund.</p>
		        </li>
		        <li>
		            <h3>Dispute resolution</h3>
		            <p>The right to interpret this agreement belongs to the Crowdfunding chain platform. Any dispute arising from the performance of this Agreement shall be settled through friendly negotiation. If no agreement can be reached through consultation, either party shall have the right to bring a lawsuit to the people's court with jurisdiction.</p>
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
