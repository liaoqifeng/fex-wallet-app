<template>
	<view class="container">
		<!-- 列表 -->
		<view class="coin-section m-t">
			<view class="block">
				<view class="s-row">
					<view class="col">
						<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="coinLogo"></image>
						<text class="coin">BTC</text>
					</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-title">可用</view>
					<view class="col subtitle row-title">冻结</view>
					<view class="col r subtitle row-title">折合(CNY)</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-amount">0.025334</view>
					<view class="col subtitle row-amount">0.025334</view>
					<view class="col r subtitle row-amount">100.00</view>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="list">
			<!-- <empty></empty> -->
			<view class="coin-section">
				<view class="block">
					<view class="s-row">
						<view class="col">
							<text class="coin">提币</text>
						</view>
					</view>
					<view class="s-row">
						<view class="col subtitle row-title">数量</view>
						<view class="col subtitle row-title">状态</view>
						<view class="col r subtitle row-title">时间</view>
					</view>
					<scroll-view class="s-list" :enableBackToTop="enableBackToTop" :scroll-y="scrollY" @scrolltolower="loadMore">
						<view class="s-row little-line" v-for="item in records" :key="item">
							<view class="col subtitle row-amount">0.025334</view>
							<view class="col subtitle row-amount">已完成</view>
							<view class="col r subtitle row-amount">16:52 01/04</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {uniIcons} from '@dcloudio/uni-ui'
	import empty from '../../components/empty.vue'
	export default {
		components: {uniIcons, empty},
		data() {
			return {
				total: 0, //总价格
				empty: false, //空白页现实  true|false
				scrollY: true,
				enableBackToTop: true,
				records: [1,2,3,4,5,6,7,8,9,0,10,11,12,13,14,15,16,17,18,19]
			};
		},
		onLoad(){
			console.log("====================================")
			uni.showToast({
			    title: '标题',
			    duration: 2000
			});
			this.loadData();
		},
		onHide() {
			
		},
		onNavigationBarButtonTap(e) {
			console.log("-------------------------------------")
			uni.showActionSheet({
				title:'全部',
			    itemList: ['充值', '提现', '兑换'],
			    success: function (res) {
			        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
			    },
			    fail: function (res) {
			        console.log(res.errMsg);
			    }
			});
		},
		watch:{
			//显示空白页
			list(e){
				let empty = e.length === 0 ? true: false;
				if(this.empty !== empty){
					this.empty = empty;
				}
			}
		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods: {
			showAction(){
				
			},
			//请求数据
			async loadData(){
				/* let list = await this.$api.json('cartList'); 
				let cartList = list.map(item=>{
					item.checked = true;
					return item;
				}); */
			},
			navToLogin(){
				uni.navigateTo({
					url: '/pages/public/login'
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.container{
		padding: 0upx 0upx;
	}
	.coin-section{
		background: #fff;
		.block{
			padding: 20upx 0;
			.s-list{
				position: absolute;
				width: 100%;
				top: 480upx;
				bottom: 0upx;
			}
			.s-row{
				display:flex;
				align-items:center;
				padding-top: 20upx;
				padding-bottom: 20upx;
				margin: 0upx 30upx;
				.subtitle{
					padding: 4upx 0 10upx 0;
				}
				.col{
					font-size: $font-base;
					color: $font-color-dark;
					flex:1;
					.coin{
						font-weight: bold;
						font-size:  $font-md;
					}
				}
				.coinLogo {
				    width: 36upx;
					height: 36upx;
				    margin-right: 8px;
				    display: inline-block;
				    vertical-align: middle;
				    float: left;
				}
				.light{
					font-weight: bold;
					font-size: $font-lg;
					color: $font-color-dark;
				}
				.r{
					text-align: right;
				}
				.row-title{
					font-size: $font-base;
					font-weight: normal;
					color: $font-color-light;
				}
				.row-amount{
					font-size: $font-base;
					font-weight: normal;
					color: $font-color-dark;
				}
			}
		}
		
		
	}
	
	
</style>
