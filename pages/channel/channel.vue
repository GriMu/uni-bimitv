<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false"><block slot="backText"></block><block slot="content">频道</block></cu-custom>
		<view class="cu-bar bg-white search solid-bottom">
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tablist" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
				<view class="padding-xs flex flex-wrap bg-white solid-bottom">
					<view class="padding-xs" v-for="(item,index) in catsData" :key="index" :data-cat="index">
						<view class='cu-tag round bg-blue'  v-if="index==curtagindex" >{{item}}</view>
						<view class='cu-tag round ' v-else >{{item}}</view>
					</view>
				</view>
			</scroll-view>
			<view class="action" style="margin-bottom: 90upx;">
				<text class="cuIcon-search xl"></text>
			</view>
		</view>
		<!--频道分类-->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 宫格列表
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="showModal" data-target="gridModal">设置</button>
			</view>
		</view>
		<!-- <view class="cu-modal" :class="modalName=='gridModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<radio-group class="block" @change="Gridchange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in 3" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{index +3}} 列</view>
								<radio class="round" :value="(index + 3) + ''" :class="gridCol==index+3?'checked':''" :checked="gridCol==index+3"></radio>
							</label>
						</view>
					</view>
				</radio-group>
				<view class="cu-list menu text-left solid-top">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">边框</text>
						</view>
						<view class="action">
							<switch @change="Gridswitch" :class="gridBorder?'checked':''" :checked="gridBorder?true:false"></switch>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		
		<view class="cu-card case bg-white">
			<view class="cu-item shadow">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="false" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in recom" :key="index">
					<view class="bg-img bg-mask flex align-end" :style="{backgroundImage:'url('+item.url+')',height:'100%'}">
						<view class="padding-xl text-white">
							<view class="padding-xs text-lg">
								{{item.name}}
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 猜你在追
			</view>
		</view>
		<view class="cu-card case">
			<view class="cu-item shadow">
				<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item" :class="index==TabCur?'text-blue':''" v-for="(item,index) in lastPartUpdate" :key="index" @tap="tabSelect" :data-id="index">
						<!-- <view class="bg-img padding-top-xl  flex align-end margin-top" :style="{backgroundImage:'url('+item.url+')',width: '400upx',height: '250upx'}">
							<view class="bg-shadeBottom  padding-top-xl flex-sub">
								{{item.name}}
							</view>
						</view> -->
						<view class="bg-img bg-mask flex align-center radius margin-top" :style="{backgroundImage:'url('+item.url+')',width: '400upx',height: '250upx'}">
							<view class="text-white">
								<view class="padding-xs text-lg">
									<view class="text-cut padding" style="width:220px">{{item.name}}</view>
								</view>
							</view>
						</view>
						<view class="content">
							<view>
								<text class="margin-right-xs">{{item.updateToTime}}</text></view>
							<view class="text-gray text-sm">
								<view class="text-cut padding" style="width:220px">{{item.intro}}</view></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 热剧精选等你来Pick
			</view>
		</view>
		<view class="cu-card case bg-white">
			<view class="cu-item shadow">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="false" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in lastPartUpdate" :key="index">
					<view class="bg-img bg-mask flex align-end" :style="{backgroundImage:'url('+item.url+')',height:'100%'}">
						<view class="padding-xl text-white">
							<view class="padding-xs text-lg">
								Only the guilty need fear me.
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			</view>
		</view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav bg-white" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 375upx)">
				<view class="cu-item" :class="index==yearTabCur?'text-blue cur':''" v-for="(item,index) in yearlist" :key="index" @tap="yearTabSelect"
				 :data-id="index">
					{{item.year}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 375upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(item,index) in yearlist" :key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-green"></text> {{item.year}}</view>
					</view>
					<view class="grid col-1">
						<view class="cu-card case no-card" v-for="(yitem,yindex) in item.yeardata" :key="yindex">
							<view class="cu-item shadow">
								<view class="image">
									<image :src="yitem.url" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
								</view>
								<view class="cu-bar"> 
									<text class="text-cut cuIcon-titles padding-left-sm">{{yitem.name}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 热剧追追追，空调wifi和好剧更配哦
			</view>
		</view>
		<view class="cu-card case bg-white">
			<view class="cu-item shadow">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="false" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in lastPartUpdate" :key="index">
					<view class="bg-img bg-mask flex align-end" :style="{backgroundImage:'url('+item.url+')',height:'100%'}">
						<view class="padding-xl text-white">
							<view class="padding-xs text-lg">
								Only the guilty need fear me.
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			</view>
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="wscrollLeft">
				<view class="cu-item" :class="index==wTabCur?'text-blue cur':''" v-for="(item,index) in animateontime" :key="index" @tap="weekDaySelect" :data-id="index">
					{{item}}
				</view>
			</scroll-view>
			<view class="cu-timeline">
				<view class="cu-time">{{curday}}</view>
				<view class="cu-item cur cuIcon-time" v-for="(item,index) in recentonanimate" :key="index">
					<view class="shadow-blur bg-white">
						<view class="grid col-2">
							<view class="cu-card case no-card"  >
								<view class="cu-item shadow">
									<view class="image">
										<image :src="item.img" mode="scaleToFill" style="height: 300upx;border-radius: 10upx;"></image>
									</view>
									<view class="cu-bar"> 
										<text class="text-cut cuIcon-titles padding-left-sm">{{item.name}}</text>
									</view>
								</view>
							</view>
							<view class="cu-card case no-card"  >
								<view class="cu-item shadow">
									<view class="content padding-top-sm">
										<view class="desc">
											<view class="text-content margin-top-xs">{{item.plot}}</view>
											<view class="text-gray text-sm text-right padding">
												<text class="cuIcon-timefill margin-lr-xs "></text> {{item.updatenums}}
												<text class="cuIcon-likefill margin-lr-xs padding-left"></text>评分 {{item.score}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="cu-item text-red cuIcon-attentionforbidfill">
					<view class="content bg-red shadow-blur">
						这是第一次，我家的铲屎官走了这么久。久到足足有三天！！
					</view>
				</view>
				<view class="cu-item text-grey cuIcon-evaluate_fill">
					<view class="content bg-grey shadow-blur">
						这是第一次，我家的铲屎官走了这么久。
					</view>
				</view>
				<view class="cu-item text-blue">
					<view class="bg-blue content">
						<text>20:00</text> 【月球】快件已到达月球，准备发往地球
					</view>
					<view class="bg-cyan content">
						<text>10:00</text> 【银河系】快件已到达银河系，准备发往月球
					</view>
				</view> -->
			</view>
		</view>
		<view v-for="(item,index) in animateRankinfos" :key="index">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-titles text-blue"></text> {{item}}
				</view>
			</view>
			<view class="cu-card case bg-white">
				<view class="cu-item shadow">
					<view class="image">
						<image :src="todayhot.url" mode="scaleToFill" style="height: 414upx;"></image>
						<view class="cu-tag bg-blue">{{todayhot.name}}</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{todayhot.intro}}</text></view>
					</view>
				</view>
				<view class="grid col-2 padding-sm">
					<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item1,index1) in newAnimateRank" :key="index1" v-if="index==0">
						<view class="cu-item shadow">
							<view class="image">
								<image :src="item1.url" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
							</view>
							<view class="cu-bar "> 
								<text class="cu-avatar radius sm bg-pink" v-if="index1<3">{{item1.rank.substring(0,item1.rank.length-1)}}</text>
								<text class="text-cut cuIcon-titles">{{item1.title}}</text>
							</view>
							<view class="solid-bottom text-sm">
								<text class="text-grey">评分:{{item1.score}}</text>
							</view>
						</view>
					</view>
					<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item1,index1) in chinaAnimateRank" :key="index1" v-else-if="index==1">
						<view class="cu-item shadow">
							<view class="image">
								<image :src="item1.url" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
							</view>
							<view class="cu-bar "> 
								<text class="cu-avatar radius sm bg-pink" v-if="index1<3">{{item1.rank.substring(0,item1.rank.length-1)}}</text>
								<text class="text-cut cuIcon-titles">{{item1.title}}</text>
							</view>
							<view class="solid-bottom text-sm">
								<text class="text-grey">评分:{{item1.score}}</text>
							</view>
						</view>
					</view>
					<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item1,index1) in animatePlanRank" :key="index1" v-else-if="index==2">
						<view class="cu-item shadow">
							<view class="image">
								<image :src="item1.url" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
							</view>
							<view class="cu-bar "> 
								<text class="cu-avatar radius sm bg-pink" v-if="index1<3">{{item1.rank.substring(0,item1.rank.length-1)}}</text>
								<text class="text-cut cuIcon-titles">{{item1.title}}</text>
							</view>
							<view class="solid-bottom text-sm">
								<text class="text-grey">评分:{{item1.score}}</text>
							</view>
						</view>
					</view>
					<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item1,index1) in movieAnimateRank" :key="index1" v-else-if="index==3">
						<view class="cu-item shadow">
							<view class="image">
								<image :src="item1.url" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
							</view>
							<view class="cu-bar "> 
								<text class="cu-avatar radius sm bg-pink" v-if="index1<3">{{item1.rank.substring(0,item1.rank.length-1)}}</text>
								<text class="text-cut cuIcon-titles">{{item1.title}}</text>
							</view>
							<view class="solid-bottom text-sm">
								<text class="text-grey">评分:{{item1.score}}</text>
							</view>
						</view>
					</view>
					<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item1,index1) in newAnimateScore" :key="index1" v-else-if="index==4">
						<view class="cu-item shadow">
							<view class="image">
								<image :src="item1.url" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
							</view>
							<view class="cu-bar "> 
								<text class="cu-avatar radius sm bg-pink" v-if="index1<3">{{item1.rank.substring(0,item1.rank.length-1)}}</text>
								<text class="text-cut cuIcon-titles">{{item1.title}}</text>
							</view>
							<view class="solid-bottom text-sm">
								<text class="text-grey">评分:{{item1.score}}</text>
							</view>
						</view>
					</view>
					<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item1,index1) in chinaAnimateScore" :key="index1" v-else-if="index==5">
						<view class="cu-item shadow">
							<view class="image">
								<image :src="item1.url" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
							</view>
							<view class="cu-bar "> 
								<text class="cu-avatar radius sm bg-pink" v-if="index1<3">{{item1.rank.substring(0,item1.rank.length-1)}}</text>
								<text class="text-cut cuIcon-titles">{{item1.title}}</text>
							</view>
							<view class="solid-bottom text-sm">
								<text class="text-grey">评分:{{item1.score}}</text>
							</view>
						</view>
					</view>
					<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item1,index1) in animatePlanScore" :key="index1" v-else-if="index==6">
						<view class="cu-item shadow">
							<view class="image">
								<image :src="item1.url" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
							</view>
							<view class="cu-bar "> 
								<text class="cu-avatar radius sm bg-pink" v-if="index1<3">{{item1.rank.substring(0,item1.rank.length-1)}}</text>
								<text class="text-cut cuIcon-titles">{{item1.title}}</text>
							</view>
							<view class="solid-bottom text-sm">
								<text class="text-grey">评分:{{item1.score}}</text>
							</view>
						</view>
					</view>
					<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item1,index1) in movieAnimateScore" :key="index1" v-else-if="index==7">
						<view class="cu-item shadow">
							<view class="image">
								<image :src="item1.url" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
							</view>
							<view class="cu-bar "> 
								<text class="cu-avatar radius sm bg-pink" v-if="index1<3">{{item1.rank.substring(0,item1.rank.length-1)}}</text>
								<text class="text-cut cuIcon-titles">{{item1.title}}</text>
							</view>
							<view class="solid-bottom text-sm">
								<text class="text-grey">评分:{{item1.score}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--弹窗-->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-blue justify-end">
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
		<!--加载-->
		<view class="cu-load" :class="!isLoad?'loading':'over'"></view>
	</view>
</template>

<script>
	import commonutil from '../../common/util.js';
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				tablist:['电视剧','综艺','电影','动漫'],
				catsData:['偶像爱情','玄幻史诗','全部分类'],
				curtagindex:-1,
				isCard:false,
				dotStyle: true,
				recom:[{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
					name:'阿卡丽'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
					name:'琴女'
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
					name:'刀妹'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					name:'天使'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
					name:'莫甘娜'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg',
					name:''
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
					name:'光辉'
				}],
				recentHot:[],//最近热门
				lastPartUpdate:[],//上周更新
				yearGroup:[],//年度
				wallpapers:[],
				yearlist:[],
				yearTabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				modalName: null,
				modaltitle:'',
				message:'',
				isLoad:true,
				todayhot:{},
				weekday:['昨日','今日','明日'],
				wTabCur: 0,
				wscrollLeft: 0,
				todayData:[],
				weekData:[],//一周更新
				curday:'',
				// bimi数据开始
				gridCol: 3,
				gridBorder: false,
				cuIconList: [{
					cuIcon: 'newsfill',
					color: 'red',
					badge: 120,
					name: '新闻咨询'
				}, {
					cuIcon: 'hotfill',
					color: 'orange',
					badge: 1,
					name: '新番发送'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '番组计划'
				}, {
					cuIcon: 'recordfill',
					color: 'olive',
					badge: 22,
					name: '国产动漫'
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '剧场动画'
				}, {
					cuIcon: 'videofill',
					color: 'blue',
					badge: 0,
					name: '影视剧集'
				}, {
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '发现'
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '帮助'
				}, {
					cuIcon: 'commandfill',
					color: 'purple',
					badge: 0,
					name: '问答'
				}, {
					cuIcon: 'brandfill',
					color: 'mauve',
					badge: 0,
					name: '版权'
				}],
				latestShowAnimatedata:[],
				animateRankdata:{
					'newAnimateRank':[],
					'chinaAnimateRank':[],
					'animatePlanRank':[],
					'movieAnimateRank':[],
					'newAnimateScore':[],
					'chinaAnimateScore':[],
					'animatePlanScore':[],
					'movieAnimateScore':[],
				},
				newAnimateRank:[],
				chinaAnimateRank:[],
				animatePlanRank:[],
				movieAnimateRank:[],
				newAnimateScore:[],
				chinaAnimateScore:[],
				animatePlanScore:[],
				movieAnimateScore:[],
				animateRankinfos:['新番发送排行榜','国产动漫排行榜','番组计划排行榜','剧场动画排行榜','新番发送评分榜','国产动漫评分榜','番组计划评分榜','剧场动画评分榜'],
				recentonanimate:[],
				animateontime:['昨日上映','今日上映','明日上映'],
				// bimi数据结束
			};
		},
		onLoad() {
			this.setshareimg();
			// this.getRecomData();
			// this.getWeekData();
			// this.getRecentHotData();
		},
		onReady() {
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			getRecomData: function() {
				var url = 'api/b/animation/recommend';
				var linkurl = commonutil.getUri(commonutil.testurl,url);
				uni.request({
					url:linkurl,
					success: (res) => {
						let recomdata = res.data;
						var rdata = [];
						if(recomdata!=null&&recomdata.length>0){
							for (var i = 0; i < recomdata.length; i++) {
								let BAnimation = {};
								let id = recomdata[i].BAnimation.id;
								let name = recomdata[i].BAnimation.name;
								let avatar = recomdata[i].BAnimation.avatar;
								BAnimation.id = id;
								BAnimation.name = name;
								let index = Math.floor(Math.random()*40);
								avatar= this.wallpapers[index].thumb;
								BAnimation.url = avatar;
								BAnimation.type = "image";
								rdata.push(BAnimation);
							}
							this.recom = rdata;
							let random =   Math.floor(Math.random()*(recomdata.length));
							this.todayhot = rdata[random];
						}
						else
						{
							this.modalName="Modal";
							this.modaltitle ="Warn";
							this.message = "推荐数据获取失败！";
						}
						
					}
				})
			},
			getLastPartUpdate: function() {
				var url = 'api/b/animation/lastPartUpdate';
				var linkurl = commonutil.getUri(commonutil.testurl,url);
				uni.request({
					url:linkurl,
					success: (res) => {
						let partupdate = res.data;
						var rdata = [];
						if(partupdate!=null&&partupdate.length>0){
							for (var i = 0; i < partupdate.length; i++) {
								let BAnimation = {};
								let id = partupdate[i].id;
								let name = partupdate[i].name;
								let avatar = partupdate[i].avatar;
								let updateToTime = partupdate[i].updateToTime;
								let intro = partupdate[i].intro;
								
								BAnimation.id = id;
								BAnimation.name = name;
								let index = Math.floor(Math.random()*40);
								avatar= this.wallpapers[index].thumb;
								BAnimation.url = avatar;
								BAnimation.type = "image";
								BAnimation.updateToTime = updateToTime;
								BAnimation.intro = intro;
								rdata.push(BAnimation);
							}
							this.lastPartUpdate = rdata;
						}
						else
						{
							this.modalName="Modal";
							this.modaltitle ="Warn";
							this.message = "推荐数据获取失败！";
						}
						
					}
				})
			},
			getYearGroup: function() {
				var url = 'api/b/animation/yearGroup';
				var linkurl = commonutil.getUri(commonutil.testurl,url);
				uni.request({
					url:linkurl,
					success: (res) => {
						let yeardata = res.data;
						var rdata = [];
						if(yeardata!=null&&yeardata.length>0){
							for (var i = 0; i < yeardata.length; i++) {
								let yearlist = {};
								let BAnimations =  yeardata[i].BAnimations;
								if(BAnimations!=null&&BAnimations.length>0)
								{
									let years = [];
									for (var j = 0; j < BAnimations.length; j++) {
										let BAnimation = {};
										let id = BAnimations[j].id;
										let name = BAnimations[j].name;
										let avatar = BAnimations[j].avatar;
										let followCount = BAnimations[j].followCount;
										let updateToTime = BAnimations[j].updateToTime;
										let intro = BAnimations[j].intro;
										BAnimation.id = id;
										BAnimation.name = name;
										let index = Math.floor(Math.random()*40);
										avatar= this.wallpapers[index].thumb;
										BAnimation.url = avatar;
										BAnimation.type = "image";
										BAnimation.followCount = followCount;
										BAnimation.updateToTime = updateToTime;
										BAnimation.intro = intro;
										years.push(BAnimation);
									}
									let year = yeardata[i].number + "年番剧";
									yearlist.year = year;
									yearlist.yeardata = years;
									// this.yearlist.push(year);
									this.yearlist.push(yearlist);
									rdata.push(years);
								}
								
							}
							this.yearGroup = rdata;
						}
						else
						{
							this.modalName="Modal";
							this.modaltitle ="Warn";
							this.message = "推荐数据获取失败！";
						}
						
					}
				})
			},
			setshareimg()
			{
				var linkurl = commonutil.getUri(commonutil.imgurl,'v1/vertical/category/4e4d610cdf714d2966000002/vertical?limit=40&adult=false&first=1&order=new');
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data.res!=null&&res.data.res.vertical!=null){
							this.wallpapers = res.data.res.vertical;
							this.getRecomData();
							this.getLastPartUpdate();
							this.getYearGroup();
							// this.getWeekData();
							// this.getPartData();
							// this.getLastUpdate();
							this.getlatestShowAnimate();
							this.getanimateRank();
						}
					}
				});
			},
			yearTabSelect(e) {
				this.yearTabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.yearlist.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + i);
						view.fields({
							size: true
						}, data => {
							this.yearlist[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.yearlist[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.yearlist.length; i++) {
					if (scrollTop > this.yearlist[i].top && scrollTop < this.yearlist[i].bottom) {
						this.verticalNavTop = (this.yearlist[i].id - 1) * 50
						this.tabCur = this.yearlist[i].id
						console.log(scrollTop)
						return false
					}
				}
			},
			getWeekData: function() {
				var url = 'api/b/animation/recent?isWeek=true';
				var linkurl = commonutil.getUri(commonutil.testurl,url);
				uni.request({
					url:linkurl,
					success: (res) => {
						let weekdata = res.data;
						var rdata = [];
						if(weekdata!=null&&weekdata.length>0){
							let curweek = '';
							for (var i = 0; i < weekdata.length; i++) {
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
									let daydata = [];
									for (var j = 0; j < tempdata.length; j++) {
										let BAnimation = {};
										let id = tempdata[j].id;
										let name = tempdata[j].name;
										let avatar = tempdata[j].avatar;
										let intro = tempdata[j].intro;
										let followCount = tempdata[j].followCount;
										let updateToTime = tempdata[j].updateToTime;
										
										BAnimation.id = id;
										BAnimation.name = name;
										let index = Math.floor(Math.random()*40);
										avatar= this.wallpapers[index].thumb;
										BAnimation.url = avatar;
										BAnimation.type = "image";
										BAnimation.curweek = curweek;
										if(intro!=null&&intro.length>50){
											intro = intro.substring(0,50)+" ...";
										}
										BAnimation.intro = intro;
										if(Number(followCount)>999){
											followCount = 999+"+";
										}
										BAnimation.followCount = followCount;
										if(updateToTime!=null&&updateToTime.length>19){
											updateToTime = updateToTime.substring(11,19);	
										}
										BAnimation.updateToTime = updateToTime;	
										daydata.push(BAnimation);
									}
									rdata.push(daydata);
								}
							}
							this.weekData = rdata;
							let today =  new Date().getDay();
							this.curday = this.weekday[1];
							this.wTabCur = 1;
							this.todayData = rdata[Number(today)];
							
						}
						else
						{
							this.modalName="Modal";
							this.modaltitle ="Warn";
							this.message = "推荐数据获取失败！";
						}
						
					}
				})
			},
			weekDaySelect_back: function(e) {
				if(this.weekData==null||this.weekData.length<=0){
					this.modalName="Modal";
					this.modaltitle ="Warn";
					this.message = "番剧数据更新失败！";
					return false;
				}
				
				this.wTabCur = e.currentTarget.dataset.id;
				this.wscrollLeft = (e.currentTarget.dataset.id-1 ) * 60;
				let index = Number(this.wTabCur);
				let today =  Number(new Date().getDay());
				let zday = today-1;
				let mday = today+1;
				if(today == 0){
					zday = 6;
				}
				else if(today == 6){
					mday = 1;
				}
				switch (index){
					case 0:
						this.curday = this.weekday[0];
						this.todayData = this.weekData[zday]; 
						break;
					case 1:
						this.curday = this.weekday[1];
						this.todayData = this.weekData[today];
						break;
					case 2:
						this.curday = this.weekday[2];
						this.todayData = this.weekData[mday];
						break;
					// case 3:
					// 	this.todayData = this.weekData[4];
					// 	break;
					// case 4:
					// 	this.todayData = this.weekData[5];
					// 	break;
					// case 5:
					// 	this.todayData = this.weekData[6];
					// 	break;
					// case 6:
					// 	this.todayData = this.weekData[0];
					// 	break;				
					default:
						break;
				}
			},
			hideModal(e) {
				this.modalName = null
			},
			Gridchange(e) {
				this.gridCol = e.detail.value
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value
			},
			// bimiAPI开始
			//最新上映
			getlatestShowAnimate()
			{
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/latestShowAnimate');
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data!=null){
							if(res.data.restate!=null){
								this.modalTap("网络异常！");
							}else{
								for(let i=0;i<res.data.length;i++){
									let url = res.data[i].url;
									let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
									res.data[i].animateid = animateid;
									res.data[i].img = this.getrandomimg();
								}
								debugger
								this.latestShowAnimatedata = res.data;
								let len = res.data.length;
								let pagecount = Math.floor(len/3);
								this.wTabCur =1;
								this.curday =this.animateontime[this.wTabCur];
								this.recentonanimate = res.data.slice(pagecount,pagecount*2);//今日上映
							}
						}
					}
				});
			},
			// 排行榜
			getanimateRank()
			{
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/animateRank');
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data!=null){
							if(res.data.restate!=null){
								this.modalTap("网络异常！");
							}else{
								for(let j=0;j<8;j++){
									switch (j){
										case 0:
											if(res.data.newAnimateRank!=null){
												for (var i = 0; i < res.data.newAnimateRank.length; i++) {
													let url = res.data.newAnimateRank.url;
													let animateid="";
													if(url != null&&url != ""&&url != undefined){
														 animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
													}
													res.data.newAnimateRank[i].animateid = animateid;
													res.data.newAnimateRank[i].img = this.getrandomimg();
												}
												this.newAnimateRank = res.data.newAnimateRank;
											}
											break;
										case 1:
											if(res.data.chinaAnimateRank!=null){
												for (var i = 0; i < res.data.chinaAnimateRank.length; i++) {
													let url = res.data.chinaAnimateRank.url;
													let animateid="";
													if(url != null&&url != ""&&url != undefined){
														 animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
													}
													res.data.chinaAnimateRank[i].animateid = animateid;
													res.data.chinaAnimateRank[i].img = this.getrandomimg();
												}
												this.chinaAnimateRank = res.data.chinaAnimateRank;
											}
											break;
										case 2:
											if(res.data.animatePlanRank!=null){
												for (var i = 0; i < res.data.animatePlanRank.length; i++) {
													let url = res.data.animatePlanRank.url;
													let animateid="";
													if(url != null&&url != ""&&url != undefined){
														 animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
													}
													res.data.animatePlanRank[i].animateid = animateid;
													res.data.animatePlanRank[i].img = this.getrandomimg();
												}
												this.animatePlanRank = res.data.animatePlanRank;
											}
											break;
										case 3:
											if(res.data.movieAnimateRank!=null){
												for (var i = 0; i < res.data.movieAnimateRank.length; i++) {
													let url = res.data.movieAnimateRank.url;
													let animateid="";
													if(url != null&&url != ""&&url != undefined){
														 animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
													}
													res.data.movieAnimateRank[i].animateid = animateid;
													res.data.movieAnimateRank[i].img = this.getrandomimg();
												}
												this.movieAnimateRank = res.data.movieAnimateRank;
											}
											break;
										case 4:
											if(res.data.newAnimateScore!=null){
												for (var i = 0; i < res.data.newAnimateScore.length; i++) {
													let url = res.data.newAnimateScore.url;
													let animateid="";
													if(url != null&&url != ""&&url != undefined){
														 animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
													}
													res.data.newAnimateScore[i].animateid = animateid;
													res.data.newAnimateScore[i].img = this.getrandomimg();
												}
												this.newAnimateScore = res.data.newAnimateScore;
											}
											break;
										case 5:
											if(res.data.chinaAnimateScore!=null){
												for (var i = 0; i < res.data.chinaAnimateScore.length; i++) {
													let url = res.data.chinaAnimateScore.url;
													let animateid="";
													if(url != null&&url != ""&&url != undefined){
														 animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
													}
													res.data.chinaAnimateScore[i].animateid = animateid;
													res.data.chinaAnimateScore[i].img = this.getrandomimg();
												}
												this.chinaAnimateScore = res.data.chinaAnimateScore;
											}
											break;
										case 6:
											if(res.data.animatePlanScore!=null){
												for (var i = 0; i < res.data.animatePlanScore.length; i++) {
													let url = res.data.animatePlanScore.url;
													let animateid="";
													if(url != null&&url != ""&&url != undefined){
														 animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
													}
													res.data.animatePlanScore[i].animateid = animateid;
													res.data.animatePlanScore[i].img = this.getrandomimg();
												}
												this.animatePlanScore = res.data.animatePlanScore;
											}
											break;
										case 7:
											if(res.data.movieAnimateScore!=null){
												for (var i = 0; i < res.data.movieAnimateScore.length; i++) {
													let url = res.data.movieAnimateScore.url;
													let animateid="";
													if(url != null&&url != ""&&url != undefined){
														 animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
													}
													
													res.data.movieAnimateScore[i].animateid = animateid;
													res.data.movieAnimateScore[i].img = this.getrandomimg();
												}
												this.movieAnimateScore = res.data.movieAnimateScore;
											}
											break;					
										default:
											break;
									}
								}
								// this.animateRankdata = res.data;
							}
						}
					}
				});
			},
			weekDaySelect: function(e) {
				if(this.latestShowAnimatedata==null||this.latestShowAnimatedata.length<=0){
					this.modalName="Modal";
					this.modaltitle ="Warn";
					this.message = "获取番剧数据失败！";
					return false;
				}
				
				this.wTabCur = e.currentTarget.dataset.id;
				this.wscrollLeft = (e.currentTarget.dataset.id-1 ) * 60;
				let index = Number(this.wTabCur);
				/* let today =  Number(new Date().getDay());
				let zday = today-1;
				let mday = today+1;
				if(today == 0){
					zday = 6;
				}
				else if(today == 6){
					mday = 1;
				} */
				let len = this.latestShowAnimatedata.length;
				let pagecount = Math.floor(len/3);
				switch (index){
					case 0:
						this.curday = this.animateontime[0];
						this.recentonanimate = this.latestShowAnimatedata.slice(0,pagecount);//昨日上映
						break;
					case 1:
						this.curday = this.animateontime[1];
						this.recentonanimate = this.latestShowAnimatedata.slice(pagecount,pagecount*2);//今日上映
						break;
					case 2:
						this.curday = this.animateontime[2];
						this.recentonanimate = this.latestShowAnimatedata.slice(pagecount*2,len);//明日上映
						break;
					// case 3:
					// 	this.todayData = this.weekData[4];
					// 	break;
					// case 4:
					// 	this.todayData = this.weekData[5];
					// 	break;
					// case 5:
					// 	this.todayData = this.weekData[6];
					// 	break;
					// case 6:
					// 	this.todayData = this.weekData[0];
					// 	break;				
					default:
						break;
				}
			},
			getrandomimg: function () {
				let index = Math.floor(Math.random()*40);
				let avatar= this.wallpapers[index].thumb;
				return avatar;
			},
			arrayslice: function (array,num) {
				let count = array.length;
				let pageCount = (count % 10 == 0) ? count / 10 : count / 10 + 1;
				let beginNum = (num - 1) * 10 + 1;
				let endNum = (num == pageCount) ? count + 1 : num * 10 + 1;
				return array.slice(beginNum,endNum);
			},	
			// bimiAPI结束
		}
	}
</script>

<style>
.nav .cu-item{
	height: auto;
}
.grid.col-2.grid-square>view {
	padding-bottom: calc((100% - 20upx)/2.5);
	height: 0;
	width: calc((100% - 20upx)/2);
}
.nav .cu-item .content{
	line-height: 2;
}
.tiptext{
	margin-top: calc((100% - 20upx)/1.7);
	height: 0;
}

.fixed {
		position: fixed;
		z-index: 99;
	}

.VerticalNav.nav {
	width: 200upx;
	white-space: initial;
}

.VerticalNav.nav .cu-item {
	width: 100%;
	text-align: center;
	background-color: #fff;
	margin: 0;
	border: none;
	height: 50px;
	position: relative;
}

.VerticalNav.nav .cu-item.cur {
	background-color: #f1f1f1;
}

.VerticalNav.nav .cu-item.cur::after {
	content: "";
	width: 8upx;
	height: 30upx;
	border-radius: 10upx 0 0 10upx;
	position: absolute;
	background-color: currentColor;
	top: 0;
	right: 0upx;
	bottom: 0;
	margin: auto;
}

.VerticalBox {
	display: flex;
}

.VerticalMain {
	background-color: #f1f1f1;
	flex: 1;
}
</style>
