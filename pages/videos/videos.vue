<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false"><block slot="backText"></block><block slot="content">番组计划</block></cu-custom>
		<view class="cu-bar bg-white search solid-bottom">
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tablist" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</scroll-view>
		</view>
		<view class="cu-card case bg-white margin-top" v-for="(item,index) in fanZuAnimateList" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="item.animateid">
			<view class="cu-item shadow  animation-slide-left"  :style="[{animationDelay: (index*0.1 + 1)*0.2 + 's'}]">
				<view class="bg-img bg-mask flex align-center videos-img"  :style="{backgroundImage:'url('+item.img+')'}">
					<view class="padding-xl text-white">
						<view class="padding-xs text-xxl text-bold">
							{{item.name}}
						</view>
						<view class="padding-xs text-lg">
							<view class="text-cut padding" style="width:220px">{{item.intro}}</view>
						</view>
					</view>
				</view>
				<view class="cu-list menu-avatar comment solids-top">
					<view class="cu-item">
						<view class="cu-avatar round margin-top-xs bg-gray text-sm" >
							{{item.name.substring(0,1)}}
						</view>
						<view class="content">
							<view class="text-grey border-title">
								<view class="text-sm text-bold text-cut">{{item.info.substring(3,item.info.length)}}</view>
							</view>
							<view class="text-grey border-title">
								<view class="text-sm text-bold">{{item.number}}</view>
							</view>
						</view>
						<view class="action text-xl">
							<text class="cuIcon-share padding-xs"></text>
							<text class="cuIcon-delete padding-xs"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--弹窗-->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-blue light justify-end">
					<view class="content text-orange">{{modaltitle}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{message}}
				</view>
			</view>
		</view>
		<!--加载中-->
		<spinbox fix v-if="loadModal" :themeColor="themeColor"></spinbox>
		<!--下拉加载 -->
		<view class="cu-load" :class="!isLoad?'loading':'over'"></view>
		<!--悬浮按钮 -->
		<uni-fab
			:pattern="pattern"
			:content="content"
			:horizontal="horizontal"
			:vertical="vertical"
			:direction="direction"
			@trigger="trigger"
		 v-if="isshowtab"></uni-fab>
	</view>
</template>

<script>
	import commonutil from '../../common/util.js';
	import spinbox from '../../components/spin-box.vue';
	import uniFab from '../../components/uni-fab/uni-fab.vue';
	export default {
		components: {
			spinbox,
			uniFab,
		},
		data() {
			return {
				tablist:['全部','热血','冒险','搞笑','运动','竞技','装逼','剧情','青春','后宫','校园','励志','恋爱','百合','耽美','战斗','机战','科幻','萝莉','奇幻','魔法','动画','治愈','美食','萌系','偶像','泡面','漫改','轻改','催泪','日常','少儿','少女','社团','推理','乙女','其他'],
				TabCur: 0,
				scrollLeft: 0,
				isLoad:false,//false :正在加载 true:加载完成
				weekData:[],//一周更新
				wallpapers:[],
				themeColor: '#0081ff',
				loadModal: false,
				modalName: null,
				modaltitle:'',
				message:'',
				// bimi数据开始
				fanZuAnimateList:[],
				page:0,
				pageSize:0,
				totalCount:0,
				totalPage:0,
				firstPage:true,
				lastPage:false,
				//悬浮按钮
				directionStr: '水平',
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'vertical',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#7A7E83'
				},
				content: [
					{
						iconPath: '../../static/img/top.png',
						selectedIconPath: '../../static/img/topHL.png',
						text: 'Top',
						active: false
					},
					/* {
						iconPath: '../../static/img/home.png',
						selectedIconPath: '../../static/img/homeHL.png',
						text: 'Home',
						active: false
					}, */
				],
				isshowtab:false,
				// bimi数据结束
			}
		},
		onLoad() {
			this.setshareimg();
		},
		onUnload() {
			this.page = 0;
			this.pageSize = 0;
			this.totalCount = 0;
			this.totalPage = 0;
			this.firstPage = true;
			this.lastPage = false;
			this.fanZuAnimateList = [];
		},
		onReachBottom() {
			console.log("onReachBottom");
			/* if(this.TabCur != null&&this.TabCur != ""&&this.TabCur != undefined)//搜索后上拉加载
			{
				setTimeout(() => {
					this.getfanZuAnimateListBySort();
				}, 300);
			} else{ */
				if(this.lastPage){//最后一页了
					this.isLoad = true;
					return;
				}
				if(this.page == this.totalPage){
					this.isLoad = true;
					return;
				}
				setTimeout(() => {
					this.setfanZuAnimateList();
				}, 300);
				
				
				/* if (this.currentindex > this.newslength) {
					// this.loadMoreText = "没有更多数据了!"
					this.isLoad = true;
					return;
				}
				let len = 10;
				if(this.newslength<10)
				{
					len=this.newslength;
				}
				else
				{
					if (this.newslength-this.currentindex<10) {
						len = this.newslength-this.currentindex;
					}
				}
				let idstr='';
				for (var i = 0; i < len; i++) {
					let newid = this.newsids[this.currentindex+i];
					if (i == (len-1)) {
						idstr +=newid.id;
					} else{
						idstr +=newid.id+",";
					}
				}
				this.newsidstr = idstr;
				setTimeout(() => {
					this.setData();
				}, 300); */
			// }
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh');
			//变更分类初始化数据
			this.page = 0;
			this.pageSize = 0;
			this.totalCount = 0;
			this.totalPage = 0;
			this.firstPage = true;
			this.lastPage = false;
			this.getfanZuAnimateListBySort();
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				//变更分类初始化数据
				this.page = 0;
				this.pageSize = 0;
				this.totalCount = 0;
				this.totalPage = 0;
				this.firstPage = true;
				this.lastPage = false;
				this.getfanZuAnimateListBySort();
			},
			/* getWeekData: function() {
				this.loadModal = true;
				var url = 'api/b/animation/recent?isWeek=true';
				var linkurl = commonutil.getUri(commonutil.testurl,url);
				setTimeout(()=>{
					uni.request({
						url:linkurl,
						success: (res) => {
							let weekdata = res.data;
							var rdata = [];
							if(weekdata!=null&&weekdata.length>0){
								let curweek = '';
								for (var i = 0; i < weekdata.length; i++) {
									if(i>1) continue;
									switch (i){
										case 0:
											curweek = '周日';
											break;
										case 1:
											curweek = '周一';
											break;
										case 2:
											curweek = '周二';
											break;
										case 3:
											curweek = '周三';
											break;
										case 4:
											curweek = '周四';
											break;
										case 5:
											curweek = '周五';
											break;
										case 6:
											curweek = '周六';
											break;				
										default:
											break;
									}
									if(weekdata[i]!=null&&weekdata[i].length>0){
										let tempdata = weekdata[i];
										for (var j = 0; j < tempdata.length; j++) {
											let BAnimation = {};
											let id = tempdata[j].id;
											let name = tempdata[j].name;
											let avatar = tempdata[j].avatar;
											let intro = tempdata[j].intro;
											let updateToTime = tempdata[j].updateToTime;
											BAnimation.id = id;
											BAnimation.name = name;
											let index = Math.floor(Math.random()*40);
											avatar= this.wallpapers[index].thumb;
											BAnimation.url = avatar;
											BAnimation.type = "image";
											BAnimation.curweek = curweek;
											BAnimation.intro = intro;
											BAnimation.updateToTime = updateToTime;
											rdata.push(BAnimation);
										}
									}
								}
								this.weekData = rdata;
							}
							else
							{
								this.modalName="Modal";
								this.modaltitle ="Warn";
								this.message = "推荐数据获取失败！";
							}
							this.loadModal = false;//页面渲染成功隐藏加载
							uni.stopPullDownRefresh();
						}
					})
				}, 1000)	
			}, */
			setshareimg()
			{
				var linkurl = commonutil.getUri(commonutil.imgurl,'v1/vertical/category/4e4d610cdf714d2966000002/vertical?limit=40&adult=false&first=1&order=new');
				uni.request({
					// url:'http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&kw=%E9%A3%8E%E6%99%AF&start=0&count=99',
					url:linkurl,
					success:(res)=> {
						// var index = Math.floor(Math.random()*99);
						// this.shareimg= res.data.data[index].thumb;
						if(res.data.res!=null&&res.data.res.vertical!=null){
							this.wallpapers = res.data.res.vertical;
							// this.getWeekData();
							 this.getfanZuAnimateList();
						}	
					}
				});
			},
			toChild(e) {
				let animateid = e.currentTarget.dataset.id;
				if(animateid!=null&&animateid!=""&&animateid!=undefined){
					uni.navigateTo({
						url: e.currentTarget.dataset.url+'?animateid='+animateid
					})
				}else{
					commonutil.modalTap("网络开小差啦！");
				}
				
			},
			// bimiAPI开始
			getfanZuAnimateList()//番组计划
			{
				this.loadModal = true;
				this.isLoad = false;
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/fanZuAnimateList');
				setTimeout(()=>{
					uni.request({
						url:linkurl,
						success:(res)=> {
							if(res.data!=null){
								if(res.data.restate!=null){
									commonutil.modalTap("网络异常！");
								}else{
									if(res.data.list!=null){
										for(let i=0;i<res.data.list.length;i++){
											let list = res.data.list[i];
											let url = list.url;
											let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
											res.data.list[i].animateid = animateid;
											if(commonutil.istest){
												res.data.list[i].img = this.getrandomimg();
											}
										}
										this.fanZuAnimateList = res.data.list;
										this.page = res.data.page;
										this.pageSize = res.data.pageSize;
										this.totalCount = res.data.totalCount;
										this.totalPage = res.data.totalPage;
										this.lastPage = res.data.lastPage;
										this.firstPage = res.data.firstPage;
									}
								}
							}
							this.loadModal = false;//页面渲染成功隐藏加载
							this.isLoad = true;
							uni.stopPullDownRefresh();
						},
						fail: () => {
							commonutil.modalTap("网络出小差了！");
							this.loadModal = false;//页面渲染成功隐藏加载
							this.isLoad = true;
							uni.stopPullDownRefresh();
						}
					});
				}, 1000)	
			},
			getfanZuAnimateListBySort()//番组计划加入分类条件
			{
				this.loadModal = true;
				this.isLoad = false;
				let sort = this.tablist[this.TabCur];
				if(sort!= null&&sort != ""&&sort != undefined){
					let burl = "";
					if(this.TabCur == 0){
						burl = '/bimianimate/fanZuAnimateList';
					}
					else{
						burl = '/bimianimate/fanZuAnimateList?sort='+sort;
					}
					var linkurl = commonutil.getUri(commonutil.apiurl,burl);
					setTimeout(()=>{
						uni.request({
							url:linkurl,
							success:(res)=> {
								if(res.data!=null){
									if(res.data.restate!=null){
										commonutil.modalTap("网络异常！");
									}else{
										if(res.data.list!=null){
											for(let i=0;i<res.data.list.length;i++){
												let list = res.data.list[i];
												let url = list.url;
												let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
												res.data.list[i].animateid = animateid;
												if(commonutil.istest){
													res.data.list[i].img = this.getrandomimg();
												}
											}
											this.fanZuAnimateList = res.data.list;
											this.page = res.data.page;
											this.pageSize = res.data.pageSize;
											this.totalCount = res.data.totalCount;
											this.totalPage = res.data.totalPage;
											this.lastPage = res.data.lastPage;
											this.firstPage = res.data.firstPage;
											
											this.loadModal = false;//页面渲染成功隐藏加载
											uni.stopPullDownRefresh();
										}
									}
								}
								this.loadModal = false;//页面渲染成功隐藏加载
								this.isLoad = true;
								uni.stopPullDownRefresh();
							},
							fail: () => {
								commonutil.modalTap("网络出小差了！");
								this.loadModal = false;//页面渲染成功隐藏加载
								this.isLoad = true;
								uni.stopPullDownRefresh();
							}
						});
					}, 1000)
				}
				else
				{
					this.modalName="Modal";
					this.modaltitle ="Warn";
					this.message = "网络开小差。。。";
				}
			},
			setfanZuAnimateList()//番组计划加载更多
			{
				this.loadModal = true;
				this.isLoad = false;
				let sort = this.tablist[this.TabCur];
				let cpage = Number(this.page)+1;
				if(sort!= null&&sort != ""&&sort != undefined){
					let burl = "";
					if(this.TabCur == 0){
						burl = '/bimianimate/fanZuAnimateList?page='+cpage;
					}
					else{
						burl = '/bimianimate/fanZuAnimateList?sort='+sort+'&page='+cpage;
					}
					var linkurl = commonutil.getUri(commonutil.apiurl, burl);
					setTimeout(()=>{
						uni.request({
							url:linkurl,
							success:(res)=> {
								if(res.data!=null){
									if(res.data.restate!=null){
										commonutil.modalTap("网络异常！");
									}else{
										if(res.data.list!=null){
											for(let i=0;i<res.data.list.length;i++){
												let list = res.data.list[i];
												let url = list.url;
												let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
												res.data.list[i].animateid = animateid;
												if(commonutil.istest){
													res.data.list[i].img = this.getrandomimg();
												}
											}
											// this.fanZuAnimateList = res.data.list;
											this.page = res.data.page;
											this.pageSize = res.data.pageSize;
											this.totalCount = res.data.totalCount;
											this.totalPage = res.data.totalPage;
											this.lastPage = res.data.lastPage;
											this.firstPage = res.data.firstPage;
											
											this.fanZuAnimateList = this.fanZuAnimateList.concat(res.data.list);
											this.loadModal = false;//页面渲染成功隐藏加载
											uni.stopPullDownRefresh();
										}
									}
								}
								this.loadModal = false;//页面渲染成功隐藏加载
								this.isLoad = true;
								uni.stopPullDownRefresh();
							},
							fail: () => {
								commonutil.modalTap("网络出小差了！");
								this.loadModal = false;//页面渲染成功隐藏加载
								this.isLoad = true;
								uni.stopPullDownRefresh();
							}
						});
					}, 1000)
				}
				else
				{
					this.modalName="Modal";
					this.modaltitle ="Warn";
					this.message = "网络开小差。。。";
				}	
			},
			getrandomimg: function () {
				let index = Math.floor(Math.random()*40);
				let avatar= this.wallpapers[index].thumb;
				return avatar;
			},
			trigger(e) {
				console.log(e);
				var that = this;
				this.content[e.index].active = !e.item.active;
				for (let i =0;i<this.content.length;i++) {
					if(i!=e.index)
					{
						this.content[i].active = false;
					}
				}
				var message = {};
				switch (e.index){
					case 0:
						uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
						});
						this.isshowtab =false;
						break;
					case 1:
						uni.switchTab({
						    url: '/pages/index/index'
						});
						break;
					case 2:
						break;
					case 3:
						break;			
					default:
						break;
				}
			},
			onPageScroll(e) {
				if(e.scrollTop>this.screenHeight){
					this.isshowtab = true;
				}
				else{
					this.isshowtab = false;
				}
			},	
			// bimiAPI结束
		}
	}
</script>

<style>
	@import "../../components/colorui/animation.css";
	.videos-img{
		height: calc(100vh/3);
	}
</style>
