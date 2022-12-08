// z-paging
// github地址:https://github.com/SmileZXLee/uni-z-paging
// dcloud地址:https://ext.dcloud.net.cn/plugin?id=3935
// 反馈QQ群：790460711
// z-paging枚举

const Enum = {
	//当前加载类型 0-下拉刷新 1-上拉加载更多
	LoadingType: {
		Refresher: 0,
		LoadingMore: 1
	},
	//下拉刷新状态 0-默认状态 1.松手立即刷新 2.刷新中
	RefresherStatus: {
		Default: 0,
		PullToRefresh: 1,
		Loading: 2
	},
	//底部加载更多状态 0-默认状态 1.加载中 2.没有更多数据 3.加载失败
	LoadingMoreStatus: {
		Default: 0,
		Loading: 1,
		NoMore: 2,
		Fail: 3
	}
}

module.exports = Enum;
