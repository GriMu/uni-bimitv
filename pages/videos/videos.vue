<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false"><block slot="backText"></block><block slot="content">短视频</block></cu-custom>
		<view class="cu-bar bg-white search solid-bottom">
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tablist" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</scroll-view>
		</view>
		<view class="cu-card no-card case bg-white margin-top" v-for="(item,index) in weekData" :key="index" @tap="toChild" data-url="../plays/plays">
			<view class="cu-item shadow  animation-slide-left"  :style="[{animationDelay: (index*0.1 + 1)*0.2 + 's'}]">
				<view class="bg-img bg-mask flex align-center "  :style="{backgroundImage:'url('+item.url+')',height: '414upx'}">
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
						<view class="cu-avatar round margin-top-xs bg-gray" >
							{{item.name.substring(0,1)}}
						</view>
						<view class="content">
							<view class="text-grey border-title">
								<view class="text-sm text-bold">youxihenshao</view>
							</view>
							<view class="text-grey border-title">
								<view class="text-sm text-bold">{{item.updateToTime}}</view>
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
		<!--加载-->
		<view class="cu-load" :class="!isLoad?'loading':'over'"></view>
		<!--弹窗-->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-orange justify-end">
					<view class="content">{{modaltitle}}</view>
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
	</view>
</template>

<script>
	import dateutil from '../../common/util.js';
	import spinbox from '../../components/spin-box.vue';
	export default {
		components: {
			spinbox
		},
		data() {
			return {
				tablist:['爱看','健康','新闻','情感','快看','舞蹈','电视剧','综艺','电影','动漫'],
				TabCur: 0,
				scrollLeft: 0,
				isLoad:true,
				weekData:[],//一周更新
				wallpapers:[],
				themeColor: '#0081ff',
				loadModal: false,
				modalName: null,
				modaltitle:'',
				message:'',
			}
		},
		onLoad() {
			this.setshareimg();
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			getWeekData: function() {
				this.loadModal = true;
				var url = 'api/b/animation/recent?isWeek=true';
				var linkurl = dateutil.getUri('http://www.youxihenshao.com/',url);
				setTimeout(()=>{
					uni.request({
						url:linkurl,
						success: (res) => {
							// debugger
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
			},
			setshareimg()
			{
				var linkurl = dateutil.getUri('http://service.picasso.adesk.com/','v1/vertical/category/4e4d610cdf714d2966000002/vertical?limit=40&adult=false&first=1&order=new');
				uni.request({
					// url:'http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&kw=%E9%A3%8E%E6%99%AF&start=0&count=99',
					url:linkurl,
					success:(res)=> {
						// var index = Math.floor(Math.random()*99);
						// this.shareimg= res.data.data[index].thumb;
						if(res.data.res!=null&&res.data.res.vertical!=null){
							this.wallpapers = res.data.res.vertical;
							this.getWeekData();
						}	
					}
				});
			},
			toChild(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
		}
	}
</script>

<style>
	@import "../../components/colorui/animation.css";
</style>
