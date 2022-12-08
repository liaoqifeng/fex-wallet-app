<template>
	<view class="container">
		<u-navbar :is-back="true">
			<view class="slot-wrap">
				<image class="logo" :src="info.logo_small" style="width: 50upx; height: 50upx;"></image>
				<view class="info">
					<text class="symbol">{{info.symbol}}</text>
					<text class="name">{{info.name_zh}},{{info.name}}</text>
				</view>
			</view>
		</u-navbar>
		<view class="header">
			<view class="l">
				<view class="price">
					<text class="unit" :class="info.change >= 0 ? 'upper-text' : 'lower-text'">￥</text>
					<text class="value" :class="info.change >= 0 ? 'upper-text' : 'lower-text'">{{info.price_cny}}</text>
				</view>
				<view class="detail">
					<text class="f-two cny">≈${{info.price}}</text>
					<text class="f-two change" :class="info.change >= 0 ? 'upper-text' : 'lower-text'">${{info.change}} {{info.change_percent}}%</text>
				</view>
			</view>
			<view class="r">
				<text class="no" v-if="info.isrank == 1">NO.{{info.rank}}</text>
				<text class="f-two marketcap">{{i18n.market.ltsz}} ￥{{info.marketcap}}</text>
			</view>
		</view>
		<view class="market">
			<view class="col lr">
				<view class="row">
					<text class="label">24H{{i18n.market.high}}</text>
					<text class="val">￥{{info.high}}</text>
				</view>
				<view class="row">
					<text class="label">24H{{i18n.market.low}}</text>
					<text class="val">￥{{info.low}}</text>
				</view>
				<view class="row">
					<text class="label">24H{{i18n.market.chg}}</text>
					<text class="val">{{info| bofu}}</text>
				</view>
				<view class="row">
					<text class="label">{{i18n.market.sz}}</text>
					<text class="val">￥{{info.marketcap_total_usd}}</text>
				</view>
				<view class="row">
					<text class="label">{{i18n.market.price}}</text>
					<text class="val">${{info.openprice}}</text>
				</view>
				<view class="row">
					<text class="label">{{i18n.market.historyHigh}}</text>
					<text class="val">${{info.his_highest_usd}}</text>
				</view>
			</view>
			<view class="col">
				<view class="row">
					<text class="label">24H{{i18n.market.vol}}</text>
					<text class="val">{{info.amount_day}}</text>
				</view>
				<view class="row">
					<text class="label">24H{{i18n.market.amount}}</text>
					<text class="val">￥{{info.vol}}</text>
				</view>
				<view class="row">
					<text class="label">24H{{i18n.market.hs}}</text>
					<text class="val">{{info.turn_over}}%</text>
				</view>
				<view class="row">
					<text class="label">{{i18n.market.lb}}</text>
					<text class="val">{{info.ratio}}</text>
				</view>
				<view class="row">
					<text class="label">BTC{{i18n.market.relation}}</text>
					<text class="val">{{info.btccorrelation}}</text>
				</view>
				<view class="row">
					<text class="label">{{i18n.market.historyLow}}</text>
					<text class="val">${{info.his_lowest_usd}}</text>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="chart_list">
			<view class="item">
				<view class="chart">
					<u-circle-progress active-color="#007F0E" :percent="info.marketcappercent">
						<view class="u-progress-content">
							<view class="u-progress-dot"></view>
							<text class='u-progress-info'>{{info.marketcappercent ? info.marketcappercent.toFixed(2) : '0.00'}}%</text>
						</view>
					</u-circle-progress>
				</view>
				<text class="lable">{{i18n.market.globalSz}}</text>
			</view>
			<view class="item">
				<view class="chart">
					<u-circle-progress active-color="#2979ff" :percent="info.circulationRate">
						<view class="u-progress-content">
							<view class="u-progress-dot"></view>
							<text class='u-progress-info'>{{info.circulationRate ? info.circulationRate.toFixed(2) : '0.00'}}%</text>
						</view>
					</u-circle-progress>
				</view>
				<text class="lable">{{i18n.market.ltl}}</text>
			</view>
			<view class="item">
				<view class="chart">
					<u-circle-progress active-color="#f0ad4e" :percent="info.turn_over">
						<view class="u-progress-content">
							<view class="u-progress-dot"></view>
							<text class='u-progress-info'>{{info.turn_over ? info.turn_over.toFixed(2) : '0.00'}}%</text>
						</view>
					</u-circle-progress>
				</view>
				<text class="lable">{{i18n.market.hsl}}</text>
			</view>
		</view>
		<view class="box">
			<text class="tip f-two">{{i18n.market.tip1}}</text>
			<text class="tip f-two">{{i18n.market.tip2}}</text>
			<view class="long_short_box">
				<view class="left_box">{{longsort.long_percent}}%</view> 
				<view class="right_box">{{longsort.short_percent}}%</view> 
				<image src="https://s3.feixiaoquan.com/p/v1.3.95/static/images/ic_vs.svg?v=f3ff192" class="icon_vs" /> 
				<view class="circle_box">
					<view class="circle"></view>
				</view>
			</view>
		</view>
		<view class="info">
			<view class="tabs">
				<view @click="changeTab(0)" class="item" :class="{active: tabIndex == 0}">{{i18n.market.tab1}}</view>
				<view @click="changeTab(1)" class="item" :class="{active: tabIndex == 1}">{{i18n.market.tab2}}</view>
				<view @click="changeTab(2)" class="item" :class="{active: tabIndex == 2}">{{i18n.market.tab3}}</view>
			</view>
			<view v-show="tabIndex == 0" class="content">
				<view class="block">
					<view class="title">{{i18n.market.baseInfo}}</view>
					<view class="base f-two"  @click="navTo(`/pages/market/intro?code=${code}`)">
						<u-parse :html="info.coindesc"></u-parse>
					</view>
				</view>
				<view class="line"></view>
				<view class="block">
					<view class="title">{{i18n.market.releaseInfo}}</view>
					<view class="row f-two">
						<view class="item">
							<text class="label">{{i18n.market.srfxsj}}</text>
							<text class="val">{{info.online_time}}</text>
						</view>
						<view class="item">
							<text class="label">{{i18n.market.kpjg}}</text>
							<text class="val">${{info.openprice}}</text>
						</view>
						<view class="item">
							<text class="label">{{i18n.market.lszg}}</text>
							<text class="val">${{info.his_highest_usd}}</text>
						</view>
						<view class="item">
							<text class="label">{{i18n.market.lszd}}</text>
							<text class="val">${{info.his_lowest_usd}}</text>
						</view>
						<view class="item">
							<text class="label">{{i18n.market.ssgl}}</text>
							<text class="val">{{info.publicchain}}</text>
						</view>
						<view class="item">
							<text class="label">{{i18n.market.fxfs}}</text>
							<text class="val">{{info.issuemode}}</text>
						</view>
						<view class="item">
							<text class="label">{{i18n.market.ltsz}}</text>
							<text class="val">￥{{info.marketcap}}</text>
						</view>
						<view class="item" v-if="info.isrank == 1">
							<text class="label">{{i18n.market.ph}}</text>
							<text class="val">NO.{{info.rank}}</text>
						</view>
						<view class="item">
							<text class="label">{{i18n.market.sjjys}}</text>
							<text class="val">{{info.exchange_listcount}}</text>
						</view>
						<view class="item">
							<text class="label">{{i18n.market.cbdzs}}</text>
							<text class="val">{{info.holders}}</text>
						</view>
					</view>
				</view>
				<view class="line"></view>
				<view class="block">
					<view class="title">{{i18n.market.vouerInfo}}</view>
					<view class="row f-two">
						<view class="item">
							<text class="label">{{i18n.market.zdgyl}}</text>
							<text class="val">{{info.maxsupply}}{{info.symbol}}</text>
						</view>
						<view class="item">
							<text class="label">{{i18n.market.zgyl}}</text>
							<text class="val">{{info.totalSupply}}{{info.symbol}}</text>
						</view>
						<!--<view class="item">
							<text class="label">最大供应市值</text>
							<text class="val">{{info.totalSupply}}{{info.symbol}}</text>
						</view>
						<view class="item">
							<text class="label">当前供应量</text>
							<text class="val">$0.0025</text>
						</view>
						<view class="item">
							<text class="label">当前供应市值</text>
							<text class="val">￥4.61万亿</text>
						</view>-->
						<view class="item">
							<text class="label">{{i18n.market.ltzl}}<</text>
							<text class="val">{{info.supply}}{{info.symbol}}</text>
						</view>
						<view class="item">
							<text class="label">{{i18n.market.ltsz}}</text>
							<text class="val">￥{{info.marketcap}}</text>
						</view>
						<view class="item">
							<text class="label">{{i18n.market.ltl}}</text>
							<text class="val">{{info.circulationRate}}%</text>
						</view>
						<view class="item">
							<text class="label">{{i18n.market.qqzxyzb}}</text>
							<text class="val">{{info.marketcappercent ? info.marketcappercent.toFixed(2) : '0.00'}}%</text>
						</view>
					</view>
				</view>
				<view class="line"></view>
				<view class="block">
					<view class="title">{{i18n.market.minerInfo}}</view>
					<view class="row f-two">
						<view class="item">
							<text class="label">{{i18n.market.csqksj}}</text>
							<text class="val">{{info.firstblocktime | moment('YYYY-MM-DD HH:mm:ss')}}</text>
						</view>
						<view class="item">
							<text class="label">{{i18n.market.wkzt}}</text>
							<text class="val">{{info.miningstate}}</text>
						</view>
						<view class="item">
							<text class="label">{{i18n.market.zlzj}}</text>
							<text class="val">{{info.prooftype}}</text>
						</view>
						<view class="item">
							<text class="label">{{i18n.market.cksd}}</text>
							<text class="val">{{info.blockspleed}}</text>
						</view>
						<view class="item">
							<text class="label">{{i18n.market.hxsf}}</text>
							<text class="val">{{info.algorithm}}</text>
						</view>
						<view class="item">
							<text class="label">{{i18n.market.jbjl}}</text>
							<text class="val">{{info.blockreward/2}}{{info.symbol}}</text>
						</view>
						<view class="item">
							<text class="label">{{i18n.market.qkjl}}</text>
							<text class="val">{{info.blockreward}}{{info.symbol}}</text>
						</view>
					</view>
				</view>
				<view class="line"></view>
				<view class="block">
					<view class="title">{{i18n.market.introInfo}}</view>
					<view class="row f-two">
						<view class="item" v-for="(item, index) in teams.agency">
							<view class="intr">
								<image class="logo" :src="item.logo"></image>
								<text class="name">{{item.name}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="line"></view>
				<view class="block">
					<view class="title">{{i18n.market.linkInfo}}</view>
					<view class="row f-two">
						<view class="links">
							<view class="col" v-if="info.siteurl" @click="open(info.siteurl)">
								<image class="logo" src="https://s3.feixiaoquan.com/m/v1.0.62/static/images/currency_ic_website.svg?v=4997335"></image>
								<text class="name">{{i18n.market.website}}</text>
							</view>
							<view class="col" v-if="info.white_paper" @click="open(info.white_paper)">
								<image class="logo" src="https://s3.feixiaoquan.com/m/v1.0.62/static/images/currency_ic_WriteBook.svg?v=7b08d56"></image>
								<text class="name">{{i18n.market.whitepager}}</text>
							</view>
							<view class="col" v-if="info.facebook" @click="open(info.facebook)">
								<image class="logo" src="https://s3.feixiaoquan.com/m/v1.0.62/static/images/currency_ic_facebook.svg?v=4ec86ce"></image>
								<text class="name">Facebook</text>
							</view>
							<view class="col" v-if="info.redditlink" @click="open(info.redditlink)">
								<image class="logo" src="https://s3.feixiaoquan.com/m/v1.0.62/static/images/currency_ic_reddit.svg?v=c229c67"></image>
								<text class="name">Reddit</text>
							</view>
							<view class="col" v-if="info.twitter" @click="open(info.twitter)">
								<image class="logo" src="https://s3.feixiaoquan.com/m/v1.0.62/static/images/currency_ic_telegram.svg?v=0dcf65e"></image>
								<text class="name">Twitter</text>
							</view>
							<view class="col" v-if="info.explorer" @click="open(info.explorer)">
								<image class="logo" src="https://s3.feixiaoquan.com/m/v1.0.62/static/images/currency_ic_browser.svg?v=b1bded2"></image>
								<text class="name">{{i18n.market.blocksite}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-show="tabIndex == 1" class="content">
				<view class="timeline">
					<view class="row f-two" v-for="(item, index) in event">
						<view class="clock"><u-icon name="clock" color="#2979ff"></u-icon></view>
						<text class="time">{{item.eventdate}}</text>
						<text class="detail">{{item.title}}</text>
					</view>
				</view>
			</view>
			<view v-show="tabIndex == 2" class="content">
				<view class="member">
					<view class="row little-line" v-for="(item, index) in teams.team">
						<view class="l">
							<image v-if="item.logo" class="profile" :src="item.logo"></image>
							<image v-else class="profile" :src="'/static/missing-face.png'"></image>
							<view class="desc">
								<text class="name">{{item.name}}</text>
								<text class="sub f-two">{{item.intro}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		components: {
		},
		mixins: [commonMixin],
		data() {
			return {
				tabIndex: 0,
				code: '',
				teams: [],
				info: {},
				event: [],
				longsort: {}
			};
		},
		filters: {
			bofu(info){ 
				let val = ((info.high - info.low) / info.low * 100).toFixed(2)
				return val > 0 ? '+'+val+'%' : val + '%'
			}
		},
		onLoad(options){
			this.code = options.code
			this.loadData()
		},
		onPullDownRefresh() {
			this.loadData()
		},
		methods: {
			changeTab(index){
				this.tabIndex = index
			},
			loadData(){
				this.getInfo()
				this.getTeam()
				this.getBigEvent()
				this.getLongshort()
			},
			getInfo(){
				this.$u.post('https://dncapi.gomynft.com/api/coin/web-coininfo', {"webp":1,"code":this.code}).then(res => {
					this.info = res.data
					uni.stopPullDownRefresh();
				});
			},
			getTeam(){
				this.$u.get(`https://dncapi.gomynft.com/api/v3/coin/team?webp=1&code=${this.code}`).then(res => {
					this.teams = res.data
				});
			},
			getBigEvent(){
				this.$u.get(`https://dncapi.gomynft.com/api/v2/coin/bigevent?webp=1&coincode=${this.code}`).then(res => {
					this.event = res.data
				});
			},
			getLongshort(){
				this.$u.get(`https://dncapi.gomynft.com/api/v2/coin/longshort?code=${this.code}&webp=1`).then(res => {
					this.longsort = res.data
				});
			},
			open(url) {
				if(!url){
					return
				}
				// #ifdef APP-PLUS
				plus.runtime.openURL(url, function(res) {  
					console.log(res);  
				}); 
				 // #endif
				 // #ifdef H5
				 window.open(url, '_blank')
				 // #endif
			}  
		}
	}
</script>

<style lang='scss'>
	.container{
	}
	.f-two{
		font-size: 25upx;
	}
	.f-three{
		font-size: 22upx;
	}
	.slot-wrap{
		display: flex;
		align-items: center;
		.logo{
			width: 50upx;
			height: 50upx;
		}
		.info{
			display: flex;
			align-items: center;
			.symbol{
				font-size: 40upx;
				font-weight: bold;
				padding: 0 10upx;
			}
		}
	}
	.info{
		.tabs{
			padding: 20upx 20upx;
			display: flex;
			.item{
				padding-right: 30upx;
			}
			.active{
				font-weight: bold;
				color: #2979ff;
			}
		}
		.content{
			.block{
				padding: 20upx 20upx;
				.title{
					font-weight: bold;
					height: 30upx;
					line-height: 30upx;
					border-left: 6upx solid #2979ff;
					padding-left: 10upx;
					margin-top: 10upx;
				}
				.base{
					margin: 20upx 0;
					display: -webkit-box;
					overflow: hidden;
					word-break: break-all;
					text-overflow: ellipsis; 
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
				}
				.row{
					padding: 10upx 0;
					.item{
						padding: 10upx 0;
						display: flex;
						justify-content: space-between;
					}
					.intr{
						display: flex;
						align-items: center;
						.name{
							padding-left: 20upx;
						}
					}
					.logo{
						width: 80upx;
						height: 80upx;
					}
					.links{
						display: flex;
						justify-content: space-between;
						text-align: center;
						.col{
							text-align: center;
						}
						.name{
							display: block;
						}
					}
				}
			}
			.timeline{
				padding: 20upx 20upx;
				.row{
					position: relative;
					display: flex;
					flex-direction: column;
					border-left: 1upx dashed #F1F1F1;
					padding-left: 30upx;
					padding-bottom: 20upx;
					.time{
						color: #2979ff;
					}
					.clock{
						position: absolute;
						left: -12upx;
						top: 6upx;
					}
				}
			}
			.member{
				padding: 10upx 20upx;
				.row{
					display: flex;
					padding: 20upx 0;
					.l{
						display: flex;
						align-items: center;
						.profile{
							width: 80upx;
							height: 80upx;
							border-radius: 50%;
						}
						.desc{
							padding-left: 20upx;
							display: flex;
							flex-direction: column;
						}
					}
				}
			}
		}
	}
	.chart_list{
		display: flex;
		justify-content: space-between;
		padding: 20upx 20upx;
		.item{
			text-align: center;
			font-size: 25upx;
		}
	}
	.box{
		padding: 20upx 20upx;
		background-color: #EEF2F5;
		.tip{
			display: block;
		}
		.long_short_box {
		    position: relative;
		    display: -webkit-box;
		    display: -ms-flexbox;
		    display: flex;
		    -webkit-box-pack: justify;
		    -ms-flex-pack: justify;
		    justify-content: space-between;
		    -webkit-box-align: center;
		    -ms-flex-align: center;
		    align-items: center;
		    margin: 30upx 0 10upx 0;
		}
		.left_box {
			flex: 1;
		    background: -webkit-gradient(linear,right top,left top,from(rgba(0,133,85,.7)),to(#008555));
		    background: linear-gradient(270deg,rgba(0,133,85,.7),#008555);
		    -webkit-box-pack: start;
		    -ms-flex-pack: start;
		    justify-content: flex-start;
		    padding-left: 30upx;
			height: 60upx;
			line-height: 60upx;
			font-size: 32upx;
			font-weight: bold;
			color: #ffffff;
		}
		.right_box {
			flex: 1;
		    background: -webkit-gradient(linear,right top,left top,from(#d60f2a),to(rgba(214,15,42,.7)));
		    background: linear-gradient(270deg,#d60f2a,rgba(214,15,42,.7));
		    -webkit-box-pack: end;
		    -ms-flex-pack: end;
		    justify-content: flex-end;
		    padding-right: 30upx;
			text-align: right;
			height: 60upx;
			line-height: 60upx;
			font-size: 32upx;
			font-weight: bold;
			color: #ffffff;
		}
		.icon_vs {
		    position: absolute;
		    height: 42px;
		    width: 42px;
		    z-index: 3;
		    left: 50%;
		    top: 50%;
		    -webkit-transform: translate(-50%,-50%);
		    transform: translate(-50%,-50%);
		}
		.circle_box {
		    position: absolute;
		    left: 50%;
		    top: 50%;
		    -webkit-transform: translate(-50%,-50%);
		    transform: translate(-50%,-50%);
		    height: 100%;
		    width: 300px;
		    overflow: hidden;
		    z-index: 2;
		}
		.circle {
		    height: 42px;
		    width: 42px;
		    position: absolute;
		    left: 50%;
		    top: 50%;
		    -webkit-transform: translate(-50%,-50%);
		    transform: translate(-50%,-50%);
		    border-radius: 50%;
		    -webkit-animation: ripple .7s linear infinite;
		    animation: ripple .7s linear infinite;
		}
	}
	.market{
		display: flex;
		justify-content: space-between;
		font-size: 22upx;
		padding: 10upx 20upx 20upx 20upx;
		.col{
			width: 45%;
			.row{
				display: flex;
				justify-content: space-between;
			}
		}
	}
	.header{
		display: flex;
		justify-content: space-between;
		padding: 10upx 20upx;
		.l{
			.price{
				font-weight: bold;
			}
			.price .value{
				font-size: 48upx;
			}
		}
		.r{
			text-align: right;
			.no{
				border: 1upx solid #007F0E;
				border-radius: 50upx;
				padding: 8upx 20upx;
				font-size: 22upx;
				font-weight: bold;
				color: #007F0E;
			}
			.marketcap{
				display: block;
				padding-top: 20upx;
			}
		}
	}
</style>
