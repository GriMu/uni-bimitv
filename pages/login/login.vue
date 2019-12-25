<template>
	<view >
		<!-- <cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">登录</block>
		</cu-custom>
			<button class="cu-btn bg-blue margin-tb-sm lg">登录</button> -->
		<view class="layui-layout-login">
			<view class="login-bg" >
			    <view class="cover" :class="bgColor">
					<view class="cu-bar justify-center align-center" style="top: 20%;">
						<text class="text-bold text-xxl">用户登录</text>
					</view>
				</view>
			</view>
			<view class="login-content" >
				<view class="flex flex-direction">
					<!-- <view class="cu-bar justify-center">
						<image class="cu-avatar round" style="background-image:url(https://chengzc.club/avatar/Misaka.jpg);width: 300upx;height: 300upx;" /> 
					</view> -->
						<!-- <view class="cu-bar align-center" style="left: 5%;">
							<text class="text-bold text-xl">用户登录</text>
						</view> -->
						<form @submit="formSubmit">
							<view class="cu-form-group margin-top-sm round ">
								<text class="cuIcon-profile text-gray margin-right-xs"></text>
								<input placeholder="用户名/邮箱" name="username" class="text-sm gray"></input>
							</view>
							<view class="cu-form-group margin-top-sm round">
								<text class="cuIcon-lock text-gray margin-right-xs"></text>
								<input placeholder="密码" name="password" type="password"></input>
							</view>
							<view class="cu-form-group margin-top-sm round" :style="{display:showverify?'':'none'}">
								<text class="cuIcon-safe text-gray margin-right-xs"></text>
								<input placeholder="验证码" name="v_code"></input>
								<image style="width: 50%;height: 50upx;" :src="code" mode="aspectFill" v-on:click="changecode"></image>
							</view>	
							<view class="margin-top flex flex-direction">
								<button class="cu-btn bg-blue  lg" formType="submit">登录</button>
							</view>
						</form>
						<view class="text-blue text-center text-sm margin-top" @tap="toChild" data-url="../reg/reg">
							注册新账号
						</view>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	import commonutil from '../../common/util.js';
	import * as md5 from '../../common/md5.js';
	import {
	    mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				userinfo:{},
				showverify:true,
				verify:'http://chengzc.club:84/api.php/common/getcaptcha',
				bgColor:'bg-cyan',
				imgkey:'',
				code: '',
				access_token: '',
				vercode: '',
			}
		},
		onLoad() {
			this.access_token = md5.hexMD5('OneBase' + this.$ak);
			this.setvercode();
		},
		methods: {
			modalTap: function (e) {
				uni.showModal({
					content: e.content,
					confirmText: "确定",
					showCancel: false,
				})
			},
			setvercode: function () {
				var linkurl =  'http://chengzc.club:84/api.php/common/getcaptcha';
				uni.request({
					url: linkurl,
					data: {
						access_token:this.access_token
					},
					success: (res) => {
						if (res.data.code == 0) {
							this.code = res.data.msg.base64img;
							this.imgkey = res.data.msg.imgkey;
						}	
					}	
				});	
			},	
			formSubmit: function (e) {
				var userdata = {};
				userdata.username = e.detail.value.username;
				userdata.password = e.detail.value.password;
				this.vercode = e.detail.value.v_code;
				var message = {};
				if(this.vercode==null||this.vercode==""||this.vercode==undefined){
					message.content = "请输入验证码！";
					this.modalTap(message);
					return false;
				}
				if(userdata.username==null||userdata.username==""||userdata.username==undefined){
					message.content = "请输入用户名！";
					this.modalTap(message);
					return false;
				}
				if(userdata.password==null||userdata.password==""||userdata.password==undefined){
					message.content = "请输入密码！";
					this.modalTap(message);
					return false;
				}
				var that = this;
				var linkurl =  'http://chengzc.club:84/api.php/common/verifycode';
				uni.request({
					url: linkurl,
					data: {
						access_token:this.access_token,
						imgkey:this.imgkey,
						code:this.vercode
					},
					success: (res) => {
						if (res.data.code == 0) {//验证成功去登录
							// message.content = res.data.msg;
							// this.modalTap(message);
							that.tologin(userdata);
						}
						else{
							message.content = res.data.msg;
							that.modalTap(message);
						}
						this.changecode();
					}	
				});	
			},	
			tologin(e) {
				// var linkurl = commonutil.getUri(commonutil.loginurl,'api.php/common/login.html');
				var linkurl =  'http://chengzc.club:84/api.php/common/login.html';
				uni.request({
					url: linkurl,
					data: {
						username: e.username,
						password: e.password,
						access_token:this.access_token
					},
					success: (res) => {
						
						if (res.data.code == 0) {
							
							uni.setStorage({
								key: 'login_user_data',
								data: res.data.data,
								success: function () {
									uni.reLaunch({
										url: '/pages/index/index'
									});
								}
							});
					
						} else {
							var message = {};
							message.content = res.data.msg;
							this.modalTap(message);
							/* uni.showToast({
								title: res.data.msg,
								duration: 2000,
								icon:'none',
							}); */
						}
					}
				});
				
			},
			// formSubmit:function(e){
			// 	debugger
			// 	var formData = e.detail.value;
			// 	// var linkurl = dateutil.getUri('https://doc.chengzc.club','/server/index.php?s=/api/user/login');
			// 	/* uni.request({
			// 		url:'https://doc.chengzc.club/server/index.php?s=/api/common/verify',
			// 		success: (res) => {
			// 		}
			// 	}) */
			// 	// var linkurl ='http://chengzc.club:84/login/loginhandle.html';
			// 	var linkurl = commonutil.getUri(commonutil.loginurl,'login/loginhandle.html');
			// 	var that =this;
			// 	// #ifndef MP-WEIXIN
			// 	uni.request({
			// 	// #endif
			// 	// #ifdef MP-WEIXIN
			// 	wx.request({	
			// 	// #endif
			// 		url:linkurl,
			// 		// xhrFields: {  
			// 		//    withCredentials: true    // 前端设置是否带cookie  
			// 	 //    },
			// 		// crossDomain: true, 
			// 		data:{
			// 			'username':formData.username,
			// 			'password':formData.password,
			// 			'verify':formData.v_code,
			// 		},
			// 		method:'POST',
			// 		header:{'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'},
			// 		success: (res) => {
			// 			debugger
			// 			console.log(res.cookies);
			// 			var message = {};
			// 			if (res.data.error_code != 0) {
			// 				message.content = res.data.error_message;
			// 				if(res.data.error_code == 10206){//密码错误三次，需要验证码
			// 					this.showverify= true;
			// 					message.content = '输入密码错误三次，请填写验证码';
			// 				}
			// 				that.modalTap(message);
			// 			} else{
			// 				// let cookie = res.cookies;
			// 				// 'Authorization':'PHPSESSID=0e822e2b6d498bc5d6945cfea60a5509; think_language=zh-CN; cookie_token=3bcf57e5c5e09218959fcad80403fec141990620fee1d63a01a243a0dd8a4997'
			// 				// 'cookie_token': '3bcf57e5c5e09218959fcad80403fec141990620fee1d63a01a243a0dd8a4997',
			// 				// 'PHPSESSID':'0e822e2b6d498bc5d6945cfea60a5509',
			// 				// 'think_language':'zh-CN'
			// 				// #ifndef MP-WEIXIN
			// 				uni.request({
			// 				// #endif
			// 				// #ifdef MP-WEIXIN
			// 				wx.request({	
			// 				// #endif
			// 					url:'https://doc.chengzc.club/server/index.php?s=/api/user/info',
			// 					data:{
			// 					},
			// 					method:'POST',
			// 					header:{'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'},//必须要加header,不然还是提示跨域
			// 					success: (res) => {
			// 						console.log(res.data);
			// 						// this.userinfo = res.data.data;
			// 						/* var userdata = {};
			// 						userdata.avatar=null;
			// 						userdata.avatar_small=null;
			// 						userdata.email=null;
			// 						userdata.groupid="2";
			// 						userdata.name="张三";
			// 						userdata.uid="2";
			// 						userdata.username="cheng"; */
			// 						if (res.data.error_code != 0) {
			// 							message.content = res.data.error_message;
			// 						}
			// 						else
			// 						{
			// 							that.login(res.data.data);
			// 							message.content = "登录成功";
			// 							uni.navigateBack();
			// 							/* uni.navigateTo({
			// 								url: "../user/user"
			// 							}) */
			// 						}	
			// 						that.modalTap(message);
			// 					}	
			// 				})	
			// 			}
			// 		}
					
			// 	})
			// },
			toChild(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
			changecode(e) {
				this.setvercode();
			},
			...mapMutations(['login'])
		}
	}
</script>

<style>
/* 登录页面 */
.layui-layout-login .login-bg{
	background-color: #e7e7e7;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -1;
}
.layui-layout-login .login-bg .cover{
	// background-color: #009688;
	height: 50%;
}
.layui-layout-login .login-content{
	width:calc(100vh/2.2);
	height:calc(100vh/2);
	position: absolute;
	top: 50%;
	left: 50%;
	transform:translate(-50%,-50%);
	background-color: #ffffff;
	padding: 40px;
	padding-top: 35px;
	-webkit-box-shadow: 0px 3px 20px 3px rgba(0, 0, 0, 0.15);
	box-shadow: 0px 3px 20px 3px rgba(0, 0, 0, 0.15);
	border-radius: 10upx;
}
.cu-form-group{
	border: 1px solid #ddd;
	transition: all 0s;
	-webkit-transition: all 0s;
}
.layui-layout-login .login-box-title{
	font-size: 26px;
	margin-bottom: 20px;
	text-align: center;
	color: #ffffff;
}
/* .layui-layout-login .login-content.captcha{
    width:300px;
    padding-bottom: 38px;
}
.layui-layout-login .login-content.captcha .captcha-item .layui-icon{
    font-size: 16px;
}
.layui-layout-login .login-content.captcha .captcha-item .layui-input{
    float: left;
    width: 180px;
}
.layui-layout-login .login-content.captcha .captcha-item .captcha-img{
    float: right;
    height: 38px;
    cursor: pointer;
}
.layui-layout-login .login-box-title{
	font-size: 26px;
	margin-bottom: 20px;
	text-align: center;
	color: #444444;
}
.layui-layout-login .layui-form-item{
	position: relative;
	margin-bottom: 20px;
	min-height: 18px;
}
.layui-layout-login .layui-form-item label{
	position: absolute;
	top:0;
	left: 0;
	font-size: 18px;
	width: 38px;
	line-height: 38px;
	text-align: center;
	color: #999999;
}
.layui-layout-login .layui-form-item input[type=text],
.layui-layout-login .layui-form-item input[type=password]{
	padding-left: 36px;
	border: 1px solid #ddd;
	transition: all 0s;
	-webkit-transition: all 0s;
}
.layui-layout-login .layui-form-item .layui-form-checkbox{
	margin-top: 0;
}
.layui-layout-login .layui-form-item .layui-form-checkbox .layui-icon{
	width: 14px;
	height: 14px;
	top: 1px;
	line-height: 14px;
}
.layui-layout-login .layui-form-item .layui-form-checkbox[lay-skin=primary]:hover i {
    border-color: #009688;
}
.layui-layout-login .layui-form-item .layui-form-checked[lay-skin=primary] i{
    border-color: #009688;
    background-color: #009688;
}
.layui-layout-login .layui-form-item .forget-password{
	color: #009688;
} */
</style>