<template>
	<view class="container">
		<uni-indexed-list :options="list" :show-select="false" @click="change"/>
	</view>
</template>

<script>
	import uniIndexedList from '../../components/uni-indexed-list/uni-indexed-list.vue'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		components: {
			uniIndexedList
		},
		data() {
			return {
				list:  [],
				sourceList: []
			};
		},
		onNavigationBarSearchInputChanged(data){
			console.log(data)
			if(data.text){
				this.sourceList.forEach((item, index) => {
					let letter = data.text.charAt(0).toUpperCase()
					if(item.letter == letter){
						if(item.data.length == 0){
							this.list = []
						} else {
							let array = []
							item.data.forEach((d, i) =>{
								if(d.indexOf(data.text.toUpperCase()) >= 0){
									array.push(d)
								}
							})
							this.list = [{letter: letter, data: array}]
						}
					}
				})
			} else {
				this.list = this.sourceList
			}
		},
		onLoad(){
			this.coinList().then(res =>{
				let coins = this.pySort(res.data, true, 'symbol')
				this.sourceList = coins
				this.list = coins
			})
		},
		methods:{
			...mapActions('common', ['coinList']),
			change(e){
				let a = JSON.stringify(e)
				this.$api.msg(e.item.name);
				uni.$emit('selectCoin',{coin: e})
				uni.navigateBack({ })
			},
			pySort(arr,empty,key){
			      if(!String.prototype.localeCompare)
			          return null;
			      var letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split('');
			      var arrList = [];//存放所有的字符串
			      for(var m =0;m<arr.length;m++){
			          arrList.push(arr[m][key]);
			      }
			      var result = [];
			      var curr;
			      for(var i=0;i<letters.length;i++){
			          curr = {letter: letters[i], data:[]};
			          if(i!=26){
			              for(var j =0;j<arrList.length;j++){
			                  var initial = arrList[j].charAt(0);           //截取第一个字符
			                  if(arrList[j].charAt(0)==letters[i]||arrList[j].charAt(0)==letters[i].toLowerCase()){   //首字符是英文的
			                      curr.data.push(arr[j].symbol); //把对象加入到curr里。也可以 curr.data.push(arrList[j]) 这样data里就是所有的字符串
			                      
			                  }
			              }
			          }else{
			              for(var k =0;k<arrList.length;k++){
			                  var ini = arrList[k].charAt(0);           //截取第一个字符
			                  if(!this.isChar(ini)&&!this.isChinese(ini)){
			                      curr.data.push(arr[k].symbol);
			                  }
			              }
			          }
			
			          if(empty || curr.data.length) {
			              result.push(curr);
			          }
			      }
			      return result;
			  },
			  //判断是否是中文
			  isChinese(temp){
			        var re=/[^\u4E00-\u9FA5]/;
			        if (re.test(temp)){return false  ;}
			        return true ;
			  },
			//判断是否是英文
			 isChar(char){
			      var reg = /[A-Za-z]/;
			      if (!reg.test(char)){return false ;}
			      return true ;
			  }
		}
	}
</script>

<style lang='scss' scoped>
	
</style>
