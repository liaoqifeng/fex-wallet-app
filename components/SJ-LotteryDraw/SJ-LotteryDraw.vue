<template>
	<view class="lottery_container">
		<view class="grid_wrap">
			<view class="lottery_wrap">
				<ul class="lottery_grid">
					<li v-for="(item, index) in grid_info_arr" :class="{ active: current_index == index && index != 8 }" :key="index":data-index="index">
						<image class="grid_img" mode='aspectFit' :src="item.logo" />
						<view class="weizhongj">{{item.text}}</view>
					</li>
					<view class="luckDraw" @tap="luck_draw">{{i18n.lottery.tip6}}</view>
				</ul>
				
			</view>
		</view>
		<!-- 抽奖完成弹出的窗口 -->
		<!-- <view class="lottery_finish_wrap">
			
		</view> -->
	</view>

</template>

<script>
	import LotteryDraw from './SJ-LotteryDraw.js';
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [commonMixin],
		data() {
			return {
				current_index: -1,
			};
		},
		props: {
			grid_info_arr: {
				type: Array,
				default: function() {
					return grid_info
				}
			},
		},
		onLoad() {
		},

		methods: {
			luck_draw(event) {
				console.log(event);
				let index = event.currentTarget.dataset.index;
				let that = this;
					// 点击抽奖之后知道获奖位置，修改父组件中lottery_draw_param的值
				this.$emit('get_winingIndex', function(res){
					let lottery_draw_param=res;
					let win = new LotteryDraw({
							domData: that.grid_info_arr,
							...lottery_draw_param
						},
						function(index, count) {
							that.current_index = index;
							if (lottery_draw_param.winingIndex == index && lottery_draw_param.totalCount == count) {
								that.$emit('luck_draw_finish', that.grid_info_arr[index])
							}
						}
					);
				});

			}
		}
	};
</script>

<style scoped lang="css">
	@import './SJ-LotteryDraw.css';
</style>
