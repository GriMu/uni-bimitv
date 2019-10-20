<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">{{pagename}}</block></cu-custom>
		<view class="cu-bar bg-white search solid-bottom">
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<text class="cuIcon-titles text-blue "></text> 
				<text class="text-bold" style="white-space: nowrap;">类型：</text> 
				<view class="cu-item" :class="index==typeTabCur?'text-blue cur':''" v-for="(item,index) in type" :key="index" @tap="typetabSelect" :data-id="index">
					{{item}}
				</view>
			</scroll-view>
		</view>
		<view class="cu-bar bg-white search solid-bottom">
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<text class="cuIcon-titles text-blue "></text>
				<text class="text-bold" style="white-space: nowrap;">年份：</text> 
				<view class="cu-item" :class="index==yearTabCur?'text-blue cur':''" v-for="(item,index) in year" :key="index" @tap="yeartabSelect" :data-id="index">
					{{item}}
				</view>
			</scroll-view>
		</view>
		<view class="cu-bar bg-white search solid-bottom">
			<text class="cuIcon-titles text-blue "></text>
			<text class="text-bold" style="white-space: nowrap;">字母：</text> 
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index==letterTabCur?'text-blue cur':''" v-for="(item,index) in letter" :key="index" @tap="lettertabSelect" :data-id="index">
					{{item}}
				</view>
			</scroll-view>
		</view>
		<view class="cu-bar bg-white search solid-bottom">
			<text class="cuIcon-titles text-blue "></text>
			<text class="text-bold" style="white-space: nowrap;">排序：</text> 
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index==verTabCur?'text-blue cur':''" v-for="(item,index) in ver" :key="index" @tap="vertabSelect" :data-id="index">
					{{item}}
				</view>
			</scroll-view>
		</view>
		<!-- <view class="padding-xs flex flex-wrap bg-white solid-bottom">
			<view class="padding-xs" v-for="(item,index) in catsData" :key="index" :data-cat="index" @tap="toCats">
				<view class='cu-tag round bg-orange'  v-if="index==curtagindex" >{{item.name}}</view>
				<view class='cu-tag round ' v-else >{{item.name}}</view>
			</view>
		</view> -->
		<view v-if="pagetype==1">
			<view class="cu-card case" :class="isCard?'no-card':''" v-for="(citem,index) in yearAnimateList" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="citem.animateid">
				<view class="cu-item shadow animation-slide-left"  :style="[{animationDelay: (index*0.1 + 1)*0.2 + 's'}]">
					<view class="image">
						<image :src="citem.img?citem.img:avatarimg" mode="aspectFill" style="height: 414upx;"></image>
						<view class="cu-tag bg-blue">{{citem.name}}</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{citem.info}}</text></view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item margin-top-sm">
							<view class="cu-avatar round  bg-red text-sm" v-if="citem.icon==null"> {{citem.name.substring(0,1)}}</view>
							<view class="cu-avatar round " :style="{backgroundImage:'url('+citem.icon+')'}" v-else></view>
							<view class="content flex-sub">
								<view class="text-grey">{{citem.info}}</view>
								<view class="text-gray text-sm flex justify-between">
									{{citem.number}}
									<view class="text-gray text-sm">
										<text class="cuIcon-attentionfill margin-lr-xs"></text> {{citem.views}}
										<text class="cuIcon-appreciatefill margin-lr-xs"></text>{{citem.likes}}
										<text class="cuIcon-messagefill margin-lr-xs"></text> {{citem.comments}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else-if="pagetype==2">
			<view class="cu-card case" :class="isCard?'no-card':''" v-for="(citem,index) in fanZuAnimateList" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="citem.animateid">
				<view class="cu-item shadow animation-slide-left"  :style="[{animationDelay: (index*0.1 + 1)*0.2 + 's'}]">
					<view class="image">
						<image :src="citem.img?citem.img:avatarimg" mode="aspectFill" style="height: 414upx;"></image>
						<view class="cu-tag bg-blue">{{citem.name}}</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{citem.info}}</text></view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item margin-top-sm">
							<view class="cu-avatar round  bg-red text-sm" v-if="citem.icon==null"> {{citem.name.substring(0,1)}}</view>
							<view class="cu-avatar round " :style="{backgroundImage:'url('+citem.icon+')'}" v-else></view>
							<view class="content flex-sub">
								<view class="text-grey">{{citem.info}}</view>
								<view class="text-gray text-sm flex justify-between">
									{{citem.number}}
									<view class="text-gray text-sm">
										<text class="cuIcon-attentionfill margin-lr-xs"></text> {{citem.views}}
										<text class="cuIcon-appreciatefill margin-lr-xs"></text>{{citem.likes}}
										<text class="cuIcon-messagefill margin-lr-xs"></text> {{citem.comments}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else-if="pagetype==3">
			<view class="cu-card case" :class="isCard?'no-card':''" v-for="(citem,index) in guoManAnimateList" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="citem.animateid">
				<view class="cu-item shadow animation-slide-left"  :style="[{animationDelay: (index*0.1 + 1)*0.2 + 's'}]">
					<view class="image">
						<image :src="citem.img?citem.img:avatarimg" mode="aspectFill" style="height: 414upx;"></image>
						<view class="cu-tag bg-blue">{{citem.name}}</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{citem.info}}</text></view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item margin-top-sm">
							<view class="cu-avatar round  bg-red text-sm" v-if="citem.icon==null"> {{citem.name.substring(0,1)}}</view>
							<view class="cu-avatar round " :style="{backgroundImage:'url('+citem.icon+')'}" v-else></view>
							<view class="content flex-sub">
								<view class="text-grey">{{citem.info}}</view>
								<view class="text-gray text-sm flex justify-between">
									{{citem.number}}
									<view class="text-gray text-sm">
										<text class="cuIcon-attentionfill margin-lr-xs"></text> {{citem.views}}
										<text class="cuIcon-appreciatefill margin-lr-xs"></text>{{citem.likes}}
										<text class="cuIcon-messagefill margin-lr-xs"></text> {{citem.comments}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else-if="pagetype==4">
			<view class="cu-card case" :class="isCard?'no-card':''" v-for="(citem,index) in juChangAnimateList" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="citem.animateid">
				<view class="cu-item shadow animation-slide-left"  :style="[{animationDelay: (index*0.1 + 1)*0.2 + 's'}]">
					<view class="image">
						<image :src="citem.img?citem.img:avatarimg" mode="aspectFill" style="height: 414upx;"></image>
						<view class="cu-tag bg-blue">{{citem.name}}</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{citem.info}}</text></view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item margin-top-sm">
							<view class="cu-avatar round  bg-red text-sm" v-if="citem.icon==null"> {{citem.name.substring(0,1)}}</view>
							<view class="cu-avatar round " :style="{backgroundImage:'url('+citem.icon+')'}" v-else></view>
							<view class="content flex-sub">
								<view class="text-grey">{{citem.info}}</view>
								<view class="text-gray text-sm flex justify-between">
									{{citem.number}}
									<view class="text-gray text-sm">
										<text class="cuIcon-attentionfill margin-lr-xs"></text> {{citem.views}}
										<text class="cuIcon-appreciatefill margin-lr-xs"></text>{{citem.likes}}
										<text class="cuIcon-messagefill margin-lr-xs"></text> {{citem.comments}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else-if="pagetype==5">
			<view class="cu-card case" :class="isCard?'no-card':''" v-for="(citem,index) in moveAnimateList" :key="index" @tap="toChild" data-url="../plays/plays" :data-id="citem.animateid">
				<view class="cu-item shadow animation-slide-left"  :style="[{animationDelay: (index*0.1 + 1)*0.2 + 's'}]">
					<view class="image">
						<image :src="citem.img?citem.img:avatarimg" mode="aspectFill" style="height: 414upx;"></image>
						<view class="cu-tag bg-blue">{{citem.name}}</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{citem.info}}</text></view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item margin-top-sm">
							<view class="cu-avatar round  bg-red text-sm" v-if="citem.icon==null"> {{citem.name.substring(0,1)}}</view>
							<view class="cu-avatar round " :style="{backgroundImage:'url('+citem.icon+')'}" v-else></view>
							<view class="content flex-sub">
								<view class="text-grey">{{citem.info}}</view>
								<view class="text-gray text-sm flex justify-between">
									{{citem.number}}
									<view class="text-gray text-sm">
										<text class="cuIcon-attentionfill margin-lr-xs"></text> {{citem.views}}
										<text class="cuIcon-appreciatefill margin-lr-xs"></text>{{citem.likes}}
										<text class="cuIcon-messagefill margin-lr-xs"></text> {{citem.comments}}
									</view>
								</view>
							</view>
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
		
		<!--加载中-->
		<spinbox fix v-if="loadModal" :themeColor="themeColor"></spinbox>
	</view>
</template>

<script>
	import commonutil from '../../common/util.js';
	import spinbox from '../../components/spin-box.vue';
	export default {
		components: {
			spinbox
		},
		data() {
			return {
				// bimiAPI开始
				pagetype:'',
				pagename:'',
				yearAnimateList:[],
				guoManAnimateList:[],
				fanZuAnimateList:[],
				juChangAnimateList:[],
				moveAnimateList:[],
				type:['全部','热血','冒险','搞笑','运动','竞技','装逼','剧情','穿越','青春','小说改','后宫','校园','励志','恋爱','百合','耽美','战斗','机战','科幻','萝莉','奇幻','魔法','动画','治愈','美食','萌系','偶像','泡面','漫改','轻改','催泪','日常','少儿','少女','社团','推理','乙女','其他'],
				year:['2020','2019','2018','2017','2016','2015','2014','2013','2012','2011','2010','2009','2008','2007','2006','2005','2004','2003','2002','2001','2000'],
				letter:['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0-9'],
				ver:['时间排行', '人气排行', '评分排行'],
				typeTabCur:-1,
				yearTabCur:-1,
				letterTabCur:-1,
				verTabCur:-1,
				scrollLeft: 0,
				// bimiAPI结束
				loadModal: false,
				themeColor: '#0081ff',
				isLoad:false,
				page:0,
				pageSize:0,
				totalCount:0,
				totalPage:0,
				firstPage:true,
				lastPage:false,
				curtagindex:-1,
				isCard: false,
				modalName: null,
				modaltitle:'',
				message:'',
				curcat:'',
				selecttype:'',
				selectyear:'',
				selectletter:'',
				selectver:'',
				avatarimg: '../../static/img/grey.png',
			}
		},
		onLoad(options) {
			if(options.pagetype!=null&&options.pagetype!=""&&options.pagetype!=undefined)
			{
				this.pagetype = options.pagetype;
				if(this.pagetype == '1'){
					this.pagename = '新番发送';
				}else if(this.pagetype == '2'){
					this.pagename = '番组计划';
				}else if(this.pagetype == '3'){
					this.pagename = '国产动漫';
				}else if(this.pagetype == '4'){
					this.pagename = '剧场动画';
				}else if(this.pagetype == '5'){
					this.pagename = '影视剧集';
				}
				this.setshareimg();
			}
			else{
				this.modalName="Modal";
				this.modaltitle ="Warn";
				this.message = "网络开小差啦！";
				return false;
			}
			
		},
		onUnload() {
			this.page = 0;
			this.pageSize = 0;
			this.totalCount = 0;
			this.totalPage = 0;
			this.firstPage = true;
			this.lastPage = false;
			this.yearAnimateList = [];
			this.guoManAnimateList = [];
			this.fanZuAnimateList = [];
			this.juChangAnimateList = [];
			this.moveAnimateList = [];
		},
		onReachBottom() {
			if(this.lastPage){//最后一页了
				this.isLoad = true;
				return;
			}
			if(this.page == this.totalPage){
				this.isLoad = true;
				return;
			}
			setTimeout(() => {
				this.setpagelist();
			}, 300);
		},
		onPullDownRefresh() {
			//变更分类初始化数据
			this.page = 0;
			this.pageSize = 0;
			this.totalCount = 0;
			this.totalPage = 0;
			this.firstPage = true;
			this.lastPage = false;
			this.yearAnimateList = [];
			this.guoManAnimateList = [];
			this.fanZuAnimateList = [];
			this.juChangAnimateList = [];
			this.moveAnimateList = [];
			this.getpagelist();
		},
		methods: {
			// bimiAPI开始
			 typetabSelect(e) {
				this.typeTabCur = e.currentTarget.dataset.id;
				this.selecttype = this.type[Number(this.typeTabCur)];
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				//变更分类初始化数据
				this.page = 0;
				this.pageSize = 0;
				this.totalCount = 0;
				this.totalPage = 0;
				this.firstPage = true;
				this.lastPage = false;
				this.setpagelistbysort();
			},
			yeartabSelect(e) {
				this.yearTabCur = e.currentTarget.dataset.id;
				this.selectyear = this.year[Number(this.yearTabCur)];
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				//变更分类初始化数据
				this.page = 0;
				this.pageSize = 0;
				this.totalCount = 0;
				this.totalPage = 0;
				this.firstPage = true;
				this.lastPage = false;
				this.setpagelistbysort();
			},
			lettertabSelect(e) {
				this.letterTabCur = e.currentTarget.dataset.id;
				this.selectletter = this.letter[Number(this.letterTabCur)];
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				//变更分类初始化数据
				this.page = 0;
				this.pageSize = 0;
				this.totalCount = 0;
				this.totalPage = 0;
				this.firstPage = true;
				this.lastPage = false;
				this.setpagelistbysort();
			},
			vertabSelect(e) {
				this.verTabCur = e.currentTarget.dataset.id;
				this.selectver = this.ver[Number(this.verTabCur)];
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				//变更分类初始化数据
				this.page = 0;
				this.pageSize = 0;
				this.totalCount = 0;
				this.totalPage = 0;
				this.firstPage = true;
				this.lastPage = false;
				this.setpagelistbysort();
			},
			getpagelist()
			{
				this.loadModal = true;
				let pageuri ='';
				if(this.pagetype != null &&this.pagetype != "" &&this.pagetype != undefined ){
					if(this.pagetype == "1"){
						pageuri = '/bimianimate/yearAnimateList';
					}else if(this.pagetype == "2"){
						pageuri = '/bimianimate/guoManAnimateList';
					}else if(this.pagetype == "3"){
						pageuri = '/bimianimate/fanZuAnimateList';
					}else if(this.pagetype == "4"){
						pageuri = '/bimianimate/juChangAnimateList';
					}else if(this.pagetype == "5"){
						pageuri = '/bimianimate/moveAnimateList';
					}	
					var linkurl = commonutil.getUri(commonutil.apiurl,pageuri);
					setTimeout(()=>{
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
												res.data.list[i].icon = "../../static/img/grey.png";
												res.data.list[i].animateid = animateid;
												res.data.list[i].img = this.getrandomimg();
											}
											this.page = res.data.page;
											this.pageSize = res.data.pageSize;
											this.totalCount = res.data.totalCount;
											this.totalPage = res.data.totalPage;
											this.lastPage = res.data.lastPage;
											this.firstPage = res.data.firstPage;
											if(this.pagetype == "1"){
												this.yearAnimateList = res.data.list;
											}else if(this.pagetype == "2"){
												this.guoManAnimateList = res.data.list;
											}else if(this.pagetype == "3"){
												this.fanZuAnimateList = res.data.list;
											}else if(this.pagetype == "4"){
												this.juChangAnimateList = res.data.list;
											}else if(this.pagetype == "5"){
												this.moveAnimateList = res.data.list;
											}
											this.loadModal = false;//页面渲染成功隐藏加载
											uni.stopPullDownRefresh();
										}
									}
								}
							}
						});
					}, 1000)
				}
				else{
					this.modalName="Modal";
					this.modaltitle ="Warn";
					this.message = "获取番剧数据失败！";
					return false;
				}
			},
			setpagelistbysort()
			{
				this.loadModal = true;
				let pageuri ='';
				if(this.pagetype != null &&this.pagetype != "" &&this.pagetype != undefined ){
					if(this.pagetype == "1"){
						pageuri = '/bimianimate/yearAnimateList?&sort='+this.selecttype+'&year='+this.selectyear+'&letter='+this.selectletter+'&ver='+this.selectver;
					}else if(this.pagetype == "2"){
						pageuri = '/bimianimate/guoManAnimateList?&sort='+this.selecttype+'&year='+this.selectyear+'&letter='+this.selectletter+'&ver='+this.selectver;
					}else if(this.pagetype == "3"){
						pageuri = '/bimianimate/fanZuAnimateList?&sort='+this.selecttype+'&year='+this.selectyear+'&letter='+this.selectletter+'&ver='+this.selectver;
					}else if(this.pagetype == "4"){
						pageuri = '/bimianimate/juChangAnimateList?&sort='+this.selecttype+'&year='+this.selectyear+'&letter='+this.selectletter+'&ver='+this.selectver;
					}else if(this.pagetype == "5"){
						pageuri = '/bimianimate/moveAnimateList?&sort='+this.selecttype+'&year='+this.selectyear+'&letter='+this.selectletter+'&ver='+this.selectver;
					}
					
					var linkurl = commonutil.getUri(commonutil.apiurl,pageuri);
					setTimeout(()=>{
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
												res.data.list[i].icon = "../../static/img/grey.png";
												res.data.list[i].animateid = animateid;
												// res.data.list[i].img = this.getrandomimg();
											}
											
											this.page = res.data.page;
											this.pageSize = res.data.pageSize;
											this.totalCount = res.data.totalCount;
											this.totalPage = res.data.totalPage;
											this.lastPage = res.data.lastPage;
											this.firstPage = res.data.firstPage;
											
											if(this.pagetype == "1"){
												this.yearAnimateList = res.data.list;
											}else if(this.pagetype == "2"){
												this.guoManAnimateList = res.data.list;
											}else if(this.pagetype == "3"){
												this.fanZuAnimateList = res.data.list;
											}else if(this.pagetype == "4"){
												this.juChangAnimateList = res.data.list;
											}else if(this.pagetype == "5"){
												this.moveAnimateList = res.data.list;
											}
											
											this.loadModal = false;//页面渲染成功隐藏加载
											uni.stopPullDownRefresh();
										}
									}
								}
							}
						});
					}, 1000)
				}
				else{
					this.modalName="Modal";
					this.modaltitle ="Warn";
					this.message = "获取番剧数据失败！";
					return false;
				}	
			},
			setpagelist()
			{
				this.loadModal = true;
				let cpage = Number(this.page)+1;
				let pageuri ='';
				
				if(this.pagetype != null &&this.pagetype != "" &&this.pagetype != undefined ){
					if(this.pagetype == "1"){
						pageuri = '/bimianimate/yearAnimateList?page='+cpage+'&sort='+this.selecttype+'&year='+this.selectyear+'&letter='+this.selectletter+'&ver='+this.selectver;
					}else if(this.pagetype == "2"){
						pageuri = '/bimianimate/guoManAnimateList?page='+cpage+'&sort='+this.selecttype+'&year='+this.selectyear+'&letter='+this.selectletter+'&ver='+this.selectver;
					}else if(this.pagetype == "3"){
						pageuri = '/bimianimate/fanZuAnimateList?page='+cpage+'&sort='+this.selecttype+'&year='+this.selectyear+'&letter='+this.selectletter+'&ver='+this.selectver;
					}else if(this.pagetype == "4"){
						pageuri = '/bimianimate/juChangAnimateList?page='+cpage+'&sort='+this.selecttype+'&year='+this.selectyear+'&letter='+this.selectletter+'&ver='+this.selectver;
					}else if(this.pagetype == "5"){
						pageuri = '/bimianimate/moveAnimateList?page='+cpage+'&sort='+this.selecttype+'&year='+this.selectyear+'&letter='+this.selectletter+'&ver='+this.selectver;
					}
					
					var linkurl = commonutil.getUri(commonutil.apiurl,pageuri);
					setTimeout(()=>{
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
												res.data.list[i].icon = "../../static/img/grey.png";
												res.data.list[i].animateid = animateid;
												// res.data.list[i].img = this.getrandomimg();
											}
											
											this.page = res.data.page;
											this.pageSize = res.data.pageSize;
											this.totalCount = res.data.totalCount;
											this.totalPage = res.data.totalPage;
											this.lastPage = res.data.lastPage;
											this.firstPage = res.data.firstPage;
											
											if(this.pagetype == "1"){
												this.yearAnimateList = this.yearAnimateList.concat(res.data.list);
											}else if(this.pagetype == "2"){
												this.guoManAnimateList = this.guoManAnimateList.concat(res.data.list);
											}else if(this.pagetype == "3"){
												this.fanZuAnimateList = this.fanZuAnimateList.concat(res.data.list);
											}else if(this.pagetype == "4"){
												this.juChangAnimateList = this.juChangAnimateList.concat(res.data.list);
											}else if(this.pagetype == "5"){
												this.moveAnimateList = this.moveAnimateList.concat(res.data.list);
											}
											
											this.loadModal = false;//页面渲染成功隐藏加载
											uni.stopPullDownRefresh();
										}
									}
								}
							}
						});
					}, 1000)
				}
				else{
					this.modalName="Modal";
					this.modaltitle ="Warn";
					this.message = "获取番剧数据失败！";
					return false;
				}	
			},
			setshareimg()
			{
				var linkurl = commonutil.getUri(commonutil.imgurl,'v1/vertical/category/4e4d610cdf714d2966000002/vertical?limit=40&adult=false&first=1&order=new');
				uni.request({
					url:linkurl,
					success:(res)=> {
						if(res.data.res!=null&&res.data.res.vertical!=null){
							this.wallpapers = res.data.res.vertical;
							 this.getpagelist();
						}	
					}
				});
			},
			getrandomimg: function () {
				let index = Math.floor(Math.random()*40);
				let avatar= this.wallpapers[index].thumb;
				return avatar;
			},
			toChild(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url+'?id='+e.currentTarget.dataset.id
				})
			},
			hideModal(e) {
				this.modalName = null
			},
			// bimiAPI结束
		}
	}
</script>

<style>
@import "../../components/colorui/animation.css";
</style>
