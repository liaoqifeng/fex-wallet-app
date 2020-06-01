<template>
	<view class="container">
		<uni-indexed-list :options="list" :show-select="false" />
	</view>
</template>

<script>
	import uniIndexedList from './uni-indexed-list/uni-indexed-list.vue'
	import {  
	    mapMutations  
	} from 'vuex';
	export default {
		components: {
			uniIndexedList
		},
		data() {
			return {
				list:  [{
					"letter": "A",
					"data": [
						"AAA",
						"ATC"
					]
				},{
					"letter": "B",
					"data": [
						"BTC",
						"BBB"
					]
				}]
			};
		},
		methods:{
			...mapMutations(['logout']),

			navTo(url){
				this.$api.msg(`跳转到${url}`);
			}
		}
	}
</script>

<style lang='scss' scoped>
	
</style>
