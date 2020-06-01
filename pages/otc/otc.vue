<template>
	<view>
		<view class="header">
			<view class="side">
				<view class="navbar">
					<view class="nav-item" :class="{current: sideIndex === 0}" @click="sideTabClick('BUY', 0)">我要买</view>
					<view class="nav-item" :class="{current: sideIndex === 1}" @click="sideTabClick('SELL', 1)">我要卖</view>
				</view>
				<view class="menu">
					<image src="../../static/icon-filter.png" @click="filter"></image>
					<image src="../../static/icon-order.png" @click="navTo('/pages/otc/order/list', true)"></image>
				</view>
			</view>
			<view class="coinNavbar">
				<view 
					v-for="(item, index) in fiatCoins" :key="index" 
					class="nav-item" 
					:class="{current: coinIndex === index}"
					@click="coinTabClick(index)"
				>
					{{item}}
				</view>
			</view>
		</view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" top="180" @down="downCallback" @up="upCallback">
			<!-- 分页的数据列表 -->
			<view v-for="(item, i) in list" :key="item.id">
				<otc-list-item :data.sync="item"></otc-list-item>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import otcListItem from './components/otc-list-item.vue'
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import { mapState, mapActions } from 'vuex'
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [MescrollMixin, commonMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			MescrollBody,
			otcListItem
		},
		data() {
			return {
				sideIndex: 0,
				coinIndex: 0,
				fiatCoins: [],
				form:{
					side: 'BUY',
					coin: undefined,
					paycoin: undefined,
					payment: undefined
				},
				page:{
					page: 1,
					limit: 10,
					side: 'BUY',
					coin: undefined,
					paycoin: undefined,
					payment: undefined
				},
				list: [], // 数据列表
				downOption:{
					auto:false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption:{
					auto:false, // 不自动加载
					noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量
					},
					empty:{
						tip: '~ 空空如也 ~'
					}
				}
			}
		},
		onLoad(options){
			this.fiatList().then(res =>{
				this.fiatCoins = res.data
				this.page.coin = this.fiatCoins[0]
				this.mescroll.resetUpScroll()
			}).catch(error =>{
			})
			uni.$on("filter", (res) => {
				this.page.price = res.price
				this.page.payment = res.payment
				this.mescroll.resetUpScroll()
			})
		},
		methods: {
			...mapActions('common', ['fiatList']),
			...mapActions('otc', ['advertList']),
			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				if(page.num == 1) this.list = [];
				let $this = this
				this.page.page = page.num
				this.advertList(this.page).then(res =>{
					console.log(res.rows);
					$this.mescroll.endSuccess(res.rows.length)
					if(res.total == 0){
						$this.list = [];
					} else {
						$this.list = $this.list.concat(res.rows)
					}
				}).catch(error =>{
					this.mescroll.endErr()
				})
			},
			//顶部tab点击
			sideTabClick(side, index){
				this.sideIndex = index
				this.page.side = side
				this.mescroll.resetUpScroll()
			},
			//顶部tab点击
			coinTabClick(index){
				this.coinIndex = index;
				this.page.coin = this.fiatCoins[index]
				this.mescroll.resetUpScroll()
			},
			filter(){
				uni.getSubNVueById('otcFilterDrawer').show('slide-in-right', 200);
			},
		}
	}
</script>

<style lang="scss">
	image{width: 100%;vertical-align: bottom;will-change: transform}
	.header{
		z-index: 9900;
		position: fixed;
		top: --window-top;
		left: 0;
		height: 180upx;
		background: #ffffff;
		width: 100%;
	}
	.navbar{
		display: flex;
		height: 40px;
		background: #fff;
		position: relative;
		margin: 0 30upx 20upx 30upx;
		padding-bottom: 30upx;
		.nav-item{
			height: 100%;
			font-size: 30upx;
			color: $font-color-light;
			margin-right: 15px;
			display:flex;
			align-items:flex-end;
			&.current{
				color: $font-color-dark;
				font-size: 40upx;
				font-weight: bold;
			}
		}
	}
	.side{
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		.menu{
			image {
				width: 20px;
				height: 20px;
				margin: 0upx 30upx 0upx 10upx;
			}
		}
	}
	.coinNavbar{
		display: flex;
		height: 30px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		overflow-x: scroll;
		padding-left: 30upx;
		padding-right: 30upx;
		.nav-item{
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			margin-right: 15px;
			position: relative;
			&.current{
				color: $uni-color-blue;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 100%;
					height: 0;
					border-bottom: 2px solid $uni-color-blue;
				}
			}
		}
	}
	
</style>
