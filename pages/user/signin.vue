<template>  
    <view class="container">  
		<view class="bg-section">
			<view class="title">{{i18n.sigin.title}}</view>
		</view>
		<view class="cover-container">
			<view class="box position">
				<view class="tip">{{i18n.sigin.tip1}}</view>
				<view class="days">
					<view v-for="(item, index) in signInfo.rewards" class="col circle" :class="{'active':index < signInfo.signCount}">+{{item}}</view>
				</view>
				<view class="days">
					<view class="col" v-for="(item, index) in signInfo.rewards">{{index + 1}}{{i18n.sigin.tip2}}</view>
				</view>
				<view class="intro">{{i18n.sigin.tip3}}{{signInfo.coin}}</view>
				<view class="signin" @click="handleSign" :class="{'signActive':signInfo.isSignin}">{{signInfo.isSignin ? i18n.sigin.tip10 : i18n.sigin.tip11}}</view>
			</view>
			<view class="box position rule">
				<view class="tip">-{{i18n.sigin.tip4}}-</view>
				<view class="sub">
					1.{{i18n.sigin.tip5}}{{signInfo.coin}},{{i18n.sigin.tip6}}{{signInfo.coin}};
				</view>
				<view class="sub">
					2.{{i18n.sigin.tip7}};
				</view>
				<view class="sub">
					3.{{i18n.sigin.tip8}} 0:00;
				</view>
				<view class="sub">
					4.{{i18n.sigin.tip9}};
				</view>
			</view>
		</view>
    </view>  
</template>  
<script>  
    import {
    	mapState,
    	mapActions
    } from 'vuex'
	import {commonMixin, authMixin} from '@/common/mixin/mixin.js'
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
		},
		mixins: [commonMixin, authMixin],
		data(){
			return {
				userInfo: {},
				signInfo: {
					signCount: 0,
					rewards: [],
					isSignin: false,
					coin: ''
				}
			}
		},
		onShow(){
			this.getSignDetail()
		},
		
        computed: {
			...mapState('user', ['loginInfo'])
		},
        methods: {
			...mapActions('user', ['signinDetail', 'signin']),
			getSignDetail(){
				this.signinDetail().then(res => {
					this.signInfo = res.data
				})
			},
			handleSign(){
				if(this.signInfo.isSignin){
					return
				}
				this.signin().then(res => {
					this.getSignDetail()
					this.$api.msg(this.i18n.sigin.qdcg, 1000, false, 'none', function() {})
				})
			}
        }  
    }  
</script>  
<style lang='scss' scoped>
	page{
		background-color: #f5f5f5;
	}
	.container{
		background-color: #f5f5f5;
	}
	.bg-section{
		width: 100%;
		height: 400upx;
		background: linear-gradient(top, rgba(242,104,30, 0.8), rgb(249,68,34));
		background: -ms-linear-gradient(top, rgba(242,104,30, 0.8), rgb(249,68,34));
		background: -webkit-linear-gradient(top, rgba(242,104,30, 0.8), rgb(249,68,34));
		background: -moz-linear-gradient(top, rgba(242,104,30, 0.8), rgb(249,68,34));
		.title{
			text-align: center;
			padding: 120upx 0;
			font-size: $font-xl;
			color: #ffffff;
		}
	}
	.cover-container{
		position: relative;
		width: 100%;
		.box{
			background-color: #ffffff;
			border-radius: 20upx;
			padding: 20upx 20upx 50upx 20upx;
			
		}
		.position{
			position: absolute;
			top: -150upx;
			left: 20upx;
			right: 30upx;
		}
		.tip{
			font-size: $font-md;
			padding: 20upx 0 40upx 0;
		}
		.days{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.col{
				width: 60upx;
				height: 60upx;
				line-height: 60upx;
				text-align: center;
				font-size: $font-sm;
			}
			.active{
				background: rgb(249,68,34) !important;
				color: #ffffff;
				font-weight: bold;
			}
			.circle{
				background: #f5f5f5;
				border-radius: 50upx;
				font-size: $font-base;
			}
		}
		.intro{
			text-align: center;
			padding: 30upx 0;
			color: $font-color-light;
		}
		.signin{
			width: 500upx;
			height: 90upx;
			line-height: 90upx;
			background-color: rgba(249,68,34, 0.9);
			color: #ffffff;
			margin: 0 auto;
			text-align: center;
			border-radius: 50upx;
		}
		.signActive{
			background-color: #FEF1EC;
		}
		.rule{
			.tip{
				font-size: $font-md;
			}
			top: 350upx;
			.sub{
				padding: 6upx 0;
				font-size: $font-base;
			}
		}
	}
	
</style>