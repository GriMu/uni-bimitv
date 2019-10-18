<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false"><block slot="backText"></block><block slot="content">首页</block></cu-custom>
		<view class="box">
			<view class="cu-bar search bg-white solid-bottom ">
				<view class="search-form round">
					<text class="cuIcon-search" @tap="toChild" data-url="../searchlist/searchlist"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入片名,主演或导演" confirm-type="search" @input="onKeyUserNameInput"></input>
				</view>
				<!-- <view class="action" @tap="searchByKeyWords">
					<button class="cu-btn bg-orange shadow-blur round">搜索</button>
				</view> -->
			</view>
		</view>
		<view class="cu-card case bg-white">
			<view class="cu-item shadow">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="false" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in carouseldata" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="item.animateid">
					<view class="bg-img bg-mask flex align-end" :style="{backgroundImage:'url('+item.img+')',height:'100%'}">
						<view class="padding-xl text-white">
							<view class="padding-xs text-lg">
								{{item.title}}
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			</view>
		</view>
		<!-- <view class="cu-card case bg-white">
			<view class="cu-item shadow">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="false" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in recom" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'">
					</image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
			</view>
		</view> -->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 猜你在追
			</view>
		</view>
		<view class="cu-card case">
			<view class="cu-item shadow">
				<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item" :class="index==TabCur?'text-blue':''" v-for="(item,index) in sliderRecomdata" :key="index" @tap="tabSelect" :data-id="index" :data-animateid="item.animateid">
						<!-- <view class="bg-img padding-top-xl  flex align-end margin-top" :style="{backgroundImage:'url('+item.url+')',width: '400upx',height: '250upx'}">
							<view class="bg-shadeBottom  padding-top-xl flex-sub">
								{{item.name}}
							</view>
						</view> -->
						<view class="bg-img bg-mask flex align-center radius margin-top" :style="{backgroundImage:'url('+item.img+')',width: '400upx',height: '250upx'}">
							<view class="text-white">
								<view class="padding-xs text-lg">
									<view class="text-cut padding" style="width:220px">{{item.title}}</view>
								</view>
							</view>
						</view>
						<view class="content">
							<view>
								<text class="margin-right-xs">{{item.number}}</text></view>
							<view class="text-gray text-sm">
								<view class="text-cut padding" style="width:220px">{{item.intro}}</view></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 热漫精选等你来Pick
			</view>
		</view>
		<view class="cu-card case bg-white">
			<view class="cu-item shadow">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="false" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in todayHotdata" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="item.animateid">
					<view class="bg-img bg-mask flex align-end" :style="{backgroundImage:'url('+item.img+')',height:'100%'}">
						<view class="padding-xl text-white">
							<view class="padding-xs text-lg">
								{{item.title}}
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			</view>
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
				<swiper-item v-for="(item,index) in monthRankdata" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="item.animateid">
					<view class="bg-img bg-mask flex align-end" :style="{backgroundImage:'url('+item.img+')',height:'100%'}">
						<view class="padding-xl text-white">
							<view class="padding-xs text-lg">
								{{item.title}}
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 防御利奇马，追剧不出门
			</view>
		</view>
		<view class="cu-card case bg-white padding-bottom">
			<view class="cu-item shadow" @tap="toChild" data-url="../plays/plays" :data-id="todayhot.animateid">
				<view class="image">
					<image :src="todayhot.img" mode="scaleToFill" style="height: 414upx;"></image>
					<view class="cu-tag bg-blue">{{todayhot.name}}</view>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{todayhot.updateDate}}</text></view>
				</view>
			</view>
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="wscrollLeft">
				<view class="cu-item" :class="index==wTabCur?'text-blue cur':''" v-for="(item,index) in weekUpdatedata" :key="index" @tap="weekDaySelect" :data-id="index">
					周{{item.week}}
				</view>
			</scroll-view>
			<view class="grid col-2 padding-sm">
				<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item,index) in todayofweek" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="item.animateid">
					<view class="cu-item shadow">
						<view class="image">
							<image :src="item.img" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
						</view>
						<view class="cu-bar "> <text class="text-cut cuIcon-titles">{{item.name}}</text></view>
						<view class="solid-bottom text-sm">
							<text class="text-grey">{{item.updateDate}}</text>
						</view>
					</view>
				</view>
			</view>	 
		</view>
		<!--月排行榜-->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 月排行榜
			</view>
		</view>
		<view class="cu-card case bg-white">
			<view class="cu-list menu sm-border card-menu margin-top" >
				<view class="cu-item" :class="menuArrow?'arrow':''" v-for="(item,index) in monthRankdata" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="item.animateid">
					<view class="content">
						<text class="cu-avatar radius sm bg-pink" v-if="index<3">{{item.rank}}</text>
						<text class="cu-avatar radius sm bg-grey" v-else>{{item.rank}}</text>
						<text class="text-grey text-cut padding-left-sm">{{item.title}}</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{item.number}}</text>
					</view>
				</view>
			</view>
		</view>
		<!--新番发送-->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 新番发送
			</view>
		</view>
		<view class="cu-card case bg-white padding-bottom">
			<view class="cu-item shadow" @tap="toChild" data-url="../plays/plays" :data-id="todayhot.animateid">
				<view class="image">
					<image :src="todayhot.img" mode="scaleToFill" style="height: 414upx;"></image>
					<view class="cu-tag bg-blue">{{todayhot.name}}</view>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{todayhot.updateDate}}</text></view>
				</view>
			</view>
		</view>
		<view class="cu-timeline">
			<view class="cu-time">新番发送</view>
			<view class="cu-item cur cuIcon-time" v-for="(item,index) in newAnimatedata" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="item.animateid">
				<view class="shadow-blur bg-white">
					<view class="grid col-2">
						<view class="cu-card case no-card"  >
							<view class="cu-item shadow">
								<view class="image">
									<image :src="item.img" mode="scaleToFill" style="height: 300upx;border-radius: 10upx;"></image>
								</view>
							</view>
						</view>
						<view class="cu-card case no-card"  >
							<view class="cu-item shadow">
								<view class="content padding-top-sm">
									<view class="cu-bar">
										<text class="text-cut cuIcon-titles padding-left-sm">{{item.title}}</text>
									</view>
									<view class="desc">
										<!-- <view class="text-content margin-top-xs">{{item.intro}}</view> -->
										<view class="text-gray text-sm text-left padding">
											<text class="cuIcon-timefill margin-lr-xs "></text> {{item.number}}
											<!-- <text class="cuIcon-likefill margin-lr-xs padding-left"></text> {{item.followCount}} -->
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--国产动漫-->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 国产动漫
			</view>
		</view>
		<view class="cu-card case bg-white padding-bottom">
			<view class="cu-item shadow" @tap="toChild" data-url="../plays/plays" :data-id="todayhot.animateid">
				<view class="image">
					<image :src="todayhot.img" mode="scaleToFill" style="height: 414upx;"></image>
					<view class="cu-tag bg-blue">{{todayhot.name}}</view>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{todayhot.updateDate}}</text></view>
				</view>
			</view>
		</view>
		<view class="cu-timeline">
			<view class="cu-time">国产动漫</view>
			<view class="cu-item cur cuIcon-time" v-for="(item,index) in chinaAnimatedata" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="item.animateid">
				<view class="shadow-blur bg-white">
					<view class="grid col-2">
						<view class="cu-card case no-card"  >
							<view class="cu-item shadow">
								<view class="image">
									<image :src="item.img" mode="scaleToFill" style="height: 300upx;border-radius: 10upx;"></image>
								</view>
							</view>
						</view>
						<view class="cu-card case no-card"  >
							<view class="cu-item shadow">
								<view class="content padding-top-sm">
									<view class="cu-bar">
										<text class="text-cut cuIcon-titles padding-left-sm">{{item.title}}</text>
									</view>
									<view class="desc">
										<!-- <view class="text-content margin-top-xs">{{item.intro}}</view> -->
										<view class="text-gray text-sm text-left padding">
											<text class="cuIcon-timefill margin-lr-xs "></text> {{item.number}}
											<!-- <text class="cuIcon-likefill margin-lr-xs padding-left"></text> {{item.followCount}} -->
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--番组计划-->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 番组计划
			</view>
		</view>
		<view class="cu-card case bg-white padding-bottom">
			<view class="cu-item shadow" @tap="toChild" data-url="../plays/plays" :data-id="todayhot.animateid">
				<view class="image">
					<image :src="todayhot.img" mode="scaleToFill" style="height: 414upx;"></image>
					<view class="cu-tag bg-blue">{{todayhot.name}}</view>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{todayhot.updateDate}}</text></view>
				</view>
			</view>
		</view>
		<view class="cu-timeline">
			<view class="cu-time">番组计划</view>
			<view class="cu-item cur cuIcon-time" v-for="(item,index) in animatePlandata" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="item.animateid">
				<view class="shadow-blur bg-white">
					<view class="grid col-2">
						<view class="cu-card case no-card"  >
							<view class="cu-item shadow">
								<view class="image">
									<image :src="item.img" mode="scaleToFill" style="height: 300upx;border-radius: 10upx;"></image>
								</view>
							</view>
						</view>
						<view class="cu-card case no-card"  >
							<view class="cu-item shadow">
								<view class="content padding-top-sm">
									<view class="cu-bar">
										<text class="text-cut cuIcon-titles padding-left-sm">{{item.title}}</text>
									</view>
									<view class="desc">
										<!-- <view class="text-content margin-top-xs">{{item.intro}}</view> -->
										<view class="text-gray text-sm text-left padding">
											<text class="cuIcon-timefill margin-lr-xs "></text> {{item.number}}
											<!-- <text class="cuIcon-likefill margin-lr-xs padding-left"></text> {{item.followCount}} -->
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--剧场动画-->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 剧场动画
			</view>
		</view>
		<view class="cu-card case bg-white padding-bottom">
			<view class="cu-item shadow" @tap="toChild" data-url="../plays/plays" :data-id="todayhot.animateid">
				<view class="image">
					<image :src="todayhot.img" mode="scaleToFill" style="height: 414upx;"></image>
					<view class="cu-tag bg-blue">{{todayhot.name}}</view>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{todayhot.updateDate}}</text></view>
				</view>
			</view>
		</view>
		<view class="cu-timeline">
			<view class="cu-time">剧场动画</view>
			<view class="cu-item cur cuIcon-time" v-for="(item,index) in animateMoviedata" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="item.animateid">
				<view class="shadow-blur bg-white">
					<view class="grid col-2">
						<view class="cu-card case no-card"  >
							<view class="cu-item shadow">
								<view class="image">
									<image :src="item.img" mode="scaleToFill" style="height: 300upx;border-radius: 10upx;"></image>
								</view>
							</view>
						</view>
						<view class="cu-card case no-card"  >
							<view class="cu-item shadow">
								<view class="content padding-top-sm">
									<view class="cu-bar">
										<text class="text-cut cuIcon-titles padding-left-sm">{{item.title}}</text>
									</view>
									<view class="desc">
										<!-- <view class="text-content margin-top-xs">{{item.intro}}</view> -->
										<view class="text-gray text-sm text-left padding">
											<text class="cuIcon-timefill margin-lr-xs "></text> {{item.number}}
											<!-- <text class="cuIcon-likefill margin-lr-xs padding-left"></text> {{item.followCount}} -->
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--影视-->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 影视
			</view>
		</view>
		<view class="cu-card case bg-white padding-bottom">
			<view class="cu-item shadow" @tap="toChild" data-url="../plays/plays" :data-id="todayhot.animateid">
				<view class="image">
					<image :src="todayhot.img" mode="scaleToFill" style="height: 414upx;"></image>
					<view class="cu-tag bg-blue">{{todayhot.name}}</view>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{todayhot.updateDate}}</text></view>
				</view>
			</view>
		</view>
		<view class="cu-timeline">
			<view class="cu-time">影视</view>
			<view class="cu-item cur cuIcon-time" v-for="(item,index) in Moviesdata" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="item.animateid">
				<view class="shadow-blur bg-white">
					<view class="grid col-2">
						<view class="cu-card case no-card"  >
							<view class="cu-item shadow">
								<view class="image">
									<image :src="item.img" mode="scaleToFill" style="height: 300upx;border-radius: 10upx;"></image>
								</view>
							</view>
						</view>
						<view class="cu-card case no-card"  >
							<view class="cu-item shadow">
								<view class="content padding-top-sm">
									<view class="cu-bar">
										<text class="text-cut cuIcon-titles padding-left-sm">{{item.title}}</text>
									</view>
									<view class="desc">
										<!-- <view class="text-content margin-top-xs">{{item.intro}}</view> -->
										<view class="text-gray text-sm text-left padding">
											<text class="cuIcon-timefill margin-lr-xs "></text> {{item.number}}
											<!-- <text class="cuIcon-likefill margin-lr-xs padding-left"></text> {{item.followCount}} -->
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--弹窗-->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-gradual-orange justify-end">
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
				recom:[{//推荐
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
				scrollLeft: 0,
				dotStyle: true,
				TabCur: 0,
				isCard:false,
				inputword:'',
				modalName: null,
				modaltitle:'',
				message:'',
				recentHot:[],//最近热门
				partHot:[],//季度热门
				weekData:[],//一周更新
				tagData:[],//标签
				yearGroup:[],//年度
				randomData:[],//自由推荐
				lastUpdate:[],//最近更新
				subjectData:[],//系列主题
				lastPartUpdate:[],//上周更新
				wallpapers:[],
				isLoad:true,
				weekday:['周一','周二','周三','周四','周五','周六','周日'],
				wTabCur: 0,
				wscrollLeft: 0,
				todayData:[],
				todayhot:{},
				// bimi数据开始
				carouseldata:[],
				sliderRecomdata:[],
				todayHotdata:[],
				monthRankdata:[],
				weekUpdatedata:[],
				todayofweek:[],
				towerStart: 0,
				direction: '',
				menuArrow: false,
				newAnimatedata:[],
				chinaAnimatedata:[],
				animatePlandata:[],
				animateMoviedata:[],
				Moviesdata:[],
				keyword:'',
				// bimi数据结束
			};
		},
		onLoad() {
			this.setshareimg();
			// this.getRecomData();
			// this.getWeekData();
			// this.getRecentHotData();
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				let index = e.currentTarget.dataset.id;
				this.scrollLeft = index * 250;
				let animateid = e.currentTarget.dataset.animateid;
				uni.navigateTo({
					url: '../plays/plays?animateid='+animateid
				})
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			onKeyUserNameInput: function(event) {
			    this.keyword = event.target.value  
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
										BAnimation.id = id;
										BAnimation.name = name;
										let index = Math.floor(Math.random()*40);
										avatar= this.wallpapers[index].thumb;
										BAnimation.url = avatar;
										BAnimation.type = "image";
										BAnimation.curweek = curweek;
										BAnimation.intro = intro;
										daydata.push(BAnimation);
									}
									rdata.push(daydata);
								}
							}
							this.weekData = rdata;
							this.todayData = rdata[1];
							let today =  new Date().getDay();
							this.todayhot = rdata[Number(today)][0];
							
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
			getRecentHotData: function() {
				var url = 'api/b/animation/recentHot?version=1.6.0';
				var linkurl = commonutil.getUri(commonutil.testurl,url);
				uni.request({
					url:linkurl,
					success: (res) => {
						let hotdata = res.data;
						var rdata = [];
						if(hotdata!=null&&hotdata.length>0){
							for (var i = 0; i < hotdata.length; i++) {
								let BAnimation = {};
								let id = hotdata[i].id;
								let name = hotdata[i].name;
								let avatar = hotdata[i].avatar;
								let intro = hotdata[i].intro;
								let updateToTime = hotdata[i].updateToTime;
								
								BAnimation.id = id;
								BAnimation.name = name;
								let index = Math.floor(Math.random()*40);
								avatar= this.wallpapers[index].thumb;
								BAnimation.url = avatar;
								BAnimation.type = "image";
								BAnimation.intro = intro;
								BAnimation.updateToTime = updateToTime;
								rdata.push(BAnimation);
							}
							this.recentHot = rdata;
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
			getPartData: function() {
				var url = 'api/b/shenzhankai/partHot';
				var linkurl = commonutil.getUri(commonutil.testurl,url);
				uni.request({
					url:linkurl,
					success: (res) => {
						let partHot = res.data;
						var rdata = [];
						let partid ="";
						if(partHot!=null&&partHot.length>0){
							for (var i = 0; i < partHot.length; i++) {
								let BAnimation = {};
								if(partHot[i].BPart!=null&&partHot[i].BPart.BAnimation!=null){
									let id = partHot[i].BPart.BAnimation.id;
									if(partid.indexOf(id)== -1){
										partid +=(id+",");
										let name = partHot[i].BPart.BAnimation.name;
										let avatar = partHot[i].BPart.BAnimation.avatar;
										let intro = partHot[i].BPart.BAnimation.intro;
										let updateToTime = partHot[i].BPart.BAnimation.updateToTime;
										
										BAnimation.id = id;
										BAnimation.name = name;
										let index = Math.floor(Math.random()*40);
										avatar= this.wallpapers[index].thumb;
										BAnimation.url = avatar;
										BAnimation.type = "image";
										BAnimation.intro = intro;
										BAnimation.updateToTime = updateToTime;
										rdata.push(BAnimation);
									}
								}
							}
							// debugger
							this.partHot = rdata;
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
			getLastUpdate: function() {
				var url = 'api/b/animation/lastUpdate';
				var linkurl = commonutil.getUri(commonutil.testurl,url);
				uni.request({
					url:linkurl,
					success: (res) => {
						let lastupdate = res.data;
						var rdata = [];
						if(lastupdate!=null&&lastupdate.length>0){
							for (var i = 0; i < lastupdate.length; i++) {
								let BAnimation = {};
								let id = lastupdate[i].id;
								let name = lastupdate[i].name;
								let avatar = lastupdate[i].avatar;
								let intro = lastupdate[i].intro;
								let updateToTime = lastupdate[i].updateToTime;
								
								BAnimation.id = id;
								BAnimation.name = name;
								let index = Math.floor(Math.random()*40);
								avatar= this.wallpapers[index].thumb;
								BAnimation.url = avatar;
								BAnimation.type = "image";
								BAnimation.intro = intro;
								BAnimation.updateToTime = updateToTime;
								rdata.push(BAnimation);
							}
							this.lastUpdate = rdata;
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
				// http://service.picasso.adesk.com/v1/vertical/category/4e4d610cdf714d2966000002/vertical?limit=40&adult=false&first=1&order=new
				var linkurl = commonutil.getUri(commonutil.imgurl,'v1/vertical/category/4e4d610cdf714d2966000002/vertical?limit=40&adult=false&first=1&order=new');
				uni.request({
					// url:'http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&kw=%E9%A3%8E%E6%99%AF&start=0&count=99',
					url:linkurl,
					success:(res)=> {
						// var index = Math.floor(Math.random()*99);
						// this.shareimg= res.data.data[index].thumb;
						if(res.data.res!=null&&res.data.res.vertical!=null){
							this.wallpapers = res.data.res.vertical;
							// this.getRecomData();
							// this.getWeekData();
							// this.getRecentHotData();
							// this.getPartData();
							// this.getLastUpdate();
							this.getcarousel();
							this.getsliderRecom();
							this.gettodayHot();
							this.getmonthRank();
							this.getweekUpdate();
							
							this.getnewAnimate();
							this.getchinaAnimate();
							this.getanimatePlan();
							this.getanimateMovie();
							this.getMovies();
						}
					}
				});
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
				switch (index){
					case 0:
						this.todayData = this.weekData[1]; 
						break;
					case 1:
						this.todayData = this.weekData[2];
						break;
					case 2:
						this.todayData = this.weekData[3];
						break;
					case 3:
						this.todayData = this.weekData[4];
						break;
					case 4:
						this.todayData = this.weekData[5];
						break;
					case 5:
						this.todayData = this.weekData[6];
						break;
					case 6:
						this.todayData = this.weekData[0];
						break;				
					default:
						break;
				}
			},	
			hideModal(e) {
				this.modalName = null
			},
			// bimiAPI开始
			getcarousel()//轮播图
			{
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/carousel');
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data!=null){
							if(res.data.status!=200){
								commonutil.modalTap("网络异常！");
								return false;
							}
							if(res.data.restate!=null){
								commonutil.modalTap("网络异常！");
							}else{
								for(let i=0;i<res.data.length;i++){
									let url = res.data[i].url;
									let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
									res.data[i].animateid = animateid;
									res.data[i].img = this.getrandomimg();
								}
								this.carouseldata = res.data;
							}
						}
					}
				});
			},
			getsliderRecom()//轮播后推荐
			{
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/sliderRecom');
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data!=null){
							if(res.data.restate!=null){
								commonutil.modalTap("网络异常！");
							}else{
								for(let i=0;i<res.data.length;i++){
									let url = res.data[i].url;
									let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
									res.data[i].animateid = animateid;
									res.data[i].img = this.getrandomimg();
								}
								this.sliderRecomdata = res.data;
							}
						}
					}
				});
			},
			gettodayHot()//今日热播
			{
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/todayHot');
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data!=null){
							if(res.data.restate!=null){
								commonutil.modalTap("网络异常！");
							}else{
								for(let i=0;i<res.data.length;i++){
									let url = res.data[i].url;
									let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
									res.data[i].animateid = animateid;
									res.data[i].img = this.getrandomimg();
								}
								this.todayHotdata = res.data;
							}
						}
					}
				});
			},
			getmonthRank()//月排行榜
			{
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/monthRank');
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data!=null){
							if(res.data.restate!=null){
								commonutil.modalTap("网络异常！");
							}else{
								for(let i=0;i<res.data.length;i++){
									let url = res.data[i].url;
									let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
									res.data[i].animateid = animateid;
									res.data[i].img = this.getrandomimg();
								}
								this.monthRankdata = res.data;
							}
						}
					}
				});
			},
			getweekUpdate()//一周更新(节目单)
			{
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/weekUpdate');
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data!=null){
							if(res.data.restate!=null){
								commonutil.modalTap("网络异常！");
							}else{
								for(let i=0;i<res.data.length;i++){
									var weeklist = res.data[i];
									if(weeklist!=null&&weeklist.list!=null)
									{
										for(let j =0;j<weeklist.list.length;j++){
											if(weeklist.list[j]!=null){
												let listofday = weeklist.list[j];
												let url = listofday.url;
												let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
												res.data[i].list[j].animateid = animateid;
												res.data[i].list[j].img = this.getrandomimg();
											}
										}
									}
								}
								let today =  new Date().getDay();
								this.todayofweek = res.data[Number(today)-1].list;
								this.wTabCur = (Number(today)-1);
								this.weekUpdatedata = res.data;
								this.todayhot = this.todayofweek[0];
							}
						}
					}
				});
			},
			getnewAnimate()//新番发送
			{
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/newAnimate');
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data!=null){
							if(res.data.restate!=null){
								commonutil.modalTap("网络异常！");
							}else{
								for(let i=0;i<res.data.length;i++){
									let url = res.data[i].url;
									let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
									res.data[i].animateid = animateid;
									res.data[i].img = this.getrandomimg();
								}
								this.newAnimatedata = res.data;
							}
						}
					}
				});
			},
			getchinaAnimate()//国产动漫
			{
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/chinaAnimate');
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data!=null){
							if(res.data.restate!=null){
								commonutil.modalTap("网络异常！");
							}else{
								for(let i=0;i<res.data.length;i++){
									let url = res.data[i].url;
									let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
									res.data[i].animateid = animateid;
									res.data[i].img = this.getrandomimg();
								}
								this.chinaAnimatedata = res.data;
							}
						}
					}
				});
			},
			getanimatePlan()//番组计划
			{
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/animatePlan');
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data!=null){
							if(res.data.restate!=null){
								commonutil.modalTap("网络异常！");
							}else{
								for(let i=0;i<res.data.length;i++){
									let url = res.data[i].url;
									let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
									res.data[i].animateid = animateid;
									res.data[i].img = this.getrandomimg();
								}
								this.animatePlandata = res.data;
							}
						}
					}
				});
			},
			getanimateMovie()//剧场动画
			{
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/animateMovie');
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data!=null){
							if(res.data.restate!=null){
								commonutil.modalTap("网络异常！");
							}else{
								for(let i=0;i<res.data.length;i++){
									let url = res.data[i].url;
									let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
									res.data[i].animateid = animateid;
									res.data[i].img = this.getrandomimg();
								}
								this.animateMoviedata = res.data;
							}
						}
					}
				});
			},
			getMovies()//月排行榜
			{
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/Movies');
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data!=null){
							if(res.data.restate!=null){
								commonutil.modalTap("网络异常！");
							}else{
								for(let i=0;i<res.data.length;i++){
									let url = res.data[i].url;
									let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
									res.data[i].animateid = animateid;
									res.data[i].img = this.getrandomimg();
								}
								this.Moviesdata = res.data;
							}
						}
					}
				});
			},
			modalTap: function (e) {
				uni.showModal({
					content: e.content,
					confirmText: "确定",
					showCancel: false,
				})
			},
			getrandomimg: function () {
				let index = Math.floor(Math.random()*40);
				let avatar= this.wallpapers[index].thumb;
				return avatar;
			},
			weekDaySelect: function(e) {
				if(this.weekUpdatedata==null||this.weekUpdatedata.length<=0){
					this.modalName="Modal";
					this.modaltitle ="Warn";
					this.message = "番剧数据更新失败！";
					return false;
				}
				this.wTabCur = e.currentTarget.dataset.id;
				this.wscrollLeft = (e.currentTarget.dataset.id-1 ) * 60;
				let index = Number(this.wTabCur);
				switch (index){
					case 0:
						this.todayofweek = this.weekUpdatedata[0].list; 
						break;
					case 1:
						this.todayofweek = this.weekUpdatedata[1].list;
						break;
					case 2:
						this.todayofweek = this.weekUpdatedata[2].list;
						break;
					case 3:
						this.todayofweek = this.weekUpdatedata[3].list;
						break;
					case 4:
						this.todayofweek = this.weekUpdatedata[4].list;
						break;
					case 5:
						this.todayofweek = this.weekUpdatedata[5].list;
						break;
					case 6:
						this.todayofweek = this.weekUpdatedata[6].list;
						break;				
					default:
						break;
				}
			},
			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},
			
			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},
			
			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.monthRankdata;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.monthRankdata.length; i++) {
						this.monthRankdata[i - 1].mLeft = this.monthRankdata[i].mLeft
						this.monthRankdata[i - 1].zIndex = this.monthRankdata[i].zIndex
					}
					this.monthRankdata[list.length - 1].mLeft = mLeft;
					this.monthRankdata[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.monthRankdata.length - 1; i > 0; i--) {
						this.monthRankdata[i].mLeft = this.monthRankdata[i - 1].mLeft
						this.monthRankdata[i].zIndex = this.monthRankdata[i - 1].zIndex
					}
					this.monthRankdata[0].mLeft = mLeft;
					this.monthRankdata[0].zIndex = zIndex;
				}
				this.direction = ""
				this.monthRankdata = this.monthRankdata
			},
			toChild(e) {
				debugger
				let url = e.currentTarget.dataset.url;
				let uri = "";
				if(url!=null&&url!=""&&url!=undefined){
					if(url.indexOf("searchlist")!=-1){
						if(this.keyword!=null&&this.keyword!=""&&this.keyword!=undefined)
						{
							uri = '?keyword='+this.keyword;
						}
						else{
							commonutil.modalTap("请输入搜索条件后查询！");
						}
					}else if(url.indexOf("plays")!=-1){
						uri = '?animateid='+e.currentTarget.dataset.id;
					}
				}
				uni.navigateTo({
					url: e.currentTarget.dataset.url+uri
				})
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
	padding-bottom: calc((100% - 20upx)/2);
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
.grid.grid-square>view.bg-img image {
	width: 100%;
	height: auto;
	position: absolute;
}
</style>
