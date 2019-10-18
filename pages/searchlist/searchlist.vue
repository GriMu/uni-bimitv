<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">搜索列表</block></cu-custom>
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
			}
		},
		onLoad(options) {
			if(options.keyword!=null&&options.keyword!=""&&options.keyword!=undefined)
			{
				this.keyword = options.keyword;
				this.setshareimg();
			}
			else{
				commonutil.modalTap("请输入搜索条件后查询！");
			}
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
							 this.searchByKeyWords();
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
											res.data.list[i].img = this.getrandomimg();
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
					url: e.currentTarget.dataset.url+'?id='+e.currentTarget.dataset.id
				})
			},
		}
	}
</script>

<style>

</style>
