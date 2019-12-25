<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">咨询详情</block></cu-custom>
		<view class="bg-img bg-mask flex align-center"  :style="{backgroundImage:'url('+newsimg+')',height:'207px'}">
			<view class="padding-xl text-white">
				<view class="padding-xs text-xxl text-bold">
					<text class="text-bold">{{artDetaildata.title}}</text>
				</view>
			</view>
		</view>
		<view class="bg-white">
			
			<view class="cu-list menu-avatar comment">
				<view class="flex solid-bottom padding-top-sm justify-start">
					<text class="cuIcon-myfill padding-sm margin-xs ">{{artDetaildata.autor}}</text> 
					<text class="cuIcon-timefill padding-sm margin-xs ">{{artDetaildata.updatetime}}</text> 
					<text class="cuIcon-attentionfavorfill padding-sm margin-xs ">{{artDetaildata.hits}}</text> 
				</view>
				<view class="cu-item" style="padding: 0;">
					<view class="content">
						<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
							<view class="flex">
								<view class="flex-sub">
									<view class="cu-chat">
										<view class="cu-item bg-gray" style="padding: 20upx;">
											<view class="cu-avatar round" style="background-image:url(../../static/img/grey.png);"></view>
											<view class="main">
												<view class="content light bg-brown shadow" style="margin: 0 -20upx 0 10upx;">
													{{newsintro}}
												</view>
											</view>
										</view>
									</view>
										
									<!-- <view class="cu-bar bg-gray solid-bottom margin-top">
										<view class="action">
											<view class="solid-bottom text-xl padding" style="white-space: nowrap;">
												<text class=" cuIcon-titles text-blue"></text>正文
											</view>
										</view>
									</view> -->
									<view class="padding bg-gray radius newcontent" ><text class="padding-xs text-xxl"></text>{{artDetaildata.newsinfo}}<text class="padding-xs text-xxl"></text></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>	
		</view>
		<!--加载中-->
		<spinbox fix v-if="loadModal" :themeColor="themeColor"></spinbox>
	</view>
</template>

<script>
	import commonutil from '../../common/util.js';
	import spinbox from '../../components/spin-box.vue';
	export default {
		components: {
			spinbox
		},
		onLoad(options) {
			if(options.pageid!=null&&options.pageid!=""&&options.pageid!=undefined)
			{
				this.pageid = options.pageid.substring(options.pageid.indexOf("artdetail-")+10, options.pageid.length);
				this.setshareimg();
			}
			else{
				commonutil.modalTap("网络开小差啦！");
			}
			
		},
		onUnload() {
		},
		data() {
			return {
				artDetaildata:{},
				loadModal: false,
				themeColor: '#0081ff',
				pageid:'',
				newsimg:'../../static/img/grey.png',
				newsintro:'',
			}
		},
		methods: {
			getartDetail()
			{
				this.loadModal = true;
				uni.getStorage({
					key: "artNewsData",
					success: (newsres) => {
						this.newsimg = newsres.data.img;
						this.newsintro = newsres.data.info;
						if(this.newsintro!=null&&this.newsintro.length>50){
							this.newsintro = this.newsintro.substring(0,50)+" ...";
						}
						var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/artDetail?page='+this.pageid);
						var time = setInterval(
							uni.request({
								url:linkurl,
								success:(res)=> {
									if(res.data!=null){
										if(res.data.restate!=null){
											commonutil.modalTap("网络异常！");
										}else{
											let autor = res.data.autor;
											if(autor.indexOf("编辑")>=0){
												autor = autor.substring(autor.indexOf("编辑")+4,autor.length);
												autor = autor?autor:"bimi";
											}
											let updatetime = res.data.updatetime;
											if(updatetime.indexOf("更新时间：")>=0){
												updatetime = updatetime.substring(updatetime.indexOf("更新时间：")+5,updatetime.length);
											}
											let hits = res.data.hits;
											if(hits.indexOf("人气：")>=0){
												hits = hits.substring(hits.indexOf("人气：")+3,hits.length);
											}
											this.artDetaildata.autor = autor;
											this.artDetaildata.updatetime = updatetime;
											this.artDetaildata.hits = hits;
											this.artDetaildata.source = res.data.source;
											this.artDetaildata.title = res.data.title;
											this.artDetaildata.newsinfo = res.data.newsinfo;
											this.loadModal = false;//页面渲染成功隐藏加载
											uni.stopPullDownRefresh();
										}
									}
								}
							}), 1000);
							clearInterval(time);
					},
					fail: () => {
						commonutil.modalTap("页面参数初始化失败！");
					}
				})
			},
			setshareimg()
			{
				this.getartDetail();
			},
		}
	}
</script>

<style>
.cu-list.menu-avatar.comment>.cu-item {
	padding: 20upx 20upx 20upx 20upx;
	height: auto
}
.cu-chat .cu-item>.main {
	max-width: calc(100% - 140upx);
	margin: 0 30upx;
	display: flex;
	align-items: center;
}
.newcontent{
text-indent: 70upx;
width: 95vw;
}	
</style>
