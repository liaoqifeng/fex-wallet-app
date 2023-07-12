import {
		mapState,
		mapActions
	} from 'vuex'
import {SITE_NAME} from '../../utils/global'
export const commonMixin = {
  computed:{
  	...mapState('user', ['loginInfo']),
	i18n() {
		return this.$t('message');
	}
  },
  data() {
    return {
		siteName: '',
		contentText: {
			contentdown: "上拉显示更多",
			contentrefresh: "正在加载...",
			contentnomore: "没有更多数据了"
		},
		loadText: {
			loadmore: '轻轻上拉',
			loading: '努力加载中',
			nomore: '实在没有了'
		}
	}
  },
  filters: {
	  fixed(v, scale){
		  if(v){
			  if(!scale){
				  scale = 2
			  }
			  return parseFloat(v).toFixed(scale)
		  }
		  return v
	  }
  },
  onShow(){
	  this.siteName = this.$g.SITE_NAME
	  this.contentText = {
		  contentdown: this.i18n.common.loadmoreText,
		  contentrefresh: this.i18n.common.loadingText,
		  contentnomore: this.i18n.common.nomoreText
	  }
	  this.loadText = {
		loadmore: this.i18n.common.loadmoreText,
		loading: this.i18n.common.loadingText,
		nomore: this.i18n.common.nomoreText
	  }
  },
  methods: {
	  isLogin(){
		  if(!this.loginInfo.hasLogin){
		  	uni.navigateTo({
		  		url: '/pages/public/login'
		  	})
		  } else {
		  	return true
		  }
	  },
	  i18nParse(v, params){
		  if(params && params.length > 0){
			  for(let i = 0; i < params.length; i++){
				  v = v.replaceAll('{'+i+'}', params[i])
			  }
		  }
		  return v
	  },
	  onBack(){
	  	uni.navigateBack()
	  },
	  navTo(url, auth){
		  if(auth && !this.loginInfo.hasLogin){
			  uni.navigateTo({
			  	url: '/pages/public/login'
			  })
			  return
		  }
		  uni.navigateTo({
		  	url: url
		  })
	  }
  }
}

export const authMixin = {
  computed:{
  	...mapState('user', ['loginInfo'])
  },
  onShow() {
	  if(!this.loginInfo.hasLogin){
	  	uni.navigateTo({
	  		url: '/pages/public/login'
	  	})
	  }
  },
  methods: {
  }
}

export const coinMixin = {
  computed: {
  	...mapState('common', ['coinMap'])
  },
  onShow() {
	  this.$fire.$emit('refreshCoin')
  },
  methods: {
	  parseCoinIcoin(coin){
		  return this.coinMap[coin] ? this.coinMap[coin].icon : ''
	  }
  }
}