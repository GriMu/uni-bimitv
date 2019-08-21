<template>
	<view>
		<view class="i-class i-spin i-spin-default" :class="[fix?'i-spin-fix':'',custom?'i-spin-show-text':'',fullscreen?'i-spin-fullscreen':'']">
			<view class="i-spin-main" :style="{color:themeColor}">
				<view class="i-spin-dot"></view>
					<!-- <text class="cuIcon-loading2 text-red load-cuIcon"></text>
					 -->
					<view class="cu-load2 loading"></view>
					<view class="gray-text">加载中...</view>
				<view class="i-spin-text"><slot></slot></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'spinbox',
		data() {
			return {
			size: {
				type: String,
				value: 'default'
			},
			fix: {
				type: Boolean,
				value: false
			},
			fullscreen: {
				type: Boolean,
				value: false
			},
			custom: {
				type: Boolean,
				value: false
			},
			scolor:'gray',
			};
		},
		props: {
		/* 主题色 */
		  themeColor: String
		},
	}	
</script>

<style>
.i-spin{vertical-align:middle;text-align:center}
.i-spin-dot{position:relative;display:block;border-radius:50%;background-color:#2d8cf0;width:20px;height:20px;animation:ani-spin-bounce 1s 0s ease-in-out infinite}
.i-spin-large .i-spin-dot{width:32px;height:32px}
.i-spin-small .i-spin-dot{width:12px;height:12px}
.i-spin-fix{position:absolute;top:0;left:0;z-index:8;width:100%;height:100%;background-color:rgba(255,255,255,.9)}
.i-spin-fullscreen{z-index:2010}
.i-spin-fullscreen-wrapper{position:fixed;top:0;right:0;bottom:0;left:0}
.i-spin-fix .i-spin-main{position:absolute;top:50%;left:50%;-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}
.i-spin-fix .i-spin-dot{display:inline-block}
.i-spin-show-text .i-spin-dot,.i-spin-text{display:none}
.i-spin-show-text .i-spin-text{display:block;font-size:14px}
@keyframes ani-spin-bounce{0%{transform:scale(0)}
100%{transform:scale(1);opacity:0}
}

.cu-load2 {
	display: block;
	line-height: 2em;
	text-align: center;
	font-size: 60upx;
}

.cu-load2::before {
	font-family: "cuIcon";
	display: inline-block;
	margin-right: 6upx;
}

.cu-load2.loading::before {
	content: "\e7f1";
	animation: cuIcon-spin 2s infinite linear;
}

.cu-load2.loading::after {
	/* content: "加载中..."; */
}

.cu-load2.over::before {
	content: "\e64a";
}

.cu-load2.over::after {
	content: "没有更多了";
}
</style>
