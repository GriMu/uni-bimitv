<template>
    <view>
        <!-- <view class="btn-row">
            <button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
            <button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
        </view> -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="backText"></block>
			<block slot="content">用户中心</block>
		</cu-custom>
		<view class="margin radius bg-gradual-blue shadow-blur" v-if="!logined" @tap="showModal" data-target="loginModal">
			<view class="flex padding justify-center">
				<view class="cu-avatar xl round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg)">
				</view>
			</view>
			<view class="text-df text-center">点击登录账户</view>
			<image src="https://czcsw-1256525464.cos.ap-chengdu.myqcloud.com/images/wave.gif" mode="scaleToFill" class="gif-black response" style="height:100upx"></image>
		</view>
		<view class="margin radius bg-gradual-blue shadow-blur" v-else>
			<view class="flex padding justify-center">
				<view class="cu-avatar xl round bg-gray" v-if="avatarUrl==null">{{nickName.substring(0,1)}}</view> 
				<view class="cu-avatar xl round " :style="{backgroundImage:'url('+avatarUrl+')'}" v-else></view>
			</view>
			<view class="text-df text-center">{{nickName}}</view>
			<image src="https://czcsw-1256525464.cos.ap-chengdu.myqcloud.com/images/wave.gif" mode="scaleToFill" class="gif-black response" style="height:100upx"></image>
		</view>
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="showModal" data-target="Modal1">
				<button class="cu-btn content" >
					<text class="cuIcon-vip text-blue"></text>
					<text class="text-grey">开通VIP会员</text>
				</button>
				<view class="text-xs ">
					<text class="text-gray"></text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="toChild" data-url="../historylist/historylist">
				<button class="cu-btn content" >
					<text class="cuIcon-people text-blue"></text>
					<text class="text-grey">观看历史</text>
				</button>
				<view class="text-xs ">
					<text class="text-gray"></text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="toChild" data-url="../likelist/likelist">
				<button class="cu-btn content" >
					<text class="cuIcon-list text-blue"></text>
					<text class="text-grey">我的看单</text>
				</button>
				<view class="text-xs ">
					<text class="text-gray"></text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="showModal" data-target="DialogModal1">
				<button class="cu-btn content" >
					<text class="cuIcon-settings text-blue"></text>
					<text class="text-grey">设置</text>
				</button>
				<view class="text-xs ">
					<text class="text-gray"></text>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">设置</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xs">
						<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
							<view class="cu-item">
								<view class="content padding-tb-sm">
									<view>
										<text class="cuIcon-clothesfill text-blue margin-right-xs"></text> 皮肤设置</view>
									<view class="text-gray text-sm text-left">
										<text class="cuIcon-infofill margin-right-xs"></text> 打开黑夜模式！</view>
								</view>
								<view class="action">
									<switch class="switch-music" @change="SwitchSkin" :class="skinflag?'checked':''" :checked="skinflag?true:false"></switch>
								</view>
							</view>
							<view class="cu-item">
								<view class="content padding-tb-sm">
									<view>
										<text class="cuIcon-deletefill text-red margin-right-xs"></text> 清理缓存</view>
									<view class="text-gray text-sm text-left">
										<text class="cuIcon-infofill margin-right-xs"></text> 清除使用缓存</view>
								</view>
								<view class="action">
									<switch class="switch-music" @change="SwitchStorage" :class="storageflag?'checked':''" :checked="storageflag?true:false"></switch>
								</view>
							</view>
						</view>
						<!-- <view class="cu-bar bg-white justify-end margin-top">
							<view class="action">
								<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
								<button class="cu-btn bg-green margin-left" @tap="onsetting">确定</button>
							</view>
						</view> -->
					</view>
				</view>
			</view>
			<!--弹窗-->
			<view class="cu-modal" :class="modalName=='Modal1'?'show':''">
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
		</view>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        computed: {
            ...mapState(['hasLogin', 'forcedLogin'])
        },
		data() {
			return {
				menuBorder: false,
				menuArrow: true,
				menuCard: true,
				modalName: null,
				modaltitle:'',
				message:'',
				avatarUrl:'',
				nickName:'c',
				logined:false,
				showloginout:false,
				skinflag: false,
				storageflag: false,
			}
		},
        methods: {
            ...mapMutations(['logout']),
            bindLogin() {
                uni.navigateTo({
                    url: '../login/login',
                });
            },
            bindLogout() {
                this.logout();
                /**
                 * 如果需要强制登录跳转回登录页面
                 */
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '../login/login',
                    });
                }
            },
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				if(this.modalName == "DialogModal1"){
					this.skinflag = false;
					this.storageflag = false;
				}
				else if(this.modalName == "Modal1"){
					/* uni.showModal({
						title: 'Tip',
						content: '暂未开发会员功能！',
						success: res => {
							if (res.confirm) {
							}
						}
					}); */
					this.modaltitle ="Warn";
					this.message = "暂未开发会员功能！";
				}
			},
			hideModal(e) {
				this.modalName = null
			},
			toChild(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
			SwitchSkin(e) {
				this.skinflag = e.detail.value
				if(this.skinflag){//选择主题
				this.hideModal();
					uni.showModal({
						title: 'Tip',
						content: '主题颜色暂不支持改变！',
						success: res => {
							if (res.confirm) {
							}
						}
					});
				}
			},
			SwitchStorage(e) {
				this.storageflag = e.detail.value
				if(this.storageflag){//选择清除
				this.hideModal();
					uni.showModal({
						title: 'Tip',
						content: '确定要清除缓存？该操作不可逆。',
						success: res => {
							if (res.confirm) {
								this.clearStorage();
								
							}
						}
					});
				}
			},
			clearStorage: function () {
				uni.clearStorageSync()
				uni.showModal({
					title: 'Tip',
					content: '清除数据成功!',
					showCancel:false
				})
			},
			/* onsetting: function () {
				
			}, */
        }
    }
</script>

<style>
@import "../../components/colorui/animation.css";

image[class*="gif-"] {
	border-radius: 6upx;
	display: block;
}
</style>
