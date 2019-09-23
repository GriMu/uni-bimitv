<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText"></block><block slot="content">播放正片</block></cu-custom>
		<view class="bg-video flex align-center" style="height: 500upx;">
			<web-view  :src="url"  @message="handleMessage"></web-view>
		</view>	
		<!-- <view class="bg-video flex align-center" style="height: 422upx;">
			<video src="https://www.629055.com/m3u8.php?url=https://doubanzyv1.tyswmp.com/2018/09/21/EgvFPR0jopH0XZbN/playlist.m3u8" :autoplay="false" loop muted :show-play-btn="false"
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
		<view class="shadow-warp bg-black ">
			<view class="flex justify-between ">
				<view class="padding-sm margin-xs radius text-xxl"><text class="">快处快赔</text></view>
				<view class="padding-sm margin-xs radius" @tap="showVideoInfo"><text class="margin-right-xs">简介</text><text :class="showinfo?'cuIcon-fold':'cuIcon-unfold'"></text></view>
			</view>
		</view>
		<view class="cu-form-group margin-top bg-black">
			<view class="title">节点选择</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker text-gray">
					{{index>-1?picker[index]:'卡顿请重新选择节点'}}
				</view>
			</picker>
		</view>
		<view class="cu-list menu sm-border" >
			<view class="cu-item" style="background-color: #333333">
				<view class="content padding-tb-sm">
						<text class="margin-right-xs text-gray">会员22点跟播卫视，非会员次日更新</text>
					<view class="text-gray text-sm padding">
						<text class="margin-right-xs">9.3分</text>
						 <text class="cuIcon-title margin-right-xs" ></text>
						 <text class="margin-right-xs text-orange" >VIP</text>
						 <text class="cuIcon-title margin-right-xs ">家庭</text>
						 <text class="cuIcon-title margin-right-xs ">全49集</text>
						 <text class="cuIcon-title margin-right-xs ">20.6亿</text>
					</view>
				</view>
			</view>
		</view>	
		<view class="cu-list menu sm-border" :style="{display:showinfo?'':'none'}">
			<view class="cu-item" style="background-color: #333333">
				<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item" style="border-bottom: 0upx;" :class="index==TabCur?'cur':''" v-for="(item,index) in 10" :key="index" @tap="tabSelect" :data-id="index">
						<view class="cu-avatar round lg margin-top-sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
						<view>
							<text class="padding-left-sm text-gray">王俊</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="cu-item" style="background-color: #333333">
				<view class="content padding-tb-sm">
					<view class="cardTitle"><view class="text-cut text-white">简介</view></view>
					<view>
						<text class="margin-right-xs text-gray">折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu sm-border" style="margin-top: 0upx;">
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
		</view>	
		<view class="cu-list menu sm-border" style="margin-top: 0upx;">
			<view class="cu-item arrow" >
				<view class="content">
					<text class="text-white margin-right-xs text-bold">剧集</text>
				</view>
				<view class="action">
					<view class="text-gray">会员22点跟播卫视，非会员次日更新</view>
				</view>
			</view>
			<view class="cu-item" >
				<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item"  v-for="(item,index) in 30" :key="index" @tap="tabSelect" :data-id="index">
						<view class="cu-avatar radius lg" :class="index==TabCur?'bg-gray text-orange':'bg-black'" style="width: 70upx;height: 70upx;">
							<text>{{index+1}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="bottom-tv">  </view>
		</view>
		<view class="cu-card no-card case  margin-top" >
			<view class="cu-item arrow" >
				<view class="content" style="margin-left: 32upx;font-size: 32upx;">
					<text class="text-white margin-right-xs text-bold">精彩片花</text>
				</view>
			</view>
			<view class="cu-item shadow  animation-slide-left margin-top"  v-for="(item,index) in weekData" :key="index" :style="[{animationDelay: (index*0.1 + 1)*0.2 + 's'}]">
				<view class="bg-video flex align-center" style="height: 422upx;">
					<video src="http://119.29.217.197:81/KODExplorer/index.php?user/publicLink&fid=a59bawJUWkimi8ZmgkR-wC11vcyOZU-p5ILFrsYCgWetEyk9cPjHgAiZEsBfA_u6A2MaRIQwiIf8DiMNNmwp2fFQ8ST4eg0z-LgAWOj9ncNsipp_9MJEuEWt3MG1ZkRlyzV-zy-b6xYVaYM3PZJ4kEYvl3Yug9gR-m1bC8S3CqYg4ohV1XJ3zomvFt9adcEjH1b0TX7XcA&file_name=/FAEDF4B4-3908-400D-B58B-C97BAA83417F.MP4" :autoplay="false" loop muted :show-play-btn="false"
					 :controls="false" objectFit="cover"></video>
				</view>
				<view class="padding padding-top-xl flex-sub text-white"> 
					{{item.intro}}
				</view>
				<view class="bottom-tv" v-if="index<(weekData.length-1)">  </view>
			</view>
		</view>	
	</view>
</template>

<script>
	import dateutil from '../../common/util.js';
	export default {
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
				picker: ['Danma U', 'Danma C'],
			};
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
		onLoad() {
			this.setshareimg();
			this.animateid = "669";
			this.season = "2";
			this.playnum = "1";
			// this.url = "../../hybrid/html/macplayer.html?animateid="+this.animateid+"&season="+this.season+"&playnum="+this.playnum;
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
				var linkurl = dateutil.getUri('http://chengzc.club:3000/','animatePlay/?animateid='+this.animateid+'&season='+this.season+'&playnum='+this.playnum);
				uni.request({
					// url:'http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&kw=%E9%A3%8E%E6%99%AF&start=0&count=99',
					url:linkurl,
					success:(res)=> {
						// var index = Math.floor(Math.random()*99);
						// this.shareimg= res.data.data[index].thumb;
						if(res.data.player_data!=null){
							uni.setStorage({
								key: 'videoData',
								data: res.data
							})
						}	
					}
				});
			},
			PickerChange(e) {
				this.index = e.detail.value
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
</style>
