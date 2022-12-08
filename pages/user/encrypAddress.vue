<template>  
    <view class="container">  
		<u-empty :text="i18n.common.noData" :show="empty" mode="data" margin-top="60"></u-empty>
		<view class="addr-item" v-for="(item, i) in list" :key="item.id">
			<view class="t">
				<text class="coin">{{item.coin}}<text class="name">{{item.remark}}</text></text>
				<text class="del" @click="handleDelete(item.id, i)">{{i18n.common.delete}}</text>
			</view>
			<text class="addr">{{item.address}}</text>
		</view>
		<u-loadmore v-if="!empty" :load-text="loadText" :status="loadingStatus" :margin-top="30" :margin-bottom="20"/>
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
	import {authMixin, commonMixin} from '@/common/mixin/mixin.js'
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			mpvuePicker
		},
		mixins: [authMixin, commonMixin],
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
				loadingStatus: 'loadmore',
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
			uni.setNavigationBarTitle({
				title: this.i18n.my.payinaddress
			})
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
						this.loadingStatus = 'nomore'
					} else {
						this.loadingStatus = 'loadmore'
					}
					if(this.empty){
						this.list = [];
					} else {
						this.list = this.list.concat(res.rows)
					}
				}).catch(error => {
					this.loadingStatus = 'loadmore'
				})
			},
			handleDelete(id, i){
				let $this = this;
				uni.showModal({
				    title: $this.i18n.common.tip,
				    content: $this.i18n.popup.deletetext,
				    success: function (res) {
				        if (res.confirm) {
				            $this.deleteEncryptBook(id).then(res =>{
				            	$this.$api.msg($this.i18n.toast.deleteSuccess, 1000, false, 'none', function() {})
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
				this.list = []
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
		background: linear-gradient(45deg, #3783D9, #53A6EA);
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
		.addr{
			font-size: 26upx;
		}
	}
</style>