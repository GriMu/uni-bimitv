<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">搜索列表</block></cu-custom>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索图片、文章、视频" confirm-type="search"  @confirm="onKeyUserNameInput" @input="getinputword"></input>
			</view>
			<view class="action"  @tap="searchByKeyWords">
				<button class="cu-btn bg-cyan shadow-blur round">搜索</button>
			</view>
		</view>
		<view v-if="isHistory">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-blue"></text> 历史记录
				</view>
				<view class="action" @click="clearSearch">
					<text class="cuIcon-deletefill " ></text>
				</view>
			</view>
			<view class="cu-list menu sm-border">
				<view class="cu-item" >
					<view class="action">
						<view class="cu-tag round bg-orange light margin-sm" v-for="(item,index) in historyList" :key="index" >{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom ">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 搜索结果
			</view>
		</view>
		<view class="cu-card case bg-white solid-top">
			<view class="cu-timeline">
				<view class="cu-item cur cuIcon-time" v-for="(item,index) in searchlist" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="item.animateid">
					<view class="shadow-blur bg-white">
						<view class="grid col-2">
							<view class="cu-card case no-card"  >
								<view class="cu-item shadow">
									<view class="image">
										<image :src="item.img" mode="scaleToFill" style="height: 300upx;border-radius: 10upx;"></image>
									</view>
								</view>
							</view>
							<view class="cu-card menu case no-card"  >
								<view class="cu-item shadow">
									<view class="action padding-top text-lg">
										<text class="padding-left-sm">{{item.name}}</text>
									</view>
								</view>
								<view class="cu-item shadow padding-top-xl ">
									<view class="solid-bottom text-sm text-grey padding-bottom-sm padding-left-sm" >
										<text class="cuIcon-videofill "></text>
										<text class="margin-left-sm">{{item.info}}</text>
									</view>
									<view class="solid-bottom text-sm text-grey padding-bottom-sm padding-left-sm">
										<text class="cuIcon-peoplefill "></text>
										<text class="margin-left-sm">{{item.director}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--加载中-->
		<spinbox fix v-if="loadModal" :themeColor="themeColor"></spinbox>
		<!--下拉加载 -->
		<view class="cu-load" :class="!isLoad?'loading':'over'"></view>
	</view>
</template>

<script>
	import commonutil from '../../common/util.js';
	import spinbox from '../../components/spin-box.vue';
	export default {
		components: {
			spinbox
		},
		data() {
			return {
				searchlist:[],
				curday:'结果排序',
				loadModal: false,
				themeColor: '#0081ff',
				page:0,
				pageSize:0,
				totalCount:0,
				totalPage:0,
				firstPage:true,
				lastPage:false,
				keyword:'',
				isLoad:false,
				isHistory: false,
				historyList:[],
				InputBottom: 0,
			}
		},
		onLoad(options) {
			/* if(options.keyword!=null&&options.keyword!=""&&options.keyword!=undefined)
			{
				this.keyword = options.keyword; */
				this.setshareimg();
				// this.historyList = uni.getStorageSync('searchhistory');
				uni.getStorage({
					key: "searchhistory",
					success: (res) => {
						this.historyList = res.data;
						this.isHistory = true;
						
					},
					fail: () => {
						this.isHistory = false;
						this.historyList =[];
					}
				})
			/* }
			else{
				commonutil.modalTap("请输入搜索条件后查询！");
			} */
		},
		onUnload() {
			this.page = 0;
			this.pageSize = 0;
			this.totalCount = 0;
			this.totalPage = 0;
			this.firstPage = true;
			this.lastPage = false;
			this.searchlist = [];
		},
		onReachBottom() {
			if(this.lastPage){//最后一页了
				this.isLoad = true;
				return;
			}
			if(this.page == this.totalPage){
				this.isLoad = true;
				return;
			}
			setTimeout(() => {
				this.setmoresearchlist();
			}, 300);
		},
		onPullDownRefresh() {
			debugger
			//变更分类初始化数据
			this.page = 0;
			this.pageSize = 0;
			this.totalCount = 0;
			this.totalPage = 0;
			this.firstPage = true;
			this.lastPage = false;
			this.searchlist = [];
			this.searchByKeyWords();
		},
		methods: {
			setshareimg()
			{
				var linkurl = commonutil.getUri(commonutil.imgurl,'v1/vertical/category/4e4d610cdf714d2966000002/vertical?limit=40&adult=false&first=1&order=new');
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data.res!=null&&res.data.res.vertical!=null){
							this.wallpapers = res.data.res.vertical;
							this.isLoad = true;
							 // this.searchByKeyWords();
						}	
					}
				});
			},
			getrandomimg: function () {
				let index = Math.floor(Math.random()*40);
				let avatar= this.wallpapers[index].thumb;
				return avatar;
			},
			searchByKeyWords: function () {
				if(this.keyword!=null&&this.keyword!=""&&this.keyword!=undefined){
					this.loadModal = true;
					this.isLoad = false;
					this.setHistory(this.keyword);
					var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/searchByKeyWord?keyword='+this.keyword);
					setTimeout(()=>{
						uni.request({
							url:linkurl,
							success:(res)=> {
								if(res.data!=null){
									if(res.data.restate!=null){
										commonutil.modalTap("网络异常！");
									}else{
										if(res.data.list!=null&&res.data.list.length>0){
											let len = res.data.list.length;
											for(let i=0;i<len;i++){
												let url = res.data.list[i].url;
												let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
												res.data.list[i].animateid = animateid;
												res.data.list[i].img = this.getrandomimg();
											}
											
											this.page = res.data.page;
											this.pageSize = res.data.pageSize;
											this.totalCount = res.data.totalCount;
											this.totalPage = res.data.totalPage;
											this.lastPage = res.data.lastPage;
											this.firstPage = res.data.firstPage;
											
											this.searchlist = res.data.list;
											
											this.loadModal = false;//页面渲染成功隐藏加载
											uni.stopPullDownRefresh();
										}
									}
								}
							}
						});
					}, 1000)
				}
				else{
					commonutil.modalTap("请输入番剧名称！");
					
				}
			},
			setmoresearchlist()//加载更多
			{
				this.loadModal = true;
				this.isLoad = false;
				let cpage = Number(this.page)+1;
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/searchByKeyWord?page='+cpage+'&keyword'+this.keyword);
				setTimeout(()=>{
					uni.request({
						url:linkurl,
						success:(res)=> {
							if(res.data!=null){
								if(res.data.restate!=null){
									commonutil.modalTap("网络异常！");
								}else{
									if(res.data.list!=null&&res.data.list.length>0){
										let len = res.data.list.length;
										for(let i=0;i<len;i++){
											let url = res.data.list[i].url;
											let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
											res.data.list[i].animateid = animateid;
											// res.data.list[i].img = this.getrandomimg();
										}
										
										this.page = res.data.page;
										this.pageSize = res.data.pageSize;
										this.totalCount = res.data.totalCount;
										this.totalPage = res.data.totalPage;
										this.lastPage = res.data.lastPage;
										this.firstPage = res.data.firstPage;
										
										this.searchlist = this.searchlist.concat(res.data.list);
										this.loadModal = false;//页面渲染成功隐藏加载
										uni.stopPullDownRefresh();
									}
								}
							}
						}
					});
				}, 1000)
			},	
			toChild(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url+'?animateid='+e.currentTarget.dataset.id
				})
			},
			clearSearch() {
				uni.showModal({
					title: '提示',
					content: '是否清理全部搜索历史？该操作不可逆。',
					success: res => {
						if (res.confirm) {
							this.historyList = this.removeHistory();
							this.isHistory =false;
						}
					}
				});
			},
			removeHistory() {
				uni.removeStorage({
					key: 'searchhistory',
					success: function(res) {
					}
				});
				return []
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			getinputword: function(event) {  
                this.keyword = event.target.value  
            }, 
			onKeyUserNameInput: function(e) {
			    this.keyword = e.target.value  
				let text = this.keyword;
				if (!text) {
					this.historyList = [];
					this.historyList = uni.getStorageSync('searchhistory');
					uni.showModal({
						title: 'Tip',
						content: '请输入内容。',
						success: res => {
							if (res.confirm) {
							}
						}
					});
					return;
				} else {
					// this.isHistory = true;
					this.searchByKeyWords();
					// this.setHistory(text);
					/* uni.showModal({
						title: '提示',
						content: '您输入的内容为"${text}",如果点击确定,将记录到历史搜索,并返回.如果取消不做操作',
						success: res => {
							if (res.confirm) {
								this.setHistory(text);
								// uni.navigateBack();
							}
						}
					}); */
				}
			},
			
			/**
			 * 存储历史数据
			 * val [string | object]需要存储的内容
			 */
			setHistory(val) {
				let searchHistory = uni.getStorageSync('searchhistory');
				if (!searchHistory) searchHistory = [];
				let serachData = {};
				if (typeof(val) === 'string') {
					serachData = {
						// adcode: [],
						// address: [],
						// city: [],
						// district: [],
						// id: [],
						// location: [],
						name: val,
						// typecode: []
					};
				} else {
					serachData = val
				}
			
				// 判断数组是否存在，如果存在，那么将放到最前面
				for (var i = 0; i < searchHistory.length; i++) {
					if (searchHistory[i].name === serachData.name) {
						searchHistory.splice(i, 1);
						break;
					}
				}
			
				// searchHistory.unshift(util.dataHandle(serachData));
				searchHistory.push(serachData);
				this.isHistory = true;
				this.historyList = searchHistory;
				uni.setStorage({
					key: 'searchhistory',
					data: searchHistory,
					success: function() {
					}
				});
			},
		}
	}
</script>

<style>

</style>
