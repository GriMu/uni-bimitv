// api接口地址
var apiurl = 'http://chengzc.club:3000/';
var imgurl = 'http://service.picasso.adesk.com/';
var testurl = 'http://www.youxihenshao.com/';

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

function getUri(sever,url)
{
	var linkurl = url;
	// #ifndef H5
		linkurl = sever+url;
	// #endif
	return linkurl;
}
function modalTap(msg) {
	uni.showModal({
		content: msg,
		confirmText: "确定",
		showCancel: false,
	})
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
	formateDate,
	getUri,
	modalTap,
};