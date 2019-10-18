<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">我的看单</block></cu-custom>
		<view class="cu-bar bg-white solid-bottom ">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text> 收藏列表
			</view>
		</view>
		<view class="cu-card case bg-white solid-top">
			<view class="cu-item shadow" @tap="toChild" data-url="../plays/plays" :data-id="lastlikedata.animateid">
				<view class="image">
					<image :src="lastlikedata.img" mode="scaleToFill" style="height: 414upx;"></image>
					<view class="cu-tag bg-blue">{{lastlikedata.title}}</view>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">第 {{lastlikedata.playnum}} 话</text></view>
				</view>
			</view>
			<view class="cu-timeline">
				<view class="cu-time">{{curday}}</view>
				<view class="cu-item cur cuIcon-time" v-for="(item,index) in likelist" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="item.animateid">
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
											<text class="cuIcon-timefill margin-lr-xs "></text> {{item.updatetime}}
										</view>
										<view class="text-gray text-sm padding-top-sm">
											<text class="cuIcon-favorfill margin-lr-xs "></text>第 {{item.playnum}} 话
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
				likelist:[],
				lastlikedata:{},
				curday:'周四',
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
					key: "likelist",
					success: (res) => {
						if(res.data!=null&&res.data!=""&&res.data!=undefined){
							for (var i = 0; i < res.data.length; i++) {
								let intro = res.data[i].intro;
								if(intro!=null&&intro.length>50){
									intro = intro.substring(0,50)+" ...";
								}
								res.data[i].intro = intro;
							}
							
							this.likelist = res.data;
							this.lastlikedata = res.data[res.data.length-1];
						}else{
							commonutil.modalTap("暂无收藏记录！");
						}
					},
					fail: () => {
						commonutil.modalTap("暂无收藏记录！");
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
