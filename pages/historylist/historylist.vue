<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">观看历史</block></cu-custom>
		<view class="cu-bar bg-white solid-bottom ">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 历史记录
			</view>
		</view>
		<view class="cu-card case bg-white solid-top" :style="{display:showhistory?'':'none'}">
			<view class="cu-item shadow" @tap="toChild" data-url="../plays/plays" :data-id="lastplaydata.animateid">
				<view class="image">
					<image :src="lastplaydata.img" mode="scaleToFill" style="height: 414upx;"></image>
					<view class="cu-tag bg-blue">{{lastplaydata.title}}</view>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">第 {{lastplaydata.playnum}} 话</text></view>
				</view>
			</view>
			<view class="cu-timeline" >
				<view class="cu-time">{{curday}}</view>
				<view class="cu-item cur cuIcon-time" v-for="(item,index) in playhistory" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="item.animateid">
					<view class="shadow-blur bg-white">
						<view class="grid col-2">
							<view class="cu-card case no-card"  >
								<view class="cu-item shadow">
									<view class="image">
										<image :src="item.img" mode="scaleToFill" style="height: 300upx;border-radius: 10upx;"></image>
									</view>
									<view class="cu-bar"> 
										<text class="text-cut cuIcon-titles padding-left-sm">{{item.title}}</text>
									</view>
								</view>
							</view>
							<view class="cu-card case no-card"  >
									<view class="cu-item shadow">
										<view class="content padding-top-sm">
											<view class="desc">
												<view class="text-content margin-top-xs">{{item.intro}}</view>
											</view>
										</view>
										<view class="text-gray text-sm padding-top-sm">
											<text class="cuIcon-videofill margin-lr-xs "></text>第 {{item.playnum}} 话
										</view>
										<view class="text-gray text-sm padding-top-sm">
											<text class="cuIcon-timefill margin-lr-xs "></text> 上次播放: {{item.playtime}}
										</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import commonutil from '../../common/util.js';
	export default {
		data() {
			return {
				playhistory:[],
				lastplaydata:{},
				curday:'',
				weekday:['周一','周二','周三','周四','周五','周六','周日'],
				showhistory:false,
			}
		},
		onLoad(options) {
			this.setshareimg();
		},
		methods: {
			getrandomimg: function () {
				let index = Math.floor(Math.random()*40);
				let avatar= this.wallpapers[index].thumb;
				return avatar;
			},
			
			setshareimg()
			{
				var linkurl = commonutil.getUri(commonutil.imgurl,'v1/vertical/category/4e4d610cdf714d2966000002/vertical?limit=40&adult=false&first=1&order=new');
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data.res!=null&&res.data.res.vertical!=null){
							this.wallpapers = res.data.res.vertical;
							this.gethistory();
						}
					}
				});
			},
			gethistory: function () {
				uni.getStorage({
					key: "playhistory",
					success: (res) => {
						if(res.data!=null&&res.data!=""&&res.data!=undefined){
							for (var i = 0; i < res.data.length; i++) {
								let intro = res.data[i].intro;
								if(intro!=null&&intro.length>50){
									intro = intro.substring(0,50)+" ...";
								}
								res.data[i].intro = intro;
							}
							
							let today =  new Date().getDay();
							if(today == 0){
								today = 7;
							}
							this.curday = this.weekday[Number(today)-1];
							this.lastplaydata = res.data[res.data.length-1];
							this.playhistory = res.data.reverse();
							
							this.showhistory=true;
						}else{
							this.showhistory=false;
							commonutil.modalTap("暂无播放记录！");
						}
					},
					fail: () => {
						this.showhistory=false;
						commonutil.modalTap("暂无播放记录！");
					}
				})
			},
			toChild(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url+'?id='+e.currentTarget.dataset.id
				})
			},
		}
	}
</script>

<style>

</style>
