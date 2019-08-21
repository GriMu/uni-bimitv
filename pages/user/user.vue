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
			<image src="https://image.weilanwl.com/gif/wave.gif" mode="scaleToFill" class="gif-black response" style="height:100upx"></image>
		</view>
		<view class="margin radius bg-gradual-blue shadow-blur" v-else>
			<view class="flex padding justify-center">
				<view class="cu-avatar xl round bg-gray" v-if="avatarUrl==null">{{nickName.substring(0,1)}}</view> 
				<view class="cu-avatar xl round " :style="{backgroundImage:'url('+avatarUrl+')'}" v-else></view>
			</view>
			<view class="text-df text-center">{{nickName}}</view>
			<image src="https://image.weilanwl.com/gif/wave.gif" mode="scaleToFill" class="gif-black response" style="height:100upx"></image>
		</view>
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="showModal" data-target="Modal2">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-vip text-blue"></text>
					<text class="text-grey">开通VIP会员</text>
				</button>
				<view class="text-xs ">
					<text class="text-gray"></text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="showModal" data-target="Modal">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-people text-blue"></text>
					<text class="text-grey">观看历史</text>
				</button>
				<view class="text-xs ">
					<text class="text-gray"></text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="toChild" data-url="../chat/chat">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-list text-blue"></text>
					<text class="text-grey">我的看单</text>
				</button>
				<view class="text-xs ">
					<text class="text-gray"></text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="toChild" data-url="../chat/chat">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-settings text-blue"></text>
					<text class="text-grey">设置</text>
				</button>
				<view class="text-xs ">
					<text class="text-gray"></text>
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
				// skin: false,
				modalName: null,
				// pfskin: false,
				// music: false,
				// adskin: false,
				// about_autor: '关于作者',
				// article: [],
				avatarUrl:'',
				nickName:'c',
				logined:false,
				showloginout:false,
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
			},
			hideModal(e) {
				this.modalName = null
			},
			toChild(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
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
