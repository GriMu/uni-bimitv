<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">播放正片</block></cu-custom>
		<!-- <view class="bg-video flex align-center" style="height: 500upx;">
			<web-view  :src="url"  @message="handleMessage"></web-view>
		</view>	 -->
		<!-- <view class="flex align-center" style="height: 422upx;">
			 <video src="videourl" :autoplay="false" loop muted :show-play-btn="false"
			 :controls="false" objectFit="cover"></video>
			<cover-view class="padding-xl text-white ">
				<cover-view class="padding-xs  text-xxl text-bold">
					暗裔剑魔
				</cover-view>
				<cover-view class="padding-xs">
					我必须连同希望一起毁坏……
				</cover-view>
			</cover-view>
		</view> -->
		<view class="cu-item bg-mask">
			<video style="width: 100%;height: calc(100vh/3);" id="myVideo" :src="videourl"
			 @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls :poster="avatarimg" objectFit="cover"></video>
		</view>	 
			<!-- #ifndef MP-ALIPAY -->
			<!-- <view class="cu-form-group bg-black">
				<input placeholder="在此处输入弹幕内容" name="input"  v-model="danmuValue" ></input>
				<button class='cu-btn bg-grey shadow' @click="sendDanmu">发送弹幕</button>
			</view>
			
			<view class="uni-list uni-common-mt">
				<view class="uni-list-cell">
					<view>
						<view class="uni-label">弹幕内容</view>
					</view>
					<view class="uni-list-cell-db">
						<input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
					</view>
				</view>
			</view>
			<view class="uni-btn-v">
				<button @click="sendDanmu" class="page-body-button">发送弹幕</button>
			</view> -->
			<!-- #endif -->
		
		<view class="shadow-warp bg-black ">
			<view class="flex justify-between ">
				<view class="padding-sm margin-xs radius text-xxl"><text class="">{{animateDetail.title}}</text></view>
				<view style="white-space: nowrap" class="padding-sm margin-xs radius" @tap="showVideoInfo"><text class="margin-right-xs">简介</text><text :class="showinfo?'cuIcon-fold':'cuIcon-unfold'"></text></view>
			</view>
		</view>
		<view class="cu-list menu sm-border" >
			<view class="cu-item" style="background-color: #333333">
				<view class="content padding-tb-sm">
					<view class="flex justify-between text-xl">
						<text class="margin-right-xs text-gray">第<text class="margin-right-xs text-orange" >{{animateinfo.curnum?animateinfo.curnum:'NAN'}}</text>话</text>
						<text class="padding-sm " :class="islike?'cuIcon-likefill text-orange':'cuIcon-like text-gray'" @tap="likevideo"></text>
					</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-title margin-right-xs">评分:9.3分</text>
						<text class="cuIcon-title margin-right-xs text-orange" >{{animateDetail.updatenums}}</text>
					</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-title margin-right-xs" >{{animateDetail.kaibo}}</text>
						<text class="cuIcon-title margin-right-xs">{{animateDetail.year}}</text>
					</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-title margin-right-xs ">{{animateDetail.language}}</text>
						<text class="cuIcon-title margin-right-xs">{{animateDetail.updatetime}}</text>
					</view>
				</view>
			</view>
		</view>	
		<view class="cu-list menu sm-border" :style="{display:showinfo?'':'none'}">
			<!-- <view class="cu-item" style="background-color: #333333">
				<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item" style="border-bottom: 0upx;" :class="index==TabCur?'cur':''" v-for="(item,index) in voicelsit" :key="index" @tap="tabSelect" :data-id="index">
						<view class="cu-avatar round lg margin-top-sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
						<view>
							<text class="padding-left-sm text-gray">{{item.voiceactor}}</text>
						</view>
					</view>
				</scroll-view>
			</view> -->
			<view class="cu-item" style="background-color: #333333">
				<view class="content padding-tb-sm">
					<view class="content  padding-bottom-sm">
						<text class="cuIcon-titles text-orange"></text>
						<text class="text-grey  text-xl">简介</text>
					</view>
					<view>
						<text class="margin-right-xs text-gray">{{animateDetail.intro}}</text>
					</view>
				</view>
			</view>
			<view class="cu-item solid-bottom" >
				<view class="content">
					<text class="cuIcon-voicefill text-orange"></text>
					<text class="text-grey">声优</text>
				</view>
				<view class="action">
					<view class="cu-avatar-group">
						<view class="cu-avatar round lg margin-xs text-sm" :class="'bg-' + item.color" v-for="(item,index) in voicelsit" :key="index">
							<text class="avatar-text text-white">{{item.voiceactor.substring(0,3)}}</text>
						</view>
					</view>
					<text class="text-grey text-sm">等</text>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-tagfill text-orange  margin-right-xs"></text>
					<text class="text-grey">标签</text>
				</view>
				<view class="action">
					<view class="cu-tag round light " :class="'bg-' + item.color" v-for="(item,index) in sortlsit" :key="index">{{item.sort}}</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-peoplefill text-orange"></text>
					<text class="text-grey">导演</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm" v-for="(item,index) in directorlsit" :key="index">{{item.director}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-locationfill text-orange"></text>
					<text class="text-grey">区域</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm" v-for="(item,index) in arealsit" :key="index">{{item.area}}</text>
				</view>
			</view>
		</view>
		<view class="top-tv">  </view>
		<view class="cu-list menu sm-border" style="margin-top: 0upx;">
			<!-- <view class="cu-form-group bg-black">
				<view class="text-white margin-right-xs text-bold">节点选择</view>
				
			</view> -->
			<view class="cu-item arrow" >
				<view class="content">
					<text class="text-white margin-right-xs text-bold">节点选择</text>
				</view>
				<view class="action">
					<picker @change="PickerChange" :value="index" :range="picker">
						<view class="picker text-gray">
							{{index>-1?picker[index]:'卡顿请重新选择节点'}}
						</view>
					</picker>
				</view>
			</view>
			<view class="cu-item arrow" >
				<view class="content">
					<text class="text-white margin-right-xs text-bold">剧集</text>
				</view>
				<view class="action">
					<view class="text-gray">{{animateDetail.updatenums}}</view>
				</view>
			</view>
			<view class="cu-item" >
				<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item"  v-for="(item,index) in playdatas" :key="index" @tap="tabSelect" :data-id="index">
						<view class="cu-avatar radius lg" :class="index==TabCur?'bg-gray text-orange':'bg-black'" style="width: 70upx;height: 70upx;" v-if="!item.ismovie">
							<text>{{item.playnum}}</text>
						</view>
						<view class="cu-tag radius lg light " :class="index==TabCur?'bg-gray text-orange':'bg-black'" v-else><text>{{item.playnum}}</text></view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="top-tv">  </view>
		<!-- <view class="cu-list menu sm-border" style="margin-top: 0upx;">
			<view class="cu-item text-xxl text-white" >
				<view class="content" style="font-size: 48upx;">
					<text class="cuIcon-comment margin-right-xs"></text>
				</view>
				<view class="action">
					<text class="cuIcon-share padding-sm"></text>
					<text class="cuIcon-like padding-sm"></text>
				</view>
			</view>
			<view class="bottom-tv">  </view>
		</view> -->	
		<view class="cu-card no-card case  margin-top" >
			<view class="cu-item arrow" >
				<view class="content" style="margin-left: 32upx;font-size: 32upx;">
					<text class="text-white margin-right-xs text-bold">你可能喜欢</text>
				</view>
			</view>
			<view class="cu-item shadow  animation-slide-left margin-top"  v-for="(item,index) in recommendlist" :key="index" :style="[{animationDelay: (index*0.1 + 1)*0.2 + 's'}]" @tap="toChild" data-url="../plays/plays" :data-id="item.animateid">
				<!-- <view class="cu-item bg-mask">
					<video style="width: 100%;height: 422upx;"  src="https://dl101.yunpan.360.cn/intf.php?method=Download.downloadFile&qid=406220710&fname=/番组计划/18番组计划/8月番组/JOJO的奇妙冒险星尘十字军/01.mp4&fhash=4f9a60b9f5b0ead67c7e6b37b9b22ebe07651f3d&dt=101_.7bc9981413e643f1af28af94c9fac89f&v=1.0.1&rtick=15705005072841&open_app_id=0&host=dl101.yunpan.360.cn&devtype=ecs_web&sign=08df64fc0e42fc378efaf6629ed3b968&token=794751934.7.7c63e81a.406220710.15268730652402196.1570499655"
					 @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls :poster="wallpapers[0].thumb" objectFit="cover"></video>
				</view> -->
					<view class="bg-img bg-mask flex align-center "  :style="{backgroundImage:'url('+item.img+')',height: 'calc(100vh/3)'}">
						<view class="padding-xl text-white">
							<view class="padding-xs text-xxl text-bold">
								{{item.name}}
							</view>
							<view class="padding-xs text-lg">
								<view class="text-cut padding" style="width:220px">{{item.info}}</view>
							</view>
						</view>
					</view>
					<view class="cu-list menu-avatar comment">
						<view class="cu-item" style="background-color: #333333">
							<view class="cu-avatar round margin-top-xs bg-gray text-sm" >
								{{item.name.substring(0,1)}}
							</view>
							<view class="content">
								<view class="text-grey border-title">
									<view class="text-sm text-bold">BiMi</view>
								</view>
								<view class="text-grey border-title">
									<view class="text-sm text-bold">{{item.views}}</view>
								</view>
							</view>
							<view class="action text-xl ">
								<text class="cuIcon-share padding-xs text-gray"></text>
								<text class="cuIcon-delete padding-xs text-gray"></text>
							</view>
						</view>
					</view>
				<!-- <view class="bottom-tv" v-if="index<(recommendlist.length-1)">  </view> -->
			</view>
		</view>	
		<!--加载中-->
		<spinbox fix v-if="loadModal" :themeColor="themeColor"></spinbox>
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
				TabCur: 0,
				scrollLeft: 0,
				weekData:[],//一周更新
				wallpapers:[],
				showinfo:false,
				animateid:"",
				season: "",
				playnum: "",
				url: "/hybrid/html/macplayer.html",
				index: -1,
				pickerist: ['Danma U', 'Danma C','Danma G'],
				picker:[],
				danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				],
				danmuValue: '',
				avatarimg: '../../static/img/grey.png',
				//https://quan.qq.com/video/1098_7d523168ced2a02bd08b3a75f869ae35
				//http://116.128.128.147/vmtt.tc.qq.com/1098_7d523168ced2a02bd08b3a75f869ae35.f0.mp4?vkey=40501F22E7A7360F629B2B0F9DC0DFFA348AC347BE6A94935EC749D654ABAFDB8B66E21D1397CCAAC2E151A8F9F7F77E165CC6392F7DC1050C63A4DA1945D4BB4F0D3D8E14462B4384995510A56780B9366CC00AFCC7616D
				videourl: "",
				videotype: "",
				animateinfo:{},
				animateDetail:{},
				themeColor: '#0081ff',
				loadModal: false,
				playlist:[],
				recommendlist:[],
				playtype:0,
				voicelsit:[],
				sortlsit:[],
				directorlsit:[],
				arealsit:[],
				playdatas:[],
				ColorList: this.ColorList,
				islike:false,
				isshowtab:false,
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
						iconPath: '../../static/img/home.png',
						selectedIconPath: '../../static/img/homeHL.png',
						text: 'Home',
						active: false
					},
					{
						iconPath: '../../static/img/videos.png',
						selectedIconPath: '../../static/img/videosHL.png',
						text: 'Video',
						active: false
					},
					{
						iconPath: '../../static/img/channel.png',
						selectedIconPath: '../../static/img/channelHL.png',
						text: 'Sort',
						active: false
					},
					{
						iconPath: '../../static/img/user.png',
						selectedIconPath: '../../static/img/userHL.png',
						text: 'My',
						active: false
					},
				],
			};
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		/* onReady() {  
			// #ifdef H5  
			var video = document.createElement('video')  
			video.id = 'video'  
			video.style = 'width: 300px;height: 150px;'  
			video.controls = true  
			var source = document.createElement('source')  
			source.src = 'http://yf.ugc.v.cztv.com/cztv/ugcvod/2018/04/14/A98CD7B26B06D94A5CEA56AA7D723572/h264_800k_mp4.mp4_playlist.m3u8'  
			video.appendChild(source)  
			this.$refs.video.$el.appendChild(video)  
			videojs('video')  
			// #endif  
		}, */
		onLoad(options) {
			if(options.animateid!=null&&options.animateid!=""&&options.animateid!=undefined)
			{
				this.animateid = options.animateid;
				this.season = "1";
				this.playnum = "1";
				this.setshareimg();
			}
			else{
				commonutil.modalTap("网络开小差啦！");
				return false;
			}
		},		 
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.playnum = Number(this.TabCur )+1;
				this.getVideo();
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
											if (intro.length>50) {
												intro = intro.substring(0,50)+"...";
											}
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
								commonutil.modalTap("网络异常！");
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
							this.getVideoInfo();
							this.getVideo();
						}	
					}
				});
			
			},
			showVideoInfo:function(){
				if(this.showinfo){
					this.showinfo = false;
				}else{
					this.showinfo = true;
				}
				
			},
			handleMessage(evt) {  
			    console.log('接收到的消息：' + JSON.stringify(evt.detail.data));  
			},
			getVideo:function(){
				this.loadModal = true;
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/animatePlayByPT/?animateid='+this.animateid+'&season='+this.season+'&playnum='+this.playnum);
				setTimeout(()=>{
					uni.request({
						// url:'http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&kw=%E9%A3%8E%E6%99%AF&start=0&count=99',
						url:linkurl,
						success:(res)=> {
							// var index = Math.floor(Math.random()*99);
							// this.shareimg= res.data.data[index].thumb;
							if(res.data.restate!=null){
								commonutil.modalTap("数据源获取失败，请切换线路！");
							}else{
								if(res.data.playurl!=null){
									this.animateinfo = res.data;
									/* uni.setStorage({
										key: 'videoData',
										data: res.data
									}); */
									this.getRealPyerUrl(res.data.playurl);
								}
							}
						},
						fail: () => {
							commonutil.modalTap("网络出小差了！");
							this.loadModal = false;//页面渲染成功隐藏加载
						}
					});
				}, 300)	
			},
			getRealPyerUrl:function(relurl){
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/animateGetRealUrl/?relurl='+relurl);
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data.restate!=null){
							commonutil.modalTap("数据源获取失败，请切换线路！");
						}else{
							if(res.data.playurl!=null){
								this.videourl = res.data.playurl;
								this.videotype = res.data.type;
							}
							else{
								commonutil.modalTap( "网络异常！");
							}
						}
						this.loadModal = false;//页面渲染成功隐藏加载	
					},
					fail: () => {
						commonutil.modalTap("网络出小差了！");
						this.loadModal = false;//页面渲染成功隐藏加载
					}
				});
			},
			getVideoInfo:function(){
				var linkurl = commonutil.getUri(commonutil.apiurl,'/bimianimate/animateDetail/?page='+this.animateid);
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data.restate!=null){
							commonutil.modalTap("获取动漫数据失败！");
						}else{
							if(res.data.title!=null){
								this.animateDetail.title = res.data.title;
								this.animateDetail.updatenums = res.data.updatenums;
								this.animateDetail.rember = res.data.rember;
								this.animateDetail.kaibo = res.data.kaibo;
								this.animateDetail.year = res.data.year;
								this.animateDetail.language = res.data.language;
								this.animateDetail.comment = res.data.comment;
								this.animateDetail.updatetime = res.data.updatetime;
								this.animateDetail.intro = res.data.intro;
								this.animateDetail.img = this.getrandomimg();//暂无
								this.voicelsit = res.data.voicelsit;
								if(this.voicelsit!=null&&this.voicelsit!=""&&this.voicelsit!=undefined){
									if(this.voicelsit.length>4){
										this.voicelsit = this.voicelsit.slice(0,4)
									}
									for (var i = 0; i < this.voicelsit.length; i++) {
										this.voicelsit[i].color = this.ColorList[i].name;
									}
								}
								
								this.sortlsit = res.data.sortlsit;
								if(this.sortlsit!=null&&this.sortlsit!=""&&this.sortlsit!=undefined){
									if(this.sortlsit.length>4){
										this.sortlsit = this.sortlsit.slice(0,4)
									}
									for (var i = 0; i < this.sortlsit.length; i++) {
										this.sortlsit[i].color = this.ColorList[i].name;
									}
								}
								this.directorlsit = res.data.directorlsit;
								this.arealsit = res.data.arealsit;
								
								if(res.data.playlist!=null&&res.data.playlist!=""&&res.data.playlist!=undefined){
									this.playtype = res.data.playlist.length;
									if(this.playtype>3){
										this.playtype=2;
									}
									this.picker = this.pickerist.slice(0,this.playtype);
									this.season = 1;//初始化播放线路
									// for (var i = 0; i < this.playtype; i++) {
										
									// }
									for (var i = 0; i < res.data.playlist.length; i++) {
										let playarray = res.data.playlist[i];
										for (var j = 0; j < playarray.length; j++) {
											let playitem = playarray[j];
											let playnum = playarray[j].playnum;
											if(playnum.indexOf("第")!=-1){
												playarray[j].playnum = playnum.substring(playnum.indexOf("第")+1,playnum.indexOf("话"));
												playarray[j].ismovie = false;
											}
											else{
												playarray[j].ismovie = true;
											}	
											/* else if(playnum.indexOf("OAD")!=-1){
												playarray[j].playnum = playnum.substring(playnum.indexOf("OAD")+3,playnum.length);
											}
											else{
												playarray[j].playnum = playnum.substring(0,1);
											} */
										}
									}
								}
								this.playlist = res.data.playlist;
								this.playdatas = res.data.playlist[0];
								if(res.data.recommendlist!=null&&res.data.recommendlist!=""&&res.data.recommendlist!=undefined){
									for (var i = 0; i < res.data.recommendlist.length; i++) {
										// res.data.recommendlist[i].img = this.getrandomimg();
										let url = res.data.recommendlist[i].url;
										let animateid = url.substring(url.indexOf("/bi/")+4,url.length-1);
										res.data.recommendlist[i].animateid = animateid;
										if(commonutil.istest){
											res.data.recommendlist[i].img = this.getrandomimg();
										}
									}
								}
								this.recommendlist = res.data.recommendlist;
								//根据本地列表，设置是否收藏
								uni.getStorage({
									key: "likelist",
									success: (res) => {
										for (var i = 0; i < res.data.length; i++) {
											if(this.animateid == res.data[i].animateid){
												this.islike = true;
												break;
											}
										}
									},
									fail: () => {
										this.islike = false;
									}
								})
								this.sethistory();
							}
							else{
								commonutil.modalTap("网络异常！");
							}
						}	
					}
				});
			},
			PickerChange(e) {
				this.index = e.detail.value
				this.season = Number(this.index ) +1;//切换线路
				//设置playlist 和 获取播放真实地址
				if(this.index == -1){
					this.index = 0;
				}
				this.playdatas = this.playlist[this.index];
				
				commonutil.modalTap("当前线路已切换为："+ this.pickerist[this.index]);
				// this.getVideo();
			},
			sendDanmu: function() {
				this.videoContext.sendDanmu({
					text: this.danmuValue,
					color: this.getRandomColor()
				});
				this.danmuValue = '';
			},
			videoErrorCallback: function(e) {
				/* uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				}) */
			},
			getRandomColor: function() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			},
			getrandomimg: function () {
				let index = Math.floor(Math.random()*40);
				let avatar= this.wallpapers[index].thumb;
				return avatar;
			},
			likevideo: function () {
				let likeflag = false;
				if(this.islike){
					commonutil.modalTap("取消收藏！");
					this.islike = false;
					likeflag = false;
				}else{
					likeflag = true;
					commonutil.modalTap("收藏成功！");
					this.islike = true;
				}
				
				if(this.animateDetail!=null&&this.animateDetail!=""&&this.animateDetail!=undefined){
					let videodata = {};
					videodata.title = this.animateDetail.title;
					videodata.updatetime = this.animateDetail.updatetime;
					videodata.intro = this.animateDetail.intro;
					videodata.animateid = this.animateid;
					videodata.season = this.season;
					videodata.playnum = this.playnum;
					videodata.img = this.animateDetail.img;
					uni.getStorage({
						key: "likelist",
						success: (res) => {
							let likelist = [];
							likelist = res.data;
							let flag = false;
							let curindex = 0;
							for (var i = 0; i < likelist.length; i++) {
								if(this.animateid == likelist[i].animateid){
									flag = true;
									curindex = i;
									break;
								}
							}
							
							if(likeflag){//收藏
								if(flag){
									likelist[curindex] = videodata;
								}
								else{
									likelist. push(videodata);
								}
							}
							else{//取消收藏
								if(flag){
									likelist.splice(curindex,1);//删除起始下标为curindex，长度为1的一个值
								}
							}
							
							uni.setStorage({
								key: 'likelist',
								data: likelist
							}); 
						},
						fail: () => {
							let likelist = [];
							likelist.push(videodata);
							uni.setStorage({
								key: 'likelist',
								data: likelist
							});
						}
					})
				}
			},
			sethistory: function () {
				if(this.animateDetail!=null&&this.animateDetail!=""&&this.animateDetail!=undefined){
					let videodata = {};
					videodata.title = this.animateDetail.title;
					videodata.updatetime = this.animateDetail.updatetime;
					videodata.intro = this.animateDetail.intro;
					videodata.animateid = this.animateid;
					videodata.season = this.season;
					videodata.playnum = this.playnum;
					videodata.img = this.animateDetail.img;
					videodata.playtime = commonutil.timeformt("yyyy-MM-dd hh:mm:ss");
					uni.getStorage({
						key: "playhistory",
						success: (res) => {
							let historylist = [];
							historylist = res.data;
							let flag = false;
							let curindex = 0;
							for (var i = 0; i < historylist.length; i++) {
								if(this.animateid == historylist[i].animateid){
									flag = true;
									curindex = i;
									break;
								}
							}
							if(flag){
								historylist[curindex] = videodata;
							}
							else{
								
								historylist.push(videodata);
							}
							
							
							uni.setStorage({
								key: 'playhistory',
								data: historylist
							}); 
						},
						fail: () => {
							let historylist = [];
							historylist.push(videodata);
							uni.setStorage({
								key: 'playhistory',
								data: historylist
							});
						}
					})
				}
			},
			toChild(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url+'?animateid='+e.currentTarget.dataset.id
				})
			},
			trigger(e) {
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
						uni.switchTab({
						    url: '/pages/index/index'
						});
						break;
					case 1:
						uni.switchTab({
						    url: '/pages/videos/videos'
						});
						break;
					case 2:
						uni.switchTab({
							url: '/pages/channel/channel'
						});
						break;
					case 3:
						uni.switchTab({
						    url: '/pages/user/user'
						});
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
		}
	}
</script>

<style>
@import "../../components/colorui/animation.css";
page{
	background-color: #333333;
}
.cu-list.menu >.cu-item {
	background-color: #333333;
	
}
.nav .cu-item {
	margin: 20upx 10upx;
	padding: 0px;
}	
.cu-avatar.lg {
	font-size: 1.5em;
}
.cu-card>.cu-item {
	background-color: #333333;
}
.cu-card.no-card>.cu-item {
	margin-top: 32upx;
}
 .cu-list.menu-avatar>.cu-item:after, .cu-list.menu>.cu-item:after {
	border-bottom:0upx;
}
.bottom-tv{
	box-sizing: border-box;
	width: 200%;
	margin:40upx;
	border-bottom: 1upx solid #ddd;
	border-radius: inherit;
	content: " ";
	transform: scale(.5);
	transform-origin: 0 0;
	pointer-events: none
}
.top-tv{
	box-sizing: border-box;
	width: 200%;
	margin:40upx;
	border-top: 1upx solid #ddd;
	border-radius: inherit;
	content: " ";
	transform: scale(.5);
	transform-origin: 0 0;
	pointer-events: none
}
</style>
