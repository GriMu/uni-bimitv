<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false"><block slot="backText"></block><block slot="content">咨询列表</block></cu-custom>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section swiper">
					<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
					 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
					 indicator-active-color="#0081ff">
						<swiper-item v-for="(item,index) in zixundata" :key="index" :class="cardCur==index?'cur':''" @tap="toChild" data-url="../article/article" :data-id="item.id">
							<view class="swiper-item">
								<image :src="item.img" mode="aspectFill"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>	
			</view>	
		</view>
		<view class="page-section">
			<view class="cu-card article" :class="isCard?'no-card':''" v-for="(item,index) in zixunlist" :key="index" @tap="toChild" data-url="../article/article" :data-id="item.id">
				<view class="cu-item shadow bg-blue animation-slide-left"  :style="[{animationDelay: (index*0.1 + 1)*0.1 + 's'}]">
					<view class="title"><view class="text-cut">{{item.title}}</view></view>
					<view class="content">
						<image :src="item.img"
						 mode="aspectFill"></image>
						<view class="desc">
							<view class="text-content"> {{item.info?item.info:item.title}}</view>
							<view>
								<view class="cu-tag bg-red light sm round">{{item.publistime}}</view>
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
				dotStyle: false,
				zixundata:[],
				cardCur: 0,
				isCard:false,
				zixunlist:[],
				loadModal: false,
				themeColor: '#0081ff',
				isLoad:false,
				page:0,
				pageSize:0,
				totalCount:0,
				totalPage:0,
				firstPage:true,
				lastPage:false,
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
			this.zixundata = [];
			this.zixunlist = [];
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
				this.setzixunlist();
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
			this.zixundata = [];
			this.zixunlist = [];
			this.setzixunlist();
		},
		methods: {
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			toChild(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url+'?id='+e.currentTarget.dataset.id
				})
			},
			// bimiAPI开始
			getzixun()
			{
				this.loadModal = true;
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/zixun');
				setTimeout(()=>{
					uni.request({
						url:linkurl,
						success:(res)=> {
							if(res.data!=null){
								if(res.data.restate!=null){
									this.modalTap("网络异常！");
								}else{
									if(res.data.list!=null&&res.data.list.length>0){
										let len = res.data.list.length;
										for(let i=0;i<len;i++){
											let url = res.data.list[i].url;
											let artdetailid = url.substring(url.indexOf(".tv/")+4,url.length-1);
											res.data.list[i].artdetailid = artdetailid;
											res.data.list[i].img = this.getrandomimg();
										}
										
										if(len >5){
											len =5;
										}
										this.page = res.data.page;
										this.pageSize = res.data.pageSize;
										this.totalCount = res.data.totalCount;
										this.totalPage = res.data.totalPage;
										this.lastPage = res.data.lastPage;
										this.firstPage = res.data.firstPage;
										
										this.zixundata = res.data.list.slice(0,len);//前5篇咨询
										this.zixunlist = res.data.list;
										
										this.loadModal = false;//页面渲染成功隐藏加载
										uni.stopPullDownRefresh();
									}
								}
							}
						}
					});
				}, 1000)
			},
			setzixunlist()
			{
				this.loadModal = true;
				let cpage = Number(this.page)+1;
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/zixun?page='+cpage);
				setTimeout(()=>{
					uni.request({
						url:linkurl,
						success:(res)=> {
							if(res.data!=null){
								if(res.data.restate!=null){
									this.modalTap("网络异常！");
								}else{
									if(res.data.list!=null&&res.data.list.length>0){
										let len = res.data.list.length;
										for(let i=0;i<len;i++){
											let url = res.data.list[i].url;
											let artdetailid = url.substring(url.indexOf(".tv/")+4,url.length-1);
											res.data.list[i].artdetailid = artdetailid;
											res.data.list[i].img = this.getrandomimg();
										}
										
										this.page = res.data.page;
										this.pageSize = res.data.pageSize;
										this.totalCount = res.data.totalCount;
										this.totalPage = res.data.totalPage;
										this.lastPage = res.data.lastPage;
										this.firstPage = res.data.firstPage;
										
										this.zixunlist = this.zixunlist.concat(res.data.list);
										
										this.loadModal = false;//页面渲染成功隐藏加载
										uni.stopPullDownRefresh();
									}
								}
							}
						}
					});
				}, 1000)
			},
			setshareimg()
			{
				var linkurl = commonutil.getUri(commonutil.imgurl,'v1/vertical/category/4e4d610cdf714d2966000002/vertical?limit=40&adult=false&first=1&order=new');
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data.res!=null&&res.data.res.vertical!=null){
							this.wallpapers = res.data.res.vertical;
							 this.getzixun();
						}	
					}
				});
			},
			getrandomimg: function () {
				let index = Math.floor(Math.random()*40);
				let avatar= this.wallpapers[index].thumb;
				return avatar;
			},
			// bimiAPI结束
		}
	}
</script>

<style>
@import "../../components/colorui/animation.css";
</style>
