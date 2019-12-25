// api接口地址
var apiurl = 'https://wxapi.chengzc.club';
var imgurl = 'https://service.picasso.adesk.com/';
var testurl = 'http://www.youxihenshao.com/';
var loginurl = 'http://chengzc.club:84/';
var appid = 'wxa6a2f198185bd3a3';
var secret = '5a01105a33207a74088987ead194753c';
var grant_type = 'authorization_code';
var istest = false;

function formateDate(sj)
{
	var now = new Date(sj*1000);
	var   year=now.getFullYear();    
	var   month=now.getMonth()+1;
	month = getFormate(month);	
	var   date=now.getDate();
	date = getFormate(date);	
	var   hour=now.getHours();
	hour = getFormate(hour);	
	var   minute=now.getMinutes();
	minute = getFormate(minute);	
	var   second=now.getSeconds();
	second = getFormate(second);
	return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;    
}

function getFormate(arg)
{
	return  arg>=10?arg:"0"+arg;
}	

//打包h5替换
function getUri(sever,url)
{
	var linkurl = url;
	linkurl = sever+url;
	return linkurl;
}


/* function getUri(sever,url)
{
	var linkurl = url;
	// #ifndef H5
		linkurl = sever+url;
	// #endif
	return linkurl;
} */

function modalTap(msg) {
	uni.showModal({
		content: msg,
		confirmText: "确定",
		showCancel: false,
	})
}
function timeformt(fmt) { //author: meizz
    var o = {
        "M+": new Date().getMonth() + 1, //月份
        "d+": new Date().getDate(), //日
        "h+": new Date().getHours(), //小时
        "m+": new Date().getMinutes(), //分
        "s+": new Date().getSeconds(), //秒
        "q+": Math.floor((new Date().getMonth() + 3) / 3), //季度
        "S": new Date().getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (new Date().getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/**
 * 保存用户信息
 * userPic:头像
 * nickName:昵称
 */
const saveUserInfo = (userPic,nickName)=>{
  let current = wx.Bmob.User.current();
  let uid = current.objectId
  return new Promise((resolve,reject)=>{
    const query  = wx.Bmob.Query('_User')
    query.get(uid).then(res=>{
      res.set('nickName',nickName)
      res.set('userPic',userPic)
      res.save();
    })
  })
}
	
const getUserInfo = ()=>{
	uni.getStorage({
		key: "userInfo",
		success: (res) => {
			return res.data;
		},
		fail: () => {
			uni.showModal({
				title: 'Tip',
				content: "请先登录",
				showCancel:false
			})
		}
	})
}	
/* module.exports = {
	formateDate: formateDate,
	getUri:getUri,
	apiurl:apiurl,
	imgurl:imgurl,
	testurl:testurl,
	// getUserInfo: getUserInfo,
} */

export default {
	apiurl,
	imgurl,
	testurl,
	loginurl,
	formateDate,
	getUri,
	modalTap,
	timeformt,
	istest,
	appid,
	secret,
	grant_type,
};