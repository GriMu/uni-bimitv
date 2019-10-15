<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText"></block><block slot="content">播放正片</block></cu-custom>
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
			<video style="width: 100%;height: 422upx;" id="myVideo" :src="videourl"
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
				<view class="padding-sm margin-xs radius text-xxl"><text class="">{{animateinfo.name}}</text></view>
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
						<text class="margin-right-xs text-gray">{{animateinfo.name}}第<text class="margin-right-xs text-orange" >{{animateinfo.curnum}}</text>话</text>
					<view class="text-gray text-sm padding">
						<text class="margin-right-xs">9.3分</text>
						 <text class="cuIcon-title margin-right-xs" >{{animateDetail.kaibo}}</text>
						 <text class="cuIcon-title margin-right-xs text-orange" >{{animateDetail.updatenums}}</text>
						 <text class="cuIcon-title margin-right-xs ">{{animateDetail.year}}</text>
						 <text class="cuIcon-title margin-right-xs ">{{animateDetail.language}}</text>
						 <text class="cuIcon-title margin-right-xs ">{{animateDetail.updatetime}}</text>
					</view>
				</view>
			</view>
		</view>	
		<view class="cu-list menu sm-border" :style="{display:showinfo?'':'none'}">
			<view class="cu-item" style="background-color: #333333">
				<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item" style="border-bottom: 0upx;" :class="index==TabCur?'cur':''" v-for="(item,index) in animateDetail.voicelsit" :key="index" @tap="tabSelect" :data-id="index">
						<view class="cu-avatar round lg margin-top-sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
						<view>
							<text class="padding-left-sm text-gray">{{item.voiceactor}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="cu-item" style="background-color: #333333">
				<view class="content padding-tb-sm">
					<view class="cardTitle"><view class="text-cut text-white">简介</view></view>
					<view>
						<text class="margin-right-xs text-gray">{{animateDetail.intro}}</text>
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
					<view class="text-gray">{{animateDetail.updatenums}}</view>
				</view>
			</view>
			<view class="cu-item" >
				<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item"  v-for="(item,index) in animateDetail.playlist[0]" :key="index" @tap="tabSelect" :data-id="index">
						<view class="cu-avatar radius lg" :class="index==TabCur?'bg-gray text-orange':'bg-black'" style="width: 70upx;height: 70upx;">
							<text>{{item.playnum.substring(item.playnum.indexOf("第")+1,item.playnum.indexOf("话"))}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="bottom-tv">  </view>
		</view>
		<view class="cu-card no-card case  margin-top" >
			<view class="cu-item arrow" >
				<view class="content" style="margin-left: 32upx;font-size: 32upx;">
					<text class="text-white margin-right-xs text-bold">你可能喜欢</text>
				</view>
			</view>
			<view class="cu-item shadow  animation-slide-left margin-top"  v-for="(item,index) in animateDetail.recommendlist" :key="index" :style="[{animationDelay: (index*0.1 + 1)*0.2 + 's'}]">
				<!-- <view class="cu-item bg-mask">
					<video style="width: 100%;height: 422upx;"  src="https://dl101.yunpan.360.cn/intf.php?method=Download.downloadFile&qid=406220710&fname=/番组计划/18番组计划/8月番组/JOJO的奇妙冒险星尘十字军/01.mp4&fhash=4f9a60b9f5b0ead67c7e6b37b9b22ebe07651f3d&dt=101_.7bc9981413e643f1af28af94c9fac89f&v=1.0.1&rtick=15705005072841&open_app_id=0&host=dl101.yunpan.360.cn&devtype=ecs_web&sign=08df64fc0e42fc378efaf6629ed3b968&token=794751934.7.7c63e81a.406220710.15268730652402196.1570499655"
					 @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls :poster="wallpapers[0].thumb" objectFit="cover"></video>
				</view> -->
					<view class="bg-img bg-mask flex align-center "  :style="{backgroundImage:'url('+item.img+')',height: '414upx'}">
						<view class="padding-xl text-white">
							<view class="padding-xs text-xxl text-bold">
								{{item.name}}
							</view>
							<view class="padding-xs text-lg">
								<view class="text-cut padding" style="width:220px">{{item.info}}</view>
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
									<view class="text-sm text-bold">{{item.views}}</view>
								</view>
							</view>
							<view class="action text-xl">
								<text class="cuIcon-share padding-xs"></text>
								<text class="cuIcon-delete padding-xs"></text>
							</view>
						</view>
					</view>
				<view class="bottom-tv" v-if="index<(weekData.length-1)">  </view>
			</view>
		</view>	
	</view>
</template>

<script>
	import commonutil from '../../common/util.js';
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
				var linkurl = commonutil.getUri(commonutil.testurl,url);
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
				var linkurl = commonutil.getUri(commonutil.imgurl,'v1/vertical/category/4e4d610cdf714d2966000002/vertical?limit=40&adult=false&first=1&order=new');
				uni.request({
					// url:'http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&kw=%E9%A3%8E%E6%99%AF&start=0&count=99',
					url:linkurl,
					success:(res)=> {
						debugger
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
				var linkurl = commonutil.getUri(commonutil.apiurl,'bimianimate/animatePlayByPT/?animateid='+this.animateid+'&season='+this.season+'&playnum='+this.playnum);
				uni.request({
					// url:'http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&kw=%E9%A3%8E%E6%99%AF&start=0&count=99',
					url:linkurl,
					success:(res)=> {
						// var index = Math.floor(Math.random()*99);
						// this.shareimg= res.data.data[index].thumb;
						if(res.data.playurl!=null){
							this.animateinfo = res.data;
							uni.setStorage({
								key: 'videoData',
								data: res.data
							});
							this.getRealPyerUrl(res.data.playurl);
						}	
					}
				});
			},
			getRealPyerUrl:function(relurl){
				var linkurl = commonutil.getUri(commonutil.apiurl,'bimianimate/animateGetRealUrl/?relurl='+relurl);
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data.playurl!=null){
							this.videourl = res.data.playurl;
							this.videotype = res.data.type;
						}
						else{
							uni.showModal({
								content: "网络异常！",
								showCancel: false
							})
						}
					}
				});
			},
			getVideoInfo:function(){
				var linkurl = commonutil.getUri(commonutil.apiurl,'bimianimate/animateDetail/?page='+this.animateid);
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data.title!=null){
							this.animateDetail = res.data;
						}
						else{
							uni.showModal({
								content: "网络异常！",
								showCancel: false
							})
						}
					}
				});
			},
			PickerChange(e) {
				this.index = e.detail.value
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
