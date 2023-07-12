<template>
	<view class="content kisotM">
		<view class="real">
			<text class="symbol">{{prediction.priceSymbol.toUpperCase()}}</text>
			<text class="price">${{ticker.close}}</text>
		</view>
		<swiper class="swiper" :current="current" previous-margin="40px" next-margin="40px" :indicator-dots="false" :autoplay="false" :interval="2000" :duration="500">
			<swiper-item v-for="(item, i) in round.list">
				<view class="swiper-item">
					<view v-if="item.status == 0 && showPetPanel">
						<view class="header nomal-bg-color w">
							<view @click="showPetPanel = false" class="arrow"><u-icon name="arrow-leftward"></u-icon></view>
							<view @click="changePosition" class="position" :class="betForm.position=='bull' ? 'up-bg-color' : 'down-bg-color'">{{positionMap[betForm.position]}}</view>
						</view>
						<view class="main" style="padding: 0 30upx;">
							<view class="balance">
								<view class="symbol">
									<image :src="account.icon" mode="widthFix" style="width: 40upx;margin-right: 20upx;"></image>
									<text class="coin">{{account.symbol}}</text>
								</view>
								<text class="amount">{{account.normalBalance| fixed(account.showPrecision)}}</text>
							</view>
							<view class="input">
								<input type="number" placeholder="0.00" v-model="betForm.volume"/>
							</view>
							<view class="silder">
								<view class="item" @click="changePer(0.1)">10%</view>
								<view class="item" @click="changePer(0.25)">25%</view>
								<view class="item" @click="changePer(0.5)">50%</view>
								<view class="item" @click="changePer(0.75)">75%</view>
								<view class="item" @click="changePer(1)">{{i18n.prediction.max}}</view>
							</view>
							<button class="draw-btn" @click="handleBet">{{i18n.prediction.bet}}</button>
						</view>
					</view>
					<view class="panel" v-if="item.status != 0 || (item.status == 0 && !showPetPanel)">
						<view class="mask" v-if="item.status == 2"></view>
						<view class="header">
							<text class="status">{{statusMap[item.status]}}</text>
							<text class="time" v-if="item.status == 0">{{betInterval | timer(0, i18n.prediction.locking, i18n.prediction.settling)}}</text>
							<text class="time" v-if="item.status == 1">{{lockInterval | timer(1)}}</text>
							<text class="epo">#{{item.id}}</text>
						</view>
						<view class="main">
							<view class="item">
								<image class="img" :src="item | setBg('top')"></image>
								<view class="txt" :class="{'nomal-color': item.lockPrice >= item.closePrice}">
									<text class="tag">{{i18n.prediction.up}}</text>
									<view class="pay">
										<text class="v">{{item | setPayout('bull')}}x</text>Payout
									</view>
								</view>
							</view>
							<view class="body" :class="[item.closePrice > item.lockPrice ? 'up-border-color':'',item.closePrice < item.lockPrice ? 'down-border-color':'',item.closePrice == item.lockPrice ? 'nomal-border-color':'']">
								<view class="bet" v-if="item.status == 0">
									<view class="row">
										<text class="label">{{i18n.prediction.pool}}:</text>
										<text class="value">{{item.bullAmount + item.bearAmount}}</text>
									</view>
									<view class="row">
										<view v-if="!round.isBet" class="bet-btn up-bg-color" @click="showBet(item, 'bull')">{{i18n.prediction.guessUp}}</view>
										<view v-if="!round.isBet" class="bet-btn down-bg-color" @click="showBet(item, 'bear')">{{i18n.prediction.guessDown}}</view>
										<view v-if="round.isBet" class="bet-btn beted" :class="round.betInfo.position == 'bull' ? 'up-bg-color' : 'down-bg-color'">{{i18n.prediction.beted}}{{positionMap[round.betInfo.position]}}</view>
									</view>
								</view>
								<view class="over" v-if="item.status != 0">
									<view class="row">
										<text class="label">{{i18n.prediction.startPrice}}:</text>
										<text class="value">{{item.lockPrice}}</text>
									</view>
									<view class="row">
										<text class="label">{{i18n.prediction.endPrice}}:</text>
										<text class="value">{{item.closePrice}}</text>
									</view>
									<view class="row">
										<text class="label">{{i18n.prediction.pool}}:</text>
										<text class="value">{{item.bullAmount + item.bearAmount}}</text>
									</view>
								</view>
							</view>
							<view class="item">
								<image class="img" :src="item | setBg('bottom')"></image>
								<view class="txt" :class="{'nomal-color': item.lockPrice <= item.closePrice}">
									<view class="pay">
										<text class="v">{{item | setPayout('bear')}}x</text>Payout
									</view>
									<text class="tag">{{i18n.prediction.down}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="bottom">
			<view @click="slider('left')">
				<u-icon name="arrow-leftward" size="34" color="rgb(31, 199, 212)"></u-icon>
			</view>
			<view class="item">
				<view class="menus">
					<button @click="navTo('/pages/prediction/history')" class="sc-hKFxyN kUxtnz" scale="sm"><image src="../../static/icon-pre1.png"/></button>
					<button @click="navTo(`/pages/prediction/kline?symbol=${prediction.priceSymbol}`)" class="sc-hKFxyN dRonwK sc-hBMUJo cEIpjQ" scale="sm"><image src="../../static/icon-pre2.png"/></button>
					<button @click="navTo('/pages/prediction/history')" class="sc-hKFxyN dRonwK sc-hBMUJo cEIpjQ" scale="sm"><image src="../../static/icon-pre3.png"/></button>
				</view>
			</view>
			<view @click="slider('right')">
				<u-icon name="arrow-rightward" size="34" color="rgb(31, 199, 212)"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [commonMixin],
		data() {
			return {
				upColor: '#31D0AA',
				downColor: '#ED4B9E',
				nomalColor: '#EFF4F5',
				predictionId: 1,
				prediction: {priceSymbol: ''},
				ticker: {},
				statusMap: {
					0: '投注中',
					1: '锁定中',
					2: '已结束'
				},
				round: {
					list: [],
					isBet: false,
					betInfo: {}
				},
				betInterval: 300,
				lockInterval: 300,
				betTimer: null,
				lockTimer: null,
				current: 0,
				isInit: false,
				showPetPanel: false,
				positionMap: {
					'bull': '涨',
					'bear': '跌'
				},
				betForm: {
					roundId: undefined,
					volume: undefined,
					position: 'bull'
				},
				account: {
					
				}
			}
		},
		filters: {
			setPayout(item, position){
				let total = item.bullAmount + item.bearAmount
				if(position == 'bull'){
					return item.bullAmount == 0 ? 0.00 : (total / item.bullAmount).toFixed(2)
				} else {
					return item.bearAmount == 0 ? 0.00 : (total / item.bearAmount).toFixed(2)
				}
			},
			setBg: function(item, side){
				let bgImg = {
					'top': {
						'up': 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjY1IiB3aWR0aD0iMjQwIiB2aWV3Qm94PSIwIDAgMjQwIDY1IiBjb2xvcj0idGV4dCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBjbGFzcz0ic2MtYmRueFJNIGtEV2xjYSI+PHBhdGggZD0iTTEwIDQ5LjI3NlY2NGgyMjRWNDkuMjc1YTE2IDE2IDAgMCAwLTEwLjYxOS0xNS4wNjdMMTM4LjQ4IDMuODg2YTQ5IDQ5IDAgMCAwLTMyLjk2MSAwbC04NC45IDMwLjMyMkExNiAxNiAwIDAgMCAxMCA0OS4yNzZ6IiBmaWxsPSIjMzFEMEFBIiBmaWx0ZXI9InVybCgjZmlsdGVyMF9pKSIvPjxkZWZzPjxmaWx0ZXIgaWQ9ImZpbHRlcjBfaSIgeD0iMTAiIHk9IjEuMDMxIiB3aWR0aD0iMjI0IiBoZWlnaHQ9IjYyLjk2OSIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+PGZlQmxlbmQgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9InNoYXBlIi8+PGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPjxmZU9mZnNldC8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMSIvPjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9ImFyaXRobWV0aWMiIGsyPSItMSIgazM9IjEiLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTUgMCIvPjxmZUJsZW5kIGluMj0ic2hhcGUiIHJlc3VsdD0iZWZmZWN0MV9pbm5lclNoYWRvdyIvPjwvZmlsdGVyPjwvZGVmcz48L3N2Zz4=',
						'down': 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjY1IiB3aWR0aD0iMjQwIiB2aWV3Qm94PSIwIDAgMjQwIDY1IiBjb2xvcj0idGV4dCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBjbGFzcz0ic2MtYmRueFJNIGtEV2xjYSI+PHBhdGggZD0iTTEwIDQ5LjI3NlY2NGgyMjRWNDkuMjc1YTE2IDE2IDAgMCAwLTEwLjYxOS0xNS4wNjdMMTM4LjQ4IDMuODg2YTQ5IDQ5IDAgMCAwLTMyLjk2MSAwbC04NC45IDMwLjMyMkExNiAxNiAwIDAgMCAxMCA0OS4yNzZ6IiBmaWxsPSIjRUQ0QjlFIiBmaWx0ZXI9InVybCgjZmlsdGVyMF9pKSIvPjxkZWZzPjxmaWx0ZXIgaWQ9ImZpbHRlcjBfaSIgeD0iMTAiIHk9IjEuMDMxIiB3aWR0aD0iMjI0IiBoZWlnaHQ9IjYyLjk2OSIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+PGZlQmxlbmQgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9InNoYXBlIi8+PGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPjxmZU9mZnNldC8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMSIvPjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9ImFyaXRobWV0aWMiIGsyPSItMSIgazM9IjEiLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTUgMCIvPjxmZUJsZW5kIGluMj0ic2hhcGUiIHJlc3VsdD0iZWZmZWN0MV9pbm5lclNoYWRvdyIvPjwvZmlsdGVyPjwvZGVmcz48L3N2Zz4=',
						'nomal': 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjY1IiB3aWR0aD0iMjQwIiB2aWV3Qm94PSIwIDAgMjQwIDY1IiBjb2xvcj0idGV4dCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBjbGFzcz0ic2MtYmRueFJNIGtEV2xjYSI+PHBhdGggZD0iTTEwIDQ5LjI3NlY2NGgyMjRWNDkuMjc1YTE2IDE2IDAgMCAwLTEwLjYxOS0xNS4wNjdMMTM4LjQ4IDMuODg2YTQ5IDQ5IDAgMCAwLTMyLjk2MSAwbC04NC45IDMwLjMyMkExNiAxNiAwIDAgMCAxMCA0OS4yNzZ6IiBmaWxsPSIjRUZGNEY1IiBmaWx0ZXI9InVybCgjZmlsdGVyMF9pKSIvPjxkZWZzPjxmaWx0ZXIgaWQ9ImZpbHRlcjBfaSIgeD0iMTAiIHk9IjEuMDMxIiB3aWR0aD0iMjI0IiBoZWlnaHQ9IjYyLjk2OSIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+PGZlQmxlbmQgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9InNoYXBlIi8+PGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPjxmZU9mZnNldC8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMSIvPjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9ImFyaXRobWV0aWMiIGsyPSItMSIgazM9IjEiLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTUgMCIvPjxmZUJsZW5kIGluMj0ic2hhcGUiIHJlc3VsdD0iZWZmZWN0MV9pbm5lclNoYWRvdyIvPjwvZmlsdGVyPjwvZGVmcz48L3N2Zz4='
					},
					'bottom': {
						'up': 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjY1IiB3aWR0aD0iMjQwIiB2aWV3Qm94PSIwIDAgMjQwIDY1IiBjb2xvcj0idGV4dCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBjbGFzcz0ic2MtYmRueFJNIGtEV2xjYSI+PHBhdGggZD0iTTEwIDE1LjcyNFYxaDIyNHYxNC43MjVhMTYgMTYgMCAwIDEtMTAuNjE5IDE1LjA2N0wxMzguNDggNjEuMTE0YTQ5IDQ5IDAgMCAxLTMyLjk2MSAwbC04NC45LTMwLjMyMkExNiAxNiAwIDAgMSAxMCAxNS43MjR6IiBmaWxsPSIjMzFEMEFBIiBmaWx0ZXI9InVybCgjZmlsdGVyMF9pKSIvPjxkZWZzPjxmaWx0ZXIgaWQ9ImZpbHRlcjBfaSIgeD0iMTAiIHk9IjEiIHdpZHRoPSIyMjQiIGhlaWdodD0iNjIuOTY5IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+PGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz48ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiLz48ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+PGZlT2Zmc2V0Lz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxIi8+PGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazI9Ii0xIiBrMz0iMSIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xNSAwIi8+PGZlQmxlbmQgaW4yPSJzaGFwZSIgcmVzdWx0PSJlZmZlY3QxX2lubmVyU2hhZG93Ii8+PC9maWx0ZXI+PC9kZWZzPjwvc3ZnPg==',
						'down': 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjY1IiB3aWR0aD0iMjQwIiB2aWV3Qm94PSIwIDAgMjQwIDY1IiBjb2xvcj0idGV4dCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBjbGFzcz0ic2MtYmRueFJNIGtEV2xjYSI+PHBhdGggZD0iTTEwIDE1LjcyNFYxaDIyNHYxNC43MjVhMTYgMTYgMCAwIDEtMTAuNjE5IDE1LjA2N0wxMzguNDggNjEuMTE0YTQ5IDQ5IDAgMCAxLTMyLjk2MSAwbC04NC45LTMwLjMyMkExNiAxNiAwIDAgMSAxMCAxNS43MjR6IiBmaWxsPSIjRUQ0QjlFIiBmaWx0ZXI9InVybCgjZmlsdGVyMF9pKSIvPjxkZWZzPjxmaWx0ZXIgaWQ9ImZpbHRlcjBfaSIgeD0iMTAiIHk9IjEiIHdpZHRoPSIyMjQiIGhlaWdodD0iNjIuOTY5IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+PGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz48ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiLz48ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+PGZlT2Zmc2V0Lz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxIi8+PGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazI9Ii0xIiBrMz0iMSIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xNSAwIi8+PGZlQmxlbmQgaW4yPSJzaGFwZSIgcmVzdWx0PSJlZmZlY3QxX2lubmVyU2hhZG93Ii8+PC9maWx0ZXI+PC9kZWZzPjwvc3ZnPg==',
						'nomal': 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjY1IiB3aWR0aD0iMjQwIiB2aWV3Qm94PSIwIDAgMjQwIDY1IiBjb2xvcj0idGV4dCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBjbGFzcz0ic2MtYmRueFJNIGtEV2xjYSI+PHBhdGggZD0iTTEwIDE1LjcyNFYxaDIyNHYxNC43MjVhMTYgMTYgMCAwIDEtMTAuNjE5IDE1LjA2N0wxMzguNDggNjEuMTE0YTQ5IDQ5IDAgMCAxLTMyLjk2MSAwbC04NC45LTMwLjMyMkExNiAxNiAwIDAgMSAxMCAxNS43MjR6IiBmaWxsPSIjRUZGNEY1IiBmaWx0ZXI9InVybCgjZmlsdGVyMF9pKSIvPjxkZWZzPjxmaWx0ZXIgaWQ9ImZpbHRlcjBfaSIgeD0iMTAiIHk9IjEiIHdpZHRoPSIyMjQiIGhlaWdodD0iNjIuOTY5IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+PGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz48ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiLz48ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+PGZlT2Zmc2V0Lz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxIi8+PGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazI9Ii0xIiBrMz0iMSIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xNSAwIi8+PGZlQmxlbmQgaW4yPSJzaGFwZSIgcmVzdWx0PSJlZmZlY3QxX2lubmVyU2hhZG93Ii8+PC9maWx0ZXI+PC9kZWZzPjwvc3ZnPg=='
					}
				}
				if(item.status == 0){
					return bgImg[side].nomal;
				}
				if(item.closePrice > item.lockPrice){
					return side == 'top' ? bgImg[side].up : bgImg[side].nomal;
				}
				if(item.closePrice < item.lockPrice){
					return side == 'bottom' ? bgImg[side].down : bgImg[side].nomal;
				}
				if(item.closePrice == item.lockPrice){
					return bgImg[side].nomal;
				}
			},
			timer: function(interval, status, locking, settling){
				if(interval <= 0){
					return status == 0 ? locking : settling
				}
				let m = Math.floor(interval/60);
				let s = (interval % 60).toFixed(0);
				m += '';
				s += '';
				m  = (m.length==1)?'0'+m:m;
				s  = (s.length==1)?'0'+s:s;
				return m+':'+s; 
			}
		},
		onShow() {
			this.statusMap = {
				0: this.i18n.prediction.status.betting,
				1: this.i18n.prediction.status.locking,
				2: this.i18n.prediction.status.over
			}
			this.positionMap = {
				'bull': this.i18n.prediction.up,
				'bear': this.i18n.prediction.down
			}
		},
		onLoad(option){
			this.getPrediction()
		},
		methods: {
			...mapActions('common', ['marketTicker']),
			...mapActions('prediction', ['predictionDetail','predictionRounds','predictionBet','predictionHistory']),
			...mapActions('account', ['getAccount']),
			changePer(scale){
				let balance = this.account.normalBalance;
				if(balance && balance == 0){
					return;
				}
				this.betForm.volume = (balance * scale).toFixed(this.account.showPrecision)
			},
			handleBet(){
				let _this = this
				if(!this.betForm.volume){
					this.$api.msg(this.i18n.prediction.inputVol)
					return;
				}
				uni.showModal({
				    title: this.i18n.common.tip,
				    content: this.i18n.prediction.tip1 + ' ' + this.positionMap[this.betForm.position] + ' ' + this.i18n.prediction.bet +'?',
					cancelText: this.i18n.popup.cancel,
					confirmText: this.i18n.popup.confirm,
				    success: function (res) {
				        if (res.confirm) {
				            _this.predictionBet(_this.betForm).then(res =>{
				            	_this.$api.msg(_this.i18n.prediction.betSuccess)
								_this.showPetPanel = false
								_this.getRounds()
				            })
				        } else if (res.cancel) {
				            
				        }
				    }
				});
			},
			loadAccount(){
				this.getAccount(this.prediction.betCoin).then(res =>{
					this.account = res.data
				})
			},
			showBet(item, position){
				if(!this.isLogin()){
					uni.navigateTo({
						url: '/pages/public/login'
					})
					return
				}
				this.loadAccount()
				this.betForm.roundId = item.id
				this.betForm.position = position
				this.showPetPanel = true
			},
			changePosition(){
				this.betForm.position = this.betForm.position == 'bull' ? 'bear' : 'bull';
			},
			getPrediction(){
				this.predictionDetail({id: this.predictionId}).then(res =>{
					this.prediction = res.data
					this.getRounds()
					this.getMarketTicker()
					setInterval(() => {
						this.getRounds()
						this.getMarketTicker()
					}, 3000)
				})
			},
			getMarketTicker(){
				this.marketTicker({symbol: this.prediction.priceSymbol, plat: 'huobi'}).then(res =>{
					this.ticker = res.data
					this.refreshClosePrice()
				})
			},
			refreshClosePrice(){
				if(this.round.list != null && this.round.list.length > 0){
					for(let i = 0; i < this.round.list.length; i++){
						let item = this.round.list[i]
						if(item.status == 1){
							item.closePrice = this.ticker.close
							break
						}
					}
				}
			},
			getRounds(){
				this.predictionRounds({id: this.prediction.id}).then(res =>{
					this.round = res.data
					if(!this.isInit){
						this.current = this.round.list.length - 1
						this.isInit = true
					}
					for(let i = 0; i < this.round.list.length; i++){
						let item = this.round.list[i]
						if(item.status == 1){
							item.closePrice = this.ticker.close
						}
						if(item.status == 0){
							this.betInterval = (item.lockTime - item.startTime) / 1000
							if(this.betTimer != null){
								clearInterval(this.betTimer)
							}
							this.betTimer = setInterval(() => {
								this.betInterval--;
							}, 1000)
						}
						if(item.status == 1){
							this.lockInterval = (item.endTime - item.lockTime) / 1000
							if(this.lockTimer != null){
								clearInterval(this.lockTimer)
							}
							this.lockTimer = setInterval(() => {
								this.lockInterval--;
							}, 1000)
						}
					}
				})
			},
			slider(side){
				if(side == 'left'){
					if(this.current > 0){
						this.current--;
						return
					}
				}
				if(side == 'right'){
					if(this.current < this.round.list.length - 1){
						this.current++;
						return
					}
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
	page{
		width: 100%;
		height: 100%;
	}
	.content{
		position: fixed;
		width: 100%;
		height: 100%;
		max-height: 100%;
		padding-top: 120upx;
	}
	.bottom{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		background-color: #ffffff;
		padding: 0 30upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.menus{
			background-color: rgb(239, 244, 245);
			border-radius: 16px;
		}
		.sc-hKFxyN image{
			width: 38upx;
			height: 38upx;
		}
		.kUxtnz {
		    -webkit-box-align: center;
		    align-items: center;
		    border: 0px;
		    border-radius: 16px;
		    cursor: pointer;
		    display: inline-flex;
		    font-family: inherit;
		    font-size: 16px;
		    font-weight: 600;
		    -webkit-box-pack: center;
		    justify-content: center;
		    letter-spacing: 0.03em;
		    line-height: 1;
		    opacity: 1;
		    outline: 0px;
		    transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
		    height: 32px;
		    padding: 0px 16px;
		    background-color: rgb(122, 110, 170);
		    color: rgb(255, 255, 255);
		}
		.dRonwK {
		    -webkit-box-align: center;
		    align-items: center;
		    border: 0px;
		    border-radius: 16px;
		    cursor: pointer;
		    display: inline-flex;
		    font-family: inherit;
		    font-size: 16px;
		    font-weight: 600;
		    -webkit-box-pack: center;
		    justify-content: center;
		    letter-spacing: 0.03em;
		    line-height: 1;
		    opacity: 1;
		    outline: 0px;
		    transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
		    height: 32px;
		    padding: 0px 16px;
		    background-color: rgb(239, 244, 245);
		    box-shadow: none;
		    color: rgb(31, 199, 212);
		}
	}
	.real{
		width: 400upx;
		height: 100upx;
		line-height: 100upx;
		background-color: #ffffff;
		display: flex;
		justify-content: space-between;
		padding: 0 30upx;
		border-radius: 20upx;
		margin: 100upx auto;
		.symbol{
			font-weight: bold;
		}
	}
	.swiper{
		height: 600upx;
		.swiper-item{
			height: 600upx;
			background-color: #ffffff;
			border-radius: 20upx;
			text-align: center;
			margin: 0 20upx;
		}
		.panel{
			position: relative;
			.mask{
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 100%;
				background: rgba(255, 255, 255, 0.4);
				border-radius: 20upx;
				z-index: 9999999;
			}
		}
		.main{
			padding-top: 20upx;
			.balance{
				display: flex;
				justify-content: space-between;
				font-weight: bold;
				padding: 40upx 10upx;
			}
			.balance .symbol{
				display: flex;
				align-items: center;
			}
			.draw-btn{
				-webkit-box-align: center;
				align-items: center;
				border: 0px;
				border-radius: 16px;
				cursor: pointer;
				display: inline-flex;
				font-family: inherit;
				font-size: 16px;
				font-weight: 600;
				-webkit-box-pack: center;
				justify-content: center;
				letter-spacing: 0.03em;
				line-height: 1;
				opacity: 1;
				outline: 0px;
				transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
				height: 48px;
				padding: 0px 24px;
				background-color: rgb(31, 199, 212);
				color: white;
				width: 100%;
				margin-top: 30upx;
			}
			.silder{
				display: flex;
				justify-content: space-between;
				padding: 40upx 0;
				.item{
					-webkit-box-align: center;
					align-items: center;
					border: 0px;
					border-radius: 16px;
					cursor: pointer;
					display: inline-flex;
					font-family: inherit;
					font-weight: 600;
					-webkit-box-pack: center;
					justify-content: center;
					letter-spacing: 0.03em;
					line-height: 1;
					opacity: 1;
					outline: 0px;
					transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
					height: 20px;
					font-size: 12px;
					padding: 0px 8px;
					background-color: rgb(239, 244, 245);
					box-shadow: none;
					color: rgb(31, 199, 212);
				}
			}
			.input input{
				background-color: rgb(238, 234, 244);
				border: 1px solid rgb(215, 202, 236);
				border-radius: 16px;
				padding: 8px 16px;
				height: 80upx;
				text-align: right;
			}
		}
		.item{
			position: relative;
			.img{
				width: 100%;
				height: 130upx;
			}
			.txt{
				position: absolute;
				top: 30upx;
				left:0; 
				right:0;
				color: #ffffff;
			}
			.txt .tag{
				font-size: 38upx;
				font-weight: bold;
			}
			.txt .pay .v{
				font-size: 30upx;
				font-weight: bold;
				margin-right: 10upx;
			}
		}
		.swiper-item .body{
			height: 200upx;
			margin-top: -7upx;
			margin-left: 20upx;
			margin-right: 20upx;
			border-radius: 20upx;
			padding: 20upx 40upx;
			font-size: 32upx;
			.row{
				display: flex;
				justify-content: space-between;
			}
			.bet-btn{
				height: 80upx;
				line-height: 80upx;
				width: 40%;
				margin-top: 20upx;
				color: #ffffff;
				border-radius: 10upx;
			}
			.beted{
				width: 60%;
				margin: 20upx auto;
			}
		}
		.swiper-item .header{
			height: 80upx;
			line-height: 80upx;
			background-color: rgb(118, 69, 217);
			border-top-left-radius: 20upx;
			border-top-right-radius: 20upx;
			display: flex;
			justify-content: space-between;
			padding: 0 20upx;
			color: #ffffff;
			font-size: 30upx;
			.position{
				width: 140upx;
				height: 50upx;
				line-height: 50upx;
				margin-top: 14upx;
				border-radius: 10upx;
				color: #ffffff;
			}
		}
		.swiper-item .w{
			color: #000000 !important;
		}
		.DMOHQ {
			background: linear-gradient(rgb(83, 222, 233) 0%, rgb(118, 69, 217) 100%);
			border-radius: 16px;
			padding: 1px;
		}
	}
	.kisotM {
	    background: linear-gradient(rgb(203, 215, 239) 0%, rgb(154, 159, 208) 100%);
	    height: calc(100vh - 64px);
	    min-height: calc(100vh - 64px);
	    overflow: hidden;
	    position: relative;
	}
	.up-font-color{
		color: #31D0AA;
	}
	.down-font-color{
		color: #ED4B9E;
	}
	.nomal-font-color{
		color: #EFF4F5;
	}
	.up-bg-color{
		background-color: #31D0AA;
	}
	.down-bg-color{
		background-color: #ED4B9E;
	}
	.nomal-bg-color{
		background-color: #EFF4F5 !important;
	}
	.up-border-color{
		border: 4upx solid #31D0AA;
	}
	.down-border-color{
		border: 4upx solid #ED4B9E;
	}
	.nomal-border-color{
		border: 4upx solid #EFF4F5;
	}
	.nomal-color{
		color: #333333 !important;
	}
</style>
