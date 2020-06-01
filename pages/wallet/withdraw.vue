<template>
	<view class="container">
		<!-- 列表 -->
		<view class="coin-section m-t">
			<view class="s-row">
				<view class="col">
					<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="coinLogo"></image>
					<text class="coin">BTC</text>
				</view>
				<view class="col r light" @click="navToSearch()">
					<text class="subtitle">选择币种</text>
					<uni-icons type="forward" size="20" class="arrow"></uni-icons>
				</view>
			</view>
			<view class="form">
				<text class="label">提币地址</text>
				<view class="input little-line">
					<input type="number" placeholder="输入或长按粘贴地址" class="address"/>
				</view>
				<text class="label">数量</text>
				<view class="input little-line">
					<input type="number" placeholder="最小提币数量0.5" class="address"/>
					<view class="all">全部</view>
				</view>
				<view class="balance">可用 0.001223423 ETH</view>
				<text class="label">手续费</text>
				<view class="input little-line">
					<input type="number" placeholder="最小提币数量0.5" class="address"/>
				</view>
			</view>
			<view class="desc">
				<text>最小提币数量为：2 USDT (ERC20)。</text>
				<text>为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。</text>
				<text>请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {uniIcons} from '@dcloudio/uni-ui'
	export default {
		components: {uniIcons},
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
			};
		},
		onLoad(){
			this.loadData();
		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods: {
			//请求数据
			async loadData(){
				let list = await this.$api.json('cartList'); 
				let cartList = list.map(item=>{
					item.checked = true;
					return item;
				});
			},
			navToSearch(){
				uni.navigateTo({
					url: '/pages/wallet/search'
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.container{
		padding: 20upx 20upx;
	}
	.coin-section{
		background: #fff;
		.s-row{
			background-color: $uni-color-subbg;
			display:flex;
			align-items:center;
			padding: 20upx 20upx 20upx 30upx;
			.col{
				font-size: $font-lg;
				color: $font-color-dark;
				flex:1;
				.coin{
					font-weight: 400;
					vertical-align: middle;
				}
				.subtitle{
					font-size: $font-sm;
					font-weight: 400;
				}
			}
			.coinLogo {
			    width: 46upx;
				height: 46upx;
			    margin-right: 8px;
			    display: inline-block;
			    vertical-align: middle;
			    float: left;
			}
			.light{
				font-weight: 100;
				font-size: $font-lg;
				color: $font-color-dark;
			}
			.r{
				text-align: right;
			}
			.arrow{
				vertical-align: middle;
			}
		}
		.form{
			padding: 10upx 0;
			display: flex;
			flex-direction: column;
			.label{
				margin-top: 30upx;
				color: $font-color-dark;
				font-size: $font-sm;
			}
			.balance{
				margin-top: 10upx;
				color: $font-color-light;
				font-size: $font-sm;
			}
			.input{
				padding: 10upx 0;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.all{
					flex: 0.5;
					text-align: right;
					font-size: $font-base;
					color: $font-color-dark;
					font-weight: bold;
				}
			}
			input{
				color: $font-color-light;
				font-size: $font-base;
			}
		}
		.desc{
			margin-top: 30upx;
			margin-bottom: 20upx;
			font-size: $font-base;
			color: $font-color-light;
			display: flex;
			flex-direction: column;
		}
	}
	
	
</style>
