<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false"><block slot="backText"></block><block slot="content">首页</block></cu-custom>
		<view class="box">
			<view class="cu-bar search bg-white solid-bottom ">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
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
					<view class="cu-item" :class="index==TabCur?'text-blue':''" v-for="(item,index) in recentHot" :key="index" @tap="tabSelect" :data-id="index">
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
				<swiper-item v-for="(item,index) in partHot" :key="index">
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
				<text class="cuIcon-titles text-blue"></text> 热剧追追追，空调wifi和好剧更配哦
			</view>
		</view>
		<view class="cu-card case bg-white">
			<view class="cu-item shadow">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="false" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in lastUpdate" :key="index">
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
				<text class="cuIcon-titles text-blue"></text> 防御利奇马，追剧不出门
			</view>
		</view>
		<view class="cu-card case bg-white padding-bottom">
			<view class="cu-item shadow">
				<view class="image">
					<image :src="todayhot.url" mode="scaleToFill" style="height: 414upx;"></image>
					<view class="cu-tag bg-blue">{{todayhot.name}}</view>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{todayhot.intro}}</text></view>
				</view>
			</view>
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="wscrollLeft">
				<view class="cu-item" :class="index==wTabCur?'text-blue cur':''" v-for="(item,index) in weekday" :key="index" @tap="weekDaySelect" :data-id="index">
					{{item}}
				</view>
			</scroll-view>
			<view class="grid col-2 padding-sm">
				<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item,index) in todayData" :key="index">
					<view class="cu-item shadow">
						<view class="image">
							<image :src="item.url" mode="scaleToFill" style="height: 200upx;border-radius: 10upx;"></image>
						</view>
						<view class="cu-bar "> <text class="text-cut cuIcon-titles">{{item.name}}</text></view>
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
	import dateutil from '../../common/util.js';
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
				this.scrollLeft = (e.currentTarget.dataset.id ) * 300
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			onKeyUserNameInput: function(event) {
			    this.inputword = event.target.value  
			},
			getRecomData: function() {
				var url = 'api/b/animation/recommend';
				var linkurl = dateutil.getUri('http://www.youxihenshao.com/',url);
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
				var linkurl = dateutil.getUri('http://www.youxihenshao.com/',url);
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
				var linkurl = dateutil.getUri('http://www.youxihenshao.com/',url);
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
				var linkurl = dateutil.getUri('http://www.youxihenshao.com/',url);
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
				var linkurl = dateutil.getUri('http://www.youxihenshao.com/',url);
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
				var linkurl = dateutil.getUri('http://service.picasso.adesk.com/','v1/vertical/category/4e4d610cdf714d2966000002/vertical?limit=40&adult=false&first=1&order=new');
				uni.request({
					// url:'http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&kw=%E9%A3%8E%E6%99%AF&start=0&count=99',
					url:linkurl,
					success:(res)=> {
						// var index = Math.floor(Math.random()*99);
						// this.shareimg= res.data.data[index].thumb;
						if(res.data.res!=null&&res.data.res.vertical!=null){
							this.wallpapers = res.data.res.vertical;
							this.getRecomData();
							this.getWeekData();
							this.getRecentHotData();
							this.getPartData();
							this.getLastUpdate();
							
						}
					}
				});
			},
			weekDaySelect: function(e) {
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
