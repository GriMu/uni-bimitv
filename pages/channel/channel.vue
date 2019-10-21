<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false"><block slot="backText"></block><block slot="content">频道</block></cu-custom>
		<!-- <view class="cu-bar bg-white search solid-bottom">
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
		</view> -->
		<!--频道分类-->
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 分类列表
			</view>
			<!-- <view class="action">
				<button class="cu-btn bg-green shadow" @tap="showModal" data-target="gridModal">设置</button>
			</view> -->
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
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2" @tap="toChild" :data-url="item.linkurl">
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
				<swiper-item v-for="(item,index) in zixundata" :key="index" @tap="toChild" data-url="../newsinfo/newsinfo" :data-id="item.artdetailid">
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
				<text class="cuIcon-titles text-blue"></text> 你可能会喜欢
			</view>
		</view>
		<view class="cu-card case">
			<view class="cu-item shadow">
				<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item" :class="index_1==TabCur?'text-blue':''" v-for="(item,index_1) in yearAnimateList" :key="index_1" @tap="tabSelect" :data-id="index_1" :data-animateid="item.animateid">
						<!-- <view class="bg-img padding-top-xl  flex align-end margin-top" :style="{backgroundImage:'url('+item.url+')',width: '400upx',height: '250upx'}">
							<view class="bg-shadeBottom  padding-top-xl flex-sub">
								{{item.name}}
							</view>
						</view> -->
						<view class="bg-img bg-mask flex align-center radius margin-top" :style="{backgroundImage:'url('+item.img+')',width: '400upx',height: '250upx'}">
							<view class="text-white">
								<view class="padding-xs text-lg">
									<view class="text-cut padding" style="width:220px">{{item.name}}</view>
								</view>
							</view>
						</view>
						<view class="content">
							<view>
								<text class="margin-right-xs">{{item.number}}</text></view>
							<view class="text-gray text-sm">
								<view class="text-cut padding" style="width:220px">{{item.info}}</view></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 精选剧场推荐
			</view>
		</view>
		<view class="cu-card case bg-white">
			<view class="cu-item shadow">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="false" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in juChangrecom" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="item.animateid">
					<view class="bg-img bg-mask flex align-end" :style="{backgroundImage:'url('+item.img+')',height:'100%'}">
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
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav bg-white" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 375upx)">
				<view class="cu-item" :class="index_1==yearTabCur?'text-blue cur':''" v-for="(item,index_1) in juChangyearlist" :key="index_1" @tap="yearTabSelect"
				 :data-id="index_1">
					{{item}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 375upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(item,index_2) in juChangAnimateList" :key="index_2" :id="'main-'+index_2" @tap="toChild" data-url="../plays/plays" :data-animateid="item.animateid">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-green"></text> {{item.year}}</view>
					</view>
					<view class="grid col-1">
						<view class="cu-card case no-card" v-for="(yitem,yindex) in item.list" :key="yindex">
							<view class="cu-item shadow">
								<view class="image">
									<image :src="yitem.img" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
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
				<text class="cuIcon-titles text-blue"></text> 国漫精选
			</view>
		</view>
		<view class="cu-card case bg-white">
			<view class="cu-item shadow">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="false" interval="5000" duration="500">
				<swiper-item v-for="(item,index_2) in guoManAnimateList" :key="index_2" @tap="toChild" data-url="../plays/plays" :data-id="item.animateid">
					<view class="bg-img bg-mask flex align-end" :style="{backgroundImage:'url('+item.img+')',height:'100%'}">
						<view class="padding-xl text-white">
							<view class="padding-xs text-lg">
								{{item.name}}
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
				<view class="cu-item cur cuIcon-time" v-for="(item,index) in recentonanimate" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="item.animateid">
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
								<!-- <view class="flex solid-bottom padding align-start"> -->
									<view class="cu-item shadow">
										<view class="content padding-top-sm">
											<view class="desc">
												<view class="text-content margin-top-xs">{{item.plot}}</view>
											</view>
										</view>
										<view class="text-gray text-sm padding-top-sm">
											<text class="cuIcon-timefill margin-lr-xs "></text> {{item.updatenums}}
										</view>
										<view class="text-gray text-sm padding-top-sm">
											<text class="cuIcon-likefill margin-lr-xs "></text>评分 {{item.score}}
										</view>
									<!-- </view> -->
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
		<view v-for="(item,index_rank) in animateRankinfos" :key="index_rank">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-titles text-blue"></text> {{item}}
				</view>
			</view>
			<view class="cu-card case bg-white" v-if="index_rank==0">
				<view class="cu-item shadow" @tap="toChild" data-url="../plays/plays" :data-id="newAnimateRank_hot.animateid">
					<view class="image">
						<image :src="newAnimateRank_hot.img" mode="scaleToFill" style="height: 414upx;"></image>
						<view class="cu-tag bg-blue">{{newAnimateRank_hot.title}}</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">播放量:{{newAnimateRank_hot.score}}</text></view>
					</view>
				</view>
				<view class="grid col-2 padding-sm" >
					<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item1,index1) in newAnimateRank" :key="index1" @tap="toChild" data-url="../plays/plays" :data-id="item1.animateid">
						<view class="cu-item shadow">
							<view class="image">
								<image :src="item1.img" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
							</view>
							<text class="cu-avatar radius sm_avatar bg-pink text-sm" v-if="index1<3">{{item1.rank.substring(0,item1.rank.length-1)}}</text>
							<text class="cu-avatar radius sm_avatar bg-grey text-sm" v-else>{{item1.rank.substring(0,item1.rank.length-1)}}</text>
							<text class="text-grey text-cut padding-left-sm">{{item1.title}}</text>
							<view class="solid-bottom text-sm padding-sm">
								<text class="text-grey">播放量:{{item1.score}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-card case bg-white" v-else-if="index_rank==1">
				<view class="cu-item shadow" @tap="toChild" data-url="../plays/plays" :data-id="chinaAnimateRank_hot.animateid">
					<view class="image">
						<image :src="chinaAnimateRank_hot.img" mode="scaleToFill" style="height: 414upx;"></image>
						<view class="cu-tag bg-blue">{{chinaAnimateRank_hot.title}}</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">播放量:{{chinaAnimateRank_hot.score}}</text></view>
					</view>
				</view>		
				<view class="grid col-2 padding-sm" >
					<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item1,index1) in chinaAnimateRank" :key="index1" @tap="toChild" data-url="../plays/plays" :data-id="item1.animateid">
						<view class="cu-item shadow">
							<view class="image">
								<image :src="item1.img" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
							</view>
							<text class="cu-avatar radius sm_avatar bg-pink text-sm" v-if="index1<3">{{item1.rank.substring(0,item1.rank.length-1)}}</text>
							<text class="cu-avatar radius sm_avatar bg-grey text-sm" v-else>{{item1.rank.substring(0,item1.rank.length-1)}}</text>
							<text class="text-grey text-cut padding-left-sm">{{item1.title}}</text>
							<view class="solid-bottom text-sm padding-sm">
								<text class="text-grey">播放量:{{item1.score}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-card case bg-white" v-if="index_rank==2">
				<view class="cu-item shadow" @tap="toChild" data-url="../plays/plays" :data-id="animatePlanRank_hot.animateid">
					<view class="image">
						<image :src="animatePlanRank_hot.img" mode="scaleToFill" style="height: 414upx;"></image>
						<view class="cu-tag bg-blue">{{animatePlanRank_hot.title}}</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">播放量:{{animatePlanRank_hot.score}}</text></view>
					</view>
				</view>		
				<view class="grid col-2 padding-sm">
					<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item1,index1) in animatePlanRank" :key="index1" @tap="toChild" data-url="../plays/plays" :data-id="item1.animateid">
						<view class="cu-item shadow">
							<view class="image">
								<image :src="item1.img" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
							</view>
							<text class="cu-avatar radius sm_avatar bg-pink text-sm" v-if="index1<3">{{item1.rank.substring(0,item1.rank.length-1)}}</text>
							<text class="cu-avatar radius sm_avatar bg-grey text-sm" v-else>{{item1.rank.substring(0,item1.rank.length-1)}}</text>
							<text class="text-grey text-cut padding-left-sm">{{item1.title}}</text>
							<view class="solid-bottom text-sm padding-sm">
								<text class="text-grey">播放量:{{item1.score}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-card case bg-white" v-if="index_rank==3">
				<view class="cu-item shadow" @tap="toChild" data-url="../plays/plays" :data-id="movieAnimateRank_hot.animateid">
					<view class="image">
						<image :src="movieAnimateRank_hot.img" mode="scaleToFill" style="height: 414upx;"></image>
						<view class="cu-tag bg-blue">{{movieAnimateRank_hot.title}}</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">播放量:{{movieAnimateRank_hot.score}}</text></view>
					</view>
				</view>		
				<view class="grid col-2 padding-sm">
					<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item1,index1) in movieAnimateRank" :key="index1" @tap="toChild" data-url="../plays/plays" :data-id="item1.animateid">
						<view class="cu-item shadow">
							<view class="image">
								<image :src="item1.img" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
							</view>
							<text class="cu-avatar radius sm_avatar bg-pink text-sm" v-if="index1<3">{{item1.rank.substring(0,item1.rank.length-1)}}</text>
							<text class="cu-avatar radius sm_avatar bg-grey text-sm" v-else>{{item1.rank.substring(0,item1.rank.length-1)}}</text>
							<text class="text-grey text-cut padding-left-sm">{{item1.title}}</text>
							<view class="solid-bottom text-sm padding-sm">
								<text class="text-grey">播放量:{{item1.score}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-card case bg-white" v-if="index_rank==4">
				<view class="cu-item shadow" @tap="toChild" data-url="../plays/plays" :data-id="newAnimateScore_hot.animateid">
					<view class="image">
						<image :src="newAnimateScore_hot.img" mode="scaleToFill" style="height: 414upx;"></image>
						<view class="cu-tag bg-blue">{{newAnimateScore_hot.title}}</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">评分:{{newAnimateScore_hot.score}}</text></view>
					</view>
				</view>		
				<view class="grid col-2 padding-sm">
					<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item1,index1) in newAnimateScore" :key="index1" @tap="toChild" data-url="../plays/plays" :data-id="item1.animateid">
						<view class="cu-item shadow">
							<view class="image">
								<image :src="item1.img" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
							</view>
							<text class="cu-avatar radius sm_avatar bg-pink text-sm" v-if="index1<3">{{item1.rank.substring(0,item1.rank.length-1)}}</text>
							<text class="cu-avatar radius sm_avatar bg-grey text-sm" v-else>{{item1.rank.substring(0,item1.rank.length-1)}}</text>
							<text class="text-grey text-cut padding-left-sm">{{item1.title}}</text>
							<view class="solid-bottom text-sm padding-sm">
								<text class="text-grey">评分:{{item1.score}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-card case bg-white" v-if="index_rank==5">
				<view class="cu-item shadow" @tap="toChild" data-url="../plays/plays" :data-id="chinaAnimateScore_hot.animateid">
					<view class="image">
						<image :src="chinaAnimateScore_hot.img" mode="scaleToFill" style="height: 414upx;"></image>
						<view class="cu-tag bg-blue">{{chinaAnimateScore_hot.title}}</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">评分:{{chinaAnimateScore_hot.score}}</text></view>
					</view>
				</view>			
				<view class="grid col-2 padding-sm">
					<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item1,index1) in chinaAnimateScore" :key="index1" @tap="toChild" data-url="../plays/plays" :data-id="item1.animateid">
						<view class="cu-item shadow">
							<view class="image">
								<image :src="item1.img" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
							</view>
							<text class="cu-avatar radius sm_avatar bg-pink text-sm" v-if="index1<3">{{item1.rank.substring(0,item1.rank.length-1)}}</text>
							<text class="cu-avatar radius sm_avatar bg-grey text-sm" v-else>{{item1.rank.substring(0,item1.rank.length-1)}}</text>
							<text class="text-grey text-cut padding-left-sm">{{item1.title}}</text>
							<view class="solid-bottom text-sm padding-sm">
								<text class="text-grey">评分:{{item1.score}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-card case bg-white" v-if="index_rank==6">
				<view class="cu-item shadow" @tap="toChild" data-url="../plays/plays" :data-id="animatePlanScore_hot.animateid">
					<view class="image">
						<image :src="animatePlanScore_hot.img" mode="scaleToFill" style="height: 414upx;"></image>
						<view class="cu-tag bg-blue">{{animatePlanScore_hot.title}}</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">评分:{{animatePlanScore_hot.score}}</text></view>
					</view>
				</view>		
				<view class="grid col-2 padding-sm">
					<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item1,index1) in animatePlanScore" :key="index1" @tap="toChild" data-url="../plays/plays" :data-id="item1.animateid">
						<view class="cu-item shadow">
							<view class="image">
								<image :src="item1.img" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
							</view>
							<text class="cu-avatar radius sm_avatar bg-pink text-sm" v-if="index1<3">{{item1.rank.substring(0,item1.rank.length-1)}}</text>
							<text class="cu-avatar radius sm_avatar bg-grey text-sm" v-else>{{item1.rank.substring(0,item1.rank.length-1)}}</text>
							<text class="text-grey text-cut padding-left-sm">{{item1.title}}</text>
							<view class="solid-bottom text-sm padding-sm">
								<text class="text-grey">评分:{{item1.score}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-card case bg-white" v-if="index_rank==7">
				<view class="cu-item shadow" @tap="toChild" data-url="../plays/plays" :data-id="movieAnimateScore_hot.animateid">
					<view class="image">
						<image :src="movieAnimateScore_hot.img" mode="scaleToFill" style="height: 414upx;"></image>
						<view class="cu-tag bg-blue">{{movieAnimateScore_hot.title}}</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">评分:{{movieAnimateScore_hot.score}}</text></view>
					</view>
				</view>		
				<view class="grid col-2 padding-sm">
					<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item1,index1) in movieAnimateScore" :key="index1" @tap="toChild" data-url="../plays/plays" :data-id="item1.animateid">
						<view class="cu-item shadow">
							<view class="image">
								<image :src="item1.img" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
							</view>
							<text class="cu-avatar radius sm_avatar bg-pink text-sm" v-if="index1<3">{{item1.rank.substring(0,item1.rank.length-1)}}</text>
							<text class="cu-avatar radius sm_avatar bg-grey text-sm" v-else>{{item1.rank.substring(0,item1.rank.length-1)}}</text>
							<text class="text-grey text-cut padding-left-sm">{{item1.title}}</text>
							<view class="solid-bottom text-sm padding-sm">
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
				// tablist:['电视剧','综艺','电影','动漫'],
				// catsData:['偶像爱情','玄幻史诗','全部分类'],
				curtagindex:-1,
				isCard:false,
				dotStyle: true,
				/* recom:[{
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
				}], */
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
				isLoad:false,
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
					badge: 0,
					name: '新闻咨询',
					linkurl:'../newslist/newslist',
				}, {
					cuIcon: 'hotfill',
					color: 'orange',
					badge: 1,
					name: '新番发送',
					linkurl:'../animateyearlist/animateyearlist?pagetype=1',
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '番组计划',
					linkurl:'../animateyearlist/animateyearlist?pagetype=2',
				}, {
					cuIcon: 'recordfill',
					color: 'olive',
					badge: 0,
					name: '国产动漫',
					linkurl:'../animateyearlist/animateyearlist?pagetype=3',
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '剧场动画',
					linkurl:'../animateyearlist/animateyearlist?pagetype=4',
				}, {
					cuIcon: 'videofill',
					color: 'blue',
					badge: 0,
					name: '影视剧集',
					linkurl:'../animateyearlist/animateyearlist?pagetype=5',
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
				zixundata:[],
				yearAnimateList:[],
				guoManAnimateList:[],
				juChangAnimateList:[],
				juChangyearlist:[],
				juChangrecom:[],
				newAnimateRank_hot:{},
				chinaAnimateRank_hot:{},
				animatePlanRank_hot:{},
				movieAnimateRank_hot:{},
				newAnimateScore_hot:{},
				chinaAnimateScore_hot:{},
				animatePlanScore_hot:{},
				movieAnimateScore_hot:{},
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
				let index = e.currentTarget.dataset.id;
				this.scrollLeft = index * 250;
				let animateid = e.currentTarget.dataset.animateid;
				uni.navigateTo({
					url: '../plays/plays?animateid='+animateid
				})
			},
			/* getRecomData: function() {
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
			}, */
			setshareimg()
			{
				var linkurl = commonutil.getUri(commonutil.imgurl,'v1/vertical/category/4e4d610cdf714d2966000002/vertical?limit=40&adult=false&first=1&order=new');
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data.res!=null&&res.data.res.vertical!=null){
							this.wallpapers = res.data.res.vertical;
							// this.getRecomData();
							// this.getLastPartUpdate();
							// this.getYearGroup();
							// this.getWeekData();
							// this.getPartData();
							// this.getLastUpdate();
							this.getlatestShowAnimate();
							this.getanimateRank();
							this.getzixun();
							this.getyearAnimateList();
							this.getguoManAnimateList();
							this.getjuChangAnimateListOnTime();
							this.isLoad = true;
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
			/* getWeekData: function() {
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
							if(today == 0){
								today = 7;
							}
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
			}, */
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
								commonutil.modalTap("网络异常！");
							}else{
								for(let i=0;i<res.data.length;i++){
									let url = res.data[i].url;
									let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
									let intro = res.data[i].plot;
									if(intro!=null&&intro.length>50){
										intro = intro.substring(0,50)+" ...";
									}
									res.data[i].plot = intro;
									res.data[i].animateid = animateid;
									if(commonutil.istest){
										res.data[i].img = this.getrandomimg();
									}
								}
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
								commonutil.modalTap("网络异常！");
							}else{
								for(let j=0;j<8;j++){
									switch (j){
										case 0:
											if(res.data.newAnimateRank!=null){
												for (let i = 0; i < res.data.newAnimateRank.length; i++) {
													let url = res.data.newAnimateRank[i].url;
													let animateid="";
													if(url != null&&url != ""&&url != undefined){
														 animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
													}
													let title = res.data.newAnimateRank[i].title;
													if(title.length>8){
														title = title.substring(0,7)+"...";
													}
													res.data.newAnimateRank[i].title = title;
													res.data.newAnimateRank[i].animateid = animateid;
													res.data.newAnimateRank[i].img = this.getrandomimg();
												}
												this.newAnimateRank_hot = res.data.newAnimateRank[0];
												this.newAnimateRank = res.data.newAnimateRank;
											}
											break;
										case 1:
											if(res.data.chinaAnimateRank!=null){
												for (let i = 0; i < res.data.chinaAnimateRank.length; i++) {
													let url = res.data.chinaAnimateRank[i].url;
													let animateid="";
													if(url != null&&url != ""&&url != undefined){
														 animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
													}
													let title = res.data.chinaAnimateRank[i].title;
													if(title.length>8){
														title = title.substring(0,7)+"...";
													}
													res.data.chinaAnimateRank[i].title = title;
													
													res.data.chinaAnimateRank[i].animateid = animateid;
													res.data.chinaAnimateRank[i].img = this.getrandomimg();
													
												}
												this.chinaAnimateRank_hot = res.data.chinaAnimateRank[0];
												this.chinaAnimateRank = res.data.chinaAnimateRank;
											}
											break;
										case 2:
											if(res.data.animatePlanRank!=null){
												for (let i = 0; i < res.data.animatePlanRank.length; i++) {
													let url = res.data.animatePlanRank[i].url;
													let animateid="";
													if(url != null&&url != ""&&url != undefined){
														 animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
													}
													let title = res.data.animatePlanRank[i].title;
													if(title.length>8){
														title = title.substring(0,7)+"...";
													}
													res.data.animatePlanRank[i].title = title;
													
													res.data.animatePlanRank[i].animateid = animateid;
													res.data.animatePlanRank[i].img = this.getrandomimg();
												}
												this.animatePlanRank_hot = res.data.animatePlanRank[0];
												this.animatePlanRank = res.data.animatePlanRank;
											}
											break;
										case 3:
											if(res.data.movieAnimateRank!=null){
												for (let i = 0; i < res.data.movieAnimateRank.length; i++) {
													let url = res.data.movieAnimateRank[i].url;
													let animateid="";
													if(url != null&&url != ""&&url != undefined){
														 animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
													}
													
													let title = res.data.movieAnimateRank[i].title;
													if(title.length>8){
														title = title.substring(0,7)+"...";
													}
													res.data.movieAnimateRank[i].title = title;
													
													res.data.movieAnimateRank[i].animateid = animateid;
													res.data.movieAnimateRank[i].img = this.getrandomimg();
												}
												this.movieAnimateRank_hot = res.data.movieAnimateRank[0];
												this.movieAnimateRank = res.data.movieAnimateRank;
											}
											break;
										case 4:
											if(res.data.newAnimateScore!=null){
												for (let i = 0; i < res.data.newAnimateScore.length; i++) {
													let url = res.data.newAnimateScore[i].url;
													let animateid="";
													if(url != null&&url != ""&&url != undefined){
														 animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
													}
													
													let title = res.data.newAnimateScore[i].title;
													if(title.length>8){
														title = title.substring(0,7)+"...";
													}
													res.data.newAnimateScore[i].title = title;
													
													res.data.newAnimateScore[i].animateid = animateid;
													res.data.newAnimateScore[i].img = this.getrandomimg();
												}
												this.newAnimateScore_hot = res.data.newAnimateScore[0];
												this.newAnimateScore = res.data.newAnimateScore;
											}
											break;
										case 5:
											if(res.data.chinaAnimateScore!=null){
												for (let i = 0; i < res.data.chinaAnimateScore.length; i++) {
													let url = res.data.chinaAnimateScore[i].url;
													let animateid="";
													if(url != null&&url != ""&&url != undefined){
														 animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
													}
													
													let title = res.data.chinaAnimateScore[i].title;
													if(title.length>8){
														title = title.substring(0,7)+"...";
													}
													res.data.chinaAnimateScore[i].title = title;
													
													res.data.chinaAnimateScore[i].animateid = animateid;
													res.data.chinaAnimateScore[i].img = this.getrandomimg();
												}
												this.chinaAnimateScore_hot = res.data.chinaAnimateScore[0];
												this.chinaAnimateScore = res.data.chinaAnimateScore;
											}
											break;
										case 6:
											if(res.data.animatePlanScore!=null){
												for (let i = 0; i < res.data.animatePlanScore.length; i++) {
													let url = res.data.animatePlanScore[i].url;
													let animateid="";
													if(url != null&&url != ""&&url != undefined){
														 animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
													}
													
													let title = res.data.animatePlanScore[i].title;
													if(title.length>8){
														title = title.substring(0,7)+"...";
													}
													res.data.animatePlanScore[i].title = title;
													
													res.data.animatePlanScore[i].animateid = animateid;
													res.data.animatePlanScore[i].img = this.getrandomimg();
												}
												this.animatePlanScore_hot = res.data.animatePlanScore[0];
												this.animatePlanScore = res.data.animatePlanScore;
											}
											break;
										case 7:
											if(res.data.movieAnimateScore!=null){
												for (let i = 0; i < res.data.movieAnimateScore.length; i++) {
													let url = res.data.movieAnimateScore[i].url;
													let animateid="";
													if(url != null&&url != ""&&url != undefined){
														 animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
													}
													
													let title = res.data.movieAnimateScore[i].title;
													if(title.length>8){
														title = title.substring(0,7)+"...";
													}
													res.data.movieAnimateScore[i].title = title;
													
													res.data.movieAnimateScore[i].animateid = animateid;
													res.data.movieAnimateScore[i].img = this.getrandomimg();
												}
												this.movieAnimateScore_hot = res.data.movieAnimateScore[0];
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
			//资讯
			getzixun()
			{
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/zixun');
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
										let artdetailid = url.substring(url.indexOf(".tv/")+4,url.length-1);
										res.data.list[i].artdetailid = artdetailid;
										if(commonutil.istest){
											res.data.list[i].img = this.getrandomimg();
										}
									}
									let totalCount = res.data.totalCount;
									this.cuIconList[0].badge = totalCount;
									if(len >5){
										len =5;
									}
									this.zixundata = res.data.list.slice(0,len);//前5篇咨询
								}
							}
						}
					}
				});
			},
			//新番发送
			getyearAnimateList()
			{
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/yearAnimateList');
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
										if(commonutil.istest){
											res.data.list[i].img = this.getrandomimg();
										}
									}
									this.yearAnimateList = res.data.list;
								}
							}
						}
					}
				});
			},
			//国漫
			getguoManAnimateList()
			{
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/guoManAnimateList');
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
										if(commonutil.istest){
											res.data.list[i].img = this.getrandomimg();
										}
									}
									if(len >10){
										len =10;
									}
									this.guoManAnimateList = res.data.list.slice(0,len);
								}
							}
						}
					}
				});
			},
			//剧场
			getjuChangAnimateList(year)
			{
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/juChangAnimateList?year='+year);
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
										let name = res.data.list[i].name;
										if(name.length>15){
											name=name.substring(0,15)+" ...";
										}
										let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
										res.data.list[i].name = name;
										res.data.list[i].animateid = animateid;
										if(commonutil.istest){
											res.data.list[i].img = this.getrandomimg();
										}
									}
									res.data.year =  year+ "年剧场动画";
									let cyear = Number(new Date().getFullYear());
									if(cyear == year ){
										if(len>3){
											len =3;
										}
										this.juChangrecom = res.data.list.slice(0,len);
									}
									this.juChangAnimateList.push(res.data);
								}
							}
						}
					}
				});
			},
			getjuChangAnimateListOnTime()
			{
				let nowyear = Number(new Date().getFullYear());
				let startyear = Number(nowyear)-4;
				for(let i=nowyear;i>startyear;i--){
					let year = i+ "年剧场";
					this.juChangyearlist.push(year);
					setTimeout(() => {
						this.getjuChangAnimateList(i);
					}, 1000);
				}
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
			toChild(e) {
				let url = e.currentTarget.dataset.url;
				let uri = "";
				if(url!=null&&url!=""&&url!=undefined){
					if(url.indexOf("plays")!=-1){
						uri = '?animateid='+e.currentTarget.dataset.id;
					}else if(url.indexOf("newsinfo")!=-1){
						let artid = e.currentTarget.dataset.id;
						if(artid!=null&&artid!=""&&artid!=undefined){
							for (var i = 0; i < this.zixundata.length; i++) {
								let newsid =  this.zixundata[i].artdetailid;
								if(newsid == artid){
									uni.setStorage({
										key: 'artNewsData',
										data: this.zixundata[i]
									});
									break;
								}
							}
						}
						uri = '?pageid='+e.currentTarget.dataset.id
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
.cu-avatar.radius.sm_avatar{
	width: 40upx;
	height: 40upx;
}
</style>
