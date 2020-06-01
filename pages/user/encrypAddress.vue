<template>  
    <view class="container">  
		<empty v-if="empty"></empty>
		<view class="addr-item" v-for="(item, i) in list" :key="item.id">
			<view class="t">
				<text class="coin">{{item.coin}}<text class="name">{{item.remark}}</text></text>
				<text class="del" @click="handleDelete(item.id, i)">删除</text>
			</view>
			<text>{{item.address}}</text>
		</view>
		<uni-load-more :status="loadingStatus"></uni-load-more>
		<mpvue-picker
			:themeColor="themeColor"
			ref="mpvuePicker"
			:mode="mode"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirm"
			:pickerValueArray="pickerValueArray"
		></mpvue-picker>
    </view>  
</template>  
<script>  
    import {
    	mapState,
    	mapActions
    } from 'vuex'
	import mpvuePicker from '../../components/mpvuePicker.vue'
	import empty from '../../components/empty.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			mpvuePicker,
			empty,
			uniLoadMore
		},
		data(){
			return {
				pickerValueArray: [],
				themeColor: '#007AFF',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				empty: false,
				list: [],
				isLastPage: false,
				loadingStatus: 'more',
				query: {
					page: 1,
					limit: 10,
					coin: ""
				}
			}
		},
		onReachBottom(){
			if(!this.isLastPage){
				this.query.page += 1
				this.getList()
			}
		},
		onShow() {
			this.list = []
			this.getList()
		},
		onLoad(){
			this.coinList().then(res =>{
				res.data.forEach((item, index) => {
					this.pickerValueArray.push({label: item.symbol, value: item.symbol})
				})
			})
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/user/updateEncrypAddress');
			}else if(index === 1){
				this.showSinglePicker()
			}
		},
		// #endif
        methods: {
			...mapActions('user', ['encryptBookList', 'deleteEncryptBook']),
			...mapActions('common', ['coinList']),
			async getList(){
				this.loadingStatus = 'loading'
				this.encryptBookList(this.query).then(res =>{
					this.empty = (res.total == 0)
					this.isLastPage = (this.query.page == res.pages)
					if(this.isLastPage){
						this.loadingStatus = 'noMore'
					} else {
						this.loadingStatus = 'more'
					}
					if(this.empty){
						this.list = [];
					} else {
						this.list = this.list.concat(res.rows)
					}
				}).catch(error => {
					this.loadingStatus = 'more'
				})
			},
			handleDelete(id, i){
				let $this = this;
				uni.showModal({
				    title: '提示',
				    content: '是否确认删除?',
				    success: function (res) {
				        if (res.confirm) {
				            $this.deleteEncryptBook(id).then(res =>{
				            	$this.$api.msg('删除成功', 1000, false, 'none', function() {})
								$this.list.splice(i, 1)
							})
				        }
				    }
				});
				
			},
			navTo(url){
				uni.navigateTo({  
					url
				})  
			},
			showSinglePicker() {
				this.mode = 'selector';
				this.deepLength = 1;
				this.pickerValueDefault = [0];
				this.$refs.mpvuePicker.show();
			},
			onConfirm(item){
				this.query.coin = item.value[0]
				this.getList()
			}
        }  
    }  
</script>  
<style lang='scss' scoped>
	.container{
		padding: 10upx 30upx;
		height: 100%;
	}
	.addr-item{
		font-size: $font-base;
		background: linear-gradient(right, #3783D9, #53A6EA);
		padding: 20upx 20upx;
		margin: 10upx 0;
		border-radius: 10upx;
		color: #fff;
		.t{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding-bottom: 20upx;
			.coin{
				font-weight: bold;
			}
			.name{
				margin-left: 20upx;
			}
		}
	}
</style>