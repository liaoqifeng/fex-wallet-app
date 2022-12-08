<template>
	<view>
		<view class="notice-item">
			<view @click="navTo(`/pages/notice/detail?id=${item.noticeId}`)" class="content little-line" v-for="(item, index) in notices">
				<text class="title">{{item.noticeTitle}}</text>
			</view>
		</view>
		<u-loadmore v-show="total > 10" :load-text="loadText" :status="loadingStatus" bg-color="#f8f8f8"/>
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
				notices: [],
				total: 0,
				empty: false, //空白页现实  true|false
				query: {
					page: 1,
					limit: 10,
					classfiy: 0
				},
				totalCount: 0,
				loadingStatus: 'loadmore',
				isLastPage: false
			}
		},
		onShow(){
			uni.setNavigationBarTitle({
				title: this.i18n.notice.title
			})
			this.getNoticeList()
		},
		onReachBottom(){
			if(!this.isLastPage){
				this.query.page += 1
				this.getNoticeList()
			}
		},
		onPullDownRefresh() {
			this.notices = []
			this.query.page = 1
			this.getNoticeList();
		},
		methods: {
			...mapActions('common', ['noticeList']),
			getNoticeList(){
				this.loadingStatus = 'loading'
				this.noticeList(this.query).then(res =>{
					uni.stopPullDownRefresh()
					this.empty = res.total <= 0
					this.total = res.total
					this.isLastPage = (this.query.page == res.pages)
					if(this.isLastPage){
						this.loadingStatus = 'nomore'
					} else {
						this.loadingStatus = 'loadmore'
					}
					if(this.empty){
						this.notices = [];
					} else {
						this.notices = this.notices.concat(res.rows)
					}
				}).catch(error =>{
					this.loadingStatus = 'loadmore'
					uni.stopPullDownRefresh()
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	page {
		background-color: $page-color-base;
	}

	.notice-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 20upx 0;
	}

	.time {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80upx;
		padding-top: 10upx;
		font-size: 26upx;
		color: #7d7d7d;
	}

	.content {
		width: 710upx;
		padding: 10upx 24upx;
		background-color: #fff;
		border-radius: 4upx;
		font-weight: bold;
	}

	.title {
		display: flex;
		align-items: center;
		font-size: 32upx;
		color: #303133;
		padding: 20upx 0;
	}

	.img-wrapper {
		width: 100%;
		height: 260upx;
		position: relative;
	}

	.pic {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 6upx;
	}

	.cover {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		font-size: 36upx;
		color: #fff;
	}

</style>
